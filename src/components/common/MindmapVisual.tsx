"use client";

import React, { useState, useRef, useEffect } from "react";

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
  const [hoveredBranch, setHoveredBranch] = useState<MindmapBranch | null>(null);
  const [activeTooltipBranch, setActiveTooltipBranch] = useState<MindmapBranch | null>(null);
  const [popoverPos, setPopoverPos] = useState<{ x: number; y: number; side: "left" | "right" } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { data } = extractMindmapAndCleanText(rawText);

  // Close tooltip on outside click
  useEffect(() => {
    const handleDocClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setActiveTooltipBranch(null);
        setHoveredBranch(null);
      }
    };
    document.addEventListener("click", handleDocClick);
    return () => document.removeEventListener("click", handleDocClick);
  }, []);

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

    // Dismiss active popup
    setActiveTooltipBranch(null);
    setHoveredBranch(null);
  };

  const activeBranch = activeTooltipBranch || hoveredBranch;

  return (
    <div
      ref={containerRef}
      className="my-5 w-full rounded-3xl border border-slate-200 bg-[#fdfbf7] p-3 sm:p-5 shadow-sm transition-all relative select-none"
    >
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
              Rê chuột vào <strong>[ⓘ]</strong> để xem popup giải thích tại chỗ • <strong>Click vào mục</strong> để nhảy tới bài viết
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
          <div className="w-full relative overflow-x-auto">
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

                const isTarget = activeBranch?.name === b.name;

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

                const isTarget = activeBranch?.name === b.name;

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

              {/* 4. LEFT BRANCHES */}
              {leftBranches.map((b, bIdx) => {
                const branchY = getBranchY(bIdx, leftBranches.length);
                const isTarget = activeBranch?.name === b.name;

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
                      className="w-full h-full flex items-center justify-center p-0.5 relative group/node"
                      onMouseEnter={() => {
                        setHoveredBranch(b);
                        setPopoverPos({ x: leftBranchX, y: branchY, side: "left" });
                      }}
                      onMouseLeave={() => setHoveredBranch(null)}
                    >
                      <button
                        type="button"
                        onClick={() => handleJumpToSection(b, bIdx)}
                        className={`w-full h-full px-2.5 py-1.5 rounded-xl text-[11px] font-bold shadow-sm border-2 text-left flex items-center justify-between gap-1.5 leading-tight transition-all duration-200 cursor-pointer active:scale-95 ${
                          isTarget
                            ? "ring-4 ring-amber-300/90 scale-105 shadow-lg"
                            : "hover:scale-102 hover:shadow-md"
                        }`}
                        style={{
                          backgroundColor: b.colorBg,
                          borderColor: isTarget ? "#C0963B" : b.colorBorder,
                          color: b.textColor,
                        }}
                        title="Bấm để nhảy tới mục này trong bài viết"
                      >
                        <span className="font-black leading-snug flex-1 line-clamp-2">
                          {b.name}
                        </span>

                        {/* Tooltip ⓘ Badge */}
                        <div
                          className="flex items-center gap-0.5 shrink-0 bg-white/20 hover:bg-amber-300 hover:text-slate-900 rounded-lg px-1.5 py-1 transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveTooltipBranch(activeTooltipBranch?.name === b.name ? null : b);
                            setPopoverPos({ x: leftBranchX, y: branchY, side: "left" });
                          }}
                          title="Xem chú thích giải thích tại chỗ"
                        >
                          <span className="text-[10px] font-black">ⓘ</span>
                          <span className="material-symbols-outlined text-[13px] opacity-80 group-hover/node:translate-x-0.5 transition-transform">
                            arrow_downward
                          </span>
                        </div>
                      </button>
                    </div>
                  </foreignObject>
                );
              })}

              {/* 5. RIGHT BRANCHES */}
              {rightBranches.map((b, bIdx) => {
                const branchY = getBranchY(bIdx, rightBranches.length);
                const isTarget = activeBranch?.name === b.name;
                const globalIdx = half + bIdx;

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
                      className="w-full h-full flex items-center justify-center p-0.5 relative group/node"
                      onMouseEnter={() => {
                        setHoveredBranch(b);
                        setPopoverPos({ x: rightBranchX, y: branchY, side: "right" });
                      }}
                      onMouseLeave={() => setHoveredBranch(null)}
                    >
                      <button
                        type="button"
                        onClick={() => handleJumpToSection(b, globalIdx)}
                        className={`w-full h-full px-2.5 py-1.5 rounded-xl text-[11px] font-bold shadow-sm border-2 text-right flex items-center justify-between gap-1.5 leading-tight transition-all duration-200 cursor-pointer active:scale-95 ${
                          isTarget
                            ? "ring-4 ring-amber-300/90 scale-105 shadow-lg"
                            : "hover:scale-102 hover:shadow-md"
                        }`}
                        style={{
                          backgroundColor: b.colorBg,
                          borderColor: isTarget ? "#C0963B" : b.colorBorder,
                          color: b.textColor,
                        }}
                        title="Bấm để nhảy tới mục này trong bài viết"
                      >
                        {/* Tooltip ⓘ Badge */}
                        <div
                          className="flex items-center gap-0.5 shrink-0 bg-white/20 hover:bg-amber-300 hover:text-slate-900 rounded-lg px-1.5 py-1 transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveTooltipBranch(activeTooltipBranch?.name === b.name ? null : b);
                            setPopoverPos({ x: rightBranchX, y: branchY, side: "right" });
                          }}
                          title="Xem chú thích giải thích tại chỗ"
                        >
                          <span className="material-symbols-outlined text-[13px] opacity-80 group-hover/node:translate-x-0.5 transition-transform">
                            arrow_downward
                          </span>
                          <span className="text-[10px] font-black">ⓘ</span>
                        </div>

                        <span className="font-black leading-snug flex-1 line-clamp-2">
                          {b.name}
                        </span>
                      </button>
                    </div>
                  </foreignObject>
                );
              })}
            </svg>
          </div>

          {/* =========================================================
              INSTANT POPUP / TOOLTIP ⓘ GIẢI THÍCH NGAY TẠI CHỖ
             ========================================================= */}
          {activeBranch && (
            <div
              className="mt-3 p-4 sm:p-5 rounded-2xl border-2 transition-all duration-300 animate-fadeIn shadow-xl bg-white/95 backdrop-blur-md relative z-30"
              style={{
                borderColor: activeBranch.colorBorder,
                boxShadow: `0 10px 30px -5px ${activeBranch.colorBg}30`,
              }}
              onMouseEnter={() => setHoveredBranch(activeBranch)}
              onMouseLeave={() => setHoveredBranch(null)}
            >
              {/* Tooltip Header */}
              <div
                className="flex items-start justify-between gap-3 border-b pb-3 mb-3"
                style={{ borderColor: activeBranch.subBorder }}
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center font-black text-sm text-white shadow-xs shrink-0"
                    style={{ backgroundColor: activeBranch.colorBg }}
                  >
                    ⓘ
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span
                        className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full"
                        style={{
                          backgroundColor: activeBranch.subBg,
                          color: activeBranch.colorBg,
                          border: `1px solid ${activeBranch.subBorder}`,
                        }}
                      >
                        Tooltip ⓘ Giải Thích Trọng Tâm
                      </span>
                    </div>
                    <h4
                      className="text-sm sm:text-base font-black leading-snug mt-0.5"
                      style={{ color: activeBranch.colorBg }}
                    >
                      {activeBranch.name}
                    </h4>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => {
                      const idx = data.branches.findIndex((b) => b.name === activeBranch.name);
                      handleJumpToSection(activeBranch, idx >= 0 ? idx : 0);
                    }}
                    className="flex items-center gap-1 text-[11px] sm:text-xs px-3 py-1.5 rounded-xl font-bold text-white shadow-sm transition-transform active:scale-95 cursor-pointer hover:brightness-110"
                    style={{ backgroundColor: activeBranch.colorBg }}
                  >
                    <span>Xem mục này trong bài viết</span>
                    <span className="material-symbols-outlined text-sm">arrow_downward</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setActiveTooltipBranch(null);
                      setHoveredBranch(null);
                    }}
                    className="text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100 transition-colors"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* Sub-items list */}
              {activeBranch.subItems.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {activeBranch.subItems.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 p-2.5 rounded-xl border shadow-2xs transition-all hover:bg-amber-50/40"
                      style={{
                        backgroundColor: activeBranch.subBg,
                        borderColor: activeBranch.subBorder,
                      }}
                    >
                      <span
                        className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-white font-bold text-[10px] mt-0.5 shadow-2xs"
                        style={{ backgroundColor: activeBranch.colorBg }}
                      >
                        {idx + 1}
                      </span>
                      <p
                        className="text-xs font-semibold leading-relaxed"
                        style={{ color: activeBranch.subTextColor }}
                      >
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-700 italic">
                  Nhấn vào nút bên trên để cuộn ngay tới toàn văn điều khoản pháp lý chi tiết trong bài viết.
                </div>
              )}
            </div>
          )}

          {/* Bottom helper tip */}
          {!activeBranch && (
            <div className="mt-2.5 py-2 px-3 bg-amber-50/70 border border-amber-200/80 rounded-xl flex items-center justify-center gap-2 text-center text-[11px] text-amber-950 font-medium">
              <span className="text-sm">💡</span>
              <span>
                <strong>Mẹo:</strong> Rê chuột vào từng nhánh để xem <strong>Tooltip ⓘ giải thích nhanh</strong>, hoặc <strong>Click trực tiếp</strong> để cuộn ngay tới mục đó trong bài viết.
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
