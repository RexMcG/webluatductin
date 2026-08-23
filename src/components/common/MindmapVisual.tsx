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

const PASTEL_THEMES = [
  {
    colorBg: "#fed7aa", // Peach / Soft Orange
    colorBorder: "#ea580c",
    textColor: "#7c2d12",
    lineColor: "#ea580c",
    subBg: "#ffedd5",
    subBorder: "#fdba74",
    subTextColor: "#9a3412",
  },
  {
    colorBg: "#fecdd3", // Soft Rose / Pink
    colorBorder: "#e11d48",
    textColor: "#881337",
    lineColor: "#e11d48",
    subBg: "#ffe4e6",
    subBorder: "#fecdd3",
    subTextColor: "#9f1239",
  },
  {
    colorBg: "#bbf7d0", // Soft Green / Mint
    colorBorder: "#16a34a",
    textColor: "#14532d",
    lineColor: "#16a34a",
    subBg: "#dcfce7",
    subBorder: "#86efac",
    subTextColor: "#166534",
  },
  {
    colorBg: "#bae6fd", // Soft Sky Blue
    colorBorder: "#0284c7",
    textColor: "#0c4a6e",
    lineColor: "#0284c7",
    subBg: "#e0f2fe",
    subBorder: "#7dd3fc",
    subTextColor: "#075985",
  },
  {
    colorBg: "#e9d5ff", // Soft Purple
    colorBorder: "#9333ea",
    textColor: "#581c87",
    lineColor: "#9333ea",
    subBg: "#f3e8ff",
    subBorder: "#d8b4fe",
    subTextColor: "#6b21a8",
  },
  {
    colorBg: "#fef08a", // Soft Yellow
    colorBorder: "#ca8a04",
    textColor: "#713f12",
    lineColor: "#ca8a04",
    subBg: "#fef9c3",
    subBorder: "#fde047",
    subTextColor: "#854d0e",
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
      const theme = PASTEL_THEMES[colorIdx % PASTEL_THEMES.length];
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
  const { data } = extractMindmapAndCleanText(rawText);

  if (!data) return null;

  // Split branches into Left and Right sides
  const half = Math.ceil(data.branches.length / 2);
  const leftBranches = data.branches.slice(0, half);
  const rightBranches = data.branches.slice(half);

  // Dynamic canvas calculations based on number of branches
  const maxSide = Math.max(leftBranches.length, rightBranches.length);
  const rowSpacing = maxSide >= 4 ? 85 : 100;
  const canvasH = Math.max(380, (maxSide - 1) * rowSpacing + 160);
  const canvasW = 1000;

  const cx = canvasW / 2; // 500
  const cy = canvasH / 2;

  const centerBoxW = 170;
  const centerBoxH = 85;
  const centerL = cx - centerBoxW / 2; // 415
  const centerR = cx + centerBoxW / 2; // 585

  const branchBoxW = 145;
  const branchBoxH = 54;

  const subBoxW = 135;
  const subBoxH = 44;

  // X Coordinate Columns with clear gaps for smooth curves
  const leftBranchX = 245; // [172.5 to 317.5]
  const rightBranchX = 755; // [682.5 to 827.5]

  const leftSubX = 68; // [0.5 to 135.5]
  const rightSubX = 932; // [864.5 to 999.5]

  // Helper to compute Y coordinate for each branch
  const getBranchY = (bIdx: number, totalOnSide: number) => {
    if (totalOnSide === 1) return cy;
    const startY = cy - ((totalOnSide - 1) * rowSpacing) / 2;
    return startY + bIdx * rowSpacing;
  };

  return (
    <div className="my-5 w-full rounded-3xl border border-slate-200 bg-[#fdfbf7] p-3 sm:p-5 shadow-sm">
      {/* Header Bar */}
      <div className="flex items-center justify-between border-b border-slate-200/80 pb-2.5 mb-3">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-purple-100 text-purple-800 font-bold text-base">
            <span className="material-symbols-outlined text-base">bubble_chart</span>
          </span>
          <div>
            <h4 className="font-bold text-slate-900 text-xs sm:text-sm">
              Sơ Đồ Tư Duy Mindmap Toàn Cảnh ({data.branches.length} Mục Trọng Tâm)
            </h4>
            <p className="text-[10px] text-slate-500">Mũi tên tỏa ra từ tâm điểm hướng tới từng nhánh và nội dung chi tiết</p>
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
          <div className="w-full relative select-none">
            
            {/* UNIFIED DYNAMIC SVG VECTOR CANVAS */}
            <svg
              viewBox={`0 0 ${canvasW} ${canvasH}`}
              className="w-full h-auto drop-shadow-2xs overflow-visible"
            >
              <defs>
                {/* Standard Forward Arrowhead Marker for Center Hub Connections */}
                <marker
                  id="arrow-main-purple"
                  viewBox="0 0 10 10"
                  refX="8"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto"
                >
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#7c3aed" />
                </marker>

                {/* Forward Arrowhead Markers for Branch to Sub-item Connections */}
                {data.branches.map((b, idx) => (
                  <marker
                    key={`marker-${idx}`}
                    id={`arrow-sub-dyn-${idx}`}
                    viewBox="0 0 10 10"
                    refX="8"
                    refY="5"
                    markerWidth="5"
                    markerHeight="5"
                    orient="auto"
                  >
                    <path d="M 0 0 L 10 5 L 0 10 z" fill={b.lineColor} />
                  </marker>
                ))}
              </defs>

              {/* =========================================================
                  1. LEFT SIDE: FROM CENTER HUB (START) ---> TO LEFT BRANCH (END: ◀)
                 ========================================================= */}
              {leftBranches.map((b, idx) => {
                const branchY = getBranchY(idx, leftBranches.length);
                const startX = centerL; // Start at Left edge of Center Hub
                const startY = cy + (idx - (leftBranches.length - 1) / 2) * 12;

                const endX = leftBranchX + branchBoxW / 2; // End at Right edge of Left Branch
                const endY = branchY;

                const cp1X = startX - 50;
                const cp1Y = startY;
                const cp2X = endX + 50;
                const cp2Y = endY;

                return (
                  <path
                    key={`l-main-dyn-${idx}`}
                    d={`M ${startX} ${startY} C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${endX} ${endY}`}
                    fill="none"
                    stroke="#7c3aed"
                    strokeWidth="3"
                    strokeLinecap="round"
                    markerEnd="url(#arrow-main-purple)"
                  />
                );
              })}

              {/* =========================================================
                  2. LEFT SIDE: FROM LEFT BRANCH (START) ---> TO LEFT SUB-ITEM (END: ◀)
                 ========================================================= */}
              {leftBranches.map((b, bIdx) => {
                const branchY = getBranchY(bIdx, leftBranches.length);
                const branchLeftBorderX = leftBranchX - branchBoxW / 2;

                return b.subItems.map((sub, sIdx) => {
                  const sCount = b.subItems.length;
                  const subY =
                    sCount === 1
                      ? branchY
                      : sIdx === 0
                      ? branchY - 26
                      : branchY + 26;

                  const startX = branchLeftBorderX; // Start at Left edge of Branch
                  const startY = branchY;

                  const endX = leftSubX + subBoxW / 2; // End at Right edge of Sub-item
                  const endY = subY;

                  const cp1X = startX - 20;
                  const cp1Y = startY;
                  const cp2X = endX + 20;
                  const cp2Y = endY;

                  return (
                    <path
                      key={`l-sub-dyn-${bIdx}-${sIdx}`}
                      d={`M ${startX} ${startY} C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${endX} ${endY}`}
                      fill="none"
                      stroke={b.lineColor}
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      markerEnd={`url(#arrow-sub-dyn-${bIdx})`}
                    />
                  );
                });
              })}

              {/* =========================================================
                  3. RIGHT SIDE: FROM CENTER HUB (START) ---> TO RIGHT BRANCH (END: ▶)
                 ========================================================= */}
              {rightBranches.map((b, idx) => {
                const branchY = getBranchY(idx, rightBranches.length);
                const startX = centerR; // Start at Right edge of Center Hub
                const startY = cy + (idx - (rightBranches.length - 1) / 2) * 12;

                const endX = rightBranchX - branchBoxW / 2; // End at Left edge of Right Branch
                const endY = branchY;

                const cp1X = startX + 50;
                const cp1Y = startY;
                const cp2X = endX - 50;
                const cp2Y = endY;

                return (
                  <path
                    key={`r-main-dyn-${idx}`}
                    d={`M ${startX} ${startY} C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${endX} ${endY}`}
                    fill="none"
                    stroke="#7c3aed"
                    strokeWidth="3"
                    strokeLinecap="round"
                    markerEnd="url(#arrow-main-purple)"
                  />
                );
              })}

              {/* =========================================================
                  4. RIGHT SIDE: FROM RIGHT BRANCH (START) ---> TO RIGHT SUB-ITEM (END: ▶)
                 ========================================================= */}
              {rightBranches.map((b, bIdx) => {
                const branchY = getBranchY(bIdx, rightBranches.length);
                const branchRightBorderX = rightBranchX + branchBoxW / 2;
                const actualIdx = half + bIdx;

                return b.subItems.map((sub, sIdx) => {
                  const sCount = b.subItems.length;
                  const subY =
                    sCount === 1
                      ? branchY
                      : sIdx === 0
                      ? branchY - 26
                      : branchY + 26;

                  const startX = branchRightBorderX; // Start at Right edge of Branch
                  const startY = branchY;

                  const endX = rightSubX - subBoxW / 2; // End at Left edge of Sub-item
                  const endY = subY;

                  const cp1X = startX + 20;
                  const cp1Y = startY;
                  const cp2X = endX - 20;
                  const cp2Y = endY;

                  return (
                    <path
                      key={`r-sub-dyn-${bIdx}-${sIdx}`}
                      d={`M ${startX} ${startY} C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${endX} ${endY}`}
                      fill="none"
                      stroke={b.lineColor}
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      markerEnd={`url(#arrow-sub-dyn-${actualIdx})`}
                    />
                  );
                });
              })}

              {/* =========================================================
                  5. CENTER HUB (TÂM TRUNG TÂM)
                 ========================================================= */}
              <foreignObject
                x={centerL}
                y={cy - centerBoxH / 2}
                width={centerBoxW}
                height={centerBoxH}
              >
                <div className="w-full h-full flex items-center justify-center p-0.5">
                  <div className="w-full h-full rounded-2xl bg-[#7c3aed] text-white p-2.5 shadow-md border border-white flex flex-col items-center justify-center text-center">
                    <span className="material-symbols-outlined text-lg mb-0.5">lightbulb</span>
                    <h3 className="font-black text-[11px] uppercase tracking-wide leading-snug line-clamp-3">
                      {data.center}
                    </h3>
                  </div>
                </div>
              </foreignObject>

              {/* =========================================================
                  6. LEFT BRANCHES & SUB-ITEMS
                 ========================================================= */}
              {leftBranches.map((b, bIdx) => {
                const branchY = getBranchY(bIdx, leftBranches.length);

                return (
                  <React.Fragment key={`l-node-dyn-${bIdx}`}>
                    {/* Branch Node */}
                    <foreignObject
                      x={leftBranchX - branchBoxW / 2}
                      y={branchY - branchBoxH / 2}
                      width={branchBoxW}
                      height={branchBoxH}
                    >
                      <div className="w-full h-full flex items-center justify-center p-0.5">
                        <div
                          className="w-full h-full px-2 py-1.5 rounded-xl text-[10.5px] font-bold shadow-xs border-2 text-center flex items-center justify-center leading-tight"
                          style={{
                            backgroundColor: b.colorBg,
                            borderColor: b.colorBorder,
                            color: b.textColor,
                          }}
                        >
                          {b.name}
                        </div>
                      </div>
                    </foreignObject>

                    {/* Sub-item Cards */}
                    {b.subItems.map((sub, sIdx) => {
                      const sCount = b.subItems.length;
                      const subY =
                        sCount === 1
                          ? branchY
                          : sIdx === 0
                          ? branchY - 26
                          : branchY + 26;

                      return (
                        <foreignObject
                          key={`l-sub-card-dyn-${sIdx}`}
                          x={leftSubX - subBoxW / 2}
                          y={subY - subBoxH / 2}
                          width={subBoxW}
                          height={subBoxH}
                        >
                          <div className="w-full h-full flex items-center justify-center p-0.5">
                            <div
                              className="w-full h-full px-2 py-0.5 rounded-lg text-[9.5px] font-semibold shadow-2xs border text-right flex items-center justify-end leading-tight"
                              style={{
                                backgroundColor: b.subBg,
                                borderColor: b.subBorder,
                                color: b.subTextColor,
                              }}
                            >
                              {sub}
                            </div>
                          </div>
                        </foreignObject>
                      );
                    })}
                  </React.Fragment>
                );
              })}

              {/* =========================================================
                  7. RIGHT BRANCHES & SUB-ITEMS
                 ========================================================= */}
              {rightBranches.map((b, bIdx) => {
                const branchY = getBranchY(bIdx, rightBranches.length);

                return (
                  <React.Fragment key={`r-node-dyn-${bIdx}`}>
                    {/* Branch Node */}
                    <foreignObject
                      x={rightBranchX - branchBoxW / 2}
                      y={branchY - branchBoxH / 2}
                      width={branchBoxW}
                      height={branchBoxH}
                    >
                      <div className="w-full h-full flex items-center justify-center p-0.5">
                        <div
                          className="w-full h-full px-2 py-1.5 rounded-xl text-[10.5px] font-bold shadow-xs border-2 text-center flex items-center justify-center leading-tight"
                          style={{
                            backgroundColor: b.colorBg,
                            borderColor: b.colorBorder,
                            color: b.textColor,
                          }}
                        >
                          {b.name}
                        </div>
                      </div>
                    </foreignObject>

                    {/* Sub-item Cards */}
                    {b.subItems.map((sub, sIdx) => {
                      const sCount = b.subItems.length;
                      const subY =
                        sCount === 1
                          ? branchY
                          : sIdx === 0
                          ? branchY - 26
                          : branchY + 26;

                      return (
                        <foreignObject
                          key={`r-sub-card-dyn-${sIdx}`}
                          x={rightSubX - subBoxW / 2}
                          y={subY - subBoxH / 2}
                          width={subBoxW}
                          height={subBoxH}
                        >
                          <div className="w-full h-full flex items-center justify-center p-0.5">
                            <div
                              className="w-full h-full px-2 py-0.5 rounded-lg text-[9.5px] font-semibold shadow-2xs border text-left flex items-center justify-start leading-tight"
                              style={{
                                backgroundColor: b.subBg,
                                borderColor: b.subBorder,
                                color: b.subTextColor,
                              }}
                            >
                              {sub}
                            </div>
                          </div>
                        </foreignObject>
                      );
                    })}
                  </React.Fragment>
                );
              })}

            </svg>

          </div>

          {/* Footer Note */}
          <div className="flex items-center justify-between text-[10px] text-slate-500 pt-2 mt-2 border-t border-slate-200/70">
            <span>⚖️ Công ty Luật TNHH Đức Tín &amp; Cộng sự</span>
            <span>📞 Hotline / Zalo: 093 786 32 63</span>
          </div>
        </div>
      )}
    </div>
  );
}
