"use client";

import React, { useState, useRef } from "react";

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
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleBranchMouseEnter = (idx: number) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setHoveredIdx(idx);
  };

  const handleBranchMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredIdx(null);
    }, 150);
  };

  const { data } = extractMindmapAndCleanText(rawText);

  if (!data) return null;

  // Split branches into Left and Right sides
  const half = Math.ceil(data.branches.length / 2);
  const leftBranches = data.branches.slice(0, half);
  const rightBranches = data.branches.slice(half);

  // Balanced responsive canvas coordinates with ample headroom for hover popups above nodes
  const maxSide = Math.max(leftBranches.length, rightBranches.length);
  const rowSpacing = maxSide >= 4 ? 98 : 115;
  const canvasH = Math.max(380, (maxSide - 1) * rowSpacing + 220);
  const canvasW = 960;

  const cx = canvasW / 2; // 480
  const cy = canvasH / 2;

  // Center hub box: Icon removed, clean, prominent text
  const centerBoxW = 180;
  const centerBoxH = 76;
  const centerL = cx - centerBoxW / 2; // 390
  const centerR = cx + centerBoxW / 2; // 570

  // Branch box sizes: Expanded from 250px to 315px (+26% width) to eliminate any "..." truncation
  const branchBoxW = 315;
  const branchBoxH = 76;

  // Left and Right X coordinates - nicely inset 15px from canvas edges
  const leftBranchX = 15 + branchBoxW / 2; // 172.5 (Right edge at 330)
  const rightBranchX = canvasW - 15 - branchBoxW / 2; // 787.5 (Left edge at 630)

  // Helper to compute Y coordinate for each branch
  const getBranchY = (bIdx: number, totalOnSide: number) => {
    if (totalOnSide === 1) return cy;
    const startY = cy - ((totalOnSide - 1) * rowSpacing) / 2;
    return startY + bIdx * rowSpacing;
  };

  /**
   * Smoothly jumps and scrolls to the corresponding section heading in the article
   */
  const handleJumpToSection = (branch: MindmapBranch, globalIdx: number) => {
    // 1. Direct deterministic 1-to-1 matching (Branch 1 -> Sec 1, Branch 2 -> Sec 2, Branch 3 -> Sec 3, Branch 4 -> Sec 4)
    let targetEl = document.querySelector(`[data-section-index="${globalIdx}"]`) as HTMLElement | null;

    // 2. Fallback to section element by sequence index in DOM
    if (!targetEl) {
      const sectionElements = document.querySelectorAll('section[id^="heading-"]');
      if (sectionElements[globalIdx]) {
        targetEl = sectionElements[globalIdx] as HTMLElement;
      }
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
    <div className="my-5 w-full rounded-3xl border border-slate-200 bg-[#fdfbf7] p-3 sm:p-5 shadow-sm transition-all select-none overflow-hidden sm:overflow-visible">
      {/* Header Bar */}
      <div className="flex items-center justify-between border-b border-slate-200/80 pb-3 mb-3">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#641D06]/10 text-[#641D06] font-bold text-lg shrink-0">
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
          className="flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-xl transition-colors shadow-2xs cursor-pointer shrink-0"
        >
          <span className="material-symbols-outlined text-sm">
            {isOpen ? "visibility_off" : "visibility"}
          </span>
          <span>{isOpen ? "Thu gọn" : "Xem sơ đồ"}</span>
        </button>
      </div>

      {isOpen && (
        <div className="w-full relative overflow-x-auto sm:overflow-visible no-scrollbar">
          {/* UNIFIED DYNAMIC SVG VECTOR CANVAS & HTML NODES */}
          <div
            className="w-full relative min-w-[560px] sm:min-w-0 select-none"
            style={{
              aspectRatio: `${canvasW} / ${canvasH}`,
            }}
          >
            {/* 1. BACKGROUND VECTOR SVG LAYER (CONNECTING LINES ONLY - IMMUNE TO WEBKIT FOREIGNOBJECT BUGS) */}
            <svg
              viewBox={`0 0 ${canvasW} ${canvasH}`}
              className="absolute inset-0 w-full h-full pointer-events-none drop-shadow-2xs overflow-visible"
              preserveAspectRatio="none"
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

              {/* LEFT SIDE CONNECTIONS */}
              {leftBranches.map((b, idx) => {
                const branchY = getBranchY(idx, leftBranches.length);
                const startX = centerL;
                const startY = cy + (idx - (leftBranches.length - 1) / 2) * 15;

                const endX = leftBranchX + branchBoxW / 2;
                const endY = branchY;

                const isTarget = hoveredIdx === idx;

                return (
                  <path
                    key={`l-conn-clean-${idx}`}
                    d={`M ${startX} ${startY} C ${startX - 30} ${startY}, ${endX + 30} ${endY}, ${endX} ${endY}`}
                    fill="none"
                    stroke={b.lineColor}
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    markerEnd={`url(#arrow-main-clean-${idx})`}
                    opacity={isTarget ? 1 : 0.75}
                    style={{
                      transition: "opacity 0.2s ease, stroke 0.2s ease",
                    }}
                  />
                );
              })}

              {/* RIGHT SIDE CONNECTIONS */}
              {rightBranches.map((b, idx) => {
                const branchY = getBranchY(idx, rightBranches.length);
                const startX = centerR;
                const startY = cy + (idx - (rightBranches.length - 1) / 2) * 15;

                const endX = rightBranchX - branchBoxW / 2;
                const endY = branchY;

                const isTarget = hoveredIdx === half + idx;

                return (
                  <path
                    key={`r-conn-clean-${idx}`}
                    d={`M ${startX} ${startY} C ${startX + 30} ${startY}, ${endX - 30} ${endY}, ${endX} ${endY}`}
                    fill="none"
                    stroke={b.lineColor}
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    markerEnd={`url(#arrow-main-clean-${half + idx})`}
                    opacity={isTarget ? 1 : 0.75}
                    style={{
                      transition: "opacity 0.2s ease, stroke 0.2s ease",
                    }}
                  />
                );
              })}
            </svg>

            {/* 2. CENTER HUB (NATIVE HTML ELEMENT - CLEAN, ICON-FREE, FULLY VISIBLE TEXT) */}
            <div
              className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center p-0.5 z-10"
              style={{
                left: `${(cx / canvasW) * 100}%`,
                top: `${(cy / canvasH) * 100}%`,
                width: `${(centerBoxW / canvasW) * 100}%`,
                height: `${(centerBoxH / canvasH) * 100}%`,
              }}
            >
              <div className="w-full h-full rounded-2xl bg-[#641D06] text-white p-2 sm:p-2.5 shadow-md border-2 border-[#C0963B] flex items-center justify-center text-center">
                <h3 className="font-extrabold text-[11px] sm:text-xs md:text-[13px] uppercase tracking-wide leading-snug text-amber-100 break-words px-1.5">
                  {data.center}
                </h3>
              </div>
            </div>

            {/* 3. LEFT BRANCHES (NATIVE HTML ELEMENTS - EXPANDED ROOM FOR TEXT, NO "...") */}
            {leftBranches.map((b, bIdx) => {
              const branchY = getBranchY(bIdx, leftBranches.length);
              const isHovered = hoveredIdx === bIdx;
              const itemNumber = bIdx + 1;
              const cleanTitle = getCleanTitle(b.name);

              return (
                <div
                  key={`l-node-clean-${bIdx}`}
                  className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center p-0.5 z-10"
                  style={{
                    left: `${(leftBranchX / canvasW) * 100}%`,
                    top: `${(branchY / canvasH) * 100}%`,
                    width: `${(branchBoxW / canvasW) * 100}%`,
                    height: `${(branchBoxH / canvasH) * 100}%`,
                  }}
                  onMouseEnter={() => handleBranchMouseEnter(bIdx)}
                  onMouseLeave={handleBranchMouseLeave}
                >
                  <button
                    type="button"
                    onClick={() => handleJumpToSection(b, bIdx)}
                    className={`w-full h-full px-2.5 sm:px-3 py-1.5 rounded-2xl shadow-md border-2 text-left flex items-center gap-2 sm:gap-2.5 leading-snug cursor-pointer transition-all duration-150 ${
                      isHovered
                        ? "ring-4 ring-amber-300/90 shadow-xl brightness-110"
                        : "hover:ring-2 hover:ring-amber-200/80 hover:shadow-lg"
                    }`}
                    style={{
                      backgroundColor: b.colorBg,
                      borderColor: isHovered ? "#C0963B" : b.colorBorder,
                      color: b.textColor,
                    }}
                  >
                    {/* Number Badge [1], [2] */}
                    <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-amber-400 text-slate-950 font-black text-[10px] sm:text-xs flex items-center justify-center shrink-0 shadow-xs border border-amber-300">
                      {itemNumber}
                    </span>
                    {/* Full Vietnamese Title without truncation */}
                    <span className="font-semibold text-white leading-snug text-[11px] sm:text-[12px] md:text-[13px] tracking-normal break-words flex-1">
                      {cleanTitle}
                    </span>
                  </button>
                </div>
              );
            })}

            {/* 4. RIGHT BRANCHES (NATIVE HTML ELEMENTS - EXPANDED ROOM FOR TEXT, NO "...") */}
            {rightBranches.map((b, bIdx) => {
              const branchY = getBranchY(bIdx, rightBranches.length);
              const globalIdx = half + bIdx;
              const isHovered = hoveredIdx === globalIdx;
              const itemNumber = globalIdx + 1;
              const cleanTitle = getCleanTitle(b.name);

              return (
                <div
                  key={`r-node-clean-${bIdx}`}
                  className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center p-0.5 z-10"
                  style={{
                    left: `${(rightBranchX / canvasW) * 100}%`,
                    top: `${(branchY / canvasH) * 100}%`,
                    width: `${(branchBoxW / canvasW) * 100}%`,
                    height: `${(branchBoxH / canvasH) * 100}%`,
                  }}
                  onMouseEnter={() => handleBranchMouseEnter(globalIdx)}
                  onMouseLeave={handleBranchMouseLeave}
                >
                  <button
                    type="button"
                    onClick={() => handleJumpToSection(b, globalIdx)}
                    className={`w-full h-full px-2.5 sm:px-3 py-1.5 rounded-2xl shadow-md border-2 text-right flex items-center justify-end gap-2 sm:gap-2.5 leading-snug cursor-pointer transition-all duration-150 ${
                      isHovered
                        ? "ring-4 ring-amber-300/90 shadow-xl brightness-110"
                        : "hover:ring-2 hover:ring-amber-200/80 hover:shadow-lg"
                    }`}
                    style={{
                      backgroundColor: b.colorBg,
                      borderColor: isHovered ? "#C0963B" : b.colorBorder,
                      color: b.textColor,
                    }}
                  >
                    {/* Full Vietnamese Title without truncation */}
                    <span className="font-semibold text-white leading-snug text-right text-[11px] sm:text-[12px] md:text-[13px] tracking-normal break-words flex-1">
                      {cleanTitle}
                    </span>
                    {/* Number Badge [3], [4] */}
                    <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-amber-400 text-slate-950 font-black text-[10px] sm:text-xs flex items-center justify-center shrink-0 shadow-xs border border-amber-300">
                      {itemNumber}
                    </span>
                  </button>
                </div>
              );
            })}

            {/* SAFARI/MACBOOK IMMUNE FLOATING PREVIEW POPUP (OUTSIDE FOREIGN OBJECT) */}
            {hoveredIdx !== null && data.branches[hoveredIdx] && (() => {
              const b = data.branches[hoveredIdx];
              const isRight = hoveredIdx >= half;
              const sideIdx = isRight ? hoveredIdx - half : hoveredIdx;
              const totalOnSide = isRight ? rightBranches.length : leftBranches.length;
              const branchY = getBranchY(sideIdx, totalOnSide);
              const isUpper = branchY < cy;
              const itemNumber = hoveredIdx + 1;
              const cleanTitle = getCleanTitle(b.name);

              return (
                <div
                  className={`absolute z-40 w-72 sm:w-80 p-3 sm:p-3.5 bg-white text-slate-900 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.28)] text-xs leading-relaxed border-2 border-slate-300 pointer-events-auto transition-opacity duration-150 cursor-pointer ${
                    isRight ? "right-2 sm:right-6" : "left-2 sm:left-6"
                  }`}
                  style={{
                    ...(isUpper
                      ? { top: `calc(${((branchY + branchBoxH / 2) / canvasH) * 100}% + 12px)` }
                      : { bottom: `calc(${(1 - (branchY - branchBoxH / 2) / canvasH) * 100}% + 12px)` }),
                    WebkitTransform: "translate3d(0,0,0)",
                    transform: "translate3d(0,0,0)",
                    WebkitBackfaceVisibility: "hidden",
                    backfaceVisibility: "hidden",
                  }}
                  onMouseEnter={() => {
                    if (hoverTimeoutRef.current) {
                      clearTimeout(hoverTimeoutRef.current);
                      hoverTimeoutRef.current = null;
                    }
                  }}
                  onMouseLeave={handleBranchMouseLeave}
                  onClick={() => handleJumpToSection(b, hoveredIdx)}
                >
                  {/* Directional Pointer Arrow pointing directly to the hovered branch node */}
                  {isUpper ? (
                    <div
                      className={`absolute -top-2 ${
                        isRight ? "right-14 sm:right-16" : "left-14 sm:left-16"
                      } w-0 h-0 border-x-8 border-x-transparent border-b-8 border-b-white drop-shadow-xs pointer-events-none`}
                    />
                  ) : (
                    <div
                      className={`absolute -bottom-2 ${
                        isRight ? "right-14 sm:right-16" : "left-14 sm:left-16"
                      } w-0 h-0 border-x-8 border-x-transparent border-t-8 border-t-white drop-shadow-xs pointer-events-none`}
                    />
                  )}

                  {/* Tooltip Title Header */}
                  <div className="font-extrabold text-[#641D06] mb-2 flex items-center justify-between gap-1 border-b border-slate-200 pb-1.5">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <span className="w-5 h-5 rounded-full bg-[#641D06] text-white font-black text-[10px] flex items-center justify-center shrink-0 shadow-xs">
                        {itemNumber}
                      </span>
                      <span className="text-xs sm:text-sm font-black tracking-tight text-[#641D06] truncate">
                        {cleanTitle}
                      </span>
                    </div>
                    <span className="text-[10px] text-white font-bold bg-[#641D06] hover:bg-[#842A16] px-2 py-0.5 rounded-lg shadow-xs shrink-0 transition-colors">
                      Xem mục ↓
                    </span>
                  </div>

                  {/* Tooltip Bullet Content */}
                  {b.subItems && b.subItems.length > 0 ? (
                    <ul className="space-y-1.5 max-h-40 overflow-y-auto no-scrollbar">
                      {b.subItems.map((item, sIdx) => (
                        <li
                          key={sIdx}
                          className="flex items-start gap-2 bg-[#f8fafc] hover:bg-[#f1f5f9] text-slate-900 p-2 rounded-lg border border-slate-200/90 shadow-2xs transition-colors text-[11.5px]"
                        >
                          <span className="w-4 h-4 rounded-full bg-[#1D3540] text-white font-black text-[10px] flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                            {sIdx + 1}
                          </span>
                          <span className="font-bold text-slate-800 leading-snug">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="bg-[#f8fafc] text-slate-800 p-2.5 rounded-lg border border-slate-200/90 text-xs font-medium">
                      Nhấp chuột để tự động cuộn xuống xem toàn văn điều khoản pháp lý chi tiết trong bài viết.
                    </div>
                  )}
                </div>
              );
            })()}
          </div>

          {/* Quick Interactive Guide Footer */}
          <div className="mt-2.5 pt-2 border-t border-slate-200/80 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500 font-medium">
            <span className="flex items-center gap-1 text-[#641D06] font-semibold">
              <span className="material-symbols-outlined text-xs">touch_app</span>
              <span>Nhấp chuột vào nhánh để cuộn ngay tới mục tương ứng</span>
            </span>
            <span className="text-slate-400">Rê chuột để xem tóm tắt điều khoản</span>
          </div>
        </div>
      )}
    </div>
  );
}
