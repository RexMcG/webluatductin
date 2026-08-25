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
      <footer className="bg-[#521705] border-t-4 border-amber-600/60 w-full pb-28 md:pb-6 pt-8 md:pt-10 text-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          
          {/* Main Footer Grid: Left (Brand, Map, Office) | Right (4 Flat Nav Columns) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            
            {/* LEFT BLOCK: Logo, Compact Map & Address (4 cols) */}
            <div className="lg:col-span-4 flex flex-col gap-3">
              <Link href="/" className="inline-block">
                <img
                  src="/img/Logo_website_footer.webp"
                  alt="Logo Công ty Luật Đức Tín"
                  width={220}
                  height={44}
                  loading="lazy"
                  className="h-8 md:h-9 object-contain"
                />
              </Link>

              {/* Compact Google Map (~120px) */}
              <div className="w-full h-28 md:h-32 rounded-xl overflow-hidden shadow-xs border border-white/10 bg-slate-900/40 relative">
                <iframe
                  title="Văn phòng Công ty Luật TNHH Đức Tín & Cộng Sự trên Google Maps"
                  allowFullScreen={false}
                  className="w-full h-full opacity-90 hover:opacity-100 transition-opacity"
                  height="100%"
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125419.33178072695!2d106.5754288003725!3d10.784166700000023!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f4bc8ad1f21%3A0x1c31b41801cfac6c!2sSaigon%20Trade%20Center%20Tower%20-%20Office%20Saigon!5e0!3m2!1svi!2s!4v1785438121278!5m2!1svi!2s"
                  style={{ border: 0, filter: "contrast(1.05) brightness(0.95)" }}
                  width="100%"
                />
              </div>

              {/* Minimal Address & Working Hours text */}
              <div className="space-y-1.5 text-xs text-slate-200 leading-snug">
                <p>
                  <strong className="text-amber-300">Trụ sở chính:</strong> P. 1901, Tầng 19, Saigon Trade Center, 37 Tôn Đức Thắng, Q.1, Tp. HCM.
                </p>
                <p className="text-slate-300 text-[11px]">
                  <strong className="text-amber-300">Giờ làm việc:</strong> T2 – T6: 08:00 – 17:30 | T7: 08:00 – 12:00
                </p>
              </div>
            </div>

            {/* RIGHT BLOCK: 4 Sleek Flat Nav Columns (8 cols) */}
            <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
              
              {/* Col 1: Về chúng tôi */}
              <div className="flex flex-col gap-2">
                <p className="text-xs md:text-sm font-extrabold uppercase tracking-wider text-amber-300 pb-1.5 border-b border-amber-500/30">
                  Về chúng tôi
                </p>
                <div className="flex flex-col gap-1.5 text-xs md:text-[13px]">
                  <Link className="text-slate-200 hover:text-amber-300 transition-colors" href="/#about-us">
                    Giới thiệu chung
                  </Link>
                  <Link className="text-slate-200 hover:text-amber-300 transition-colors" href="/services">
                    Lĩnh vực hoạt động
                  </Link>
                  <Link className="text-slate-200 hover:text-amber-300 transition-colors" href="/news">
                    Bảng tin &amp; Án lệ
                  </Link>
                </div>
              </div>

              {/* Col 2: Công cụ & AI */}
              <div className="flex flex-col gap-2">
                <p className="text-xs md:text-sm font-extrabold uppercase tracking-wider text-amber-300 pb-1.5 border-b border-amber-500/30">
                  Công cụ &amp; AI
                </p>
                <div className="flex flex-col gap-1.5 text-xs md:text-[13px]">
                  <Link className="text-slate-200 hover:text-amber-300 transition-colors" href="/court-fee-calculator">
                    Tính án phí tòa án
                  </Link>
                  <Link className="text-slate-200 hover:text-amber-300 transition-colors" href="/salary-calculator">
                    Tính lương Gross-Net
                  </Link>
                  <Link className="text-slate-200 hover:text-amber-300 transition-colors" href="/pit-calculator">
                    Tính thuế TNCN
                  </Link>
                  <Link className="text-slate-200 hover:text-amber-300 transition-colors" href="/ai-form-library">
                    Biểu mẫu pháp lý AI
                  </Link>
                </div>
              </div>

              {/* Col 3: Hỗ trợ */}
              <div className="flex flex-col gap-2">
                <p className="text-xs md:text-sm font-extrabold uppercase tracking-wider text-amber-300 pb-1.5 border-b border-amber-500/30">
                  Hỗ trợ
                </p>
                <div className="flex flex-col gap-1.5 text-xs md:text-[13px]">
                  <Link className="text-slate-200 hover:text-amber-300 transition-colors" href="/appointment">
                    Đặt lịch hẹn tư vấn
                  </Link>
                  <Link className="text-slate-200 hover:text-amber-300 transition-colors" href="/ai-chatbot">
                    Hỏi đáp Luật sư AI 24/7
                  </Link>
                  <Link className="text-slate-200 hover:text-amber-300 transition-colors" href="/ai-form-checker">
                    Thẩm định biểu mẫu
                  </Link>
                  <Link className="text-slate-200 hover:text-amber-300 transition-colors" href="/privacy-policy">
                    Chính sách bảo mật
                  </Link>
                </div>
              </div>

              {/* Col 4: Liên hệ */}
              <div className="flex flex-col gap-2">
                <p className="text-xs md:text-sm font-extrabold uppercase tracking-wider text-amber-300 pb-1.5 border-b border-amber-500/30">
                  Liên hệ
                </p>
                <div className="flex flex-col gap-1.5 text-xs md:text-[13px]">
                  <a className="text-slate-100 hover:text-amber-300 transition-colors" href="tel:0937863263">
                    <strong className="text-amber-300">Hotline / Zalo:</strong> 093 786 32 63
                  </a>
                  <a className="text-slate-100 hover:text-amber-300 transition-colors break-all" href="mailto:rexmcg12345678@gmail.com">
                    <strong className="text-amber-300">Email:</strong> rexmcg12345678@gmail.com
                  </a>
                  <div className="text-[11px] text-amber-300 font-semibold flex items-center gap-1 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
                    Hỗ trợ khẩn cấp: 24/7
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Bottom Area: 1-line Disclaimer + Copyright Row */}
          <div className="mt-6 pt-4 border-t border-white/10 flex flex-col gap-2 text-slate-300/90 text-[11px]">
            <p className="leading-relaxed">
              <strong className="text-amber-300 font-medium">⚖️ Miễn trừ trách nhiệm:</strong> Toàn bộ thông tin, bài viết và công cụ tính toán trên website mang tính chất tham khảo kiến thức pháp luật, không cấu thành ý kiến tư vấn pháp lý chính thức cho đến khi hợp đồng dịch vụ được ký kết bằng văn bản theo luật định.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-2 border-t border-white/5 text-xs text-slate-400">
              <p>© 2026 CÔNG TY LUẬT TNHH ĐỨC TÍN VÀ CỘNG SỰ (DUC TIN &amp; PARTNERS). All Rights Reserved.</p>
              <Link href="/privacy-policy" className="hover:text-amber-300 transition-colors underline shrink-0">
                Chính Sách Bảo Mật &amp; Quyền Riêng Tư
              </Link>
            </div>
          </div>

        </div>
      </footer>
    </>
  );
}
