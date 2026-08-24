"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path
      ? "font-black text-[#641D06] border-b-2 border-[#641D06] pb-1"
      : "text-slate-800 hover:text-[#641D06] font-bold transition-colors duration-200";
  };

  return (
    <>
      <nav className="bg-white fixed top-0 w-full z-50 shadow-xs border-b-[7px] border-[#641D06]">
        <div className="w-full max-w-[1728px] mx-auto px-6 md:px-12 lg:px-16 flex justify-between items-center h-20">
          <Link href="/" className="shrink-0 mr-8 lg:mr-16">
            <img
              src="/img/Logo_website.webp"
              alt="Logo Công ty Luật Đức Tín"
              width={244}
              height={40}
              fetchPriority="high"
              className="h-8 md:h-10 w-[195px] md:w-[244px] object-contain"
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8 xl:gap-10">
            <Link
              href="/"
              className={`${isActive("/")} uppercase text-[14px] lg:text-[15px] whitespace-nowrap`}
            >
              Trang chủ
            </Link>
            <Link
              href="/services"
              className={`${isActive("/services")} uppercase text-[14px] lg:text-[15px] whitespace-nowrap`}
            >
              Lĩnh vực
            </Link>
            <Link
              href="/news"
              className={`${isActive("/news")} uppercase text-[14px] lg:text-[15px] whitespace-nowrap`}
            >
              Tin tức
            </Link>

            {/* Direct Link: Biểu mẫu AI */}
            <Link
              href="/ai-form-library"
              className={`${isActive("/ai-form-library")} uppercase text-[14px] lg:text-[15px] whitespace-nowrap`}
            >
              Biểu mẫu AI
            </Link>

            {/* Dropdown: Tính năng */}
            <div className="relative group">
              <a
                href="#"
                className="text-slate-800 hover:text-[#641D06] font-bold transition-colors duration-200 uppercase text-[14px] lg:text-[15px] flex items-center gap-1 whitespace-nowrap py-2"
                onClick={(e) => e.preventDefault()}
              >
                Tính năng <span className="material-symbols-outlined text-sm">expand_more</span>
              </a>
              <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-2xl shadow-xl border border-slate-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 flex flex-col z-50 overflow-hidden">
                <Link
                  href="/court-fee-calculator"
                  className="px-4 py-3 text-slate-800 hover:bg-amber-50 hover:text-[#641D06] text-sm font-semibold border-b border-slate-100 flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-base text-amber-800">calculate</span>
                  Tính án phí tòa án
                </Link>
                <Link
                  href="/salary-calculator"
                  className="px-4 py-3 text-slate-800 hover:bg-amber-50 hover:text-[#641D06] text-sm font-semibold border-b border-slate-100 flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-base text-amber-800">payments</span>
                  Tính lương Gross-to-Net
                </Link>
                <Link
                  href="/pit-calculator"
                  className="px-4 py-3 text-slate-800 hover:bg-amber-50 hover:text-[#641D06] text-sm font-semibold flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-base text-amber-800">account_balance</span>
                  Tính thuế TNCN
                </Link>
              </div>
            </div>

            <Link
              href="/ai-chatbot"
              className={`${isActive("/ai-chatbot")} uppercase text-[14px] lg:text-[15px] whitespace-nowrap`}
            >
              AI Chat
            </Link>
            <Link
              href="/appointment"
              className={`${isActive("/appointment")} uppercase text-[14px] lg:text-[15px] whitespace-nowrap`}
            >
              Đặt lịch
            </Link>
          </div>

          <div className="flex items-center gap-3 ml-8 lg:ml-16 shrink-0">
            <a
              href="tel:0937863263"
              className="hidden md:flex items-center gap-2 text-[#641D06] bg-amber-50 hover:bg-amber-100 px-4 py-2 rounded-full border border-amber-300 transition-colors shrink-0 font-bold text-sm shadow-2xs"
            >
              <span className="material-symbols-outlined text-base text-[#641D06]">call</span>
              <span className="whitespace-nowrap">Hotline: 093 786 32 63</span>
            </a>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden material-symbols-outlined cursor-pointer text-slate-900 p-2 rounded-lg hover:bg-slate-100 transition-colors"
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
          className={`${isMobileMenuOpen ? "block" : "hidden"} md:hidden bg-white border-t border-slate-200 px-6 py-5 shadow-2xl transition-all max-h-[calc(100vh-5rem)] overflow-y-auto`}
        >
          <div className="flex flex-col gap-3.5 font-bold text-slate-800">
            <Link 
              href="/" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-[#641D06] hover:bg-amber-50 px-3 py-2 rounded-xl uppercase text-[15px] flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-xl">home</span> Trang chủ
            </Link>
            <Link 
              href="/services" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="hover:text-[#641D06] hover:bg-amber-50 px-3 py-2 rounded-xl uppercase text-[15px] flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-xl">gavel</span> Lĩnh vực pháp lý
            </Link>
            <Link 
              href="/news" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="hover:text-[#641D06] hover:bg-amber-50 px-3 py-2 rounded-xl uppercase text-[15px] flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-xl">newspaper</span> Tin tức &amp; Án lệ
            </Link>
            <Link 
              href="/ai-form-library" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="hover:text-[#641D06] hover:bg-amber-50 px-3 py-2 rounded-xl uppercase text-[15px] flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-xl">description</span> Biểu mẫu AI
            </Link>

            <div className="text-xs font-black uppercase tracking-wider text-slate-400 mt-1 px-3">
              Công cụ tính toán
            </div>
            <Link 
              href="/court-fee-calculator" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="hover:text-[#641D06] hover:bg-amber-50 text-sm px-4 py-1.5 rounded-lg flex items-center gap-2 font-medium"
            >
              <span className="material-symbols-outlined text-base text-amber-800">calculate</span> Tính án phí
            </Link>
            <Link 
              href="/salary-calculator" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="hover:text-[#641D06] hover:bg-amber-50 text-sm px-4 py-1.5 rounded-lg flex items-center gap-2 font-medium"
            >
              <span className="material-symbols-outlined text-base text-amber-800">payments</span> Tính lương Gross-to-Net
            </Link>
            <Link 
              href="/pit-calculator" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="hover:text-[#641D06] hover:bg-amber-50 text-sm px-4 py-1.5 rounded-lg flex items-center gap-2 font-medium"
            >
              <span className="material-symbols-outlined text-base text-amber-800">account_balance</span> Tính thuế TNCN
            </Link>

            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
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
