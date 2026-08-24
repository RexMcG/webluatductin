import Link from "next/link";

export default function Footer() {
  return (
    <>
      {/* Floating Contact Bubbles (Left) - Ergonomic on mobile */}
      <div className="fixed bottom-4 left-3 md:bottom-6 md:left-6 z-50 flex flex-col gap-2.5 md:gap-3.5">
        {/* Call Hotline Bubble (Direct Call on Mobile) */}
        <a
          className="bg-gradient-to-br from-emerald-500 to-emerald-700 text-white rounded-full h-12 w-12 md:h-16 md:w-16 border-2 border-white shadow-[0_0_15px_rgba(16,185,129,0.5)] hover:scale-110 active:scale-95 transition-transform flex items-center justify-center relative group"
          href="tel:0937863263"
          aria-label="Gọi ngay Hotline tư vấn pháp luật"
        >
          <span className="material-symbols-outlined text-2xl md:text-3xl">call</span>
          <span className="absolute left-full ml-3 bg-emerald-700 text-white text-xs md:text-sm font-bold whitespace-nowrap px-3 py-1.5 rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all shadow-lg pointer-events-none">
            Hotline: 093 786 32 63
          </span>
        </a>

        {/* Booking Bubble */}
        <Link
          className="bg-gradient-to-br from-red-500 to-primary text-white rounded-full h-12 w-12 md:h-16 md:w-16 border-2 border-white shadow-[0_0_15px_rgba(220,38,38,0.5)] hover:scale-110 active:scale-95 transition-transform flex items-center justify-center relative group animate-bounce"
          style={{ animationDuration: '3s' }}
          href="/appointment"
          aria-label="Đặt lịch hẹn tư vấn luật sư"
        >
          <span className="material-symbols-outlined text-2xl md:text-3xl">calendar_month</span>
          <span className="absolute left-full ml-3 bg-primary text-white text-xs md:text-sm font-bold whitespace-nowrap px-3 py-1.5 rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all shadow-lg pointer-events-none">
            Đặt lịch hẹn
          </span>
        </Link>

        {/* Zalo Bubble */}
        <a
          className="bg-gradient-to-br from-blue-400 to-[#0068FF] text-white rounded-full h-12 w-12 md:h-16 md:w-16 border-2 border-white shadow-[0_0_15px_rgba(0,104,255,0.5)] hover:scale-110 active:scale-95 transition-transform flex items-center justify-center relative group"
          href="https://zalo.me/0937863263"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat trực tiếp qua Zalo"
        >
          <img
            src="/img/1280px-Icon_of_Zalo.svg.png"
            alt="Zalo"
            width={28}
            height={28}
            className="w-6 h-6 md:w-8 md:h-8 object-contain"
          />
          <span className="absolute left-full ml-3 bg-[#0068FF] text-white text-xs md:text-sm font-bold whitespace-nowrap px-3 py-1.5 rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all shadow-lg pointer-events-none">
            Chat Zalo
          </span>
        </a>
      </div>


      {/* ========== FOOTER ========== */}
      <footer className="bg-primary border-t border-border-neutral w-full">
        <div className="grid grid-cols-1 gap-4 max-w-container-max mx-auto px-margin-desktop py-4 md:grid-cols-12">
          <div className="col-span-1 mb-4 md:col-span-12">
            <div>
              <img
                src="/img/Logo_website.png"
                alt="Logo Công ty Luật Đức Tín"
                width={244}
                height={48}
                className="h-10 md:h-12 object-contain"
              />
            </div>
          </div>
          <div className="col-span-1 md:col-span-5 lg:col-span-4">
            <iframe
              title="Văn phòng Công ty Luật TNHH Đức Tín & Cộng Sự trên Google Maps"
              allowFullScreen={false}
              className="rounded-lg shadow-elegant w-full h-full"
              height="100%"
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125419.33178072695!2d106.5754288003725!3d10.784166700000023!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f4bc8ad1f21%3A0x1c31b41801cfac6c!2sSaigon%20Trade%20Center%20Tower%20-%20Office%20Saigon!5e0!3m2!1svi!2s!4v1785438121278!5m2!1svi!2s"
              style={{ border: 0, minHeight: "250px" }}
              width="100%"
            />
          </div>
          <div className="col-span-1 md:col-span-7 lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex flex-col gap-1 bg-white/5 border border-white/10 rounded p-2">
              <p className="text-base text-on-primary mb-1 font-bold border-b border-accent pb-1 w-fit uppercase">
                Về chúng tôi
              </p>
              <Link
                className="text-sm text-surface-alt hover:text-accent transition-colors"
                href="/#about-us"
              >
                Giới thiệu chung
              </Link>
              <Link
                className="text-sm text-surface-alt hover:text-accent transition-colors"
                href="/services"
              >
                Lĩnh vực
              </Link>
              <Link
                className="text-sm text-surface-alt hover:text-accent transition-colors"
                href="/appointment"
              >
                Luật sư Phan Đức Tín
              </Link>
            </div>
            <div className="flex flex-col gap-1 bg-white/5 border border-white/10 rounded p-2">
              <p className="text-base text-on-primary mb-1 font-bold border-b border-accent pb-1 w-fit uppercase">
                Tính năng
              </p>
              <Link
                className="text-sm text-surface-alt hover:text-accent transition-colors"
                href="/court-fee-calculator"
              >
                Tính án phí
              </Link>
              <Link
                className="text-sm text-surface-alt hover:text-accent transition-colors"
                href="/salary-calculator"
              >
                Tính lương
              </Link>
              <Link
                className="text-sm text-surface-alt hover:text-accent transition-colors"
                href="/ai-chatbot"
              >
                Hỏi đáp AI
              </Link>
              <Link
                className="text-sm text-surface-alt hover:text-accent transition-colors"
                href="/ai-form-library"
              >
                Biểu mẫu AI
              </Link>
            </div>
            <div className="flex flex-col gap-1 bg-white/5 border border-white/10 rounded p-2">
              <p className="text-base text-on-primary mb-1 font-bold border-b border-accent pb-1 w-fit uppercase">
                Hỗ trợ
              </p>
              <Link
                className="text-sm text-surface-alt hover:text-accent transition-colors"
                href="/appointment"
              >
                Đặt lịch hẹn
              </Link>
              <Link
                className="text-sm text-surface-alt hover:text-accent transition-colors"
                href="/news"
              >
                Tin tức pháp luật
              </Link>
              <Link
                className="text-sm text-surface-alt hover:text-accent transition-colors"
                href="/services"
              >
                Dịch vụ pháp lý
              </Link>
            </div>
            <div className="flex flex-col gap-1 bg-white/5 border border-white/10 rounded p-2">
              <p className="text-base text-on-primary mb-1 font-bold border-b border-accent pb-1 w-fit uppercase">
                Liên hệ
              </p>
              <a
                className="text-sm text-surface-alt hover:text-accent transition-colors font-bold text-accent"
                href="tel:0937863263"
              >
                Hotline: 093 786 32 63
              </a>
              <a
                className="text-sm text-surface-alt hover:text-accent transition-colors"
                href="https://zalo.me/0937863263"
                target="_blank"
                rel="noopener noreferrer"
              >
                Zalo: 093 786 32 63
              </a>
              <a
                className="text-sm text-surface-alt hover:text-accent transition-colors"
                href="mailto:rexmcg12345678@gmail.com"
              >
                Email: rexmcg12345678@gmail.com
              </a>
              <span className="text-xs text-surface-alt">
                Địa chỉ: TP. Hồ Chí Minh
              </span>
            </div>
          </div>
        </div>
        <div className="col-span-1 mt-4 pt-4 border-t border-border-neutral md:col-span-12">
          <div className="max-w-container-max mx-auto px-margin-desktop">
            <p className="font-body-md text-body-md text-surface-alt text-sm pb-4">
              © 2026 CÔNG TY LUẬT TNHH ĐỨC TÍN VÀ CỘNG SỰ (DUC TIN &amp; PARTNERS). All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
