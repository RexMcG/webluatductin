"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Check authentication in sessionStorage/localStorage
    const authStatus =
      sessionStorage.getItem("ductin_admin_auth") === "true" ||
      localStorage.getItem("ductin_admin_auth") === "true";
    setIsAuthenticated(authStatus);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg("");

    const trimmedUser = username.trim().toLowerCase();
    const trimmedPass = password.trim();

    if (trimmedUser === "admin" && trimmedPass === "1234") {
      sessionStorage.setItem("ductin_admin_auth", "true");
      localStorage.setItem("ductin_admin_auth", "true");
      setIsAuthenticated(true);
      setErrorMsg("");
    } else {
      setErrorMsg("Tên đăng nhập hoặc mật khẩu không chính xác. Vui lòng kiểm tra lại!");
    }
    setIsSubmitting(false);
  };

  const handleLogout = () => {
    if (confirm("Bạn có chắc chắn muốn đăng xuất khỏi trang quản trị?")) {
      sessionStorage.removeItem("ductin_admin_auth");
      localStorage.removeItem("ductin_admin_auth");
      setIsAuthenticated(false);
      setUsername("");
      setPassword("");
    }
  };

  // Loading state while checking auth
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-amber-400 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-amber-200 text-xs font-bold uppercase tracking-widest">
            Đang xác thực hệ thống...
          </span>
        </div>
      </div>
    );
  }

  // Login Screen if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-[#3d1204] to-slate-950 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-amber-900/30 animate-fadeIn">
          {/* Header */}
          <div className="bg-[#641D06] p-8 text-center text-white relative">
            <div className="w-16 h-16 rounded-2xl bg-amber-400 text-[#641D06] flex items-center justify-center font-black text-2xl mx-auto mb-3 shadow-lg border-2 border-amber-200">
              ĐT
            </div>
            <h2 className="text-lg sm:text-xl font-black uppercase tracking-wider text-amber-100">
              ĐỨC TÍN &amp; PARTNERS
            </h2>
            <p className="text-xs text-amber-200/90 mt-1 font-medium">
              Cổng Quản Trị Hệ Thống &amp; CMS Pháp Lý
            </p>
            <div className="absolute top-4 right-4">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block animate-ping"></span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="p-6 sm:p-8 space-y-5">
            <div className="text-center pb-2">
              <h3 className="text-base font-bold text-slate-800">Đăng Nhập Quản Trị Viên</h3>
              <p className="text-xs text-slate-500 mt-0.5">Nhập tài khoản để tiếp tục vào bảng điều khiển</p>
            </div>

            {errorMsg && (
              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 flex items-center gap-2.5 text-xs text-rose-800 font-semibold animate-shake">
                <span className="material-symbols-outlined text-base text-rose-600 shrink-0">
                  error
                </span>
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Username Input */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Tên đăng nhập
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3.5 top-3 text-slate-400 text-lg">
                  person
                </span>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Nhập tên đăng nhập (admin)"
                  autoFocus
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-[#641D06] focus:ring-2 focus:ring-[#641D06]/10 text-sm font-medium text-slate-900 bg-slate-50 focus:bg-white transition-all"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Mật khẩu
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3.5 top-3 text-slate-400 text-lg">
                  lock
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Nhập mật khẩu (1234)"
                  className="w-full pl-10 pr-11 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-[#641D06] focus:ring-2 focus:ring-[#641D06]/10 text-sm font-medium text-slate-900 bg-slate-50 focus:bg-white transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-base">
                    {showPassword ? "visibility_off" : "visibility"}
                  </span>
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-[#641D06] hover:bg-black text-white font-bold text-sm rounded-xl transition-all shadow-md active:scale-98 flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              <span className="material-symbols-outlined text-base">login</span>
              <span>Đăng Nhập Quản Trị</span>
            </button>

            {/* Back link */}
            <div className="pt-2 text-center border-t border-slate-100">
              <Link
                href="/"
                className="text-xs text-slate-500 hover:text-[#641D06] font-semibold transition-colors flex items-center justify-center gap-1"
              >
                <span className="material-symbols-outlined text-sm">arrow_back</span>
                <span>Quay lại trang chủ website</span>
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }

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
      label: "Khách Tải Biểu Mẫu",
      href: "/admin/form-leads",
      icon: "file_download",
      badge: "Leads",
    },
    {
      label: "Hộp thư Câu hỏi & Tư vấn",
      href: "/admin/questions",
      icon: "contact_support",
      badge: "Inbox",
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

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-1 text-xs font-bold text-rose-200 hover:text-white bg-rose-950/60 hover:bg-rose-700 px-3 py-1.5 rounded-xl transition-colors border border-rose-400/30 cursor-pointer ml-1"
            title="Đăng xuất"
          >
            <span className="material-symbols-outlined text-sm">logout</span>
            <span className="hidden sm:inline">Đăng xuất</span>
          </button>
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
