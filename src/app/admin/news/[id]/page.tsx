"use client";

import React from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { newsService } from "@/services/news.service";
import NewsEditorForm from "@/components/admin/NewsEditorForm";

export default function AdminEditArticlePage() {
  const params = useParams();
  const idStr = params.id as string;
  const idNum = parseInt(idStr, 10);

  const { data: newsList, isLoading } = useQuery({
    queryKey: ["admin-news-list"],
    queryFn: () => newsService.getNewsList(),
  });

  const article = (newsList || []).find((a: any) => a.id === idNum || String(a.id) === idStr || a.slug === idStr);

  if (isLoading) {
    return (
      <div className="py-24 text-center text-slate-400 text-xs">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#641D06] mx-auto mb-2"></div>
        Đang tải nội dung bài viết thật từ máy chủ...
      </div>
    );
  }

  if (!article) {
    return (
      <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center space-y-4 max-w-lg mx-auto mt-10">
        <span className="material-symbols-outlined text-4xl text-amber-600">warning</span>
        <h2 className="text-lg font-bold text-slate-900">Không tìm thấy bài viết ID #{idStr}</h2>
        <p className="text-xs text-slate-500">Bài viết có thể đã bị xóa hoặc không tồn tại trên hệ thống.</p>
      </div>
    );
  }

  return (
    <NewsEditorForm
      isEdit={true}
      initialData={{
        id: article.id,
        title: article.title,
        slug: article.slug,
        category: article.category || "Pháp Luật 2026",
        thumbnailUrl: article.thumbnailUrl || "",
        summary: article.summary || "",
        content: article.content || "",
        layoutStyle: article.layoutStyle || "word-navigation",
        diagramType: article.diagramType || (article.flowchart ? "flowchart" : article.mindmap ? "mindmap" : "none"),
        mindmap: article.mindmap || "",
        flowchart: article.flowchart || "",
        sections: article.sections || [],
      }}
    />
  );
}
