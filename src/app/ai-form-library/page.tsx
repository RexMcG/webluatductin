"use client";

import { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { formLibraryService, FormItem } from "@/services/form-library.service";
import { formLeadService } from "@/services/form-lead.service";
import { exportFormToDoc } from "@/utils/form-exporter";
import { sanitizeFormItem } from "@/utils/form-brand-cleaner";
import { calculateFormMatch } from "@/utils/form-search-matcher";
import SectionDivider from "@/components/common/SectionDivider";
import { POPULAR_FORMS } from "@/data/popular-forms";

const CATEGORIES = [
  "Tất cả",
  "Hôn nhân & Gia đình",
  "Đất đai & Hợp đồng",
  "Lao động & Tiền lương",
  "Tố tụng & Khởi kiện",
  "Hành chính & Dân sự",
];

function AIFormLibraryContent() {
  const searchParams = useSearchParams();
  const urlFormId = searchParams?.get("formId");
  const urlQ = searchParams?.get("q");
  const urlPreview = searchParams?.get("preview");

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedForm, setSelectedForm] = useState<FormItem | null>(null);
  const [leadForm, setLeadForm] = useState({ name: "", phone: "" });
  const [formErrors, setFormErrors] = useState<{ name?: string; phone?: string }>({});
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [copied, setCopied] = useState(false);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearchTerm(searchTerm), 350);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Tự động nhận diện từ khóa và mở Modal Preview khi được liên kết từ bài viết hướng dẫn
  useEffect(() => {
    if (urlQ && !searchTerm) {
      setSearchTerm(urlQ);
    }

    if (urlPreview === "1" || urlPreview === "true" || urlFormId) {
      let target: FormItem | undefined;
      if (urlFormId) {
        const fid = Number(urlFormId);
        target = (POPULAR_FORMS as FormItem[]).find((f) => f.id === fid);
      }
      if (!target && urlQ) {
        const qLower = urlQ.toLowerCase();
        target = (POPULAR_FORMS as FormItem[]).find(
          (f) => f.title.toLowerCase().includes(qLower) || qLower.includes(f.title.toLowerCase())
        );
      }
      if (target) {
        setSelectedForm(target);
        setShowModal(true);
      }
    }
  }, [urlFormId, urlQ, urlPreview]);

  // Fetch search results from backend API if available (tối đa 4 kết quả)
  const { data: searchResults, isLoading } = useQuery({
    queryKey: ["forms", debouncedSearchTerm],
    queryFn: () => formLibraryService.searchForms(debouncedSearchTerm, 4),
    enabled: debouncedSearchTerm.trim().length > 0,
    retry: 1,
  });

  // ĐỀ XUẤT THÔNG MINH: CHỈ HIỂN THỊ CÁC BIỂU MẪU THẬT SỰ PHÙ HỢP (TỐI ĐA 4), KHÔNG GHÉP MẪU LINH TINH
  const displayForms = useMemo(() => {
    if (!debouncedSearchTerm.trim()) {
      return (POPULAR_FORMS as FormItem[]).slice(0, 4).map(sanitizeFormItem);
    }

    const term = debouncedSearchTerm.trim();
    const candidates: FormItem[] = [];
    const seenIds = new Set<number>();

    // 1. Lọc và chấm điểm chính xác từ kết quả Backend API
    if (searchResults && searchResults.length > 0) {
      for (const item of searchResults) {
        const sanitized = sanitizeFormItem(item);
        const matchResult = calculateFormMatch(term, sanitized);
        if (matchResult.isMatch) {
          candidates.push({
            ...sanitized,
            matchPercent: matchResult.matchPercent,
            score: matchResult.score,
          });
          seenIds.add(item.id);
        }
      }
    }

    // 2. Chấm điểm chính xác trên bộ biểu mẫu chuẩn POPULAR_FORMS
    for (const form of POPULAR_FORMS as FormItem[]) {
      if (!seenIds.has(form.id)) {
        const matchResult = calculateFormMatch(term, form);
        if (matchResult.isMatch) {
          candidates.push({
            ...form,
            matchPercent: matchResult.matchPercent,
            score: matchResult.score,
          });
          seenIds.add(form.id);
        }
      }
    }

    // 3. Sắp xếp theo tỷ lệ phù hợp giảm dần (từ cao xuống thấp)
    candidates.sort((a, b) => (b.matchPercent || 0) - (a.matchPercent || 0));

    return candidates.slice(0, 4);
  }, [debouncedSearchTerm, searchResults]);

  const handleOpenPreview = (form: FormItem) => {
    setSelectedForm(form);
    setFormErrors({});
    setDownloadSuccess(false);
    setShowModal(true);
  };

  const handleCopyContent = () => {
    if (!selectedForm?.content) return;
    navigator.clipboard.writeText(selectedForm.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const validate = () => {
    const errors: { name?: string; phone?: string } = {};

    if (!leadForm.name.trim()) {
      errors.name = "Vui lòng nhập Họ và Tên của bạn.";
    } else if (leadForm.name.trim().length < 2) {
      errors.name = "Họ và tên phải có ít nhất 2 ký tự.";
    }

    const cleanPhone = leadForm.phone.replace(/[\s.-]/g, "");
    const phoneRegex = /^(0|\+84)(3|5|7|8|9)[0-9]{8}$/;
    if (!cleanPhone) {
      errors.phone = "Vui lòng nhập số điện thoại để nhận file.";
    } else if (!phoneRegex.test(cleanPhone)) {
      errors.phone = "Số điện thoại không hợp lệ (10 chữ số, ví dụ: 0912345678).";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedForm) return;

    if (!validate()) return;

    // 1. Lưu Lead vào hệ thống quản trị
    await formLeadService.createLead({
      name: leadForm.name.trim(),
      phone: leadForm.phone.trim(),
      formId: selectedForm.id,
      formTitle: selectedForm.title,
      formCategory: selectedForm.category,
    });

    // 2. Gửi tín hiệu backend
    formLibraryService
      .downloadForm({
        name: leadForm.name.trim(),
        phone: leadForm.phone.trim(),
        formId: selectedForm.id,
      })
      .catch(() => {});

    // 3. Tải file Word (.doc) chuẩn hóa A4 về máy người dùng
    exportFormToDoc(selectedForm, {
      name: leadForm.name.trim(),
      phone: leadForm.phone.trim(),
    });

    setDownloadSuccess(true);
    setTimeout(() => {
      setDownloadSuccess(false);
    }, 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 pt-10 pb-16 min-h-screen relative">
      {/* =========================================================================
          MODAL PREVIEW & TẢI BIỂU MẪU (BẢNG XEM TRƯỚC ĐẦY ĐỦ NỘI DUNG VĂN BẢN)
          (Dễ dàng tinh chỉnh, bật/tắt hoặc hoàn nguyên theo yêu cầu của bạn)
         ========================================================================= */}
      {showModal && selectedForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-3 sm:p-5 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-2xl sm:max-w-3xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 relative overflow-hidden">
            {/* Top accent bar */}
            <div className="h-1.5 bg-gradient-to-r from-[#641D06] via-amber-600 to-amber-400 shrink-0" />

            {/* Modal Header */}
            <div className="p-4 sm:p-6 border-b border-slate-100 flex items-start justify-between gap-4 shrink-0 bg-slate-50/60">
              <div className="flex items-start gap-3.5 flex-1 min-w-0">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#641D06] to-[#401204] text-amber-300 flex items-center justify-center shrink-0 shadow-sm mt-0.5 border border-amber-400/30">
                  <span className="material-symbols-outlined text-2xl">description</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-100 text-[#641D06] border border-amber-300 shadow-2xs">
                      📄 Bản xem trước mẫu văn bản
                    </span>
                    {selectedForm.category && (
                      <span className="text-[10.5px] font-semibold text-slate-700 bg-white px-2 py-0.5 rounded-md border border-slate-200">
                        {selectedForm.category}
                      </span>
                    )}
                    <span className="text-[10.5px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-0.5">
                      <span className="material-symbols-outlined text-xs">verified</span>
                      <span>Chuẩn Tòa án &amp; Cơ quan thẩm quyền</span>
                    </span>
                  </div>
                  <h2 className="text-base sm:text-xl font-bold text-slate-900 leading-snug">
                    {selectedForm.title}
                  </h2>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-all cursor-pointer shrink-0"
                aria-label="Đóng"
              >
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            </div>

            {/* Modal Body: Scrollable with Document Paper Preview */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
              {/* DOCUMENT PAPER PREVIEW */}
              <div className="bg-slate-50/80 border-2 border-slate-200/90 rounded-2xl p-4 sm:p-5 relative shadow-inner">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2.5 mb-3">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                    <span className="material-symbols-outlined text-base text-amber-700">menu_book</span>
                    <span>Nội dung mẫu văn bản (Định dạng Word .docx khổ A4):</span>
                  </div>

                  <button
                    type="button"
                    onClick={handleCopyContent}
                    className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-lg bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 transition-all cursor-pointer shadow-2xs active:scale-95"
                  >
                    <span className="material-symbols-outlined text-xs text-amber-700">
                      {copied ? "check" : "content_copy"}
                    </span>
                    <span>{copied ? "Đã sao chép!" : "Sao chép nhanh"}</span>
                  </button>
                </div>

                {/* Preformatted text with realistic legal layout */}
                <div className="max-h-[220px] sm:max-h-[260px] overflow-y-auto pr-2 text-slate-800 text-xs sm:text-[13px] leading-relaxed font-sans select-text whitespace-pre-wrap bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200 shadow-2xs">
                  {selectedForm.content || selectedForm.description || "Nội dung biểu mẫu đang được cập nhật..."}
                </div>
              </div>

              {/* DOWNLOAD & LEAD GEN SECTION */}
              <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-emerald-700 text-lg">download_for_offline</span>
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wide">
                      Tải Tệp Word (.doc) Căn Lề Chuẩn Về Máy
                    </h3>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    Miễn phí 100%
                  </span>
                </div>

                {downloadSuccess ? (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-center space-y-1.5 animate-fadeIn">
                    <span className="material-symbols-outlined text-3xl text-emerald-600">check_circle</span>
                    <h4 className="font-bold text-emerald-900 text-sm">Tệp Word đã được tải về máy của bạn!</h4>
                    <p className="text-xs text-emerald-700">
                      File đã được căn chỉnh lề A4, quốc hiệu tiêu ngữ sẵn sàng để bạn điền và nộp ngay.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleLeadSubmit} noValidate className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                          Họ và Tên <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={leadForm.name}
                          onChange={(e) => {
                            setLeadForm({ ...leadForm, name: e.target.value });
                            if (formErrors.name) setFormErrors({ ...formErrors, name: undefined });
                          }}
                          className={`w-full h-10 px-3.5 border rounded-xl outline-none bg-white text-slate-900 text-xs sm:text-sm transition-all ${
                            formErrors.name
                              ? "border-red-500 bg-red-50/30"
                              : "border-slate-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                          }`}
                          placeholder="Nguyễn Văn A"
                        />
                        {formErrors.name && (
                          <p className="text-[10.5px] font-bold text-red-600 mt-1">{formErrors.name}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                          Số điện thoại nhận tư vấn <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          value={leadForm.phone}
                          onChange={(e) => {
                            setLeadForm({ ...leadForm, phone: e.target.value });
                            if (formErrors.phone) setFormErrors({ ...formErrors, phone: undefined });
                          }}
                          className={`w-full h-10 px-3.5 border rounded-xl outline-none bg-white text-slate-900 text-xs sm:text-sm transition-all ${
                            formErrors.phone
                              ? "border-red-500 bg-red-50/30"
                              : "border-slate-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                          }`}
                          placeholder="0912 345 678"
                        />
                        {formErrors.phone && (
                          <p className="text-[10.5px] font-bold text-red-600 mt-1">{formErrors.phone}</p>
                        )}
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full h-11 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md active:scale-98 text-xs sm:text-sm"
                    >
                      <span className="material-symbols-outlined text-lg">download</span>
                      <span>Tải Xuống Bản Word (.doc) Ngay</span>
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Modal Footer: Lawyer Advice Note & Appointment CTA */}
            <div className="p-3.5 sm:p-4 bg-slate-50 border-t border-slate-200 shrink-0 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-xs">
              <div className="flex items-center gap-2 text-slate-600 text-[11px]">
                <span className="material-symbols-outlined text-amber-700 text-sm">info</span>
                <span>Cần Luật sư soạn thảo riêng theo tình huống thực tế?</span>
              </div>

              <Link
                href="/appointment"
                onClick={() => setShowModal(false)}
                className="text-[#641D06] hover:text-[#401204] font-bold hover:underline flex items-center gap-1 text-xs shrink-0"
              >
                <span>Đặt lịch tư vấn với Luật sư</span>
                <span className="material-symbols-outlined text-xs">arrow_forward</span>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <div className="text-center mb-10 max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-4xl font-bold text-slate-900 font-sans tracking-tight mb-1 leading-tight">
          Kho Biểu Mẫu Pháp Lý AI
        </h1>
        <SectionDivider label="TIỆN ÍCH" />
        <p className="text-slate-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
          Tra cứu và tải xuống miễn phí các biểu mẫu pháp lý chuẩn xác và đầy đủ nhất theo nhu cầu của bạn.
        </p>

        {/* Search Bar */}
        <div className="relative max-w-2xl mx-auto">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-14 pl-5 pr-14 border border-slate-300 rounded-2xl focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100 bg-white text-slate-900 placeholder:text-slate-400 shadow-md outline-none transition-all text-sm md:text-base"
            placeholder="Nhập nhu cầu pháp lý của bạn, ví dụ: 'Tôi muốn ly hôn', 'hợp đồng thuê nhà'..."
          />
          <span className="material-symbols-outlined absolute right-4 top-4 text-slate-400 hover:text-emerald-600 cursor-pointer text-2xl">
            search
          </span>
        </div>

        {/* Quick Suggestion Chips */}
        <div className="flex items-center justify-center gap-2 flex-wrap mt-4 text-xs">
          <span className="text-slate-500 font-medium flex items-center gap-1">
            <span className="material-symbols-outlined text-xs text-amber-600">trending_up</span>
            Gợi ý tra cứu nhanh:
          </span>
          {[
            "Thuận tình ly hôn",
            "Đơn phương ly hôn",
            "Hợp đồng thuê nhà",
            "Chuyển nhượng nhà đất",
            "Hợp đồng lao động",
            "Khởi kiện đòi nợ",
            "Giấy ủy quyền",
          ].map((tag) => (
            <button
              key={tag}
              onClick={() => setSearchTerm(tag)}
              className="bg-white border border-slate-200 hover:border-emerald-500 hover:text-emerald-700 px-3 py-1.5 rounded-full text-slate-600 transition-all shadow-2xs cursor-pointer active:scale-95"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <section className="mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Area: Results List */}
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
                <span className="material-symbols-outlined text-emerald-700">library_books</span>
                {debouncedSearchTerm.trim() ? "Biểu Mẫu Tìm Thấy" : "Biểu Mẫu Tiêu Biểu & Phổ Biến Nhất"}
              </h2>
              <span className="text-xs font-semibold text-slate-500">
                {displayForms.length} mẫu hiển thị
              </span>
            </div>

            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="bg-white border border-slate-200 p-6 rounded-2xl shadow-xs relative overflow-hidden animate-pulse"
                  >
                    <div className="absolute top-0 left-0 right-0 h-1.5 bg-slate-200" />
                    <div className="space-y-3">
                      <div className="h-5 w-24 bg-emerald-100/80 rounded-full" />
                      <div className="h-5 bg-slate-200 rounded-lg w-4/5" />
                      <div className="h-4 bg-slate-200/80 rounded-lg w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            ) : debouncedSearchTerm.trim().length > 0 && displayForms.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 shadow-xs">
                <span className="material-symbols-outlined text-6xl text-slate-300 mb-3 block">search_off</span>
                <h3 className="font-bold text-slate-800 text-lg mb-1">Không tìm thấy biểu mẫu phù hợp</h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto mb-5">
                  Vui lòng thử tìm với từ khóa khác hoặc liên hệ trực tiếp với Luật sư để được cung cấp mẫu theo yêu cầu.
                </p>
                <Link
                  href="/appointment"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#641D06] text-white font-bold text-xs"
                >
                  <span className="material-symbols-outlined text-sm">support_agent</span>
                  Liên hệ Luật sư
                </Link>
              </div>
            ) : (
              displayForms.map((form) => {
                const matchPercent =
                  form.matchPercent !== undefined
                    ? form.matchPercent
                    : form.score !== undefined
                    ? Math.min(99, Math.max(15, Math.round(form.score * 100)))
                    : 85;

                return (
                  <div
                    key={form.id}
                    className="bg-white border border-slate-200 hover:border-emerald-600 transition-all p-6 rounded-2xl flex flex-col md:flex-row gap-6 shadow-xs hover:shadow-md relative overflow-hidden group"
                  >
                    <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 to-amber-500" />

                    <div className="flex-1 space-y-3">
                      <div className="flex items-center gap-2.5 flex-wrap">
                        {debouncedSearchTerm.trim() ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                            <span className="material-symbols-outlined text-[14px]">verified</span>
                            {matchPercent}% phù hợp
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200">
                            <span className="material-symbols-outlined text-[14px]">local_fire_department</span>
                            Biểu mẫu phổ biến
                          </span>
                        )}
                        {form.category && (
                          <span className="bg-slate-100 text-slate-700 text-[11px] font-semibold px-2.5 py-0.5 rounded-md border border-slate-200">
                            {form.category}
                          </span>
                        )}
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#641D06] transition-colors leading-snug">
                        {form.title}
                      </h3>
                      <p className="text-xs md:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                        {form.description || form.content || "Biểu mẫu pháp lý chuẩn hóa"}
                      </p>
                      <div className="flex items-center gap-3 mt-4 pt-2">
                        {/* Nút Xem Trước Nội Dung */}
                        <button
                          type="button"
                          onClick={() => handleOpenPreview(form)}
                          className="bg-slate-100 hover:bg-slate-200 text-slate-800 h-10 px-4 rounded-xl text-xs md:text-sm font-bold transition-all flex items-center gap-1.5 cursor-pointer border border-slate-300 active:scale-95"
                        >
                          <span className="material-symbols-outlined text-[18px] text-amber-700">visibility</span>
                          Xem trước
                        </button>

                        {/* Nút Tải Xuống */}
                        <button
                          type="button"
                          onClick={() => handleOpenPreview(form)}
                          className="bg-emerald-700 text-white hover:bg-emerald-800 h-10 px-5 rounded-xl text-xs md:text-sm font-bold transition-all flex items-center gap-2 shadow-xs cursor-pointer active:scale-95"
                        >
                          <span className="material-symbols-outlined text-[18px]">download</span>
                          Tải xuống (.doc)
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Right Sidebar: Quick Actions */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-xs space-y-4">
              <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-amber-700">verified</span>
                Hỗ Trợ Pháp Lý Kèm Theo
              </h3>
              <div className="space-y-3">
                <Link
                  href="/ai-chatbot"
                  className="flex items-center gap-3 p-3.5 bg-slate-50 border border-slate-200 rounded-2xl hover:border-amber-500 hover:bg-amber-50/40 transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-xl">smart_toy</span>
                  </div>
                  <div>
                    <div className="text-xs md:text-sm font-bold text-slate-900">Trợ Lý Pháp Lý AI (24/7)</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">Hỏi đáp &amp; hướng dẫn điền đơn tự động</div>
                  </div>
                </Link>

                <Link
                  href="/appointment"
                  className="flex items-center gap-3 p-3.5 bg-slate-50 border border-slate-200 rounded-2xl hover:border-[#641D06] hover:bg-amber-50/40 transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-rose-100 text-[#641D06] flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-xl">gavel</span>
                  </div>
                  <div>
                    <div className="text-xs md:text-sm font-bold text-slate-900">Luật Sư Soạn Thảo Riêng</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">Đặt lịch tư vấn trực tiếp 1:1</div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function AIFormLibrary() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50 py-12 text-center text-slate-500">Đang tải kho biểu mẫu...</div>}>
      <AIFormLibraryContent />
    </Suspense>
  );
}
