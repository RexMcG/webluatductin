import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const SYNC_SECRET = process.env.LAYA_SYNC_SECRET || "ductin_laya_secret_2026";

// Path to store synced articles
function getStoreFilePath() {
  const localDir = path.join(process.cwd(), "data");
  if (!fs.existsSync(localDir)) {
    try {
      fs.mkdirSync(localDir, { recursive: true });
    } catch {
      return path.join("/tmp", "laya_synced_articles.json");
    }
  }
  return path.join(localDir, "laya_synced_articles.json");
}

function getStateFilePath() {
  const localDir = path.join(process.cwd(), "data");
  if (!fs.existsSync(localDir)) {
    try {
      fs.mkdirSync(localDir, { recursive: true });
    } catch {
      return path.join("/tmp", "laya_worker_state.json");
    }
  }
  return path.join(localDir, "laya_worker_state.json");
}

function readStoredArticles() {
  try {
    const filePath = getStoreFilePath();
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, "utf-8");
      return JSON.parse(content);
    }
  } catch (err) {
    console.warn("Read stored laya articles error:", err);
  }
  return [];
}

function saveStoredArticles(articles: any[]) {
  try {
    const filePath = getStoreFilePath();
    fs.writeFileSync(filePath, JSON.stringify(articles, null, 2), "utf-8");
  } catch (err) {
    console.warn("Save stored laya articles error:", err);
  }
}

function readWorkerState() {
  try {
    const filePath = getStateFilePath();
    if (fs.existsSync(filePath)) {
      return JSON.parse(fs.readFileSync(filePath, "utf-8"));
    }
  } catch (err) {}
  return { lastHeartbeat: 0, device: "", pendingJob: null };
}

function saveWorkerState(state: any) {
  try {
    const filePath = getStateFilePath();
    fs.writeFileSync(filePath, JSON.stringify(state, null, 2), "utf-8");
  } catch (err) {}
}

// GET: Lấy danh sách tin tức do Laya Worker đẩy lên HOẶC kiểm tra trạng thái / polling job
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const action = searchParams.get("action");

    // 1. Worker Polling & Heartbeat (từ laptop gửi lên)
    if (action === "poll_job") {
      const authHeader = req.headers.get("x-laya-secret");
      const secret = searchParams.get("secret");
      if (authHeader !== SYNC_SECRET && secret !== SYNC_SECRET) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }

      const state = readWorkerState();
      state.lastHeartbeat = Date.now();
      state.device = searchParams.get("device") || "Laptop Windows (Laya Multilingual)";
      saveWorkerState(state);

      // Trả về job nếu có và job còn hạn (< 45s)
      const job = state.pendingJob;
      const isJobValid = job && job.status === "pending" && Date.now() - (job.createdAt || 0) < 45000;

      return NextResponse.json({
        success: true,
        isOnline: true,
        pendingJob: isJobValid ? job : null,
      });
    }

    // 2. Kiểm tra trạng thái Worker Online/Offline (dành cho Web Admin UI)
    if (action === "status") {
      const state = readWorkerState();
      const isOnline = Date.now() - (state.lastHeartbeat || 0) < 25000;
      return NextResponse.json({
        success: true,
        isOnline,
        lastHeartbeat: state.lastHeartbeat || 0,
        device: state.device || "Chưa có thiết bị",
      });
    }

    // 3. Kiểm tra tiến độ lệnh quét (Web Admin polling sau khi bấm Quét)
    if (action === "check_job") {
      const jobId = searchParams.get("jobId");
      const state = readWorkerState();
      if (state.pendingJob && state.pendingJob.id === jobId) {
        return NextResponse.json({
          success: true,
          status: state.pendingJob.status, // "pending" | "completed" | "failed"
          articles: state.pendingJob.results || [],
          error: state.pendingJob.error || null,
        });
      }
      return NextResponse.json({
        success: true,
        status: "not_found",
      });
    }

    // 4. Mặc định: Lấy danh sách tin tức đã lưu
    let articles = readStoredArticles();
    const limit = Number(searchParams.get("limit")) || 0;
    const category = searchParams.get("category");
    const minScore = Number(searchParams.get("minScore")) || 0;

    if (category && category !== "all") {
      articles = articles.filter(
        (a: any) =>
          a.category?.toLowerCase().includes(category.toLowerCase()) ||
          a.title?.toLowerCase().includes(category.toLowerCase()) ||
          a.question?.toLowerCase().includes(category.toLowerCase())
      );
    }

    if (minScore > 0) {
      articles = articles.filter((a: any) => (a.layaScore || 0) >= minScore);
    }

    if (limit > 0) {
      articles = articles.slice(0, limit);
    }

    const state = readWorkerState();
    const isOnline = Date.now() - (state.lastHeartbeat || 0) < 25000;

    return NextResponse.json({
      success: true,
      total: articles.length,
      lastSync: articles.length > 0 ? articles[0].syncedAt : null,
      isOnline,
      articles,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST: Nhận bài viết từ Laya Worker HOẶC yêu cầu quét từ xa từ Web Admin
export async function POST(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const action = searchParams.get("action");

    // 1. Web Admin yêu cầu quét từ xa sang Laptop (On-demand scan trigger)
    if (action === "request_scan") {
      const state = readWorkerState();
      const isOnline = Date.now() - (state.lastHeartbeat || 0) < 25000;
      if (!isOnline) {
        return NextResponse.json(
          {
            success: false,
            error: "offline",
            message: "Quét không thành công: Máy tính chưa bật Laya Worker (Trạng thái: Offline). Vui lòng bật laptop và chạy lệnh 'python run_laya_worker.py'!",
          },
          { status: 503 }
        );
      }

      const body = await req.json().catch(() => ({}));
      const newJob = {
        id: `scan_job_${Date.now()}`,
        status: "pending",
        limit: Number(body.limit) || 20,
        category: body.category || "all",
        minScore: Number(body.minScore) || 0,
        createdAt: Date.now(),
        results: null,
      };

      state.pendingJob = newJob;
      saveWorkerState(state);

      return NextResponse.json({
        success: true,
        jobId: newJob.id,
        message: "Đã gửi lệnh quét sang Laptop thành công! Đang chờ Laya phân tích...",
      });
    }

    // 2. Nhận bài viết gửi lên từ Worker
    const authHeader = req.headers.get("x-laya-secret");
    const body = await req.json().catch(() => ({}));

    // Verify secret key
    if (authHeader !== SYNC_SECRET && body.apiKey !== SYNC_SECRET) {
      return NextResponse.json(
        { error: "Unauthorized: Mã bí mật x-laya-secret không chính xác." },
        { status: 401 }
      );
    }

    const incomingArticles = Array.isArray(body.articles) ? body.articles : [];
    if (incomingArticles.length === 0) {
      return NextResponse.json({
        success: true,
        message: "Không có bài viết mới nào được gửi lên.",
        total: 0,
      });
    }

    const currentArticles = readStoredArticles();
    const timestamp = new Date().toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" });

    const newItems = incomingArticles.map((item: any, idx: number) => ({
      id: item.id || `laya-sync-${Date.now()}-${idx}`,
      title: item.title,
      snippet: item.snippet || item.summary || item.title,
      url: item.url,
      date: item.date || "Vừa cập nhật",
      sourceName: item.sourceName || "Laya Worker",
      layaCategory: item.layaCategory || "Tư Vấn Pháp Luật",
      layaScore: item.layaScore || 4.0,
      layaConfidence: item.layaConfidence || 95.0,
      isWorthWriting: item.isWorthWriting !== false,
      syncedAt: timestamp,
    }));

    // Merge: Put new articles on top, deduplicate by URL, keep max 100 items
    const merged = [...newItems, ...currentArticles.filter((a: any) => !newItems.some((n: any) => n.url === a.url))].slice(0, 100);
    saveStoredArticles(merged);

    // Cập nhật trạng thái job nếu có jobId
    const state = readWorkerState();
    if (body.jobId && state.pendingJob && state.pendingJob.id === body.jobId) {
      state.pendingJob.status = "completed";
      state.pendingJob.results = newItems;
      saveWorkerState(state);
    }

    return NextResponse.json({
      success: true,
      message: `Đã đồng bộ thành công ${newItems.length} bài viết từ Laya Worker!`,
      totalSynced: newItems.length,
      totalInDatabase: merged.length,
      syncedAt: timestamp,
      articles: newItems,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Lỗi xử lý đồng bộ tin tức Laya." },
      { status: 500 }
    );
  }
}

// DELETE: Xóa hoặc làm sạch hộp thư tin Laya
export async function DELETE(req: NextRequest) {
  try {
    saveStoredArticles([]);
    return NextResponse.json({ success: true, message: "Đã làm trống hộp thư tin Laya." });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
