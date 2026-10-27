"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { SERVICES_DATA, SERVICE_IMAGES } from "@/data/servicesData";
import SectionDivider from "@/components/common/SectionDivider";
import { siteContentService, DEFAULT_SITE_CONTENT } from "@/services/site-content.service";

export default function ServicesPage() {
  const [content, setContent] = useState(DEFAULT_SITE_CONTENT);

  useEffect(() => {
    setContent(siteContentService.getContent());
    const unsub = siteContentService.subscribe((data) => {
      setContent(data);
    });
    return () => unsub();
  }, []);

  // Danh mục lĩnh vực cốt lõi chuẩn hóa bao gồm đầy đủ Thu Hồi Nợ Khó Đòi
  const PRACTICE_AREAS_ORDER = [
    "hop-tac-doanh-nghiep",
    "thu-hoi-no",
    "tu-van-dau-tu",
    "thu-tuc-phap-ly-giay-phep",
    "di-chuc-thua-ke",
    "dan-su",
    "lao-dong",
    "tranh-tung",
    "bat-dong-san",
    "hon-nhan-gia-dinh",
  ];

  const allServices = (content.servicesDetail && Object.keys(content.servicesDetail).length > 0)
    ? { ...SERVICES_DATA, ...content.servicesDetail }
    : SERVICES_DATA;

  const serviceList = PRACTICE_AREAS_ORDER.map((slug) => allServices[slug]).filter(Boolean);

  return (
    <div className="bg-surface-alt min-h-screen pb-20">
      {/* Hero Section VỚI ĐƯỜNG LINE ĐỎ ĐÔ 7PX Ở DƯỚI CÙNG */}
      <section
        className="relative w-full bg-cover bg-[right_top] bg-no-repeat border-b-[7px] border-[#641D06] overflow-hidden"
        style={{ backgroundImage: "url('/img/herobanner.webp')" }}
      >
        {/* Soft readable gradient for mobile / narrow viewports where text crosses statue */}
        <div className="md:hidden absolute inset-0 bg-gradient-to-r from-white/95 via-white/85 to-transparent z-0 pointer-events-none" />

        <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-24 flex items-center min-h-[460px] sm:min-h-[500px] md:min-h-[560px] lg:min-h-[620px]">
          <div className="w-full md:max-w-[50%] lg:max-w-[48%] xl:max-w-[46%] space-y-3 sm:space-y-4 md:space-y-5 flex flex-col items-start text-left">
            <h1 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-[44px] font-black font-sans leading-[1.2] text-primary tracking-tight">
              {content.servicesPage.hero.title} <br />{" "}
              <span className="text-accent text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold tracking-wide block mt-1.5 md:mt-2.5">
                {content.servicesPage.hero.titleAccent}
              </span>
            </h1>
            <p className="font-body-md text-sm sm:text-base md:text-lg text-slate-800 font-medium leading-relaxed">
              {content.servicesPage.hero.description}
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid (LƯỚI 3 CỘT/HÀNG CÂN ĐỐI VỪA PHẢI, TIÊU ĐỀ NGẮN GỌN CĂN GIỮA) */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 font-sans tracking-tight">
            {content.servicesPage.section.heading}
          </h2>
          <SectionDivider label={content.servicesPage.section.subHeading || "LĨNH VỰC HOẠT ĐỘNG"} />
          <p className="text-slate-600 text-base md:text-lg leading-relaxed">
            {content.servicesPage.section.description}
          </p>
        </div>

        {/* Lưới 3 cột chuẩn cân đối vừa phải - Clickable Card toàn diện */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {serviceList.map((srv, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl border border-slate-200 shadow-xs hover:shadow-2xl hover:border-amber-500 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group overflow-hidden relative cursor-pointer"
            >
              {/* Main Clickable Area navigating to service detail */}
              <Link href={`/services/${srv.slug}`} className="block flex-1 flex flex-col">
                {/* Thumbnail Image Full-Bleed */}
                <div className="relative w-full h-52 sm:h-56 overflow-hidden bg-slate-100">
                  <img
                    src={SERVICE_IMAGES[srv.slug] || "/img/card_court.webp"}
                    alt={srv.title}
                    width={700}
                    height={394}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Tiêu đề ngắn gọn căn lề giữa */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col">
                  <h3 className="text-lg sm:text-xl font-black text-slate-900 mb-2.5 group-hover:text-[#641D06] transition-colors leading-snug text-center uppercase tracking-tight">
                    {srv.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-2 line-clamp-3 flex-1 text-center">
                    {srv.heroDesc}
                  </p>
                </div>
              </Link>

              {/* Quick Action Footer: Nút Xem Chi Tiết */}
              <div className="px-5 sm:px-6 pb-5 sm:pb-6 mt-auto">
                <Link
                  href={`/services/${srv.slug}`}
                  className="w-full flex items-center justify-center bg-[#641D06] hover:bg-black text-white rounded-xl py-2.5 sm:py-3 text-sm sm:text-[15px] font-bold transition-all active:scale-98 shadow-sm hover:shadow-md text-center tracking-wide"
                >
                  <span>Xem chi tiết</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
