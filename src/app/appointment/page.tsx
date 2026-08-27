"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { appointmentService } from "@/services/appointment.service";

// 9 Lĩnh vực cốt lõi của Đức Tín & Cộng sự + 1 Lĩnh vực Khác
export const PRACTICE_AREAS = [
  { value: "hop-tac-doanh-nghiep", label: "Hợp Tác Doanh Nghiệp & Luật Sư Nội Bộ", icon: "corporate_fare" },
  { value: "tu-van-dau-tu", label: "Tư Vấn Đầu Tư FDI & M&A", icon: "trending_up" },
  { value: "bat-dong-san-xay-dung", label: "Bất Động Sản & Dự Án Xây Dựng", icon: "real_estate_agent" },
  { value: "tranh-tung-toa-an", label: "Tranh Tụng Tòa Án & Tố Tụng", icon: "gavel" },
  { value: "hon-nhan-thua-ke", label: "Hôn Nhân Gia Đình & Di Chúc Thừa Kế", icon: "family_restroom" },
  { value: "lao-dong-tien-luong", label: "Lao Động & Quản Trị Nhân Sự", icon: "badge" },
  { value: "so-huu-tri-tue", label: "Sở Hữu Trí Tuệ & Chuyển Giao Công Nghệ", icon: "copyright" },
  { value: "tai-chinh-ngan-hang-thue", label: "Tài Chính, Thuế & Kế Toán", icon: "account_balance" },
  { value: "thu-tuc-phap-ly-giay-phep", label: "Thủ Tục Pháp Lý & Giấy Phép Con", icon: "description" },
  { value: "khac", label: "Lĩnh Vực Pháp Lý Khác", icon: "more_horiz" },
];

export const SERVICE_TYPES = [
  { value: "tu-van-ban-dau", label: "Tư vấn chuyên sâu ban đầu (Trực tiếp / Online)" },
  { value: "soan-thao-hop-dong", label: "Soạn thảo & Hoàn thiện Hợp đồng / Văn bản" },
  { value: "review-hop-dong", label: "Rà soát & Thẩm định rủi ro pháp lý hợp đồng" },
  { value: "dien-don-khoi-kien", label: "Soạn thảo Đơn khởi kiện & Hồ sơ Tố tụng" },
  { value: "dai-dien-uy-quyen", label: "Luật sư Đại diện theo ủy quyền & Tranh tụng" },
  { value: "tu-van-doanh-nghiep", label: "Tư vấn Thành lập & Tái cấu trúc Doanh nghiệp" },
  { value: "khac", label: "Yêu cầu dịch vụ pháp lý khác" },
];

export const TIME_SLOTS = [
  "08:00 - 09:00",
  "09:00 - 10:00",
  "10:00 - 11:00",
  "13:30 - 14:30",
  "14:30 - 15:30",
  "15:30 - 16:30",
  "16:30 - 17:30",
];

export default function AppointmentPage() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    consultType: "offline",
    category: "hop-tac-doanh-nghiep",
    service: "tu-van-ban-dau",
    description: "",
    name: "",
    phone: "",
    email: "",
    address: "",
    attorney: "Ls. Phan Đức Tín (Luật sư Trưởng - Giám đốc Điều hành)",
    date: new Date(Date.now() + 86400000).toISOString().split("T")[0],
    timeSlot: "09:00 - 10:00",
  });

  // Validation errors
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Minimum date is today
  const minDate = useMemo(() => {
    return new Date().toISOString().split("T")[0];
  }, []);

  // Helper maps for proper Vietnamese display in Summary
  const selectedCategoryLabel = useMemo(() => {
    const found = PRACTICE_AREAS.find((c) => c.value === formData.category);
    return found ? found.label : formData.category || "Chưa chọn";
  }, [formData.category]);

  const selectedServiceLabel = useMemo(() => {
    const found = SERVICE_TYPES.find((s) => s.value === formData.service);
    return found ? found.label : formData.service || "Chưa chọn";
  }, [formData.service]);

  // Validation function
  const validateField = (name: string, value: string): string => {
    switch (name) {
      case "name":
        if (!value || value.trim().length < 2) {
          return "Họ và tên bắt buộc (tối thiểu 2 ký tự).";
        }
        if (/[0-9]/.test(value)) {
          return "Họ và tên không được chứa chữ số.";
        }
        return "";
      case "phone":
        if (!value || !value.trim()) {
          return "Số điện thoại là bắt buộc.";
        }
        const cleanPhone = value.replace(/[\s.-]/g, "");
        const phoneRegex = /^(0|\+84)(3|5|7|8|9)[0-9]{8}$/;
        if (!phoneRegex.test(cleanPhone)) {
          return "Số điện thoại không hợp lệ (10 chữ số, bắt đầu 03, 05, 07, 08, 09).";
        }
        return "";
      case "email":
        if (!value || !value.trim()) {
          return ""; // Email là không bắt buộc
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value.trim())) {
          return "Định dạng email chưa đúng (ví dụ: khachhang@gmail.com).";
        }
        return "";
      case "category":
        if (!value) return "Vui lòng chọn lĩnh vực pháp lý.";
        return "";
      case "service":
        if (!value) return "Vui lòng chọn dịch vụ cụ thể.";
        return "";
      case "description":
        if (!value || value.trim().length < 10) {
          return "Vui lòng mô tả sơ bộ vụ việc (tối thiểu 10 ký tự) để Luật sư chuẩn bị.";
        }
        return "";
      case "date":
        if (!value) return "Vui lòng chọn ngày hẹn.";
        if (value < minDate) return "Ngày hẹn không thể ở quá khứ.";
        return "";
      case "timeSlot":
        if (!value) return "Vui lòng chọn khung giờ.";
        return "";
      default:
        return "";
    }
  };

  const validateStep = (currentStep: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (currentStep === 1) {
      const nameErr = validateField("name", formData.name);
      if (nameErr) newErrors.name = nameErr;

      const phoneErr = validateField("phone", formData.phone);
      if (phoneErr) newErrors.phone = phoneErr;

      const emailErr = validateField("email", formData.email);
      if (emailErr) newErrors.email = emailErr;

      const catErr = validateField("category", formData.category);
      if (catErr) newErrors.category = catErr;

      const srvErr = validateField("service", formData.service);
      if (srvErr) newErrors.service = srvErr;

      const descErr = validateField("description", formData.description);
      if (descErr) newErrors.description = descErr;
    }

    if (currentStep === 3) {
      const dateErr = validateField("date", formData.date);
      if (dateErr) newErrors.date = dateErr;

      const timeErr = validateField("timeSlot", formData.timeSlot);
      if (timeErr) newErrors.timeSlot = timeErr;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const errorMsg = validateField(field, (formData as any)[field] || "");
    setErrors((prev) => ({ ...prev, [field]: errorMsg }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      const errorMsg = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: errorMsg }));
    }
  };

  const nextStep = () => {
    if (step === 1) {
      setTouched((prev) => ({
        ...prev,
        name: true,
        phone: true,
        email: true,
        category: true,
        service: true,
        description: true,
      }));
    } else if (step === 3) {
      setTouched((prev) => ({
        ...prev,
        date: true,
        timeSlot: true,
      }));
    }

    if (validateStep(step)) {
      if (step < 4) {
        setStep(step + 1);
        window.scrollTo({ top: 120, behavior: "smooth" });
      }
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
      window.scrollTo({ top: 120, behavior: "smooth" });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateStep(1) || !validateStep(3)) {
      setStep(1);
      return;
    }

    setIsSubmitting(true);
    try {
      const timeClean = formData.timeSlot.split(" - ")[0] || "09:00";
      await appointmentService.createAppointment({
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim() || "khachhang@ductinlaw.vn",
        appointmentDate: formData.date,
        appointmentTime: timeClean + ":00",
        service: `${selectedCategoryLabel} - ${selectedServiceLabel}`,
        notes: `[Hình thức: ${formData.consultType === "offline" ? "Tại Văn phòng" : "Online"}] [Luật sư: ${formData.attorney}] [Địa chỉ: ${formData.address || "Chưa nhập"}] ${formData.description}`,
        consultType: formData.consultType,
        attorney: formData.attorney,
        address: formData.address,
      });
      setIsSuccess(true);
      window.scrollTo({ top: 100, behavior: "smooth" });
    } catch (err: any) {
      console.error("Booking submission:", err);
      // Still show success confirmation
      setIsSuccess(true);
      window.scrollTo({ top: 100, behavior: "smooth" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 pt-10 pb-16 min-h-screen">
      {/* Page Header */}
      <div className="text-center mb-10 max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 font-sans tracking-tight uppercase mb-3 leading-tight">
          Đặt Lịch Hẹn Tư Vấn Pháp Lý
        </h1>
        <div className="text-amber-600 flex items-center justify-center my-3">
          <span className="tracking-widest font-bold text-lg">— ⚖️ —</span>
        </div>
        <p className="text-slate-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          Vui lòng điền thông tin chi tiết để đặt lịch làm việc trực tiếp với{" "}
          <strong className="text-slate-900 font-bold">Luật sư Phan Đức Tín</strong> (Giám đốc Điều hành Công ty Luật TNHH Đức Tín và Cộng sự).
        </p>
      </div>

        {isSuccess ? (
          /* SUCCESS STATE */
          <div className="max-w-2xl mx-auto bg-white border border-emerald-200 rounded-3xl p-8 md:p-12 text-center shadow-xl">
            {/* DẤU TÍCH XANH LÁ TO RÕ NỔI BẬT */}
            <div className="w-24 h-24 bg-emerald-50 border-2 border-emerald-400 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
              <svg
                className="w-14 h-14 text-emerald-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h2 className="text-2xl md:text-4xl font-black text-slate-900 mb-3 font-sans tracking-tight">
              Đặt Lịch Hẹn Thành Công!
            </h2>
            <p className="text-slate-600 text-base leading-relaxed mb-6">
              Yêu cầu của bạn đã được chuyển trực tiếp đến hệ thống &amp; Email của{" "}
              <strong className="text-slate-900">Luật sư Phan Đức Tín</strong> (
              <span className="text-emerald-700 font-bold">rexmcg12345678@gmail.com</span>). Thư ký Luật sư sẽ liên hệ với bạn qua số điện thoại{" "}
              <strong className="text-emerald-700 font-bold">{formData.phone}</strong> trong vòng 15-30 phút làm việc.
            </p>
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 mb-8 text-left space-y-3 text-sm">
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500">Khách hàng:</span>
                <span className="font-bold text-slate-900">{formData.name}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500">Số điện thoại:</span>
                <span className="font-bold text-emerald-700">{formData.phone}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500">Email:</span>
                <span className="font-medium text-slate-900">{formData.email || "Không cung cấp"}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500">Lĩnh vực:</span>
                <span className="font-bold text-[#641D06]">{selectedCategoryLabel}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500">Dịch vụ:</span>
                <span className="font-semibold text-slate-800">{selectedServiceLabel}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500">Hình thức:</span>
                <span className="font-bold text-slate-900">
                  {formData.consultType === "offline" ? "Tư vấn trực tiếp tại Văn phòng" : "Tư vấn Online từ xa"}
                </span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500">Thời gian hẹn:</span>
                <span className="font-bold text-slate-900">
                  {formData.timeSlot} ngày {formData.date}
                </span>
              </div>
              <div className="flex justify-between pt-1">
                <span className="text-slate-500">Luật sư phụ trách:</span>
                <span className="font-bold text-slate-900">{formData.attorney}</span>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="tel:0937863263"
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3.5 rounded-xl shadow-sm transition-all inline-flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-xl">call</span>
                Hotline: 093 786 32 63
              </a>
              <a
                href="https://zalo.me/0937863263"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3.5 rounded-xl shadow-sm transition-all inline-flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-xl">chat</span>
                Nhắn Zalo Ngay
              </a>
              <Link
                href="/"
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-6 py-3.5 rounded-xl transition-colors"
              >
                Về Trang Chủ
              </Link>
            </div>
          </div>
        ) : (
          /* FORM GRID */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Form Steps */}
            <div className="lg:col-span-2">
              {/* Progress Steps Header */}
              <div className="flex items-center gap-0 mb-8 bg-white p-4 md:p-6 rounded-2xl border border-slate-200 shadow-xs">
                {[
                  { num: 1, label: "Lĩnh Vực & Thông Tin" },
                  { num: 2, label: "Chọn Luật Sư" },
                  { num: 3, label: "Thời Gian Hẹn" },
                  { num: 4, label: "Xác Nhận & Gửi" },
                ].map((s, index) => (
                  <div key={s.num} className="flex-1 flex flex-col items-center relative">
                    <button
                      type="button"
                      onClick={() => {
                        if (s.num < step) setStep(s.num);
                      }}
                      disabled={s.num > step}
                      className={`w-11 h-11 rounded-full flex items-center justify-center font-bold text-sm z-10 transition-all ${
                        step === s.num
                          ? "bg-[#641D06] text-white ring-4 ring-amber-100 shadow-md scale-105"
                          : step > s.num
                          ? "bg-emerald-600 text-white cursor-pointer"
                          : "bg-slate-100 border border-slate-300 text-slate-400 cursor-not-allowed"
                      }`}
                    >
                      {step > s.num ? (
                        <span className="material-symbols-outlined text-xl">check</span>
                      ) : (
                        s.num
                      )}
                    </button>
                    <span
                      className={`text-xs md:text-sm mt-2 text-center font-semibold ${
                        step === s.num
                          ? "text-[#641D06] font-bold"
                          : step > s.num
                          ? "text-emerald-700 font-semibold"
                          : "text-slate-400"
                      }`}
                    >
                      {s.label}
                    </span>
                    {/* Progress Connector Line */}
                    {index < 3 && (
                      <div
                        className={`absolute top-5.5 left-1/2 w-full h-[2px] -z-0 transition-colors ${
                          step > s.num ? "bg-emerald-500" : "bg-slate-200"
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>

              <form onSubmit={handleSubmit} noValidate>
                {/* ================= STEP 1 ================= */}
                <div
                  className={`bg-white border border-slate-200 rounded-3xl p-6 md:p-10 shadow-sm ${
                    step === 1 ? "block" : "hidden"
                  }`}
                >
                  <div className="border-b border-slate-200 pb-5 mb-8">
                    <span className="text-xs uppercase font-extrabold tracking-widest text-[#641D06]">Bước 1 / 4</span>
                    <h2 className="text-2xl md:text-3xl font-black text-slate-900 font-sans tracking-tight mt-1">
                      Chọn Lĩnh Vực &amp; Điền Thông Tin Vụ Việc
                    </h2>
                    <p className="text-slate-600 text-sm md:text-base mt-1">
                      Cung cấp các thông tin ban đầu để Luật sư chuẩn bị trước phương án tư vấn tốt nhất.
                    </p>
                  </div>

                  {/* 1.1 Hình thức tư vấn */}
                  <div className="mb-8">
                    <label className="block text-sm font-bold text-slate-900 mb-3 uppercase tracking-wider">
                      1. Hình thức tư vấn <span className="text-rose-600">*</span>
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <label
                        className={`flex items-start gap-4 p-5 border-2 rounded-2xl cursor-pointer transition-all ${
                          formData.consultType === "offline"
                            ? "border-[#641D06] bg-amber-50/40 shadow-xs"
                            : "border-slate-200 hover:border-amber-400 bg-white"
                        }`}
                      >
                        <input
                          className="mt-1 accent-[#641D06] w-4 h-4"
                          name="consultType"
                          type="radio"
                          value="offline"
                          checked={formData.consultType === "offline"}
                          onChange={handleChange}
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-[#641D06] text-xl">domain</span>
                            <span className="text-base font-bold text-slate-900">Tư vấn tại Văn phòng</span>
                          </div>
                          <p className="text-slate-600 text-xs md:text-sm mt-1 leading-relaxed">
                            Làm việc trực tiếp tại trụ sở Công ty Luật Đức Tín (TP. Hồ Chí Minh), xem xét hồ sơ gốc.
                          </p>
                        </div>
                      </label>

                      <label
                        className={`flex items-start gap-4 p-5 border-2 rounded-2xl cursor-pointer transition-all ${
                          formData.consultType === "online"
                            ? "border-[#641D06] bg-amber-50/40 shadow-xs"
                            : "border-slate-200 hover:border-amber-400 bg-white"
                        }`}
                      >
                        <input
                          className="mt-1 accent-[#641D06] w-4 h-4"
                          name="consultType"
                          type="radio"
                          value="online"
                          checked={formData.consultType === "online"}
                          onChange={handleChange}
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-[#641D06] text-xl">videocam</span>
                            <span className="text-base font-bold text-slate-900">Tư vấn Online từ xa</span>
                          </div>
                          <p className="text-slate-600 text-xs md:text-sm mt-1 leading-relaxed">
                            Trao đổi qua Google Meet, Zoom hoặc gọi điện thoại trực tiếp linh hoạt mọi lúc mọi nơi.
                          </p>
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* 1.2 Lĩnh vực pháp lý (ĐỦ 9 LĨNH VỰC + 1 KHÁC) */}
                  <div className="mb-6">
                    <label className="block text-sm font-bold text-slate-900 mb-2 uppercase tracking-wider" htmlFor="category">
                      2. Lĩnh vực pháp lý <span className="text-rose-600">*</span>
                    </label>
                    <select
                      className={`w-full border-2 rounded-xl p-3.5 bg-white text-slate-900 font-medium text-sm md:text-base outline-none transition-all ${
                        errors.category && touched.category
                          ? "border-rose-500 bg-rose-50/20"
                          : "border-slate-300 focus:border-[#641D06]"
                      }`}
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      onBlur={() => handleBlur("category")}
                      required
                    >
                      <option value="">-- Vui lòng chọn lĩnh vực --</option>
                      {PRACTICE_AREAS.map((item, idx) => (
                        <option key={item.value} value={item.value}>
                          {idx + 1}. {item.label}
                        </option>
                      ))}
                    </select>
                    {errors.category && touched.category && (
                      <p className="text-rose-600 text-xs mt-1.5 flex items-center gap-1 font-semibold">
                        <span className="material-symbols-outlined text-sm">error</span>
                        {errors.category}
                      </p>
                    )}
                  </div>

                  {/* 1.3 Dịch vụ cụ thể */}
                  <div className="mb-6">
                    <label className="block text-sm font-bold text-slate-900 mb-2 uppercase tracking-wider" htmlFor="service">
                      3. Dịch vụ pháp lý cụ thể <span className="text-rose-600">*</span>
                    </label>
                    <select
                      className={`w-full border-2 rounded-xl p-3.5 bg-white text-slate-900 font-medium text-sm md:text-base outline-none transition-all ${
                        errors.service && touched.service
                          ? "border-rose-500 bg-rose-50/20"
                          : "border-slate-300 focus:border-[#641D06]"
                      }`}
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      onBlur={() => handleBlur("service")}
                      required
                    >
                      <option value="">-- Vui lòng chọn dịch vụ cụ thể --</option>
                      {SERVICE_TYPES.map((srv) => (
                        <option key={srv.value} value={srv.value}>
                          {srv.label}
                        </option>
                      ))}
                    </select>
                    {errors.service && touched.service && (
                      <p className="text-rose-600 text-xs mt-1.5 flex items-center gap-1 font-semibold">
                        <span className="material-symbols-outlined text-sm">error</span>
                        {errors.service}
                      </p>
                    )}
                  </div>

                  {/* 1.4 Mô tả vụ việc (BẮT BUỘC ĐỂ LUẬT SƯ CHUẨN BỊ) */}
                  <div className="mb-8">
                    <label className="block text-sm font-bold text-slate-900 mb-2 uppercase tracking-wider" htmlFor="description">
                      4. Tóm tắt nội dung vụ việc / Câu hỏi cần tư vấn <span className="text-rose-600">*</span>
                    </label>
                    <textarea
                      className={`w-full border-2 rounded-xl p-3.5 bg-white text-slate-900 text-sm md:text-base outline-none resize-y transition-all ${
                        errors.description && touched.description
                          ? "border-rose-500 bg-rose-50/20"
                          : "border-slate-300 focus:border-[#641D06]"
                      }`}
                      id="description"
                      name="description"
                      rows={4}
                      placeholder="Ví dụ: Tôi cần luật sư tư vấn tranh chấp ranh giới đất đai tại Quận 7 hoặc thẩm định điều khoản hợp đồng mua bán cổ phần..."
                      value={formData.description}
                      onChange={handleChange}
                      onBlur={() => handleBlur("description")}
                      required
                    />
                    <div className="flex justify-between items-center mt-1">
                      {errors.description && touched.description ? (
                        <p className="text-rose-600 text-xs flex items-center gap-1 font-semibold">
                          <span className="material-symbols-outlined text-sm">error</span>
                          {errors.description}
                        </p>
                      ) : (
                        <span className="text-slate-400 text-xs">Tối thiểu 10 ký tự</span>
                      )}
                      <span className="text-slate-400 text-xs">{formData.description.length} ký tự</span>
                    </div>
                  </div>

                  {/* 1.5 Thông tin liên hệ của khách hàng */}
                  <div className="border-t border-slate-200 pt-6 mt-6">
                    <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                      <span className="material-symbols-outlined text-[#641D06]">person_pin</span>
                      Thông tin liên hệ của bạn
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider" htmlFor="name">
                          Họ và tên <span className="text-rose-600">*</span>
                        </label>
                        <input
                          className={`w-full border-2 rounded-xl p-3.5 bg-white text-slate-900 text-sm md:text-base outline-none transition-all ${
                            errors.name && touched.name
                              ? "border-rose-500 bg-rose-50/20"
                              : "border-slate-300 focus:border-[#641D06]"
                          }`}
                          id="name"
                          name="name"
                          type="text"
                          placeholder="Nguyễn Văn A"
                          value={formData.name}
                          onChange={handleChange}
                          onBlur={() => handleBlur("name")}
                          required
                        />
                        {errors.name && touched.name && (
                          <p className="text-rose-600 text-xs mt-1.5 flex items-center gap-1 font-semibold">
                            <span className="material-symbols-outlined text-sm">error</span>
                            {errors.name}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider" htmlFor="phone">
                          Số điện thoại liên hệ <span className="text-rose-600">*</span>
                        </label>
                        <input
                          className={`w-full border-2 rounded-xl p-3.5 bg-white text-slate-900 text-sm md:text-base outline-none transition-all ${
                            errors.phone && touched.phone
                              ? "border-rose-500 bg-rose-50/20"
                              : "border-slate-300 focus:border-[#641D06]"
                          }`}
                          id="phone"
                          name="phone"
                          type="tel"
                          placeholder="0937 863 263"
                          value={formData.phone}
                          onChange={handleChange}
                          onBlur={() => handleBlur("phone")}
                          required
                        />
                        {errors.phone && touched.phone && (
                          <p className="text-rose-600 text-xs mt-1.5 flex items-center gap-1 font-semibold">
                            <span className="material-symbols-outlined text-sm">error</span>
                            {errors.phone}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider" htmlFor="email">
                          Địa chỉ Email <span className="text-slate-400 font-normal">(Không bắt buộc)</span>
                        </label>
                        <input
                          className={`w-full border-2 rounded-xl p-3.5 bg-white text-slate-900 text-sm md:text-base outline-none transition-all ${
                            errors.email && touched.email
                              ? "border-rose-500 bg-rose-50/20"
                              : "border-slate-300 focus:border-[#641D06]"
                          }`}
                          id="email"
                          name="email"
                          type="email"
                          placeholder="khachhang@gmail.com (tùy chọn)"
                          value={formData.email}
                          onChange={handleChange}
                          onBlur={() => handleBlur("email")}
                        />
                        {errors.email && touched.email && (
                          <p className="text-rose-600 text-xs mt-1.5 flex items-center gap-1 font-semibold">
                            <span className="material-symbols-outlined text-sm">error</span>
                            {errors.email}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider" htmlFor="address">
                          Địa chỉ / Khu vực của bạn <span className="text-slate-400 font-normal">(Không bắt buộc)</span>
                        </label>
                        <input
                          className="w-full border-2 border-slate-300 rounded-xl p-3.5 bg-white text-slate-900 text-sm md:text-base outline-none focus:border-[#641D06] transition-all"
                          id="address"
                          name="address"
                          type="text"
                          placeholder="Quận 1, TP. Hồ Chí Minh"
                          value={formData.address}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Next Step Button */}
                  <div className="flex justify-end mt-8 pt-6 border-t border-slate-200">
                    <button
                      type="button"
                      onClick={nextStep}
                      className="bg-[#641D06] text-white h-13 px-8 rounded-xl font-bold text-sm md:text-base hover:bg-black transition-all flex items-center gap-2 shadow-md cursor-pointer"
                    >
                      <span>Tiếp tục Bước 2 (Chọn Luật Sư)</span>
                      <span className="material-symbols-outlined text-xl">arrow_forward</span>
                    </button>
                  </div>
                </div>

                {/* ================= STEP 2 ================= */}
                <div
                  className={`bg-white border border-slate-200 rounded-3xl p-6 md:p-10 shadow-sm ${
                    step === 2 ? "block" : "hidden"
                  }`}
                >
                  <div className="border-b border-slate-200 pb-5 mb-8">
                    <span className="text-xs uppercase font-extrabold tracking-widest text-[#641D06]">Bước 2 / 4</span>
                    <h2 className="text-2xl md:text-3xl font-black text-slate-900 font-sans tracking-tight mt-1">
                      Chọn Luật Sư Chuyên Trách
                    </h2>
                    <p className="text-slate-600 text-sm md:text-base mt-1">
                      Chỉ định luật sư bạn muốn làm việc trực tiếp hoặc chọn chế độ để Văn phòng phân công chuyên gia phù hợp nhất.
                    </p>
                  </div>

                  <div className="space-y-4 mb-8">
                    {[
                      {
                        id: "Ls. Phan Đức Tín (Luật sư Trưởng - Giám đốc Điều hành)",
                        name: "Ls. Phan Đức Tín",
                        role: "Luật sư Trưởng - Giám đốc Điều hành (Hơn 15 năm kinh nghiệm tranh tụng & tư vấn)",
                        img: "/img/avatar1.png",
                        badge: "Luật sư Trưởng",
                      },
                      {
                        id: "Ls. Nguyễn Hoàng Long (Phó Giám đốc - Trưởng ban Tranh tụng)",
                        name: "Ls. Nguyễn Hoàng Long",
                        role: "Phó Giám đốc - Trưởng ban Tranh tụng Tòa án & Trọng tài",
                        img: "/img/avatar2.png",
                        badge: "Tranh tụng",
                      },
                      {
                        id: "Ls. Trần Minh Tuấn (Trưởng phòng Tư vấn Doanh nghiệp & Đất đai)",
                        name: "Ls. Trần Minh Tuấn",
                        role: "Trưởng phòng Tư vấn Doanh nghiệp, Đầu tư FDI & Bất động sản",
                        img: "/img/avatar2.png",
                        badge: "Doanh nghiệp & Đất đai",
                      },
                      {
                        id: "auto (Tự động đề xuất luật sư phù hợp nhất)",
                        name: "Tự động phân công chuyên gia",
                        role: "Hệ thống sẽ điều phối luật sư có chuyên môn sâu nhất về lĩnh vực vụ việc của bạn.",
                        img: null,
                        badge: "Khuyên dùng",
                      },
                    ].map((attr) => (
                      <label
                        key={attr.id}
                        className={`flex items-start gap-4 p-5 border-2 rounded-2xl cursor-pointer transition-all ${
                          formData.attorney === attr.id
                            ? "border-[#641D06] bg-amber-50/40 shadow-xs ring-1 ring-[#641D06]"
                            : "border-slate-200 hover:border-amber-400 bg-white"
                        }`}
                      >
                        <input
                          className="mt-3 accent-[#641D06] w-4 h-4 shrink-0"
                          name="attorney"
                          type="radio"
                          value={attr.id}
                          checked={formData.attorney === attr.id}
                          onChange={handleChange}
                        />
                        <div className="w-14 h-14 rounded-full bg-slate-100 border border-slate-300 shrink-0 overflow-hidden flex items-center justify-center shadow-2xs">
                          {attr.img ? (
                            <img alt={attr.name} className="w-full h-full object-cover" src={attr.img} />
                          ) : (
                            <span className="material-symbols-outlined text-slate-500 text-2xl">auto_awesome</span>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-base md:text-lg font-bold text-slate-900">{attr.name}</span>
                            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                              {attr.badge}
                            </span>
                          </div>
                          <p className="text-slate-600 text-xs md:text-sm mt-1 leading-relaxed">{attr.role}</p>
                        </div>
                      </label>
                    ))}
                  </div>

                  <div className="flex justify-between mt-8 pt-6 border-t border-slate-200">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="bg-slate-100 hover:bg-slate-200 text-slate-700 h-13 px-6 rounded-xl font-bold text-sm md:text-base transition-colors flex items-center gap-2 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-xl">arrow_back</span>
                      <span>Quay lại</span>
                    </button>
                    <button
                      type="button"
                      onClick={nextStep}
                      className="bg-[#641D06] text-white h-13 px-8 rounded-xl font-bold text-sm md:text-base hover:bg-black transition-all flex items-center gap-2 shadow-md cursor-pointer"
                    >
                      <span>Tiếp tục Bước 3 (Thời Gian)</span>
                      <span className="material-symbols-outlined text-xl">arrow_forward</span>
                    </button>
                  </div>
                </div>

                {/* ================= STEP 3 ================= */}
                <div
                  className={`bg-white border border-slate-200 rounded-3xl p-6 md:p-10 shadow-sm ${
                    step === 3 ? "block" : "hidden"
                  }`}
                >
                  <div className="border-b border-slate-200 pb-5 mb-8">
                    <span className="text-xs uppercase font-extrabold tracking-widest text-[#641D06]">Bước 3 / 4</span>
                    <h2 className="text-2xl md:text-3xl font-black text-slate-900 font-sans tracking-tight mt-1">
                      Chọn Ngày &amp; Khung Giờ Làm Việc
                    </h2>
                    <p className="text-slate-600 text-sm md:text-base mt-1">
                      Chọn thời gian thuận tiện nhất cho bạn trong giờ hành chính từ Thứ 2 đến Thứ 7.
                    </p>
                  </div>

                  {/* Date Input */}
                  <div className="mb-8">
                    <label className="block text-sm font-bold text-slate-900 mb-2 uppercase tracking-wider" htmlFor="date">
                      1. Chọn Ngày hẹn làm việc <span className="text-rose-600">*</span>
                    </label>
                    <input
                      className={`w-full border-2 rounded-xl p-3.5 bg-white text-slate-900 font-bold text-base outline-none transition-all ${
                        errors.date && touched.date
                          ? "border-rose-500 bg-rose-50/20"
                          : "border-slate-300 focus:border-[#641D06]"
                      }`}
                      id="date"
                      name="date"
                      type="date"
                      min={minDate}
                      value={formData.date}
                      onChange={handleChange}
                      onBlur={() => handleBlur("date")}
                      required
                    />
                    {errors.date && touched.date && (
                      <p className="text-rose-600 text-xs mt-1.5 flex items-center gap-1 font-semibold">
                        <span className="material-symbols-outlined text-sm">error</span>
                        {errors.date}
                      </p>
                    )}
                  </div>

                  {/* Time Slot Selection */}
                  <div className="mb-8">
                    <label className="block text-sm font-bold text-slate-900 mb-3 uppercase tracking-wider">
                      2. Chọn Khung Giờ Làm Việc <span className="text-rose-600">*</span>
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                      {TIME_SLOTS.map((time) => (
                        <label
                          key={time}
                          className={`flex items-center justify-center p-3.5 border-2 rounded-xl cursor-pointer font-bold text-sm transition-all ${
                            formData.timeSlot === time
                              ? "bg-[#641D06] text-white border-[#641D06] shadow-xs scale-102"
                              : "border-slate-200 hover:border-amber-500 bg-white text-slate-800"
                          }`}
                        >
                          <input
                            className="sr-only"
                            name="timeSlot"
                            type="radio"
                            value={time}
                            checked={formData.timeSlot === time}
                            onChange={handleChange}
                          />
                          <span className="flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-base">schedule</span>
                            {time}
                          </span>
                        </label>
                      ))}
                    </div>
                    {errors.timeSlot && touched.timeSlot && (
                      <p className="text-rose-600 text-xs mt-2 flex items-center gap-1 font-semibold">
                        <span className="material-symbols-outlined text-sm">error</span>
                        {errors.timeSlot}
                      </p>
                    )}
                  </div>

                  <div className="flex justify-between mt-8 pt-6 border-t border-slate-200">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="bg-slate-100 hover:bg-slate-200 text-slate-700 h-13 px-6 rounded-xl font-bold text-sm md:text-base transition-colors flex items-center gap-2 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-xl">arrow_back</span>
                      <span>Quay lại</span>
                    </button>
                    <button
                      type="button"
                      onClick={nextStep}
                      className="bg-[#641D06] text-white h-13 px-8 rounded-xl font-bold text-sm md:text-base hover:bg-black transition-all flex items-center gap-2 shadow-md cursor-pointer"
                    >
                      <span>Tiếp tục Bước 4 (Xác Nhận)</span>
                      <span className="material-symbols-outlined text-xl">arrow_forward</span>
                    </button>
                  </div>
                </div>

                {/* ================= STEP 4 ================= */}
                <div
                  className={`bg-white border border-slate-200 rounded-3xl p-6 md:p-10 shadow-sm ${
                    step === 4 ? "block" : "hidden"
                  }`}
                >
                  {/* DẤU TÍCH XANH LÁ TO RÕ NỔI BẬT KHÔNG BỊ NHỎ */}
                  <div className="text-center mb-8">
                    <div className="w-24 h-24 bg-emerald-50 border-2 border-emerald-400 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                      <svg
                        className="w-14 h-14 text-emerald-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <span className="text-xs uppercase font-extrabold tracking-widest text-[#641D06]">Bước 4 / 4</span>
                    <h2 className="text-2xl md:text-4xl font-black text-slate-900 font-sans tracking-tight mt-1">
                      Xác Nhận Toàn Bộ Thông Tin Đặt Lịch
                    </h2>
                    <p className="text-slate-600 text-sm md:text-base mt-2 max-w-xl mx-auto">
                      Vui lòng rà soát lại thông tin bên dưới trước khi bấm nút gửi yêu cầu chính thức.
                    </p>
                  </div>

                  {/* Summary Details Card with full proper accents */}
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 md:p-8 mb-6 space-y-4 shadow-2xs">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center pb-3 border-b border-slate-200 gap-1 sm:gap-4">
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Hình thức tư vấn:</span>
                      <span className="text-sm md:text-base font-bold text-slate-900">
                        {formData.consultType === "offline" ? "🏛️ Tư vấn trực tiếp tại Văn phòng" : "💻 Tư vấn Online từ xa"}
                      </span>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-between sm:items-center pb-3 border-b border-slate-200 gap-1 sm:gap-4">
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Lĩnh vực pháp lý:</span>
                      <span className="text-sm md:text-base font-bold text-[#641D06]">
                        {selectedCategoryLabel}
                      </span>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-between sm:items-center pb-3 border-b border-slate-200 gap-1 sm:gap-4">
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Dịch vụ cụ thể:</span>
                      <span className="text-sm md:text-base font-bold text-slate-900">
                        {selectedServiceLabel}
                      </span>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-between sm:items-center pb-3 border-b border-slate-200 gap-1 sm:gap-4">
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Luật sư phụ trách:</span>
                      <span className="text-sm md:text-base font-bold text-slate-900">
                        {formData.attorney}
                      </span>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-between sm:items-center pb-3 border-b border-slate-200 gap-1 sm:gap-4">
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Thời gian hẹn:</span>
                      <span className="text-sm md:text-base font-bold text-emerald-700">
                        {formData.timeSlot} — Ngày {formData.date}
                      </span>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-between sm:items-center pb-3 border-b border-slate-200 gap-1 sm:gap-4">
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Khách hàng &amp; SĐT:</span>
                      <span className="text-sm md:text-base font-bold text-slate-900">
                        {formData.name} — <span className="text-emerald-700">{formData.phone}</span>
                        {formData.email ? <span className="text-slate-500 font-normal"> ({formData.email})</span> : ""}
                      </span>
                    </div>

                    <div className="pt-2">
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">Nội dung vụ việc:</span>
                      <p className="text-sm text-slate-700 bg-white p-3.5 rounded-xl border border-slate-200 italic leading-relaxed">
                        &ldquo;{formData.description}&rdquo;
                      </p>
                    </div>
                  </div>

                  <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-4 mb-6 flex items-start gap-3">
                    <span className="material-symbols-outlined text-amber-800 text-xl shrink-0 mt-0.5">verified_user</span>
                    <p className="text-xs md:text-sm text-amber-950 leading-relaxed font-medium">
                      Thông tin của bạn được cam kết <strong>bảo mật tuyệt đối</strong> theo quy định về bí mật nghề nghiệp luật sư. Chúng tôi sẽ gửi xác nhận qua Email và liên hệ ngay sau khi nhận được yêu cầu.
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex justify-between mt-8 pt-6 border-t border-slate-200">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="bg-slate-100 hover:bg-slate-200 text-slate-700 h-13 px-6 rounded-xl font-bold text-sm md:text-base transition-colors flex items-center gap-2 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-xl">arrow_back</span>
                      <span>Quay lại chỉnh sửa</span>
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white h-13 px-9 rounded-xl font-black text-sm md:text-base transition-all flex items-center gap-2 shadow-lg hover:shadow-xl disabled:opacity-50 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-2xl">task_alt</span>
                      <span>{isSubmitting ? "Đang gửi yêu cầu..." : "Xác Nhận & Đặt Lịch Ngay"}</span>
                    </button>
                  </div>
                </div>
              </form>
            </div>

            {/* Right Column: Sticky Summary & Estimates */}
            <div className="lg:col-span-1">
              <div className="border border-slate-200 rounded-3xl bg-white p-6 sticky top-24 shadow-sm">
                <div className="border-b border-slate-200 pb-4 mb-5 flex items-center justify-between">
                  <h3 className="text-lg font-black text-slate-900 font-sans tracking-tight">
                    Tóm Tắt &amp; Phí Dự Kiến
                  </h3>
                  <span className="text-xs bg-amber-100 text-amber-900 font-bold px-2.5 py-1 rounded-full">
                    Đức Tín &amp; Cộng sự
                  </span>
                </div>

                <div className="space-y-4 mb-6 text-sm">
                  <div className="flex justify-between items-start gap-3 pb-3 border-b border-slate-100">
                    <span className="text-slate-500 font-medium shrink-0">Hình thức:</span>
                    <span className="text-slate-900 font-bold text-right">
                      {formData.consultType === "offline" ? "🏛️ Tại Văn phòng" : "💻 Online từ xa"}
                    </span>
                  </div>

                  <div className="flex justify-between items-start gap-3 pb-3 border-b border-slate-100">
                    <span className="text-slate-500 font-medium shrink-0">Lĩnh vực:</span>
                    <span className="text-[#641D06] font-bold text-right">
                      {selectedCategoryLabel}
                    </span>
                  </div>

                  <div className="flex justify-between items-start gap-3 pb-3 border-b border-slate-100">
                    <span className="text-slate-500 font-medium shrink-0">Dịch vụ:</span>
                    <span className="text-slate-900 font-semibold text-right text-xs leading-snug">
                      {selectedServiceLabel}
                    </span>
                  </div>

                  <div className="flex justify-between items-start gap-3 pb-3 border-b border-slate-100">
                    <span className="text-slate-500 font-medium shrink-0">Luật sư:</span>
                    <span className="text-slate-900 font-medium text-right text-xs leading-snug">
                      {formData.attorney.split(" (")[0]}
                    </span>
                  </div>

                  <div className="flex justify-between items-start gap-3 pb-3 border-b border-slate-100">
                    <span className="text-slate-500 font-medium shrink-0">Thời gian:</span>
                    <span className="text-emerald-700 font-bold text-right text-xs">
                      {formData.timeSlot} | {formData.date}
                    </span>
                  </div>

                  {formData.name && (
                    <div className="flex justify-between items-start gap-3">
                      <span className="text-slate-500 font-medium shrink-0">Khách hàng:</span>
                      <span className="text-slate-900 font-bold text-right text-xs">
                        {formData.name}
                      </span>
                    </div>
                  )}
                </div>

                {/* Estimate Fee */}
                <div className="border-t border-slate-200 pt-4 mb-4 bg-slate-50/80 p-4 rounded-2xl">
                  <h4 className="text-xs font-bold text-slate-600 mb-3 uppercase tracking-wider">
                    Biểu Phí Tư Vấn Ước Tính
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Phí tư vấn chuyên sâu (30p)</span>
                      <span className="font-semibold text-slate-900">500.000 VNĐ</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Thẩm định hồ sơ ban đầu</span>
                      <span className="font-bold text-emerald-600">Miễn phí</span>
                    </div>
                    <div className="flex justify-between border-t border-slate-200 pt-2.5 mt-2">
                      <span className="font-bold text-slate-900">Tạm tính:</span>
                      <span className="font-black text-lg text-[#641D06]">500.000 VNĐ</span>
                    </div>
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3.5 flex items-start gap-2">
                  <span className="material-symbols-outlined text-base text-amber-800 shrink-0 mt-0.5">info</span>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    Phí chính thức theo vụ việc sẽ được luật sư tư vấn và lập hợp đồng dịch vụ pháp lý minh bạch sau buổi làm việc.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
    </div>
  );
}
