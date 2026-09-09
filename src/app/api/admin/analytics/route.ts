import { NextResponse } from 'next/server';
import { BetaAnalyticsDataClient } from '@google-analytics/data';

export const dynamic = 'force-dynamic';

function getAnalyticsClient() {
  const propertyId = process.env.GA4_PROPERTY_ID;
  const clientEmail = process.env.GA4_CLIENT_EMAIL;
  let privateKey = process.env.GA4_PRIVATE_KEY;

  if (!propertyId || !clientEmail || !privateKey) {
    return null;
  }

  // Ensure escaped newlines in private key are correctly unescaped
  privateKey = privateKey.replace(/\\n/g, '\n');

  return {
    client: new BetaAnalyticsDataClient({
      credentials: {
        client_email: clientEmail,
        private_key: privateKey,
      },
    }),
    propertyId,
  };
}

export async function GET() {
  try {
    const config = getAnalyticsClient();
    if (!config) {
      return NextResponse.json(
        {
          error: 'Chưa cấu hình GA4_PROPERTY_ID, GA4_CLIENT_EMAIL hoặc GA4_PRIVATE_KEY',
          configured: false,
        },
        { status: 200 }
      );
    }

    const { client, propertyId } = config;
    const propertyPath = `properties/${propertyId}`;

    // 1. Khách đang online thời gian thực (Realtime - 30 phút qua)
    let activeUsersNow = 0;
    try {
      const [realtimeResponse] = await client.runRealtimeReport({
        property: propertyPath,
        metrics: [{ name: 'activeUsers' }],
      });
      activeUsersNow = parseInt(realtimeResponse.rows?.[0]?.metricValues?.[0]?.value || '0', 10);
    } catch (rtErr: any) {
      console.warn('[GA4 Realtime Warning]:', rtErr.message);
    }

    // 2. Thống kê 7 ngày qua (Tổng người dùng, phiên, lượt xem, thời lượng trung bình)
    let overview = {
      activeUsers: 0,
      sessions: 0,
      screenPageViews: 0,
      avgSessionDurationSec: 0,
      bounceRatePercent: 0,
    };

    try {
      const [overviewResponse] = await client.runReport({
        property: propertyPath,
        dateRanges: [{ startDate: '7daysAgo', endDate: 'today' }],
        metrics: [
          { name: 'activeUsers' },
          { name: 'sessions' },
          { name: 'screenPageViews' },
          { name: 'averageSessionDuration' },
          { name: 'bounceRate' },
        ],
      });

      if (overviewResponse.rows && overviewResponse.rows.length > 0) {
        const vals = overviewResponse.rows[0].metricValues || [];
        overview = {
          activeUsers: parseInt(vals[0]?.value || '0', 10),
          sessions: parseInt(vals[1]?.value || '0', 10),
          screenPageViews: parseInt(vals[2]?.value || '0', 10),
          avgSessionDurationSec: Math.round(parseFloat(vals[3]?.value || '0')),
          bounceRatePercent: Math.round(parseFloat(vals[4]?.value || '0') * 100),
        };
      }
    } catch (ovErr: any) {
      console.warn('[GA4 Overview Warning]:', ovErr.message);
    }

    // 3. Top trang được xem nhiều nhất (Top Pages 7 ngày qua)
    let topPages: Array<{ path: string; title: string; views: number; users: number }> = [];
    try {
      const [topPagesResponse] = await client.runReport({
        property: propertyPath,
        dateRanges: [{ startDate: '7daysAgo', endDate: 'today' }],
        dimensions: [{ name: 'pagePath' }, { name: 'pageTitle' }],
        metrics: [{ name: 'screenPageViews' }, { name: 'activeUsers' }],
        orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }],
        limit: 6,
      });

      if (topPagesResponse.rows) {
        topPages = topPagesResponse.rows.map((row) => ({
          path: row.dimensionValues?.[0]?.value || '/',
          title: row.dimensionValues?.[1]?.value || 'Trang chủ',
          views: parseInt(row.metricValues?.[0]?.value || '0', 10),
          users: parseInt(row.metricValues?.[1]?.value || '0', 10),
        }));
      }
    } catch (pageErr: any) {
      console.warn('[GA4 TopPages Warning]:', pageErr.message);
    }

    // 4. Nguồn truy cập (Traffic Sources 7 ngày qua)
    let trafficSources: Array<{ source: string; sessions: number; percentage: number }> = [];
    try {
      const [sourcesResponse] = await client.runReport({
        property: propertyPath,
        dateRanges: [{ startDate: '7daysAgo', endDate: 'today' }],
        dimensions: [{ name: 'sessionSource' }],
        metrics: [{ name: 'sessions' }],
        orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
        limit: 5,
      });

      if (sourcesResponse.rows) {
        const totalSourceSessions = sourcesResponse.rows.reduce(
          (acc, row) => acc + parseInt(row.metricValues?.[0]?.value || '0', 10),
          0
        );

        trafficSources = sourcesResponse.rows.map((row) => {
          const sessions = parseInt(row.metricValues?.[0]?.value || '0', 10);
          const rawSource = row.dimensionValues?.[0]?.value || 'direct';
          let cleanSource = rawSource;
          if (cleanSource === '(direct)') cleanSource = 'Truy cập trực tiếp';
          else if (cleanSource.includes('google')) cleanSource = 'Google Tìm kiếm';
          else if (cleanSource.includes('facebook') || cleanSource.includes('fb')) cleanSource = 'Facebook';
          else if (cleanSource.includes('zalo')) cleanSource = 'Zalo';

          return {
            source: cleanSource,
            sessions,
            percentage: totalSourceSessions > 0 ? Math.round((sessions / totalSourceSessions) * 100) : 0,
          };
        });
      }
    } catch (srcErr: any) {
      console.warn('[GA4 Sources Warning]:', srcErr.message);
    }

    // 5. Phân bổ thiết bị (Device Categories)
    let devices: Array<{ device: string; sessions: number; percentage: number }> = [];
    try {
      const [deviceResponse] = await client.runReport({
        property: propertyPath,
        dateRanges: [{ startDate: '7daysAgo', endDate: 'today' }],
        dimensions: [{ name: 'deviceCategory' }],
        metrics: [{ name: 'sessions' }],
        orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
      });

      if (deviceResponse.rows) {
        const totalDevSessions = deviceResponse.rows.reduce(
          (acc, row) => acc + parseInt(row.metricValues?.[0]?.value || '0', 10),
          0
        );

        devices = deviceResponse.rows.map((row) => {
          const sessions = parseInt(row.metricValues?.[0]?.value || '0', 10);
          const rawDev = row.dimensionValues?.[0]?.value || 'mobile';
          let cleanDev = 'Điện thoại (Mobile)';
          if (rawDev === 'desktop') cleanDev = 'Máy tính (Desktop)';
          else if (rawDev === 'tablet') cleanDev = 'Máy tính bảng (Tablet)';

          return {
            device: cleanDev,
            sessions,
            percentage: totalDevSessions > 0 ? Math.round((sessions / totalDevSessions) * 100) : 0,
          };
        });
      }
    } catch (devErr: any) {
      console.warn('[GA4 Devices Warning]:', devErr.message);
    }

    return NextResponse.json({
      success: true,
      configured: true,
      propertyId,
      activeUsersNow,
      overview,
      topPages,
      trafficSources,
      devices,
      updatedAt: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('[GA4 API Error]:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Lỗi kết nối tới Google Analytics Data API',
      },
      { status: 500 }
    );
  }
}
