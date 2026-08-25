"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useQuery, useMutation } from "@tanstack/react-query";
import { formLibraryService, FormItem } from "@/services/form-library.service";

export default function AIFormLibrary() {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedForm, setSelectedForm] = useState<FormItem | null>(null);
  const [leadForm, setLeadForm] = useState({ name: "", phone: "" });

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearchTerm(searchTerm), 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Fetch search results
  const { data: searchResults, isLoading } = useQuery({
    queryKey: ["forms", debouncedSearchTerm],
    queryFn: () => formLibraryService.searchForms(debouncedSearchTerm, 10),
    enabled: debouncedSearchTerm.length > 0,
  });

  // Default mock data when no search
  const displayForms = debouncedSearchTerm.length > 0 ? (searchResults || []) : [];

  const downloadMutation = useMutation({
    mutationFn: (data: { name: string; phone: string; formId: number }) => formLibraryService.downloadForm(data),
    onSuccess: (data) => {
      // Create a hidden link and click it to download
      const link = document.createElement("a");
      link.href = `http://localhost:3001${data.fileUrl}`; // Assuming backend serves the file or it's an absolute URL
      // If fileUrl is a full URL, use it directly
      if (data.fileUrl.startsWith('http')) {
        link.href = data.fileUrl;
      }
      link.setAttribute("download", "");
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
      
      setShowModal(false);
      alert("Cảm ơn bạn! File đang được tải xuống.");
    },
    onError: (error) => {
      alert("Có lỗi xảy ra khi tải file. Vui lòng thử lại sau.");
      console.error(error);
    }
  });

  const handleDownloadClick = (form: FormItem) => {
    setSelectedForm(form);
    setShowModal(true);
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedForm && leadForm.name && leadForm.phone) {
      downloadMutation.mutate({
        name: leadForm.name,
        phone: leadForm.phone,
        formId: selectedForm.id
      });
    }
  };

  return (
    <main className="pt-10 pb-16 min-h-screen bg-slate-50 relative">
      {/* Lead Gate Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white p-8 rounded-2xl max-w-md w-full shadow-2xl border border-slate-100 relative">
            <button 
              onClick={() => setShowModal(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 material-symbols-outlined cursor-pointer"
            >
              close
            </button>
            <div className="w-12 h-12 bg-green-100 text-green-700 rounded-xl flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-2xl">download</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">Tải Biểu Mẫu Miễn Phí</h2>
            <p className="text-sm text-slate-600 mb-6 leading-relaxed">
              Vui lòng nhập thông tin bên dưới để tải biểu mẫu: <strong className="text-slate-900">{selectedForm?.title}</strong>
            </p>
            <form onSubmit={handleLeadSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-800 mb-1.5">Họ và Tên</label>
                <input 
                  required
                  type="text" 
                  value={leadForm.name}
                  onChange={e => setLeadForm({...leadForm, name: e.target.value})}
                  className="w-full h-12 px-4 border border-slate-300 rounded-lg focus:border-green-600 focus:ring-2 focus:ring-green-100 outline-none bg-white text-slate-900" 
                  placeholder="Ví dụ: Nguyễn Văn A"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-800 mb-1.5">Số điện thoại</label>
                <input 
                  required
                  type="tel" 
                  value={leadForm.phone}
                  onChange={e => setLeadForm({...leadForm, phone: e.target.value})}
                  className="w-full h-12 px-4 border border-slate-300 rounded-lg focus:border-green-600 focus:ring-2 focus:ring-green-100 outline-none bg-white text-slate-900" 
                  placeholder="Ví dụ: 0912345678"
                />
              </div>
              <button 
                type="submit"
                disabled={downloadMutation.isPending}
                className="w-full h-12 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg mt-5 transition-colors disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                {downloadMutation.isPending ? "Đang xử lý..." : (
                  <><span className="material-symbols-outlined">download</span> Tải Xuống File (.doc)</>
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 pb-8">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-5xl lg:text-5xl font-black text-slate-900 font-sans tracking-tight uppercase mb-3">
            Kho Biểu Mẫu Pháp Lý AI
          </h1>
          <div className="text-amber-600 flex items-center justify-center my-3">
            <span className="tracking-widest font-bold text-lg">— ⚖️ —</span>
          </div>
          <p className="text-base md:text-lg text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Tra cứu và tải xuống miễn phí các biểu mẫu pháp lý chuẩn xác. Nhập câu văn nói tự nhiên, AI sẽ tự động phân tích ngữ nghĩa và gợi ý biểu mẫu chính xác nhất.
          </p>
          <div className="relative max-w-2xl mx-auto">
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full h-14 pl-5 pr-14 border border-slate-300 rounded-2xl focus:border-green-600 focus:ring-4 focus:ring-green-100 bg-white text-slate-900 placeholder:text-slate-400 shadow-md outline-none transition-all text-base"
              placeholder="Nhập nhu cầu pháp lý của bạn, ví dụ: 'Tôi muốn ly hôn', 'hợp đồng thuê nhà'..."
            />
            <span className="material-symbols-outlined absolute right-4 top-4 text-slate-400 hover:text-green-600 cursor-pointer text-2xl">
              search
            </span>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-8">
        <div className="flex items-center gap-2 mb-6 border-b border-border-neutral pb-4">
          <span className="material-symbols-outlined text-text-secondary">auto_awesome</span>
          <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary">Kết quả gợi ý từ AI</h2>
          <span className="font-label-sm text-label-sm text-text-secondary ml-auto hidden md:block">
            {isLoading ? "Đang tìm kiếm..." : (debouncedSearchTerm ? `Tìm thấy ${displayForms.length} biểu mẫu` : "Nhập câu hỏi để tìm kiếm")}
          </span>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
          {/* Left Column: AI Match Cards */}
          <div className="lg:col-span-8 space-y-6">
            {!debouncedSearchTerm && (
              <div className="text-center py-12 text-text-secondary">
                <span className="material-symbols-outlined text-6xl opacity-20 mb-4 block">search</span>
                Hãy mô tả nhu cầu của bạn, AI sẽ tự động hiểu và tìm biểu mẫu chuẩn xác nhất.
              </div>
            )}
            
            {isLoading && (
              <div className="text-center py-12 text-primary font-bold">
                Đang tìm kiếm bằng AI Vector...
              </div>
            )}

            {displayForms.map((form) => {
              const matchPercent = form.matchPercent !== undefined 
                ? form.matchPercent 
                : (form.score !== undefined ? Math.min(99, Math.max(15, Math.round(form.score * 100))) : 80);

              // Pure Green -> Lime -> Yellow -> Orange -> Red color transition
              let badgeStyle = {
                badgeBg: "bg-green-100 text-green-800 border-green-300",
                barBg: "bg-green-600",
                label: "Rất phù hợp",
                icon: "check_circle"
              };

              if (matchPercent >= 75) {
                // Xanh lá cây đậm tươi (Green)
                badgeStyle = {
                  badgeBg: "bg-green-100 text-green-800 border-green-300",
                  barBg: "bg-green-600",
                  label: "Rất phù hợp",
                  icon: "check_circle"
                };
              } else if (matchPercent >= 60) {
                // Xanh lá cây nhạt / nõn chuối (Lime)
                badgeStyle = {
                  badgeBg: "bg-lime-100 text-lime-800 border-lime-300",
                  barBg: "bg-lime-500",
                  label: "Phù hợp",
                  icon: "auto_awesome"
                };
              } else if (matchPercent >= 45) {
                // Vàng tươi (Yellow)
                badgeStyle = {
                  badgeBg: "bg-yellow-100 text-yellow-800 border-yellow-300",
                  barBg: "bg-yellow-500",
                  label: "Tương đối",
                  icon: "help"
                };
              } else if (matchPercent >= 30) {
                // Màu cam (Orange)
                badgeStyle = {
                  badgeBg: "bg-orange-100 text-orange-800 border-orange-300",
                  barBg: "bg-orange-500",
                  label: "Ít phù hợp",
                  icon: "error_outline"
                };
              } else {
                // Màu đỏ tươi (Red)
                badgeStyle = {
                  badgeBg: "bg-red-100 text-red-800 border-red-300",
                  barBg: "bg-red-600",
                  label: "Khớp thấp",
                  icon: "cancel"
                };
              }
              
              return (
                <div key={form.id} className="bg-white border border-slate-200 hover:border-green-600 transition-all p-6 rounded-xl flex flex-col md:flex-row gap-6 shadow-sm hover:shadow-md relative overflow-hidden">
                  {/* Top indicator bar with exact color */}
                  <div className={`absolute top-0 left-0 right-0 h-1.5 ${badgeStyle.barBg}`} />

                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-3">
                      <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full border ${badgeStyle.badgeBg}`}>
                        <span className="material-symbols-outlined text-[16px]">{badgeStyle.icon}</span>
                        {matchPercent}% phù hợp • {badgeStyle.label}
                      </span>
                      {form.category && (
                        <span className="bg-slate-100 text-slate-700 text-xs font-medium px-2.5 py-0.5 rounded-md border border-slate-200">
                          {form.category}
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 leading-snug">{form.title}</h3>
                    <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed">
                      {form.description || form.content || "Không có mô tả chi tiết"}
                    </p>
                    <div className="flex items-center gap-3 mt-4 pt-2">
                      <button 
                        onClick={() => handleDownloadClick(form)}
                        className="bg-emerald-600 text-white hover:bg-emerald-700 h-10 px-5 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 shadow-xs cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[18px]">download</span> Tải xuống (.doc)
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Right Sidebar: Quick Actions */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Dịch Vụ Liên Quan</h3>
              <div className="space-y-3">
                <Link href="/ai-chatbot" className="flex items-center gap-3 p-3.5 bg-slate-50 border border-slate-200 rounded-lg hover:border-amber-500 hover:bg-amber-50/30 transition-all">
                  <span className="material-symbols-outlined text-amber-800">smart_toy</span>
                  <div>
                    <div className="text-sm font-semibold text-slate-900">Trợ Lý Luật Sư AI</div>
                    <div className="text-xs text-slate-500 mt-0.5">Tư vấn pháp lý tự động 24/7</div>
                  </div>
                </Link>
                <Link href="/court-fee-calculator" className="flex items-center gap-3 p-3.5 bg-slate-50 border border-slate-200 rounded-lg hover:border-emerald-500 hover:bg-emerald-50/30 transition-all">
                  <span className="material-symbols-outlined text-emerald-600">account_balance_wallet</span>
                  <div>
                    <div className="text-sm font-semibold text-slate-900">Tính Án Phí</div>
                    <div className="text-xs text-slate-500 mt-0.5">Công cụ tính toán án phí</div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
