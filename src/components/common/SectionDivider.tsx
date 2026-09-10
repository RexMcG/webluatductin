import React from "react";

interface SectionDividerProps {
  label: string;
  className?: string;
  lineClassName?: string;
  textClassName?: string;
}

export default function SectionDivider({
  label,
  className = "",
  lineClassName = "",
  textClassName = "",
}: SectionDividerProps) {
  return (
    <div className={`flex items-center justify-center gap-3 sm:gap-4 my-2.5 ${className}`}>
      <span className={`w-14 sm:w-20 md:w-28 h-[1.5px] bg-[#641D06] shrink-0 ${lineClassName}`} />
      <span
        className={`text-xs sm:text-[13px] font-black tracking-widest text-[#641D06] uppercase select-none ${textClassName}`}
      >
        {label}
      </span>
      <span className={`w-14 sm:w-20 md:w-28 h-[1.5px] bg-[#641D06] shrink-0 ${lineClassName}`} />
    </div>
  );
}
