import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL 
  ? process.env.NEXT_PUBLIC_API_URL.replace(/\/+$/, "").replace(/\/api\/v1$/, "")
  : "https://webluat-backend.onrender.com";

const BRIDGE_API = `${BACKEND_URL}/api/v1/laya-bridge`;

// GET: Proxy trạng thái, polling, kiểm tra job, lấy danh sách bài viết từ Backend 24/7
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const action = searchParams.get("action");

    // 1. Worker Polling
    if (action === "poll_job") {
      const res = await fetch(`${BRIDGE_API}/poll?${searchParams.toString()}`, { cache: "no-store" });
      const data = await res.json().catch(() => ({}));
      return NextResponse.json(data);
    }

    // 2. Kiểm tra trạng thái Worker Online/Offline
    if (action === "status") {
      try {
        const res = await fetch(`${BRIDGE_API}/status`, { cache: "no-store" });
        const data = await res.json();
        return NextResponse.json(data);
      } catch (err: any) {
        return NextResponse.json({ success: true, isOnline: false, lastHeartbeat: 0, error: err.message });
      }
    }

    // 3. Kiểm tra tiến độ lệnh quét (check_job)
    if (action === "check_job") {
      const res = await fetch(`${BRIDGE_API}/check-job?${searchParams.toString()}`, { cache: "no-store" });
      const data = await res.json().catch(() => ({}));
      return NextResponse.json(data);
    }

    // 4. Lấy danh sách bài viết đã có
    try {
      const res = await fetch(`${BRIDGE_API}/articles?${searchParams.toString()}`, { cache: "no-store" });
      const data = await res.json().catch(() => ({}));
      if (data && data.success) {
        return NextResponse.json(data);
      }
    } catch {}

    return NextResponse.json({
      success: true,
      total: 0,
      articles: [],
      isOnline: false,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || "Lỗi cầu nối Laya Bridge." }, { status: 500 });
  }
}

// POST: Gửi lệnh quét từ xa HOẶC nộp kết quả bài viết từ Worker
export async function POST(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const action = searchParams.get("action");
    const body = await req.json().catch(() => ({}));

    // 1. Web Admin yêu cầu quét từ xa sang Laptop
    if (action === "request_scan") {
      const res = await fetch(`${BRIDGE_API}/request-scan`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        cache: "no-store",
      });
      const data = await res.json().catch(() => ({}));
      return NextResponse.json(data, { status: res.status });
    }

    // 2. Worker nộp kết quả bài viết
    const res = await fetch(`${BRIDGE_API}/submit-result`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      cache: "no-store",
    });
    const data = await res.json().catch(() => ({}));
    return NextResponse.json(data, { status: res.status });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || "Lỗi xử lý đồng bộ tin tức Laya." }, { status: 500 });
  }
}
