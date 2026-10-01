"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { newsService } from "@/services/news.service";

interface ILawQuestion {
  id: string;
  title: string;
  snippet: string;
  url: string;
  date?: string;
}

export default function AdminAutoContentPage() {
  const [activeTab, setActiveTab] = useState<"demo" | "schedule" | "history">("demo");

  // Source & Scraping State
  const [sourceUrlInput, setSourceUrlInput] = useState("https://i-law.vn/tat-ca-cau-hoi/thua-ke-di-chuc");
  const [isFetchingSource, setIsFetchingSource] = useState(false);
  const [fetchedQuestions, setFetchedQuestions] = useState<ILawQuestion[]>([]);

  // Generator State
  const [selectedQuestion, setSelectedQuestion] = useState<ILawQuestion | null>(null);
  const [topicInput, setTopicInput] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Thừa Kế & Di Chúc");
  const [selectedTone, setSelectedTone] = useState("Tham vấn khách quan, viện dẫn luật mới nhất 2024-2026, không khẳng định đúng sai tuyệt đối");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState("");
  const [generatedArticle, setGeneratedArticle] = useState<any | null>(null);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState("");

  // Schedule Config State
  const [scheduleConfig, setScheduleConfig] = useState({
    enabled: true,
    runTime: "07:30",
    frequency: "daily_1",
    publishMode: "draft", // "draft" | "publish"
    autoMindmap: true,
    autoDisclaimer: true,
    sourceUrls: [
      "https://i-law.vn/tat-ca-cau-hoi/thua-ke-di-chuc",
      "https://thuvienphapluat.vn/hoidap-phapluat",
      "https://luatvietnam.vn/hoi-dap-phap-luat",
    ],
  });
  const [isSavingSchedule, setIsSavingSchedule] = useState(false);
  const [scheduleSavedMsg, setScheduleSavedMsg] = useState("");

  // Auto fetch i-law on mount
  useEffect(() => {
    fetchQuestionsFromSource("https://i-law.vn/tat-ca-cau-hoi/thua-ke-di-chuc");
  }, []);

  const fetchQuestionsFromSource = async (urlToFetch: string) => {
    setIsFetchingSource(true);
    try {
      const res = await fetch("/api/admin/auto-content/fetch-source", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: urlToFetch }),
      });
      const data = await res.json();
      if (data.success && data.questions) {
        setFetchedQuestions(data.questions);
        if (data.questions.length > 0 && !topicInput) {
          handleSelectQuestion(data.questions[0]);
        }
      }
    } catch (err) {
      console.warn("Failed to fetch source questions:", err);
    } finally {
      setIsFetchingSource(false);
    }
  };

  const handleSelectQuestion = (q: ILawQuestion) => {
    setSelectedQuestion(q);
    setTopicInput(q.title + ": " + q.snippet);
    setSourceUrlInput(q.url);
    setSelectedCategory("Thừa Kế & Di Chúc");
    setGeneratedArticle(null);
    setSaveSuccessMsg("");
  };

  const handleGenerate = async () => {
    if (!topicInput.trim()) {
      alert("Vui lòng chọn một câu hỏi từ nguồn i-law.vn hoặc nhập chủ đề cần viết.");
      return;
    }

    setIsGenerating(true);
    setGeneratedArticle(null);
    setSaveSuccessMsg("");

    try {
      setGenerationStep("1. Đang đọc câu hỏi thực tế từ i-law.vn & phân tích bản chất vụ việc...");
      await new Promise((r) => setTimeout(r, 600));

      setGenerationStep("2. Đang đối chiếu Bộ luật Dân sự 2015 (Thừa kế) & Luật Đất đai 2024 mới nhất...");
      await new Promise((r) => setTimeout(r, 700));

      setGenerationStep("3. Đang soạn thảo bài viết tham vấn theo tác phong Luật sư khách quan (không phán quyết đúng/sai)...");
      
      const res = await fetch("/api/admin/auto-content/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: topicInput.trim(),
          sourceUrl: sourceUrlInput.trim(),
          category: selectedCategory,
          tone: selectedTone,
        }),
      });

      setGenerationStep("4. Khởi tạo sơ đồ tư duy Mindmap và khung khuyến nghị mời gặp Ls. Phan Đức Tín...");
      const json = await res.json();

      if (json.success && json.data) {
        setGeneratedArticle(json.data);
      } else {
        alert(json.error || "Không thể tạo bài viết tự động. Vui lòng thử lại!");
      }
    } catch (err: any) {
      alert("Lỗi khi kết nối hệ thống AI: " + (err?.message || "Không xác định"));
    } finally {
      setIsGenerating(false);
      setGenerationStep("");
    }
  };

  const handleSaveToCMS = async (status: "draft" | "published") => {
    if (!generatedArticle) return;
    try {
      const payload = {
        title: generatedArticle.title,
        slug: generatedArticle.slug,
        category: generatedArticle.category,
        summary: generatedArticle.summary,
        content: generatedArticle.content,
        sections: generatedArticle.sections,
        mindmap: generatedArticle.mindmap,
        diagramType: (generatedArticle.diagramType as any) || "mindmap",
        layoutStyle: ("cards" as const),
        status: status,
      };

      await newsService.createNews(payload);
      setSaveSuccessMsg(
        status === "published"
          ? "🎉 Bài viết đã được XUẤT BẢN THÀNH CÔNG lên website chính thức!"
          : "✅ Đã lưu bài viết vào BẢN NHÁP (Draft). Bạn có thể kiểm tra trong mục 'Quản lý Bài viết & Sơ đồ'."
      );
    } catch (e: any) {
      alert("Lỗi khi lưu bài viết: " + (e?.message || "Vui lòng thử lại"));
    }
  };

  const handleSaveSchedule = () => {
    setIsSavingSchedule(true);
    try {
      localStorage.setItem("ductin_auto_content_config", JSON.stringify(scheduleConfig));
      setScheduleSavedMsg("Đã lưu thiết lập lịch chạy tự động thành công!");
      setTimeout(() => setScheduleSavedMsg(""), 3000);
    } catch (e) {
      alert("Không thể lưu cấu hình");
    } finally {
      setIsSavingSchedule(false);
    }
  };

  return (
    <div className="space-y-8 max-w-[1600px] mx-auto pb-16">
      {/* Studio Header */}
      <div className="bg-gradient-to-r from-slate-900 via-stone-900 to-[#641D06] rounded-3xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-300/30 text-amber-300 text-xs font-bold uppercase tracking-wider">
              <span className="material-symbols-outlined text-sm animate-pulse">auto_awesome</span>
              Nguồn cấp: i-law.vn (Thừa kế &amp; Di chúc)
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black font-sans tracking-tight">
              AI Tự Động Viết Bài Từ Nguồn Hỏi Đáp Pháp Luật
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
              Tự động đọc câu hỏi tình huống thực tế của người dân từ <strong>i-law.vn</strong>, đối chiếu Bộ luật Dân sự &amp; Luật Đất đai mới nhất, soạn bài tư vấn khách quan như một luật sư giàu kinh nghiệm.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="flex flex-wrap sm:flex-nowrap gap-3 bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/15">
            <div className="px-4 py-2 text-center border-r border-white/10">
              <div className="text-xl sm:text-2xl font-black text-amber-400">{fetchedQuestions.length}</div>
              <div className="text-[11px] text-slate-300 font-medium uppercase tracking-wider">Câu Hỏi i-law.vn</div>
            </div>
            <div className="px-4 py-2 text-center border-r border-white/10">
              <div className="text-xl sm:text-2xl font-black text-emerald-400">{scheduleConfig.enabled ? "BẬT" : "TẮT"}</div>
              <div className="text-[11px] text-slate-300 font-medium uppercase tracking-wider">Lịch Tự Động</div>
            </div>
            <div className="px-4 py-2 text-center">
              <div className="text-xl sm:text-2xl font-black text-white">{scheduleConfig.runTime}</div>
              <div className="text-[11px] text-slate-300 font-medium uppercase tracking-wider">Giờ Chạy</div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 mt-8 pt-4 border-t border-white/10 overflow-x-auto">
          <button
            onClick={() => setActiveTab("demo")}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
              activeTab === "demo"
                ? "bg-amber-400 text-slate-950 shadow-md"
                : "bg-white/10 text-white hover:bg-white/20"
            }`}
          >
            <span className="material-symbols-outlined text-lg">psychology</span>
            Cào i-law.vn &amp; Viết Bài Trực Tiếp
          </button>
          <button
            onClick={() => setActiveTab("schedule")}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
              activeTab === "schedule"
                ? "bg-amber-400 text-slate-950 shadow-md"
                : "bg-white/10 text-white hover:bg-white/20"
            }`}
          >
            <span className="material-symbols-outlined text-lg">alarm_on</span>
            Cấu Hình Nguồn Cào &amp; Hẹn Giờ
          </button>
          <Link
            href="/admin/news"
            className="px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-white/10 text-white hover:bg-white/20 transition-all flex items-center gap-2 whitespace-nowrap ml-auto"
          >
            <span className="material-symbols-outlined text-lg">article</span>
            Xem Kho Bài Viết Web
          </Link>
        </div>
      </div>

      {/* TAB 1: I-LAW INTEGRATION & DEMO TESTER */}
      {activeTab === "demo" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: i-law Questions Feed & Controls (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Source URL Bar */}
            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-3">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-amber-600 text-base">cloud_download</span>
                  Nguồn quét câu hỏi thực tế:
                </span>
                <span className="text-[11px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full">
                  i-law.vn Live
                </span>
              </label>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={sourceUrlInput}
                  onChange={(e) => setSourceUrlInput(e.target.value)}
                  placeholder="https://i-law.vn/tat-ca-cau-hoi/thua-ke-di-chuc"
                  className="flex-1 px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-medium text-slate-800 bg-slate-50 focus:bg-white focus:outline-none focus:border-[#641D06]"
                />
                <button
                  type="button"
                  disabled={isFetchingSource}
                  onClick={() => fetchQuestionsFromSource(sourceUrlInput)}
                  className="px-4 py-2 bg-slate-900 hover:bg-black text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 shrink-0 cursor-pointer disabled:opacity-60"
                >
                  {isFetchingSource ? (
                    <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <span className="material-symbols-outlined text-base">sync</span>
                  )}
                  <span>Quét Lại</span>
                </button>
              </div>

              {/* Quick Category Chips from i-law */}
              <div className="flex flex-wrap gap-1.5 pt-1 border-t border-slate-100">
                {[
                  { label: "Thừa kế - Di chúc", url: "https://i-law.vn/tat-ca-cau-hoi/thua-ke-di-chuc" },
                  { label: "Đất đai - Nhà ở", url: "https://i-law.vn/tat-ca-cau-hoi/dat-dai-nha-o" },
                  { label: "Hôn nhân gia đình", url: "https://i-law.vn/tat-ca-cau-hoi/hon-nhan-gia-dinh" },
                  { label: "Lao động - Tiền lương", url: "https://i-law.vn/tat-ca-cau-hoi/lao-dong-tien-luong" },
                ].map((chip, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setSourceUrlInput(chip.url);
                      fetchQuestionsFromSource(chip.url);
                    }}
                    className={`text-[11px] px-2.5 py-1 rounded-lg font-semibold transition-colors cursor-pointer ${
                      sourceUrlInput === chip.url
                        ? "bg-[#641D06] text-white"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    {chip.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Questions List from i-law.vn */}
            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1">
                  <span className="material-symbols-outlined text-amber-700 text-base">format_list_bulleted</span>
                  Danh sách câu hỏi vừa cào được ({fetchedQuestions.length}):
                </span>
                <span className="text-[11px] text-slate-500 font-medium">Bấm để chọn câu hỏi</span>
              </div>

              <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
                {fetchedQuestions.map((q, idx) => {
                  const isSelected = selectedQuestion?.id === q.id;
                  return (
                    <div
                      key={q.id || idx}
                      onClick={() => handleSelectQuestion(q)}
                      className={`p-3 rounded-2xl border-2 transition-all cursor-pointer ${
                        isSelected
                          ? "border-[#641D06] bg-amber-50/70 shadow-xs"
                          : "border-slate-200 hover:border-slate-300 bg-white"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h4 className="font-bold text-xs sm:text-sm text-slate-900 leading-snug line-clamp-1">
                          #{idx + 1}. {q.title}
                        </h4>
                        {q.date && (
                          <span className="text-[10px] text-slate-400 font-medium shrink-0">
                            {q.date}
                          </span>
                        )}
                      </div>
                      <p className="text-[11.5px] text-slate-600 line-clamp-2 leading-relaxed">
                        {q.snippet}
                      </p>
                      <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                        <span className="text-[#641D06] font-bold flex items-center gap-1">
                          <span className="material-symbols-outlined text-sm">
                            {isSelected ? "check_circle" : "radio_button_unchecked"}
                          </span>
                          {isSelected ? "Đang chọn câu này" : "Chọn viết bài"}
                        </span>
                        <a
                          href={q.url}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-slate-400 hover:text-blue-600 flex items-center gap-0.5"
                        >
                          Xem gốc trên iLAW <span className="material-symbols-outlined text-xs">open_in_new</span>
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* AI Control Card */}
            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200/80 space-y-1.5 text-xs">
                <div className="font-bold text-amber-950 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-amber-800 text-base">gavel</span>
                  Quy tắc tham vấn Luật sư:
                </div>
                <p className="text-amber-900/90 leading-relaxed font-medium">
                  AI sẽ bóc tách câu hỏi từ i-law.vn, áp dụng <strong>Bộ luật Dân sự 2015 &amp; Luật Đất đai 2024</strong>, giải đáp khách quan <em>(không phán quyết đúng/sai tuyệt đối khi chưa có chứng cứ)</em> và kèm lời khuyên thực tiễn của <strong>Luật sư Phan Đức Tín</strong>.
                </p>
              </div>

              {/* Generate Button */}
              <button
                type="button"
                disabled={isGenerating || !topicInput}
                onClick={handleGenerate}
                className="w-full py-4 bg-[#641D06] hover:bg-black text-white font-bold text-sm sm:text-base rounded-2xl transition-all shadow-lg active:scale-98 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                {isGenerating ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Đang Đọc iLAW &amp; Soạn Thảo Bài Viết...</span>
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-xl">auto_awesome</span>
                    <span>AI Đọc Câu Này &amp; Viết Bài Mẫu Ngay</span>
                  </>
                )}
              </button>

              {isGenerating && generationStep && (
                <div className="p-3 bg-slate-900 text-amber-300 text-xs font-mono rounded-xl animate-pulse">
                  {generationStep}
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Live Article Preview (7 cols) */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm min-h-[640px] flex flex-col">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-emerald-50 text-emerald-700">
                  <span className="material-symbols-outlined text-xl">visibility</span>
                </span>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">Xem Trước Bài Viết AI Vừa Soạn (Live Preview)</h3>
                  <p className="text-xs text-slate-500">Mẫu bài viết chuẩn SEO giải đáp cho câu hỏi từ i-law.vn</p>
                </div>
              </div>

              {generatedArticle && (
                <span className="text-[11px] px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full font-bold">
                  Sẵn Sàng Xuất Bản
                </span>
              )}
            </div>

            {saveSuccessMsg && (
              <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 font-bold text-sm flex items-center gap-2">
                <span className="material-symbols-outlined text-emerald-600">check_circle</span>
                <span>{saveSuccessMsg}</span>
              </div>
            )}

            {!generatedArticle ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-8 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50">
                <span className="material-symbols-outlined text-5xl text-slate-300 mb-3">
                  menu_book
                </span>
                <h4 className="font-bold text-slate-700 text-base mb-1">Chưa có bài viết mẫu</h4>
                <p className="text-xs text-slate-500 max-w-sm">
                  Chọn 1 câu hỏi từ danh sách bên trái rồi bấm <strong>"AI Đọc Câu Này &amp; Viết Bài Mẫu Ngay"</strong> để xem bài viết hoàn chỉnh tại đây.
                </p>
              </div>
            ) : (
              <div className="space-y-6 flex-1">
                {/* Meta info */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-[11px] font-black uppercase">
                    {generatedArticle.category}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-[11px] font-bold">
                    Áp Dụng Luật 2026
                  </span>
                  <span className="text-xs text-slate-400 font-medium ml-auto">
                    Nguồn: i-law.vn
                  </span>
                </div>

                {/* Title */}
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
                  {generatedArticle.title}
                </h2>

                {/* Legal Basis Box */}
                {generatedArticle.legalBasis && generatedArticle.legalBasis.length > 0 && (
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                    <div className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-amber-700 text-sm">gavel</span>
                      Căn cứ pháp lý mới nhất được viện dẫn:
                    </div>
                    <ul className="text-xs text-slate-600 space-y-1 list-disc pl-5 font-medium">
                      {generatedArticle.legalBasis.map((lb: string, i: number) => (
                        <li key={i}>{lb}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Summary */}
                <div className="text-sm font-semibold text-slate-700 bg-amber-50/50 p-4 rounded-xl border-l-4 border-amber-500 leading-relaxed italic">
                  {generatedArticle.summary}
                </div>

                {/* Mindmap visual preview */}
                {generatedArticle.mindmap && (
                  <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-2">
                    <div className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-base">account_tree</span>
                      Sơ đồ tư duy thủ tục tóm tắt (AI Mindmap):
                    </div>
                    <pre className="text-xs text-slate-300 font-mono whitespace-pre-wrap leading-relaxed overflow-x-auto">
                      {generatedArticle.mindmap}
                    </pre>
                  </div>
                )}

                {/* Main Content */}
                <div className="prose prose-slate max-w-none text-xs sm:text-sm leading-relaxed text-slate-800 space-y-4 border-t border-slate-100 pt-4">
                  {generatedArticle.sections ? (
                    generatedArticle.sections.map((sec: any, idx: number) => (
                      <div key={sec.id || idx} className="space-y-1.5">
                        <h3 className="text-sm sm:text-base font-bold text-[#641D06] flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-900 text-xs font-black inline-flex items-center justify-center">
                            {sec.number || idx + 1}
                          </span>
                          {sec.title}
                        </h3>
                        <p className="text-slate-700 leading-relaxed pl-8">{sec.content}</p>
                      </div>
                    ))
                  ) : (
                    <div className="whitespace-pre-wrap">{generatedArticle.content}</div>
                  )}
                </div>

                {/* Lawyer Disclaimer Callout */}
                <div className="p-4 rounded-2xl bg-stone-900 text-white space-y-2 text-xs">
                  <div className="font-bold text-amber-400 flex items-center gap-1.5 text-sm">
                    <span className="material-symbols-outlined text-base">support_agent</span>
                    Khuyến cáo tham vấn từ Luật sư Phan Đức Tín:
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    Nội dung phân tích trên mang tính chất định hướng pháp lý tham khảo. Để bảo vệ tối đa quyền và lợi ích hợp pháp của mình, Quý khách nên mang hồ sơ gốc để Luật sư thẩm định cụ thể trước khi ký kết văn bản hoặc tiến hành tố tụng.
                  </p>
                </div>

                {/* Action Bar */}
                <div className="pt-6 border-t border-slate-200 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => handleSaveToCMS("published")}
                    className="flex-1 min-w-[200px] py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-lg">publish</span>
                    <span>Đăng Lên Website Ngay</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSaveToCMS("draft")}
                    className="flex-1 min-w-[200px] py-3.5 bg-slate-900 hover:bg-black text-white font-bold text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-lg">save</span>
                    <span>Lưu Vào Bản Nháp (Chờ Duyệt)</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: SCHEDULE CONFIG */}
      {activeTab === "schedule" && (
        <div className="max-w-4xl mx-auto bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-8">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
              <span className="material-symbols-outlined text-amber-600">schedule</span>
              Cấu Hình Nguồn Cào i-law.vn &amp; Lịch Trình Tự Động Chạy
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Hệ thống sẽ tự động quét các chủ đề hỏi đáp mới nhất từ i-law.vn theo đúng khung giờ bạn cài đặt, tạo bài viết và phân loại tự động.
            </p>
          </div>

          {scheduleSavedMsg && (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 font-bold text-sm flex items-center gap-2">
              <span className="material-symbols-outlined text-emerald-600">check_circle</span>
              <span>{scheduleSavedMsg}</span>
            </div>
          )}

          {/* Master Toggle */}
          <div className="flex items-center justify-between p-5 rounded-2xl bg-slate-50 border border-slate-200">
            <div>
              <div className="font-bold text-slate-900 text-sm sm:text-base">Kích hoạt chế độ Tự động tạo bài viết hàng ngày</div>
              <div className="text-xs text-slate-500 mt-0.5">
                Khi bật, hệ thống máy chủ sẽ tự động quét nguồn i-law.vn và tạo bài viết ngầm theo lịch.
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={scheduleConfig.enabled}
                onChange={(e) => setScheduleConfig({ ...scheduleConfig, enabled: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-13 h-7 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[3px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-emerald-600"></div>
            </label>
          </div>

          {/* Time & Frequency */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Khung giờ tự động quét hàng ngày:
              </label>
              <input
                type="time"
                value={scheduleConfig.runTime}
                onChange={(e) => setScheduleConfig({ ...scheduleConfig, runTime: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 font-bold text-slate-800 text-base bg-slate-50 focus:bg-white"
              />
              <p className="text-[11px] text-slate-400">Gợi ý: 07:30 sáng là thời điểm người đọc báo buổi sáng nhiều nhất.</p>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Tần suất sinh bài viết:
              </label>
              <select
                value={scheduleConfig.frequency}
                onChange={(e) => setScheduleConfig({ ...scheduleConfig, frequency: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 font-bold text-slate-800 text-sm bg-slate-50 focus:bg-white"
              >
                <option value="daily_1">1 bài viết / ngày (Tiêu chuẩn chất lượng cao)</option>
                <option value="daily_2">2 bài viết / ngày (Sáng 07:30 &amp; Chiều 14:00)</option>
                <option value="weekly_3">3 bài viết / tuần (Thứ 2, Thứ 4, Thứ 6)</option>
              </select>
            </div>
          </div>

          {/* Publishing Mode */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Chế độ xuất bản bài viết sau khi AI tạo xong:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div
                onClick={() => setScheduleConfig({ ...scheduleConfig, publishMode: "draft" })}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                  scheduleConfig.publishMode === "draft"
                    ? "border-amber-600 bg-amber-50/60 shadow-xs"
                    : "border-slate-200 hover:border-slate-300 bg-white"
                }`}
              >
                <div className="flex items-center gap-2 font-bold text-sm text-slate-900 mb-1">
                  <span className="material-symbols-outlined text-amber-700">edit_note</span>
                  Lưu dạng Bản Nháp (Khuyên Dùng)
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  AI tạo xong sẽ lưu vào danh sách chờ. Bạn hoặc luật sư chỉ cần vào lướt qua 30 giây bấm "Duyệt &amp; Đăng" để kiểm soát tối đa.
                </p>
              </div>

              <div
                onClick={() => setScheduleConfig({ ...scheduleConfig, publishMode: "publish" })}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                  scheduleConfig.publishMode === "publish"
                    ? "border-emerald-600 bg-emerald-50/60 shadow-xs"
                    : "border-slate-200 hover:border-slate-300 bg-white"
                }`}
              >
                <div className="flex items-center gap-2 font-bold text-sm text-slate-900 mb-1">
                  <span className="material-symbols-outlined text-emerald-700">rocket_launch</span>
                  Tự Động Xuất Bản Trực Tiếp
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Bài viết sau khi AI viết xong sẽ tự động hiển thị ngay lên trang Tin tức của website mà không cần thao tác duyệt tay.
                </p>
              </div>
            </div>
          </div>

          {/* Sources List */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center justify-between">
              <span>Danh sách URL các nguồn cào chủ đề:</span>
              <span className="text-[11px] text-amber-800 font-semibold">Ưu tiên i-law.vn</span>
            </label>
            <div className="space-y-2">
              {scheduleConfig.sourceUrls.map((url, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="w-6 text-center text-xs font-bold text-slate-400">#{idx + 1}</span>
                  <input
                    type="text"
                    value={url}
                    onChange={(e) => {
                      const next = [...scheduleConfig.sourceUrls];
                      next[idx] = e.target.value;
                      setScheduleConfig({ ...scheduleConfig, sourceUrls: next });
                    }}
                    className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-medium text-slate-800 bg-slate-50"
                  />
                  {scheduleConfig.sourceUrls.length > 1 && (
                    <button
                      type="button"
                      onClick={() => {
                        const next = scheduleConfig.sourceUrls.filter((_, i) => i !== idx);
                        setScheduleConfig({ ...scheduleConfig, sourceUrls: next });
                      }}
                      className="p-2 text-slate-400 hover:text-red-500 rounded-lg hover:bg-red-50"
                    >
                      <span className="material-symbols-outlined text-base">close</span>
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => {
                setScheduleConfig({
                  ...scheduleConfig,
                  sourceUrls: [...scheduleConfig.sourceUrls, "https://"],
                });
              }}
              className="text-xs text-[#641D06] hover:text-black font-bold flex items-center gap-1 mt-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">add</span> Thêm nguồn cào mới
            </button>
          </div>

          {/* Save Button */}
          <div className="pt-6 border-t border-slate-200">
            <button
              type="button"
              disabled={isSavingSchedule}
              onClick={handleSaveSchedule}
              className="w-full py-4 bg-[#641D06] hover:bg-black text-white font-bold text-sm sm:text-base rounded-2xl transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-lg">check_circle</span>
              <span>Lưu Cấu Hình Lịch Trình Tự Động</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
