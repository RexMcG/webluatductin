"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => {
    const active = path === "/" ? pathname === "/" : pathname.startsWith(path);
    return active
      ? "font-black text-[#641D06] border-b-2 border-[#641D06] pb-1"
      : "text-slate-800 hover:text-[#641D06] font-bold transition-colors duration-200";
  };

  const isMobileActive = (path: string) => {
    const active = path === "/" ? pathname === "/" : pathname.startsWith(path);
    return active
      ? "bg-amber-50 text-[#641D06] font-black border-l-4 border-[#641D06] pl-3.5 pr-4 py-2.5 rounded-r-xl uppercase text-[15px] transition-colors"
      : "text-slate-800 hover:text-[#641D06] hover:bg-slate-50 pl-4 pr-4 py-2.5 rounded-xl uppercase text-[15px] font-bold transition-colors";
  };

  const isSubItemActive = (path: string) => {
    const active = pathname === path;
    return active
      ? "bg-amber-50 text-[#641D06] font-bold text-sm pl-6 pr-4 py-2 rounded-xl flex items-center gap-2 transition-colors"
      : "text-slate-700 hover:text-[#641D06] hover:bg-slate-50 text-sm pl-6 pr-4 py-2 rounded-xl flex items-center gap-2 font-medium transition-colors";
  };

  return (
    <>
      <nav className="bg-white fixed top-0 w-full z-50 shadow-xs border-b-[7px] border-[#641D06]">
        <div className="w-full max-w-[1728px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 flex justify-between items-center h-20">
          <Link href="/" className="shrink-0 mr-3 lg:mr-6 xl:mr-10">
            <img
              src="/img/Logo_website.webp"
              alt="Logo Công ty Luật Đức Tín"
              width={244}
              height={40}
              fetchPriority="high"
              className="h-8 md:h-9 xl:h-10 w-auto object-contain"
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-3.5 xl:gap-6 2xl:gap-8">
            <Link
              href="/"
              className={`${isActive("/")} uppercase text-[13px] xl:text-[14px] 2xl:text-[15px] whitespace-nowrap`}
            >
              Trang chủ
            </Link>
            <Link
              href="/services"
              className={`${isActive("/services")} uppercase text-[13px] xl:text-[14px] 2xl:text-[15px] whitespace-nowrap`}
            >
              Lĩnh vực
            </Link>
            <Link
              href="/news"
              className={`${isActive("/news")} uppercase text-[13px] xl:text-[14px] 2xl:text-[15px] whitespace-nowrap`}
            >
              Tin tức
            </Link>

            {/* Direct Link: Biểu mẫu AI */}
            <Link
              href="/ai-form-library"
              className={`${isActive("/ai-form-library")} uppercase text-[13px] xl:text-[14px] 2xl:text-[15px] whitespace-nowrap`}
            >
              Biểu mẫu AI
            </Link>

            {/* Dropdown: Tính năng */}
            <div className="relative group">
              <a
                href="#"
                className="text-slate-800 hover:text-[#641D06] font-bold transition-colors duration-200 uppercase text-[13px] xl:text-[14px] 2xl:text-[15px] flex items-center gap-0.5 whitespace-nowrap py-2"
                onClick={(e) => e.preventDefault()}
              >
                Tính năng <span className="material-symbols-outlined text-sm">expand_more</span>
              </a>
              <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-2xl shadow-xl border border-slate-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 flex flex-col z-50 overflow-hidden">
                <Link
                  href="/court-fee-calculator"
                  className="px-4 py-3 text-slate-800 hover:bg-amber-50 hover:text-[#641D06] text-sm font-semibold border-b border-slate-100 flex items-center gap-2.5 group/item transition-colors"
                >
                  <span className="text-amber-800 font-bold text-base leading-none">•</span>
                  <span>Tính án phí tòa án</span>
                </Link>
                <Link
                  href="/salary-calculator"
                  className="px-4 py-3 text-slate-800 hover:bg-amber-50 hover:text-[#641D06] text-sm font-semibold border-b border-slate-100 flex items-center gap-2.5 group/item transition-colors"
                >
                  <span className="text-amber-800 font-bold text-base leading-none">•</span>
                  <span>Tính lương Gross-to-Net</span>
                </Link>
                <Link
                  href="/pit-calculator"
                  className="px-4 py-3 text-slate-800 hover:bg-amber-50 hover:text-[#641D06] text-sm font-semibold flex items-center gap-2.5 group/item transition-colors"
                >
                  <span className="text-amber-800 font-bold text-base leading-none">•</span>
                  <span>Tính thuế TNCN</span>
                </Link>
              </div>
            </div>

            <Link
              href="/ai-chatbot"
              className={`${isActive("/ai-chatbot")} uppercase text-[13px] xl:text-[14px] 2xl:text-[15px] whitespace-nowrap`}
            >
              AI Chat
            </Link>
            <Link
              href="/appointment"
              className={`${isActive("/appointment")} uppercase text-[13px] xl:text-[14px] 2xl:text-[15px] whitespace-nowrap`}
            >
              Đặt lịch
            </Link>
          </div>

          <div className="flex items-center gap-2 lg:gap-3 ml-2 lg:ml-4 xl:ml-8 shrink-0">
            <a
              href="tel:0937863263"
              className="hidden sm:flex items-center gap-1.5 text-[#641D06] bg-amber-50 hover:bg-amber-100 px-3 lg:px-4 py-2 rounded-full border border-amber-300 transition-colors shrink-0 font-bold text-xs lg:text-sm shadow-2xs whitespace-nowrap"
            >
              <span className="material-symbols-outlined text-sm lg:text-base text-[#641D06]">call</span>
              <span>Hotline: 093 786 32 63</span>
            </a>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden material-symbols-outlined cursor-pointer text-slate-900 p-2 rounded-lg hover:bg-slate-100 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Đóng menu điều hướng" : "Mở menu điều hướng"}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? "close" : "menu"}
            </button>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        <div
          className={`${isMobileMenuOpen ? "block" : "hidden"} md:hidden bg-white border-t border-slate-200 px-5 py-4 shadow-2xl transition-all max-h-[calc(100vh-5rem)] overflow-y-auto`}
        >
          <div className="flex flex-col gap-1.5 font-bold text-slate-800">
            <Link 
              href="/" 
              onClick={() => setIsMobileMenuOpen(false)}
              className={isMobileActive("/")}
            >
              Trang chủ
            </Link>
            <Link 
              href="/services" 
              onClick={() => setIsMobileMenuOpen(false)}
              className={isMobileActive("/services")}
            >
              Lĩnh vực pháp lý
            </Link>
            <Link 
              href="/news" 
              onClick={() => setIsMobileMenuOpen(false)}
              className={isMobileActive("/news")}
            >
              Tin tức &amp; Án lệ
            </Link>
            <Link 
              href="/ai-form-library" 
              onClick={() => setIsMobileMenuOpen(false)}
              className={isMobileActive("/ai-form-library")}
            >
              Biểu mẫu AI
            </Link>
            <Link 
              href="/ai-chatbot" 
              onClick={() => setIsMobileMenuOpen(false)}
              className={isMobileActive("/ai-chatbot")}
            >
              Trợ lý AI 24/7
            </Link>

            <div className="text-[11px] font-black uppercase tracking-wider text-slate-400 mt-2 pt-2 border-t border-slate-100 px-4">
              Tính năng tính toán
            </div>
            <Link 
              href="/court-fee-calculator" 
              onClick={() => setIsMobileMenuOpen(false)}
              className={isSubItemActive("/court-fee-calculator")}
            >
              <span className="text-amber-800 font-bold">•</span>
              <span>Tính án phí tòa án</span>
            </Link>
            <Link 
              href="/salary-calculator" 
              onClick={() => setIsMobileMenuOpen(false)}
              className={isSubItemActive("/salary-calculator")}
            >
              <span className="text-amber-800 font-bold">•</span>
              <span>Tính lương Gross-to-Net</span>
            </Link>
            <Link 
              href="/pit-calculator" 
              onClick={() => setIsMobileMenuOpen(false)}
              className={isSubItemActive("/pit-calculator")}
            >
              <span className="text-amber-800 font-bold">•</span>
              <span>Tính thuế TNCN</span>
            </Link>

            <div className="pt-3 mt-2 border-t border-slate-100 flex flex-col gap-2.5">
              <Link 
                href="/appointment" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full bg-[#641D06] hover:bg-black text-white text-center py-3 rounded-xl uppercase text-[14px] font-bold shadow-md flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-lg">calendar_month</span> Đặt Lịch Hẹn Tư Vấn
              </Link>
              <a 
                href="tel:0937863263" 
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-center py-3 rounded-xl uppercase text-[14px] font-bold shadow-md flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-lg">call</span> Hotline: 093 786 32 63
              </a>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
