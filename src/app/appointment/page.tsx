"use client";

import { useState } from "react";

export default function AppointmentPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    consultType: "offline",
    category: "",
    service: "",
    description: "",
    name: "",
    phone: "",
    email: "",
    address: "",
    attorney: "attorney-1",
    date: "",
    timeSlot: "",
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Yêu cầu đặt lịch đã được gửi thành công!");
  };

  return (
    <div className="pt-32 pb-section-padding page-fade-in bg-background min-h-screen">
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="font-headline-xl-mobile md:font-headline-xl text-headline-xl-mobile md:text-headline-xl text-primary">
            Đặt Lịch Hẹn
          </h1>
          <p className="font-body-md text-body-md text-text-secondary mt-stack-md">
            Vui lòng điền thông tin bên dưới để đặt lịch tư vấn với luật sư của DUC TIN &amp; Partners. Chúng tôi sẽ liên hệ xác nhận trong vòng 24 giờ.
          </p>
        </div>

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
                    { id: "attorney-1", name: "Ls. Nguyễn Văn A", role: "Giám đốc Điều hành - Chuyên về Tranh tụng & Doanh nghiệp", img: "/img/avatar2.png" },
                    { id: "attorney-2", name: "Ls. Trần Thị B", role: "Trưởng phòng Tranh tụng - Chuyên về Hình sự & Dân sự", img: "/img/avatar2.png" },
                    { id: "attorney-3", name: "Ls. Lê Văn C", role: "Trưởng phòng Doanh nghiệp - Chuyên về Đầu tư & Hợp đồng", img: "/img/avatar1.png" },
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
                    Bằng cách gửi yêu cầu, bạn đồng ý với <span className="text-primary underline cursor-pointer">Điều khoản sử dụng</span> và <span className="text-primary underline cursor-pointer">Chính sách bảo mật</span> của DUC TIN &amp; Partners. Chúng tôi sẽ liên hệ xác nhận lịch hẹn trong vòng 24 giờ làm việc.
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
                    className="bg-accent text-on-accent h-12 px-8 rounded font-label-sm text-label-sm font-bold hover:opacity-90 transition-opacity flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[20px]">event</span>
                    Xác nhận Đặt lịch
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
      </section>
    </div>
  );
}
