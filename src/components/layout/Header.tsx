"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path ? "font-bold border-b-2 border-primary pb-1 text-primary" : "text-surface-alt hover:text-accent transition-colors duration-200";
  };

  return (
    <>
      <nav className="bg-primary fixed top-0 w-full z-50">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop flex justify-between items-center h-20">
          <Link href="/">
            <img
              src="/img/Logo_website.png"
              alt="Logo"
              className="h-8 md:h-10 w-[195px] md:w-[244px] object-contain"
            />
          </Link>
          {/* Desktop Nav */}
          <div className="hidden md:flex gap-gutter items-center font-label-sm text-label-sm">
            <Link
              href="/"
              className={`${isActive("/")} uppercase font-semibold text-[15px]`}
            >
              Trang chủ
            </Link>
            <Link
              href="/services"
              className={`${isActive("/services")} uppercase font-semibold text-[15px]`}
            >
              Lĩnh vực
            </Link>
            <div className="relative group">
              <a
                href="#"
                className="text-surface-alt hover:text-accent transition-colors duration-200 uppercase font-semibold text-[15px] flex items-center gap-1"
                onClick={(e) => e.preventDefault()}
              >
                Biểu mẫu AI <span className="material-symbols-outlined text-sm">expand_more</span>
              </a>
              <div className="absolute top-full left-0 mt-2 w-64 bg-primary rounded shadow-lg border border-border-neutral opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 flex flex-col z-50 overflow-hidden">
                <Link
                  href="/ai-form-library"
                  className="px-4 py-3 text-on-primary hover:bg-secondary hover:text-accent font-label-sm text-label-sm border-b border-border-neutral"
                >
                  Thư viện biểu mẫu
                </Link>
                <Link
                  href="/ai-form-checker"
                  className="px-4 py-3 text-on-primary hover:bg-secondary hover:text-accent font-label-sm text-label-sm"
                >
                  AI Thẩm định
                </Link>
              </div>
            </div>
            <div className="relative group">
              <a
                href="#"
                className="text-surface-alt hover:text-accent transition-colors duration-200 uppercase font-semibold text-[15px] flex items-center gap-1"
                onClick={(e) => e.preventDefault()}
              >
                Tính năng <span className="material-symbols-outlined text-sm">expand_more</span>
              </a>
              <div className="absolute top-full left-0 mt-2 w-64 bg-primary rounded shadow-lg border border-border-neutral opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 flex flex-col z-50 overflow-hidden">
                <Link
                  href="/court-fee-calculator"
                  className="px-4 py-3 text-on-primary hover:bg-secondary hover:text-accent font-label-sm text-label-sm border-b border-border-neutral"
                >
                  Tính án phí
                </Link>
                <Link
                  href="/salary-calculator"
                  className="px-4 py-3 text-on-primary hover:bg-secondary hover:text-accent font-label-sm text-label-sm border-b border-border-neutral"
                >
                  Tính lương Gross-to-Net
                </Link>
                <Link
                  href="/pit-calculator"
                  className="px-4 py-3 text-on-primary hover:bg-secondary hover:text-accent font-label-sm text-label-sm"
                >
                  Tính thuế TNCN
                </Link>
              </div>
            </div>
            <Link
              href="/ai-chatbot"
              className={`${isActive("/ai-chatbot")} uppercase font-semibold text-[15px]`}
            >
              AI Chat
            </Link>
            <Link
              href="/appointment"
              className={`${isActive("/appointment")} uppercase font-semibold text-[15px]`}
            >
              Đặt lịch
            </Link>
          </div>
          <div className="flex items-center gap-stack-md">
            <span className="font-label-sm text-label-sm hidden md:block text-on-primary">
              Hotline: 09xx.xxx.xxx
            </span>
            {/* Mobile Menu Button */}
            <button
              className="md:hidden material-symbols-outlined cursor-pointer text-on-primary"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? "close" : "menu"}
            </button>
          </div>
        </div>
        {/* Mobile Menu */}
        <div
          className={`${isMobileMenuOpen ? "block" : "hidden"} md:hidden bg-primary border-t border-border-neutral px-margin-mobile py-4`}
        >
          <div className="flex flex-col gap-4">
            <Link href="/" className="text-accent uppercase font-semibold text-[15px]">
              Trang chủ
            </Link>
            <Link
              href="/services"
              className="font-label-sm text-label-sm text-surface-alt hover:text-accent uppercase font-semibold text-[15px]"
            >
              Lĩnh vực
            </Link>
            <div className="font-label-sm text-label-sm text-on-primary font-bold opacity-50 uppercase mt-2">
              Biểu mẫu AI
            </div>
            <Link
              href="/ai-form-library"
              className="font-label-sm text-label-sm text-surface-alt hover:text-accent uppercase font-semibold text-[15px] pl-4"
            >
              Thư viện biểu mẫu
            </Link>
            <Link
              href="/ai-form-checker"
              className="font-label-sm text-label-sm text-surface-alt hover:text-accent uppercase font-semibold text-[15px] pl-4"
            >
              AI Thẩm định
            </Link>
            <div className="font-label-sm text-label-sm text-on-primary font-bold opacity-50 uppercase mt-2">
              Tính năng
            </div>
            <Link
              href="/court-fee-calculator"
              className="font-label-sm text-label-sm text-surface-alt hover:text-accent uppercase font-semibold text-[15px] pl-4"
            >
              Tính án phí
            </Link>
            <Link
              href="/salary-calculator"
              className="font-label-sm text-label-sm text-surface-alt hover:text-accent uppercase font-semibold text-[15px] pl-4"
            >
              Tính lương Gross-to-Net
            </Link>
            <Link
              href="/pit-calculator"
              className="font-label-sm text-label-sm text-surface-alt hover:text-accent uppercase font-semibold text-[15px] pl-4"
            >
              Tính thuế TNCN
            </Link>
            <Link
              href="/ai-chatbot"
              className="font-label-sm text-label-sm text-surface-alt hover:text-accent uppercase font-semibold text-[15px]"
            >
              AI Chat
            </Link>
            <Link
              href="/appointment"
              className="font-label-sm text-label-sm text-surface-alt hover:text-accent uppercase font-semibold text-[15px]"
            >
              Đặt lịch
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}
