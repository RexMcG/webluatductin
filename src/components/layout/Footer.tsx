import Link from "next/link";

export default function Footer() {
  return (
    <>
      {/* Desktop Floating Contact Bubbles (Left) - Hidden on Mobile */}
      <div className="hidden md:flex fixed bottom-6 left-6 z-50 flex-col gap-3.5">
        {/* Call Hotline Bubble */}
        <a
          className="bg-gradient-to-br from-emerald-500 to-emerald-700 text-white rounded-full h-14 w-14 lg:h-16 lg:w-16 border-2 border-white shadow-[0_0_15px_rgba(16,185,129,0.5)] hover:scale-110 active:scale-95 transition-transform flex items-center justify-center relative group cursor-pointer"
          href="tel:0937863263"
          aria-label="Gọi ngay Hotline tư vấn pháp luật"
        >
          <span className="material-symbols-outlined text-2xl lg:text-3xl">call</span>
          <span className="absolute left-full ml-3 bg-emerald-700 text-white text-xs lg:text-sm font-bold whitespace-nowrap px-3 py-1.5 rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all shadow-lg pointer-events-none">
            Hotline: 093 786 32 63
          </span>
        </a>

        {/* Booking Bubble */}
        <Link
          className="bg-gradient-to-br from-red-500 to-primary text-white rounded-full h-14 w-14 lg:h-16 lg:w-16 border-2 border-white shadow-[0_0_15px_rgba(220,38,38,0.5)] hover:scale-110 active:scale-95 transition-transform flex items-center justify-center relative group animate-bounce cursor-pointer"
          style={{ animationDuration: '3s' }}
          href="/appointment"
          aria-label="Đặt lịch hẹn tư vấn luật sư"
        >
          <span className="material-symbols-outlined text-2xl lg:text-3xl">calendar_month</span>
          <span className="absolute left-full ml-3 bg-primary text-white text-xs lg:text-sm font-bold whitespace-nowrap px-3 py-1.5 rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all shadow-lg pointer-events-none">
            Đặt lịch hẹn
          </span>
        </Link>

        {/* Zalo Bubble */}
        <a
          className="bg-gradient-to-br from-blue-400 to-[#0068FF] text-white rounded-full h-14 w-14 lg:h-16 lg:w-16 border-2 border-white shadow-[0_0_15px_rgba(0,104,255,0.5)] hover:scale-110 active:scale-95 transition-transform flex items-center justify-center relative group cursor-pointer"
          href="https://zalo.me/0937863263"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat trực tiếp qua Zalo"
        >
          <img
            src="/img/zalo_icon.webp"
            alt="Zalo"
            width={28}
            height={28}
            className="w-7 h-7 lg:w-8 lg:h-8 object-contain"
          />
          <span className="absolute left-full ml-3 bg-[#0068FF] text-white text-xs lg:text-sm font-bold whitespace-nowrap px-3 py-1.5 rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all shadow-lg pointer-events-none">
            Chat Zalo
          </span>
        </a>
      </div>

      {/* Modern Unified Mobile Bottom Action Bar (Fixed at very bottom of screen on Mobile) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-amber-200/70 shadow-[0_-4px_25px_rgba(0,0,0,0.12)] px-2 py-2 flex items-center justify-around">
        <a 
          href="tel:0937863263" 
          className="flex flex-col items-center gap-1 text-emerald-700 active:scale-95 transition-transform py-1 px-2"
          aria-label="Gọi điện Hotline"
        >
          <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shadow-xs">
            <span className="material-symbols-outlined text-xl">call</span>
          </div>
          <span className="text-[11px] font-bold text-slate-800">Gọi Hotline</span>
        </a>

        <a 
          href="https://zalo.me/0937863263" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-1 text-[#0068FF] active:scale-95 transition-transform py-1 px-2"
          aria-label="Nhắn tin Zalo"
        >
          <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shadow-xs">
            <img src="/img/zalo_icon.webp" alt="Zalo" width={22} height={22} className="w-5 h-5 object-contain" />
          </div>
          <span className="text-[11px] font-bold text-slate-800">Chat Zalo</span>
        </a>

        <Link 
          href="/appointment" 
          className="flex flex-col items-center gap-1 text-[#641D06] active:scale-95 transition-transform py-1 px-2"
          aria-label="Đặt lịch hẹn luật sư"
        >
          <div className="w-10 h-10 rounded-full bg-amber-100 text-[#641D06] flex items-center justify-center shadow-xs">
            <span className="material-symbols-outlined text-xl">calendar_month</span>
          </div>
          <span className="text-[11px] font-bold text-slate-800">Đặt Lịch</span>
        </Link>

        <Link 
          href="/ai-chatbot" 
          className="flex flex-col items-center gap-1 text-emerald-600 active:scale-95 transition-transform py-1 px-2 relative"
          aria-label="Trợ lý Luật sư AI"
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-emerald-600 to-emerald-500 text-white flex items-center justify-center shadow-md">
            <span className="material-symbols-outlined text-xl">smart_toy</span>
          </div>
          <span className="text-[11px] font-bold text-slate-800">Hỏi AI 24/7</span>
          <span className="absolute top-1 right-2 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white animate-pulse"></span>
        </Link>
      </div>

      {/* ========== FOOTER ========== */}
      <footer className="bg-white border-t-[7px] border-[#641D06] w-full pb-28 md:pb-8 pt-10 md:pt-12 text-slate-800 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          
          {/* Main Footer Grid: 2 balanced halves */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
            
            {/* LEFT COLUMN: Brand, Map, Address & Hours (5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between bg-slate-50/80 border border-slate-200 rounded-2xl p-5 md:p-6 shadow-2xs">
              <div>
                {/* Brand Logo & Tagline */}
                <div className="mb-5">
                  <Link href="/" className="inline-block">
                    <img
                      src="/img/Logo_website.webp"
                      alt="Logo Công ty Luật Đức Tín"
                      width={240}
                      height={48}
                      loading="lazy"
                      className="h-9 md:h-10 object-contain"
                    />
                  </Link>
                  <p className="text-xs md:text-[13px] text-slate-600 mt-2 italic leading-relaxed">
                    Hãng luật uy tín – Bảo vệ tối đa quyền &amp; lợi ích hợp pháp cho khách hàng.
                  </p>
                </div>

                {/* Google Map with clean framed shadow */}
                <div className="w-full h-40 rounded-xl overflow-hidden shadow-xs border border-slate-200 bg-slate-100 relative mb-4">
                  <iframe
                    title="Văn phòng Công ty Luật TNHH Đức Tín & Cộng Sự trên Google Maps"
                    allowFullScreen={false}
                    className="w-full h-full"
                    height="100%"
                    loading="lazy"
                    referrerPolicy="strict-origin-when-cross-origin"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125419.33178072695!2d106.5754288003725!3d10.784166700000023!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f4bc8ad1f21%3A0x1c31b41801cfac6c!2sSaigon%20Trade%20Center%20Tower%20-%20Office%20Saigon!5e0!3m2!1svi!2s!4v1785438121278!5m2!1svi!2s"
                    style={{ border: 0 }}
                    width="100%"
                  />
                </div>
              </div>

              {/* Office Address & Working Hours */}
              <div className="space-y-3 pt-3 border-t border-slate-200 text-xs md:text-[13px]">
                <div className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-[#641D06] text-base shrink-0 mt-0.5">location_on</span>
                  <div className="leading-snug text-slate-700">
                    <strong className="text-[#641D06] font-bold block mb-0.5">Trụ sở chính:</strong>
                    P. 1901, Tầng 19, Saigon Trade Center, 37 Tôn Đức Thắng, P. Bến Nghé, Q.1, Tp. HCM.
                  </div>
                </div>
                <div className="flex items-start gap-2.5 pt-2 border-t border-slate-200/60">
                  <span className="material-symbols-outlined text-[#641D06] text-base shrink-0 mt-0.5">schedule</span>
                  <div className="leading-snug text-slate-700">
                    <strong className="text-[#641D06] font-bold block mb-0.5">Thời gian làm việc:</strong>
                    Thứ 2 – Thứ 6: 08:00 – 17:30 | Thứ 7: 08:00 – 12:00
                    <span className="block text-amber-800 font-bold mt-0.5">• Hotline &amp; Zalo hỗ trợ: 24/7</span>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: 4 Categorized Columns (7 cols) */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5 items-stretch">
              
              {/* Box 1: Về chúng tôi */}
              <div className="bg-slate-50/80 border border-slate-200 rounded-2xl p-5 flex flex-col justify-between hover:border-amber-400 hover:shadow-xs transition-all">
                <div>
                  <p className="text-xs md:text-sm font-black uppercase tracking-wider text-[#641D06] pb-2 mb-3 border-b-2 border-amber-200/80">
                    Về chúng tôi
                  </p>
                  <div className="flex flex-col gap-2.5">
                    <Link className="text-xs md:text-[13px] text-slate-600 hover:text-[#641D06] font-medium transition-colors flex items-center gap-1.5" href="/#about-us">
                      <span className="text-amber-700 font-bold">›</span> Giới thiệu công ty
                    </Link>
                    <Link className="text-xs md:text-[13px] text-slate-600 hover:text-[#641D06] font-medium transition-colors flex items-center gap-1.5" href="/services">
                      <span className="text-amber-700 font-bold">›</span> Lĩnh vực hoạt động
                    </Link>
                    <Link className="text-xs md:text-[13px] text-slate-600 hover:text-[#641D06] font-medium transition-colors flex items-center gap-1.5" href="/appointment">
                      <span className="text-amber-700 font-bold">›</span> Luật sư Phan Đức Tín
                    </Link>
                    <Link className="text-xs md:text-[13px] text-slate-600 hover:text-[#641D06] font-medium transition-colors flex items-center gap-1.5" href="/news">
                      <span className="text-amber-700 font-bold">›</span> Bảng tin &amp; Án lệ
                    </Link>
                  </div>
                </div>
                <div className="pt-3 mt-3 border-t border-slate-200/60 text-[11px] text-slate-400 font-medium">
                  Tận tâm – Minh bạch – Hiệu quả
                </div>
              </div>

              {/* Box 2: Công cụ & AI */}
              <div className="bg-slate-50/80 border border-slate-200 rounded-2xl p-5 flex flex-col justify-between hover:border-amber-400 hover:shadow-xs transition-all">
                <div>
                  <p className="text-xs md:text-sm font-black uppercase tracking-wider text-[#641D06] pb-2 mb-3 border-b-2 border-amber-200/80">
                    Công cụ &amp; AI
                  </p>
                  <div className="flex flex-col gap-2.5">
                    <Link className="text-xs md:text-[13px] text-slate-600 hover:text-[#641D06] font-medium transition-colors flex items-center gap-1.5" href="/court-fee-calculator">
                      <span className="text-amber-700 font-bold">›</span> Tính án phí tòa án
                    </Link>
                    <Link className="text-xs md:text-[13px] text-slate-600 hover:text-[#641D06] font-medium transition-colors flex items-center gap-1.5" href="/salary-calculator">
                      <span className="text-amber-700 font-bold">›</span> Tính lương Gross-to-Net
                    </Link>
                    <Link className="text-xs md:text-[13px] text-slate-600 hover:text-[#641D06] font-medium transition-colors flex items-center gap-1.5" href="/pit-calculator">
                      <span className="text-amber-700 font-bold">›</span> Tính thuế TNCN
                    </Link>
                    <Link className="text-xs md:text-[13px] text-slate-600 hover:text-[#641D06] font-medium transition-colors flex items-center gap-1.5" href="/ai-form-library">
                      <span className="text-amber-700 font-bold">›</span> Biểu mẫu pháp lý AI
                    </Link>
                  </div>
                </div>
                <div className="pt-3 mt-3 border-t border-slate-200/60 text-[11px] text-slate-400 font-medium">
                  Tra cứu &amp; tính toán chuẩn xác
                </div>
              </div>

              {/* Box 3: Hỗ trợ khách hàng */}
              <div className="bg-slate-50/80 border border-slate-200 rounded-2xl p-5 flex flex-col justify-between hover:border-amber-400 hover:shadow-xs transition-all">
                <div>
                  <p className="text-xs md:text-sm font-black uppercase tracking-wider text-[#641D06] pb-2 mb-3 border-b-2 border-amber-200/80">
                    Hỗ trợ pháp lý
                  </p>
                  <div className="flex flex-col gap-2.5">
                    <Link className="text-xs md:text-[13px] text-slate-600 hover:text-[#641D06] font-medium transition-colors flex items-center gap-1.5" href="/appointment">
                      <span className="text-amber-700 font-bold">›</span> Đặt lịch hẹn tư vấn
                    </Link>
                    <Link className="text-xs md:text-[13px] text-slate-600 hover:text-[#641D06] font-medium transition-colors flex items-center gap-1.5" href="/ai-chatbot">
                      <span className="text-amber-700 font-bold">›</span> Trợ lý Luật sư AI 24/7
                    </Link>
                    <Link className="text-xs md:text-[13px] text-slate-600 hover:text-[#641D06] font-medium transition-colors flex items-center gap-1.5" href="/ai-form-checker">
                      <span className="text-amber-700 font-bold">›</span> AI Thẩm định biểu mẫu
                    </Link>
                    <Link className="text-xs md:text-[13px] text-slate-600 hover:text-[#641D06] font-medium transition-colors flex items-center gap-1.5" href="/privacy-policy">
                      <span className="text-amber-700 font-bold">›</span> Chính sách bảo mật
                    </Link>
                  </div>
                </div>
                <div className="pt-3 mt-3 border-t border-slate-200/60 text-[11px] text-slate-400 font-medium">
                  Bảo mật thông tin tuyệt đối
                </div>
              </div>

              {/* Box 4: Kênh liên hệ */}
              <div className="bg-slate-50/80 border border-slate-200 rounded-2xl p-5 flex flex-col justify-between hover:border-amber-400 hover:shadow-xs transition-all">
                <div>
                  <p className="text-xs md:text-sm font-black uppercase tracking-wider text-[#641D06] pb-2 mb-3 border-b-2 border-amber-200/80">
                    Liên hệ trực tiếp
                  </p>
                  <div className="flex flex-col gap-2.5">
                    <a className="text-xs md:text-[13px] text-slate-800 hover:text-[#641D06] transition-colors" href="tel:0937863263">
                      <strong className="text-[#641D06]">Hotline / Zalo:</strong> 093 786 32 63
                    </a>
                    <a className="text-xs md:text-[13px] text-slate-800 hover:text-[#641D06] transition-colors break-all" href="mailto:rexmcg12345678@gmail.com">
                      <strong className="text-[#641D06]">Email:</strong> rexmcg12345678@gmail.com
                    </a>
                    <div className="text-xs md:text-[13px] text-slate-700">
                      <strong className="text-[#641D06]">Tư vấn:</strong> Văn phòng &amp; Trực tuyến
                    </div>
                  </div>
                </div>
                <div className="pt-3 mt-3 border-t border-slate-200/60 text-[11px] text-amber-800 font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse"></span>
                  Hỗ trợ khẩn cấp: 24/7
                </div>
              </div>

            </div>
          </div>

          {/* Legal Disclaimer Box - CANH TRÁI ĐỒNG BỘ 100% */}
          <div className="mt-8 p-4 rounded-xl bg-amber-50/70 border border-amber-200/80 text-left shadow-2xs">
            <p className="text-[11px] md:text-xs text-slate-700 leading-relaxed">
              <strong className="text-[#641D06] font-bold">⚖️ Tuyên bố miễn trừ trách nhiệm:</strong> Toàn bộ thông tin, bài viết phân tích pháp lý và các công cụ tính toán trên website mang tính chất phổ biến kiến thức pháp luật và tham khảo, không cấu thành ý kiến tư vấn pháp lý chính thức hay xác lập quan hệ luật sư – khách hàng cho đến khi hợp đồng dịch vụ pháp lý được ký kết bằng văn bản theo luật định.
            </p>
          </div>

          {/* Copyright Row */}
          <div className="mt-6 pt-5 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs md:text-sm text-slate-500">
            <p className="leading-relaxed text-center sm:text-left">
              © 2026 CÔNG TY LUẬT TNHH ĐỨC TÍN VÀ CỘNG SỰ (DUC TIN &amp; PARTNERS). All Rights Reserved.
            </p>
            <Link href="/privacy-policy" className="text-slate-600 hover:text-[#641D06] font-medium transition-colors underline shrink-0">
              Chính Sách Bảo Mật &amp; Quyền Riêng Tư
            </Link>
          </div>

        </div>
      </footer>
    </>
  );
}
