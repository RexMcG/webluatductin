"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";

interface AnalyticsData {
  success: boolean;
  configured: boolean;
  propertyId?: string;
  activeUsersNow: number;
  overview: {
    activeUsers: number;
    sessions: number;
    screenPageViews: number;
    avgSessionDurationSec: number;
    bounceRatePercent: number;
  };
  topPages: Array<{
    path: string;
    title: string;
    views: number;
    users: number;
  }>;
  trafficSources: Array<{
    source: string;
    sessions: number;
    percentage: number;
  }>;
  devices: Array<{
    device: string;
    sessions: number;
    percentage: number;
  }>;
  updatedAt?: string;
}

export default function AnalyticsDashboard() {
  const {
    data,
    isLoading,
    isRefetching,
    refetch,
    error,
  } = useQuery<AnalyticsData>({
    queryKey: ["admin-ga4-analytics"],
    queryFn: async () => {
      const res = await fetch("/api/admin/analytics");
      if (!res.ok) throw new Error("Không thể tải dữ liệu Google Analytics");
      return res.json();
    },
    refetchInterval: 30000, // Tự động làm mới mỗi 30 giây để cập nhật realtime
    staleTime: 15000,
  });

  const formatDuration = (seconds: number) => {
    if (!seconds || seconds <= 0) return "0s";
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    if (mins > 0) return `${mins}m ${secs}s`;
    return `${secs}s`;
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
      {/* Header Bar */}
      <div className="p-6 sm:p-7 border-b border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-gradient-to-r from-slate-50/80 via-white to-amber-50/30">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 text-white flex items-center justify-center shadow-xs">
              <span className="material-symbols-outlined text-xl">insights</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-black text-slate-900">
                  Google Analytics 4 (GA4)
                </h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Đang đồng bộ trực tiếp
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Báo cáo số liệu người dùng và lưu lượng thực tế (Property: {data?.propertyId || "553375189"})
              </p>
            </div>
          </div>
        </div>

        {/* Realtime Badge & Refresh Button */}
        <div className="flex items-center gap-3 self-end sm:self-auto">
          {/* Realtime Indicator */}
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 shadow-2xs">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-black">
              {data?.activeUsersNow ?? 0}
            </span>
            <span className="text-[11px] font-semibold text-emerald-700">
              khách đang online
            </span>
          </div>

          {/* Refresh button */}
          <button
            onClick={() => refetch()}
            disabled={isRefetching}
            className="p-2 rounded-xl text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-all cursor-pointer disabled:opacity-50"
            title="Làm mới số liệu ngay"
          >
            <span
              className={`material-symbols-outlined text-lg block ${
                isRefetching ? "animate-spin" : ""
              }`}
            >
              refresh
            </span>
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="p-8 space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 animate-pulse">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-24 bg-slate-100 rounded-2xl" />
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-pulse">
            <div className="h-48 bg-slate-100 rounded-2xl lg:col-span-2" />
            <div className="h-48 bg-slate-100 rounded-2xl" />
          </div>
        </div>
      ) : error ? (
        <div className="p-8 text-center text-slate-500">
          <span className="material-symbols-outlined text-4xl text-rose-400 mb-2 block">
            error
          </span>
          <p className="text-xs font-semibold text-rose-600">
            Không thể tải số liệu GA4 lúc này. Vui lòng kiểm tra lại cấu hình.
          </p>
        </div>
      ) : (
        <div className="p-6 sm:p-7 space-y-6">
          {/* 4 Summary Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {/* 1. Lượt xem trang */}
            <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/70">
              <div className="flex items-center justify-between text-slate-500 text-xs font-bold mb-1">
                <span>Lượt xem trang</span>
                <span className="material-symbols-outlined text-base text-blue-600">visibility</span>
              </div>
              <div className="text-2xl font-black text-slate-900">
                {data?.overview.screenPageViews.toLocaleString("vi-VN") || 0}
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">7 ngày gần nhất</p>
            </div>

            {/* 2. Phiên truy cập */}
            <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/70">
              <div className="flex items-center justify-between text-slate-500 text-xs font-bold mb-1">
                <span>Số phiên (Sessions)</span>
                <span className="material-symbols-outlined text-base text-amber-600">query_stats</span>
              </div>
              <div className="text-2xl font-black text-slate-900">
                {data?.overview.sessions.toLocaleString("vi-VN") || 0}
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">Lượt vào web</p>
            </div>

            {/* 3. Người dùng tương tác */}
            <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/70">
              <div className="flex items-center justify-between text-slate-500 text-xs font-bold mb-1">
                <span>Người dùng (Users)</span>
                <span className="material-symbols-outlined text-base text-emerald-600">person</span>
              </div>
              <div className="text-2xl font-black text-slate-900">
                {data?.overview.activeUsers.toLocaleString("vi-VN") || 0}
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">Khách truy cập</p>
            </div>

            {/* 4. Thời lượng trung bình */}
            <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/70">
              <div className="flex items-center justify-between text-slate-500 text-xs font-bold mb-1">
                <span>Thời gian TB / phiên</span>
                <span className="material-symbols-outlined text-base text-purple-600">timer</span>
              </div>
              <div className="text-2xl font-black text-slate-900">
                {formatDuration(data?.overview.avgSessionDurationSec || 0)}
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Tỷ lệ thoát: {data?.overview.bounceRatePercent || 0}%
              </p>
            </div>
          </div>

          {/* Deep Breakdown: Top Pages & Traffic Sources */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left: Top Pages (7 cols) */}
            <div className="lg:col-span-7 bg-slate-50/50 rounded-2xl p-5 border border-slate-200/80 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200/60 pb-3">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm text-[#641D06]">trending_up</span>
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    Top Trang Được Xem Nhiều Nhất
                  </h3>
                </div>
                <span className="text-[11px] text-slate-400">7 ngày qua</span>
              </div>

              {data?.topPages && data.topPages.length > 0 ? (
                <div className="space-y-2.5">
                  {data.topPages.map((page, idx) => (
                    <div
                      key={idx}
                      className="bg-white p-3 rounded-xl border border-slate-200/60 flex items-center justify-between gap-3 shadow-2xs hover:border-amber-400 transition-colors"
                    >
                      <div className="flex items-center gap-2.5 min-w-0 flex-1">
                        <span className="w-5 h-5 rounded-md bg-slate-100 text-slate-600 text-[10px] font-bold flex items-center justify-center shrink-0">
                          {idx + 1}
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-bold text-slate-800 truncate" title={page.title}>
                            {page.title || page.path}
                          </p>
                          <p className="text-[10px] text-slate-400 font-mono truncate">{page.path}</p>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-xs font-black text-[#641D06]">
                          {page.views.toLocaleString("vi-VN")}
                        </span>
                        <span className="text-[10px] text-slate-400 block">lượt xem</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center text-slate-400 text-xs">
                  Chưa có đủ lượt truy cập trong 7 ngày qua. Dữ liệu sẽ tự động xuất hiện khi có khách vào web.
                </div>
              )}
            </div>

            {/* Right: Sources & Devices (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              {/* Traffic Sources */}
              <div className="bg-slate-50/50 rounded-2xl p-5 border border-slate-200/80 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200/60 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm text-emerald-700">route</span>
                    <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                      Nguồn Truy Cập
                    </h3>
                  </div>
                </div>

                {data?.trafficSources && data.trafficSources.length > 0 ? (
                  <div className="space-y-3">
                    {data.trafficSources.map((source, idx) => (
                      <div key={idx} className="space-y-1">
                        <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                          <span>{source.source}</span>
                          <span className="text-slate-500 font-semibold">{source.percentage}% ({source.sessions})</span>
                        </div>
                        <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-emerald-500 to-amber-500 rounded-full"
                            style={{ width: `${Math.max(5, source.percentage)}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-6 text-center text-slate-400 text-xs">
                    Đang đợi ghi nhận nguồn truy cập...
                  </div>
                )}
              </div>

              {/* Devices */}
              <div className="bg-slate-50/50 rounded-2xl p-5 border border-slate-200/80 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-200/60 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm text-purple-700">devices</span>
                    <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                      Thiết Bị Người Dùng
                    </h3>
                  </div>
                </div>

                {data?.devices && data.devices.length > 0 ? (
                  <div className="grid grid-cols-2 gap-3 pt-1">
                    {data.devices.map((dev, idx) => (
                      <div
                        key={idx}
                        className="bg-white p-3 rounded-xl border border-slate-200/60 flex items-center gap-2.5"
                      >
                        <span className="material-symbols-outlined text-xl text-slate-500">
                          {dev.device.includes("Mobile")
                            ? "phone_iphone"
                            : dev.device.includes("Tablet")
                            ? "tablet_mac"
                            : "computer"}
                        </span>
                        <div>
                          <div className="text-xs font-black text-slate-900">{dev.percentage}%</div>
                          <div className="text-[10px] text-slate-500 leading-tight truncate">
                            {dev.device.split(" ")[0]}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-4 text-center text-slate-400 text-xs">
                    Chưa có số liệu thiết bị
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
