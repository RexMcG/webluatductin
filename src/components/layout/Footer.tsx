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
      <footer className="bg-primary border-t border-border-neutral w-full pb-28 md:pb-6 pt-10 md:pt-14 text-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          
          {/* Top Logo */}
          <div className="flex justify-center md:justify-start mb-8">
            <img
              src="/img/Logo_website_footer.webp"
              alt="Logo Công ty Luật Đức Tín"
              width={260}
              height={52}
              loading="lazy"
              className="h-10 md:h-12 object-contain"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Google Maps (Left on Desktop, Top on Mobile) */}
            <div className="lg:col-span-4 flex flex-col gap-3">
              <div className="w-full h-44 md:h-48 rounded-2xl overflow-hidden shadow-lg border border-white/10">
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
              <div className="bg-white/5 border border-white/10 rounded-2xl p-3 flex items-start gap-2.5">
                <span className="material-symbols-outlined text-amber-300 text-lg shrink-0 mt-0.5">location_on</span>
                <div className="text-xs md:text-sm text-slate-200 leading-snug">
                  <strong className="text-amber-300 font-bold block mb-0.5">Trụ sở chính:</strong>
                  P. 1901, Tầng 19, Saigon Trade Center, 37 Tôn Đức Thắng, P. Bến Nghé, Q.1, Tp. HCM.
                </div>
              </div>
            </div>

            {/* 4 Footer Columns (Responsive Grid) */}
            <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              
              <div className="flex flex-col gap-2 bg-white/5 border border-white/10 rounded-2xl p-4">
                <p className="text-sm md:text-base text-amber-300 font-bold border-b border-amber-500/40 pb-1.5 uppercase">
                  Về chúng tôi
                </p>
                <Link className="text-xs md:text-sm text-slate-200 hover:text-amber-300 transition-colors" href="/#about-us">
                  Giới thiệu chung
                </Link>
                <Link className="text-xs md:text-sm text-slate-200 hover:text-amber-300 transition-colors" href="/services">
                  Lĩnh vực hoạt động
                </Link>
                <Link className="text-xs md:text-sm text-slate-200 hover:text-amber-300 transition-colors" href="/appointment">
                  Luật sư Phan Đức Tín
                </Link>
              </div>

              <div className="flex flex-col gap-2 bg-white/5 border border-white/10 rounded-2xl p-4">
                <p className="text-sm md:text-base text-amber-300 font-bold border-b border-amber-500/40 pb-1.5 uppercase">
                  Tính năng
                </p>
                <Link className="text-xs md:text-sm text-slate-200 hover:text-amber-300 transition-colors" href="/court-fee-calculator">
                  Tính án phí
                </Link>
                <Link className="text-xs md:text-sm text-slate-200 hover:text-amber-300 transition-colors" href="/salary-calculator">
                  Tính lương Gross
                </Link>
                <Link className="text-xs md:text-sm text-slate-200 hover:text-amber-300 transition-colors" href="/ai-chatbot">
                  Hỏi đáp AI 24/7
                </Link>
                <Link className="text-xs md:text-sm text-slate-200 hover:text-amber-300 transition-colors" href="/ai-form-library">
                  Biểu mẫu AI
                </Link>
              </div>

              <div className="flex flex-col gap-2 bg-white/5 border border-white/10 rounded-2xl p-4">
                <p className="text-sm md:text-base text-amber-300 font-bold border-b border-amber-500/40 pb-1.5 uppercase">
                  Hỗ trợ
                </p>
                <Link className="text-xs md:text-sm text-slate-200 hover:text-amber-300 transition-colors" href="/appointment">
                  Đặt lịch hẹn
                </Link>
                <Link className="text-xs md:text-sm text-slate-200 hover:text-amber-300 transition-colors" href="/news">
                  Tin pháp luật
                </Link>
                <Link className="text-xs md:text-sm text-slate-200 hover:text-amber-300 transition-colors" href="/services">
                  Dịch vụ pháp lý
                </Link>
                <Link className="text-xs md:text-sm text-slate-200 hover:text-amber-300 transition-colors" href="/privacy-policy">
                  Chính sách bảo mật
                </Link>
              </div>

              <div className="flex flex-col gap-2 bg-white/5 border border-white/10 rounded-2xl p-4">
                <p className="text-sm md:text-base text-amber-300 font-bold border-b border-amber-500/40 pb-1.5 uppercase">
                  Liên hệ
                </p>
                <a className="text-xs md:text-sm text-amber-300 hover:underline font-bold" href="tel:0937863263">
                  Hotline: 093 786 32 63
                </a>
                <a className="text-xs md:text-sm text-slate-200 hover:text-amber-300 transition-colors" href="https://zalo.me/0937863263" target="_blank" rel="noopener noreferrer">
                  Zalo: 093 786 32 63
                </a>
                <a className="text-xs md:text-sm text-slate-200 hover:text-amber-300 transition-colors truncate" href="mailto:rexmcg12345678@gmail.com">
                  rexmcg12345678@gmail.com
                </a>
                <span className="text-[11px] md:text-xs text-slate-300 leading-snug">
                  P. 1901, Tầng 19, Saigon Trade Center, 37 Tôn Đức Thắng, Q.1, Tp. HCM
                </span>
              </div>

            </div>
          </div>

          {/* Copyright */}
          <div className="mt-10 pt-6 border-t border-white/10 text-center flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              © 2026 CÔNG TY LUẬT TNHH ĐỨC TÍN VÀ CỘNG SỰ (DUC TIN &amp; PARTNERS). All Rights Reserved.
            </p>
            <Link href="/privacy-policy" className="text-xs text-slate-400 hover:text-amber-300 transition-colors underline">
              Chính Sách Bảo Mật &amp; Quyền Riêng Tư
            </Link>
          </div>

        </div>
      </footer>
    </>
  );
}
