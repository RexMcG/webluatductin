import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const SYNC_SECRET = process.env.LAYA_SYNC_SECRET || "ductin_laya_secret_2026";

// Path to store synced articles (supports serverless /tmp fallback on Vercel)
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

// GET: Lấy danh sách tin tức do Laya Worker đẩy lên
export async function GET(req: NextRequest) {
  try {
    let articles = readStoredArticles();
    const { searchParams } = new URL(req.url);
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

    return NextResponse.json({
      success: true,
      total: articles.length,
      lastSync: articles.length > 0 ? articles[0].syncedAt : null,
      articles,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST: Nhận bài viết từ Laya Worker (Laptop hoặc Mac Mini bắn lên)
export async function POST(req: NextRequest) {
  try {
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
    const existingUrls = new Set(currentArticles.map((a: any) => a.url));

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

    return NextResponse.json({
      success: true,
      message: `Đã đồng bộ thành công ${newItems.length} bài viết từ Laya Worker!`,
      totalSynced: newItems.length,
      totalInDatabase: merged.length,
      syncedAt: timestamp,
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
