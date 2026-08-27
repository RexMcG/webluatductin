"use client";

import React, { useState } from "react";

export interface MindmapBranch {
  name: string;
  colorBg: string;
  colorBorder: string;
  textColor: string;
  lineColor: string;
  subBg: string;
  subBorder: string;
  subTextColor: string;
  subItems: string[];
}

export interface MindmapData {
  center: string;
  branches: MindmapBranch[];
}

// BỘ MÀU CHUẨN ĐỒNG BỘ 100% VỚI SƠ ĐỒ FLOWCHART & BẢN SẮC THƯƠNG HIỆU LUẬT ĐỨC TÍN
const CORPORATE_MINDMAP_THEMES = [
  // 1. NHÁNH 1: #641D06 (Đỏ Đô Thẫm - Deep Burgundy Red)
  {
    colorBg: "#641D06",
    colorBorder: "#641D06",
    textColor: "#ffffff",
    lineColor: "#641D06",
    subBg: "#fffbeb",
    subBorder: "#fde68a",
    subTextColor: "#451a03",
  },
  // 2. NHÁNH 2: #1D3540 (Xanh Đen Đô Thị - Deep Navy Teal)
  {
    colorBg: "#1D3540",
    colorBorder: "#1D3540",
    textColor: "#ffffff",
    lineColor: "#1D3540",
    subBg: "#eff6ff",
    subBorder: "#bfdbfe",
    subTextColor: "#172554",
  },
  // 3. NHÁNH 3: #708061 (Xanh Rêu Trầm Sage)
  {
    colorBg: "#708061",
    colorBorder: "#708061",
    textColor: "#ffffff",
    lineColor: "#708061",
    subBg: "#f0fdf4",
    subBorder: "#bbf7d0",
    subTextColor: "#052e16",
  },
  // 4. NHÁNH 4: #C0963B (Vàng Kim Hàng Hiệu - Warm Luxury Gold)
  {
    colorBg: "#C0963B",
    colorBorder: "#C0963B",
    textColor: "#ffffff",
    lineColor: "#C0963B",
    subBg: "#fefce8",
    subBorder: "#fef08a",
    subTextColor: "#422006",
  },
  // 5. NHÁNH 5: #5C5550 (Xám Đá Trầm Charcoal)
  {
    colorBg: "#5C5550",
    colorBorder: "#5C5550",
    textColor: "#ffffff",
    lineColor: "#5C5550",
    subBg: "#f5f5f4",
    subBorder: "#e7e5e4",
    subTextColor: "#1c1917",
  },
  // 6. NHÁNH 6: #842A16 (Đỏ Rượu Vang Thẫm)
  {
    colorBg: "#842A16",
    colorBorder: "#842A16",
    textColor: "#ffffff",
    lineColor: "#842A16",
    subBg: "#fff1f2",
    subBorder: "#fecdd3",
    subTextColor: "#4c0519",
  },
];

/**
 * Extracts mindmap data from raw text (whether wrapped in ```mindmap or written as plain text)
 */
export function extractMindmapAndCleanText(rawText: string): {
  data: MindmapData | null;
  cleanText: string;
} {
  let content = "";
  let cleanText = rawText;

  const blockMatch = rawText.match(/```mindmap([\s\S]*?)```/i);
  if (blockMatch) {
    content = blockMatch[1].trim();
    cleanText = rawText.replace(/```mindmap[\s\S]*?```/gi, "").trim();
  } else {
    const plainMatch = rawText.match(/(?:^|\n)(tâm|root|center):\s*([^\n]+)([\s\S]*)$/i);
    if (plainMatch && plainMatch[3].includes("-")) {
      content = `${plainMatch[1]}: ${plainMatch[2]}\n${plainMatch[3]}`.trim();
      cleanText = rawText.substring(0, rawText.indexOf(plainMatch[0])).trim();
    }
  }

  if (!content) {
    return { data: null, cleanText: rawText };
  }

  const lines = content.split("\n").map((l) => l.trim()).filter((l) => l.length > 0);
  let center = "VẤN ĐỀ PHÁP LÝ";
  const branches: MindmapBranch[] = [];
  let currentBranch: MindmapBranch | null = null;
  let colorIdx = 0;

  for (const line of lines) {
    if (
      line.toLowerCase().startsWith("tâm:") ||
      line.toLowerCase().startsWith("root:") ||
      line.toLowerCase().startsWith("center:")
    ) {
      center = line.replace(/^(tâm|root|center):/i, "").trim();
    } else if (line.startsWith("-") || line.startsWith("*")) {
      const branchName = line.replace(/^[-*]\s*(nhánh:)?/i, "").trim();
      const theme = CORPORATE_MINDMAP_THEMES[colorIdx % CORPORATE_MINDMAP_THEMES.length];
      colorIdx++;
      currentBranch = {
        name: branchName,
        ...theme,
        subItems: [],
      };
      branches.push(currentBranch);
    } else if (line.startsWith("+") || line.startsWith("•") || line.startsWith("--")) {
      if (currentBranch) {
        const sub = line.replace(/^[+•\-]+\s*/, "").trim();
        if (sub) currentBranch.subItems.push(sub);
      }
    }
  }

  if (branches.length === 0) {
    return { data: null, cleanText: rawText };
  }

  return { data: { center, branches }, cleanText };
}

export default function MindmapVisual({ rawText }: { rawText: string }) {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedBranch, setSelectedBranch] = useState<MindmapBranch | null>(null);
  const { data } = extractMindmapAndCleanText(rawText);

  if (!data) return null;

  // Split branches into Left and Right sides
  const half = Math.ceil(data.branches.length / 2);
  const leftBranches = data.branches.slice(0, half);
  const rightBranches = data.branches.slice(half);

  // Dynamic canvas calculations for clean main-branches-only layout
  const maxSide = Math.max(leftBranches.length, rightBranches.length);
  const rowSpacing = maxSide >= 4 ? 80 : 95;
  const canvasH = Math.max(340, (maxSide - 1) * rowSpacing + 150);
  const canvasW = 860;

  const cx = canvasW / 2; // 430
  const cy = canvasH / 2;

  const centerBoxW = 180;
  const centerBoxH = 80;
  const centerL = cx - centerBoxW / 2; // 340
  const centerR = cx + centerBoxW / 2; // 520

  const branchBoxW = 190;
  const branchBoxH = 56;

  // X Coordinate Columns for clean 2-side tree
  const leftBranchX = 140; // [45 to 235]
  const rightBranchX = 720; // [625 to 815]

  // Helper to compute Y coordinate for each branch
  const getBranchY = (bIdx: number, totalOnSide: number) => {
    if (totalOnSide === 1) return cy;
    const startY = cy - ((totalOnSide - 1) * rowSpacing) / 2;
    return startY + bIdx * rowSpacing;
  };

  const handleBranchClick = (branch: MindmapBranch) => {
    if (selectedBranch?.name === branch.name) {
      setSelectedBranch(null); // toggle off if clicking active
    } else {
      setSelectedBranch(branch);
    }
  };

  return (
    <div className="my-5 w-full rounded-3xl border border-slate-200 bg-[#fdfbf7] p-3 sm:p-5 shadow-sm transition-all">
      {/* Header Bar */}
      <div className="flex items-center justify-between border-b border-slate-200/80 pb-2.5 mb-3">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-[#641D06]/10 text-[#641D06] font-bold text-base">
            <span className="material-symbols-outlined text-base">hub</span>
          </span>
          <div>
            <h4 className="font-bold text-slate-900 text-xs sm:text-sm">
              Sơ Đồ Tư Duy Mindmap Trực Quan ({data.branches.length} Mục Trọng Tâm)
            </h4>
            <p className="text-[10px] text-slate-500">Chạm vào từng mục để xem ngay bản ghi chú tóm tắt nội dung</p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-1 text-[11px] font-bold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-xl transition-colors shadow-2xs cursor-pointer"
        >
          <span className="material-symbols-outlined text-sm">
            {isOpen ? "visibility_off" : "visibility"}
          </span>
          <span>{isOpen ? "Thu gọn" : "Xem sơ đồ"}</span>
        </button>
      </div>

      {isOpen && (
        <div className="w-full">
          {/* UNIFIED DYNAMIC SVG VECTOR CANVAS */}
          <div className="w-full relative select-none overflow-x-auto">
            <svg
              viewBox={`0 0 ${canvasW} ${canvasH}`}
              className="w-full min-w-[500px] h-auto drop-shadow-2xs overflow-visible"
            >
              <defs>
                {/* Dynamic Forward Arrowhead Markers */}
                {data.branches.map((b, idx) => (
                  <marker
                    key={`marker-main-${idx}`}
                    id={`arrow-main-clean-${idx}`}
                    viewBox="0 0 10 10"
                    refX="8"
                    refY="5"
                    markerWidth="6"
                    markerHeight="6"
                    orient="auto"
                  >
                    <path d="M 0 0 L 10 5 L 0 10 z" fill={b.lineColor} />
                  </marker>
                ))}
              </defs>

              {/* 1. LEFT SIDE: CONNECTIONS FROM CENTER ---> TO LEFT BRANCH (◀) */}
              {leftBranches.map((b, idx) => {
                const branchY = getBranchY(idx, leftBranches.length);
                const startX = centerL;
                const startY = cy + (idx - (leftBranches.length - 1) / 2) * 14;

                const endX = leftBranchX + branchBoxW / 2;
                const endY = branchY;

                const isSelected = selectedBranch?.name === b.name;

                return (
                  <path
                    key={`l-conn-clean-${idx}`}
                    d={`M ${startX} ${startY} C ${startX - 40} ${startY}, ${endX + 40} ${endY}, ${endX} ${endY}`}
                    fill="none"
                    stroke={b.lineColor}
                    strokeWidth={isSelected ? "4" : "2.6"}
                    strokeDasharray={isSelected ? "none" : "none"}
                    strokeLinecap="round"
                    markerEnd={`url(#arrow-main-clean-${idx})`}
                    className="transition-all duration-300"
                  />
                );
              })}

              {/* 2. RIGHT SIDE: CONNECTIONS FROM CENTER ---> TO RIGHT BRANCH (▶) */}
              {rightBranches.map((b, idx) => {
                const branchY = getBranchY(idx, rightBranches.length);
                const startX = centerR;
                const startY = cy + (idx - (rightBranches.length - 1) / 2) * 14;

                const endX = rightBranchX - branchBoxW / 2;
                const endY = branchY;

                const isSelected = selectedBranch?.name === b.name;

                return (
                  <path
                    key={`r-conn-clean-${idx}`}
                    d={`M ${startX} ${startY} C ${startX + 40} ${startY}, ${endX - 40} ${endY}, ${endX} ${endY}`}
                    fill="none"
                    stroke={b.lineColor}
                    strokeWidth={isSelected ? "4" : "2.6"}
                    strokeLinecap="round"
                    markerEnd={`url(#arrow-main-clean-${half + idx})`}
                    className="transition-all duration-300"
                  />
                );
              })}

              {/* 3. CENTER HUB */}
              <foreignObject
                x={centerL}
                y={cy - centerBoxH / 2}
                width={centerBoxW}
                height={centerBoxH}
              >
                <div className="w-full h-full flex items-center justify-center p-0.5">
                  <div className="w-full h-full rounded-2xl bg-[#641D06] text-white p-2 shadow-md border-2 border-[#C0963B]/70 flex flex-col items-center justify-center text-center">
                    <span className="material-symbols-outlined text-lg mb-0.5 text-amber-300">account_balance</span>
                    <h3 className="font-black text-[11px] uppercase tracking-wide leading-tight line-clamp-3 text-amber-100">
                      {data.center}
                    </h3>
                  </div>
                </div>
              </foreignObject>

              {/* 4. LEFT BRANCHES (CLICKABLE INTERACTIVE BUTTONS) */}
              {leftBranches.map((b, bIdx) => {
                const branchY = getBranchY(bIdx, leftBranches.length);
                const isSelected = selectedBranch?.name === b.name;

                return (
                  <foreignObject
                    key={`l-node-clean-${bIdx}`}
                    x={leftBranchX - branchBoxW / 2}
                    y={branchY - branchBoxH / 2}
                    width={branchBoxW}
                    height={branchBoxH}
                  >
                    <div className="w-full h-full flex items-center justify-center p-0.5">
                      <button
                        type="button"
                        onClick={() => handleBranchClick(b)}
                        className={`w-full h-full px-3 py-2 rounded-xl text-[11px] font-bold shadow-sm border-2 text-center flex items-center justify-between gap-1.5 leading-tight transition-all duration-200 cursor-pointer active:scale-95 group ${
                          isSelected
                            ? "ring-4 ring-amber-300/80 scale-105 shadow-md"
                            : "hover:scale-102 hover:shadow-md"
                        }`}
                        style={{
                          backgroundColor: b.colorBg,
                          borderColor: isSelected ? "#C0963B" : b.colorBorder,
                          color: b.textColor,
                        }}
                      >
                        <span className="text-left font-black leading-snug flex-1 line-clamp-2">
                          {b.name}
                        </span>
                        <span className="material-symbols-outlined text-sm text-amber-300 shrink-0 group-hover:translate-x-0.5 transition-transform">
                          {isSelected ? "check_circle" : "touch_app"}
                        </span>
                      </button>
                    </div>
                  </foreignObject>
                );
              })}

              {/* 5. RIGHT BRANCHES (CLICKABLE INTERACTIVE BUTTONS) */}
              {rightBranches.map((b, bIdx) => {
                const branchY = getBranchY(bIdx, rightBranches.length);
                const isSelected = selectedBranch?.name === b.name;

                return (
                  <foreignObject
                    key={`r-node-clean-${bIdx}`}
                    x={rightBranchX - branchBoxW / 2}
                    y={branchY - branchBoxH / 2}
                    width={branchBoxW}
                    height={branchBoxH}
                  >
                    <div className="w-full h-full flex items-center justify-center p-0.5">
                      <button
                        type="button"
                        onClick={() => handleBranchClick(b)}
                        className={`w-full h-full px-3 py-2 rounded-xl text-[11px] font-bold shadow-sm border-2 text-center flex items-center justify-between gap-1.5 leading-tight transition-all duration-200 cursor-pointer active:scale-95 group ${
                          isSelected
                            ? "ring-4 ring-amber-300/80 scale-105 shadow-md"
                            : "hover:scale-102 hover:shadow-md"
                        }`}
                        style={{
                          backgroundColor: b.colorBg,
                          borderColor: isSelected ? "#C0963B" : b.colorBorder,
                          color: b.textColor,
                        }}
                      >
                        <span className="material-symbols-outlined text-sm text-amber-300 shrink-0 group-hover:scale-110 transition-transform">
                          {isSelected ? "check_circle" : "touch_app"}
                        </span>
                        <span className="text-right font-black leading-snug flex-1 line-clamp-2">
                          {b.name}
                        </span>
                      </button>
                    </div>
                  </foreignObject>
                );
              })}
            </svg>
          </div>

          {/* INTERACTIVE NOTE CARD: BẢN GHI CHÚ TÓM TẮT NỘI DUNG MỤC ĐƯỢC CHỌN */}
          {selectedBranch ? (
            <div
              className="mt-4 p-4 sm:p-5 rounded-2xl border-2 transition-all duration-300 animate-fadeIn shadow-md"
              style={{
                backgroundColor: selectedBranch.subBg,
                borderColor: selectedBranch.colorBorder,
              }}
            >
              {/* Note Header */}
              <div
                className="flex items-start justify-between gap-3 border-b pb-3 mb-3"
                style={{ borderColor: selectedBranch.subBorder }}
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center font-black text-sm text-white shadow-xs shrink-0"
                    style={{ backgroundColor: selectedBranch.colorBg }}
                  >
                    📝
                  </div>
                  <div>
                    <span
                      className="text-[10px] font-black uppercase tracking-wider block"
                      style={{ color: selectedBranch.colorBg }}
                    >
                      Bản Ghi Chú Tóm Tắt Trọng Tâm
                    </span>
                    <h4
                      className="text-sm sm:text-base font-black leading-snug"
                      style={{ color: selectedBranch.colorBg }}
                    >
                      {selectedBranch.name}
                    </h4>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedBranch(null)}
                  className="text-xs px-2.5 py-1 rounded-lg bg-white hover:bg-slate-100 text-slate-700 font-bold border border-slate-300 transition-colors cursor-pointer shadow-2xs shrink-0"
                >
                  ✕ Đóng ghi chú
                </button>
              </div>

              {/* Note Sub-items / Points */}
              {selectedBranch.subItems.length > 0 ? (
                <div className="space-y-2">
                  {selectedBranch.subItems.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 bg-white/95 p-3 rounded-xl border shadow-2xs"
                      style={{ borderColor: selectedBranch.subBorder }}
                    >
                      <span
                        className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-white font-bold text-[10px] mt-0.5 shadow-2xs"
                        style={{ backgroundColor: selectedBranch.colorBg }}
                      >
                        {idx + 1}
                      </span>
                      <p
                        className="text-xs sm:text-sm font-semibold leading-relaxed"
                        style={{ color: selectedBranch.subTextColor }}
                      >
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-3 bg-white/80 rounded-xl text-xs sm:text-sm text-slate-700 italic">
                  Đang hiển thị mục trọng tâm. Cuộn xuống nội dung bài viết bên dưới để xem toàn văn quy định pháp lý chi tiết.
                </div>
              )}
            </div>
          ) : (
            <div className="mt-3 py-2.5 px-4 bg-amber-50/70 border border-amber-200/80 rounded-xl flex items-center justify-center gap-2 text-center text-xs text-amber-950 font-medium">
              <span className="text-sm">👆</span>
              <span>
                Chạm hoặc click vào bất kỳ <strong>nhánh mục</strong> nào ở trên để xem ngay <strong>bản ghi chú tóm tắt nội dung</strong>.
              </span>
            </div>
          )}

          {/* Footer Note */}
          <div className="flex items-center justify-between text-[10px] text-slate-500 pt-2.5 mt-3 border-t border-slate-200/70">
            <span>⚖️ Công ty Luật TNHH Đức Tín &amp; Cộng sự</span>
            <span>📞 Hotline / Zalo: 093 786 32 63</span>
          </div>
        </div>
      )}
    </div>
  );
}
