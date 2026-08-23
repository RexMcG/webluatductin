"use client";

import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { appointmentService, Appointment } from "@/services/appointment.service";

export default function AdminAppointmentsPage() {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const { data: appointments = [], isLoading } = useQuery({
    queryKey: ["admin-appointments"],
    queryFn: () => appointmentService.getAppointments(),
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: number; status: string }) =>
      appointmentService.updateStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-appointments"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => appointmentService.deleteAppointment(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-appointments"] });
    },
  });

  const handleStatusChange = (id: number, newStatus: string) => {
    updateStatusMutation.mutate({ id, status: newStatus });
  };

  const handleDelete = (id: number, name: string) => {
    if (confirm(`Bạn có chắc chắn muốn xóa lịch hẹn của khách hàng "${name}" không?`)) {
      deleteMutation.mutate(id);
    }
  };

  const filtered = appointments.filter((apt) => {
    const matchSearch =
      apt.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.phone.includes(searchTerm) ||
      (apt.notes && apt.notes.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchStatus = statusFilter === "all" || apt.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return { label: "Chờ liên hệ", bg: "bg-amber-100 text-amber-800 border-amber-300" };
      case "confirmed":
        return { label: "Đã xác nhận", bg: "bg-blue-100 text-blue-800 border-blue-300" };
      case "completed":
        return { label: "Đã tư vấn xong", bg: "bg-emerald-100 text-emerald-800 border-emerald-300" };
      case "cancelled":
        return { label: "Đã hủy", bg: "bg-slate-100 text-slate-600 border-slate-300" };
      default:
        return { label: status, bg: "bg-slate-100 text-slate-700 border-slate-200" };
    }
  };

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-amber-50 text-amber-800">
              <span className="material-symbols-outlined text-xl">calendar_month</span>
            </span>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900">
              Quản Lý Lịch Hẹn Tư Vấn Khách Hàng
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Dữ liệu thật 100% từ Database: Danh sách khách hàng đặt lịch với Luật sư Phan Đức Tín
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-500">Thông báo gửi về:</span>
          <span className="text-xs font-mono font-bold text-amber-900 bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-200">
            rexmcg12345678@gmail.com
          </span>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-96">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm theo tên khách hàng, số điện thoại..."
            className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#641D06] focus:bg-white text-slate-800"
          />
          <span className="material-symbols-outlined absolute left-3 top-2.5 text-sm text-slate-400">
            search
          </span>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <span className="text-xs font-semibold text-slate-500 shrink-0">Trạng thái:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:border-[#641D06] text-slate-800 font-medium"
          >
            <option value="all">Tất cả trạng thái ({appointments.length})</option>
            <option value="pending">Chờ liên hệ</option>
            <option value="confirmed">Đã xác nhận</option>
            <option value="completed">Đã tư vấn xong</option>
            <option value="cancelled">Đã hủy</option>
          </select>
        </div>
      </div>

      {/* Appointments List */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="py-20 text-center text-slate-400 text-xs">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#641D06] mx-auto mb-2"></div>
            Đang tải dữ liệu lịch hẹn thật từ Database...
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-20 text-center text-slate-400 text-xs">
            Không có lịch hẹn nào trong cơ sở dữ liệu.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200 uppercase tracking-wider text-[10px]">
                  <th className="py-3.5 px-4 w-12 text-center">STT</th>
                  <th className="py-3.5 px-4 w-52">Khách hàng &amp; Liên hệ</th>
                  <th className="py-3.5 px-4">Ghi chú vụ việc / Lĩnh vực</th>
                  <th className="py-3.5 px-4 w-44">Thời gian hẹn</th>
                  <th className="py-3.5 px-4 w-40">Trạng thái</th>
                  <th className="py-3.5 px-4 w-32 text-center">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {filtered.map((apt, idx) => {
                  const badge = getStatusBadge(apt.status);
                  return (
                    <tr key={apt.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-4 px-4 text-center font-bold text-slate-400">
                        {idx + 1}
                      </td>
                      <td className="py-4 px-4">
                        <div className="font-bold text-slate-900 text-sm">{apt.name}</div>
                        <div className="text-[11px] text-amber-950 font-bold mt-1 flex items-center gap-1.5">
                          <span className="w-5 h-5 rounded-md bg-amber-100 text-amber-900 flex items-center justify-center shrink-0">
                            <span className="material-symbols-outlined text-xs">phone_iphone</span>
                          </span>
                          <span>{apt.phone}</span>
                        </div>
                        {apt.email && (
                          <div className="text-[10.5px] text-slate-500 mt-1 flex items-center gap-1.5 truncate">
                            <span className="w-5 h-5 rounded-md bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
                              <span className="material-symbols-outlined text-xs">alternate_email</span>
                            </span>
                            <span className="truncate">{apt.email}</span>
                          </div>
                        )}
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-[11px] text-slate-600 leading-relaxed bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                          {apt.notes || "Khách hàng đăng ký tư vấn trực tiếp với Ls. Phan Đức Tín."}
                        </div>
                      </td>
                      <td className="py-4 px-4 font-semibold text-slate-700">
                        <div className="flex items-center gap-1.5 text-xs text-slate-800">
                          <span className="w-5 h-5 rounded-md bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
                            <span className="material-symbols-outlined text-xs">event</span>
                          </span>
                          <span>{apt.appointmentDate}</span>
                        </div>
                        <div className="text-[11px] text-slate-500 mt-1 flex items-center gap-1.5">
                          <span className="w-5 h-5 rounded-md bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
                            <span className="material-symbols-outlined text-xs">schedule</span>
                          </span>
                          <span>{apt.appointmentTime}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <select
                          value={apt.status}
                          onChange={(e) => handleStatusChange(apt.id, e.target.value)}
                          className={`text-[11px] font-bold px-2.5 py-1.5 rounded-xl border cursor-pointer focus:outline-none ${badge.bg}`}
                        >
                          <option value="pending">Chờ liên hệ</option>
                          <option value="confirmed">Đã xác nhận</option>
                          <option value="completed">Đã tư vấn xong</option>
                          <option value="cancelled">Đã hủy</option>
                        </select>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <a
                            href={`tel:${apt.phone.replace(/\s/g, "")}`}
                            className="inline-flex items-center gap-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold px-2.5 py-1.5 rounded-xl border border-emerald-200 transition-colors"
                          >
                            <span className="material-symbols-outlined text-sm">call</span>
                            <span>Gọi</span>
                          </a>
                          <button
                            type="button"
                            onClick={() => handleDelete(apt.id, apt.name)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                            title="Xóa lịch hẹn"
                          >
                            <span className="material-symbols-outlined text-base">delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
