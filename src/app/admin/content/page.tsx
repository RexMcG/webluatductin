"use client";

import React, { useState, useEffect } from "react";
import {
  siteContentService,
  SiteContentData,
  DEFAULT_SITE_CONTENT,
} from "@/services/site-content.service";
import Link from "next/link";

export default function AdminContentPage() {
  const [content, setContent] = useState<SiteContentData>(DEFAULT_SITE_CONTENT);
  const [activeTab, setActiveTab] = useState<"home" | "services" | "service-detail" | "footer">("home");
  const [selectedServiceSlug, setSelectedServiceSlug] = useState<string>("hop-tac-doanh-nghiep");
  const [detailSubTab, setDetailSubTab] = useState<"about" | "experience" | "articles">("about");
  
  const [isSaving, setIsSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);

  useEffect(() => {
    const loaded = siteContentService.getContent();
    setContent(loaded);

    // Subscribe to any updates
    const unsubscribe = siteContentService.subscribe((updated) => {
      setContent(updated);
    });

    // Also fetch fresh from backend
    siteContentService.fetchFromBackend().then((fresh) => {
      setContent(fresh);
    });

    return () => unsubscribe();
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await siteContentService.saveContent(content);
      showToast("✅ Đã lưu toàn bộ nội dung thành công! Trang web đã cập nhật tức thì.");
    } catch (err) {
      showToast("❌ Lưu thất bại, vui lòng thử lại!");
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = async () => {
    setIsSaving(true);
    try {
      const reset = await siteContentService.resetContent();
      setContent(reset);
      setIsResetConfirmOpen(false);
      showToast("🔄 Đã khôi phục toàn bộ nội dung về văn bản gốc mặc định!");
    } catch (err) {
      showToast("❌ Không thể khôi phục mặc định.");
    } finally {
      setIsSaving(false);
    }
  };

  // Safe accessor for current service detail
  const currentService = content.servicesDetail[selectedServiceSlug] || content.servicesDetail["hop-tac-doanh-nghiep"];

  return (
    <div className="space-y-6 pb-24">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-slate-900 text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-amber-500/50 flex items-center gap-3 animate-slideIn">
          <span className="material-symbols-outlined text-amber-400 text-xl">notifications</span>
          <span className="text-sm font-semibold">{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="ml-2 text-slate-400 hover:text-white text-xs"
          >
            ✕
          </button>
        </div>
      )}

      {/* Confirmation Modal for Reset */}
      {isResetConfirmOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-200 animate-scaleUp text-center">
            <div className="w-14 h-14 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-3xl">restart_alt</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              Khôi phục văn bản gốc?
            </h3>
            <p className="text-sm text-slate-600 mb-6 leading-relaxed">
              Mọi chỉnh sửa văn bản tùy chỉnh của bạn trên Trang chủ, Lĩnh vực, Chi tiết lĩnh vực và Footer sẽ được đưa về nội dung ban đầu.
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setIsResetConfirmOpen(false)}
                className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold text-sm hover:bg-slate-50 transition-colors"
              >
                Hủy bỏ
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm shadow-md transition-colors"
              >
                Xác nhận khôi phục
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
              Live Content Management System (Live CMS)
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-sans tracking-tight mt-1">
            Chỉnh Sửa Toàn Diện Nội Dung Website
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Tự do sửa đổi tiêu đề, châm ngôn, câu chữ, quy trình, số liệu và thông tin liên hệ. Mọi thay đổi hiển thị ngay trên web sau khi bấm Lưu.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsResetConfirmOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-rose-200 text-rose-700 hover:bg-rose-50 text-xs sm:text-sm font-bold transition-all cursor-pointer"
            title="Đưa tất cả câu chữ về mặc định ban đầu"
          >
            <span className="material-symbols-outlined text-base">restart_alt</span>
            <span>Khôi phục gốc</span>
          </button>

          <Link
            href={
              activeTab === "home"
                ? "/"
                : activeTab === "services"
                ? "/services"
                : activeTab === "service-detail"
                ? `/services/${selectedServiceSlug}`
                : "/#about-us"
            }
            target="_blank"
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs sm:text-sm font-bold transition-all"
            title="Mở tab mới xem trang thực tế"
          >
            <span className="material-symbols-outlined text-base">open_in_new</span>
            <span>Xem trang web</span>
          </Link>

          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#641D06] to-[#8B2500] hover:brightness-110 text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer disabled:opacity-50"
          >
            {isSaving ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                <span>Đang lưu...</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-base">save</span>
                <span>Lưu tất cả thay đổi</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 4 Main Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-1 overflow-x-auto">
        <button
          onClick={() => setActiveTab("home")}
          className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-sm transition-all whitespace-nowrap cursor-pointer ${
            activeTab === "home"
              ? "bg-[#641D06] text-white shadow-md"
              : "bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:bg-slate-50"
          }`}
        >
          <span className="material-symbols-outlined text-lg">home</span>
          <span>1. Trang Chủ (Home)</span>
        </button>

        <button
          onClick={() => setActiveTab("services")}
          className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-sm transition-all whitespace-nowrap cursor-pointer ${
            activeTab === "services"
              ? "bg-[#641D06] text-white shadow-md"
              : "bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:bg-slate-50"
          }`}
        >
          <span className="material-symbols-outlined text-lg">gavel</span>
          <span>2. Trang Lĩnh Vực (/services)</span>
        </button>

        <button
          onClick={() => setActiveTab("service-detail")}
          className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-sm transition-all whitespace-nowrap cursor-pointer ${
            activeTab === "service-detail"
              ? "bg-[#641D06] text-white shadow-md"
              : "bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:bg-slate-50"
          }`}
        >
          <span className="material-symbols-outlined text-lg">article</span>
          <span>3. Chi Tiết Lĩnh Vực (3 Tab Con)</span>
          <span className="px-1.5 py-0.5 rounded-full bg-amber-400 text-[#641D06] text-[10px] font-black">
            3 Tabs
          </span>
        </button>

        <button
          onClick={() => setActiveTab("footer")}
          className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-sm transition-all whitespace-nowrap cursor-pointer ${
            activeTab === "footer"
              ? "bg-[#641D06] text-white shadow-md"
              : "bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:bg-slate-50"
          }`}
        >
          <span className="material-symbols-outlined text-lg">dock_to_bottom</span>
          <span>4. Chân Trang (Footer)</span>
        </button>
      </div>

      {/* =========================================================
          TAB 1: TRANG CHỦ (HOME)
         ========================================================= */}
      {activeTab === "home" && (
        <div className="space-y-6">
          {/* Section 1: Hero */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-5">
            <div className="border-b border-slate-100 pb-4 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                  Khối Hero Banner Trang Chủ
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Phần hiển thị đầu tiên trên cùng của trang chủ đón tiếp khách hàng.
                </p>
              </div>
              <span className="text-xs bg-amber-50 text-amber-900 font-bold px-3 py-1 rounded-full border border-amber-200">
                Hero Section
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                  Tiêu đề chính dòng 1 (Trắng / Primary)
                </label>
                <input
                  type="text"
                  value={content.home.hero.titlePrimary}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      home: {
                        ...content.home,
                        hero: { ...content.home.hero, titlePrimary: e.target.value },
                      },
                    })
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-amber-600 focus:border-transparent outline-none font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                  Tiêu đề thương hiệu dòng 2
                </label>
                <input
                  type="text"
                  value={content.home.hero.titleSecondary}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      home: {
                        ...content.home,
                        hero: { ...content.home.hero, titleSecondary: e.target.value },
                      },
                    })
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-amber-600 focus:border-transparent outline-none font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                  Dòng chữ nổi bật màu vàng (Accent Title)
                </label>
                <input
                  type="text"
                  value={content.home.hero.titleAccent}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      home: {
                        ...content.home,
                        hero: { ...content.home.hero, titleAccent: e.target.value },
                      },
                    })
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-amber-600 focus:border-transparent outline-none font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                  Gợi ý ô tìm kiếm thông minh (Placeholder)
                </label>
                <input
                  type="text"
                  value={content.home.hero.searchPlaceholder}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      home: {
                        ...content.home,
                        hero: { ...content.home.hero, searchPlaceholder: e.target.value },
                      },
                    })
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-amber-600 focus:border-transparent outline-none font-medium"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                  Slogan &amp; Mô tả ngắn gọn dưới tiêu đề
                </label>
                <textarea
                  rows={2}
                  value={content.home.hero.description}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      home: {
                        ...content.home,
                        hero: { ...content.home.hero, description: e.target.value },
                      },
                    })
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-amber-600 focus:border-transparent outline-none font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                  Tên nút Đặt lịch (CTA Button)
                </label>
                <input
                  type="text"
                  value={content.home.hero.ctaButtonText}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      home: {
                        ...content.home,
                        hero: { ...content.home.hero, ctaButtonText: e.target.value },
                      },
                    })
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-amber-600 focus:border-transparent outline-none font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                  Tên nút Tham vấn trực tuyến (AI Chat Button)
                </label>
                <input
                  type="text"
                  value={content.home.hero.aiChatButtonText}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      home: {
                        ...content.home,
                        hero: { ...content.home.hero, aiChatButtonText: e.target.value },
                      },
                    })
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-amber-600 focus:border-transparent outline-none font-medium"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Về Chúng Tôi (Giới Thiệu Hãng Luật) */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-5">
            <div className="border-b border-slate-100 pb-4 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-600"></span>
                  Khối Về Chúng Tôi (Giới Thiệu Hãng Luật - Hình số 2)
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Chỉnh sửa tiêu đề và các đoạn văn bản giới thiệu Ls. Phan Đức Tín cùng bề dày hoạt động của công ty.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  const currentParas = content.home.about.paragraphs || DEFAULT_SITE_CONTENT.home.about.paragraphs;
                  setContent({
                    ...content,
                    home: {
                      ...content.home,
                      about: {
                        ...content.home.about,
                        paragraphs: [...currentParas, "Đoạn văn bản giới thiệu mới..."],
                      },
                    },
                  });
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-bold border border-amber-200 cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm">add</span>
                <span>Thêm đoạn văn bản</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                  Tiêu đề phần
                </label>
                <input
                  type="text"
                  value={content.home.about.heading || "Về Chúng Tôi"}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      home: {
                        ...content.home,
                        about: { ...content.home.about, heading: e.target.value },
                      },
                    })
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-amber-600 focus:border-transparent outline-none font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                  Nhãn phân cách (SectionDivider Label)
                </label>
                <input
                  type="text"
                  value={content.home.about.subHeading || "GIỚI THIỆU"}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      home: {
                        ...content.home,
                        about: { ...content.home.about, subHeading: e.target.value },
                      },
                    })
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-amber-600 focus:border-transparent outline-none font-medium"
                />
              </div>

              {/* Paragraphs list */}
              <div className="md:col-span-2 space-y-3 pt-1">
                <label className="block text-xs font-bold text-slate-700 uppercase">
                  Nội dung từng đoạn văn bản giới thiệu:
                </label>
                {(content.home.about.paragraphs && content.home.about.paragraphs.length > 0
                  ? content.home.about.paragraphs
                  : DEFAULT_SITE_CONTENT.home.about.paragraphs
                ).map((para, pIdx) => (
                  <div key={pIdx} className="flex items-start gap-2 bg-slate-50 p-3 rounded-2xl border border-slate-200">
                    <span className="text-xs font-bold text-amber-800 mt-2 shrink-0 px-2 py-1 bg-amber-100 rounded-lg">
                      Đoạn #{pIdx + 1}
                    </span>
                    <textarea
                      rows={3}
                      value={para}
                      onChange={(e) => {
                        const newParas = [
                          ...(content.home.about.paragraphs || DEFAULT_SITE_CONTENT.home.about.paragraphs),
                        ];
                        newParas[pIdx] = e.target.value;
                        setContent({
                          ...content,
                          home: {
                            ...content.home,
                            about: { ...content.home.about, paragraphs: newParas },
                          },
                        });
                      }}
                      className="flex-1 px-3.5 py-2 rounded-xl border border-slate-200 text-sm text-slate-800 bg-white focus:ring-2 focus:ring-amber-600 outline-none leading-relaxed"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const newParas = [
                          ...(content.home.about.paragraphs || DEFAULT_SITE_CONTENT.home.about.paragraphs),
                        ];
                        newParas.splice(pIdx, 1);
                        setContent({
                          ...content,
                          home: {
                            ...content.home,
                            about: { ...content.home.about, paragraphs: newParas },
                          },
                        });
                      }}
                      className="p-2 text-rose-500 hover:text-rose-700 cursor-pointer mt-1"
                      title="Xóa đoạn này"
                    >
                      <span className="material-symbols-outlined text-lg">delete</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Section 3: Tôn Chỉ Hoạt Động & Năng Lực Vượt Trội (Hình số 2) */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-5">
            <div className="border-b border-slate-100 pb-4 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
                  Khối Tôn Chỉ Hoạt Động &amp; Năng Lực Vượt Trội (6 Thẻ - Hình số 2)
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Chỉnh sửa tiêu đề và nội dung từng thẻ trong 6 tôn chỉ hoạt động cốt lõi của văn phòng.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  const currentItems = content.home.principles?.items || DEFAULT_SITE_CONTENT.home.principles.items;
                  setContent({
                    ...content,
                    home: {
                      ...content.home,
                      principles: {
                        ...(content.home.principles || DEFAULT_SITE_CONTENT.home.principles),
                        items: [
                          ...currentItems,
                          { title: `${currentItems.length + 1}. Tôn chỉ mới`, desc: "Nội dung tôn chỉ..." },
                        ],
                      },
                    },
                  });
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-bold border border-amber-200 cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm">add</span>
                <span>Thêm thẻ tôn chỉ</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                  Tiêu đề phần tôn chỉ
                </label>
                <input
                  type="text"
                  value={content.home.principles?.heading || "Tôn Chỉ Hoạt Động & Năng Lực Vượt Trội"}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      home: {
                        ...content.home,
                        principles: {
                          ...(content.home.principles || DEFAULT_SITE_CONTENT.home.principles),
                          heading: e.target.value,
                        },
                      },
                    })
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-amber-600 focus:border-transparent outline-none font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                  Nhãn phân cách (SectionDivider Label)
                </label>
                <input
                  type="text"
                  value={content.home.principles?.subHeading || "TÔN CHỈ HOẠT ĐỘNG"}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      home: {
                        ...content.home,
                        principles: {
                          ...(content.home.principles || DEFAULT_SITE_CONTENT.home.principles),
                          subHeading: e.target.value,
                        },
                      },
                    })
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-amber-600 focus:border-transparent outline-none font-medium"
                />
              </div>

              {/* 6 Principle Items Grid */}
              <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                {(content.home.principles?.items || DEFAULT_SITE_CONTENT.home.principles.items).map((item, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 relative">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-amber-900 uppercase">
                        Mục #{idx + 1}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          const newItems = [
                            ...(content.home.principles?.items || DEFAULT_SITE_CONTENT.home.principles.items),
                          ];
                          newItems.splice(idx, 1);
                          setContent({
                            ...content,
                            home: {
                              ...content.home,
                              principles: {
                                ...(content.home.principles || DEFAULT_SITE_CONTENT.home.principles),
                                items: newItems,
                              },
                            },
                          });
                        }}
                        className="text-xs text-rose-600 hover:text-rose-800 font-bold cursor-pointer"
                      >
                        Xóa mục này
                      </button>
                    </div>

                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) => {
                        const newItems = [
                          ...(content.home.principles?.items || DEFAULT_SITE_CONTENT.home.principles.items),
                        ];
                        newItems[idx].title = e.target.value;
                        setContent({
                          ...content,
                          home: {
                            ...content.home,
                            principles: {
                              ...(content.home.principles || DEFAULT_SITE_CONTENT.home.principles),
                              items: newItems,
                            },
                          },
                        });
                      }}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-300 font-bold text-xs bg-white text-slate-900"
                      placeholder="Tiêu đề mục (VD: 1. Đội ngũ Luật sư...)"
                    />

                    <textarea
                      rows={3}
                      value={item.desc}
                      onChange={(e) => {
                        const newItems = [
                          ...(content.home.principles?.items || DEFAULT_SITE_CONTENT.home.principles.items),
                        ];
                        newItems[idx].desc = e.target.value;
                        setContent({
                          ...content,
                          home: {
                            ...content.home,
                            principles: {
                              ...(content.home.principles || DEFAULT_SITE_CONTENT.home.principles),
                              items: newItems,
                            },
                          },
                        });
                      }}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs bg-white text-slate-700 leading-relaxed"
                      placeholder="Nội dung mô tả chi tiết..."
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Section 4: Khối Chỉ Số Thực Tế (Hiển Thị Giữa Lĩnh Vực & Tiện Ích) */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-5">
            <div className="border-b border-slate-100 pb-4 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-600"></span>
                  Khối Chỉ Số Hoạt Động &amp; Thành Tựu (Nằm Giữa Lĩnh Vực &amp; Tiện Ích)
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Các chỉ số thống kê ấn tượng (Năm kinh nghiệm, Tỷ lệ thành công, Vụ việc, Doanh nghiệp).
                </p>
              </div>
              <span className="text-xs bg-emerald-50 text-emerald-800 font-bold px-3 py-1 rounded-full border border-emerald-200">
                Hiển thị giữa Lĩnh Vực &amp; Tiện Ích
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                  Tiêu đề khối chỉ số
                </label>
                <input
                  type="text"
                  value={content.home.stats?.heading || "Dấu Ấn Thành Tựu & Năng Lực Thực Chiến"}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      home: {
                        ...content.home,
                        stats: {
                          ...(content.home.stats || DEFAULT_SITE_CONTENT.home.stats),
                          heading: e.target.value,
                        },
                      },
                    })
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-amber-600 focus:border-transparent outline-none font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                  Huy hiệu phụ (Badge)
                </label>
                <input
                  type="text"
                  value={content.home.stats?.subHeading || "CHỈ SỐ THỰC TẾ"}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      home: {
                        ...content.home,
                        stats: {
                          ...(content.home.stats || DEFAULT_SITE_CONTENT.home.stats),
                          subHeading: e.target.value,
                        },
                      },
                    })
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-amber-600 focus:border-transparent outline-none font-medium"
                />
              </div>

              {/* 4 Stats Cards */}
              <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
                {(content.home.stats?.items || DEFAULT_SITE_CONTENT.home.stats.items).map((item, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200/80 space-y-2">
                    <span className="text-[11px] font-black text-amber-900 uppercase block">
                      Chỉ số #{idx + 1}
                    </span>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">
                        Con số hiển thị
                      </label>
                      <input
                        type="text"
                        value={item.value}
                        onChange={(e) => {
                          const newItems = [
                            ...(content.home.stats?.items || DEFAULT_SITE_CONTENT.home.stats.items),
                          ];
                          newItems[idx].value = e.target.value;
                          setContent({
                            ...content,
                            home: {
                              ...content.home,
                              stats: {
                                ...(content.home.stats || DEFAULT_SITE_CONTENT.home.stats),
                                items: newItems,
                              },
                            },
                          });
                        }}
                        className="w-full px-3 py-1.5 rounded-lg border border-slate-300 font-black text-amber-950 text-base bg-white"
                        placeholder="VD: 15+"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">
                        Tên nhãn chỉ số
                      </label>
                      <input
                        type="text"
                        value={item.label}
                        onChange={(e) => {
                          const newItems = [
                            ...(content.home.stats?.items || DEFAULT_SITE_CONTENT.home.stats.items),
                          ];
                          newItems[idx].label = e.target.value;
                          setContent({
                            ...content,
                            home: {
                              ...content.home,
                              stats: {
                                ...(content.home.stats || DEFAULT_SITE_CONTENT.home.stats),
                                items: newItems,
                              },
                            },
                          });
                        }}
                        className="w-full px-3 py-1.5 rounded-lg border border-slate-300 font-bold text-xs bg-white text-slate-900"
                        placeholder="VD: Năm Kinh Nghiệm"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">
                        Mô tả tóm tắt
                      </label>
                      <textarea
                        rows={2}
                        value={item.desc || ""}
                        onChange={(e) => {
                          const newItems = [
                            ...(content.home.stats?.items || DEFAULT_SITE_CONTENT.home.stats.items),
                          ];
                          newItems[idx].desc = e.target.value;
                          setContent({
                            ...content,
                            home: {
                              ...content.home,
                              stats: {
                                ...(content.home.stats || DEFAULT_SITE_CONTENT.home.stats),
                                items: newItems,
                              },
                            },
                          });
                        }}
                        className="w-full px-3 py-1 rounded-lg border border-slate-300 text-[11px] bg-white text-slate-600"
                        placeholder="VD: Thực chiến giải quyết..."
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Section 5: Luật Sư Điều Hành */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-5">
            <div className="border-b border-slate-100 pb-4 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-600"></span>
                  Khối Thông Tin Luật Sư Điều Hành (Trang Chủ)
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Chỉnh sửa họ tên, chức danh và toàn bộ bài viết mô tả chi tiết của Luật sư hiển thị trên trang chủ.
                </p>
              </div>
              <span className="text-xs bg-purple-50 text-purple-800 font-bold px-3 py-1 rounded-full border border-purple-200">
                Thẻ Profile Toàn Chiều Ngang
              </span>
            </div>

            <div className="space-y-6">
              {(content.home.lawyers?.items || DEFAULT_SITE_CONTENT.home.lawyers.items).map((ls, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-amber-50/30 border border-amber-200/80 space-y-4">
                  <div className="flex items-center gap-4 pb-3 border-b border-amber-200/60">
                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-amber-400 bg-white shrink-0 shadow-xs">
                      <img
                        src={`/img/${ls.img || "avatar1.webp"}`}
                        alt={ls.name}
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                    <div>
                      <span className="text-xs font-black text-amber-900 uppercase block">
                        Luật sư Điều hành #{idx + 1}
                      </span>
                      <p className="text-xs text-slate-500">Ảnh chân dung hiển thị: <code className="text-amber-800 font-mono font-bold">/img/avatar1.webp</code></p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                        Họ và tên Luật sư
                      </label>
                      <input
                        type="text"
                        value={ls.name}
                        onChange={(e) => {
                          const newLawyers = [
                            ...(content.home.lawyers?.items || DEFAULT_SITE_CONTENT.home.lawyers.items),
                          ];
                          newLawyers[idx].name = e.target.value;
                          setContent({
                            ...content,
                            home: {
                              ...content.home,
                              lawyers: {
                                ...(content.home.lawyers || DEFAULT_SITE_CONTENT.home.lawyers),
                                items: newLawyers,
                              },
                            },
                          });
                        }}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 font-bold text-sm bg-white text-slate-900 focus:ring-2 focus:ring-amber-600 focus:border-transparent outline-none"
                        placeholder="VD: Ls. Phan Đức Tín"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                        Chức vụ / Danh xưng
                      </label>
                      <input
                        type="text"
                        value={ls.role}
                        onChange={(e) => {
                          const newLawyers = [
                            ...(content.home.lawyers?.items || DEFAULT_SITE_CONTENT.home.lawyers.items),
                          ];
                          newLawyers[idx].role = e.target.value;
                          setContent({
                            ...content,
                            home: {
                              ...content.home,
                              lawyers: {
                                ...(content.home.lawyers || DEFAULT_SITE_CONTENT.home.lawyers),
                                items: newLawyers,
                              },
                            },
                          });
                        }}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 font-bold text-amber-900 text-sm bg-white focus:ring-2 focus:ring-amber-600 focus:border-transparent outline-none"
                        placeholder="VD: Luật sư Sáng lập — Giám đốc Điều hành"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-xs font-bold text-slate-700 uppercase">
                        Nội dung bài viết mô tả chi tiết về Luật sư
                      </label>
                      <span className="text-[11px] text-amber-800 font-medium">
                        💡 Mẹo: Nhấn Enter 2 lần (xuống dòng cách đoạn) để tạo các đoạn văn riêng biệt ngoài trang chủ
                      </span>
                    </div>
                    <textarea
                      rows={8}
                      value={ls.desc}
                      onChange={(e) => {
                        const newLawyers = [
                          ...(content.home.lawyers?.items || DEFAULT_SITE_CONTENT.home.lawyers.items),
                        ];
                        newLawyers[idx].desc = e.target.value;
                        setContent({
                          ...content,
                          home: {
                            ...content.home,
                            lawyers: {
                              ...(content.home.lawyers || DEFAULT_SITE_CONTENT.home.lawyers),
                              items: newLawyers,
                            },
                          },
                        });
                      }}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm bg-white text-slate-800 leading-relaxed focus:ring-2 focus:ring-amber-600 focus:border-transparent outline-none"
                      placeholder="Nhập đoạn văn mô tả chi tiết về bề dày kinh nghiệm, thế mạnh tranh tụng, các lĩnh vực phụ trách..."
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: FAQ */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-5">
            <div className="border-b border-slate-100 pb-4 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                  Khối Câu Hỏi Thường Gặp (FAQ)
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Thêm, bớt hoặc chỉnh sửa các câu hỏi thân chủ quan tâm nhiều nhất.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  const currentFaqs = content.home.faqs || [];
                  setContent({
                    ...content,
                    home: {
                      ...content.home,
                      faqs: [
                        ...currentFaqs,
                        { q: "Tiêu đề câu hỏi mới?", a: "Câu trả lời chi tiết..." },
                      ],
                    },
                  });
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-bold border border-amber-200 cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm">add</span>
                <span>Thêm câu hỏi mới</span>
              </button>
            </div>

            <div className="space-y-4">
              {(content.home.faqs || []).map((faq, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 relative group">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-800 uppercase">
                      Câu hỏi #{idx + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        const filtered = (content.home.faqs || []).filter((_, i) => i !== idx);
                        setContent({
                          ...content,
                          home: { ...content.home, faqs: filtered },
                        });
                      }}
                      className="text-xs text-rose-600 hover:text-rose-800 font-bold cursor-pointer"
                    >
                      Xóa câu này
                    </button>
                  </div>
                  <input
                    type="text"
                    value={faq.q}
                    onChange={(e) => {
                      const newFaqs = [...(content.home.faqs || [])];
                      newFaqs[idx].q = e.target.value;
                      setContent({
                        ...content,
                        home: { ...content.home, faqs: newFaqs },
                      });
                    }}
                    placeholder="Nội dung câu hỏi..."
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm font-bold text-slate-900 bg-white"
                  />
                  <textarea
                    rows={2}
                    value={faq.a}
                    onChange={(e) => {
                      const newFaqs = [...(content.home.faqs || [])];
                      newFaqs[idx].a = e.target.value;
                      setContent({
                        ...content,
                        home: { ...content.home, faqs: newFaqs },
                      });
                    }}
                    placeholder="Câu trả lời..."
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm text-slate-700 bg-white"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          TAB 2: TRANG LĨNH VỰC HOẠT ĐỘNG (/services)
         ========================================================= */}
      {activeTab === "services" && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              Nội Dung Trang Tổng Quan Lĩnh Vực (/services)
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Chỉnh sửa phần Hero banner và lời dẫn phần giới thiệu toàn bộ lĩnh vực hành nghề.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                Tiêu đề Hero chính
              </label>
              <input
                type="text"
                value={content.servicesPage.hero.title}
                onChange={(e) =>
                  setContent({
                    ...content,
                    servicesPage: {
                      ...content.servicesPage,
                      hero: { ...content.servicesPage.hero, title: e.target.value },
                    },
                  })
                }
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                Dòng chữ nổi bật Hero (Accent)
              </label>
              <input
                type="text"
                value={content.servicesPage.hero.titleAccent}
                onChange={(e) =>
                  setContent({
                    ...content,
                    servicesPage: {
                      ...content.servicesPage,
                      hero: { ...content.servicesPage.hero, titleAccent: e.target.value },
                    },
                  })
                }
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-medium"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                Mô tả ngắn gọn Hero
              </label>
              <textarea
                rows={2}
                value={content.servicesPage.hero.description}
                onChange={(e) =>
                  setContent({
                    ...content,
                    servicesPage: {
                      ...content.servicesPage,
                      hero: { ...content.servicesPage.hero, description: e.target.value },
                    },
                  })
                }
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                Tiêu đề khối lĩnh vực cốt lõi
              </label>
              <input
                type="text"
                value={content.servicesPage.section.heading}
                onChange={(e) =>
                  setContent({
                    ...content,
                    servicesPage: {
                      ...content.servicesPage,
                      section: { ...content.servicesPage.section, heading: e.target.value },
                    },
                  })
                }
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                Nhãn phân cách (Divider Label)
              </label>
              <input
                type="text"
                value={content.servicesPage.section.subHeading}
                onChange={(e) =>
                  setContent({
                    ...content,
                    servicesPage: {
                      ...content.servicesPage,
                      section: { ...content.servicesPage.section, subHeading: e.target.value },
                    },
                  })
                }
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-medium"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                Lời giới thiệu khối lĩnh vực cốt lõi
              </label>
              <textarea
                rows={2}
                value={content.servicesPage.section.description}
                onChange={(e) =>
                  setContent({
                    ...content,
                    servicesPage: {
                      ...content.servicesPage,
                      section: { ...content.servicesPage.section, description: e.target.value },
                    },
                  })
                }
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-medium"
              />
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          TAB 3: CHI TIẾT LĨNH VỰC (3 TABS CON)
         ========================================================= */}
      {activeTab === "service-detail" && (
        <div className="space-y-6">
          {/* Service Selector Dropdown */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-100 text-[#641D06] flex items-center justify-center font-bold">
                <span className="material-symbols-outlined">folder_open</span>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase">
                  Chọn Lĩnh Vực Cần Chỉnh Sửa:
                </label>
                <select
                  value={selectedServiceSlug}
                  onChange={(e) => setSelectedServiceSlug(e.target.value)}
                  className="mt-0.5 bg-slate-50 border border-slate-300 font-bold text-slate-900 text-sm rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-amber-600 cursor-pointer"
                >
                  {Object.values(content.servicesDetail).map((srv) => (
                    <option key={srv.slug} value={srv.slug}>
                      {srv.title} ({srv.category})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Link to view current service */}
            <Link
              href={`/services/${selectedServiceSlug}`}
              target="_blank"
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-[#641D06] text-xs font-bold border border-amber-200 transition-colors"
            >
              <span>Xem trang này</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>

          {/* 3 Sub-tabs Navigation */}
          <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
            <button
              onClick={() => setDetailSubTab("about")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wide transition-all cursor-pointer ${
                detailSubTab === "about"
                  ? "bg-[#641D06] text-white shadow-sm"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
              }`}
            >
              <span className="material-symbols-outlined text-base">group</span>
              <span>Trang 1: Về Chúng Tôi</span>
            </button>

            <button
              onClick={() => setDetailSubTab("experience")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wide transition-all cursor-pointer ${
                detailSubTab === "experience"
                  ? "bg-[#641D06] text-white shadow-sm"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
              }`}
            >
              <span className="material-symbols-outlined text-base">verified</span>
              <span>Trang 2: Kinh Nghiệm Thực Tiễn</span>
            </button>

            <button
              onClick={() => setDetailSubTab("articles")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wide transition-all cursor-pointer ${
                detailSubTab === "articles"
                  ? "bg-[#641D06] text-white shadow-sm"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
              }`}
            >
              <span className="material-symbols-outlined text-base">menu_book</span>
              <span>Trang 3: Bài Viết Liên Quan</span>
            </button>
          </div>

          {/* SUBTAB 1: ABOUT (VỀ CHÚNG TÔI) */}
          {detailSubTab === "about" && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <h3 className="text-base font-bold text-slate-900">
                  Thông Tin Chung &amp; Tab "Về Chúng Tôi" — {currentService.title}
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                    Tiêu đề lĩnh vực
                  </label>
                  <input
                    type="text"
                    value={currentService.title}
                    onChange={(e) => {
                      const updatedDetails = { ...content.servicesDetail };
                      updatedDetails[selectedServiceSlug].title = e.target.value;
                      setContent({ ...content, servicesDetail: updatedDetails });
                    }}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-bold text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                    Huy hiệu nổi bật (Badge)
                  </label>
                  <input
                    type="text"
                    value={currentService.badge}
                    onChange={(e) => {
                      const updatedDetails = { ...content.servicesDetail };
                      updatedDetails[selectedServiceSlug].badge = e.target.value;
                      setContent({ ...content, servicesDetail: updatedDetails });
                    }}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-bold"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                    Mô tả ngắn gọn Hero Header
                  </label>
                  <textarea
                    rows={2}
                    value={currentService.heroDesc}
                    onChange={(e) => {
                      const updatedDetails = { ...content.servicesDetail };
                      updatedDetails[selectedServiceSlug].heroDesc = e.target.value;
                      setContent({ ...content, servicesDetail: updatedDetails });
                    }}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm"
                  />
                </div>

                {/* Overview Paragraphs */}
                <div className="md:col-span-2 space-y-3 pt-2">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold text-slate-700 uppercase">
                      Các đoạn văn bản Tổng quan giới thiệu (Overview)
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        const updatedDetails = { ...content.servicesDetail };
                        updatedDetails[selectedServiceSlug].about.overview.push("Đoạn văn bản mới...");
                        setContent({ ...content, servicesDetail: updatedDetails });
                      }}
                      className="text-xs font-bold text-amber-800 hover:text-amber-950 flex items-center gap-1 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-sm">add</span> Thêm đoạn
                    </button>
                  </div>

                  {currentService.about.overview.map((para, pIdx) => (
                    <div key={pIdx} className="flex items-start gap-2">
                      <span className="text-xs font-bold text-slate-400 mt-2.5 shrink-0">
                        #{pIdx + 1}
                      </span>
                      <textarea
                        rows={2}
                        value={para}
                        onChange={(e) => {
                          const updatedDetails = { ...content.servicesDetail };
                          updatedDetails[selectedServiceSlug].about.overview[pIdx] = e.target.value;
                          setContent({ ...content, servicesDetail: updatedDetails });
                        }}
                        className="flex-1 px-3.5 py-2 rounded-xl border border-slate-200 text-sm text-slate-800"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const updatedDetails = { ...content.servicesDetail };
                          updatedDetails[selectedServiceSlug].about.overview.splice(pIdx, 1);
                          setContent({ ...content, servicesDetail: updatedDetails });
                        }}
                        className="p-2 text-rose-500 hover:text-rose-700 cursor-pointer"
                        title="Xóa đoạn này"
                      >
                        <span className="material-symbols-outlined text-base">delete</span>
                      </button>
                    </div>
                  ))}
                </div>

                {/* 3 Key Highlights */}
                <div className="md:col-span-2 space-y-3 pt-3">
                  <label className="block text-xs font-bold text-slate-700 uppercase">
                    3 Điểm nhấn nổi bật cốt lõi
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {currentService.about.keyHighlights.map((hl, hlIdx) => (
                      <div key={hlIdx} className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200/80 space-y-2">
                        <span className="text-[11px] font-bold text-amber-900 uppercase">
                          Điểm nhấn #{hlIdx + 1}
                        </span>
                        <input
                          type="text"
                          value={hl.title}
                          onChange={(e) => {
                            const updatedDetails = { ...content.servicesDetail };
                            updatedDetails[selectedServiceSlug].about.keyHighlights[hlIdx].title = e.target.value;
                            setContent({ ...content, servicesDetail: updatedDetails });
                          }}
                          className="w-full px-3 py-1.5 rounded-lg border border-slate-300 font-bold text-xs bg-white"
                          placeholder="Tiêu đề điểm nhấn"
                        />
                        <textarea
                          rows={3}
                          value={hl.desc}
                          onChange={(e) => {
                            const updatedDetails = { ...content.servicesDetail };
                            updatedDetails[selectedServiceSlug].about.keyHighlights[hlIdx].desc = e.target.value;
                            setContent({ ...content, servicesDetail: updatedDetails });
                          }}
                          className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs bg-white"
                          placeholder="Mô tả chi tiết"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Workflow Steps */}
                <div className="md:col-span-2 space-y-3 pt-3">
                  <label className="block text-xs font-bold text-slate-700 uppercase">
                    Quy trình thực hiện các bước (Workflow)
                  </label>
                  <div className="space-y-3">
                    {currentService.about.workflow.map((wf, wfIdx) => (
                      <div key={wfIdx} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-wrap sm:flex-nowrap items-start gap-3">
                        <div className="w-12 shrink-0">
                          <span className="block text-[10px] font-bold text-slate-500 uppercase">Bước</span>
                          <input
                            type="text"
                            value={wf.step}
                            onChange={(e) => {
                              const updatedDetails = { ...content.servicesDetail };
                              updatedDetails[selectedServiceSlug].about.workflow[wfIdx].step = e.target.value;
                              setContent({ ...content, servicesDetail: updatedDetails });
                            }}
                            className="w-full px-2 py-1 rounded border border-slate-300 text-center font-bold text-xs bg-white"
                          />
                        </div>
                        <div className="flex-1 space-y-2">
                          <input
                            type="text"
                            value={wf.title}
                            onChange={(e) => {
                              const updatedDetails = { ...content.servicesDetail };
                              updatedDetails[selectedServiceSlug].about.workflow[wfIdx].title = e.target.value;
                              setContent({ ...content, servicesDetail: updatedDetails });
                            }}
                            className="w-full px-3 py-1 rounded border border-slate-300 font-bold text-xs bg-white"
                            placeholder="Tên bước"
                          />
                          <textarea
                            rows={2}
                            value={wf.desc}
                            onChange={(e) => {
                              const updatedDetails = { ...content.servicesDetail };
                              updatedDetails[selectedServiceSlug].about.workflow[wfIdx].desc = e.target.value;
                              setContent({ ...content, servicesDetail: updatedDetails });
                            }}
                            className="w-full px-3 py-1 rounded border border-slate-300 text-xs bg-white"
                            placeholder="Mô tả nội dung bước"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SUBTAB 2: EXPERIENCE (KINH NGHIỆM THỰC TIỄN) */}
          {detailSubTab === "experience" && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-5">
              <div className="border-b border-slate-100 pb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Trang 2: Danh Sách Vụ Việc &amp; Kinh Nghiệm Thực Tiễn
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Các thương vụ, vụ kiện và kết quả thành công tiêu biểu đã giải quyết.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const updatedDetails = { ...content.servicesDetail };
                    updatedDetails[selectedServiceSlug].experience.push({
                      title: "Vụ việc / Dự án mới...",
                      clientType: "Doanh nghiệp trong nước",
                      result: "Thành công 100%",
                      year: "2026",
                      summary: "Tóm tắt vụ việc và kết quả đạt được...",
                    });
                    setContent({ ...content, servicesDetail: updatedDetails });
                  }}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-bold border border-amber-200 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-sm">add</span>
                  <span>Thêm vụ việc mới</span>
                </button>
              </div>

              <div className="space-y-4">
                {currentService.experience.map((exp, expIdx) => (
                  <div key={expIdx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-amber-800 uppercase">
                        Hồ sơ vụ việc #{expIdx + 1}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          const updatedDetails = { ...content.servicesDetail };
                          updatedDetails[selectedServiceSlug].experience.splice(expIdx, 1);
                          setContent({ ...content, servicesDetail: updatedDetails });
                        }}
                        className="text-xs text-rose-600 hover:text-rose-800 font-bold cursor-pointer"
                      >
                        Xóa vụ việc này
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="sm:col-span-2">
                        <label className="block text-[11px] font-bold text-slate-600 mb-1">
                          Tiêu đề vụ việc
                        </label>
                        <input
                          type="text"
                          value={exp.title}
                          onChange={(e) => {
                            const updatedDetails = { ...content.servicesDetail };
                            updatedDetails[selectedServiceSlug].experience[expIdx].title = e.target.value;
                            setContent({ ...content, servicesDetail: updatedDetails });
                          }}
                          className="w-full px-3 py-1.5 rounded-lg border border-slate-300 font-bold text-xs bg-white"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 mb-1">
                          Năm thực hiện
                        </label>
                        <input
                          type="text"
                          value={exp.year}
                          onChange={(e) => {
                            const updatedDetails = { ...content.servicesDetail };
                            updatedDetails[selectedServiceSlug].experience[expIdx].year = e.target.value;
                            setContent({ ...content, servicesDetail: updatedDetails });
                          }}
                          className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs bg-white"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 mb-1">
                          Loại khách hàng
                        </label>
                        <input
                          type="text"
                          value={exp.clientType}
                          onChange={(e) => {
                            const updatedDetails = { ...content.servicesDetail };
                            updatedDetails[selectedServiceSlug].experience[expIdx].clientType = e.target.value;
                            setContent({ ...content, servicesDetail: updatedDetails });
                          }}
                          className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs bg-white"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-[11px] font-bold text-slate-600 mb-1">
                          Kết quả đạt được
                        </label>
                        <input
                          type="text"
                          value={exp.result}
                          onChange={(e) => {
                            const updatedDetails = { ...content.servicesDetail };
                            updatedDetails[selectedServiceSlug].experience[expIdx].result = e.target.value;
                            setContent({ ...content, servicesDetail: updatedDetails });
                          }}
                          className="w-full px-3 py-1.5 rounded-lg border border-slate-300 font-bold text-emerald-700 text-xs bg-white"
                        />
                      </div>

                      <div className="sm:col-span-3">
                        <label className="block text-[11px] font-bold text-slate-600 mb-1">
                          Tóm tắt chi tiết vụ việc
                        </label>
                        <textarea
                          rows={2}
                          value={exp.summary}
                          onChange={(e) => {
                            const updatedDetails = { ...content.servicesDetail };
                            updatedDetails[selectedServiceSlug].experience[expIdx].summary = e.target.value;
                            setContent({ ...content, servicesDetail: updatedDetails });
                          }}
                          className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs bg-white"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SUBTAB 3: ARTICLES (BÀI VIẾT LIÊN QUAN) */}
          {detailSubTab === "articles" && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-5">
              <div className="border-b border-slate-100 pb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Trang 3: Danh Sách Bài Viết Chuyên Sâu
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Các bài viết học thuật, bình luận án và cẩm nang pháp lý liên quan.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const updatedDetails = { ...content.servicesDetail };
                    updatedDetails[selectedServiceSlug].articles.push({
                      slug: "bai-viet-moi",
                      title: "Tiêu đề bài viết tham khảo mới...",
                      date: "2026-09-22",
                      readTime: "5 phút",
                      excerpt: "Trích dẫn tóm tắt nội dung bài viết...",
                    });
                    setContent({ ...content, servicesDetail: updatedDetails });
                  }}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-bold border border-amber-200 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-sm">add</span>
                  <span>Thêm bài viết</span>
                </button>
              </div>

              <div className="space-y-4">
                {currentService.articles.map((art, artIdx) => (
                  <div key={artIdx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-amber-800 uppercase">
                        Bài viết #{artIdx + 1}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          const updatedDetails = { ...content.servicesDetail };
                          updatedDetails[selectedServiceSlug].articles.splice(artIdx, 1);
                          setContent({ ...content, servicesDetail: updatedDetails });
                        }}
                        className="text-xs text-rose-600 hover:text-rose-800 font-bold cursor-pointer"
                      >
                        Xóa bài này
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="sm:col-span-2">
                        <label className="block text-[11px] font-bold text-slate-600 mb-1">
                          Tiêu đề bài viết
                        </label>
                        <input
                          type="text"
                          value={art.title}
                          onChange={(e) => {
                            const updatedDetails = { ...content.servicesDetail };
                            updatedDetails[selectedServiceSlug].articles[artIdx].title = e.target.value;
                            setContent({ ...content, servicesDetail: updatedDetails });
                          }}
                          className="w-full px-3 py-1.5 rounded-lg border border-slate-300 font-bold text-xs bg-white"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 mb-1">
                          Thời lượng đọc
                        </label>
                        <input
                          type="text"
                          value={art.readTime}
                          onChange={(e) => {
                            const updatedDetails = { ...content.servicesDetail };
                            updatedDetails[selectedServiceSlug].articles[artIdx].readTime = e.target.value;
                            setContent({ ...content, servicesDetail: updatedDetails });
                          }}
                          className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs bg-white"
                        />
                      </div>

                      <div className="sm:col-span-3">
                        <label className="block text-[11px] font-bold text-slate-600 mb-1">
                          Đoạn trích tóm lược
                        </label>
                        <textarea
                          rows={2}
                          value={art.excerpt}
                          onChange={(e) => {
                            const updatedDetails = { ...content.servicesDetail };
                            updatedDetails[selectedServiceSlug].articles[artIdx].excerpt = e.target.value;
                            setContent({ ...content, servicesDetail: updatedDetails });
                          }}
                          className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs bg-white"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* =========================================================
          TAB 4: CHÂN TRANG (FOOTER)
         ========================================================= */}
      {activeTab === "footer" && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-600"></span>
              Nội Dung &amp; Thông Tin Chân Trang (Footer)
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Cập nhật thông tin công ty, địa chỉ, hotline, email, đoàn luật sư và cam kết bảo mật.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                Tên công ty đầy đủ
              </label>
              <input
                type="text"
                value={content.footer.companyName}
                onChange={(e) =>
                  setContent({
                    ...content,
                    footer: { ...content.footer, companyName: e.target.value },
                  })
                }
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-bold text-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                Tên thương hiệu ngắn gọn
              </label>
              <input
                type="text"
                value={content.footer.brandName}
                onChange={(e) =>
                  setContent({
                    ...content,
                    footer: { ...content.footer, brandName: e.target.value },
                  })
                }
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-bold"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                Đoạn văn bản giới thiệu dưới Logo
              </label>
              <textarea
                rows={2}
                value={content.footer.description}
                onChange={(e) =>
                  setContent({
                    ...content,
                    footer: { ...content.footer, description: e.target.value },
                  })
                }
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                Đăng ký hoạt động tại
              </label>
              <input
                type="text"
                value={content.footer.barAssociation}
                onChange={(e) =>
                  setContent({
                    ...content,
                    footer: { ...content.footer, barAssociation: e.target.value },
                  })
                }
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                Cam kết bảo mật &amp; quyền lợi
              </label>
              <input
                type="text"
                value={content.footer.privacyCommitment}
                onChange={(e) =>
                  setContent({
                    ...content,
                    footer: { ...content.footer, privacyCommitment: e.target.value },
                  })
                }
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                Hotline liên hệ 24/7
              </label>
              <input
                type="text"
                value={content.footer.hotline}
                onChange={(e) =>
                  setContent({
                    ...content,
                    footer: { ...content.footer, hotline: e.target.value },
                  })
                }
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-bold text-emerald-800"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                Hộp thư Email
              </label>
              <input
                type="email"
                value={content.footer.email}
                onChange={(e) =>
                  setContent({
                    ...content,
                    footer: { ...content.footer, email: e.target.value },
                  })
                }
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                Địa chỉ trụ sở văn phòng
              </label>
              <input
                type="text"
                value={content.footer.address}
                onChange={(e) =>
                  setContent({
                    ...content,
                    footer: { ...content.footer, address: e.target.value },
                  })
                }
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                Đường dẫn Chat Zalo (URL)
              </label>
              <input
                type="text"
                value={content.footer.zaloUrl}
                onChange={(e) =>
                  setContent({
                    ...content,
                    footer: { ...content.footer, zaloUrl: e.target.value },
                  })
                }
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-blue-700"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                Dòng chữ Bản quyền (Copyright)
              </label>
              <input
                type="text"
                value={content.footer.copyright}
                onChange={(e) =>
                  setContent({
                    ...content,
                    footer: { ...content.footer, copyright: e.target.value },
                  })
                }
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                Lưu ý miễn trừ trách nhiệm (Disclaimer)
              </label>
              <textarea
                rows={2}
                value={content.footer.disclaimer}
                onChange={(e) =>
                  setContent({
                    ...content,
                    footer: { ...content.footer, disclaimer: e.target.value },
                  })
                }
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm"
              />
            </div>
          </div>
        </div>
      )}

      {/* Floating Save Action Bar at bottom */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-slate-900/90 backdrop-blur-md px-6 py-3 rounded-2xl shadow-2xl border border-amber-500/40 flex items-center gap-4 animate-fadeIn">
        <span className="text-xs font-bold text-amber-200 hidden sm:inline">
          💡 Bạn có thay đổi chưa lưu?
        </span>
        <button
          type="button"
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs sm:text-sm shadow-md transition-all cursor-pointer disabled:opacity-50"
        >
          {isSaving ? (
            <>
              <span className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></span>
              <span>Đang lưu...</span>
            </>
          ) : (
            <>
              <span className="material-symbols-outlined text-base">save</span>
              <span>Lưu tất cả thay đổi ngay</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
