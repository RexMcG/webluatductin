"use client";

import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { appointmentService, Appointment } from "@/services/appointment.service";
import saveAs from "file-saver";

export default function AdminAppointmentsPage() {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"calendar" | "table">("calendar");

  // Calendar State
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [isExportOpen, setIsExportOpen] = useState(false);

  const { data: appointments = [], isLoading } = useQuery({
    queryKey: ["admin-appointments"],
    queryFn: () => appointmentService.getAppointments(),
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: number; status: string }) =>
      appointmentService.updateStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-appointments"] });
      if (selectedAppointment) {
        setSelectedAppointment((prev) => (prev ? { ...prev, status: selectedAppointment.status } : null));
      }
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => appointmentService.deleteAppointment(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-appointments"] });
      setSelectedAppointment(null);
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
        return {
          label: "Chờ liên hệ",
          bg: "bg-amber-100 text-amber-900 border-amber-300",
          dot: "bg-amber-500",
          cardBg: "bg-amber-50 border-amber-200 text-amber-900 hover:bg-amber-100",
        };
      case "confirmed":
        return {
          label: "Đã xác nhận",
          bg: "bg-blue-100 text-blue-900 border-blue-300",
          dot: "bg-blue-600",
          cardBg: "bg-blue-50 border-blue-200 text-blue-900 hover:bg-blue-100",
        };
      case "completed":
        return {
          label: "Đã tư vấn xong",
          bg: "bg-emerald-100 text-emerald-900 border-emerald-300",
          dot: "bg-emerald-600",
          cardBg: "bg-emerald-50 border-emerald-200 text-emerald-900 hover:bg-emerald-100",
        };
      case "cancelled":
        return {
          label: "Đã hủy",
          bg: "bg-slate-100 text-slate-600 border-slate-300",
          dot: "bg-slate-400",
          cardBg: "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100 line-through opacity-70",
        };
      default:
        return {
          label: status,
          bg: "bg-slate-100 text-slate-700 border-slate-200",
          dot: "bg-slate-500",
          cardBg: "bg-slate-50 border-slate-200 text-slate-700",
        };
    }
  };

  // --- Export Handlers ---
  const exportToExcel = () => {
    const headers = ["STT", "Họ và tên", "Số điện thoại", "Email", "Ngày hẹn", "Giờ hẹn", "Trạng thái", "Ghi chú vụ việc"];
    const rows = filtered.map((apt, idx) => [
      idx + 1,
      `"${apt.name.replace(/"/g, '""')}"`,
      `"${apt.phone}"`,
      `"${apt.email || ""}"`,
      `"${apt.appointmentDate}"`,
      `"${apt.appointmentTime}"`,
      `"${getStatusBadge(apt.status).label}"`,
      `"${(apt.notes || "").replace(/"/g, '""')}"`,
    ]);

    const csvContent = "\uFEFF" + [headers.join(","), ...rows.map((r) => r.join(","))].join("\r\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, `Danh_sach_lich_hen_DucTin_${new Date().toISOString().split("T")[0]}.csv`);
    setIsExportOpen(false);
  };

  const exportSingleIcs = (apt: Appointment) => {
    const icsData = generateIcsContent([apt]);
    const blob = new Blob([icsData], { type: "text/calendar;charset=utf-8;" });
    saveAs(blob, `Lich_hen_${apt.name.replace(/\s+/g, "_")}.ics`);
  };

  const exportAllIcs = () => {
    const validApts = filtered.filter((apt) => apt.status !== "cancelled");
    const icsData = generateIcsContent(validApts);
    const blob = new Blob([icsData], { type: "text/calendar;charset=utf-8;" });
    saveAs(blob, `Lich_lam_viec_DucTin_${new Date().toISOString().split("T")[0]}.ics`);
    setIsExportOpen(false);
  };

  const generateIcsContent = (apts: Appointment[]) => {
    const events = apts
      .map((apt) => {
        // Parse date
        const dateStr = apt.appointmentDate; // Expecting YYYY-MM-DD or DD/MM/YYYY
        let year = "2026", month = "08", day = "27";
        if (dateStr.includes("-")) {
          const parts = dateStr.split("-");
          year = parts[0];
          month = parts[1].padStart(2, "0");
          day = parts[2].padStart(2, "0");
        } else if (dateStr.includes("/")) {
          const parts = dateStr.split("/");
          day = parts[0].padStart(2, "0");
          month = parts[1].padStart(2, "0");
          year = parts[2];
        }

        // Parse time (e.g. "09:00" or "09:00 - 10:00")
        let timePart = apt.appointmentTime.split("-")[0].trim();
        let hour = "09", min = "00";
        if (timePart.includes(":")) {
          const tParts = timePart.split(":");
          hour = tParts[0].padStart(2, "0");
          min = tParts[1].padStart(2, "0");
        }

        const startDt = `${year}${month}${day}T${hour}${min}00`;
        const endHour = String(Number(hour) + 1).padStart(2, "0");
        const endDt = `${year}${month}${day}T${endHour}${min}00`;

        return `BEGIN:VEVENT
UID:${apt.id}-${Date.now()}@ductinlaw.vn
SUMMARY:Lịch tư vấn: ${apt.name} (${apt.phone})
DESCRIPTION:Khách hàng: ${apt.name}\\nSĐT: ${apt.phone}\\nEmail: ${apt.email || "Không có"}\\nNội dung: ${apt.notes || "Tư vấn trực tiếp với Luật sư Phan Đức Tín"}
LOCATION:Văn phòng Đức Tín & Partners - Saigon Trade Center, 37 Tôn Đức Thắng, Q.1, TP.HCM
DTSTART:${startDt}
DTEND:${endDt}
STATUS:CONFIRMED
BEGIN:VALARM
TRIGGER:-PT30M
ACTION:DISPLAY
DESCRIPTION:Nhắc lịch tư vấn với khách hàng ${apt.name} sau 30 phút
END:VALARM
END:VEVENT`;
      })
      .join("\r\n");

    return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Duc Tin & Partners//Lich Hen Tu Van//VI
CALSCALE:GREGORIAN
METHOD:PUBLISH
X-WR-CALNAME:Lịch Tư Vấn Luật Sư Đức Tín
X-WR-TIMEZONE:Asia/Ho_Chi_Minh
${events}
END:VCALENDAR`;
  };

  const handlePrint = () => {
    window.print();
    setIsExportOpen(false);
  };

  // --- Calendar Date Calculations ---
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth(); // 0-indexed

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);

  // Day of week: 0 = Sun, 1 = Mon ...
  // We want Monday as index 0, Sun as index 6
  const startDayIndex = (firstDayOfMonth.getDay() + 6) % 7;
  const daysInMonth = lastDayOfMonth.getDate();

  // Previous month trailing days
  const prevMonthLastDay = new Date(year, month, 0).getDate();
  const prevDays = Array.from({ length: startDayIndex }, (_, i) => ({
    day: prevMonthLastDay - startDayIndex + i + 1,
    isCurrentMonth: false,
    dateString: `${month === 0 ? year - 1 : year}-${String(month === 0 ? 12 : month).padStart(2, "0")}-${String(
      prevMonthLastDay - startDayIndex + i + 1
    ).padStart(2, "0")}`,
  }));

  // Current month days
  const currentDays = Array.from({ length: daysInMonth }, (_, i) => {
    const d = i + 1;
    const dateString = `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    return {
      day: d,
      isCurrentMonth: true,
      dateString,
    };
  });

  // Next month leading days to complete grid (42 cells = 6 rows x 7 cols)
  const totalCells = prevDays.length + currentDays.length;
  const nextDaysCount = totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7);
  const nextDays = Array.from({ length: nextDaysCount }, (_, i) => ({
    day: i + 1,
    isCurrentMonth: false,
    dateString: `${month === 11 ? year + 1 : year}-${String(month === 11 ? 1 : month + 2).padStart(2, "0")}-${String(
      i + 1
    ).padStart(2, "0")}`,
  }));

  const allCalendarDays = [...prevDays, ...currentDays, ...nextDays];

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));
  const goToToday = () => setCurrentDate(new Date());

  const todayStr = new Date().toISOString().split("T")[0];

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      {/* Header Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2.5 rounded-2xl bg-amber-50 text-amber-800 border border-amber-200/60 shadow-2xs">
              <span className="material-symbols-outlined text-2xl">calendar_month</span>
            </span>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900">
                Thời Khóa Biểu &amp; Lịch Hẹn Tư Vấn
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Quản lý lịch hẹn trực tiếp với Luật sư Phan Đức Tín &amp; Cộng sự
              </p>
            </div>
          </div>
        </div>

        {/* Action Controls: View Switcher & Export Dropdown */}
        <div className="flex flex-wrap items-center gap-3">
          {/* View Mode Toggle */}
          <div className="flex items-center bg-slate-100 p-1 rounded-2xl border border-slate-200">
            <button
              onClick={() => setViewMode("calendar")}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                viewMode === "calendar"
                  ? "bg-[#641D06] text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <span className="material-symbols-outlined text-base">calendar_view_month</span>
              <span>Thời Khóa Biểu</span>
            </button>
            <button
              onClick={() => setViewMode("table")}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                viewMode === "table"
                  ? "bg-[#641D06] text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <span className="material-symbols-outlined text-base">table_rows</span>
              <span>Bảng Danh Sách</span>
            </button>
          </div>

          {/* Export Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsExportOpen(!isExportOpen)}
              className="flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold px-4 py-2.5 rounded-2xl shadow-xs transition-all active:scale-95 cursor-pointer"
            >
              <span className="material-symbols-outlined text-base">file_download</span>
              <span>Tải &amp; Xuất Lịch</span>
              <span className="material-symbols-outlined text-sm">expand_more</span>
            </button>

            {isExportOpen && (
              <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-slate-200 py-2 z-50 animate-fadeIn">
                <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Định dạng tải về
                </div>
                <button
                  onClick={exportToExcel}
                  className="w-full px-3 py-2 text-left text-xs font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-2.5 transition-colors cursor-pointer"
                >
                  <span className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
                    <span className="material-symbols-outlined text-base">table_view</span>
                  </span>
                  <div>
                    <div>Xuất file Excel (.csv)</div>
                    <div className="text-[10px] text-slate-400 font-normal">Quản lý &amp; báo cáo danh sách</div>
                  </div>
                </button>

                <button
                  onClick={exportAllIcs}
                  className="w-full px-3 py-2 text-left text-xs font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-2.5 transition-colors cursor-pointer"
                >
                  <span className="w-7 h-7 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center">
                    <span className="material-symbols-outlined text-base">event_note</span>
                  </span>
                  <div>
                    <div>Đồng bộ Lịch iCal (.ics)</div>
                    <div className="text-[10px] text-slate-400 font-normal">Nạp vào Lịch iPhone / Google</div>
                  </div>
                </button>

                <div className="my-1 border-t border-slate-100"></div>

                <button
                  onClick={handlePrint}
                  className="w-full px-3 py-2 text-left text-xs font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-2.5 transition-colors cursor-pointer"
                >
                  <span className="w-7 h-7 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center">
                    <span className="material-symbols-outlined text-base">print</span>
                  </span>
                  <div>
                    <div>In thời khóa biểu / PDF</div>
                    <div className="text-[10px] text-slate-400 font-normal">In ra giấy A4 hoặc lưu PDF</div>
                  </div>
                </button>
              </div>
            )}
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
            placeholder="Tìm theo tên khách hàng, số điện thoại..."
            className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#641D06] focus:bg-white text-slate-800 font-medium"
          />
          <span className="material-symbols-outlined absolute left-3 top-2.5 text-sm text-slate-400">
            search
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-500 shrink-0">Trạng thái:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:border-[#641D06] text-slate-800 font-medium cursor-pointer"
            >
              <option value="all">Tất cả ({appointments.length})</option>
              <option value="pending">Chờ liên hệ</option>
              <option value="confirmed">Đã xác nhận</option>
              <option value="completed">Đã tư vấn xong</option>
              <option value="cancelled">Đã hủy</option>
            </select>
          </div>
        </div>
      </div>

      {/* ================= CALENDAR TIMETABLE VIEW ================= */}
      {viewMode === "calendar" && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden p-4 sm:p-6 space-y-4">
          {/* Calendar Header Navigation */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <h2 className="text-lg sm:text-xl font-black text-slate-900">
                Tháng {month + 1} / {year}
              </h2>
              <span className="text-xs font-bold text-amber-900 bg-amber-50 px-3 py-1 rounded-xl border border-amber-200">
                {filtered.length} lịch hẹn
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={goToToday}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors cursor-pointer"
              >
                Hôm Nay
              </button>
              <div className="flex items-center bg-slate-100 rounded-xl p-1 border border-slate-200">
                <button
                  onClick={prevMonth}
                  className="p-1 hover:bg-white rounded-lg text-slate-700 transition-colors cursor-pointer"
                  title="Tháng trước"
                >
                  <span className="material-symbols-outlined text-base">chevron_left</span>
                </button>
                <button
                  onClick={nextMonth}
                  className="p-1 hover:bg-white rounded-lg text-slate-700 transition-colors cursor-pointer"
                  title="Tháng sau"
                >
                  <span className="material-symbols-outlined text-base">chevron_right</span>
                </button>
              </div>
            </div>
          </div>

          {/* Status Legend Bar */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-600 bg-slate-50 p-3 rounded-2xl">
            <span className="text-[11px] font-bold uppercase text-slate-400">Chú thích:</span>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
              <span>Chờ liên hệ</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
              <span>Đã xác nhận</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
              <span>Đã tư vấn xong</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-400"></span>
              <span>Đã hủy</span>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="overflow-x-auto">
            <div className="min-w-[800px]">
              {/* Day-of-week headers */}
              <div className="grid grid-cols-7 gap-2 mb-2 text-center text-xs font-black uppercase tracking-wider text-slate-500">
                <div className="py-2 bg-slate-100 rounded-xl">Thứ 2</div>
                <div className="py-2 bg-slate-100 rounded-xl">Thứ 3</div>
                <div className="py-2 bg-slate-100 rounded-xl">Thứ 4</div>
                <div className="py-2 bg-slate-100 rounded-xl">Thứ 5</div>
                <div className="py-2 bg-slate-100 rounded-xl">Thứ 6</div>
                <div className="py-2 bg-amber-50 text-amber-900 rounded-xl">Thứ 7</div>
                <div className="py-2 bg-rose-50 text-rose-800 rounded-xl">Chủ Nhật</div>
              </div>

              {/* Day cells grid */}
              <div className="grid grid-cols-7 gap-2">
                {allCalendarDays.map((cell, idx) => {
                  // Find appointments on this cell date
                  const cellApts = filtered.filter((apt) => {
                    // Match YYYY-MM-DD or DD/MM/YYYY
                    if (apt.appointmentDate === cell.dateString) return true;
                    // Try DD/MM/YYYY format
                    const parts = cell.dateString.split("-");
                    const altStr = `${parts[2]}/${parts[1]}/${parts[0]}`;
                    const altStr2 = `${Number(parts[2])}/${Number(parts[1])}/${parts[0]}`;
                    return apt.appointmentDate === altStr || apt.appointmentDate === altStr2;
                  });

                  const isToday = cell.dateString === todayStr;

                  return (
                    <div
                      key={idx}
                      className={`min-h-[110px] p-2 rounded-2xl border transition-all flex flex-col justify-between ${
                        cell.isCurrentMonth
                          ? isToday
                            ? "bg-amber-50/40 border-amber-400 ring-2 ring-amber-400/20"
                            : "bg-white border-slate-200 hover:border-slate-300"
                          : "bg-slate-50/60 border-slate-100 text-slate-300"
                      }`}
                    >
                      {/* Day Number Header */}
                      <div className="flex items-center justify-between">
                        <span
                          className={`text-xs font-black w-6 h-6 rounded-full flex items-center justify-center ${
                            isToday
                              ? "bg-[#641D06] text-white"
                              : cell.isCurrentMonth
                              ? "text-slate-800"
                              : "text-slate-300"
                          }`}
                        >
                          {cell.day}
                        </span>
                        {cellApts.length > 0 && (
                          <span className="text-[10px] font-bold text-amber-900 bg-amber-100 px-1.5 py-0.2 rounded-md">
                            {cellApts.length} lịch
                          </span>
                        )}
                      </div>

                      {/* Day Appointments List */}
                      <div className="mt-1.5 space-y-1 flex-1 overflow-hidden">
                        {cellApts.slice(0, 3).map((apt) => {
                          const badge = getStatusBadge(apt.status);
                          return (
                            <button
                              key={apt.id}
                              onClick={() => setSelectedAppointment(apt)}
                              className={`w-full text-left p-1.5 rounded-xl border text-[10.5px] font-bold transition-all truncate block cursor-pointer ${badge.cardBg}`}
                              title={`${apt.appointmentTime} - ${apt.name} (${apt.phone})`}
                            >
                              <div className="flex items-center gap-1">
                                <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${badge.dot}`}></span>
                                <span className="font-mono text-[9.5px] shrink-0">{apt.appointmentTime.split("-")[0]}</span>
                                <span className="truncate">{apt.name}</span>
                              </div>
                            </button>
                          );
                        })}

                        {cellApts.length > 3 && (
                          <button
                            onClick={() => setSelectedAppointment(cellApts[0])}
                            className="text-[10px] font-bold text-slate-500 hover:text-amber-800 block text-center w-full pt-0.5"
                          >
                            + {cellApts.length - 3} lịch khác...
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= TABLE LIST VIEW ================= */}
      {viewMode === "table" && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          {isLoading ? (
            <div className="p-6 space-y-4 animate-pulse">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center justify-between gap-4 py-3.5 border-b border-slate-100">
                  <div className="h-4 w-6 bg-slate-200 rounded" />
                  <div className="flex items-center gap-2 w-48">
                    <div className="w-8 h-8 rounded-full bg-slate-200" />
                    <div className="space-y-1.5 flex-1">
                      <div className="h-4 w-28 bg-slate-200 rounded" />
                      <div className="h-3 w-20 bg-slate-100 rounded" />
                    </div>
                  </div>
                  <div className="h-4 w-64 bg-slate-200 rounded flex-1" />
                  <div className="h-4 w-32 bg-slate-200 rounded" />
                  <div className="h-7 w-28 bg-amber-100 rounded-xl" />
                  <div className="h-7 w-20 bg-slate-100 rounded-lg" />
                </div>
              ))}
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
                    <th className="py-3.5 px-4 w-40 text-center">Thao tác</th>
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
                          <button
                            onClick={() => setSelectedAppointment(apt)}
                            className="font-bold text-slate-900 text-sm hover:text-[#641D06] hover:underline text-left cursor-pointer"
                          >
                            {apt.name}
                          </button>
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
                          <div className="flex items-center justify-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => setSelectedAppointment(apt)}
                              className="p-1.5 rounded-lg text-slate-500 hover:text-[#641D06] hover:bg-slate-100 transition-colors cursor-pointer"
                              title="Xem chi tiết"
                            >
                              <span className="material-symbols-outlined text-base">visibility</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => exportSingleIcs(apt)}
                              className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
                              title="Thêm vào Lịch điện thoại (.ics)"
                            >
                              <span className="material-symbols-outlined text-base">event</span>
                            </button>
                            <a
                              href={`tel:${apt.phone.replace(/\s/g, "")}`}
                              className="p-1.5 rounded-lg text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 transition-colors cursor-pointer"
                              title="Gọi ngay"
                            >
                              <span className="material-symbols-outlined text-base">call</span>
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
      )}

      {/* ================= APPOINTMENT DETAIL MODAL ================= */}
      {selectedAppointment && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200">
            {/* Modal Header */}
            <div className="bg-[#641D06] p-6 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-400 text-[#641D06] flex items-center justify-center font-bold">
                  <span className="material-symbols-outlined">event</span>
                </div>
                <div>
                  <h3 className="font-bold text-base text-amber-100">Chi Tiết Lịch Hẹn Tư Vấn</h3>
                  <p className="text-xs text-amber-200/80">Khách hàng đặt lịch tư vấn pháp lý</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedAppointment(null)}
                className="p-1.5 rounded-xl hover:bg-white/10 text-white transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4 text-xs">
              {/* Customer Info Card */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Khách Hàng
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${
                      getStatusBadge(selectedAppointment.status).bg
                    }`}
                  >
                    {getStatusBadge(selectedAppointment.status).label}
                  </span>
                </div>
                <div className="text-base font-black text-slate-900">{selectedAppointment.name}</div>

                <div className="flex flex-wrap gap-2 pt-1">
                  <a
                    href={`tel:${selectedAppointment.phone.replace(/\s/g, "")}`}
                    className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3 py-1.5 rounded-xl transition-all shadow-xs"
                  >
                    <span className="material-symbols-outlined text-sm">call</span>
                    <span>Gọi: {selectedAppointment.phone}</span>
                  </a>
                  {selectedAppointment.email && (
                    <a
                      href={`mailto:${selectedAppointment.email}`}
                      className="inline-flex items-center gap-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold px-3 py-1.5 rounded-xl transition-all"
                    >
                      <span className="material-symbols-outlined text-sm">mail</span>
                      <span>Gửi Email</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Time & Location */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-blue-50 p-3.5 rounded-2xl border border-blue-100">
                  <div className="text-[10px] font-bold text-blue-700 uppercase">Ngày Hẹn</div>
                  <div className="text-sm font-black text-blue-950 mt-1 flex items-center gap-1">
                    <span className="material-symbols-outlined text-base">calendar_today</span>
                    <span>{selectedAppointment.appointmentDate}</span>
                  </div>
                </div>

                <div className="bg-amber-50 p-3.5 rounded-2xl border border-amber-100">
                  <div className="text-[10px] font-bold text-amber-800 uppercase">Khung Giờ</div>
                  <div className="text-sm font-black text-amber-950 mt-1 flex items-center gap-1">
                    <span className="material-symbols-outlined text-base">schedule</span>
                    <span>{selectedAppointment.appointmentTime}</span>
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div className="space-y-1.5">
                <span className="font-bold text-slate-700 uppercase text-[11px]">Nội dung vụ việc &amp; Yêu cầu:</span>
                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-slate-700 text-xs leading-relaxed max-h-40 overflow-y-auto">
                  {selectedAppointment.notes || "Khách hàng không để lại ghi chú cụ thể. Tư vấn pháp luật tổng thể."}
                </div>
              </div>

              {/* Update Status */}
              <div className="space-y-1.5 pt-2 border-t border-slate-100">
                <span className="font-bold text-slate-700 uppercase text-[11px]">Cập nhật trạng thái xử lý:</span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {(
                    [
                      { id: "pending", label: "Chờ liên hệ", bg: "hover:bg-amber-100 hover:border-amber-300" },
                      { id: "confirmed", label: "Đã xác nhận", bg: "hover:bg-blue-100 hover:border-blue-300" },
                      { id: "completed", label: "Đã tư vấn", bg: "hover:bg-emerald-100 hover:border-emerald-300" },
                      { id: "cancelled", label: "Đã hủy", bg: "hover:bg-slate-200 hover:border-slate-300" },
                    ] as const
                  ).map((st) => (
                    <button
                      key={st.id}
                      onClick={() => {
                        handleStatusChange(selectedAppointment.id, st.id);
                        setSelectedAppointment({ ...selectedAppointment, status: st.id });
                      }}
                      className={`py-2 px-2.5 rounded-xl border text-[11px] font-bold transition-all text-center cursor-pointer ${
                        selectedAppointment.status === st.id
                          ? "bg-[#641D06] text-white border-[#641D06] shadow-xs"
                          : `bg-slate-50 text-slate-700 border-slate-200 ${st.bg}`
                      }`}
                    >
                      {st.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2">
              <button
                onClick={() => exportSingleIcs(selectedAppointment)}
                className="flex items-center gap-1.5 text-xs font-bold text-blue-700 hover:text-blue-900 bg-blue-100/70 hover:bg-blue-100 px-3.5 py-2 rounded-xl transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-base">event</span>
                <span>Thêm vào Lịch (.ics)</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleDelete(selectedAppointment.id, selectedAppointment.name)}
                  className="p-2 text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                  title="Xóa lịch hẹn"
                >
                  <span className="material-symbols-outlined text-lg">delete</span>
                </button>
                <button
                  onClick={() => setSelectedAppointment(null)}
                  className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs rounded-xl transition-colors cursor-pointer"
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
