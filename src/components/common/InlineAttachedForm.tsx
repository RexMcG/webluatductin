"use client";

import React from "react";
import Link from "next/link";
import { MatchedForm } from "@/utils/section-form-matcher";

interface InlineAttachedFormProps {
  form: MatchedForm;
}

export default function InlineAttachedForm({ form }: InlineAttachedFormProps) {
  if (!form) return null;

  const targetUrl = `/ai-form-library?formId=${form.id}&q=${encodeURIComponent(form.title)}&preview=1`;

  return (
    <div className="my-5 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-50/90 via-[#FFFDF8] to-orange-50/70 border-2 border-amber-300/90 shadow-xs hover:shadow-md hover:border-amber-400 transition-all duration-200 relative overflow-hidden group">
      {/* Brand accent top stripe */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#641D06] via-amber-600 to-amber-400" />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {/* Left: Icon & Form Details */}
        <div className="flex items-start gap-3.5 flex-1 min-w-0">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#641D06] to-[#401204] text-amber-300 flex items-center justify-center shrink-0 shadow-sm mt-0.5 border border-amber-400/30">
            <span className="material-symbols-outlined text-2xl">description</span>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className="inline-flex items-center gap-1 text-[10.5px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-200/90 text-[#641D06] border border-amber-300 shadow-2xs">
                <span>📎 Biểu mẫu đính kèm giai đoạn này</span>
              </span>
              <span className="inline-flex items-center gap-1 text-[10.5px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                <span className="material-symbols-outlined text-xs">verified</span>
                <span>Chuẩn pháp lý 2026</span>
              </span>
              {form.category && (
                <span className="text-[10px] text-slate-500 font-medium px-2 py-0.5 rounded-md bg-white border border-slate-200">
                  {form.category}
                </span>
              )}
            </div>

            <h4 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-[#641D06] transition-colors leading-snug">
              {form.title}
            </h4>

            {form.description && (
              <p className="text-xs text-slate-600 line-clamp-2 mt-1 leading-relaxed">
                {form.description}
              </p>
            )}
          </div>
        </div>

        {/* Right: Call to action button */}
        <Link
          href={targetUrl}
          className="w-full sm:w-auto shrink-0 px-4 py-2.5 rounded-xl bg-[#641D06] hover:bg-[#4E1604] text-white text-xs font-bold transition-all duration-200 flex items-center justify-center gap-2 shadow-sm hover:shadow-md active:scale-98 cursor-pointer whitespace-nowrap"
        >
          <span className="material-symbols-outlined text-base">visibility</span>
          <span>Xem trước &amp; Tải mẫu</span>
          <span className="material-symbols-outlined text-xs group-hover:translate-x-0.5 transition-transform">
            arrow_forward
          </span>
        </Link>
      </div>
    </div>
  );
}
