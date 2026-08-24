"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function FloatingChatWidget() {
  const pathname = usePathname();

  // Hide widget if already on the chatbot page
  if (pathname === "/ai-chatbot") {
    return null;
  }

  return (
    <div className="hidden md:flex fixed bottom-6 right-6 z-50 items-center gap-3">
      {/* Tooltip bubble */}
      <Link
        href="/ai-chatbot"
        className="hidden md:flex items-center gap-2 bg-white text-slate-800 text-xs font-bold px-3.5 py-2 rounded-xl shadow-lg border border-slate-200 hover:border-emerald-500 hover:text-emerald-700 transition-all group"
      >
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
        <span>Hỏi Luật sư AI 24/7</span>
        <span className="material-symbols-outlined text-sm text-slate-400 group-hover:text-emerald-600 transition-colors">
          arrow_forward
        </span>
      </Link>

      {/* Main floating button */}
      <Link
        href="/ai-chatbot"
        aria-label="Trợ lý Pháp lý AI"
        className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-700 to-emerald-500 text-white flex items-center justify-center shadow-xl hover:shadow-2xl hover:scale-105 transition-all relative border-2 border-white cursor-pointer group"
      >
        <span className="material-symbols-outlined text-2xl group-hover:rotate-12 transition-transform">
          smart_toy
        </span>
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 rounded-full border-2 border-white flex items-center justify-center text-[9px] font-bold text-white">
          1
        </span>
      </Link>
    </div>
  );
}
