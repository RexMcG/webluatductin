"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { formService } from "@/services/form.service";

export default function AdminFormsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const { data: forms = [], isLoading } = useQuery({
    queryKey: ["admin-forms", searchTerm],
    queryFn: () => formService.getForms(searchTerm, 100),
  });

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-emerald-50 text-emerald-700">
              <span className="material-symbols-outlined text-xl">folder_open</span>
            </span>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900">
              Quản Lý Thư Viện Biểu Mẫu Pháp Lý
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Dữ liệu thật từ Database ({forms.length} biểu mẫu chuẩn hóa đã được số hóa)
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-500">Tổng biểu mẫu thực tế:</span>
          <span className="text-xs font-mono font-bold text-emerald-900 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
            {forms.length} Mẫu đơn
          </span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex items-center justify-between">
        <div className="relative w-full md:w-96">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm kiếm biểu mẫu theo từ khóa..."
            className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-600 focus:bg-white text-slate-800"
          />
          <span className="material-symbols-outlined absolute left-3 top-2.5 text-sm text-slate-400">
            search
          </span>
        </div>
      </div>

      {/* Forms Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="py-20 text-center text-slate-400 text-xs">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600 mx-auto mb-2"></div>
            Đang tải dữ liệu biểu mẫu thật từ Database...
          </div>
        ) : forms.length === 0 ? (
          <div className="py-20 text-center text-slate-400 text-xs">
            Không tìm thấy biểu mẫu nào trong cơ sở dữ liệu.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200 uppercase tracking-wider text-[10px]">
                  <th className="py-3.5 px-4 w-12 text-center">ID</th>
                  <th className="py-3.5 px-4">Tên biểu mẫu pháp lý chuẩn hóa</th>
                  <th className="py-3.5 px-4 w-44">Phân loại</th>
                  <th className="py-3.5 px-4 w-52">Tệp đính kèm</th>
                  <th className="py-3.5 px-4 w-36">Ngày tạo</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {forms.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-4 text-center font-mono font-bold text-slate-400">
                      #{item.id}
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-bold text-slate-900 text-xs line-clamp-2">
                        {item.title}
                      </div>
                      {item.description && (
                        <div className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                          {item.description}
                        </div>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-900 border border-emerald-200">
                        {item.category || "Biểu mẫu"}
                      </span>
                    </td>
                    <td className="py-4 px-4 font-mono text-[11px] text-slate-600">
                      {item.fileUrl ? (
                        <span className="text-blue-600 truncate flex items-center gap-1 max-w-[200px]" title={item.fileUrl}>
                          <span className="material-symbols-outlined text-xs">description</span>
                          {item.fileUrl.replace('/uploads/forms/', '')}
                        </span>
                      ) : (
                        <span className="text-slate-400">Chưa có tệp</span>
                      )}
                    </td>
                    <td className="py-4 px-4 text-slate-500 font-mono text-[11px]">
                      {new Date(item.createdAt).toLocaleDateString("vi-VN")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
