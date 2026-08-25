"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { SERVICES_DATA } from "@/data/servicesData";

type TabType = "about" | "experience" | "articles";

export default function ServiceDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const service = SERVICES_DATA[slug] || SERVICES_DATA["hop-tac-doanh-nghiep"];

  const [activeTab, setActiveTab] = useState<TabType>("about");

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    const navEl = document.getElementById("tab-nav-bar");
    if (navEl) {
      const yOffset = -90;
      const y = navEl.getBoundingClientRect().top + window.pageYOffset + yOffset;
      if (window.pageYOffset > y) {
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
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
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 font-sans tracking-tight mb-3 uppercase leading-tight">
              {service.title}
            </h1>
            <div className="text-amber-600 flex items-center justify-center my-3">
              <span className="tracking-widest font-bold text-lg">— ⚖️ —</span>
            </div>
            <p className="text-base md:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
              {service.heroDesc}
            </p>
          </div>
        </div>
      </section>

      {/* STICKY 3 TABS NAVIGATION (APOLAT STYLE) */}
      <div id="tab-nav-bar" className="sticky top-20 z-40 bg-white/95 backdrop-blur shadow-sm border-y border-slate-200 transition-all">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-center justify-center gap-3 sm:gap-6 py-4">
            {/* Tab 1: Về chúng tôi */}
            <button
              onClick={() => handleTabChange("about")}
              className={`flex items-center gap-2.5 px-5 sm:px-8 py-3 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wide transition-all cursor-pointer ${
                activeTab === "about"
                  ? "border-2 border-[#641D06] text-[#641D06] bg-amber-50/60 shadow-sm"
                  : "bg-white text-slate-600 hover:text-[#641D06] hover:bg-slate-50 border border-slate-200"
              }`}
            >
              <span className="material-symbols-outlined text-lg sm:text-xl">group</span>
              <span>Về Chúng Tôi</span>
            </button>

            {/* Tab 2: Kinh nghiệm */}
            <button
              onClick={() => handleTabChange("experience")}
              className={`flex items-center gap-2.5 px-5 sm:px-8 py-3 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wide transition-all cursor-pointer ${
                activeTab === "experience"
                  ? "border-2 border-[#641D06] text-[#641D06] bg-amber-50/60 shadow-sm"
                  : "bg-white text-slate-600 hover:text-[#641D06] hover:bg-slate-50 border border-slate-200"
              }`}
            >
              <span className="material-symbols-outlined text-lg sm:text-xl">star</span>
              <span>Kinh Nghiệm ({service.experience.length})</span>
            </button>

            {/* Tab 3: Bài viết */}
            <button
              onClick={() => handleTabChange("articles")}
              className={`flex items-center gap-2.5 px-5 sm:px-8 py-3 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wide transition-all cursor-pointer ${
                activeTab === "articles"
                  ? "border-2 border-[#641D06] text-[#641D06] bg-amber-50/60 shadow-sm"
                  : "bg-white text-slate-600 hover:text-[#641D06] hover:bg-slate-50 border border-slate-200"
              }`}
            >
              <span className="material-symbols-outlined text-lg sm:text-xl">article</span>
              <span>Bài Viết ({service.articles.length})</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area - RENDER RIÊNG TỪNG TAB THEO ĐÚNG PHONG CÁCH APOLAT LEGAL */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 pt-10 min-h-[500px]">
        {/* TAB 1: VỀ CHÚNG TÔI (ABOUT) */}
        {activeTab === "about" && (
          <div className="space-y-12">
            {/* Overview Prose */}
            <div className="bg-white rounded-3xl p-6 md:p-12 border border-slate-200 shadow-sm space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-900 text-xs font-bold uppercase tracking-wider">
                Năng lực &amp; Giải pháp chuyên sâu
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 font-sans uppercase">
                Giải Pháp Pháp Lý Vững Chắc Từ Đức Tín &amp; Cộng Sự
              </h2>
              <div className="text-amber-600 flex items-center mb-4">
                <span className="tracking-widest font-bold">— ⚖️ —</span>
              </div>

              <div className="space-y-4 text-slate-700 text-base md:text-lg leading-relaxed">
                {service.about.overview.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>

              {/* 3 Key Highlights Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-slate-100">
                {service.about.keyHighlights.map((hl, idx) => (
                  <div key={idx} className="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-col justify-start">
                    <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center mb-4">
                      <span className="material-symbols-outlined text-2xl">{hl.icon}</span>
                    </div>
                    <h3 className="font-bold text-slate-900 text-lg mb-2">{hl.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{hl.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Scopes of Work (Detailed Pillars) */}
            <div className="space-y-6">
              <div className="text-center max-w-2xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-black text-slate-900 font-sans uppercase">
                  Phạm Vi Dịch Vụ Cụ Thể
                </h2>
                <p className="text-slate-600 text-sm mt-2">
                  Các hạng mục công việc pháp lý chuyên sâu được đảm nhiệm trực tiếp bởi luật sư giàu kinh nghiệm.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {service.about.scopes.map((scope, idx) => (
                  <div key={idx} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:border-amber-500 transition-colors">
                    <h3 className="text-xl font-bold text-[#641D06] mb-4 pb-3 border-b border-slate-100">
                      {scope.title}
                    </h3>
                    <ul className="space-y-3">
                      {scope.items.map((item, itemIdx) => (
                        <li key={itemIdx} className="flex items-start gap-3 text-slate-700 text-sm md:text-base leading-relaxed">
                          <span className="material-symbols-outlined text-emerald-600 text-lg shrink-0 mt-0.5">check_circle</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* 4-Step Legal Workflow */}
            <div className="bg-[#1A1A1A] text-white p-8 md:p-12 rounded-3xl shadow-xl">
              <div className="text-center max-w-2xl mx-auto mb-10">
                <div className="text-amber-400 font-bold text-xs uppercase tracking-widest mb-2">Quy trình làm việc 4 bước</div>
                <h2 className="text-2xl md:text-3xl font-black font-sans uppercase text-white">
                  Phương Thức Triển Khai Minh Bạch
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {service.about.workflow.map((w, idx) => (
                  <div key={idx} className="bg-white/5 border border-white/15 hover:border-amber-400/60 hover:bg-white/10 p-6 rounded-2xl relative overflow-hidden transition-all duration-300 group">
                    <div className="text-4xl sm:text-5xl font-black text-amber-400 mb-3 tracking-tight group-hover:scale-105 transition-transform duration-300 inline-block drop-shadow-[0_2px_8px_rgba(251,191,36,0.3)]">
                      {w.step}
                    </div>
                    <h3 className="font-bold text-white text-lg mb-2 group-hover:text-amber-300 transition-colors">{w.title}</h3>
                    <p className="text-slate-300 text-xs md:text-sm leading-relaxed">{w.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Lead Attorney Badge */}
            <div className="bg-gradient-to-r from-amber-100 via-amber-50 to-white p-6 md:p-8 rounded-3xl border border-amber-200 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
              <div className="flex items-center gap-5">
                <div className="w-20 h-20 rounded-full bg-emerald-100 border-2 border-emerald-400 overflow-hidden shrink-0 shadow-inner">
                  <img src="/img/avatar1.png" alt="Ls. Phan Đức Tín" className="w-full h-full object-cover" />
                </div>
                <div>
                  <div className="text-xs font-bold text-amber-800 uppercase tracking-wider">Luật sư Chủ trì Lĩnh vực</div>
                  <h3 className="text-xl md:text-2xl font-bold text-slate-900">Luật sư Phan Đức Tín</h3>
                  <p className="text-sm text-slate-600 mt-1">Giám đốc Điều hành Công ty Luật TNHH Đức Tín và Cộng sự</p>
                </div>
              </div>
              <div className="flex gap-3 shrink-0">
                <Link href="/appointment" className="bg-[#641D06] hover:bg-black text-white px-6 py-3 rounded-xl font-bold text-sm transition-colors shadow-sm flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">calendar_month</span>
                  Đặt Hẹn Tư Vấn
                </Link>
                <a href="tel:0937863263" className="bg-emerald-700 hover:bg-emerald-800 text-white px-6 py-3 rounded-xl font-bold text-sm transition-colors shadow-sm flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">call</span>
                  093 786 32 63
                </a>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: KINH NGHIỆM THỰC CHIẾN (EXPERIENCE) */}
        {activeTab === "experience" && (
          <div className="space-y-8">
            <div className="text-center max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
                <span className="material-symbols-outlined text-sm">verified</span>
                Thương vụ &amp; Dự án tiêu biểu
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 font-sans uppercase">
                Kinh Nghiệm &amp; Vụ Việc Thực Tế
              </h2>
              <p className="text-slate-600 text-sm mt-2">
                Những thương vụ tư vấn, giải quyết tranh chấp và bảo vệ quyền lợi thành công của Đức Tín &amp; Cộng sự.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {service.experience.map((exp, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm hover:shadow-xl hover:border-amber-500 transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-bold uppercase">
                        {exp.year}
                      </span>
                      <span className="text-emerald-700 font-bold text-xs uppercase flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">verified</span>
                        Thắng lợi
                      </span>
                    </div>
                    <div className="text-xs font-bold text-amber-900 uppercase tracking-wider mb-1">
                      {exp.clientType}
                    </div>
                    <h3 className="text-lg font-bold text-[#641D06] mb-3 leading-snug group-hover:text-amber-900 transition-colors">
                      {exp.title}
                    </h3>
                    <div className="bg-emerald-50/80 p-3.5 rounded-xl border border-emerald-100 text-emerald-900 text-xs sm:text-sm font-semibold mb-4">
                      🎯 {exp.result}
                    </div>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                      {exp.summary}
                    </p>
                  </div>

                  <div className="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between">
                    <Link
                      href="/appointment"
                      className="text-xs font-bold text-[#641D06] hover:text-black flex items-center gap-1 uppercase"
                    >
                      Tư vấn vụ việc tương tự
                      <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: BÀI VIẾT CHUYÊN MÔN (ARTICLES) */}
        {activeTab === "articles" && (
          <div className="space-y-8">
            <div className="text-center max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider mb-3">
                <span className="material-symbols-outlined text-sm">menu_book</span>
                Kiến thức &amp; Cập nhật pháp luật
              </div>
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
                  className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-sm hover:shadow-xl hover:border-[#641D06] transition-all flex flex-col justify-between group overflow-hidden"
                >
                  <div>
                    {/* Article Card Thumbnail */}
                    <div className="relative w-full h-44 rounded-2xl overflow-hidden mb-4 border border-slate-100 bg-slate-100 shadow-2xs">
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

                    <div className="flex items-center gap-2 text-xs text-slate-500 font-semibold mb-2">
                      <span className="material-symbols-outlined text-sm text-amber-700">schedule</span>
                      <span>{art.readTime}</span>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2.5 group-hover:text-[#641D06] transition-colors leading-snug">
                      <Link href={`/news/${art.slug}`}>{art.title}</Link>
                    </h3>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6 line-clamp-3">
                      {art.excerpt}
                    </p>
                  </div>
                  <Link
                    href={`/news/${art.slug}`}
                    className="inline-flex items-center justify-between bg-slate-50 hover:bg-[#641D06] text-slate-800 hover:text-white rounded-xl px-4 py-2.5 font-bold text-xs transition-colors group/link mt-auto"
                  >
                    <span>Đọc Toàn Bộ Bài Viết</span>
                    <span className="material-symbols-outlined text-sm group-hover/link:translate-x-1 transition-transform">
                      arrow_forward
                    </span>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* BOTTOM CALL TO ACTION */}
        <section className="bg-gradient-to-r from-[#641D06] to-[#3B1104] text-white p-8 md:p-14 rounded-3xl shadow-2xl text-center mt-16 mb-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black font-sans uppercase mb-4 text-white">
            Cần Tư Vấn Chuyên Sâu Trong Lĩnh Vực Này?
          </h2>
          <p className="text-amber-100 text-base md:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
            Luật sư Phan Đức Tín và đội ngũ chuyên gia sẵn sàng lắng nghe và đưa ra giải pháp pháp lý tối ưu nhất cho bạn.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/appointment"
              className="bg-[#C0963B] hover:bg-[#a37b2c] text-white font-bold px-8 py-3.5 rounded-xl uppercase text-sm shadow-lg transition-colors flex items-center gap-2"
            >
              <span className="material-symbols-outlined">calendar_month</span>
              Đặt Lịch Hẹn Tư Vấn
            </Link>
            <a
              href="https://zalo.me/0937863263"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 hover:bg-white/20 text-white font-bold px-8 py-3.5 rounded-xl uppercase text-sm border border-white/20 transition-colors flex items-center gap-2"
            >
              <span className="material-symbols-outlined">chat</span>
              Nhắn Tin Zalo Trực Tiếp
            </a>
            <a
              href="tel:0937863263"
              className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-8 py-3.5 rounded-xl uppercase text-sm shadow-lg transition-colors flex items-center gap-2"
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
