"use client";

import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { formLeadService, FormDownloadLead } from "@/services/form-lead.service";

export default function AdminFormLeadsPage() {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedLead, setSelectedLead] = useState<FormDownloadLead | null>(null);

  const { data: leads = [], isLoading } = useQuery({
    queryKey: ["admin-form-leads"],
    queryFn: () => formLeadService.getLeads(),
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: FormDownloadLead["status"] }) =>
      formLeadService.updateStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-form-leads"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => formLeadService.deleteLead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-form-leads"] });
      setSelectedLead(null);
    },
  });

  const filtered = leads.filter((item) => {
    const matchSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.phone.includes(searchTerm) ||
      item.formTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.formCategory && item.formCategory.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchStatus = statusFilter === "all" || item.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const getStatusBadge = (status: FormDownloadLead["status"]) => {
    switch (status) {
      case "new":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-pulse"></span>
            Mới tải
          </span>
        );
      case "contacted":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-50 text-blue-800 border border-blue-200">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
            Đã gọi điện
          </span>
        );
      case "completed":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
            Đã tư vấn xong
          </span>
        );
      case "cancelled":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-100 text-slate-600 border border-slate-200">
            Đã hủy
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-emerald-100 text-emerald-800">
              <span className="material-symbols-outlined text-2xl">file_download</span>
            </span>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900">
              Khách Hàng Tải Biểu Mẫu Pháp Lý
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Danh sách khách hàng đã để lại thông tin tải biểu mẫu Word (.doc) từ Thư viện biểu mẫu AI
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-xs font-bold text-slate-500">Tổng khách tải mẫu:</div>
            <div className="text-lg font-black text-emerald-700 font-mono">
              {leads.length} Khách hàng
            </div>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-96">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm theo tên khách, SĐT, tên biểu mẫu..."
            className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-600 focus:bg-white text-slate-800"
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
            className="px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-600 text-slate-700 font-medium"
          >
            <option value="all">Tất cả ({leads.length})</option>
            <option value="new">Mới tải ({leads.filter((l) => l.status === "new").length})</option>
            <option value="contacted">Đã gọi điện ({leads.filter((l) => l.status === "contacted").length})</option>
            <option value="completed">Đã tư vấn xong ({leads.filter((l) => l.status === "completed").length})</option>
            <option value="cancelled">Đã hủy ({leads.filter((l) => l.status === "cancelled").length})</option>
          </select>
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xs overflow-hidden">
        {isLoading ? (
          <div className="p-6 space-y-4 animate-pulse">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center justify-between gap-4 py-3.5 border-b border-slate-100">
                <div className="w-8 h-8 rounded-full bg-slate-200" />
                <div className="h-4 w-32 bg-slate-200 rounded" />
                <div className="h-4 w-28 bg-slate-200 rounded" />
                <div className="h-4 w-64 bg-slate-200 rounded flex-1" />
                <div className="h-4 w-24 bg-slate-200 rounded" />
                <div className="h-7 w-28 bg-amber-100 rounded-xl" />
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-20 text-center">
            <span className="material-symbols-outlined text-4xl text-slate-300 mb-2">inbox</span>
            <div className="text-slate-500 font-bold text-sm">Không có dữ liệu phù hợp</div>
            <div className="text-slate-400 text-xs mt-1">Chưa có khách hàng nào tải biểu mẫu theo bộ lọc hiện tại.</div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200 uppercase tracking-wider text-[10px]">
                  <th className="py-3.5 px-4 w-12 text-center">STT</th>
                  <th className="py-3.5 px-4 w-48">Khách hàng</th>
                  <th className="py-3.5 px-4 w-36">Số điện thoại</th>
                  <th className="py-3.5 px-4">Biểu mẫu đã tải</th>
                  <th className="py-3.5 px-4 w-36">Thời gian tải</th>
                  <th className="py-3.5 px-4 w-40">Trạng thái xử lý</th>
                  <th className="py-3.5 px-4 w-32 text-center">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {filtered.map((lead, idx) => (
                  <tr key={lead.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-4 text-center font-mono font-bold text-slate-400">
                      {idx + 1}
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-bold text-slate-900 text-xs">{lead.name}</div>
                    </td>
                    <td className="py-4 px-4">
                      <a
                        href={`tel:${lead.phone}`}
                        className="inline-flex items-center gap-1 font-mono font-bold text-emerald-700 hover:text-emerald-900 bg-emerald-50 px-2 py-1 rounded-lg border border-emerald-200"
                        title="Bấm để gọi điện ngay"
                      >
                        <span className="material-symbols-outlined text-[14px]">call</span>
                        {lead.phone}
                      </a>
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-bold text-[#641D06] line-clamp-1">{lead.formTitle}</div>
                      {lead.formCategory && (
                        <span className="inline-block text-[10px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded mt-0.5">
                          {lead.formCategory}
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-4 font-mono text-[11px] text-slate-500">
                      {new Date(lead.createdAt).toLocaleString("vi-VN", {
                        hour: "2-digit",
                        minute: "2-digit",
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                    </td>
                    <td className="py-4 px-4">
                      <select
                        value={lead.status}
                        onChange={(e) =>
                          updateStatusMutation.mutate({
                            id: lead.id,
                            status: e.target.value as FormDownloadLead["status"],
                          })
                        }
                        className="px-2.5 py-1 text-[11px] font-bold rounded-lg border border-slate-200 bg-white focus:outline-none focus:border-emerald-600 cursor-pointer shadow-2xs"
                      >
                        <option value="new">🔴 Mới tải</option>
                        <option value="contacted">🔵 Đã gọi điện</option>
                        <option value="completed">🟢 Đã tư vấn xong</option>
                        <option value="cancelled">⚪ Đã hủy</option>
                      </select>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => setSelectedLead(lead)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 transition-colors"
                          title="Xem chi tiết"
                        >
                          <span className="material-symbols-outlined text-base">visibility</span>
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Xóa thông tin khách hàng "${lead.name}"?`)) {
                              deleteMutation.mutate(lead.id);
                            }
                          }}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                          title="Xóa yêu cầu"
                        >
                          <span className="material-symbols-outlined text-base">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal Detail View */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 relative space-y-5">
            <button
              onClick={() => setSelectedLead(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 material-symbols-outlined cursor-pointer"
            >
              close
            </button>

            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl">description</span>
              </div>
              <div>
                <h3 className="font-black text-slate-900 text-lg">Chi Tiết Tải Biểu Mẫu</h3>
                <p className="text-xs text-slate-500">Mã Lead: #{selectedLead.id}</p>
              </div>
            </div>

            <div className="space-y-3 text-xs sm:text-sm">
              <div className="bg-slate-50 p-4 rounded-2xl space-y-2 border border-slate-200">
                <div className="flex justify-between">
                  <span className="text-slate-500 font-bold">Họ và tên:</span>
                  <span className="font-black text-slate-900">{selectedLead.name}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-bold">Số điện thoại:</span>
                  <a
                    href={`tel:${selectedLead.phone}`}
                    className="font-mono font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded"
                  >
                    {selectedLead.phone}
                  </a>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-bold">Biểu mẫu tải:</span>
                  <span className="font-bold text-[#641D06] text-right max-w-[240px]">
                    {selectedLead.formTitle}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-bold">Lĩnh vực:</span>
                  <span className="font-semibold text-slate-700">{selectedLead.formCategory}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-bold">Thời gian tải:</span>
                  <span className="font-mono text-slate-700">
                    {new Date(selectedLead.createdAt).toLocaleString("vi-VN")}
                  </span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-slate-200">
                  <span className="text-slate-500 font-bold">Trạng thái:</span>
                  {getStatusBadge(selectedLead.status)}
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <a
                href={`tel:${selectedLead.phone}`}
                className="flex-1 bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 text-xs sm:text-sm transition-colors shadow-sm"
              >
                <span className="material-symbols-outlined text-base">call</span>
                Gọi Điện Cho Khách Hàng
              </a>
              <button
                onClick={() => setSelectedLead(null)}
                className="px-5 py-3 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 font-bold text-xs sm:text-sm transition-colors"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
