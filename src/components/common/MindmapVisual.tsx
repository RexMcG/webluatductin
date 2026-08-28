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

  // Dynamic canvas calculations with spacious layout
  const maxSide = Math.max(leftBranches.length, rightBranches.length);
  const rowSpacing = maxSide >= 4 ? 92 : 108;
  const canvasH = Math.max(380, (maxSide - 1) * rowSpacing + 170);
  const canvasW = 940;

  const cx = canvasW / 2; // 470
  const cy = canvasH / 2;

  const centerBoxW = 205;
  const centerBoxH = 88;
  const centerL = cx - centerBoxW / 2;
  const centerR = cx + centerBoxW / 2;

  // Enlarged branch buttons with room for numbers
  const branchBoxW = 230;
  const branchBoxH = 70;

  // X Coordinates
  const leftBranchX = 145;
  const rightBranchX = 795;

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

  const getCleanTitle = (name: string) => {
    return name.replace(/^(\d+[\.\:\-]\s*)/, "").trim();
  };

  return (
    <div className="my-5 w-full rounded-3xl border border-slate-200 bg-[#fdfbf7] p-3 sm:p-6 shadow-sm transition-all select-none">
      {/* Header Bar */}
      <div className="flex items-center justify-between border-b border-slate-200/80 pb-3 mb-3">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#641D06]/10 text-[#641D06] font-bold text-lg">
            <span className="material-symbols-outlined text-lg">hub</span>
          </span>
          <div>
            <h4 className="font-extrabold text-slate-900 text-sm sm:text-base">
              Sơ Đồ Tư Duy Mindmap Trực Quan ({data.branches.length} Mục Trọng Tâm)
            </h4>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-xl transition-colors shadow-2xs cursor-pointer"
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
              className="w-full min-w-[550px] h-auto drop-shadow-2xs overflow-visible"
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
                const startY = cy + (idx - (leftBranches.length - 1) / 2) * 16;

                const endX = leftBranchX + branchBoxW / 2;
                const endY = branchY;

                const isTarget = hoveredIdx === idx;

                return (
                  <path
                    key={`l-conn-clean-${idx}`}
                    d={`M ${startX} ${startY} C ${startX - 45} ${startY}, ${endX + 45} ${endY}, ${endX} ${endY}`}
                    fill="none"
                    stroke={b.lineColor}
                    strokeWidth={isTarget ? "4.5" : "3"}
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
                const startY = cy + (idx - (rightBranches.length - 1) / 2) * 16;

                const endX = rightBranchX - branchBoxW / 2;
                const endY = branchY;

                const isTarget = hoveredIdx === half + idx;

                return (
                  <path
                    key={`r-conn-clean-${idx}`}
                    d={`M ${startX} ${startY} C ${startX + 45} ${startY}, ${endX - 45} ${endY}, ${endX} ${endY}`}
                    fill="none"
                    stroke={b.lineColor}
                    strokeWidth={isTarget ? "4.5" : "3"}
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
                  <div className="w-full h-full rounded-2xl bg-[#641D06] text-white p-2.5 shadow-md border-2 border-[#C0963B] flex flex-col items-center justify-center text-center">
                    <span className="material-symbols-outlined text-xl mb-0.5 text-amber-300">account_balance</span>
                    <h3 className="font-black text-xs sm:text-[13px] uppercase tracking-wide leading-tight line-clamp-3 text-amber-100">
                      {data.center}
                    </h3>
                  </div>
                </div>
              </foreignObject>

              {/* 4. LEFT BRANCHES (CÓ SỐ THỨ TỰ RÕ RÀNG 1, 2,...) */}
              {leftBranches.map((b, bIdx) => {
                const branchY = getBranchY(bIdx, leftBranches.length);
                const isHovered = hoveredIdx === bIdx;
                const itemNumber = bIdx + 1;
                const cleanTitle = getCleanTitle(b.name);

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
                        className={`w-full h-full px-3 py-2 rounded-2xl text-[13px] sm:text-[13.5px] font-black shadow-md border-2 text-left flex items-center justify-between gap-2 leading-snug transition-all duration-200 cursor-pointer active:scale-95 ${
                          isHovered
                            ? "ring-4 ring-amber-300 scale-105 shadow-xl"
                            : "hover:scale-102 hover:shadow-lg"
                        }`}
                        style={{
                          backgroundColor: b.colorBg,
                          borderColor: isHovered ? "#C0963B" : b.colorBorder,
                          color: b.textColor,
                        }}
                      >
                        {/* Number Badge [1], [2] */}
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                          <span className="w-6 h-6 rounded-full bg-amber-400 text-slate-950 font-black text-xs flex items-center justify-center shrink-0 shadow-xs border border-amber-300">
                            {itemNumber}
                          </span>
                          <span className="font-extrabold leading-tight line-clamp-2">
                            {cleanTitle}
                          </span>
                        </div>

                        {/* Tooltip ⓘ Badge */}
                        <span className="w-5 h-5 rounded-full bg-white/20 hover:bg-amber-300 text-amber-200 hover:text-slate-900 border border-amber-300/40 flex items-center justify-center text-[11px] font-black shrink-0 transition-colors shadow-xs">
                          ⓘ
                        </span>
                      </button>

                      {/* =========================================================
                          HIGH-CONTRAST DISTINCT TOOLTIP POPUP (NỀN XANH NHẠT DỊU MẮT)
                         ========================================================= */}
                      {isHovered && (
                        <div
                          className="absolute left-1/2 -translate-x-1/2 bottom-full mb-3 w-80 sm:w-96 p-4 sm:p-5 bg-white text-slate-900 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.25)] z-50 text-xs sm:text-[13px] leading-relaxed animate-fadeIn border-2 border-slate-300 pointer-events-auto"
                          onClick={() => handleJumpToSection(b, bIdx)}
                        >
                          {/* Tooltip Title Header */}
                          <div className="font-extrabold text-[#641D06] mb-3 flex items-center justify-between gap-1 border-b border-slate-200 pb-2">
                            <div className="flex items-center gap-2">
                              <span className="w-6 h-6 rounded-full bg-[#641D06] text-white font-black text-xs flex items-center justify-center shrink-0 shadow-xs">
                                {itemNumber}
                              </span>
                              <span className="text-sm sm:text-[14.5px] font-black tracking-tight text-[#641D06]">
                                {cleanTitle}
                              </span>
                            </div>
                            <span className="text-[11px] text-white font-bold bg-[#641D06] hover:bg-[#842A16] px-2.5 py-1 rounded-lg shadow-xs shrink-0 transition-colors">
                              Click nhảy tới mục ↓
                            </span>
                          </div>

                          {/* Tooltip Bullet Content */}
                          {b.subItems && b.subItems.length > 0 ? (
                            <ul className="space-y-2">
                              {b.subItems.map((item, sIdx) => (
                                <li
                                  key={sIdx}
                                  className="flex items-start gap-2.5 bg-[#f1f5f9] hover:bg-[#e2e8f0] text-slate-900 p-3 rounded-xl border border-slate-200/90 shadow-2xs transition-colors"
                                >
                                  <span className="w-5 h-5 rounded-full bg-[#1D3540] text-white font-black text-[11px] flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                                    {sIdx + 1}
                                  </span>
                                  <span className="font-bold text-slate-800 leading-snug">
                                    {item}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <div className="bg-[#f1f5f9] text-slate-800 p-3 rounded-xl border border-slate-200/90 font-medium">
                              Nhấp chuột để tự động cuộn xuống xem toàn văn điều khoản pháp lý chi tiết trong bài viết.
                            </div>
                          )}

                          {/* Down Triangle Arrow Pointer */}
                          <div className="absolute top-full left-1/2 -translate-x-1/2 border-[8px] border-transparent border-t-white"></div>
                        </div>
                      )}
                    </div>
                  </foreignObject>
                );
              })}

              {/* 5. RIGHT BRANCHES (CÓ SỐ THỨ TỰ RÕ RÀNG 3, 4,...) */}
              {rightBranches.map((b, bIdx) => {
                const branchY = getBranchY(bIdx, rightBranches.length);
                const globalIdx = half + bIdx;
                const isHovered = hoveredIdx === globalIdx;
                const itemNumber = globalIdx + 1;
                const cleanTitle = getCleanTitle(b.name);

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
                        className={`w-full h-full px-3 py-2 rounded-2xl text-[13px] sm:text-[13.5px] font-black shadow-md border-2 text-right flex items-center justify-between gap-2 leading-snug transition-all duration-200 cursor-pointer active:scale-95 ${
                          isHovered
                            ? "ring-4 ring-amber-300 scale-105 shadow-xl"
                            : "hover:scale-102 hover:shadow-lg"
                        }`}
                        style={{
                          backgroundColor: b.colorBg,
                          borderColor: isHovered ? "#C0963B" : b.colorBorder,
                          color: b.textColor,
                        }}
                      >
                        {/* Tooltip ⓘ Badge */}
                        <span className="w-5 h-5 rounded-full bg-white/20 hover:bg-amber-300 text-amber-200 hover:text-slate-900 border border-amber-300/40 flex items-center justify-center text-[11px] font-black shrink-0 transition-colors shadow-xs">
                          ⓘ
                        </span>

                        {/* Number Badge [3], [4] */}
                        <div className="flex items-center justify-end gap-2 flex-1 min-w-0">
                          <span className="font-extrabold leading-tight line-clamp-2 text-right">
                            {cleanTitle}
                          </span>
                          <span className="w-6 h-6 rounded-full bg-amber-400 text-slate-950 font-black text-xs flex items-center justify-center shrink-0 shadow-xs border border-amber-300">
                            {itemNumber}
                          </span>
                        </div>
                      </button>

                      {/* =========================================================
                          HIGH-CONTRAST DISTINCT TOOLTIP POPUP (NỀN XANH NHẠT DỊU MẮT)
                         ========================================================= */}
                      {isHovered && (
                        <div
                          className="absolute left-1/2 -translate-x-1/2 bottom-full mb-3 w-80 sm:w-96 p-4 sm:p-5 bg-white text-slate-900 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.25)] z-50 text-xs sm:text-[13px] leading-relaxed animate-fadeIn border-2 border-slate-300 pointer-events-auto text-left"
                          onClick={() => handleJumpToSection(b, globalIdx)}
                        >
                          {/* Tooltip Title Header */}
                          <div className="font-extrabold text-[#641D06] mb-3 flex items-center justify-between gap-1 border-b border-slate-200 pb-2">
                            <div className="flex items-center gap-2">
                              <span className="w-6 h-6 rounded-full bg-[#641D06] text-white font-black text-xs flex items-center justify-center shrink-0 shadow-xs">
                                {itemNumber}
                              </span>
                              <span className="text-sm sm:text-[14.5px] font-black tracking-tight text-[#641D06]">
                                {cleanTitle}
                              </span>
                            </div>
                            <span className="text-[11px] text-white font-bold bg-[#641D06] hover:bg-[#842A16] px-2.5 py-1 rounded-lg shadow-xs shrink-0 transition-colors">
                              Click nhảy tới mục ↓
                            </span>
                          </div>

                          {/* Tooltip Bullet Content */}
                          {b.subItems && b.subItems.length > 0 ? (
                            <ul className="space-y-2">
                              {b.subItems.map((item, sIdx) => (
                                <li
                                  key={sIdx}
                                  className="flex items-start gap-2.5 bg-[#f1f5f9] hover:bg-[#e2e8f0] text-slate-900 p-3 rounded-xl border border-slate-200/90 shadow-2xs transition-colors"
                                >
                                  <span className="w-5 h-5 rounded-full bg-[#1D3540] text-white font-black text-[11px] flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                                    {sIdx + 1}
                                  </span>
                                  <span className="font-bold text-slate-800 leading-snug">
                                    {item}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <div className="bg-[#f1f5f9] text-slate-800 p-3 rounded-xl border border-slate-200/90 font-medium">
                              Nhấp chuột để tự động cuộn xuống xem toàn văn điều khoản pháp lý chi tiết trong bài viết.
                            </div>
                          )}

                          {/* Down Triangle Arrow Pointer */}
                          <div className="absolute top-full left-1/2 -translate-x-1/2 border-[8px] border-transparent border-t-white"></div>
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
