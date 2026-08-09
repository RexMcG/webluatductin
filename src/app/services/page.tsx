"use client";

import Link from "next/link";
import { useState } from "react";
import { Metadata } from "next";

export default function ServicesPage() {
  const [isLeadGateOpen, setIsLeadGateOpen] = useState(false);

  return (
    <>
      <div className="bg-surface-alt min-h-screen">
        {/* Hero Section */}
        <section
          className="relative w-full bg-cover bg-[center_25%] bg-no-repeat"
          style={{ backgroundImage: "url('/img/herobanner.png')" }}
        >
          <div className="relative z-10 max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-32 md:py-48 flex items-center min-h-[500px] md:min-h-[650px]">
            <div className="max-w-3xl space-y-6 md:space-y-8 flex flex-col items-start text-left">
              <div className="rounded-full px-4 py-1.5 bg-primary text-[10px] uppercase tracking-[0.2em] font-bold text-white shadow-md">
                Tầm nhìn &amp; Sứ mệnh
              </div>
              <h1 className="font-headline-xl-mobile md:text-[80px] leading-[1.1] text-primary tracking-tighter">
                Giải pháp pháp lý <br /> <span className="italic text-accent">toàn diện</span>
              </h1>
              <p className="font-body-md text-xl text-primary font-semibold max-w-2xl leading-relaxed">
                Bảo vệ quyền lợi hợp pháp, kiến tạo giá trị bền vững cho doanh nghiệp và cá nhân thông qua đội ngũ chuyên gia dày dặn kinh nghiệm.
              </p>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {/* 1. Nội bộ doanh nghiệp */}
            <div className="bg-border-neutral/30 p-2 rounded-[2.5rem] transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-[0.98] group">
              <div className="bg-surface-main shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)] rounded-[calc(2.5rem-0.5rem)] p-8 h-full flex flex-col border border-border-neutral/50">
                <div className="rounded-full px-3 py-1 bg-surface-alt text-[10px] uppercase tracking-[0.2em] font-medium text-text-secondary w-max mb-8 border border-border-neutral/50">Doanh nghiệp</div>
                <h3 className="font-headline-lg text-[28px] text-primary mb-4 leading-tight">Nội bộ doanh nghiệp</h3>
                <p className="font-body-md text-text-secondary leading-relaxed mb-10 flex-grow">
                  Xây dựng quy chế hoạt động, cơ cấu quản trị nội bộ, giải quyết mâu thuẫn giữa các thành viên/cổ đông. Hỗ trợ soát xét và chuẩn hóa hệ thống văn bản pháp lý nội bộ nhằm phòng ngừa rủi ro ngay từ bên trong.
                </p>
                <div className="flex flex-col gap-3 mt-auto">
                  <Link href="/appointment" className="flex w-full items-center justify-between bg-primary text-on-primary rounded-full pl-6 pr-2 py-2 hover:bg-secondary transition-colors duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group/btn">
                    <span className="font-label-sm font-semibold tracking-wide text-sm">Đặt lịch hẹn</span>
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center group-hover/btn:translate-x-1 group-hover/btn:-translate-y-[1px] group-hover/btn:scale-105 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]">
                      <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </div>
                  </Link>
                  <Link href="/ai-chatbot" className="flex w-full items-center justify-center gap-2 bg-accent border-accent text-on-accent rounded-full px-6 py-3 hover:opacity-90 transition-colors duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98]">
                    <span className="material-symbols-outlined text-base text-on-accent">smart_toy</span>
                    <span className="font-label-sm font-semibold tracking-wide text-sm">Hỏi ngay AI</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* 2. Tư vấn đầu tư */}
            <div className="bg-border-neutral/30 p-2 rounded-[2.5rem] transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-[0.98] group">
              <div className="bg-surface-main shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)] rounded-[calc(2.5rem-0.5rem)] p-8 h-full flex flex-col border border-border-neutral/50">
                <div className="rounded-full px-3 py-1 bg-surface-alt text-[10px] uppercase tracking-[0.2em] font-medium text-text-secondary w-max mb-8 border border-border-neutral/50">Thương mại</div>
                <h3 className="font-headline-lg text-[28px] text-primary mb-4 leading-tight">Tư vấn đầu tư</h3>
                <p className="font-body-md text-text-secondary leading-relaxed mb-10 flex-grow">
                  Cố vấn chiến lược cho các nhà đầu tư trong và ngoài nước (FDI). Đánh giá tính pháp lý của dự án, tối ưu hóa cấu trúc giao dịch và đại diện thực hiện các thủ tục xin cấp phép đầu tư phức tạp.
                </p>
                <div className="flex flex-col gap-3 mt-auto">
                  <Link href="/appointment" className="flex w-full items-center justify-between bg-primary text-on-primary rounded-full pl-6 pr-2 py-2 hover:bg-secondary transition-colors duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group/btn">
                    <span className="font-label-sm font-semibold tracking-wide text-sm">Đặt lịch hẹn</span>
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center group-hover/btn:translate-x-1 group-hover/btn:-translate-y-[1px] group-hover/btn:scale-105 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]">
                      <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </div>
                  </Link>
                  <Link href="/ai-chatbot" className="flex w-full items-center justify-center gap-2 bg-accent border-accent text-on-accent rounded-full px-6 py-3 hover:opacity-90 transition-colors duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98]">
                    <span className="material-symbols-outlined text-base text-on-accent">smart_toy</span>
                    <span className="font-label-sm font-semibold tracking-wide text-sm">Hỏi ngay AI</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* 3. Thủ tục pháp lý - giấy phép */}
            <div className="bg-border-neutral/30 p-2 rounded-[2.5rem] transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-[0.98] group">
              <div className="bg-surface-main shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)] rounded-[calc(2.5rem-0.5rem)] p-8 h-full flex flex-col border border-border-neutral/50">
                <div className="rounded-full px-3 py-1 bg-surface-alt text-[10px] uppercase tracking-[0.2em] font-medium text-text-secondary w-max mb-8 border border-border-neutral/50">Hành chính</div>
                <h3 className="font-headline-lg text-[28px] text-primary mb-4 leading-tight">Thủ tục pháp lý &amp; Giấy phép</h3>
                <p className="font-body-md text-text-secondary leading-relaxed mb-10 flex-grow">
                  Đại diện xin cấp các loại giấy phép con, giấy phép hoạt động, đăng ký kinh doanh và các văn bản chấp thuận từ cơ quan nhà nước có thẩm quyền một cách nhanh chóng và chuẩn xác nhất.
                </p>
                <div className="flex flex-col gap-3 mt-auto">
                  <Link href="/appointment" className="flex w-full items-center justify-between bg-primary text-on-primary rounded-full pl-6 pr-2 py-2 hover:bg-secondary transition-colors duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group/btn">
                    <span className="font-label-sm font-semibold tracking-wide text-sm">Đặt lịch hẹn</span>
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center group-hover/btn:translate-x-1 group-hover/btn:-translate-y-[1px] group-hover/btn:scale-105 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]">
                      <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </div>
                  </Link>
                  <Link href="/ai-chatbot" className="flex w-full items-center justify-center gap-2 bg-accent border-accent text-on-accent rounded-full px-6 py-3 hover:opacity-90 transition-colors duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98]">
                    <span className="material-symbols-outlined text-base text-on-accent">smart_toy</span>
                    <span className="font-label-sm font-semibold tracking-wide text-sm">Hỏi ngay AI</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* 4. Di chúc - thừa kế */}
            <div className="bg-border-neutral/30 p-2 rounded-[2.5rem] transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-[0.98] group">
              <div className="bg-surface-main shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)] rounded-[calc(2.5rem-0.5rem)] p-8 h-full flex flex-col border border-border-neutral/50">
                <div className="rounded-full px-3 py-1 bg-surface-alt text-[10px] uppercase tracking-[0.2em] font-medium text-text-secondary w-max mb-8 border border-border-neutral/50">Cá nhân</div>
                <h3 className="font-headline-lg text-[28px] text-primary mb-4 leading-tight">Di chúc &amp; Thừa kế</h3>
                <p className="font-body-md text-text-secondary leading-relaxed mb-10 flex-grow">
                  Tư vấn lập di chúc, phân chia di sản thừa kế theo pháp luật hoặc theo di chúc. Hỗ trợ giải quyết các tranh chấp phát sinh trong quá trình phân chia tài sản gia đình êm thấm và hợp pháp.
                </p>
                <div className="flex flex-col gap-3 mt-auto">
                  <Link href="/appointment" className="flex w-full items-center justify-between bg-primary text-on-primary rounded-full pl-6 pr-2 py-2 hover:bg-secondary transition-colors duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group/btn">
                    <span className="font-label-sm font-semibold tracking-wide text-sm">Đặt lịch hẹn</span>
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center group-hover/btn:translate-x-1 group-hover/btn:-translate-y-[1px] group-hover/btn:scale-105 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]">
                      <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </div>
                  </Link>
                  <Link href="/ai-chatbot" className="flex w-full items-center justify-center gap-2 bg-accent border-accent text-on-accent rounded-full px-6 py-3 hover:opacity-90 transition-colors duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98]">
                    <span className="material-symbols-outlined text-base text-on-accent">smart_toy</span>
                    <span className="font-label-sm font-semibold tracking-wide text-sm">Hỏi ngay AI</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* 5. Dân sự */}
            <div className="bg-border-neutral/30 p-2 rounded-[2.5rem] transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-[0.98] group">
              <div className="bg-surface-main shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)] rounded-[calc(2.5rem-0.5rem)] p-8 h-full flex flex-col border border-border-neutral/50">
                <div className="rounded-full px-3 py-1 bg-surface-alt text-[10px] uppercase tracking-[0.2em] font-medium text-text-secondary w-max mb-8 border border-border-neutral/50">Tranh tụng</div>
                <h3 className="font-headline-lg text-[28px] text-primary mb-4 leading-tight">Dân sự</h3>
                <p className="font-body-md text-text-secondary leading-relaxed mb-10 flex-grow">
                  Tư vấn và giải quyết các vấn đề dân sự đa dạng: bồi thường thiệt hại, hợp đồng vay mượn, giao dịch dân sự thông thường. Bảo vệ quyền và lợi ích hợp pháp của cá nhân trong đời sống thường nhật.
                </p>
                <div className="flex flex-col gap-3 mt-auto">
                  <Link href="/appointment" className="flex w-full items-center justify-between bg-primary text-on-primary rounded-full pl-6 pr-2 py-2 hover:bg-secondary transition-colors duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group/btn">
                    <span className="font-label-sm font-semibold tracking-wide text-sm">Đặt lịch hẹn</span>
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center group-hover/btn:translate-x-1 group-hover/btn:-translate-y-[1px] group-hover/btn:scale-105 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]">
                      <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </div>
                  </Link>
                  <Link href="/ai-chatbot" className="flex w-full items-center justify-center gap-2 bg-accent border-accent text-on-accent rounded-full px-6 py-3 hover:opacity-90 transition-colors duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98]">
                    <span className="material-symbols-outlined text-base text-on-accent">smart_toy</span>
                    <span className="font-label-sm font-semibold tracking-wide text-sm">Hỏi ngay AI</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* 6. Lao động */}
            <div className="bg-border-neutral/30 p-2 rounded-[2.5rem] transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-[0.98] group">
              <div className="bg-surface-main shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)] rounded-[calc(2.5rem-0.5rem)] p-8 h-full flex flex-col border border-border-neutral/50">
                <div className="rounded-full px-3 py-1 bg-surface-alt text-[10px] uppercase tracking-[0.2em] font-medium text-text-secondary w-max mb-8 border border-border-neutral/50">Doanh nghiệp</div>
                <h3 className="font-headline-lg text-[28px] text-primary mb-4 leading-tight">Lao động</h3>
                <p className="font-body-md text-text-secondary leading-relaxed mb-10 flex-grow">
                  Tư vấn hợp đồng lao động, nội quy, thỏa ước lao động tập thể. Xử lý kỷ luật lao động và giải quyết các tranh chấp về sa thải, bồi thường, trợ cấp thôi việc giữa người lao động và người sử dụng.
                </p>
                <div className="flex flex-col gap-3 mt-auto">
                  <Link href="/appointment" className="flex w-full items-center justify-between bg-primary text-on-primary rounded-full pl-6 pr-2 py-2 hover:bg-secondary transition-colors duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group/btn">
                    <span className="font-label-sm font-semibold tracking-wide text-sm">Đặt lịch hẹn</span>
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center group-hover/btn:translate-x-1 group-hover/btn:-translate-y-[1px] group-hover/btn:scale-105 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]">
                      <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </div>
                  </Link>
                  <Link href="/ai-chatbot" className="flex w-full items-center justify-center gap-2 bg-accent border-accent text-on-accent rounded-full px-6 py-3 hover:opacity-90 transition-colors duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98]">
                    <span className="material-symbols-outlined text-base text-on-accent">smart_toy</span>
                    <span className="font-label-sm font-semibold tracking-wide text-sm">Hỏi ngay AI</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* 7. Tranh tụng */}
            <div className="bg-border-neutral/30 p-2 rounded-[2.5rem] transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-[0.98] group">
              <div className="bg-surface-main shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)] rounded-[calc(2.5rem-0.5rem)] p-8 h-full flex flex-col border border-border-neutral/50">
                <div className="rounded-full px-3 py-1 bg-surface-alt text-[10px] uppercase tracking-[0.2em] font-medium text-text-secondary w-max mb-8 border border-border-neutral/50">Cốt lõi</div>
                <h3 className="font-headline-lg text-[28px] text-primary mb-4 leading-tight">Tranh tụng</h3>
                <p className="font-body-md text-text-secondary leading-relaxed mb-10 flex-grow">
                  Đại diện khách hàng tham gia tố tụng tại Tòa án và Trọng tài thương mại các cấp. Lên phương án bào chữa, bảo vệ quyền lợi tối đa trong các vụ án hình sự, dân sự, thương mại và hành chính.
                </p>
                <div className="flex flex-col gap-3 mt-auto">
                  <Link href="/appointment" className="flex w-full items-center justify-between bg-primary text-on-primary rounded-full pl-6 pr-2 py-2 hover:bg-secondary transition-colors duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group/btn">
                    <span className="font-label-sm font-semibold tracking-wide text-sm">Đặt lịch hẹn</span>
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center group-hover/btn:translate-x-1 group-hover/btn:-translate-y-[1px] group-hover/btn:scale-105 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]">
                      <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </div>
                  </Link>
                  <Link href="/ai-chatbot" className="flex w-full items-center justify-center gap-2 bg-accent border-accent text-on-accent rounded-full px-6 py-3 hover:opacity-90 transition-colors duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98]">
                    <span className="material-symbols-outlined text-base text-on-accent">smart_toy</span>
                    <span className="font-label-sm font-semibold tracking-wide text-sm">Hỏi ngay AI</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* 8. Nhà đất - bất động sản */}
            <div className="bg-border-neutral/30 p-2 rounded-[2.5rem] transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-[0.98] group">
              <div className="bg-surface-main shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)] rounded-[calc(2.5rem-0.5rem)] p-8 h-full flex flex-col border border-border-neutral/50">
                <div className="rounded-full px-3 py-1 bg-surface-alt text-[10px] uppercase tracking-[0.2em] font-medium text-text-secondary w-max mb-8 border border-border-neutral/50">Thương mại</div>
                <h3 className="font-headline-lg text-[28px] text-primary mb-4 leading-tight">Nhà đất &amp; Bất động sản</h3>
                <p className="font-body-md text-text-secondary leading-relaxed mb-10 flex-grow">
                  Tư vấn pháp lý mua bán, chuyển nhượng, tặng cho, thế chấp quyền sử dụng đất. Xử lý các tranh chấp ranh giới, bồi thường giải tỏa và hoàn thiện hồ sơ pháp lý cho các dự án bất động sản lớn.
                </p>
                <div className="flex flex-col gap-3 mt-auto">
                  <Link href="/appointment" className="flex w-full items-center justify-between bg-primary text-on-primary rounded-full pl-6 pr-2 py-2 hover:bg-secondary transition-colors duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group/btn">
                    <span className="font-label-sm font-semibold tracking-wide text-sm">Đặt lịch hẹn</span>
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center group-hover/btn:translate-x-1 group-hover/btn:-translate-y-[1px] group-hover/btn:scale-105 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]">
                      <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </div>
                  </Link>
                  <Link href="/ai-chatbot" className="flex w-full items-center justify-center gap-2 bg-accent border-accent text-on-accent rounded-full px-6 py-3 hover:opacity-90 transition-colors duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98]">
                    <span className="material-symbols-outlined text-base text-on-accent">smart_toy</span>
                    <span className="font-label-sm font-semibold tracking-wide text-sm">Hỏi ngay AI</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* 9. Hôn nhân gia đình */}
            <div className="bg-border-neutral/30 p-2 rounded-[2.5rem] transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-[0.98] group">
              <div className="bg-surface-main shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)] rounded-[calc(2.5rem-0.5rem)] p-8 h-full flex flex-col border border-border-neutral/50">
                <div className="rounded-full px-3 py-1 bg-surface-alt text-[10px] uppercase tracking-[0.2em] font-medium text-text-secondary w-max mb-8 border border-border-neutral/50">Cá nhân</div>
                <h3 className="font-headline-lg text-[28px] text-primary mb-4 leading-tight">Hôn nhân &amp; Gia đình</h3>
                <p className="font-body-md text-text-secondary leading-relaxed mb-10 flex-grow">
                  Hỗ trợ thủ tục ly hôn thuận tình, đơn phương, tranh chấp quyền nuôi con, cấp dưỡng và phân chia tài sản chung. Tư vấn pháp luật về mang thai hộ, nhận con nuôi và các vấn đề gia đình khác.
                </p>
                <div className="flex flex-col gap-3 mt-auto">
                  <Link href="/appointment" className="flex w-full items-center justify-between bg-primary text-on-primary rounded-full pl-6 pr-2 py-2 hover:bg-secondary transition-colors duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group/btn">
                    <span className="font-label-sm font-semibold tracking-wide text-sm">Đặt lịch hẹn</span>
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center group-hover/btn:translate-x-1 group-hover/btn:-translate-y-[1px] group-hover/btn:scale-105 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]">
                      <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </div>
                  </Link>
                  <Link href="/ai-chatbot" className="flex w-full items-center justify-center gap-2 bg-accent border-accent text-on-accent rounded-full px-6 py-3 hover:opacity-90 transition-colors duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98]">
                    <span className="material-symbols-outlined text-base text-on-accent">smart_toy</span>
                    <span className="font-label-sm font-semibold tracking-wide text-sm">Hỏi ngay AI</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* LEAD GATE MODAL */}
      <div className={`fixed inset-0 z-[100] flex items-center justify-center lead-gate-overlay px-margin-mobile ${isLeadGateOpen ? 'block' : 'hidden'}`} id="lead-gate-modal">
        <div className="bg-surface-main w-full max-w-container-max max-w-xl rounded-lg shadow-elegant p-stack-lg flex flex-col items-center text-center relative">
          {/* Close Button */}
          <button
            onClick={() => setIsLeadGateOpen(false)}
            aria-label="Đóng"
            className="absolute top-4 right-4 text-text-secondary hover:text-primary transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
          
          <div className="w-16 h-16 bg-surface-alt rounded-full flex items-center justify-center mb-stack-md">
            <span className="material-symbols-outlined text-primary text-[32px]">lock_person</span>
          </div>
          <h2 className="font-headline-md text-headline-md text-primary mb-2">
            Nhập Thông Tin Để Tải Brochure Dịch Vụ
          </h2>
          <p className="font-body-md text-body-md text-text-secondary mb-4">
            Tài liệu chi tiết về dịch vụ pháp lý sẽ được gửi đến bạn hoàn toàn miễn phí.
          </p>
          
          <form className="w-full space-y-stack-md" onSubmit={(e) => e.preventDefault()}>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary text-[20px]">person</span>
              <input
                className="w-full bg-surface-alt border border-border-neutral rounded py-3 pl-10 pr-4 font-body-md text-body-md text-text-primary focus:outline-none focus:border-primary focus:border-2 transition-all placeholder:text-border-neutral"
                placeholder="Họ và tên của bạn *"
                required
                type="text"
              />
            </div>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary text-[20px]">phone_iphone</span>
              <input
                className="w-full bg-surface-alt border border-border-neutral rounded py-3 pl-10 pr-4 font-body-md text-body-md text-text-primary focus:outline-none focus:border-primary focus:border-2 transition-all placeholder:text-border-neutral"
                placeholder="Số điện thoại nhận file (Zalo) *"
                required
                type="tel"
              />
            </div>
            <label className="flex items-start gap-2 text-left cursor-pointer group">
              <input className="mt-1 rounded border-border-neutral text-primary focus:ring-primary" type="checkbox" />
              <span className="font-body-md text-body-md text-text-secondary text-sm leading-tight group-hover:text-primary transition-colors">
                Tôi đồng ý nhận tư vấn sơ bộ từ Luật sư nếu có thắc mắc.
              </span>
            </label>
            <button className="w-full py-4 bg-accent text-on-accent font-label-sm text-label-sm rounded hover:bg-opacity-90 transition-colors flex justify-center items-center gap-2" type="submit">
              <span className="material-symbols-outlined">lock_open</span> MỞ KHÓA &amp; TẢI FILE NGAY
            </button>
          </form>
          
          <div className="mt-stack-md flex items-center gap-1 text-text-secondary">
            <span className="material-symbols-outlined text-[14px]">verified_user</span>
            <p className="font-label-sm text-label-sm text-[12px]">
              Cam kết bảo mật thông tin theo Quy tắc đạo đức Luật sư.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
