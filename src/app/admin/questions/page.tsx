"use client";

import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { questionService, UserQuestion } from "@/services/question.service";

export default function AdminQuestionsPage() {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedItem, setSelectedItem] = useState<UserQuestion | null>(null);

  const { data: questions = [], isLoading } = useQuery({
    queryKey: ["admin-questions"],
    queryFn: () => questionService.getQuestions(),
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: number; status: 'pending' | 'confirmed' | 'completed' | 'cancelled' }) =>
      questionService.updateStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-questions"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => questionService.deleteQuestion(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-questions"] });
      if (selectedItem) setSelectedItem(null);
    },
  });

  const handleStatusChange = (id: number, newStatus: any) => {
    updateStatusMutation.mutate({ id, status: newStatus });
  };

  const handleDelete = (id: number, name: string) => {
    if (confirm(`Bạn có chắc chắn muốn xóa yêu cầu/câu hỏi của khách hàng "${name}" không?`)) {
      deleteMutation.mutate(id);
    }
  };

  const filtered = questions.filter((q) => {
    const matchSearch =
      q.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.phone.includes(searchTerm) ||
      (q.question && q.question.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (q.category && q.category.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchStatus = statusFilter === "all" || q.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const pendingCount = questions.filter((a) => a.status === "pending").length;
  const completedCount = questions.filter((a) => a.status === "completed").length;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return { label: "Chờ liên hệ", bg: "bg-amber-100 text-amber-800 border-amber-300" };
      case "confirmed":
        return { label: "Đang xử lý", bg: "bg-blue-100 text-blue-800 border-blue-300" };
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
              <span className="material-symbols-outlined text-xl">contact_support</span>
            </span>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900">
              Hộp Thư Câu Hỏi &amp; Tư Vấn Trực Tuyến
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Tổng hợp câu hỏi gửi tới Luật sư Phan Đức Tín từ Form Trang Chủ và hệ thống tư vấn trực tiếp.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-center px-4 py-2 bg-amber-50 rounded-2xl border border-amber-200">
            <div className="text-xs text-amber-800 font-medium">Chờ phản hồi</div>
            <div className="text-lg font-black text-amber-900">{pendingCount}</div>
          </div>
          <div className="text-center px-4 py-2 bg-emerald-50 rounded-2xl border border-emerald-200">
            <div className="text-xs text-emerald-800 font-medium">Đã tư vấn</div>
            <div className="text-lg font-black text-emerald-900">{completedCount}</div>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-96">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm theo tên khách, số điện thoại, nội dung..."
            className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#641D06] focus:bg-white text-slate-800"
          />
          <span className="material-symbols-outlined absolute left-3 top-2.5 text-slate-400 text-sm">
            search
          </span>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto">
          {["all", "pending", "confirmed", "completed", "cancelled"].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
                statusFilter === st
                  ? "bg-[#641D06] text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {st === "all" ? "Tất cả" : getStatusBadge(st).label}
            </button>
          ))}
        </div>
      </div>

      {/* Questions List */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xs overflow-hidden">
        {isLoading ? (
          <div className="py-20 text-center text-slate-400 text-sm">Đang tải danh sách câu hỏi...</div>
        ) : filtered.length === 0 ? (
          <div className="py-20 text-center">
            <span className="material-symbols-outlined text-4xl text-slate-300 mb-2">inbox</span>
            <p className="text-slate-500 font-bold text-sm">Không tìm thấy câu hỏi hoặc yêu cầu tư vấn nào.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
                  <th className="py-3.5 px-4">Khách Hàng</th>
                  <th className="py-3.5 px-4">Liên Hệ</th>
                  <th className="py-3.5 px-4">Lĩnh Vực</th>
                  <th className="py-3.5 px-4">Nội Dung Câu Hỏi / Vụ Việc</th>
                  <th className="py-3.5 px-4">Thời Gian</th>
                  <th className="py-3.5 px-4">Trạng Thái</th>
                  <th className="py-3.5 px-4 text-center">Thao Tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((item) => {
                  const badge = getStatusBadge(item.status);
                  return (
                    <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-4 px-4 font-bold text-slate-900 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-black text-xs">
                            {item.name.charAt(0).toUpperCase()}
                          </div>
                          <span>{item.name}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 whitespace-nowrap">
                        <div className="font-bold text-emerald-700">
                          <a href={`tel:${item.phone}`} className="hover:underline flex items-center gap-1">
                            <span className="material-symbols-outlined text-xs">call</span>
                            {item.phone}
                          </a>
                        </div>
                        {item.email && item.email !== 'khachhang@ductinlaw.vn' && (
                          <div className="text-slate-400 text-[11px] mt-0.5">{item.email}</div>
                        )}
                      </td>
                      <td className="py-4 px-4 whitespace-nowrap">
                        <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 font-semibold border border-slate-200">
                          {item.category || "Chung"}
                        </span>
                      </td>
                      <td className="py-4 px-4 max-w-xs md:max-w-md">
                        <p className="text-slate-700 font-medium line-clamp-2 leading-relaxed">
                          {item.question || "Khách hàng gửi câu hỏi tư vấn trực tiếp."}
                        </p>
                      </td>
                      <td className="py-4 px-4 text-slate-500 whitespace-nowrap text-[11px]">
                        {item.createdAt ? new Date(item.createdAt).toLocaleString('vi-VN') : "Vừa xong"}
                      </td>
                      <td className="py-4 px-4 whitespace-nowrap">
                        <select
                          value={item.status}
                          onChange={(e) => handleStatusChange(item.id, e.target.value)}
                          className={`text-xs font-bold px-2.5 py-1 rounded-xl border cursor-pointer outline-none ${badge.bg}`}
                        >
                          <option value="pending">Chờ liên hệ</option>
                          <option value="confirmed">Đang xử lý</option>
                          <option value="completed">Đã tư vấn xong</option>
                          <option value="cancelled">Đã hủy</option>
                        </select>
                      </td>
                      <td className="py-4 px-4 text-center whitespace-nowrap">
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            onClick={() => setSelectedItem(item)}
                            title="Xem chi tiết câu hỏi"
                            className="p-1.5 rounded-lg bg-slate-100 text-slate-700 hover:bg-[#641D06] hover:text-white transition-colors cursor-pointer"
                          >
                            <span className="material-symbols-outlined text-sm">visibility</span>
                          </button>
                          <a
                            href={`tel:${item.phone}`}
                            title="Gọi điện cho khách"
                            className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white transition-colors cursor-pointer"
                          >
                            <span className="material-symbols-outlined text-sm">phone</span>
                          </a>
                          <button
                            onClick={() => handleDelete(item.id, item.name)}
                            title="Xóa yêu cầu"
                            className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-colors cursor-pointer"
                          >
                            <span className="material-symbols-outlined text-sm">delete</span>
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

      {/* Detail Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95 duration-150">
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-5 right-5 p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
            >
              <span className="material-symbols-outlined text-xl">close</span>
            </button>

            <div className="flex items-center gap-2.5 mb-4">
              <span className="p-2 rounded-xl bg-[#641D06] text-white">
                <span className="material-symbols-outlined text-xl">help_center</span>
              </span>
              <div>
                <h3 className="text-lg font-black text-slate-900">Chi Tiết Câu Hỏi Khách Hàng</h3>
                <p className="text-xs text-slate-500">Mã câu hỏi: #{selectedItem.id}</p>
              </div>
            </div>

            <div className="space-y-4 py-2 text-xs">
              <div className="bg-slate-50 p-4 rounded-2xl space-y-2 border border-slate-200">
                <div className="flex justify-between">
                  <span className="text-slate-500 font-semibold">Họ và tên:</span>
                  <span className="font-bold text-slate-900 text-sm">{selectedItem.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-semibold">Số điện thoại:</span>
                  <a href={`tel:${selectedItem.phone}`} className="font-bold text-emerald-700 text-sm hover:underline">
                    {selectedItem.phone}
                  </a>
                </div>
                {selectedItem.email && selectedItem.email !== 'khachhang@ductinlaw.vn' && (
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-semibold">Email:</span>
                    <span className="font-bold text-slate-700">{selectedItem.email}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-slate-500 font-semibold">Lĩnh vực:</span>
                  <span className="font-bold text-[#641D06]">{selectedItem.category || "Chung"}</span>
                </div>
              </div>

              <div>
                <label className="block text-slate-600 font-bold mb-1.5">Nội dung câu hỏi / Vụ việc:</label>
                <div className="p-4 bg-amber-50/50 border border-amber-200 rounded-2xl text-slate-800 text-sm leading-relaxed whitespace-pre-wrap">
                  {selectedItem.question || "Khách hàng không để lại ghi chú chi tiết."}
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-slate-500 font-semibold">Trạng thái xử lý:</span>
                <select
                  value={selectedItem.status}
                  onChange={(e) => {
                    handleStatusChange(selectedItem.id, e.target.value);
                    setSelectedItem({ ...selectedItem, status: e.target.value as any });
                  }}
                  className={`font-bold px-3 py-1.5 rounded-xl border outline-none cursor-pointer ${getStatusBadge(selectedItem.status).bg}`}
                >
                  <option value="pending">Chờ liên hệ</option>
                  <option value="confirmed">Đang xử lý</option>
                  <option value="completed">Đã tư vấn xong</option>
                  <option value="cancelled">Đã hủy</option>
                </select>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <a
                href={`tel:${selectedItem.phone}`}
                className="flex-1 bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-2.5 rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
              >
                <span className="material-symbols-outlined text-base">call</span> Gọi Cho Khách
              </a>
              <button
                onClick={() => setSelectedItem(null)}
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2.5 rounded-xl transition-colors cursor-pointer"
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
