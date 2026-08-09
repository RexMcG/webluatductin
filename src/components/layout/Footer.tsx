import Link from "next/link";

export default function Footer() {
  return (
    <>
      {/* Floating Contact Bubbles (Left) */}
      <div className="fixed bottom-margin-mobile left-margin-mobile z-50 flex flex-col gap-3">
        {/* Booking Bubble */}
        <Link
          className="bg-primary text-on-primary rounded-full h-12 w-12 border border-border-neutral shadow-elegant hover:bg-secondary hover:text-accent transition-all flex items-center justify-center relative group"
          href="/appointment"
        >
          <span className="material-symbols-outlined">calendar_month</span>
          <span className="absolute left-full ml-3 bg-secondary text-on-primary text-xs whitespace-nowrap px-2 py-1 rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
            Đặt lịch hẹn
          </span>
        </Link>
        {/* SMS Bubble */}
        <a
          className="bg-surface-main text-primary rounded-full h-12 w-12 border border-border-neutral shadow-elegant hover:bg-surface-alt transition-all flex items-center justify-center relative group"
          href="sms:09xxxxxxxx"
        >
          <span className="material-symbols-outlined">sms</span>
          <span className="absolute left-full ml-3 bg-secondary text-on-primary text-xs whitespace-nowrap px-2 py-1 rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
            Gửi SMS
          </span>
        </a>
        {/* Zalo Bubble */}
        <a
          className="bg-[#0068FF] text-white rounded-full h-12 w-12 border border-[#0068FF] shadow-elegant hover:opacity-90 transition-all flex items-center justify-center relative group"
          href="https://zalo.me/09xxxxxxxx"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="/img/1280px-Icon_of_Zalo.svg.png"
            alt="Zalo"
            className="w-6 h-6 object-contain"
          />
          <span className="absolute left-full ml-3 bg-secondary text-on-primary text-xs whitespace-nowrap px-2 py-1 rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
            Chat Zalo
          </span>
        </a>
      </div>

      {/* Floating AI Widget */}
      <Link
        className="fixed bottom-margin-mobile right-margin-mobile z-50 bg-accent text-on-accent rounded-full h-16 w-16 border border-border-neutral shadow-elegant hover:bg-primary-container hover:text-on-primary-container transition-all flex items-center justify-center"
        href="/ai-chatbot"
      >
        <span className="material-symbols-outlined text-2xl">smart_toy</span>
      </Link>

      {/* ========== FOOTER ========== */}
      <footer className="bg-primary border-t border-border-neutral w-full">
        <div className="grid grid-cols-1 gap-4 max-w-container-max mx-auto px-margin-desktop py-4 md:grid-cols-12">
          <div className="col-span-1 mb-4 md:col-span-12">
            <div>
              <img
                src="/img/Logo_website.png"
                alt="Logo"
                className="h-10 md:h-12 object-contain"
              />
            </div>
          </div>
          <div className="col-span-1 md:col-span-5 lg:col-span-4">
            <iframe
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
                href="#"
              >
                Đội ngũ
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
                href="#"
              >
                Chính sách bảo mật
              </Link>
              <Link
                className="text-sm text-surface-alt hover:text-accent transition-colors"
                href="#"
              >
                Điều khoản
              </Link>
            </div>
            <div className="flex flex-col gap-1 bg-white/5 border border-white/10 rounded p-2">
              <p className="text-base text-on-primary mb-1 font-bold border-b border-accent pb-1 w-fit uppercase">
                Liên hệ
              </p>
              <a
                className="text-sm text-surface-alt hover:text-accent transition-colors"
                href="#"
              >
                Hotline: 09xx.xxx.xxx
              </a>
              <a
                className="text-sm text-surface-alt hover:text-accent transition-colors"
                href="#"
              >
                Email: info@ductinlaw.vn
              </a>
              <a
                className="text-sm text-surface-alt hover:text-accent transition-colors"
                href="#"
              >
                Địa chỉ: TP. Hồ Chí Minh
              </a>
            </div>
          </div>
        </div>
        <div className="col-span-1 mt-4 pt-4 border-t border-border-neutral md:col-span-12">
          <div className="max-w-container-max mx-auto px-margin-desktop">
            <p className="font-body-md text-body-md text-surface-alt text-sm pb-4">
              © 2024 DUCTIN &amp; PARTNERS. All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
