"use client";

import React, { useState } from "react";
import Link from "next/link";

interface ArticleLinkData {
  title: string;
  slug: string;
  category: string;
  badge: string;
  summary: string;
  keyPoints: string[];
  thumbnailUrl: string;
}

interface CalculatorGuideProps {
  type: "salary" | "pit" | "court-fee";
}

export function InfoTooltip({
  title,
  content,
  articleSlug,
  sectionId,
}: {
  title: string;
  content: string;
  articleSlug?: string;
  sectionId?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  // Auto-resolve article link if not explicitly provided
  let targetSlug = articleSlug;
  let targetHash = sectionId ? `#${sectionId}` : "";

  if (!targetSlug) {
    const t = title.toLowerCase();
    if (
      t.includes("gross") ||
      t.includes("net") ||
      t.includes("khu vực") ||
      t.includes("vùng") ||
      t.includes("khoản trừ bảo hiểm") ||
      t.includes("bảo hiểm")
    ) {
      targetSlug = "phan-biet-luong-gross-vs-luong-net-trach-nhiem-dong-bao-hiem-2026";
      targetHash = t.includes("khoản trừ") || t.includes("khu vực") || t.includes("vùng") ? "#heading-sec-2" : "#heading-sec-1";
    } else if (
      t.includes("thu nhập") ||
      t.includes("phụ thuộc") ||
      t.includes("giảm trừ") ||
      t.includes("thuế tncn")
    ) {
      targetSlug = "huong-dan-tinh-thue-tncn-giam-tru-gia-canh-dang-ky-nguoi-phu-thuoc-2026";
      targetHash = t.includes("phụ thuộc") ? "#heading-sec-3" : "#heading-sec-2";
    } else if (
      t.includes("tranh chấp") ||
      t.includes("tòa án") ||
      t.includes("án phí") ||
      t.includes("giá ngạch") ||
      t.includes("xét xử") ||
      t.includes("miễn") ||
      t.includes("giảm") ||
      t.includes("tài sản")
    ) {
      targetSlug = "quy-dinh-muc-an-phi-tam-ung-an-phi-ai-phai-chiu-an-phi-toa-an-2026";
      if (t.includes("tạm ứng") || t.includes("giá trị") || t.includes("tài sản")) targetHash = "#heading-sec-2";
      else if (t.includes("ai chịu") || t.includes("thắng") || t.includes("thua")) targetHash = "#heading-sec-3";
      else if (t.includes("miễn") || t.includes("giảm")) targetHash = "#heading-sec-4";
      else targetHash = "#heading-sec-1";
    }
  }

  const fullHref = targetSlug ? `/news/${targetSlug}${targetHash}` : null;

  return (
    <div
      className="relative inline-block ml-1.5 align-middle group/tooltip"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        type="button"
        onClick={() => {
          if (fullHref) {
            window.location.href = fullHref;
          } else {
            setIsOpen(!isOpen);
          }
        }}
        className="w-4 h-4 rounded-full bg-amber-100 hover:bg-amber-300 text-[#641D06] hover:text-slate-950 text-[10px] font-bold inline-flex items-center justify-center cursor-pointer transition-colors border border-amber-300 shadow-2xs"
        title={fullHref ? "Bấm để chuyển tới bài viết giải thích chi tiết" : "Bấm xem chú thích pháp lý nhanh"}
        aria-label={`Chú thích: ${title}`}
      >
        i
      </button>

      {isOpen && (
        <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2.5 w-72 sm:w-80 p-3.5 bg-[#0f172a] text-white rounded-2xl shadow-2xl z-50 text-xs leading-relaxed animate-fadeIn pointer-events-auto border border-slate-700">
          <div className="font-bold text-amber-300 mb-1.5 flex items-center justify-between gap-1 border-b border-slate-800 pb-1.5">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-xs text-amber-400">gavel</span>
              <span className="font-black text-xs text-amber-300">{title}</span>
            </div>
            {fullHref && (
              <span className="text-[9px] text-amber-200/80 font-normal">Click xem bài viết →</span>
            )}
          </div>

          <p className="text-slate-200 text-[11.5px] leading-relaxed mb-2.5">{content}</p>

          {fullHref && (
            <Link
              href={fullHref}
              className="w-full py-1.5 px-3 bg-[#C0963B] hover:bg-amber-400 text-slate-950 rounded-xl font-bold text-[11px] flex items-center justify-center gap-1.5 transition-all shadow-sm hover:shadow-md cursor-pointer"
            >
              <span>Xem bài viết giải thích chi tiết</span>
              <span className="material-symbols-outlined text-xs">arrow_forward</span>
            </Link>
          )}

          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#0f172a]"></div>
        </div>
      )}
    </div>
  );
}

export default function CalculatorGuide({ type }: CalculatorGuideProps) {
  const articlesData: Record<string, ArticleLinkData> = {
    salary: {
      title: "Phân Biệt Lương Gross vs Lương Net & Trách Nhiệm Đóng Bảo Hiểm 2026",
      slug: "phan-biet-luong-gross-vs-luong-net-trach-nhiem-dong-bao-hiem-2026",
      category: "Lao Động & Tiền Lương",
      badge: "🧠 Cẩm Nang Pháp Lý Chuyên Sâu",
      summary:
        "Cẩm nang toàn diện phân tích sự khác biệt pháp lý giữa Lương Gross và Lương Net, bảng phân định nghĩa vụ đóng bảo hiểm 32% (NLĐ 10.5% vs Doanh nghiệp 21.5%) và lời khuyên đàm phán hợp đồng từ Luật sư.",
      keyPoints: [
        "Định nghĩa chuẩn và công thức chuyển đổi chính xác giữa Lương Gross & Net.",
        "Bảng phân định tỷ lệ đóng BHXH, BHYT, BHTN 32% giữa Người lao động & Doanh nghiệp.",
        "Vì sao người lao động nên ưu tiên đàm phán Lương Gross để tối đa quyền lợi thai sản, ốm đau?",
        "Chế tài xử phạt hành chính và trách nhiệm hình sự (Điều 216 BLHS) khi trốn đóng BHXH.",
      ],
      thumbnailUrl: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=800&auto=format&fit=crop",
    },
    pit: {
      title: "Hướng Dẫn Tính Thuế TNCN, Giảm Trừ Gia Cảnh & Người Phụ Thuộc 2026",
      slug: "huong-dan-tinh-thue-tncn-giam-tru-gia-canh-dang-ky-nguoi-phu-thuoc-2026",
      category: "Thuế & Tài Chính Doanh Nghiệp",
      badge: "🧠 Cẩm Nang Pháp Lý Chuyên Sâu",
      summary:
        "Hướng dẫn chi tiết cách tính thuế TNCN theo biểu thuế lũy tiến từng phần 7 bậc, điều kiện và thủ tục đăng ký người phụ thuộc để giảm trừ 4.4 triệu/tháng hợp pháp.",
      keyPoints: [
        "Căn cứ xác định cá nhân cư trú và đối tượng bắt buộc phải nộp thuế TNCN.",
        "Mức giảm trừ gia cảnh: 11 triệu/tháng (bản thân) và 4.4 triệu/tháng (người phụ thuộc).",
        "Công thức và minh họa biểu thuế lũy tiến từng phần 7 bậc (từ 5% đến 35%).",
        "Hồ sơ, thủ tục đăng ký người phụ thuộc và quy trình quyết toán thuế cuối năm.",
      ],
      thumbnailUrl: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?q=80&w=800&auto=format&fit=crop",
    },
    "court-fee": {
      title: "Quy Định Mức Án Phí, Tạm Ứng Án Phí & Ai Phải Chịu Án Phí Tòa Án 2026",
      slug: "quy-dinh-muc-an-phi-tam-ung-an-phi-ai-phai-chiu-an-phi-toa-an-2026",
      category: "Tranh Tụng & Tố Tụng Tòa Án",
      badge: "🧠 Cẩm Nang Pháp Lý Chuyên Sâu",
      summary:
        "Cẩm nang tố tụng toàn diện: Phân biệt án phí có giá ngạch vs không giá ngạch, mức tiền tạm ứng án phí 50% và nguyên tắc bên thua kiện chịu án phí theo Nghị quyết 326/2016.",
      keyPoints: [
        "Phân biệt vụ án không có giá ngạch (300.000đ) vs vụ án có giá ngạch theo tài sản tranh chấp.",
        "Mức tạm ứng án phí (50%) và địa điểm nộp tại Chi cục Thi hành án dân sự.",
        "Nguyên tắc 'Bên thua kiện chịu án phí' và mức giảm 50% khi hai bên hòa giải thành công.",
        "Danh mục các trường hợp được miễn 100% án phí (người nghèo, người có công, đòi nợ lương...).",
      ],
      thumbnailUrl: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=800&auto=format&fit=crop",
    },
  };

  const article = articlesData[type];

  return (
    <div className="mt-12 bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Banner Top */}
      <div className="bg-[#641D06] px-6 py-4 text-white flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-amber-300 text-xl">menu_book</span>
          <span className="font-bold text-xs sm:text-sm tracking-wide uppercase text-amber-100">
            Cẩm Nang Kiến Thức Pháp Lý Chuyên Sâu
          </span>
        </div>
        <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30">
          Chuyên mục: {article.category}
        </span>
      </div>

      {/* Article Preview Card */}
      <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
        {/* Left Column: Image with Badge */}
        <div className="lg:col-span-4 relative rounded-2xl overflow-hidden shadow-sm group">
          <img
            src={article.thumbnailUrl}
            alt={article.title}
            className="w-full h-56 sm:h-64 object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-4">
            <span className="inline-block bg-purple-600/90 backdrop-blur-xs text-white text-[11px] font-bold px-3 py-1 rounded-lg mb-1 shadow-xs">
              {article.badge}
            </span>
            <span className="text-white text-xs font-medium">Bố cục Mindmap trực quan 4 đề mục</span>
          </div>
        </div>

        {/* Right Column: Information & Key Points */}
        <div className="lg:col-span-8 flex flex-col justify-between space-y-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-[#641D06] text-xs font-bold mb-2 border border-amber-200">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              Bài viết phân tích bởi Luật sư Phan Đức Tín
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
              {article.title}
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm mt-2 leading-relaxed">
              {article.summary}
            </p>
          </div>

          {/* Key Topics in Article */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
            <div className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm text-[#641D06]">checklist</span>
              <span>Nội dung chính được phân tích trong bài:</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
              {article.keyPoints.map((point, i) => (
                <div key={i} className="flex items-start gap-1.5">
                  <span className="text-amber-600 font-bold shrink-0">✓</span>
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Links */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              href={`/news/${article.slug}`}
              className="inline-flex items-center gap-2 bg-[#641D06] hover:bg-black text-white font-bold px-6 py-3 rounded-2xl text-xs sm:text-sm shadow-md transition-all active:scale-95 group"
            >
              <span>Đọc toàn văn bài viết kèm sơ đồ Mindmap</span>
              <span className="material-symbols-outlined text-base group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </Link>

            <Link
              href="/appointment"
              className="inline-flex items-center gap-2 bg-amber-50 hover:bg-amber-100 text-[#641D06] font-bold px-5 py-3 rounded-2xl text-xs sm:text-sm border border-amber-200 transition-colors"
            >
              <span className="material-symbols-outlined text-base">calendar_month</span>
              <span>Đặt lịch tư vấn Luật sư</span>
            </Link>

            <Link
              href="/ai-chatbot"
              className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 text-xs font-bold px-3 py-2 transition-colors ml-auto"
            >
              <span className="material-symbols-outlined text-base">smart_toy</span>
              <span>Hỏi AI 24/7</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
