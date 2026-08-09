"use client";

import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(1);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <>
      {/* Hero Section */}
      <section
        className="relative w-full bg-cover bg-[center_25%] bg-no-repeat"
        style={{ backgroundImage: "url('/img/herobanner.png')" }}
      >
        <div className="relative z-10 max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-32 md:py-48 flex items-center min-h-[500px] md:min-h-[650px]">
          <div className="max-w-3xl space-y-6 md:space-y-8">
            <h1 className="font-headline-xl-mobile text-[40px] leading-[1.2] md:font-headline-xl md:text-[64px] md:leading-[1.1]">
              <span className="text-primary">Công Ty Luật Đức Tín</span>{" "}
              <span className="text-accent">&amp; Partners</span>
            </h1>
            <p className="font-body-md text-body-md text-primary font-semibold">
              Đội ngũ luật sư giàu kinh nghiệm, kết hợp công nghệ AI tiên tiến, mang đến giải pháp pháp lý tối ưu cho cá nhân và doanh nghiệp.
            </p>
            <div className="mt-8 relative shadow-lg">
              <input
                className="w-full h-14 pl-4 pr-12 border border-primary rounded focus:ring-2 focus:ring-primary bg-white text-text-primary placeholder:text-text-secondary outline-none"
                id="hero-search"
                placeholder="Bạn đang gặp vướng mắc pháp lý gì?"
                type="text"
              />
              <span
                className="material-symbols-outlined absolute right-4 top-4 text-primary cursor-pointer hover:opacity-80"
                id="hero-search-btn"
              >
                search
              </span>
            </div>
            <div className="flex flex-wrap gap-4 mt-8">
              <Link
                className="bg-primary text-white h-12 px-6 rounded font-label-sm text-label-sm font-bold hover:opacity-90 transition-opacity inline-flex items-center shadow-lg"
                href="/appointment"
              >
                Đặt Lịch Hẹn
              </Link>
              <Link
                className="bg-accent text-white h-12 px-6 rounded font-label-sm text-label-sm font-bold hover:opacity-90 transition-opacity inline-flex items-center shadow-lg"
                href="/ai-chatbot"
              >
                Tư Vấn AI 24/7
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Sub-Nav Pill Bar */}
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg">
        <div className="flex flex-wrap justify-center gap-stack-sm bg-surface-alt border border-border-neutral rounded-full p-2">
          <Link
            className="bg-primary text-on-primary rounded-full px-6 py-2 font-label-sm text-sm uppercase transition-colors font-semibold"
            href="/services"
          >
            Lĩnh vực Pháp lý
          </Link>
          <Link
            className="bg-surface-main text-text-secondary hover:text-primary rounded-full px-6 py-2 font-label-sm text-sm uppercase transition-colors font-semibold"
            href="/ai-form-library"
          >
            Thư viện Biểu mẫu AI
          </Link>
          <Link
            className="bg-surface-main text-text-secondary hover:text-primary rounded-full px-6 py-2 font-label-sm text-sm uppercase transition-colors font-semibold"
            href="/court-fee-calculator"
          >
            Công cụ Tính toán
          </Link>
          <Link
            className="bg-surface-main text-text-secondary hover:text-primary rounded-full px-6 py-2 font-label-sm text-sm uppercase transition-colors font-semibold"
            href="/ai-chatbot"
          >
            Hỏi đáp AI
          </Link>
        </div>
      </div>

      {/* About Us & Why Choose Us */}
      <section id="about-us" className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pb-section-padding">
        <div className="flex flex-col gap-12">
          {/* About Us */}
          <div>
            <div className="text-center mb-10 w-full flex flex-col items-center justify-center">
              <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary uppercase text-center mb-2">
                Về Chúng Tôi
              </h2>
              <div className="text-accent flex items-center justify-center mt-1">
                <span className="tracking-widest">— o —</span>
              </div>
            </div>
            <div className="prose prose-xl md:prose-2xl text-text-secondary leading-relaxed space-y-4 text-justify text-lg md:text-xl">
              <p>
                <strong>Luật sư Phan Đức Tín</strong> là người sáng lập Công ty Luật TNHH Đức Tín và Cộng sự. Hãng luật đã tham gia tư vấn, giải quyết thành công nhiều vụ việc chuyên về các lĩnh vực như: đầu tư, lập dự án và xin giấy chứng nhận đầu tư cho các doanh nhân đến từ Nhật, Hàn Quốc, Mỹ, Singapore, Đức...
              </p>
              <p>
                Tư vấn, soạn thảo hợp đồng mua, bán doanh nghiệp, góp vốn, chuyển nhượng vốn, hợp đồng hợp tác kinh doanh; tham gia giải quyết tranh chấp tại tòa án, trọng tài thương mại.
              </p>
            </div>
          </div>

          {/* Why Choose Us */}
          <div>
            <div className="text-center mb-10 w-full flex flex-col items-center justify-center">
              <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary uppercase text-center mb-2">
                Tại Sao Lại Chọn Chúng Tôi
              </h2>
              <div className="text-accent flex items-center justify-center mt-1">
                <span className="tracking-widest">— o —</span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: "1. Đội ngũ luật sư vững chuyên môn",
                  desc: "Đội ngũ Luật sư của DucTin & Partners năng động, giàu kinh nghiệm, vững chuyên môn, am hiểu về công nghệ, tận tâm và luôn tuân thủ pháp luật, đạo đức nghề nghiệp."
                },
                {
                  title: "2. Giải quyết vấn đề triệt để",
                  desc: "Giúp giải quyết vấn đề của khách hàng nhanh chóng, hiệu quả với chi phí hợp lý. \"Chất lượng dịch vụ là Danh dự của Luật sư\"."
                },
                {
                  title: "3. Đảm bảo bí mật tuyệt đối",
                  desc: "Giữ bí mật tuyệt đối thông tin, tài liệu của khách hàng. Chúng tôi cam kết bảo vệ quyền lợi tối đa cho bạn."
                },
                {
                  title: "4. Tư vấn chính xác",
                  desc: "Nhận định, đánh giá đúng bản chất vấn đề, đưa ra giải pháp toàn diện và tối ưu nhất cho từng trường hợp cụ thể."
                },
                {
                  title: "5. Chi phí hợp lý",
                  desc: "Cung cấp dịch vụ pháp lý với mức chi phí hợp lý, rõ ràng và minh bạch, phù hợp với tính chất của từng vụ việc."
                },
                {
                  title: "6. Tận tâm, chuyên nghiệp",
                  desc: "Luôn đặt quyền lợi của khách hàng lên hàng đầu, chăm sóc và hỗ trợ tận tâm trong mọi giai đoạn của vụ việc."
                }
              ].map((item, idx) => (
                <div key={idx} className="bg-surface-main p-4 border border-border-neutral rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="font-bold text-primary mb-2 text-base md:text-lg uppercase">
                    {item.title}
                  </h3>
                  <p className="text-base md:text-lg text-text-secondary leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Practice Areas Grid */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-8">
        <div className="text-center mb-10 w-full flex flex-col items-center justify-center">
          <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary uppercase text-center mb-2">
            Lĩnh Vực Hoạt Động Mũi Nhọn
          </h2>
          <div className="text-accent flex items-center justify-center mt-1">
            <span className="tracking-widest">— o —</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          
          {/* 1. Nội bộ doanh nghiệp */}
          <div className="bg-border-neutral/30 p-2 rounded-[2.5rem] transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-[0.98] group">
            <div className="bg-surface-main shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)] rounded-[calc(2.5rem-0.5rem)] p-8 h-full flex flex-col border border-border-neutral/50">
              <div className="rounded-full px-3 py-1 bg-surface-alt text-[10px] uppercase tracking-[0.2em] font-medium text-text-secondary w-max mb-8 border border-border-neutral/50">
                Doanh nghiệp
              </div>
              <h3 className="font-headline-lg text-[28px] text-primary mb-4 leading-tight">Nội bộ doanh nghiệp</h3>
              <p className="font-body-md text-text-secondary leading-relaxed mb-10 flex-grow">
                Xây dựng quy chế hoạt động, cơ cấu quản trị nội bộ, giải quyết mâu thuẫn giữa các thành viên/cổ đông.
              </p>
              <div className="flex flex-col gap-3 mt-auto">
                <Link href="/appointment" className="flex w-full items-center justify-between bg-primary text-on-primary rounded-full pl-6 pr-2 py-2 hover:bg-secondary transition-colors duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group/btn">
                  <span className="font-label-sm font-semibold tracking-wide text-sm">Đặt lịch hẹn</span>
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center group-hover/btn:translate-x-1 group-hover/btn:-translate-y-[1px] group-hover/btn:scale-105 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]">
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </div>
                </Link>
                <Link href="/ai-chatbot" className="flex w-full items-center justify-center gap-2 bg-surface-main border border-border-neutral text-primary rounded-full px-6 py-3 hover:bg-surface-alt transition-colors duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98]">
                  <span className="material-symbols-outlined text-base text-accent">smart_toy</span>
                  <span className="font-label-sm font-semibold tracking-wide text-sm">Hỏi ngay AI</span>
                </Link>
              </div>
            </div>
          </div>

          {/* 2. Tư vấn đầu tư */}
          <div className="bg-border-neutral/30 p-2 rounded-[2.5rem] transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-[0.98] group">
            <div className="bg-surface-main shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)] rounded-[calc(2.5rem-0.5rem)] p-8 h-full flex flex-col border border-border-neutral/50">
              <div className="rounded-full px-3 py-1 bg-surface-alt text-[10px] uppercase tracking-[0.2em] font-medium text-text-secondary w-max mb-8 border border-border-neutral/50">
                Thương mại
              </div>
              <h3 className="font-headline-lg text-[28px] text-primary mb-4 leading-tight">Tư vấn đầu tư</h3>
              <p className="font-body-md text-text-secondary leading-relaxed mb-10 flex-grow">
                Cố vấn chiến lược cho các nhà đầu tư trong và ngoài nước (FDI). Đánh giá tính pháp lý của dự án, tối ưu hóa cấu trúc.
              </p>
              <div className="flex flex-col gap-3 mt-auto">
                <Link href="/appointment" className="flex w-full items-center justify-between bg-primary text-on-primary rounded-full pl-6 pr-2 py-2 hover:bg-secondary transition-colors duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group/btn">
                  <span className="font-label-sm font-semibold tracking-wide text-sm">Đặt lịch hẹn</span>
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center group-hover/btn:translate-x-1 group-hover/btn:-translate-y-[1px] group-hover/btn:scale-105 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]">
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </div>
                </Link>
                <Link href="/ai-chatbot" className="flex w-full items-center justify-center gap-2 bg-surface-main border border-border-neutral text-primary rounded-full px-6 py-3 hover:bg-surface-alt transition-colors duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98]">
                  <span className="material-symbols-outlined text-base text-accent">smart_toy</span>
                  <span className="font-label-sm font-semibold tracking-wide text-sm">Hỏi ngay AI</span>
                </Link>
              </div>
            </div>
          </div>

          {/* 3. Tranh tụng */}
          <div className="bg-border-neutral/30 p-2 rounded-[2.5rem] transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-[0.98] group">
            <div className="bg-surface-main shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)] rounded-[calc(2.5rem-0.5rem)] p-8 h-full flex flex-col border border-border-neutral/50">
              <div className="rounded-full px-3 py-1 bg-surface-alt text-[10px] uppercase tracking-[0.2em] font-medium text-text-secondary w-max mb-8 border border-border-neutral/50">
                Cốt lõi
              </div>
              <h3 className="font-headline-lg text-[28px] text-primary mb-4 leading-tight">Tranh tụng</h3>
              <p className="font-body-md text-text-secondary leading-relaxed mb-10 flex-grow">
                Đại diện khách hàng tham gia tố tụng tại Tòa án và Trọng tài thương mại các cấp. Lên phương án bào chữa.
              </p>
              <div className="flex flex-col gap-3 mt-auto">
                <Link href="/appointment" className="flex w-full items-center justify-between bg-primary text-on-primary rounded-full pl-6 pr-2 py-2 hover:bg-secondary transition-colors duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group/btn">
                  <span className="font-label-sm font-semibold tracking-wide text-sm">Đặt lịch hẹn</span>
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center group-hover/btn:translate-x-1 group-hover/btn:-translate-y-[1px] group-hover/btn:scale-105 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]">
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </div>
                </Link>
                <Link href="/ai-chatbot" className="flex w-full items-center justify-center gap-2 bg-surface-main border border-border-neutral text-primary rounded-full px-6 py-3 hover:bg-surface-alt transition-colors duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98]">
                  <span className="material-symbols-outlined text-base text-accent">smart_toy</span>
                  <span className="font-label-sm font-semibold tracking-wide text-sm">Hỏi ngay AI</span>
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-border-neutral bg-surface-alt py-stack-lg">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop grid grid-cols-2 md:grid-cols-4 gap-gutter text-center">
          <div>
            <div className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary">
              <span className="counter">15</span>+
            </div>
            <div className="font-label-sm text-label-sm text-text-secondary uppercase tracking-widest mt-2">Năm Kinh Nghiệm</div>
          </div>
          <div className="md:border-l border-border-neutral">
            <div className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary">
              <span className="counter">500</span>+
            </div>
            <div className="font-label-sm text-label-sm text-text-secondary uppercase tracking-widest mt-2">Vụ Việc Thành Công</div>
          </div>
          <div className="border-t md:border-t-0 md:border-l border-border-neutral pt-stack-sm md:pt-0">
            <div className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary">
              <span className="counter">200</span>+
            </div>
            <div className="font-label-sm text-label-sm text-text-secondary uppercase tracking-widest mt-2">Khách Hàng Doanh Nghiệp</div>
          </div>
          <div className="border-t md:border-t-0 md:border-l border-border-neutral pt-stack-sm md:pt-0">
            <div className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary">
              <span className="counter">95</span>%
            </div>
            <div className="font-label-sm text-label-sm text-text-secondary uppercase tracking-widest mt-2">Tỷ Lệ Thành Công</div>
          </div>
        </div>
      </section>

      {/* Featured Tools */}
      <section className="bg-surface-alt border-y border-border-neutral py-8">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="text-center mb-10 w-full flex flex-col items-center justify-center">
            <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary uppercase text-center mb-2">
              Công Cụ Pháp Lý Nổi Bật
            </h2>
            <div className="text-accent flex items-center justify-center mt-1">
              <span className="tracking-widest">— o —</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            <div className="bg-surface-main border border-border-neutral p-6 hover:shadow-elegant-hover shadow-elegant transition-shadow">
              <span className="material-symbols-outlined text-3xl text-text-secondary mb-4">calculate</span>
              <h3 className="font-headline-md text-headline-md text-primary mb-2">Gross-to-Net Calculator</h3>
              <p className="font-body-md text-body-md text-text-secondary mb-4 h-12">Công cụ tính lương và các khoản trích theo lương chuẩn xác.</p>
              <Link className="block w-full bg-surface-main border border-primary text-primary h-10 rounded font-label-sm text-label-sm hover:bg-surface-alt transition-colors text-center leading-10" href="/salary-calculator">Sử dụng ngay</Link>
            </div>
            <div className="bg-surface-main border border-border-neutral p-6 hover:shadow-elegant-hover shadow-elegant transition-shadow">
              <span className="material-symbols-outlined text-3xl text-text-secondary mb-4">account_balance_wallet</span>
              <h3 className="font-headline-md text-headline-md text-primary mb-2">Court Fee Calculator</h3>
              <p className="font-body-md text-body-md text-text-secondary mb-4 h-12">Tính toán nhanh án phí, lệ phí tòa án theo quy định mới nhất.</p>
              <Link className="block w-full bg-surface-main border border-primary text-primary h-10 rounded font-label-sm text-label-sm hover:bg-surface-alt transition-colors text-center leading-10" href="/court-fee-calculator">Sử dụng ngay</Link>
            </div>
            <div className="bg-surface-main border border-border-neutral p-6 hover:shadow-elegant-hover shadow-elegant transition-shadow">
              <span className="material-symbols-outlined text-3xl text-text-secondary mb-4">smart_toy</span>
              <h3 className="font-headline-md text-headline-md text-primary mb-2">AI Form Search</h3>
              <p className="font-body-md text-body-md text-text-secondary mb-4 h-12">Tìm kiếm và tự động điền biểu mẫu pháp lý bằng trí tuệ nhân tạo.</p>
              <Link className="block w-full bg-surface-main border border-primary text-primary h-10 rounded font-label-sm text-label-sm hover:bg-surface-alt transition-colors text-center leading-10" href="/ai-form-library">Sử dụng ngay</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Consultation Form & FAQ */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-16 my-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          
          {/* Consultation Form (Left) */}
          <div className="bg-[#c29837] p-8 md:p-12 text-white h-full flex flex-col justify-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 uppercase leading-snug">ĐẶT CÂU HỎI VỚI ĐỘI NGŨ LUẬT SƯ CỦA CHÚNG TÔI</h2>
            <p className="mb-8 text-lg">Điền vào thông tin bên dưới đây</p>

            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input type="text" placeholder="Họ và tên" className="w-full px-4 py-4 bg-white text-gray-800 border-none focus:outline-none shadow-sm text-sm" />
                <input type="email" placeholder="Địa chỉ Email" className="w-full px-4 py-4 bg-white text-gray-800 border-none focus:outline-none shadow-sm text-sm" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input type="tel" placeholder="Điện thoại" className="w-full px-4 py-4 bg-white text-gray-800 border-none focus:outline-none shadow-sm text-sm" />
                <div className="relative">
                  <select defaultValue="" className="w-full px-4 py-4 bg-white text-gray-800 border-none focus:outline-none shadow-sm appearance-none text-sm cursor-pointer">
                    <option value="" disabled>Lĩnh vực</option>
                    <option value="1">Dân sự</option>
                    <option value="2">Hình sự</option>
                    <option value="3">Doanh nghiệp</option>
                    <option value="4">Đất đai</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div>
                <input type="text" placeholder="Tiêu đề" className="w-full px-4 py-4 bg-white text-gray-800 border-none focus:outline-none shadow-sm text-sm" />
              </div>
              <div>
                <textarea placeholder="Mô tả về vấn đề của bạn" rows={6} className="w-full px-4 py-4 bg-white text-gray-800 border-none focus:outline-none shadow-sm resize-none text-sm"></textarea>
              </div>
              <button type="submit" className="bg-white text-[#c29837] font-bold uppercase px-8 py-3 hover:bg-gray-100 transition-colors shadow-sm text-sm">
                GỬI
              </button>
            </form>
          </div>

          {/* FAQ Accordion (Right) */}
          <div className="p-4 md:p-8">
            <h2 className="text-[#c29837] font-bold text-3xl uppercase mb-2">CÂU HỎI &amp; TRẢ LỜI</h2>
            <div className="text-[#c29837] mb-8 flex items-center">
              <span className="tracking-widest">— o —</span>
            </div>

            <div className="space-y-6">
              {/* FAQ 1 */}
              <div className="faq-item">
                <button
                  onClick={() => toggleFaq(1)}
                  className={`w-full text-left font-semibold py-4 px-6 flex items-center gap-4 transition-colors ${openFaq === 1 ? 'bg-[#641d06] text-white' : 'bg-gray-50 text-gray-700 hover:bg-gray-100'}`}
                >
                  <span className={`${openFaq === 1 ? 'text-white' : 'text-gray-500'} text-xl font-bold`}>
                    {openFaq === 1 ? '-' : '+'}
                  </span>
                  Khi giấy chứng nhận quyền sử dụng đất hết thời hạn
                </button>
                <div className={`${openFaq === 1 ? 'block' : 'hidden'} bg-white text-gray-600 p-6 text-sm leading-relaxed border border-gray-100 shadow-sm`}>
                  <p className="mb-4">Thắc mắc của bạn tôi xin đưa ra ý kiến giải đáp như sau:</p>
                  <p className="mb-4">Về thời hạn sử dụng đất, căn cứ quy định tại Điều 126 Luật đất đai 2013:</p>
                  <p className="mb-4">1. Thời hạn giao đất, công nhận quyền sử dụng đất nông nghiệp đối với hộ gia đình, cá nhân trực tiếp sản xuất nông nghiệp theo quy định tại khoản 1, khoản 2, điểm b khoản 3, khoản 4 và khoản 5 Điều 129 của Luật này là 50 năm. Khi hết thời hạn, hộ gia đình, cá nhân trực tiếp sản xuất nông nghiệp nếu có nhu cầu thì được tiếp tục sử dụng đất...</p>
                  <a href="#" className="text-blue-500 hover:underline">Xem thêm</a>
                </div>
              </div>

              {/* FAQ 2 */}
              <div className="faq-item">
                <button
                  onClick={() => toggleFaq(2)}
                  className={`w-full text-left font-semibold py-4 px-6 flex items-center gap-4 transition-colors ${openFaq === 2 ? 'bg-[#641d06] text-white' : 'bg-gray-50 text-gray-700 hover:bg-gray-100'}`}
                >
                  <span className={`${openFaq === 2 ? 'text-white' : 'text-gray-500'} text-xl font-bold`}>
                    {openFaq === 2 ? '-' : '+'}
                  </span>
                  Chế độ thai sản
                </button>
                <div className={`${openFaq === 2 ? 'block' : 'hidden'} bg-white text-gray-600 p-6 text-sm leading-relaxed border border-gray-100 shadow-sm`}>
                  <p>Nội dung tư vấn về chế độ thai sản theo quy định mới nhất.</p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <Link href="#" className="inline-block bg-[#c29837] text-white font-bold uppercase px-8 py-3 hover:bg-[#a37b2c] transition-colors shadow-sm text-sm">
                XEM TẤT CẢ
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* Expert Attorneys */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-8">
        <div className="text-center mb-10 w-full flex flex-col items-center justify-center">
          <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary uppercase text-center mb-2">
            Đội Ngũ Luật Sư Điều Hành
          </h2>
          <div className="text-accent flex items-center justify-center mt-1">
            <span className="tracking-widest">— o —</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {[
            {
              name: "Ls. Nguyễn Văn A",
              role: "Giám đốc Điều hành",
              img: "avatar2.png"
            },
            {
              name: "Ls. Trần Thị B",
              role: "Trưởng phòng Tranh tụng",
              img: "avatar2.png"
            },
            {
              name: "Ls. Lê Văn C",
              role: "Trưởng phòng Doanh nghiệp",
              img: "avatar1.png"
            }
          ].map((ls, idx) => (
            <div key={idx} className="border border-border-neutral p-4 flex flex-col items-center text-center">
              <div className="w-32 h-32 bg-surface-alt rounded-full border border-border-neutral mb-4 overflow-hidden">
                <img alt="Attorney" className="w-full h-full object-cover" src={`/img/${ls.img}`} />
              </div>
              <h3 className="font-headline-md text-headline-md text-primary">{ls.name}</h3>
              <p className="font-label-sm text-label-sm text-text-secondary uppercase mt-1 mb-4">{ls.role}</p>
              <Link className="flex items-center justify-center gap-2 w-full bg-surface-alt border border-border-neutral text-primary h-10 rounded font-label-sm text-label-sm hover:bg-surface-main transition-colors" href="/ai-chatbot">
                <span className="material-symbols-outlined text-sm">chat</span> Chat riêng
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Client Marquee */}
      <section className="border-y border-border-neutral py-10 bg-surface-main overflow-hidden">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mb-8 text-center">
          <h3 className="font-label-sm text-text-secondary uppercase tracking-widest text-sm font-bold">
            Đối Tác & Khách Hàng Tiêu Biểu
          </h3>
        </div>
        <div className="relative w-full overflow-hidden flex">
          <div className="flex whitespace-nowrap animate-marquee w-max items-center">
            {/* Logos */}
            {[
              "1_16695707988051.png",
              "2_16695708063758.png",
              "3_16695708141883.png",
              "4_16695708242618.png",
              "5_16695708351998.png",
              "6_16695708438339.png",
              "7_16695708602002.png",
              "Global_Catering_16700553488686.png",
            ].map((img, i) => (
              <img
                key={i}
                src={`/img/${img}`}
                className="h-16 mx-12 object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all"
                alt="Client Logo"
              />
            ))}
            {/* Duplicate for marquee effect */}
            {[
              "1_16695707988051.png",
              "2_16695708063758.png",
              "3_16695708141883.png",
              "4_16695708242618.png",
              "5_16695708351998.png",
              "6_16695708438339.png",
              "7_16695708602002.png",
              "Global_Catering_16700553488686.png",
            ].map((img, i) => (
              <img
                key={`dup-${i}`}
                src={`/img/${img}`}
                className="h-16 mx-12 object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all"
                alt="Client Logo"
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
