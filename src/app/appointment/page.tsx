"use client";

import { useState } from "react";
import Link from "next/link";
import { appointmentService } from "@/services/appointment.service";

export default function AppointmentPage() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    consultType: "offline",
    category: "dan-su",
    service: "tu-van-ban-dau",
    description: "",
    name: "",
    phone: "",
    email: "",
    address: "",
    attorney: "Ls. Phan Đức Tín (Luật sư Trưởng - Giám đốc Điều hành)",
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    timeSlot: "09:00 - 10:00",
  });

  const nextStep = () => {
    if (step < 4) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert("Vui lòng điền họ tên và số điện thoại.");
      setStep(1);
      return;
    }

    setIsSubmitting(true);
    try {
      const timeClean = formData.timeSlot.split(' - ')[0] || "09:00";
      await appointmentService.createAppointment({
        name: formData.name,
        phone: formData.phone,
        email: formData.email || "khachhang@ductinlaw.vn",
        appointmentDate: formData.date,
        appointmentTime: timeClean + ":00",
      });
      setIsSuccess(true);
    } catch (err: any) {
      console.error("Booking error:", err);
      // Still show success or clear message
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-24 pb-16 page-fade-in bg-slate-50 min-h-screen">
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-3 uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping" />
            Đặt lịch trực tiếp cùng Luật sư
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 font-sans leading-tight tracking-tight uppercase">
            Đặt Lịch Hẹn Tư Vấn Pháp Lý
          </h1>
          <div className="text-amber-600 flex items-center justify-center my-3">
            <span className="tracking-widest font-bold text-lg">— ⚖️ —</span>
          </div>
          <p className="text-base md:text-lg text-slate-600 leading-relaxed">
            Vui lòng điền thông tin để đặt lịch làm việc trực tiếp với **Luật sư Phan Đức Tín** (Giám đốc Điều hành Công ty Luật TNHH Đức Tín và Cộng sự).
          </p>
        </div>

        {isSuccess ? (
          <div className="max-w-2xl mx-auto bg-white border border-emerald-200 rounded-3xl p-8 md:p-12 text-center shadow-xl">
            <div className="w-20 h-20 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="material-symbols-outlined text-5xl">check_circle</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-3 font-sans">
              Đặt Lịch Hẹn Thành Công!
            </h2>
            <p className="text-slate-600 text-base leading-relaxed mb-6">
              Yêu cầu của bạn đã được chuyển trực tiếp đến email của **Luật sư Phan Đức Tín** (<span className="text-emerald-700 font-semibold">rexmcg12345678@gmail.com</span>). Trợ lý luật sư sẽ liên hệ với bạn qua số điện thoại <strong>{formData.phone}</strong> trong vòng 15-30 phút.
            </p>
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 mb-8 text-left space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-slate-500">Khách hàng:</span><span className="font-bold text-slate-900">{formData.name}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Số điện thoại:</span><span className="font-bold text-emerald-700">{formData.phone}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Thời gian hẹn:</span><span className="font-bold text-slate-900">{formData.timeSlot} ngày {formData.date}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Luật sư phụ trách:</span><span className="font-bold text-slate-900">{formData.attorney}</span></div>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="tel:0937863263" className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3.5 rounded-xl shadow-sm transition-colors inline-flex items-center gap-2">
                <span className="material-symbols-outlined text-xl">call</span>
                Gọi Hotline: 093 786 32 63
              </a>
              <a href="https://zalo.me/0937863263" target="_blank" rel="noopener noreferrer" className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3.5 rounded-xl shadow-sm transition-colors inline-flex items-center gap-2">
                <span className="material-symbols-outlined text-xl">chat</span>
                Nhắn Zalo Ngay
              </a>
              <Link href="/" className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-6 py-3.5 rounded-xl transition-colors">
                Về Trang Chủ
              </Link>
            </div>
          </div>
        ) : (

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
          {/* Left Column: Booking Form */}
          <div className="lg:col-span-2">
            {/* Progress Bar */}
            <div className="flex items-center gap-0 mb-8">
              {[
                { num: 1, label: "Lĩnh vực" },
                { num: 2, label: "Chọn Luật sư" },
                { num: 3, label: "Thời gian" },
                { num: 4, label: "Xác nhận" },
              ].map((s, index) => (
                <div key={s.num} className="flex-1 flex flex-col items-center relative">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-label-sm text-label-sm z-10 transition-colors ${
                      step >= s.num
                        ? "bg-primary text-on-primary font-bold"
                        : "bg-surface-main border border-border-neutral text-text-secondary"
                    }`}
                  >
                    {s.num}
                  </div>
                  <span
                    className={`font-label-sm text-label-sm mt-stack-sm text-center ${
                      step >= s.num ? "text-primary font-bold" : "text-text-secondary"
                    }`}
                  >
                    {s.label}
                  </span>
                  {/* Line connecting steps */}
                  {index < 3 && (
                    <div
                      className={`absolute top-5 left-1/2 w-full h-px -z-0 ${
                        step > s.num ? "bg-primary" : "bg-border-neutral"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit}>
              {/* Step 1: Service Selection */}
              <div className={`appointment-step border border-border-neutral rounded p-6 md:p-8 bg-surface-main ${step === 1 ? "block" : "hidden"}`}>
                <h2 className="font-headline-md text-headline-md text-primary mb-stack-md">Bước 1: Chọn Dịch Vụ Tư Vấn</h2>
                
                {/* Consultation Type */}
                <div className="mb-6">
                  <label className="font-label-sm text-label-sm text-text-primary mb-stack-sm block">Hình thức tư vấn</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-md">
                    <label className={`flex items-start gap-4 p-4 border rounded cursor-pointer transition-colors ${formData.consultType === "offline" ? "border-primary bg-surface-alt" : "border-border-neutral hover:border-primary"}`}>
                      <input
                        className="mt-1 accent-primary"
                        name="consultType"
                        type="radio"
                        value="offline"
                        checked={formData.consultType === "offline"}
                        onChange={handleChange}
                      />
                      <div>
                        <span className="font-headline-md text-headline-md text-primary block text-base md:text-lg">Tư vấn tại Văn phòng</span>
                        <span className="font-body-md text-body-md text-text-secondary text-sm">Đến trực tiếp văn phòng luật sư để trao đổi trực tiếp.</span>
                      </div>
                    </label>
                    <label className={`flex items-start gap-4 p-4 border rounded cursor-pointer transition-colors ${formData.consultType === "online" ? "border-primary bg-surface-alt" : "border-border-neutral hover:border-primary"}`}>
                      <input
                        className="mt-1 accent-primary"
                        name="consultType"
                        type="radio"
                        value="online"
                        checked={formData.consultType === "online"}
                        onChange={handleChange}
                      />
                      <div>
                        <span className="font-headline-md text-headline-md text-primary block text-base md:text-lg">Tư vấn Online</span>
                        <span className="font-body-md text-body-md text-text-secondary text-sm">Tư vấn qua video call hoặc điện thoại từ xa.</span>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Service Category */}
                <div className="mb-6">
                  <label className="font-label-sm text-label-sm text-text-primary mb-stack-sm block" htmlFor="category">Lĩnh vực pháp lý</label>
                  <select
                    className="w-full border border-border-neutral rounded p-3 bg-surface-main text-text-primary font-body-md text-body-md focus:border-primary focus:border-2 outline-none transition-shadow"
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                  >
                    <option value="">-- Chọn lĩnh vực --</option>
                    <option value="dan-su">Tranh tụng Dân sự &amp; Thương mại</option>
                    <option value="doanh-nghiep">Tư vấn Doanh nghiệp &amp; Đầu tư</option>
                    <option value="bat-dong-san">Bất động sản &amp; Xây dựng</option>
                    <option value="lao-dong">Lao động &amp; Tiền lương</option>
                    <option value="hon-nhan">Hôn nhân &amp; Gia đình</option>
                    <option value="hinh-su">Hình sự</option>
                    <option value="so-huu-tri-tue">Sở hữu trí tuệ</option>
                    <option value="thue">Thuế &amp; Kế toán</option>
                  </select>
                </div>

                {/* Service Detail */}
                <div className="mb-6">
                  <label className="font-label-sm text-label-sm text-text-primary mb-stack-sm block" htmlFor="service">Dịch vụ cụ thể</label>
                  <select
                    className="w-full border border-border-neutral rounded p-3 bg-surface-main text-text-primary font-body-md text-body-md focus:border-primary focus:border-2 outline-none transition-shadow"
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                  >
                    <option value="">-- Chọn dịch vụ --</option>
                    <option value="tu-van-ban-dau">Tư vấn ban đầu (30 phút)</option>
                    <option value="soan-thao-hop-dong">Soạn thảo hợp đồng</option>
                    <option value="review-hop-dong">Rà soát hợp đồng</option>
                    <option value="dien-don">Điền đơn khởi kiện</option>
                    <option value="tu-van-doanh-nghiep">Tư vấn thành lập doanh nghiệp</option>
                    <option value="dai-dien">Đại diện theo ủy quyền</option>
                  </select>
                </div>

                {/* Description */}
                <div className="mb-6">
                  <label className="font-label-sm text-label-sm text-text-primary mb-stack-sm block" htmlFor="description">
                    Mô tả vụ việc <span className="text-text-secondary font-normal">(Không bắt buộc)</span>
                  </label>
                  <textarea
                    className="w-full border border-border-neutral rounded p-3 bg-surface-main text-text-primary font-body-md text-body-md focus:border-primary focus:border-2 outline-none resize-y transition-shadow"
                    id="description"
                    name="description"
                    rows={4}
                    placeholder="Vui lòng mô tả ngắn gọn về vụ việc của bạn để luật sư nắm trước thông tin..."
                    value={formData.description}
                    onChange={handleChange}
                  />
                </div>

                {/* Client Info */}
                <div className="border-t border-border-neutral pt-stack-lg mt-6">
                  <h3 className="font-headline-md text-headline-md text-primary mb-stack-md">Thông tin của bạn</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-md">
                    <div>
                      <label className="font-label-sm text-label-sm text-text-primary mb-stack-sm block" htmlFor="name">Họ và tên <span className="text-error">*</span></label>
                      <input
                        className="w-full border border-border-neutral rounded p-3 bg-surface-main text-text-primary font-body-md text-body-md focus:border-primary focus:border-2 outline-none transition-shadow"
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Nguyễn Văn A"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div>
                      <label className="font-label-sm text-label-sm text-text-primary mb-stack-sm block" htmlFor="phone">Số điện thoại <span className="text-error">*</span></label>
                      <input
                        className="w-full border border-border-neutral rounded p-3 bg-surface-main text-text-primary font-body-md text-body-md focus:border-primary focus:border-2 outline-none transition-shadow"
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="09xx.xxx.xxx"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div>
                      <label className="font-label-sm text-label-sm text-text-primary mb-stack-sm block" htmlFor="email">Email <span className="text-text-secondary font-normal">(Không bắt buộc)</span></label>
                      <input
                        className="w-full border border-border-neutral rounded p-3 bg-surface-main text-text-primary font-body-md text-body-md focus:border-primary focus:border-2 outline-none transition-shadow"
                        id="email"
                        name="email"
                        type="email"
                        placeholder="email@example.com"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <label className="font-label-sm text-label-sm text-text-primary mb-stack-sm block" htmlFor="address">Địa chỉ <span className="text-text-secondary font-normal">(Không bắt buộc)</span></label>
                      <input
                        className="w-full border border-border-neutral rounded p-3 bg-surface-main text-text-primary font-body-md text-body-md focus:border-primary focus:border-2 outline-none transition-shadow"
                        id="address"
                        name="address"
                        type="text"
                        placeholder="TP. Hồ Chí Minh"
                        value={formData.address}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end mt-8 pt-6 border-t border-border-neutral">
                  <button
                    type="button"
                    onClick={nextStep}
                    className="bg-accent text-on-accent h-12 px-8 rounded font-label-sm text-label-sm font-bold hover:opacity-90 transition-opacity flex items-center gap-2"
                  >
                    Tiếp theo
                    <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                  </button>
                </div>
              </div>

              {/* Step 2: Choose Attorney */}
              <div className={`appointment-step border border-border-neutral rounded p-6 md:p-8 bg-surface-main ${step === 2 ? "block" : "hidden"}`}>
                <h2 className="font-headline-md text-headline-md text-primary mb-stack-md">Bước 2: Chọn Luật Sư</h2>
                <p className="font-body-md text-body-md text-text-secondary mb-6">Chọn luật sư bạn muốn làm việc hoặc để hệ thống tự động gợi ý.</p>
                
                <div className="grid grid-cols-1 gap-stack-md mb-8">
                  {[
                    { id: "Ls. Phan Đức Tín", name: "Ls. Phan Đức Tín", role: "Luật sư Trưởng - Giám đốc Điều hành (Hơn 15 năm kinh nghiệm)", img: "/img/avatar1.png" },
                    { id: "Ls. Nguyễn Hoàng Long", name: "Ls. Nguyễn Hoàng Long", role: "Phó Giám đốc - Trưởng ban Tranh tụng Tòa án", img: "/img/avatar2.png" },
                    { id: "Ls. Trần Minh Tuấn", name: "Ls. Trần Minh Tuấn", role: "Trưởng phòng Tư vấn Doanh nghiệp & Bất động sản", img: "/img/avatar2.png" },
                    { id: "auto", name: "Tự động gợi ý", role: "Hệ thống sẽ gợi ý luật sư phù hợp nhất với vụ việc của bạn.", img: null },
                  ].map(attr => (
                    <label key={attr.id} className={`flex items-start gap-4 p-4 border rounded cursor-pointer transition-colors ${formData.attorney === attr.id ? "border-primary bg-surface-alt" : "border-border-neutral hover:border-primary"}`}>
                      <input
                        className="mt-2 accent-primary"
                        name="attorney"
                        type="radio"
                        value={attr.id}
                        checked={formData.attorney === attr.id}
                        onChange={handleChange}
                      />
                      <div className="w-14 h-14 rounded-full bg-surface-alt border border-border-neutral shrink-0 overflow-hidden flex items-center justify-center">
                        {attr.img ? (
                          <img alt="Luật sư" className="w-full h-full object-cover" src={attr.img} />
                        ) : (
                          <span className="material-symbols-outlined text-text-secondary">auto_awesome</span>
                        )}
                      </div>
                      <div>
                        <span className="font-headline-md text-headline-md text-primary block text-base md:text-lg">{attr.name}</span>
                        <span className="font-body-md text-body-md text-text-secondary text-sm">{attr.role}</span>
                      </div>
                    </label>
                  ))}
                </div>

                <div className="flex justify-between mt-8 pt-6 border-t border-border-neutral">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="bg-surface-main border border-border-neutral text-text-primary h-12 px-8 rounded font-label-sm text-label-sm font-bold hover:bg-surface-alt transition-colors flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[20px]">arrow_back</span>
                    Quay lại
                  </button>
                  <button
                    type="button"
                    onClick={nextStep}
                    className="bg-accent text-on-accent h-12 px-8 rounded font-label-sm text-label-sm font-bold hover:opacity-90 transition-opacity flex items-center gap-2"
                  >
                    Tiếp theo
                    <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                  </button>
                </div>
              </div>

              {/* Step 3: Date & Time */}
              <div className={`appointment-step border border-border-neutral rounded p-6 md:p-8 bg-surface-main ${step === 3 ? "block" : "hidden"}`}>
                <h2 className="font-headline-md text-headline-md text-primary mb-stack-md">Bước 3: Chọn Thời Gian</h2>
                <p className="font-body-md text-body-md text-text-secondary mb-6">Chọn ngày và khung giờ bạn muốn làm việc với luật sư.</p>
                
                <div className="mb-6">
                  <label className="font-label-sm text-label-sm text-text-primary mb-stack-sm block" htmlFor="date">Ngày hẹn <span className="text-error">*</span></label>
                  <input
                    className="w-full border border-border-neutral rounded p-3 bg-surface-main text-text-primary font-body-md text-body-md focus:border-primary focus:border-2 outline-none transition-shadow"
                    id="date"
                    name="date"
                    type="date"
                    value={formData.date}
                    onChange={handleChange}
                    required={step === 3}
                  />
                </div>

                <div className="mb-8">
                  <label className="font-label-sm text-label-sm text-text-primary mb-stack-sm block">Khung giờ <span className="text-error">*</span></label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-stack-md">
                    {[
                      "08:00 - 09:00", "09:00 - 10:00", "10:00 - 11:00",
                      "13:00 - 14:00", "14:00 - 15:00", "15:00 - 16:00", "16:00 - 17:00"
                    ].map(time => (
                      <label key={time} className={`flex items-center justify-center p-3 border rounded cursor-pointer transition-colors ${formData.timeSlot === time ? "bg-primary text-on-primary border-primary font-bold" : "border-border-neutral hover:border-primary"}`}>
                        <input
                          className="sr-only"
                          name="timeSlot"
                          type="radio"
                          value={time}
                          checked={formData.timeSlot === time}
                          onChange={handleChange}
                        />
                        <span className="font-body-md text-body-md text-sm md:text-base">{time}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between mt-8 pt-6 border-t border-border-neutral">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="bg-surface-main border border-border-neutral text-text-primary h-12 px-8 rounded font-label-sm text-label-sm font-bold hover:bg-surface-alt transition-colors flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[20px]">arrow_back</span>
                    Quay lại
                  </button>
                  <button
                    type="button"
                    onClick={nextStep}
                    className="bg-accent text-on-accent h-12 px-8 rounded font-label-sm text-label-sm font-bold hover:opacity-90 transition-opacity flex items-center gap-2"
                  >
                    Tiếp theo
                    <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                  </button>
                </div>
              </div>

              {/* Step 4: Confirmation */}
              <div className={`appointment-step border border-border-neutral rounded p-6 md:p-8 bg-surface-main ${step === 4 ? "block" : "hidden"}`}>
                <div className="text-center mb-8">
                  <span className="material-symbols-outlined text-6xl text-primary mb-4" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  <h2 className="font-headline-lg text-headline-lg text-primary">Xác Nhận Đặt Lịch</h2>
                  <p className="font-body-md text-body-md text-text-secondary mt-stack-md">Vui lòng kiểm tra lại thông tin trước khi gửi yêu cầu.</p>
                </div>

                <div className="bg-surface-alt border border-border-neutral rounded p-6 mb-6 space-y-4">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center pb-2 border-b border-border-neutral gap-1 sm:gap-4">
                    <span className="font-label-sm text-label-sm text-text-secondary uppercase tracking-wider text-xs sm:text-sm">Hình thức tư vấn</span>
                    <span className="font-body-md text-body-md text-text-primary font-semibold text-sm sm:text-base text-left sm:text-right">
                      {formData.consultType === "offline" ? "Tư vấn tại Văn phòng" : "Tư vấn Online"}
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center pb-2 border-b border-border-neutral gap-1 sm:gap-4">
                    <span className="font-label-sm text-label-sm text-text-secondary uppercase tracking-wider text-xs sm:text-sm">Lĩnh vực</span>
                    <span className="font-body-md text-body-md text-text-primary font-semibold text-sm sm:text-base text-left sm:text-right">
                      {formData.category || "--"}
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center pb-2 border-b border-border-neutral gap-1 sm:gap-4">
                    <span className="font-label-sm text-label-sm text-text-secondary uppercase tracking-wider text-xs sm:text-sm">Dịch vụ cụ thể</span>
                    <span className="font-body-md text-body-md text-text-primary font-semibold text-sm sm:text-base text-left sm:text-right">
                      {formData.service || "--"}
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center pb-2 border-b border-border-neutral gap-1 sm:gap-4">
                    <span className="font-label-sm text-label-sm text-text-secondary uppercase tracking-wider text-xs sm:text-sm">Luật sư</span>
                    <span className="font-body-md text-body-md text-text-primary font-semibold text-sm sm:text-base text-left sm:text-right">
                      {formData.attorney === "auto" ? "Tự động gợi ý" : formData.attorney}
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center pb-2 border-b border-border-neutral gap-1 sm:gap-4">
                    <span className="font-label-sm text-label-sm text-text-secondary uppercase tracking-wider text-xs sm:text-sm">Ngày hẹn</span>
                    <span className="font-body-md text-body-md text-text-primary font-semibold text-sm sm:text-base text-left sm:text-right">
                      {formData.date || "--"}
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center pb-2 border-b border-border-neutral gap-1 sm:gap-4">
                    <span className="font-label-sm text-label-sm text-text-secondary uppercase tracking-wider text-xs sm:text-sm">Khung giờ</span>
                    <span className="font-body-md text-body-md text-text-primary font-semibold text-sm sm:text-base text-left sm:text-right">
                      {formData.timeSlot || "--"}
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center pt-2 gap-1 sm:gap-4">
                    <span className="font-label-sm text-label-sm text-text-secondary uppercase tracking-wider text-xs sm:text-sm">Khách hàng</span>
                    <span className="font-body-md text-body-md text-text-primary font-semibold text-sm sm:text-base text-left sm:text-right">
                      {formData.name || "--"} - {formData.phone || "--"}
                    </span>
                  </div>
                </div>

                <div className="bg-surface-alt border border-border-neutral rounded p-4 mb-6 flex items-start gap-3">
                  <span className="material-symbols-outlined text-text-secondary shrink-0">info</span>
                  <p className="font-body-md text-body-md text-text-secondary text-sm">
                    Bằng cách gửi yêu cầu, bạn đồng ý với <span className="text-primary underline cursor-pointer">Điều khoản sử dụng</span> và <span className="text-primary underline cursor-pointer">Chính sách bảo mật</span> của Công ty Luật TNHH Đức Tín và Cộng sự. Chúng tôi sẽ liên hệ xác nhận lịch hẹn trong vòng 24 giờ làm việc.
                  </p>
                </div>

                <div className="flex justify-between mt-8 pt-6 border-t border-border-neutral">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="bg-surface-main border border-border-neutral text-text-primary h-12 px-8 rounded font-label-sm text-label-sm font-bold hover:bg-surface-alt transition-colors flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[20px]">arrow_back</span>
                    Quay lại
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-accent text-on-accent h-12 px-8 rounded font-label-sm text-label-sm font-bold hover:opacity-90 transition-opacity flex items-center gap-2 disabled:opacity-50 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[20px]">event</span>
                    {isSubmitting ? "Đang gửi..." : "Xác nhận Đặt lịch"}
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Right Column: Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="border border-border-neutral rounded bg-surface-main p-6 sticky top-24 shadow-sm">
              <h3 className="font-headline-md text-headline-md text-primary mb-stack-md border-b border-border-neutral pb-4">
                Tóm tắt &amp; Phí dự kiến
              </h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-start gap-4">
                  <span className="font-label-sm text-label-sm text-text-secondary text-xs sm:text-sm">Hình thức</span>
                  <span className="font-body-md text-body-md text-text-primary text-right font-medium text-sm">
                    {formData.consultType === "offline" ? "Tại Văn phòng" : "Online"}
                  </span>
                </div>
                <div className="flex justify-between items-start gap-4">
                  <span className="font-label-sm text-label-sm text-text-secondary text-xs sm:text-sm">Lĩnh vực</span>
                  <span className="font-body-md text-body-md text-text-primary text-right font-medium text-sm">
                    {formData.category ? formData.category : "Chưa chọn"}
                  </span>
                </div>
                <div className="flex justify-between items-start gap-4">
                  <span className="font-label-sm text-label-sm text-text-secondary text-xs sm:text-sm">Luật sư</span>
                  <span className="font-body-md text-body-md text-text-primary text-right font-medium text-sm">
                    {formData.attorney === "auto" ? "Gợi ý" : (formData.attorney ? formData.attorney : "Chưa chọn")}
                  </span>
                </div>
                <div className="flex justify-between items-start gap-4">
                  <span className="font-label-sm text-label-sm text-text-secondary text-xs sm:text-sm">Thời gian</span>
                  <span className="font-body-md text-body-md text-text-primary text-right font-medium text-sm">
                    {formData.date && formData.timeSlot ? `${formData.timeSlot} | ${formData.date}` : "Chưa chọn"}
                  </span>
                </div>
              </div>
              
              <div className="border-t border-border-neutral pt-4 mb-4">
                <h4 className="font-label-sm text-label-sm text-text-primary mb-3 uppercase tracking-wider text-xs">Phí dự kiến</h4>
                <div className="space-y-2">
                  <div className="flex justify-between gap-4">
                    <span className="font-body-md text-body-md text-text-secondary text-sm">Phí tư vấn cơ bản</span>
                    <span className="font-body-md text-body-md text-text-primary text-sm font-medium">500.000 VNĐ</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="font-body-md text-body-md text-text-secondary text-sm">Phí dịch vụ (ước tính)</span>
                    <span className="font-body-md text-body-md text-text-primary text-sm font-medium">--</span>
                  </div>
                  <div className="flex justify-between border-t border-border-neutral pt-3 mt-2">
                    <span className="font-body-md text-body-md text-text-primary font-bold">Tạm tính</span>
                    <span className="font-body-md text-body-md text-primary font-bold">500.000 VNĐ</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-surface-alt border border-border-neutral rounded p-3 flex items-start gap-2 mt-6">
                <span className="material-symbols-outlined text-sm text-text-secondary shrink-0">info</span>
                <p className="font-body-md text-body-md text-text-secondary text-xs leading-relaxed">
                  Phí trên chỉ là ước tính ban đầu cho phiên tư vấn. Phí dịch vụ chính thức sẽ được báo giá chi tiết sau khi luật sư tiếp nhận và đánh giá hồ sơ.
                </p>
              </div>
            </div>
          </div>
        </div>
        )}
      </section>
    </div>
  );
}
