"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import MindmapVisual from "@/components/common/MindmapVisual";
import FlowchartVisual from "@/components/common/FlowchartVisual";
import { newsService } from "@/services/news.service";

export interface SectionDraft {
  id: string;
  number: string;
  title: string;
  summary: string;
  content: string;
}

export interface NewsArticleDraft {
  id?: number;
  title: string;
  slug: string;
  category: string;
  thumbnailUrl: string;
  summary: string;
  content: string;
  layoutStyle: "word-navigation" | "cards" | "word-headings";
  diagramType: "mindmap" | "flowchart" | "none";
  mindmap: string;
  flowchart: string;
  sections: SectionDraft[];
}

export default function NewsEditorForm({
  initialData,
  isEdit = false,
}: {
  initialData?: Partial<NewsArticleDraft>;
  isEdit?: boolean;
}) {
  const router = useRouter();

  const [formData, setFormData] = useState<NewsArticleDraft>({
    id: initialData?.id,
    title: initialData?.title || "",
    slug: initialData?.slug || "",
    category: initialData?.category || "Tranh Tụng & Pháp Luật 2026",
    thumbnailUrl:
      initialData?.thumbnailUrl ||
      "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=800&auto=format&fit=crop",
    summary: initialData?.summary || "",
    content: initialData?.content || "",
    layoutStyle: initialData?.layoutStyle || "word-navigation",
    diagramType:
      initialData?.diagramType ||
      (initialData?.flowchart ? "flowchart" : initialData?.mindmap ? "mindmap" : "none"),
    mindmap:
      initialData?.mindmap ||
      `Tâm: Vấn Đề Pháp Lý & Tranh Chấp
- 01. Nhánh Khởi Đầu
  + Điểm lưu ý 1
  + Căn cứ pháp lý
- 02. Nhánh Thủ Tục
  + Hồ sơ chuẩn bị
  + Thời hạn quy định
- 03. Nhánh Khởi Kiện
  + Cơ quan có thẩm quyền
  + Tạm ứng án phí
- 04. Nhánh Thi Hành Án
  + Xác minh tài sản
  + Kê biên phát mại`,
    flowchart:
      initialData?.flowchart ||
      `Quy trình: 5 Bước Giải Quyết Tình Huống Pháp Lý
1. Tiếp Nhận & Rà Soát Hồ Sơ | Thẩm định tính pháp lý | Hợp đồng, Vi bằng, Chứng từ công nợ
2. Gửi Thư Khuyến Cáo Pháp Lý (LOD) | Đàm phán tiền tố tụng | Thời hạn trả lời 7-10 ngày làm việc
3. Nộp Đơn Khởi Kiện Ra Tòa Án | TAND cấp có thẩm quyền | Nộp tạm ứng án phí 50%
4. Tham Gia Hòa Giải & Tranh Tụng | Bảo vệ quyền lợi hợp pháp | Đối chất chứng cứ tại phiên tòa
5. Yêu Cầu Thi Hành Án Dân Sự | Thu hồi dứt điểm quyền lợi | Cưỡng chế & Phát mại tài sản`,
    sections:
      initialData?.sections && initialData.sections.length > 0
        ? initialData.sections
        : [
            {
              id: "sec-1",
              number: "01",
              title: "Đánh giá pháp lý & Xác định căn cứ",
              summary: "Phân loại dạng tranh chấp và rà soát hồ sơ tài liệu trước khi hành động.",
              content: "<p class='mb-2 leading-relaxed'>Nội dung phân tích chi tiết cho mục 01 theo quy định pháp luật hiện hành...</p>",
            },
            {
              id: "sec-2",
              number: "02",
              title: "Kỹ thuật đàm phán & Phát hành Thư khuyến cáo (LOD)",
              summary: "Tạo áp lực pháp lý tối đa buộc đối tác ngồi vào bàn thương lượng thiện chí.",
              content: "<p class='mb-2 leading-relaxed'>Nội dung phân tích chi tiết cho mục 02 và các giải pháp thực chiến...</p>",
            },
          ],
  });

  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Helper to generate slug from title
  const handleTitleChange = (val: string) => {
    setFormData((prev) => ({
      ...prev,
      title: val,
      slug: prev.slug || val.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-"),
    }));
  };

  // Section Handlers
  const addSection = () => {
    const nextNum = String(formData.sections.length + 1).padStart(2, "0");
    const newSec: SectionDraft = {
      id: `sec-${Date.now()}`,
      number: nextNum,
      title: `Mục ${nextNum}: Tiêu đề mục nội dung mới`,
      summary: "Tóm tắt ngắn gọn ý chính của mục này...",
      content: "<p class='mb-2 leading-relaxed'>Nhập nội dung chi tiết của mục này tại đây...</p>",
    };
    setFormData((prev) => ({
      ...prev,
      sections: [...prev.sections, newSec],
    }));
  };

  const removeSection = (index: number) => {
    if (formData.sections.length <= 1) {
      alert("Bài viết phải có ít nhất 1 mục nội dung.");
      return;
    }
    setFormData((prev) => ({
      ...prev,
      sections: prev.sections.filter((_, i) => i !== index),
    }));
  };

  const updateSection = (index: number, field: keyof SectionDraft, value: string) => {
    setFormData((prev) => {
      const updated = [...prev.sections];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, sections: updated };
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      setErrorMessage("Vui lòng nhập Tiêu đề bài viết.");
      return;
    }

    setIsSaving(true);
    setErrorMessage("");

    try {
      const payload = {
        title: formData.title.trim(),
        slug: formData.slug.trim(),
        category: formData.category.trim(),
        thumbnailUrl: formData.thumbnailUrl || null,
        summary: formData.summary.trim(),
        content: formData.content.trim(),
        layoutStyle: formData.layoutStyle,
        diagramType: formData.diagramType,
        mindmap: formData.diagramType === "mindmap" ? formData.mindmap : undefined,
        flowchart: formData.diagramType === "flowchart" ? formData.flowchart : undefined,
        sections: formData.sections,
        status: "published" as const,
      };

      if (isEdit && formData.id) {
        await newsService.updateNews(formData.id, payload);
        setSuccessMessage("Đã cập nhật bài viết thành công!");
      } else {
        await newsService.createNews(payload);
        setSuccessMessage("Đã tạo và xuất bản bài viết mới thành công!");
      }

      setTimeout(() => {
        router.push("/admin/news");
      }, 1200);
    } catch (err: any) {
      setErrorMessage(err.message || "Lỗi khi lưu bài viết vào máy chủ.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSave} className="space-y-8 max-w-[1600px] mx-auto pb-24">
      {/* Top Header (Clean, Non-overlapping) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-3xl border border-slate-200 shadow-2xs mb-6">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/news"
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
            title="Quay lại danh sách bài viết"
          >
            <span className="material-symbols-outlined text-lg">arrow_back</span>
          </Link>
          <div>
            <h1 className="text-lg sm:text-xl font-black text-slate-900">
              {isEdit ? "Chỉnh Sửa Bài Viết Chuyên Sâu" : "Soạn Thảo Bài Viết & Sơ Đồ Mới"}
            </h1>
            <p className="text-[11px] text-slate-500">
              Giao diện soạn thảo toàn diện: Thông tin chung ➔ Chọn sơ đồ đồ họa ➔ Soạn {formData.sections.length} Mục chuyên sâu
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {successMessage && (
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3.5 py-2 rounded-xl border border-emerald-200 flex items-center gap-1.5 animate-bounce">
              <span className="material-symbols-outlined text-base">check_circle</span>
              {successMessage}
            </span>
          )}

          {errorMessage && (
            <span className="text-xs font-bold text-red-700 bg-red-50 px-3.5 py-2 rounded-xl border border-red-200 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-base">error</span>
              {errorMessage}
            </span>
          )}

          <button
            type="submit"
            disabled={isSaving}
            className="bg-[#641D06] hover:bg-black text-white font-bold text-xs px-6 py-3 rounded-2xl flex items-center gap-2 transition-all shadow-sm cursor-pointer disabled:opacity-50"
          >
            <span className="material-symbols-outlined text-lg">
              {isSaving ? "sync" : "publish"}
            </span>
            <span>{isSaving ? "Đang lưu vào hệ thống..." : isEdit ? "Lưu Cập Nhật" : "Xuất Bản Bài Viết Thật"}</span>
          </button>
        </div>
      </div>

      {/* =========================================================
          KHỐI 1: THÔNG TIN CƠ BẢN & BỐ CỤC BÀI VIẾT
         ========================================================= */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-2xs space-y-6">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <span className="w-7 h-7 rounded-xl bg-amber-100 text-amber-900 font-black text-xs flex items-center justify-center">
            01
          </span>
          <h2 className="font-bold text-slate-900 text-base">
            Thông Tin Cơ Bản &amp; Bố Cục Giao Diện Bài Viết
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          <div className="md:col-span-12 space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase">
              Tiêu đề bài viết / Cẩm nang pháp lý: <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Ví dụ: Cẩm Nang Pháp Lý Toàn Diện Về Tranh Chấp Hợp Đồng Kinh Tế & Thu Hồi Nợ 2026..."
              className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#641D06] focus:bg-white font-bold text-slate-900"
            />
          </div>

          <div className="md:col-span-6 space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase">Đường dẫn Slug bài viết:</label>
            <input
              type="text"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              placeholder="cam-nang-tranh-chap-hop-dong-kinh-te"
              className="w-full px-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#641D06] text-slate-700 font-mono"
            />
          </div>

          <div className="md:col-span-6 space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase">Lĩnh vực / Danh mục:</label>
            <input
              type="text"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              placeholder="Tranh Tụng & Thu Hồi Nợ"
              className="w-full px-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#641D06] text-slate-800"
            />
          </div>

          <div className="md:col-span-12 space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase">
              Ảnh bìa đại diện (Thumbnail URL):
            </label>
            <input
              type="text"
              value={formData.thumbnailUrl}
              onChange={(e) => setFormData({ ...formData, thumbnailUrl: e.target.value })}
              placeholder="https://images.unsplash.com/photo-..."
              className="w-full px-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#641D06] text-slate-700"
            />
          </div>

          <div className="md:col-span-12 space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase">
              Tóm lược cẩm nang (Hiển thị trong khung vàng ở đầu bài viết):
            </label>
            <textarea
              rows={3}
              value={formData.summary}
              onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
              placeholder="Tóm tắt 2-3 câu ngắn gọn làm nổi bật giá trị và giải pháp của cẩm nang..."
              className="w-full px-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#641D06] text-slate-800 leading-relaxed"
            />
          </div>

          {/* Layout Style Choice */}
          <div className="md:col-span-12 space-y-2 pt-2 border-t border-slate-100">
            <label className="text-xs font-bold text-slate-700 uppercase block">
              Chọn Kiểu Bố Cục Hiển Thị Cho Bài Viết:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                {
                  id: "word-navigation",
                  name: "Word 3 Cột (Khuyên Dùng)",
                  desc: "Cột trái Mục Lục cố định + Cột giữa nội dung siêu rộng + Cột phải bài viết đề xuất",
                  badge: "Chuẩn 8 - 10 Mục",
                },
                {
                  id: "cards",
                  name: "Dạng Thẻ (Cards Accordion)",
                  desc: "Các mục hiển thị dạng thẻ hộp đóng mở mở rộng",
                  badge: "Phổ thông",
                },
                {
                  id: "word-headings",
                  name: "Dạng Word Tiêu Chuẩn",
                  desc: "Hiển thị tuần tự các đề mục lớn",
                  badge: "Truyền thống",
                },
              ].map((layout) => (
                <label
                  key={layout.id}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                    formData.layoutStyle === layout.id
                      ? "border-[#641D06] bg-amber-50/50 shadow-xs"
                      : "border-slate-200 bg-white hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-xs text-slate-900">{layout.name}</span>
                    <input
                      type="radio"
                      name="layoutStyle"
                      checked={formData.layoutStyle === layout.id}
                      onChange={() =>
                        setFormData({ ...formData, layoutStyle: layout.id as any })
                      }
                      className="accent-[#641D06]"
                    />
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed">{layout.desc}</p>
                  <span className="mt-2 text-[10px] font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded w-fit">
                    {layout.badge}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================
          KHỐI 2: CHỌN SƠ ĐỒ ĐỒ HỌA PHÙ HỢP VỚI BÀI VIẾT (MINDMAP HOẶC FLOWCHART)
         ========================================================= */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-2xs space-y-6">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <span className="w-7 h-7 rounded-xl bg-purple-100 text-purple-900 font-black text-xs flex items-center justify-center">
            02
          </span>
          <div>
            <h2 className="font-bold text-slate-900 text-base">
              Chọn Loại Sơ Đồ Đồ Họa Phù Hợp Với Bài Viết
            </h2>
            <p className="text-[11px] text-slate-500">
              Chọn Sơ đồ Tư duy (Mindmap) hoặc Sơ đồ Quy trình (Flowchart) để người đọc nắm bắt trực quan
            </p>
          </div>
        </div>

        {/* 3 Diagram Option Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              id: "mindmap",
              name: "Sơ Đồ Tư Duy (Mindmap)",
              icon: "bubble_chart",
              desc: "Tỏa ra từ Tâm ➔ Dành cho bài viết TÓM TẮT ĐIỂM MỚI, phân tích nhiều khía cạnh luật",
              badge: "Tóm tắt điểm mới",
              color: "border-purple-600 bg-purple-50/40",
            },
            {
              id: "flowchart",
              name: "Sơ Đồ Quy Trình (Flowchart)",
              icon: "schema",
              desc: "Các bước tuần tự ➔ Dành cho bài viết TƯ VẤN TÌNH HUỐNG (Bước 1 ➔ Bước 2 ➔ Bước 3)",
              badge: "Tư vấn tình huống",
              color: "border-amber-600 bg-amber-50/40",
            },
            {
              id: "none",
              name: "Không Dùng Sơ Đồ",
              icon: "block",
              desc: "Bài viết chỉ có chữ và các mục thông thường, không kèm khung sơ đồ đồ họa",
              badge: "Thuần văn bản",
              color: "border-slate-400 bg-slate-50",
            },
          ].map((diag) => (
            <label
              key={diag.id}
              className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                formData.diagramType === diag.id
                  ? `${diag.color} shadow-xs`
                  : "border-slate-200 bg-white hover:border-slate-300"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-base">{diag.icon}</span>
                  {diag.name}
                </span>
                <input
                  type="radio"
                  name="diagramType"
                  checked={formData.diagramType === diag.id}
                  onChange={() => setFormData({ ...formData, diagramType: diag.id as any })}
                  className="accent-purple-600"
                />
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">{diag.desc}</p>
              <span className="mt-2 text-[10px] font-bold text-slate-700 bg-white/80 px-2 py-0.5 rounded border w-fit">
                {diag.badge}
              </span>
            </label>
          ))}
        </div>

        {/* Live Editor + Preview for Mindmap */}
        {formData.diagramType === "mindmap" && (
          <div className="pt-4 border-t border-slate-100 space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-5 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-purple-900 uppercase">
                    Cú pháp nhập Sơ Đồ Mindmap:
                  </label>
                  <span className="text-[10px] text-slate-400 font-mono">Tự động vẽ Live</span>
                </div>
                <textarea
                  rows={13}
                  value={formData.mindmap}
                  onChange={(e) => setFormData({ ...formData, mindmap: e.target.value })}
                  className="w-full p-3 font-mono text-xs bg-slate-900 text-emerald-400 rounded-2xl focus:outline-none border border-slate-800 leading-relaxed"
                />
                <p className="text-[11px] text-slate-500">
                  💡 <em>Quy tắc:</em> Dòng đầu <code>Tâm: ...</code>, các nhánh chính bắt đầu bằng <code>- 01. ...</code>, các ý con bắt đầu bằng <code>+ ...</code>
                </p>
              </div>

              <div className="lg:col-span-7 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-purple-900 uppercase">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  Khung Live Preview Sơ Đồ Tư Duy Mindmap (Hiển Thị Trực Tiếp):
                </div>
                <div className="border border-purple-200 rounded-2xl bg-slate-50 p-2 overflow-hidden shadow-2xs">
                  <MindmapVisual rawText={formData.mindmap} />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Live Editor + Preview for Flowchart */}
        {formData.diagramType === "flowchart" && (
          <div className="pt-4 border-t border-slate-100 space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-5 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-amber-900 uppercase">
                    Cú pháp nhập Sơ Đồ Quy Trình Flowchart:
                  </label>
                  <span className="text-[10px] text-slate-400 font-mono">Tự động vẽ Live</span>
                </div>
                <textarea
                  rows={13}
                  value={formData.flowchart}
                  onChange={(e) => setFormData({ ...formData, flowchart: e.target.value })}
                  className="w-full p-3 font-mono text-xs bg-slate-900 text-amber-300 rounded-2xl focus:outline-none border border-slate-800 leading-relaxed"
                />
                <p className="text-[11px] text-slate-500">
                  💡 <em>Quy tắc:</em> Dòng đầu <code>Quy trình: ...</code>, mỗi bước ghi <code>1. Tiêu đề | Phụ đề | Chi tiết 1, Chi tiết 2</code>
                </p>
              </div>

              <div className="lg:col-span-7 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-900 uppercase">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  Khung Live Preview Sơ Đồ Quy Trình Flowchart (Hiển Thị Trực Tiếp):
                </div>
                <div className="border border-amber-200 rounded-2xl bg-slate-50 p-2 overflow-hidden shadow-2xs">
                  <FlowchartVisual rawText={formData.flowchart} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* =========================================================
          KHỐI 3: SOẠN THẢO NỘI DUNG TỪNG MỤC (MỤC 01 ➔ MỤC 10)
         ========================================================= */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-2xs space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-xl bg-blue-100 text-blue-900 font-black text-xs flex items-center justify-center">
              03
            </span>
            <div>
              <h2 className="font-bold text-slate-900 text-base">
                Nội Dung Chi Tiết Từng Mục ({formData.sections.length} Mục Chuyên Sâu)
              </h2>
              <p className="text-[11px] text-slate-500">
                Soạn thảo tiêu đề, tóm tắt và nội dung của từng phần đề mục trong bài viết
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={addSection}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-base">add_circle</span>
            Thêm Mục Mới
          </button>
        </div>

        {/* Sections List */}
        <div className="space-y-6">
          {formData.sections.map((sec, idx) => (
            <div
              key={sec.id}
              className="bg-slate-50/70 p-6 rounded-3xl border border-slate-200/90 shadow-2xs space-y-4 relative"
            >
              <div className="flex items-center justify-between border-b border-slate-200/60 pb-3">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-xl bg-[#641D06] text-white font-black text-xs flex items-center justify-center shadow-xs">
                    {sec.number || String(idx + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-bold text-slate-900 text-sm">
                    Mục {idx + 1}: {sec.title || "Chưa đặt tiêu đề"}
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => removeSection(idx)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                  title="Xóa mục này"
                >
                  <span className="material-symbols-outlined text-base">delete</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className="md:col-span-2 space-y-1">
                  <label className="text-[11px] font-bold text-slate-600 uppercase">Số TT:</label>
                  <input
                    type="text"
                    value={sec.number}
                    onChange={(e) => updateSection(idx, "number", e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#641D06] font-bold text-center"
                  />
                </div>

                <div className="md:col-span-10 space-y-1">
                  <label className="text-[11px] font-bold text-slate-600 uppercase">
                    Tiêu đề mục: <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={sec.title}
                    onChange={(e) => updateSection(idx, "title", e.target.value)}
                    placeholder="Ví dụ: Phân loại và đánh giá rủi ro pháp lý các dạng tranh chấp..."
                    className="w-full px-4 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#641D06] font-bold text-slate-900"
                  />
                </div>

                <div className="md:col-span-12 space-y-1">
                  <label className="text-[11px] font-bold text-slate-600 uppercase">
                    Tóm tắt ý chính của mục:
                  </label>
                  <input
                    type="text"
                    value={sec.summary}
                    onChange={(e) => updateSection(idx, "summary", e.target.value)}
                    placeholder="Nhận diện 4 nhóm tranh chấp cốt lõi: Chậm thanh toán, vi phạm chất lượng..."
                    className="w-full px-4 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#641D06] text-slate-700"
                  />
                </div>

                <div className="md:col-span-12 space-y-1">
                  <label className="text-[11px] font-bold text-slate-600 uppercase">
                    Nội dung chi tiết của mục (Chữ, đoạn văn bản, danh sách căn cứ):
                  </label>
                  <textarea
                    rows={6}
                    value={sec.content}
                    onChange={(e) => updateSection(idx, "content", e.target.value)}
                    placeholder="<p class='mb-3'>Nội dung chi tiết...</p><p>– Gạch đầu dòng thứ nhất...</p>"
                    className="w-full px-4 py-3 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#641D06] text-slate-800 leading-relaxed font-mono"
                  />
                </div>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={addSection}
            className="w-full py-4 rounded-3xl border-2 border-dashed border-slate-300 hover:border-[#641D06] hover:bg-amber-50/40 text-slate-700 hover:text-[#641D06] font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-lg">add_circle</span>
            Thêm Mục Thứ {formData.sections.length + 1}
          </button>
        </div>
      </div>

      {/* Bottom Floating Save Button */}
      <div className="flex items-center justify-end gap-3 pt-4">
        <Link
          href="/admin/news"
          className="px-6 py-3 rounded-2xl text-xs font-bold text-slate-600 hover:bg-slate-200 bg-slate-100 transition-colors"
        >
          Hủy Bỏ
        </Link>
        <button
          type="submit"
          disabled={isSaving}
          className="bg-[#641D06] hover:bg-black text-white font-bold text-xs px-8 py-3.5 rounded-2xl flex items-center gap-2 transition-all shadow-md cursor-pointer disabled:opacity-50"
        >
          <span className="material-symbols-outlined text-lg">
            {isSaving ? "sync" : "publish"}
          </span>
          <span>{isSaving ? "Đang lưu..." : isEdit ? "Lưu Cập Nhật Bài Viết" : "Xuất Bản Bài Viết Thật"}</span>
        </button>
      </div>
    </form>
  );
}
