import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 - Không Tìm Thấy Trang | Luật Đức Tín & Cộng Sự",
  description: "Trang bạn đang tìm kiếm không tồn tại hoặc đã được thay đổi địa chỉ.",
};

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center bg-slate-50 px-4 py-16">
      <div className="max-w-2xl w-full text-center bg-white rounded-3xl p-8 sm:p-14 border border-slate-200 shadow-xl relative overflow-hidden">
        {/* Background glow decoration */}
        <div className="absolute -top-24 -right-24 w-60 h-60 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-[#641D06]/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* 404 Badge with Scales of Justice Icon */}
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-amber-100/80 text-[#641D06] mb-6 shadow-sm">
          <span className="material-symbols-outlined text-4xl">gavel</span>
        </div>

        <div className="text-5xl sm:text-7xl font-black text-[#641D06] font-sans tracking-tight mb-2">
          404
        </div>

        <div className="text-xs sm:text-sm font-bold text-amber-700 uppercase tracking-widest mb-4">
          — ĐƯỜNG DẪN KHÔNG TỒN TẠI —
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">
          Không Tìm Thấy Trang Yêu Cầu
        </h1>

        <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-8 max-w-md mx-auto">
          Liên kết bạn truy cập có thể đã hết hạn, bị xóa hoặc thay đổi cấu trúc. Đội ngũ Luật sư Đức Tín luôn sẵn sàng đồng hành cùng bạn.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <Link
            href="/"
            className="bg-[#641D06] hover:bg-black text-white font-bold px-6 py-3.5 rounded-xl uppercase text-xs sm:text-sm shadow-md transition-colors flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-base">home</span>
            Về Trang Chủ
          </Link>

          <Link
            href="/ai-chatbot"
            className="bg-amber-50 hover:bg-amber-100 text-amber-950 border border-amber-300 font-bold px-6 py-3.5 rounded-xl uppercase text-xs sm:text-sm transition-colors flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-base">smart_toy</span>
            Hỏi Trợ Lý AI 24/7
          </Link>

          <Link
            href="/services"
            className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold px-6 py-3.5 rounded-xl uppercase text-xs sm:text-sm transition-colors flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-base">apps</span>
            Dịch Vụ Pháp Lý
          </Link>
        </div>

        {/* Hotline Support Note */}
        <div className="mt-10 pt-6 border-t border-slate-100 text-xs text-slate-500 flex items-center justify-center gap-2">
          <span>Cần hỗ trợ gấp?</span>
          <a href="tel:0937863263" className="text-emerald-700 font-bold hover:underline inline-flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">call</span>
            Hotline: 093 786 32 63 (Ls. Phan Đức Tín)
          </a>
        </div>
      </div>
    </div>
  );
}
