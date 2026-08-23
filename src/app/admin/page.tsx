"use client";

import React from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { newsService } from "@/services/news.service";
import { appointmentService } from "@/services/appointment.service";
import { formService } from "@/services/form.service";

export default function AdminDashboardPage() {
  const { data: newsList = [] } = useQuery({
    queryKey: ["admin-news"],
    queryFn: () => newsService.getNewsList(),
  });

  const { data: appointments = [] } = useQuery({
    queryKey: ["admin-appointments"],
    queryFn: () => appointmentService.getAppointments(),
  });

  const { data: forms = [] } = useQuery({
    queryKey: ["admin-forms"],
    queryFn: () => formService.getForms("", 100),
  });

  const stats = [
    {
      title: "Bài viết & Cẩm nang",
      value: newsList.length,
      change: `${newsList.length} bài đã xuất bản`,
      icon: "article",
      color: "bg-blue-50 text-blue-700 border-blue-200",
      link: "/admin/news",
    },
    {
      title: "Lịch hẹn tư vấn",
      value: appointments.length,
      change: `${appointments.filter((a: any) => a.status === "pending").length} lịch chờ liên hệ`,
      icon: "calendar_month",
      color: "bg-amber-50 text-amber-800 border-amber-200",
      link: "/admin/appointments",
    },
    {
      title: "Thư viện Biểu mẫu",
      value: forms.length,
      change: `${forms.length} biểu mẫu chuẩn hóa`,
      icon: "folder_open",
      color: "bg-emerald-50 text-emerald-700 border-emerald-200",
      link: "/admin/forms",
    },
    {
      title: "Trợ lý AI Pháp Lý",
      value: "Hoạt động",
      change: "Sẵn sàng hỗ trợ 24/7",
      icon: "smart_toy",
      color: "bg-purple-50 text-purple-700 border-purple-200",
      link: "/ai-chatbot",
    },
  ];

  return (
    <div className="space-y-8 max-w-[1600px] mx-auto">
      {/* Welcome Banner (Hand icon removed) */}
      <div className="bg-gradient-to-r from-[#641D06] to-[#8a2a09] text-white p-6 sm:p-8 rounded-3xl shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full text-xs font-bold text-amber-200 mb-3 border border-white/10">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Dữ liệu hệ thống kết nối trực tiếp cơ sở dữ liệu
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            Xin chào, Luật sư Phan Đức Tín!
          </h1>
          <p className="text-sm text-amber-100/90 mt-1 max-w-xl">
            Trung tâm quản trị toàn diện: Đăng bài viết pháp lý thật, xuất bản sơ đồ Mindmap / Flowchart có xem trước trực tiếp, và quản lý lịch hẹn khách hàng.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/admin/news/new"
            className="bg-amber-400 hover:bg-amber-300 text-[#641D06] font-bold text-xs px-4 py-3 rounded-2xl flex items-center gap-2 transition-all shadow-sm"
          >
            <span className="material-symbols-outlined text-lg">edit_document</span>
            Viết Bài Mới
          </Link>
          <Link
            href="/admin/appointments"
            className="bg-white/10 hover:bg-white/20 text-white font-bold text-xs px-4 py-3 rounded-2xl flex items-center gap-2 transition-all border border-white/20"
          >
            <span className="material-symbols-outlined text-lg">calendar_today</span>
            Xem Lịch Hẹn ({appointments.length})
          </Link>
        </div>
      </div>

      {/* 4 KPI Metrics Cards with Real DB Counts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat, idx) => (
          <Link
            key={idx}
            href={stat.link}
            className="bg-white p-5 rounded-3xl border border-slate-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                {stat.title}
              </span>
              <span
                className={`w-10 h-10 rounded-2xl flex items-center justify-center border ${stat.color} group-hover:scale-110 transition-transform`}
              >
                <span className="material-symbols-outlined text-xl">{stat.icon}</span>
              </span>
            </div>

            <div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {stat.value}
              </div>
              <p className="text-[11px] font-semibold text-slate-400 mt-1 flex items-center gap-1">
                <span className="text-emerald-600 font-bold">●</span> {stat.change}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* 2-Column Split: Real Appointments & Real News */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left (7 cols): Real Appointments from DB */}
        <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-amber-700">event_note</span>
              <h3 className="font-bold text-slate-900 text-base">
                Lịch Hẹn Khách Hàng Gần Đây ({appointments.length})
              </h3>
            </div>
            <Link
              href="/admin/appointments"
              className="text-xs font-bold text-[#641D06] hover:underline flex items-center gap-1"
            >
              Xem tất cả <span className="material-symbols-outlined text-xs">arrow_forward</span>
            </Link>
          </div>

          <div className="divide-y divide-slate-100">
            {appointments.length === 0 ? (
              <p className="py-8 text-center text-xs text-slate-400">Chưa có lịch hẹn nào trong cơ sở dữ liệu.</p>
            ) : (
              appointments.slice(0, 5).map((apt: any) => (
                <div key={apt.id} className="py-3.5 flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-sm text-slate-900 truncate">{apt.name}</h4>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                          apt.status === "pending"
                            ? "bg-amber-100 text-amber-800 border-amber-300"
                            : apt.status === "confirmed"
                            ? "bg-blue-100 text-blue-800 border-blue-300"
                            : "bg-emerald-100 text-emerald-800 border-emerald-300"
                        }`}
                      >
                        {apt.status === "pending" ? "Chờ liên hệ" : apt.status === "confirmed" ? "Đã xác nhận" : apt.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5 truncate">
                      {apt.notes || "Yêu cầu tư vấn trực tiếp"}
                    </p>
                    <p className="text-[11px] text-slate-400 font-medium mt-0.5">
                      📞 {apt.phone} • ⏰ {apt.appointmentDate} ({apt.appointmentTime})
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <a
                      href={`tel:${apt.phone.replace(/\s/g, "")}`}
                      className="p-2 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors"
                      title="Gọi ngay"
                    >
                      <span className="material-symbols-outlined text-base">call</span>
                    </a>
                    <Link
                      href="/admin/appointments"
                      className="text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-xl transition-colors"
                    >
                      Chi tiết
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right (5 cols): Real Articles List */}
        <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-blue-700">newspaper</span>
              <h3 className="font-bold text-slate-900 text-base">
                Bài Viết &amp; Cẩm Nang ({newsList.length})
              </h3>
            </div>
            <Link
              href="/admin/news"
              className="text-xs font-bold text-[#641D06] hover:underline flex items-center gap-1"
            >
              Quản lý <span className="material-symbols-outlined text-xs">arrow_forward</span>
            </Link>
          </div>

          <div className="space-y-3">
            {newsList.length === 0 ? (
              <p className="text-xs text-slate-400 py-6 text-center">Chưa có bài viết nào.</p>
            ) : (
              newsList.slice(0, 5).map((art: any) => (
                <div
                  key={art.id}
                  className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3 hover:bg-slate-100/80 transition-colors"
                >
                  <div className="min-w-0">
                    <span className="text-[10px] font-bold text-amber-800 uppercase">
                      {art.category || "Pháp Luật"}
                    </span>
                    <h4 className="font-bold text-xs text-slate-900 line-clamp-1 mt-0.5">
                      {art.title}
                    </h4>
                    <p className="text-[10px] text-slate-400 mt-0.5">
                      {art.mindmap ? "🧠 Sơ đồ Mindmap" : art.flowchart ? "📊 Sơ đồ Flowchart" : "Văn bản tiêu chuẩn"}
                    </p>
                  </div>

                  <Link
                    href={`/admin/news/${art.id}`}
                    className="p-2 rounded-xl bg-white border border-slate-200 hover:border-slate-300 text-slate-700 hover:text-[#641D06] transition-colors shrink-0"
                    title="Chỉnh sửa bài viết"
                  >
                    <span className="material-symbols-outlined text-base">edit</span>
                  </Link>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
