"use client";

import Link from "next/link";
import { SERVICES_DATA } from "@/data/servicesData";

export default function ServicesPage() {
  const serviceList = Object.values(SERVICES_DATA);

  const SERVICE_IMAGES: Record<string, string> = {
    "hop-tac-doanh-nghiep": "/img/card_business.webp",
    "tu-van-dau-tu": "/img/card_fdi.webp",
    "tranh-tung": "/img/card_court.webp",
    "bat-dong-san": "/img/card_realestate.webp",
    "lao-dong": "/img/card_labor.webp",
    "hon-nhan-gia-dinh": "/img/card_family.webp",
    "thu-tuc-phap-ly-giay-phep": "/img/card_license.webp",
    "hinh-su-bao-chua": "/img/card_criminal.webp",
    "so-huu-tri-tue": "/img/card_ip.webp",
  };

  return (
    <div className="bg-surface-alt min-h-screen pb-20">
      {/* Hero Section VỚI ĐƯỜNG LINE ĐỎ ĐÔ 7PX Ở DƯỚI CÙNG */}
      <section
        className="relative w-full bg-cover bg-[center_25%] bg-no-repeat border-b-[7px] border-[#641D06]"
        style={{ backgroundImage: "url('/img/herobanner.webp')" }}
      >
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-32 md:py-40 flex items-center min-h-[480px]">
          <div className="max-w-3xl space-y-6 flex flex-col items-start text-left">
            <div className="rounded-full px-4 py-1.5 bg-primary text-[11px] uppercase tracking-[0.2em] font-bold text-accent shadow-md">
              Tầm nhìn &amp; Sứ mệnh Pháp Lý 2026
            </div>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black font-sans leading-[1.15] text-primary tracking-tight">
              Giải Pháp Pháp Lý <br /> <span className="italic text-accent font-sans">Toàn Diện &amp; Tận Tâm</span>
            </h1>
            <p className="font-body-md text-base md:text-xl text-primary font-semibold max-w-2xl leading-relaxed">
              Bảo vệ tối đa quyền lợi hợp pháp, đồng hành giải quyết tranh chấp và kiến tạo giá trị bền vững cho doanh nghiệp và cá nhân.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid (GIỮ NGUYÊN LƯỚI 3 CỘT/HÀNG CÂN ĐỐI VỪA PHẢI, KHÔNG ĐÁNH SỐ) */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 uppercase font-sans">
            Lĩnh Vực Hoạt Động Cốt Lõi
          </h2>
          <div className="text-amber-600 flex items-center justify-center my-3">
            <span className="tracking-widest font-bold text-lg">— ⚖️ —</span>
          </div>
          <p className="text-slate-600 text-base md:text-lg leading-relaxed">
            Đức Tín &amp; Cộng sự quy tụ đội ngũ luật sư chuyên gia với bề dày thực chiến, giải quyết nhanh chóng và hiệu quả mọi bài toán pháp lý.
          </p>
        </div>

        {/* Lưới 3 cột chuẩn cân đối vừa phải */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {serviceList.map((srv, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-sm hover:shadow-xl hover:border-amber-500 transition-all flex flex-col justify-between group overflow-hidden"
            >
              <div>
                {/* Thumbnail Image */}
                <div className="relative w-full h-48 sm:h-52 rounded-2xl overflow-hidden mb-5 border border-slate-100 bg-slate-100 shadow-2xs">
                  <img
                    src={SERVICE_IMAGES[srv.slug] || "/img/card_court.webp"}
                    alt={srv.title}
                    width={700}
                    height={394}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="rounded-full px-3.5 py-1 bg-white/95 backdrop-blur-xs text-[11px] uppercase tracking-wider font-extrabold text-amber-950 border border-amber-200/80 shadow-sm">
                      {srv.category}
                    </span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-2.5 group-hover:text-[#641D06] transition-colors leading-snug">
                  {srv.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-3">
                  {srv.heroDesc}
                </p>
              </div>

              <div className="flex flex-col gap-2.5 pt-5 border-t border-slate-100 mt-auto">
                <Link
                  href={`/services/${srv.slug}`}
                  className="flex w-full items-center justify-between bg-[#641D06] text-white rounded-xl px-4 py-2.5 hover:bg-black transition-colors font-bold text-xs shadow-2xs"
                >
                  <span>Xem Chi Tiết Dịch Vụ</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    href="/appointment"
                    className="flex items-center justify-center gap-1 bg-slate-100 hover:bg-slate-200 text-slate-900 rounded-xl py-2 text-xs font-bold transition-colors"
                  >
                    <span className="material-symbols-outlined text-sm">calendar_month</span>
                    Đặt Hẹn
                  </Link>
                  <Link
                    href="/ai-chatbot"
                    className="flex items-center justify-center gap-1 bg-amber-50 hover:bg-amber-100 text-amber-950 border border-amber-200 rounded-xl py-2 text-xs font-bold transition-colors"
                  >
                    <span className="material-symbols-outlined text-sm">chat</span>
                    Hỏi AI
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Consultation Banner */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 mt-6">
        <div className="bg-[#1A1A1A] text-white p-8 md:p-12 rounded-3xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="text-amber-400 font-bold text-xs uppercase tracking-widest mb-1">Tư vấn trực tiếp cùng Luật sư</div>
            <h3 className="text-2xl md:text-3xl font-black font-sans uppercase text-white mb-2">Luật Sư Phan Đức Tín</h3>
            <p className="text-slate-300 text-sm md:text-base max-w-xl leading-relaxed">
              Hơn 15 năm kinh nghiệm giải quyết tranh chấp kinh doanh, bất động sản và đầu tư FDI tại Việt Nam.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <a
              href="tel:0937863263"
              className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-6 py-3.5 rounded-xl uppercase text-sm shadow-md transition-colors flex items-center gap-2"
            >
              <span className="material-symbols-outlined">call</span>
              093 786 32 63
            </a>
            <Link
              href="/appointment"
              className="bg-[#C0963B] hover:bg-[#a37b2c] text-white font-bold px-6 py-3.5 rounded-xl uppercase text-sm shadow-md transition-colors flex items-center gap-2"
            >
              <span className="material-symbols-outlined">calendar_month</span>
              Đặt Lịch Hẹn
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
