"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { newsService } from "@/services/news.service";

export default function AdminNewsListPage() {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const { data: newsList, isLoading } = useQuery({
    queryKey: ["admin-news-list"],
    queryFn: () => newsService.getNewsList(),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => newsService.deleteNews(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-news-list"] });
      setDeletingId(null);
    },
  });

  const handleDelete = async (id: number, title: string) => {
    if (confirm(`Bạn có chắc chắn muốn xóa bài viết: "${title}" không?`)) {
      setDeletingId(id);
      deleteMutation.mutate(id);
    }
  };

  const filteredNews = (newsList || []).filter((item: any) => {
    const matchSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.summary && item.summary.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchCategory =
      categoryFilter === "all" || item.category?.toLowerCase() === categoryFilter.toLowerCase();
    return matchSearch && matchCategory;
  });

  const categories = Array.from(
    new Set((newsList || []).map((item: any) => item.category).filter(Boolean))
  );

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-blue-50 text-blue-700">
              <span className="material-symbols-outlined text-xl">article</span>
            </span>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900">
              Quản Lý Bài Viết &amp; Cẩm Nang Pháp Lý
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Dữ liệu thật kết nối Backend: Soạn thảo, chỉnh sửa, xóa các bài cẩm nang chuyên sâu và sơ đồ Mindmap / Flowchart
          </p>
        </div>

        <Link
          href="/admin/news/new"
          className="bg-[#641D06] hover:bg-black text-white font-bold text-xs px-5 py-3 rounded-2xl flex items-center justify-center gap-2 transition-colors shadow-sm self-start sm:self-auto"
        >
          <span className="material-symbols-outlined text-lg">add_circle</span>
          Tạo Bài Viết Mới
        </Link>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-96">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm kiếm theo tiêu đề bài viết hoặc tóm tắt..."
            className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#641D06] focus:bg-white text-slate-800"
          />
          <span className="material-symbols-outlined absolute left-3 top-2.5 text-sm text-slate-400">
            search
          </span>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <span className="text-xs font-semibold text-slate-500 shrink-0">Lọc danh mục:</span>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:border-[#641D06] text-slate-800 font-medium"
          >
            <option value="all">Tất cả danh mục ({newsList?.length || 0})</option>
            {categories.map((cat: any) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* News Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="py-20 text-center text-slate-400 text-xs">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#641D06] mx-auto mb-2"></div>
            Đang tải dữ liệu bài viết thật từ máy chủ...
          </div>
        ) : filteredNews.length === 0 ? (
          <div className="py-20 text-center text-slate-400 text-xs">
            Không tìm thấy bài viết nào phù hợp.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200 uppercase tracking-wider text-[10px]">
                  <th className="py-3.5 px-4 w-12 text-center">STT</th>
                  <th className="py-3.5 px-4">Tiêu đề bài viết</th>
                  <th className="py-3.5 px-4 w-44">Lĩnh vực / Danh mục</th>
                  <th className="py-3.5 px-4 w-32">Bố cục hiển thị</th>
                  <th className="py-3.5 px-4 w-32">Sơ đồ đính kèm</th>
                  <th className="py-3.5 px-4 w-32 text-center">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {filteredNews.map((article: any, idx: number) => (
                  <tr key={article.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-4 text-center font-bold text-slate-400">
                      {idx + 1}
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-bold text-slate-900 text-sm line-clamp-1">
                        {article.title}
                      </div>
                      <div className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                        Slug: /{article.slug}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-50 text-amber-900 border border-amber-200">
                        {article.category || "Pháp luật chung"}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="font-mono text-[11px] bg-slate-100 px-2 py-0.5 rounded border text-slate-600">
                        {article.layoutStyle || "word-navigation"}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      {article.mindmap ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-lg border border-purple-200">
                          <span className="material-symbols-outlined text-xs">bubble_chart</span> Mindmap
                        </span>
                      ) : article.flowchart ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
                          <span className="material-symbols-outlined text-xs">schema</span> Flowchart
                        </span>
                      ) : (
                        <span className="text-slate-400 text-[11px]">Không có</span>
                      )}
                    </td>
                    <td className="py-4 px-4 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <Link
                          href={`/news/${article.slug}`}
                          target="_blank"
                          className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                          title="Xem trên web"
                        >
                          <span className="material-symbols-outlined text-base">visibility</span>
                        </Link>
                        <Link
                          href={`/admin/news/${article.id}`}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-[#641D06] hover:bg-amber-50 transition-colors"
                          title="Chỉnh sửa bài viết"
                        >
                          <span className="material-symbols-outlined text-base">edit</span>
                        </Link>
                        <button
                          type="button"
                          disabled={deletingId === article.id}
                          onClick={() => handleDelete(article.id, article.title)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                          title="Xóa bài viết"
                        >
                          <span className="material-symbols-outlined text-base">
                            {deletingId === article.id ? "hourglass_empty" : "delete"}
                          </span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
