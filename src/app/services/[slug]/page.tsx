"use client";

import { useState, useEffect } from "react";
import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import { SERVICES_DATA, SERVICE_IMAGES } from "@/data/servicesData";
import SectionDivider from "@/components/common/SectionDivider";
import { siteContentService } from "@/services/site-content.service";

type TabType = "about" | "experience" | "articles";

export default function ServiceDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [content, setContent] = useState(siteContentService.getContent());

  useEffect(() => {
    setContent(siteContentService.getContent());
    const unsub = siteContentService.subscribe((data) => {
      setContent(data);
    });
    return () => unsub();
  }, []);

  const service = (content.servicesDetail && content.servicesDetail[slug]) || SERVICES_DATA[slug];

  const [activeTab, setActiveTab] = useState<TabType>("about");

  if (!service) notFound();

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    
    // Cuộn ngay lên đầu trang khi chuyển tab
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (typeof document !== "undefined") {
      document.documentElement.scrollTo({ top: 0, behavior: "smooth" });
      document.body.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="bg-[#FAF8F4] min-h-screen pb-20">
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-amber-900/10 via-amber-900/5 to-transparent pt-8 pb-6 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs md:text-sm text-slate-500 font-semibold mb-5">
            <Link href="/" className="hover:text-emerald-700 transition-colors">Trang chủ</Link>
            <span>/</span>
            <Link href="/services" className="hover:text-emerald-700 transition-colors">Lĩnh vực hoạt động</Link>
            <span>/</span>
            <span className="text-slate-900 font-bold">{service.title}</span>
          </nav>

          {/* Title Area */}
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 font-sans tracking-tight mb-3 leading-tight">
              {service.title}
            </h1>
            <SectionDivider label="DỊCH VỤ PHÁP LÝ" />
            <p className="text-base md:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
              {service.heroDesc}
            </p>
          </div>
        </div>
      </section>

      {/* STICKY 3 TABS NAVIGATION (APOLAT STYLE) */}
      <div id="tab-nav-bar" className="sticky top-20 z-40 bg-white/95 backdrop-blur shadow-sm border-y border-slate-200 transition-all">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-3 sm:flex sm:items-center sm:justify-center gap-2 sm:gap-6 py-3 sm:py-4">
            {/* Tab 1: Về chúng tôi */}
            <button
              onClick={() => handleTabChange("about")}
              className={`flex items-center justify-center gap-2.5 px-2 sm:px-8 py-2.5 sm:py-3 rounded-xl font-bold text-[11px] sm:text-sm uppercase sm:tracking-wide whitespace-nowrap transition-all cursor-pointer ${
                activeTab === "about"
                  ? "border-2 border-[#641D06] text-[#641D06] bg-amber-50/60 shadow-sm"
                  : "bg-white text-slate-600 hover:text-[#641D06] hover:bg-slate-50 border border-slate-200"
              }`}
            >
              <span className="hidden sm:inline-flex"><span className="material-symbols-outlined text-lg sm:text-xl">group</span></span>
              <span>Tổng Quan</span>
            </button>

            {/* Tab 2: Kinh nghiệm */}
            <button
              onClick={() => handleTabChange("experience")}
              className={`flex items-center justify-center gap-2.5 px-2 sm:px-8 py-2.5 sm:py-3 rounded-xl font-bold text-[11px] sm:text-sm uppercase sm:tracking-wide whitespace-nowrap transition-all cursor-pointer ${
                activeTab === "experience"
                  ? "border-2 border-[#641D06] text-[#641D06] bg-amber-50/60 shadow-sm"
                  : "bg-white text-slate-600 hover:text-[#641D06] hover:bg-slate-50 border border-slate-200"
              }`}
            >
              <span className="hidden sm:inline-flex"><span className="material-symbols-outlined text-lg sm:text-xl">star</span></span>
              <span>Kinh Nghiệm ({service.experience.length})</span>
            </button>

            {/* Tab 3: Bài viết */}
            <button
              onClick={() => handleTabChange("articles")}
              className={`flex items-center justify-center gap-2.5 px-2 sm:px-8 py-2.5 sm:py-3 rounded-xl font-bold text-[11px] sm:text-sm uppercase sm:tracking-wide whitespace-nowrap transition-all cursor-pointer ${
                activeTab === "articles"
                  ? "border-2 border-[#641D06] text-[#641D06] bg-amber-50/60 shadow-sm"
                  : "bg-white text-slate-600 hover:text-[#641D06] hover:bg-slate-50 border border-slate-200"
              }`}
            >
              <span className="hidden sm:inline-flex"><span className="material-symbols-outlined text-lg sm:text-xl">article</span></span>
              <span>Bài Viết ({service.articles.length})</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area - RENDER RIÊNG TỪNG TAB THEO ĐÚNG PHONG CÁCH APOLAT LEGAL */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 pt-14 md:pt-20 min-h-[500px]">
        {/* TAB 1: TỔNG QUAN */}
        {activeTab === "about" && (
          <div className="space-y-12 md:space-y-28">
            {/* Giới thiệu */}
            <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              <div className="lg:col-span-7">
                <p className="text-lg md:text-xl text-[#2B1408] font-medium leading-[1.7] mb-5">
                  {service.about.overview[0]}
                </p>
                <div className="space-y-4 text-[#5A4D44] text-base md:text-lg leading-[1.8]">
                  {service.about.overview.slice(1).map((para, idx) => (
                    <p key={idx}>{para}</p>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="relative max-w-md mx-auto lg:mr-0">
                  <div className="absolute -top-3 -right-3 w-full h-full border border-[#C0963B]/50 rounded-sm hidden md:block" aria-hidden="true" />
                  <img
                    src={SERVICE_IMAGES[service.slug] || "/img/card_court.webp"}
                    alt={service.title}
                    width={700}
                    height={525}
                    className="relative w-full aspect-[4/3] object-cover rounded-sm shadow-lg shadow-[#2B1408]/10"
                  />
                </div>
              </div>
            </section>

            {/* Điểm nổi bật */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#E8DFD2] border border-[#E8DFD2]">
              {service.about.keyHighlights.map((hl, idx) => (
                <div key={idx} className="bg-white p-6 md:p-10">
                  <span className="material-symbols-outlined text-[28px] text-[#641D06] mb-4 md:mb-6 block">{hl.icon}</span>
                  <h3 className="text-xl md:text-2xl text-[#2B1408] leading-snug mb-3 font-bold">{hl.title}</h3>
                  <p className="text-[#6B5E55] text-base md:text-[17px] leading-relaxed">{hl.desc}</p>
                </div>
              ))}
            </section>

            {/* Quy trình làm việc */}
            <section className="relative overflow-hidden bg-[#2B1408] text-white px-5 py-10 md:px-14 md:py-16">
              <div className="absolute inset-x-0 top-0 h-1 bg-[#C0963B]" aria-hidden="true" />
              <div className="max-w-2xl mb-8 md:mb-12">
                <div className="flex items-center gap-3 mb-5">
                  <span className="w-10 h-px bg-[#C0963B]" aria-hidden="true" />
                  <span className="text-xs font-semibold tracking-[0.22em] text-[#D9B872] uppercase">Quy trình làm việc</span>
                </div>
                <h2 className="text-3xl md:text-4xl leading-tight font-bold">
                  Quy trình đồng hành cùng Quý khách
                </h2>
              </div>
              <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 sm:gap-10 lg:gap-8">
                {service.about.workflow.map((wf, idx) => (
                  <li key={idx} className="border-t border-white/20 py-5 sm:pt-6 sm:pb-0 flex sm:block gap-4">
                    <span className="shrink-0 block text-2xl sm:text-[44px] text-[#D9B872] leading-none sm:mb-5 tabular-nums font-bold w-9 sm:w-auto pt-0.5 sm:pt-0">{wf.step}</span>
                    <div>
                      <p className="font-semibold text-lg md:text-xl leading-snug mb-1.5 sm:mb-2">{wf.title}</p>
                      <p className="text-white/75 text-base leading-relaxed">{wf.desc}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>
            {/* Phạm vi dịch vụ */}
            <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
              <div className="lg:col-span-4">
                <div className="lg:sticky lg:top-44">
                  <div className="flex items-center gap-3 mb-5">
                    <span className="w-10 h-px bg-[#C0963B]" aria-hidden="true" />
                    <span className="text-xs font-semibold tracking-[0.22em] text-[#9A7530] uppercase">Phạm vi dịch vụ</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl text-[#2B1408] leading-tight mb-5 font-bold">
                    Công việc luật sư đảm nhận
                  </h2>
                  <p className="text-[#6B5E55] text-base md:text-lg leading-relaxed mb-8">
                    Các hạng mục công việc pháp lý do luật sư phụ trách lĩnh vực trực tiếp thực hiện.
                  </p>
                  <Link
                    href="/appointment"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#641D06] border-b border-[#641D06] pb-1 hover:text-black hover:border-black transition-colors"
                  >
                    Trao đổi với luật sư
                    <span className="material-symbols-outlined text-base">arrow_forward</span>
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-8 space-y-4">
                {service.about.scopes.map((scope, idx) => (
                  <div key={idx} className="bg-white border border-[#E8DFD2] p-5 sm:p-7 md:p-9">
                    <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-5 mb-4 sm:mb-5">
                      <span className="text-2xl sm:text-4xl text-[#C0963B] leading-none tabular-nums font-bold">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <h3 className="text-xl md:text-2xl text-[#2B1408] leading-snug font-bold">
                        {scope.title.replace(/^\d+\.\s*/, "")}
                      </h3>
                    </div>
                    <ul className="divide-y divide-[#F0E9DF]">
                      {scope.items.map((item, itemIdx) => (
                        <li key={itemIdx} className="py-3.5 first:pt-0 last:pb-0 text-[#4A3F38] text-base md:text-lg leading-relaxed">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

          </div>
        )}

        {/* TAB 2: KINH NGHIỆM */}
        {activeTab === "experience" && (
          <div>
            <div className="max-w-2xl mb-8 md:mb-12">
              <div className="flex items-center gap-3 mb-5">
                <span className="w-10 h-px bg-[#C0963B]" aria-hidden="true" />
                <span className="text-xs font-semibold tracking-[0.22em] text-[#9A7530] uppercase">Kinh nghiệm</span>
              </div>
              <h2 className="text-3xl md:text-[42px] text-[#2B1408] leading-tight mb-4 font-bold">
                Vụ việc tiêu biểu
              </h2>
              <p className="text-[#6B5E55] text-base md:text-lg leading-relaxed">
                Một số vụ việc tư vấn và giải quyết tranh chấp do Đức Tín &amp; Cộng sự thực hiện trong lĩnh vực này.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {service.experience.map((exp, idx) => (
                <article
                  key={idx}
                  className={`group bg-white border border-[#E8DFD2] flex flex-col transition-shadow hover:shadow-xl hover:shadow-[#2B1408]/5 ${
                    service.experience.length % 2 === 1 && idx === service.experience.length - 1 ? "md:col-span-2" : ""
                  }`}
                >
                  <div className="h-1 bg-[#C0963B]" aria-hidden="true" />
                  <div className="p-5 sm:p-8 md:p-10 flex flex-col flex-1">
                    <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-x-3 gap-y-1 text-xs font-semibold tracking-[0.14em] uppercase text-[#9A7530] mb-4 sm:mb-5">
                      <span className="tabular-nums">{exp.year}</span>
                      <span className="hidden sm:block w-1 h-1 rounded-full bg-[#C0963B]" aria-hidden="true" />
                      <span>{exp.clientType}</span>
                    </div>
                    <h3 className="text-2xl md:text-[26px] text-[#2B1408] leading-snug mb-4 font-bold">
                      {exp.title}
                    </h3>
                    <p className="text-[#6B5E55] text-base md:text-lg leading-relaxed mb-7">{exp.summary}</p>

                    <div className="mt-auto bg-[#FAF6EF] border-l-2 border-[#C0963B] px-4 sm:px-5 py-4 mb-6 sm:mb-7">
                      <p className="text-[11px] font-bold tracking-[0.18em] text-[#641D06] uppercase mb-1.5">Kết quả</p>
                      <p className="text-[#2B1408] text-base md:text-lg leading-relaxed">{exp.result}</p>
                    </div>

                    <Link
                      href="/appointment"
                      className="self-start inline-flex items-center gap-2 text-sm font-semibold text-[#641D06] border-b border-[#641D06]/40 pb-1 hover:text-black hover:border-black transition-colors"
                    >
                      Tư vấn vụ việc tương tự
                      <span className="material-symbols-outlined text-base">arrow_forward</span>
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            <p className="text-sm text-[#8A7D73] italic max-w-3xl mt-8 leading-relaxed">
              Thông tin về kinh nghiệm và vụ việc được trình bày khái quát, đã lược bỏ thông tin nhận diện khách hàng. Kết quả của mỗi vụ việc phụ thuộc vào hồ sơ và tình tiết cụ thể.
            </p>
          </div>
        )}

        {/* TAB 3: BÀI VIẾT CHUYÊN MÔN (ARTICLES) */}
        {activeTab === "articles" && (
          <div className="space-y-8">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 font-sans uppercase">
                Bài Viết &amp; Phân Tích Chuyên Môn
              </h2>
              <p className="text-slate-600 text-sm mt-2">
                Các bài phân tích chuyên sâu về {service.title} bởi đội ngũ Luật sư Đức Tín &amp; Cộng sự.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {service.articles.map((art, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-[#641D06] transition-all flex flex-col justify-between group overflow-hidden"
                >
                  <div className="flex flex-col flex-grow">
                    {/* Article Card Thumbnail Full Bleed */}
                    <div className="relative w-full h-48 overflow-hidden bg-slate-100">
                      <img
                        src="/img/card_license.webp"
                        alt={art.title}
                        width={700}
                        height={394}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs text-[10px] uppercase tracking-wider font-extrabold text-amber-950 px-3 py-1 rounded-full border border-amber-200/80 shadow-xs">
                        {art.date}
                      </div>
                    </div>

                    <div className="p-5 sm:p-6 flex flex-col flex-grow">
                      <div className="flex items-center gap-2 text-xs text-slate-500 font-semibold mb-2">
                        <span className="material-symbols-outlined text-sm text-amber-700">schedule</span>
                        <span>{art.readTime}</span>
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2.5 group-hover:text-[#641D06] transition-colors leading-snug">
                        <Link href={`/news/${art.slug}`}>{art.title}</Link>
                      </h3>
                      <p className="text-slate-600 text-xs sm:text-sm leading-relaxed line-clamp-3">
                        {art.excerpt}
                      </p>
                    </div>
                  </div>
                  <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-0 mt-auto">
                    <Link
                      href={`/news/${art.slug}`}
                      className="inline-flex w-full items-center justify-between bg-slate-50 hover:bg-[#641D06] text-slate-800 hover:text-white rounded-xl px-4 py-2.5 font-bold text-xs transition-colors group/link"
                    >
                      <span>Đọc Toàn Bộ Bài Viết</span>
                      <span className="material-symbols-outlined text-sm group-hover/link:translate-x-1 transition-transform">arrow_forward</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* BOTTOM CALL TO ACTION */}
        <section className="bg-gradient-to-r from-[#641D06] to-[#3B1104] text-white px-5 py-10 sm:p-8 md:p-14 rounded-3xl shadow-2xl text-center mt-12 md:mt-16 mb-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black font-sans uppercase mb-4 text-white">
            Cần Tư Vấn Chuyên Sâu Trong Lĩnh Vực Này?
          </h2>
          <p className="text-amber-100 text-base md:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
            Luật sư Phan Đức Tín và đội ngũ luật sư sẵn sàng lắng nghe và đưa ra giải pháp pháp lý phù hợp cho Quý khách.
          </p>
          <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center justify-center gap-3 sm:gap-4">
            <Link
              href="/appointment"
              className="bg-[#C0963B] hover:bg-[#a37b2c] text-white font-bold px-8 py-3.5 rounded-xl uppercase text-sm shadow-lg transition-colors flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined">calendar_month</span>
              Đặt Lịch Hẹn Tư Vấn
            </Link>
            <a
              href="https://zalo.me/0937863263"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 hover:bg-white/20 text-white font-bold px-8 py-3.5 rounded-xl uppercase text-sm border border-white/20 transition-colors flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined">chat</span>
              Nhắn Tin Zalo Trực Tiếp
            </a>
            <a
              href="tel:0937863263"
              className="bg-[#22c55e] hover:bg-[#16a34a] text-white font-bold px-8 py-3.5 rounded-xl uppercase text-sm shadow-lg transition-colors flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined">call</span>
              Hotline: 093 786 32 63
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
