"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const navItems = [
    {
      label: "Tổng quan Dashboard",
      href: "/admin",
      icon: "dashboard",
      badge: "KPIs",
    },
    {
      label: "Quản lý Bài viết & Sơ đồ",
      href: "/admin/news",
      icon: "article",
      badge: "CMS",
    },
    {
      label: "Quản lý Biểu mẫu",
      href: "/admin/forms",
      icon: "folder_open",
      badge: "CMS",
    },
    {
      label: "Quản lý Lịch hẹn tư vấn",
      href: "/admin/appointments",
      icon: "calendar_month",
      badge: "Admin",
    },
    {
      label: "Lịch sử Chat AI",
      href: "/admin/chat-logs",
      icon: "forum",
      badge: "AI Dataset",
    },
    {
      label: "Cài đặt Hệ thống",
      href: "/admin/settings",
      icon: "settings",
      badge: "Hệ thống",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-800">
      {/* Top Admin Navigation Bar */}
      <header className="h-16 bg-[#641D06] text-white border-b border-amber-900/40 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-50 shadow-md">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-1.5 rounded-lg hover:bg-white/10 text-white transition-colors cursor-pointer"
            title="Đóng/Mở Sidebar"
          >
            <span className="material-symbols-outlined text-2xl">menu</span>
          </button>
          
          <Link href="/admin" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-400 text-[#641D06] flex items-center justify-center font-black text-base shadow-sm">
              ĐT
            </div>
            <div>
              <span className="font-black tracking-wider text-sm uppercase">ĐỨC TÍN &amp; PARTNERS</span>
              <span className="block text-[10px] text-amber-200 uppercase font-semibold">Trung Tâm Quản Trị Admin &amp; CMS</span>
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            target="_blank"
            className="hidden sm:flex items-center gap-1 text-xs font-bold text-amber-100 hover:text-white bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-xl transition-colors border border-white/15"
          >
            <span className="material-symbols-outlined text-sm">open_in_new</span>
            <span>Xem Trang Web</span>
          </Link>

          {/* Lawyer Admin Profile Badge */}
          <div className="flex items-center gap-2 pl-3 border-l border-amber-800">
            <div className="w-8 h-8 rounded-full overflow-hidden border border-amber-300 bg-amber-100 shrink-0">
              <img src="/img/avatar1.png" alt="Ls. Phan Đức Tín" className="w-full h-full object-cover" />
            </div>
            <div className="hidden md:block text-left">
              <div className="text-xs font-bold text-white">Ls. Phan Đức Tín</div>
              <div className="text-[10px] text-amber-300 font-semibold">Giám đốc - Quản trị viên</div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Admin Workspace with Sidebar */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar */}
        <aside
          className={`${
            isSidebarOpen ? "w-64" : "w-20"
          } bg-white border-r border-slate-200 transition-all duration-200 flex flex-col justify-between shrink-0 shadow-xs`}
        >
          <div className="p-3 space-y-1.5">
            <div className="px-3 py-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              {isSidebarOpen ? "Danh mục quản trị" : "Menu"}
            </div>

            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? "bg-[#641D06] text-white shadow-xs"
                      : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                  title={item.label}
                >
                  <span className="material-symbols-outlined text-xl shrink-0">{item.icon}</span>
                  {isSidebarOpen && (
                    <div className="flex-1 flex items-center justify-between min-w-0">
                      <span className="truncate">{item.label}</span>
                      <span
                        className={`text-[9px] px-1.5 py-0.5 rounded-md font-bold ${
                          isActive
                            ? "bg-white/20 text-white"
                            : item.badge === "CMS"
                            ? "bg-blue-100 text-blue-700"
                            : item.badge === "Admin"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-slate-200 text-slate-600"
                        }`}
                      >
                        {item.badge}
                      </span>
                    </div>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Sidebar Bottom Shortcuts */}
          <div className="p-3 border-t border-slate-100">
            <Link
              href="/admin/news/new"
              className={`w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-2 rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-xs ${
                !isSidebarOpen && "px-0"
              }`}
            >
              <span className="material-symbols-outlined text-lg">add_circle</span>
              {isSidebarOpen && <span>Viết bài mới</span>}
            </Link>
          </div>
        </aside>

        {/* Content Viewport */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
