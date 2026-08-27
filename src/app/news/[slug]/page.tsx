"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { newsService } from "@/services/news.service";
import MindmapVisual from "@/components/common/MindmapVisual";
import FlowchartVisual from "@/components/common/FlowchartVisual";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function NewsDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  // Fetch current article
  const { data: newsItem, isLoading, error } = useQuery({
    queryKey: ["news", slug],
    queryFn: () => newsService.getNewsBySlug(slug),
    enabled: !!slug,
  });

  // Fetch all articles for recommended sidebar
  const { data: allNews } = useQuery({
    queryKey: ["news"],
    queryFn: () => newsService.getNewsList(),
  });

  // State to manage open/close status of sections (for Style 1 & Style 2)
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    "sec-1": true,
  });

  // State for active heading in Word Navigation Pane (for Style 3)
  const [activeHeadingId, setActiveHeadingId] = useState<string>("sec-1");
  const [navSearch, setNavSearch] = useState<string>("");

  const toggleSection = (id: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const expandAll = () => {
    if (!newsItem?.sections) return;
    const allOpen: Record<string, boolean> = {};
    newsItem.sections.forEach((sec: any) => {
      allOpen[sec.id] = true;
    });
    setOpenSections(allOpen);
  };

  const collapseAll = () => {
    setOpenSections({});
  };

  const scrollToHeading = (id: string) => {
    setActiveHeadingId(id);
    const element = document.getElementById(`heading-${id}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Accurate Scroll spy using getBoundingClientRect to highlight active heading
  useEffect(() => {
    if (!newsItem?.sections || newsItem.layoutStyle !== "word-navigation") return;

    let isScrollingTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      const sectionsList = newsItem.sections || [];
      let foundId = "";

      for (const section of sectionsList) {
        const el = document.getElementById(`heading-${section.id}`);
        if (el) {
          const rect = el.getBoundingClientRect();
          // Active when the section is at or above viewport line (between 60px and bottom)
          if (rect.top <= 200 && rect.bottom > 120) {
            foundId = section.id;
            break;
          }
        }
      }

      // Fallback: If scrolled to bottom of page, highlight the last section
      if (!foundId && window.innerHeight + window.scrollY >= document.body.offsetHeight - 80) {
        if (sectionsList.length > 0) {
          foundId = sectionsList[sectionsList.length - 1].id;
        }
      }

      if (foundId) {
        setActiveHeadingId(foundId);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check on load

    return () => window.removeEventListener("scroll", handleScroll);
  }, [newsItem]);

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center py-32">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#641D06]"></div>
        <p className="mt-4 text-slate-500 font-semibold text-sm">Đang tải bài viết phân tích...</p>
      </div>
    );
  }

  if (error || !newsItem) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-red-500 mb-4">Không tìm thấy bài viết</h1>
        <p className="mb-8 text-slate-600">Bài viết bạn đang tìm kiếm có thể đã được cập nhật hoặc không tồn tại.</p>
        <Link href="/news" className="bg-[#641D06] text-white px-6 py-3 rounded-xl hover:bg-black transition-colors font-bold uppercase text-sm">
          Quay lại Bảng tin
        </Link>
      </div>
    );
  }

  const sections = newsItem.sections || [];
  const layoutStyle = newsItem.layoutStyle || (slug.includes("cam-nang-ma") ? "word-navigation" : slug.includes("luat-dat-dai") ? "word-headings" : "cards");
  const otherNews = allNews?.filter((item: any) => item.slug !== slug) || [];

  // Filter sections by search term in Word Navigation
  const filteredSections = sections.filter((sec: any) =>
    sec.title.toLowerCase().includes(navSearch.toLowerCase()) ||
    sec.summary?.toLowerCase().includes(navSearch.toLowerCase())
  );

  /* =========================================================================
     LAYOUT STYLE 3: WORD NAVIGATION PANE + CONTINUOUS CONTENT + RIGHT SIDEBAR
     ========================================================================= */
  if (layoutStyle === "word-navigation") {
    return (
      <div className="max-w-[1720px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        {/* Back Link */}
        <div className="mb-5">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-slate-500 hover:text-[#641D06] transition-colors font-semibold text-sm"
          >
            <span className="material-symbols-outlined text-base">arrow_back</span>
            Bảng tin &amp; Sự kiện pháp luật
          </Link>
        </div>

        {/* 3-Column Modern Flex Layout (Desktop) / Linear Column (Mobile) */}
        <div className="flex flex-col lg:flex-row gap-6 xl:gap-8 items-start w-full">
          
          {/* =========================================================
              LEFT COLUMN (300-320px): WORD NAVIGATION PANE (DESKTOP ONLY)
             ========================================================= */}
          <aside className="hidden lg:block lg:w-[300px] xl:w-[320px] shrink-0 sticky top-24 z-20">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col max-h-[calc(100vh-120px)]">
              {/* Word Navigation Top Title Bar */}
              <div className="px-4 py-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-lg text-[#641D06]">toc</span>
                  <span className="font-bold text-slate-900 text-sm">Mục Lục Đề Mục (Headings)</span>
                </div>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-200 text-slate-700">
                  {sections.length} Mục
                </span>
              </div>

              {/* Quick Search Input */}
              <div className="p-3 border-b border-slate-100 bg-white">
                <div className="relative">
                  <input
                    type="text"
                    value={navSearch}
                    onChange={(e) => setNavSearch(e.target.value)}
                    placeholder="Tìm nhanh đề mục..."
                    className="w-full pl-3 pr-8 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#641D06] focus:bg-white text-slate-800"
                  />
                  <span className="material-symbols-outlined absolute right-2.5 top-2 text-sm text-slate-400">search</span>
                </div>
              </div>

              {/* Headings Tree List */}
              <div className="p-2 overflow-y-auto space-y-1 flex-1 text-xs">
                {newsItem.mindmap && (
                  <button
                    type="button"
                    onClick={() => {
                      const el = document.getElementById("heading-mindmap");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="w-full text-left px-3 py-2.5 rounded-xl transition-all flex items-center gap-2 cursor-pointer bg-purple-50 hover:bg-purple-100 text-purple-900 font-bold border border-purple-200 mb-2 shadow-2xs"
                  >
                    <span className="text-base">🧠</span>
                    <span className="leading-snug">Sơ Đồ Tư Duy Mindmap</span>
                  </button>
                )}

                {newsItem.flowchart && (
                  <button
                    type="button"
                    onClick={() => {
                      const el = document.getElementById("heading-flowchart");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="w-full text-left px-3 py-2.5 rounded-xl transition-all flex items-center gap-2 cursor-pointer bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold border border-amber-200 mb-2 shadow-2xs"
                  >
                    <span className="text-base">📊</span>
                    <span className="leading-snug">Sơ Đồ Quy Trình (Flowchart)</span>
                  </button>
                )}

                {filteredSections.map((sec: any) => {
                  const isActive = activeHeadingId === sec.id;
                  return (
                    <button
                      key={sec.id}
                      type="button"
                      onClick={() => scrollToHeading(sec.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-all flex items-start gap-2 cursor-pointer ${
                        isActive
                          ? "bg-blue-50 text-blue-800 font-bold border-l-4 border-blue-600 pl-2"
                          : "text-slate-700 hover:bg-slate-100 hover:text-slate-900 font-medium"
                      }`}
                    >
                      <span className="material-symbols-outlined text-xs text-slate-400 mt-0.5 shrink-0">
                        arrow_right
                      </span>
                      <span className="leading-snug">
                        {sec.number}. {sec.title}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Bottom Info */}
              <div className="p-3 bg-slate-50 border-t border-slate-200 text-[11px] text-slate-500 flex items-center justify-between">
                <span>⏱️ {sections.length} Mục chuyên sâu</span>
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  className="text-blue-600 hover:underline font-semibold"
                >
                  Lên đầu trang ↑
                </button>
              </div>
            </div>
          </aside>

          {/* =========================================================
              CENTER COLUMN: ARTICLE CONTENT (APPEARS FIRST ON MOBILE)
             ========================================================= */}
          <main className="w-full flex-1 min-w-0 bg-white rounded-2xl md:rounded-3xl border border-slate-200 p-5 sm:p-8 xl:p-12 shadow-sm">
            {/* Category badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-900 text-xs font-bold mb-3 md:mb-4 uppercase tracking-wider">
              <span className="material-symbols-outlined text-[16px]">verified</span>
              {newsItem.category || "Pháp Luật 2026"}
            </div>

            {/* Article Title */}
            <h1 className="text-xl sm:text-3xl md:text-4xl font-black text-slate-900 font-sans leading-tight tracking-tight mb-4 md:mb-6">
              {newsItem.title}
            </h1>

            {/* Author info bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 text-slate-600 text-xs font-semibold uppercase tracking-wide bg-slate-50 p-3.5 md:p-4 rounded-2xl border border-slate-200 mb-6 md:mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-200 border border-slate-300 overflow-hidden flex items-center justify-center shrink-0">
                  <img src="/img/avatar1.png" alt="Ls. Phan Đức Tín" className="w-full h-full object-cover" />
                </div>
                <div>
                  <div className="text-slate-900 font-bold text-sm">Ls. Phan Đức Tín</div>
                  <div className="text-slate-500 text-[11px] lowercase">Đoàn Luật sư TP. Hồ Chí Minh</div>
                </div>
              </div>
              <div className="flex items-center gap-4 text-slate-500 text-[11px] md:text-xs">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">calendar_today</span>
                  {new Date(newsItem.publishedAt || Date.now()).toLocaleDateString("vi-VN")}
                </span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">format_list_bulleted</span>
                  {sections.length} Giai đoạn
                </span>
              </div>
            </div>

            {/* Summary Box */}
            {newsItem.summary && (
              <div className="border-l-4 border-[#641D06] bg-amber-50/40 p-4 md:p-5 rounded-r-2xl mb-6 md:mb-8 text-slate-800 text-sm md:text-base leading-relaxed shadow-2xs">
                <div className="text-xs font-bold text-amber-800 uppercase tracking-widest mb-1 flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">auto_awesome</span>
                  Tóm lược cẩm nang:
                </div>
                {newsItem.summary}
              </div>
            )}

            {/* MOBILE ONLY: COLLAPSIBLE TABLE OF CONTENTS */}
            <div className="lg:hidden mb-6 border border-slate-200 rounded-2xl bg-slate-50/90 overflow-hidden shadow-2xs">
              <details className="group">
                <summary className="px-4 py-3.5 flex items-center justify-between cursor-pointer font-bold text-slate-900 text-xs sm:text-sm select-none">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-base text-[#641D06]">toc</span>
                    <span>Mục lục nội dung bài viết ({sections.length} mục)</span>
                  </div>
                  <span className="material-symbols-outlined text-slate-500 transition-transform duration-200 group-open:rotate-180">
                    expand_more
                  </span>
                </summary>
                <div className="px-3 pb-3 pt-1 border-t border-slate-200/80 space-y-1 text-xs">
                  {newsItem.mindmap && (
                    <button
                      type="button"
                      onClick={() => {
                        const el = document.getElementById("heading-mindmap");
                        if (el) el.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl flex items-center gap-2 bg-purple-50 text-purple-900 font-bold border border-purple-200 mb-1"
                    >
                      <span>🧠</span>
                      <span>Sơ Đồ Tư Duy Mindmap</span>
                    </button>
                  )}
                  {newsItem.flowchart && (
                    <button
                      type="button"
                      onClick={() => {
                        const el = document.getElementById("heading-flowchart");
                        if (el) el.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl flex items-center gap-2 bg-amber-50 text-amber-900 font-bold border border-amber-200 mb-1"
                    >
                      <span>📊</span>
                      <span>Sơ Đồ Quy Trình (Flowchart)</span>
                    </button>
                  )}
                  {sections.map((sec: any) => (
                    <button
                      key={sec.id}
                      type="button"
                      onClick={() => scrollToHeading(sec.id)}
                      className="w-full text-left px-2.5 py-1.5 rounded-lg text-slate-700 hover:bg-slate-200 hover:text-slate-900 flex items-start gap-1.5"
                    >
                      <span className="material-symbols-outlined text-xs text-slate-400 mt-0.5 shrink-0">arrow_right</span>
                      <span className="leading-snug">{sec.number}. {sec.title}</span>
                    </button>
                  ))}
                </div>
              </details>
            </div>

            {/* Flowchart Overview Visual */}
            {newsItem.flowchart && (
              <section id="heading-flowchart" className="scroll-mt-28 mb-8 md:mb-10">
                <FlowchartVisual rawText={newsItem.flowchart} />
              </section>
            )}

            {/* Mindmap Overview Visual */}
            {newsItem.mindmap && (
              <section id="heading-mindmap" className="scroll-mt-28 mb-8 md:mb-10">
                <div className="flex items-center gap-2 mb-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-purple-100 text-purple-700 text-sm font-bold">
                    <span className="material-symbols-outlined text-sm">bubble_chart</span>
                  </span>
                  <h3 className="text-xs md:text-sm font-bold uppercase tracking-wider text-purple-900">
                    Sơ Đồ Tư Duy Tổng Quan Bài Viết (Mindmap)
                  </h3>
                </div>
                <MindmapVisual rawText={newsItem.mindmap} />
              </section>
            )}

            {/* Continuous Sections without collapsing */}
            <div className="space-y-10 md:space-y-12">
              {sections.map((section: any) => (
                <section
                  key={section.id}
                  id={`heading-${section.id}`}
                  className="scroll-mt-28 border-b border-slate-100 pb-8 md:pb-10 last:border-b-0"
                >
                  {/* Section Title */}
                  <div className="mb-4">
                    <h2 className="text-lg sm:text-2xl font-bold text-[#641D06] font-sans tracking-tight leading-snug">
                      {section.title.startsWith(section.number) || /^\d+\./.test(section.title) ? section.title : `${section.number}. ${section.title}`}
                    </h2>
                  </div>

                  {/* Section Full Body Content */}
                  <div
                    className="prose prose-slate max-w-none text-slate-800 leading-relaxed text-sm md:text-base prose-p:my-3 prose-p:leading-relaxed prose-ul:my-3 prose-li:my-1.5 prose-strong:text-slate-900"
                    dangerouslySetInnerHTML={{ __html: section.content }}
                  />
                </section>
              ))}
            </div>

            {/* End of article notice */}
            <div className="mt-10 md:mt-12 pt-6 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
              <span>© 2026 Công ty Luật TNHH Đức Tín &amp; Cộng sự</span>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="text-[#641D06] hover:underline font-bold flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-sm">arrow_upward</span>
                Lên đầu trang
              </button>
            </div>
          </main>

          {/* =========================================================
              RIGHT COLUMN: ATTORNEY CARD & RECOMMENDED ARTICLES (BELOW ON MOBILE, SIDEBAR ON DESKTOP)
             ========================================================= */}
          <aside className="w-full lg:w-[310px] xl:w-[330px] shrink-0 lg:sticky lg:top-24 z-20 space-y-6">
            
            {/* Direct Lawyer Support Card */}
            <div className="bg-gradient-to-br from-[#641D06] to-[#381104] text-white rounded-3xl p-6 shadow-md text-center">
              <div className="w-16 h-16 rounded-2xl bg-white/10 p-1 mx-auto mb-3 border border-white/20">
                <img src="/img/avatar1.png" alt="Ls. Phan Đức Tín" className="w-full h-full object-cover rounded-xl" />
              </div>
              <h4 className="font-bold text-sm text-white">Ls. PHAN ĐỨC TÍN</h4>
              <p className="text-[11px] text-amber-300 font-semibold uppercase mt-0.5">Giám Đốc Điều Hành</p>
              <p className="text-xs text-slate-200 mt-2 leading-relaxed text-justify">
                Trực tiếp tư vấn các thương vụ M&amp;A, cơ cấu vốn và giải quyết tranh chấp kinh tế phức tạp.
              </p>

              <div className="mt-4 space-y-2">
                <a
                  href="tel:0937863263"
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 h-9 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                >
                  <span className="material-symbols-outlined text-base">call</span>
                  Hotline: 093 786 32 63
                </a>
                <a
                  href="https://zalo.me/0937863263"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-white/20 hover:bg-white/30 text-white h-9 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors border border-white/30"
                >
                  <span className="material-symbols-outlined text-base">chat</span>
                  Chat Zalo Luật Sư
                </a>
                <Link
                  href="/appointment"
                  className="w-full bg-amber-400 hover:bg-amber-500 text-slate-900 h-9 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                >
                  <span className="material-symbols-outlined text-base">calendar_month</span>
                  Đặt Lịch Tư Vấn 1:1
                </Link>
              </div>
            </div>

            {/* Recommended / Other Articles Box */}
            <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3 mb-4">
                <span className="material-symbols-outlined text-amber-600">recommend</span>
                <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wide">
                  Bài Viết Đề Xuất Thêm
                </h3>
              </div>

              {otherNews.length > 0 ? (
                <div className="space-y-4">
                  {otherNews.map((art: any) => (
                    <Link
                      key={art.id}
                      href={`/news/${art.slug}`}
                      className="group flex gap-3 items-start p-2.5 rounded-2xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all"
                    >
                      <div className="w-16 h-16 rounded-xl bg-slate-100 overflow-hidden shrink-0 border border-slate-200">
                        {art.thumbnailUrl ? (
                          <img src={art.thumbnailUrl} alt={art.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-400">
                            <span className="material-symbols-outlined text-lg">newspaper</span>
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] uppercase font-bold text-amber-700">
                          {art.category || "Pháp Luật"}
                        </span>
                        <h4 className="text-xs font-bold text-slate-900 line-clamp-2 group-hover:text-[#641D06] transition-colors leading-snug mt-0.5">
                          {art.title}
                        </h4>
                        <span className="text-[10px] text-slate-400 mt-1 block">
                          📅 {new Date(art.publishedAt || Date.now()).toLocaleDateString("vi-VN")}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-500">Đang cập nhật thêm bài viết mới...</p>
              )}
            </div>

          </aside>

        </div>
      </div>
    );
  }

  /* =========================================================================
     LAYOUT STYLE 2: WORD COLLAPSIBLE HEADINGS & STYLE 1: CARDS ACCORDION
     ========================================================================= */
  const isWordStyle = layoutStyle === "word-headings" || slug.includes("luat-dat-dai");

  return (
    <article className="max-w-4xl mx-auto px-4 md:px-8 py-12">
      {/* Back Button */}
      <Link
        href="/news"
        className="inline-flex items-center gap-2 text-slate-500 hover:text-emerald-700 transition-colors mb-6 font-semibold text-sm"
      >
        <span className="material-symbols-outlined text-sm">arrow_back</span>
        Quay lại Bảng tin pháp luật
      </Link>

      {/* Article Header */}
      <header className="mb-8 border-b border-slate-200 pb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 text-slate-800 text-xs font-bold mb-4 uppercase tracking-wider border border-slate-200">
          <span className="material-symbols-outlined text-[16px] text-amber-700">verified</span>
          {newsItem.category || "Pháp Luật 2026"}
        </div>
        <h1 className="text-3xl md:text-5xl font-black text-slate-900 font-sans mb-6 leading-tight tracking-tight">
          {newsItem.title}
        </h1>

        <div className="flex flex-wrap items-center justify-between gap-4 text-slate-600 text-sm font-semibold uppercase tracking-wide bg-slate-50 p-4 rounded-2xl border border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-slate-200 border border-slate-300 overflow-hidden flex items-center justify-center">
              <img src="/img/avatar1.png" alt="Ls. Phan Đức Tín" className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="text-slate-900 font-bold text-sm">Ls. Phan Đức Tín</div>
              <div className="text-slate-500 text-xs lowercase">Đoàn Luật sư TP. Hồ Chí Minh</div>
            </div>
          </div>
          <div className="flex items-center gap-4 text-xs font-bold text-slate-500">
            <span>📅 {new Date(newsItem.publishedAt || Date.now()).toLocaleDateString("vi-VN")}</span>
            <span>⏱️ {sections.length} Mục Chuyên Sâu</span>
          </div>
        </div>
      </header>

      {/* Article Summary / Introduction */}
      {newsItem.summary && (
        <div className="border-l-4 border-[#641D06] bg-slate-50/80 p-5 rounded-r-xl mb-8 text-slate-800 text-base md:text-lg leading-relaxed">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Tóm lược bài viết:</div>
          {newsItem.summary}
        </div>
      )}

      {/* SECTION CONTROLS (Expand all / Collapse all) */}
      {sections.length > 0 && (
        <div className="mb-8 flex items-center justify-between gap-4 border-b border-slate-200 pb-3">
          <div className="text-slate-700 font-bold text-sm flex items-center gap-2">
            <span className="material-symbols-outlined text-base text-slate-500">format_list_bulleted</span>
            <span>{isWordStyle ? "Nội dung bài viết (Bấm vào tiêu đề để thu gọn/mở rộng từng phần):" : "Bố cục các mục phân tích chuyên sâu:"}</span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={expandAll}
              className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-sm">unfold_more</span>
              Mở tất cả
            </button>
            <button
              onClick={collapseAll}
              className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-sm">unfold_less</span>
              Thu gọn
            </button>
          </div>
        </div>
      )}

      {/* BODY CONTENT: WORD COLLAPSIBLE OR CARD ACCORDION */}
      {sections.length > 0 ? (
        isWordStyle ? (
          <div className="space-y-6 mb-14 text-slate-800">
            {sections.map((section: any) => {
              const isOpen = !!openSections[section.id];
              return (
                <section key={section.id} className="border-b border-slate-200/70 pb-6">
                  <button
                    type="button"
                    onClick={() => toggleSection(section.id)}
                    className="w-full text-left flex items-start gap-3 py-2 group cursor-pointer"
                  >
                    <span
                      className={`material-symbols-outlined text-2xl text-slate-600 group-hover:text-slate-900 transition-transform duration-200 shrink-0 mt-0.5 ${
                        isOpen ? "rotate-90 text-[#641D06]" : ""
                      }`}
                    >
                      arrow_right
                    </span>
                    <h2 className="text-xl md:text-2xl font-black text-slate-900 font-sans tracking-tight group-hover:text-[#641D06] transition-colors leading-snug">
                      {section.number}. {section.title}
                    </h2>
                  </button>

                  {isOpen && (
                    <div className="pl-8 sm:pl-9 mt-3 text-slate-800 text-base md:text-[17px] leading-relaxed">
                      <div
                        className="prose prose-slate max-w-none prose-p:my-3 prose-ul:my-3 prose-li:my-1 prose-strong:text-slate-900"
                        dangerouslySetInnerHTML={{ __html: section.content }}
                      />
                    </div>
                  )}
                </section>
              );
            })}
          </div>
        ) : (
          <div className="space-y-4 mb-12">
            {sections.map((section: any) => {
              const isOpen = !!openSections[section.id];
              return (
                <div
                  key={section.id}
                  className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isOpen ? "border-amber-400 shadow-md ring-1 ring-amber-400/30" : "border-slate-200 shadow-sm hover:border-slate-300"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleSection(section.id)}
                    className="w-full p-5 md:p-6 text-left flex items-start justify-between gap-4 transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      <span className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 font-black text-base flex items-center justify-center shrink-0">
                        {section.number}
                      </span>
                      <div>
                        <h3 className="text-lg md:text-xl font-bold text-slate-900 leading-snug">
                          {section.title}
                        </h3>
                        {section.summary && (
                          <p className="text-slate-500 text-xs md:text-sm mt-1 leading-relaxed">
                            {section.summary}
                          </p>
                        )}
                      </div>
                    </div>

                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                        isOpen ? "bg-amber-100 text-amber-900 rotate-180" : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      <span className="material-symbols-outlined text-xl">expand_more</span>
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 md:px-6 pb-6 pt-2 border-t border-slate-100 text-slate-800 leading-relaxed text-base">
                      <div
                        className="prose prose-slate max-w-none prose-p:my-3 prose-headings:font-bold prose-headings:text-slate-900 prose-ul:my-3 prose-li:my-1"
                        dangerouslySetInnerHTML={{ __html: section.content }}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )
      ) : (
        <div
          className="prose prose-lg max-w-none text-slate-800 leading-relaxed mb-12"
          dangerouslySetInnerHTML={{ __html: newsItem.content }}
        />
      )}

      {/* Bottom Consultation Call to Action */}
      <div className="bg-gradient-to-r from-[#641D06] to-[#381104] text-white p-8 rounded-3xl shadow-xl mt-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="text-amber-400 font-bold text-xs uppercase tracking-widest mb-1">Cần tư vấn chuyên sâu?</div>
            <h3 className="text-2xl font-bold font-sans mb-2 text-white">Trao đổi trực tiếp với Luật sư Phan Đức Tín</h3>
            <p className="text-slate-300 text-sm max-w-xl leading-relaxed">
              Mọi vướng mắc về thủ tục pháp lý, tranh chấp hoặc hồ sơ sẽ được Luật sư trực tiếp tư vấn bảo mật và chính xác nhất.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <Link
              href="/appointment"
              className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold px-6 py-3 rounded-xl uppercase text-xs tracking-wider transition-colors shadow-lg flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-base">calendar_month</span>
              Đặt lịch hẹn
            </Link>
            <a
              href="tel:0937863263"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3 rounded-xl uppercase text-xs tracking-wider transition-colors shadow-lg flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-base">call</span>
              093 786 32 63
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
