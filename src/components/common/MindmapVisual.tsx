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

// BỘ MÀU CHUẨN ĐỒNG BỘ 100% VỚI BẢN SẮC THƯƠNG HIỆU LUẬT ĐỨC TÍN
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
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const { data } = extractMindmapAndCleanText(rawText);

  if (!data) return null;

  // Split branches into Left and Right sides
  const half = Math.ceil(data.branches.length / 2);
  const leftBranches = data.branches.slice(0, half);
  const rightBranches = data.branches.slice(half);

  // Dynamic canvas calculations
  const maxSide = Math.max(leftBranches.length, rightBranches.length);
  const rowSpacing = maxSide >= 4 ? 82 : 98;
  const canvasH = Math.max(340, (maxSide - 1) * rowSpacing + 150);
  const canvasW = 860;

  const cx = canvasW / 2; // 430
  const cy = canvasH / 2;

  const centerBoxW = 180;
  const centerBoxH = 80;
  const centerL = cx - centerBoxW / 2; // 340
  const centerR = cx + centerBoxW / 2; // 520

  const branchBoxW = 195;
  const branchBoxH = 58;

  // X Coordinate Columns
  const leftBranchX = 140; // [42.5 to 237.5]
  const rightBranchX = 720; // [622.5 to 817.5]

  // Helper to compute Y coordinate for each branch
  const getBranchY = (bIdx: number, totalOnSide: number) => {
    if (totalOnSide === 1) return cy;
    const startY = cy - ((totalOnSide - 1) * rowSpacing) / 2;
    return startY + bIdx * rowSpacing;
  };

  /**
   * Smoothly jumps and scrolls to the corresponding section heading in the article
   */
  const handleJumpToSection = (branch: MindmapBranch, bIdx: number) => {
    const cleanBranchName = branch.name
      .toLowerCase()
      .replace(/^(nhánh|mục|phần|\d+[\.\:\-])\s*/i, "")
      .trim();

    const sectionElements = document.querySelectorAll('section[id^="heading-"]');
    let targetEl: HTMLElement | null = null;

    // Strategy 1: Match section title text
    sectionElements.forEach((el) => {
      const heading = el.querySelector("h2, h3, h4");
      if (heading && cleanBranchName.length > 2) {
        const text = heading.textContent?.toLowerCase() || "";
        const words = cleanBranchName.split(/\s+/).filter((w) => w.length > 2);
        const matchCount = words.filter((w) => text.includes(w)).length;
        if (text.includes(cleanBranchName) || matchCount >= Math.min(2, words.length)) {
          if (!targetEl) targetEl = el as HTMLElement;
        }
      }
    });

    // Strategy 2: Match by section index if not found
    if (!targetEl && sectionElements[bIdx]) {
      targetEl = sectionElements[bIdx] as HTMLElement;
    }

    if (targetEl) {
      targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
      targetEl.classList.remove("highlight-section-pulse");
      void targetEl.offsetWidth; // force browser reflow
      targetEl.classList.add("highlight-section-pulse");
    }
  };

  return (
    <div className="my-5 w-full rounded-3xl border border-slate-200 bg-[#fdfbf7] p-3 sm:p-5 shadow-sm transition-all select-none">
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
            <p className="text-[10px] text-slate-500">
              Rê chuột vào để xem <strong>Tooltip ⓘ giải thích tại chỗ</strong> • Click để <strong>chạy tới mục trong bài viết</strong>
            </p>
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
        <div className="w-full relative">
          {/* UNIFIED DYNAMIC SVG VECTOR CANVAS */}
          <div className="w-full relative overflow-visible">
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

              {/* 1. LEFT SIDE CONNECTIONS */}
              {leftBranches.map((b, idx) => {
                const branchY = getBranchY(idx, leftBranches.length);
                const startX = centerL;
                const startY = cy + (idx - (leftBranches.length - 1) / 2) * 14;

                const endX = leftBranchX + branchBoxW / 2;
                const endY = branchY;

                const isTarget = hoveredIdx === idx;

                return (
                  <path
                    key={`l-conn-clean-${idx}`}
                    d={`M ${startX} ${startY} C ${startX - 40} ${startY}, ${endX + 40} ${endY}, ${endX} ${endY}`}
                    fill="none"
                    stroke={b.lineColor}
                    strokeWidth={isTarget ? "4" : "2.6"}
                    strokeLinecap="round"
                    markerEnd={`url(#arrow-main-clean-${idx})`}
                    className="transition-all duration-300"
                  />
                );
              })}

              {/* 2. RIGHT SIDE CONNECTIONS */}
              {rightBranches.map((b, idx) => {
                const branchY = getBranchY(idx, rightBranches.length);
                const startX = centerR;
                const startY = cy + (idx - (rightBranches.length - 1) / 2) * 14;

                const endX = rightBranchX - branchBoxW / 2;
                const endY = branchY;

                const isTarget = hoveredIdx === half + idx;

                return (
                  <path
                    key={`r-conn-clean-${idx}`}
                    d={`M ${startX} ${startY} C ${startX + 40} ${startY}, ${endX - 40} ${endY}, ${endX} ${endY}`}
                    fill="none"
                    stroke={b.lineColor}
                    strokeWidth={isTarget ? "4" : "2.6"}
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

              {/* 4. LEFT BRANCHES (WITH POPUP TOOLTIP ⓘ GIỐNG HÌNH SỐ 2) */}
              {leftBranches.map((b, bIdx) => {
                const branchY = getBranchY(bIdx, leftBranches.length);
                const isHovered = hoveredIdx === bIdx;

                return (
                  <foreignObject
                    key={`l-node-clean-${bIdx}`}
                    x={leftBranchX - branchBoxW / 2}
                    y={branchY - branchBoxH / 2}
                    width={branchBoxW}
                    height={branchBoxH}
                    className="overflow-visible"
                  >
                    <div
                      className="w-full h-full flex items-center justify-center p-0.5 relative group"
                      onMouseEnter={() => setHoveredIdx(bIdx)}
                      onMouseLeave={() => setHoveredIdx(null)}
                    >
                      {/* Main Clickable Branch Button */}
                      <button
                        type="button"
                        onClick={() => handleJumpToSection(b, bIdx)}
                        className={`w-full h-full px-3 py-2 rounded-xl text-[11px] font-bold shadow-sm border-2 text-left flex items-center justify-between gap-1.5 leading-tight transition-all duration-200 cursor-pointer active:scale-95 ${
                          isHovered
                            ? "ring-4 ring-amber-300/90 scale-105 shadow-xl"
                            : "hover:scale-102 hover:shadow-md"
                        }`}
                        style={{
                          backgroundColor: b.colorBg,
                          borderColor: isHovered ? "#C0963B" : b.colorBorder,
                          color: b.textColor,
                        }}
                      >
                        <span className="font-black leading-snug flex-1 line-clamp-2">
                          {b.name}
                        </span>

                        {/* Tooltip ⓘ Badge (Vàng Amber nhỏ gọn) */}
                        <span className="w-5 h-5 rounded-full bg-amber-400/30 hover:bg-amber-300 text-amber-200 hover:text-slate-900 border border-amber-300/50 flex items-center justify-center text-[11px] font-black shrink-0 transition-colors shadow-2xs">
                          ⓘ
                        </span>
                      </button>

                      {/* =========================================================
                          SLEEK DARK TOOLTIP POPUP (GIỐNG HÌNH SỐ 2 100%)
                         ========================================================= */}
                      {isHovered && (
                        <div
                          className="absolute left-1/2 -translate-x-1/2 bottom-full mb-3 w-72 sm:w-80 p-3.5 bg-[#0f172a] text-white rounded-2xl shadow-2xl z-50 text-xs leading-relaxed animate-fadeIn border border-slate-700/80 pointer-events-auto"
                          onClick={() => handleJumpToSection(b, bIdx)}
                        >
                          {/* Tooltip Title with Gold Gavel / Icon */}
                          <div className="font-bold text-amber-300 mb-1.5 flex items-center justify-between gap-1 border-b border-slate-800 pb-1.5">
                            <div className="flex items-center gap-1.5">
                              <span className="text-amber-400 text-sm">⚖️</span>
                              <span className="text-xs font-black tracking-wide">{b.name}</span>
                            </div>
                            <span className="text-[10px] text-amber-300/80 font-normal">Click để nhảy tới mục ↓</span>
                          </div>

                          {/* Tooltip Bullet Content */}
                          {b.subItems && b.subItems.length > 0 ? (
                            <ul className="space-y-1.5 text-slate-300 text-[11.5px] leading-relaxed">
                              {b.subItems.map((item, sIdx) => (
                                <li key={sIdx} className="flex items-start gap-1.5">
                                  <span className="text-amber-400 font-bold text-xs mt-0.5">•</span>
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-slate-300 text-[11.5px] leading-relaxed">
                              Nhấp chuột để tự động cuộn xuống xem toàn văn điều khoản pháp lý chi tiết trong bài viết.
                            </p>
                          )}

                          {/* Little Down Triangle Arrow */}
                          <div className="absolute top-full left-1/2 -translate-x-1/2 border-[6px] border-transparent border-t-[#0f172a]"></div>
                        </div>
                      )}
                    </div>
                  </foreignObject>
                );
              })}

              {/* 5. RIGHT BRANCHES (WITH POPUP TOOLTIP ⓘ GIỐNG HÌNH SỐ 2) */}
              {rightBranches.map((b, bIdx) => {
                const branchY = getBranchY(bIdx, rightBranches.length);
                const globalIdx = half + bIdx;
                const isHovered = hoveredIdx === globalIdx;

                return (
                  <foreignObject
                    key={`r-node-clean-${bIdx}`}
                    x={rightBranchX - branchBoxW / 2}
                    y={branchY - branchBoxH / 2}
                    width={branchBoxW}
                    height={branchBoxH}
                    className="overflow-visible"
                  >
                    <div
                      className="w-full h-full flex items-center justify-center p-0.5 relative group"
                      onMouseEnter={() => setHoveredIdx(globalIdx)}
                      onMouseLeave={() => setHoveredIdx(null)}
                    >
                      {/* Main Clickable Branch Button */}
                      <button
                        type="button"
                        onClick={() => handleJumpToSection(b, globalIdx)}
                        className={`w-full h-full px-3 py-2 rounded-xl text-[11px] font-bold shadow-sm border-2 text-right flex items-center justify-between gap-1.5 leading-tight transition-all duration-200 cursor-pointer active:scale-95 ${
                          isHovered
                            ? "ring-4 ring-amber-300/90 scale-105 shadow-xl"
                            : "hover:scale-102 hover:shadow-md"
                        }`}
                        style={{
                          backgroundColor: b.colorBg,
                          borderColor: isHovered ? "#C0963B" : b.colorBorder,
                          color: b.textColor,
                        }}
                      >
                        {/* Tooltip ⓘ Badge (Vàng Amber nhỏ gọn) */}
                        <span className="w-5 h-5 rounded-full bg-amber-400/30 hover:bg-amber-300 text-amber-200 hover:text-slate-900 border border-amber-300/50 flex items-center justify-center text-[11px] font-black shrink-0 transition-colors shadow-2xs">
                          ⓘ
                        </span>

                        <span className="font-black leading-snug flex-1 line-clamp-2">
                          {b.name}
                        </span>
                      </button>

                      {/* =========================================================
                          SLEEK DARK TOOLTIP POPUP (GIỐNG HÌNH SỐ 2 100%)
                         ========================================================= */}
                      {isHovered && (
                        <div
                          className="absolute left-1/2 -translate-x-1/2 bottom-full mb-3 w-72 sm:w-80 p-3.5 bg-[#0f172a] text-white rounded-2xl shadow-2xl z-50 text-xs leading-relaxed animate-fadeIn border border-slate-700/80 pointer-events-auto text-left"
                          onClick={() => handleJumpToSection(b, globalIdx)}
                        >
                          {/* Tooltip Title with Gold Gavel / Icon */}
                          <div className="font-bold text-amber-300 mb-1.5 flex items-center justify-between gap-1 border-b border-slate-800 pb-1.5">
                            <div className="flex items-center gap-1.5">
                              <span className="text-amber-400 text-sm">⚖️</span>
                              <span className="text-xs font-black tracking-wide">{b.name}</span>
                            </div>
                            <span className="text-[10px] text-amber-300/80 font-normal">Click để nhảy tới mục ↓</span>
                          </div>

                          {/* Tooltip Bullet Content */}
                          {b.subItems && b.subItems.length > 0 ? (
                            <ul className="space-y-1.5 text-slate-300 text-[11.5px] leading-relaxed">
                              {b.subItems.map((item, sIdx) => (
                                <li key={sIdx} className="flex items-start gap-1.5">
                                  <span className="text-amber-400 font-bold text-xs mt-0.5">•</span>
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-slate-300 text-[11.5px] leading-relaxed">
                              Nhấp chuột để tự động cuộn xuống xem toàn văn điều khoản pháp lý chi tiết trong bài viết.
                            </p>
                          )}

                          {/* Little Down Triangle Arrow */}
                          <div className="absolute top-full left-1/2 -translate-x-1/2 border-[6px] border-transparent border-t-[#0f172a]"></div>
                        </div>
                      )}
                    </div>
                  </foreignObject>
                );
              })}
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}
