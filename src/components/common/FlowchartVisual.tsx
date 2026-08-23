"use client";

import React, { useState } from "react";

export interface PhaseStepItem {
  code: string;
  title: string;
}

export interface PhaseTreeRow {
  phaseNumber: number;
  label: string;
  mainTitle: string;
  subSteps: PhaseStepItem[];
  theme: {
    outerBorder: string;
    outerBg: string;
    badgeBg: string;
    borderLeft: string;
    lineColor: string;
    tagBg: string;
    hoverBorder: string;
  };
}

export interface PhaseFlowData {
  title: string;
  phases: PhaseTreeRow[];
}

// BỘ MÀU TỐI GIẢN CÓ KHUNG BỌC NGOÀI PHỦ MÀU ĐỒNG BỘ TINH TẾ (CHỮ MÀU TRẮNG TINH KHIẾT TRÊN BADGE GIAI ĐOẠN 4)
const PERFECT_PHASE_THEMES = [
  // 1. GIAI ĐOẠN 1: #641D06 (Đỏ Đô Thẫm)
  {
    outerBorder: "border-2 border-[#641D06]/30",
    outerBg: "bg-amber-50/60",
    badgeBg: "bg-[#641D06] text-amber-300 font-black",
    borderLeft: "border-l-4 border-[#641D06]",
    lineColor: "bg-[#641D06]",
    tagBg: "bg-[#641D06] text-white font-bold",
    hoverBorder: "hover:border-[#641D06]",
  },
  // 2. GIAI ĐOẠN 2: #1D3540 (Xanh Đen Đô Thị)
  {
    outerBorder: "border-2 border-[#1D3540]/30",
    outerBg: "bg-blue-50/60",
    badgeBg: "bg-[#1D3540] text-white font-black",
    borderLeft: "border-l-4 border-[#1D3540]",
    lineColor: "bg-[#1D3540]",
    tagBg: "bg-[#1D3540] text-white font-bold",
    hoverBorder: "hover:border-[#1D3540]",
  },
  // 3. GIAI ĐOẠN 3: #708061 (Xanh Rêu Trầm Sage)
  {
    outerBorder: "border-2 border-[#708061]/30",
    outerBg: "bg-emerald-50/60",
    badgeBg: "bg-[#708061] text-white font-black",
    borderLeft: "border-l-4 border-[#708061]",
    lineColor: "bg-[#708061]",
    tagBg: "bg-[#708061] text-white font-bold",
    hoverBorder: "hover:border-[#708061]",
  },
  // 4. GIAI ĐOẠN 4: #C0963B (Vàng Kim Hàng Hiệu - ĐÃ CHUYỂN CHỮ BADGE & TAG SANG MÀU TRẮNG TEXT-WHITE)
  {
    outerBorder: "border-2 border-[#C0963B]/30",
    outerBg: "bg-yellow-50/60",
    badgeBg: "bg-[#C0963B] text-white font-black",
    borderLeft: "border-l-4 border-[#C0963B]",
    lineColor: "bg-[#C0963B]",
    tagBg: "bg-[#C0963B] text-white font-bold",
    hoverBorder: "hover:border-[#C0963B]",
  },
  // 5. GIAI ĐOẠN 5: #5C5550 (Xám Đá Trầm Charcoal)
  {
    outerBorder: "border-2 border-[#5C5550]/30",
    outerBg: "bg-stone-100/60",
    badgeBg: "bg-[#5C5550] text-white font-black",
    borderLeft: "border-l-4 border-[#5C5550]",
    lineColor: "bg-[#5C5550]",
    tagBg: "bg-[#5C5550] text-white font-bold",
    hoverBorder: "hover:border-[#5C5550]",
  },
  // 6. GIAI ĐOẠN 6: #641D06 (Đỏ Hồng Điểm Nhấn Cuối)
  {
    outerBorder: "border-2 border-[#641D06]/30",
    outerBg: "bg-rose-50/60",
    badgeBg: "bg-[#641D06] text-white font-black",
    borderLeft: "border-l-4 border-[#641D06]",
    lineColor: "bg-[#641D06]",
    tagBg: "bg-[#641D06] text-white font-bold",
    hoverBorder: "hover:border-[#641D06]",
  },
];

export function parsePhaseFlowData(rawText: string): PhaseFlowData | null {
  if (!rawText) return null;

  const lines = rawText.split("\n").map((l) => l.trim()).filter((l) => l.length > 0);
  let title = "SƠ ĐỒ QUY TRÌNH THỰC HIỆN TỪNG BƯỚC";
  const phases: PhaseTreeRow[] = [];
  let currentPhase: PhaseTreeRow | null = null;
  let themeIdx = 0;

  for (const line of lines) {
    if (
      line.toLowerCase().startsWith("quy trình:") ||
      line.toLowerCase().startsWith("tiêu đề:") ||
      line.toLowerCase().startsWith("title:") ||
      line.toLowerCase().startsWith("flowchart:")
    ) {
      title = line.replace(/^(quy trình|tiêu đề|title|flowchart):/i, "").trim();
    } else {
      const match = line.match(/^(\d+|Bước \d+)[\.:\s]+([^|]+)(?:\|([^|]+))?(?:\|([^|]+))?$/i);
      if (match) {
        const stepNum = match[1].replace(/Bước\s*/i, "").trim();
        const mainTitle = match[2].trim();
        const detailsRaw = match[4] || match[3];

        const theme = PERFECT_PHASE_THEMES[themeIdx % PERFECT_PHASE_THEMES.length];
        themeIdx++;

        currentPhase = {
          phaseNumber: Number(stepNum) || themeIdx,
          label: `GIAI ĐOẠN ${stepNum}`,
          mainTitle,
          theme,
          subSteps: [],
        };
        phases.push(currentPhase);

        if (detailsRaw) {
          const detailItems = detailsRaw.split(",").map((d) => d.trim()).filter(Boolean);
          detailItems.forEach((item, sIdx) => {
            currentPhase?.subSteps.push({
              code: `Bước ${stepNum}.${sIdx + 1}`,
              title: item,
            });
          });
        }
      } else if (line.startsWith("-") || line.startsWith("+") || line.startsWith("•")) {
        if (currentPhase) {
          const cleanLine = line.replace(/^[-+•\s]+/, "").trim();
          const parts = cleanLine.split("|").map((p) => p.trim());
          const subTitle = parts[0];
          if (subTitle) {
            currentPhase.subSteps.push({
              code: `Bước ${currentPhase.phaseNumber}.${currentPhase.subSteps.length + 1}`,
              title: subTitle,
            });
          }
        }
      }
    }
  }

  if (phases.length === 0) return null;
  return { title, phases };
}

export default function FlowchartVisual({ rawText }: { rawText?: string }) {
  const [isOpen, setIsOpen] = useState(true);
  const data = rawText ? parsePhaseFlowData(rawText) : null;

  if (!data || data.phases.length === 0) return null;

  return (
    <div className="my-6 w-full rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 shadow-2xs">
      {/* Header Bar Tối Giản */}
      <div className="flex items-center justify-between gap-3 border-b border-slate-100 pb-3.5 mb-5">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 text-[#641D06] border border-amber-200 shadow-2xs">
            <span className="material-symbols-outlined text-lg">account_tree</span>
          </span>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#641D06]">
              Sơ Đồ Tố Tụng Chuẩn ({data.phases.length} Giai Đoạn)
            </span>
            <h4 className="font-extrabold text-slate-900 text-sm sm:text-base mt-0.5">
              {data.title}
            </h4>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-sm">
            {isOpen ? "visibility_off" : "visibility"}
          </span>
          <span>{isOpen ? "Thu gọn" : "Xem sơ đồ"}</span>
        </button>
      </div>

      {/* =========================================================
          SƠ ĐỒ TREE DIAGRAM KHUNG BỌC NGOÀI PHỦ MÀU THEO GIAI ĐOẠN (HOÀN HẢO CHUẨN ĐÚNG Ý KHÁCH HÀNG)
         ========================================================= */}
      {isOpen && (
        <div className="w-full flex flex-col items-center space-y-3.5">
          {data.phases.map((phaseRow, idx) => {
            const isLast = idx === data.phases.length - 1;
            const subCount = phaseRow.subSteps.length;

            return (
              <React.Fragment key={idx}>
                {/* KHUNG BỌC GIAI ĐOẠN NỔI BẬT THEO TÔNG MÀU NHẬN DIỆN */}
                <div className={`w-full rounded-2xl p-3 sm:p-4 flex flex-col items-center transition-all ${phaseRow.theme.outerBorder} ${phaseRow.theme.outerBg}`}>
                  
                  {/* THANH HEADER TIÊU ĐỀ GIAI ĐOẠN CHỮ MÀU ĐEN SẮC NÉT & VIỀN MÀU ĐIỂM NHẤN */}
                  <div className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-white border border-slate-200/80 shadow-2xs ${phaseRow.theme.borderLeft}`}>
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className={`px-2.5 py-0.5 rounded-md text-[10.5px] uppercase tracking-wider shrink-0 shadow-2xs ${phaseRow.theme.badgeBg}`}>
                        {phaseRow.label}
                      </span>
                      <h5 className="text-xs sm:text-sm font-extrabold text-slate-900 truncate">
                        {phaseRow.mainTitle}
                      </h5>
                    </div>
                    <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200 shrink-0 hidden sm:inline-block">
                      Bước {phaseRow.phaseNumber}
                    </span>
                  </div>

                  {/* CÁC BƯỚC PHỤ PHÂN NHÁNH CÂY (IF ANY) */}
                  {subCount > 0 && (
                    <div className="w-full flex flex-col items-center mt-1.5">
                      {/* Thân nối đứng mang màu giai đoạn */}
                      <div className={`w-0.5 h-3 ${phaseRow.theme.lineColor}`} />

                      {/* Thanh ngang phân nhánh mang màu giai đoạn */}
                      {subCount > 1 && (
                        <div className="w-full max-w-4xl relative flex items-center justify-center">
                          <div className={`w-[85%] h-0.5 ${phaseRow.theme.lineColor} rounded-full`} />
                        </div>
                      )}

                      {/* HÀNG CÁC Ô BƯỚC PHỤ THẺ TRẮNG TINH KHÔI */}
                      <div
                        className={`w-full grid gap-2.5 px-1 items-stretch ${
                          subCount === 1
                            ? "grid-cols-1 max-w-md"
                            : subCount === 2
                            ? "grid-cols-1 sm:grid-cols-2 max-w-xl"
                            : subCount === 3
                            ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 max-w-3xl"
                            : "grid-cols-1 sm:grid-cols-2 md:grid-cols-4 max-w-4xl"
                        }`}
                      >
                        {phaseRow.subSteps.map((sub, sIdx) => (
                          <div key={sIdx} className="flex flex-col items-center">
                            {/* Đường chân nối đứng */}
                            <div className={`w-0.5 h-2.5 ${phaseRow.theme.lineColor}`} />

                            <div className={`w-full p-3 rounded-xl bg-white border border-slate-200 ${phaseRow.theme.hoverBorder} hover:shadow-xs transition-all flex flex-col justify-between`}>
                              <span className={`text-[9.5px] font-extrabold uppercase tracking-wider px-1.5 py-0.5 rounded inline-block mb-1.5 self-start ${phaseRow.theme.tagBg}`}>
                                {sub.code}
                              </span>
                              <h6 className="text-[11.5px] sm:text-xs font-bold text-slate-800 leading-snug whitespace-normal break-words">
                                {sub.title}
                              </h6>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* MỤI TÊN DỌC CHỈA XUỐNG SANG GIAI ĐOẠN TIẾP THEO */}
                {!isLast && (
                  <div className="flex flex-col items-center justify-center my-1 select-none">
                    <div className="w-0.5 h-2.5 bg-slate-300" />
                    <div className="w-5.5 h-5.5 rounded-full bg-white border border-slate-300 flex items-center justify-center shadow-2xs -my-0.5 z-10">
                      <span className="material-symbols-outlined text-[11px] font-black text-[#641D06]">
                        arrow_downward
                      </span>
                    </div>
                    <div className="w-0.5 h-2.5 bg-slate-300" />
                  </div>
                )}
              </React.Fragment>
            );
          })}

          {/* Footer Note Tối Giản */}
          <div className="w-full flex items-center justify-between text-[10px] text-slate-500 pt-3 mt-4 border-t border-slate-100">
            <span className="flex items-center gap-1 font-medium">
              <span className="material-symbols-outlined text-xs text-[#641D06]">gavel</span>
              Công ty Luật TNHH Đức Tín &amp; Cộng sự
            </span>
            <span className="flex items-center gap-1 font-bold text-[#641D06]">
              <span className="material-symbols-outlined text-xs">call</span>
              093 786 32 63 (Ls. Phan Đức Tín)
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
