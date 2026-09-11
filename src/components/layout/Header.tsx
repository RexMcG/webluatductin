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
        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-20">
          <Link href="/" className="shrink-0 mr-2 lg:mr-4 xl:mr-8">
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
          <div className="hidden lg:flex items-center gap-2.5 xl:gap-5 2xl:gap-7">
            <Link
              href="/"
              className={`${isActive("/")} uppercase text-[12.5px] xl:text-[14px] 2xl:text-[15px] whitespace-nowrap`}
            >
              Trang chủ
            </Link>
            <Link
              href="/services"
              className={`${isActive("/services")} uppercase text-[12.5px] xl:text-[14px] 2xl:text-[15px] whitespace-nowrap`}
            >
              Lĩnh vực
            </Link>
            <Link
              href="/news"
              className={`${isActive("/news")} uppercase text-[12.5px] xl:text-[14px] 2xl:text-[15px] whitespace-nowrap`}
            >
              Tin tức
            </Link>

            {/* Direct Link: Biểu mẫu */}
            <Link
              href="/ai-form-library"
              className={`${isActive("/ai-form-library")} uppercase text-[12.5px] xl:text-[14px] 2xl:text-[15px] whitespace-nowrap`}
            >
              Biểu mẫu
            </Link>

            {/* Dropdown: Tiện ích */}
            <div className="relative group">
              <a
                href="#"
                className="text-slate-800 hover:text-[#641D06] font-bold transition-colors duration-200 uppercase text-[12.5px] xl:text-[14px] 2xl:text-[15px] flex items-center gap-0.5 whitespace-nowrap py-2"
                onClick={(e) => e.preventDefault()}
              >
                Tiện ích <span className="material-symbols-outlined text-sm">expand_more</span>
              </a>
              <div className="absolute top-full left-0 mt-1 w-60 bg-white rounded-2xl shadow-xl border border-slate-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 flex flex-col z-50 overflow-hidden">
                <Link
                  href="/court-fee-calculator"
                  className="px-4 py-3 text-slate-800 hover:bg-amber-50 hover:text-[#641D06] text-sm font-semibold border-b border-slate-100 flex items-center gap-2.5 group/item transition-colors"
                >
                  <span className="text-amber-800 font-bold text-base leading-none">•</span>
                  <span>Tính Án phí Tòa án</span>
                </Link>
                <Link
                  href="/salary-calculator"
                  className="px-4 py-3 text-slate-800 hover:bg-amber-50 hover:text-[#641D06] text-sm font-semibold border-b border-slate-100 flex items-center gap-2.5 group/item transition-colors"
                >
                  <span className="text-amber-800 font-bold text-base leading-none">•</span>
                  <span>Tính Lương Gross &amp; Net</span>
                </Link>
                <Link
                  href="/pit-calculator"
                  className="px-4 py-3 text-slate-800 hover:bg-amber-50 hover:text-[#641D06] text-sm font-semibold flex items-center gap-2.5 group/item transition-colors"
                >
                  <span className="text-amber-800 font-bold text-base leading-none">•</span>
                  <span>Tính Thuế TNCN</span>
                </Link>
              </div>
            </div>

            <Link
              href="/ai-chatbot"
              className={`${isActive("/ai-chatbot")} uppercase text-[12.5px] xl:text-[14px] 2xl:text-[15px] whitespace-nowrap`}
            >
              AI Chat
            </Link>
            <Link
              href="/appointment"
              className={`${isActive("/appointment")} uppercase text-[12.5px] xl:text-[14px] 2xl:text-[15px] whitespace-nowrap`}
            >
              Đặt lịch
            </Link>
          </div>

          <div className="flex items-center gap-2 lg:gap-3 ml-2 lg:ml-3 xl:ml-6 shrink-0 pr-1 sm:pr-2">
            <a
              href="tel:0937863263"
              className="hidden sm:flex items-center gap-2 text-white bg-[#22c55e] hover:bg-[#16a34a] px-3.5 lg:px-4 py-1.5 lg:py-2 rounded-full border border-emerald-600/30 transition-all shrink-0 font-bold text-xs lg:text-[13px] xl:text-sm shadow-sm whitespace-nowrap active:scale-95 group"
            >
              <span className="w-5 h-5 lg:w-5.5 lg:h-5.5 rounded-full bg-white text-[#16a34a] flex items-center justify-center shrink-0 shadow-xs group-hover:scale-110 transition-transform overflow-hidden">
                <span className="material-symbols-outlined leading-none" style={{ fontSize: '12px', lineHeight: 1 }}>call</span>
              </span>
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
              Lĩnh vực
            </Link>
            <Link 
              href="/news" 
              onClick={() => setIsMobileMenuOpen(false)}
              className={isMobileActive("/news")}
            >
              Tin tức
            </Link>
            <Link 
              href="/ai-form-library" 
              onClick={() => setIsMobileMenuOpen(false)}
              className={isMobileActive("/ai-form-library")}
            >
              Biểu mẫu
            </Link>
            <Link 
              href="/ai-chatbot" 
              onClick={() => setIsMobileMenuOpen(false)}
              className={isMobileActive("/ai-chatbot")}
            >
              AI Chat
            </Link>

            <div className="text-[11px] font-black uppercase tracking-wider text-slate-400 mt-2 pt-2 border-t border-slate-100 px-4">
              Tiện ích tra cứu
            </div>
            <Link 
              href="/court-fee-calculator" 
              onClick={() => setIsMobileMenuOpen(false)}
              className={isSubItemActive("/court-fee-calculator")}
            >
              <span className="text-amber-800 font-bold">•</span>
              <span>Tính Án phí Tòa án</span>
            </Link>
            <Link 
              href="/salary-calculator" 
              onClick={() => setIsMobileMenuOpen(false)}
              className={isSubItemActive("/salary-calculator")}
            >
              <span className="text-amber-800 font-bold">•</span>
              <span>Tính Lương Gross &amp; Net</span>
            </Link>
            <Link 
              href="/pit-calculator" 
              onClick={() => setIsMobileMenuOpen(false)}
              className={isSubItemActive("/pit-calculator")}
            >
              <span className="text-amber-800 font-bold">•</span>
              <span>Tính Thuế TNCN</span>
            </Link>

            <div className="pt-3 mt-2 border-t border-slate-100 flex flex-col gap-2.5">
              <Link 
                href="/appointment" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full bg-[#641D06] hover:bg-black text-white text-center py-3 rounded-xl uppercase text-[14px] font-bold shadow-md flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-lg">calendar_month</span> Đặt Lịch Hẹn
              </Link>
              <a 
                href="tel:0937863263" 
                className="w-full bg-[#22c55e] hover:bg-[#16a34a] text-white text-center py-3 rounded-xl uppercase text-[14px] font-bold shadow-md flex items-center justify-center gap-2"
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
