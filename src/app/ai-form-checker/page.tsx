"use client";

import { useState } from "react";
import Link from "next/link";

export default function AIFormChecker() {
  const [analysisState, setAnalysisState] = useState<"idle" | "scanning" | "complete">("idle");
  const [activeTab, setActiveTab] = useState<"errors" | "guide">("errors");
  const [openItem, setOpenItem] = useState<number | null>(1);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setAnalysisState("scanning");
      // Simulate AI analysis taking 3 seconds
      setTimeout(() => {
        setAnalysisState("complete");
      }, 3000);
    }
  };

  const toggleItem = (id: number) => {
    setOpenItem(openItem === id ? null : id);
  };

  return (
    <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pt-32 pb-8 page-fade-in flex-grow w-full min-h-screen">
      {/* HEADER AREA */}
      <header className="mb-10 border-b border-border-neutral pb-stack-md text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-3 uppercase tracking-wider">
          <span className="material-symbols-outlined text-[16px]">document_scanner</span>
          Trí tuệ nhân tạo kiểm tra pháp lý
        </div>
        <h1 className="text-3xl md:text-5xl font-black text-slate-900 font-sans leading-tight tracking-tight uppercase mb-3">
          AI Thẩm Định & Hướng Dẫn Điền Biểu Mẫu
        </h1>
        <div className="text-amber-600 flex items-center justify-center my-3">
          <span className="tracking-widest font-bold text-lg">— ⚖️ —</span>
        </div>
        <p className="text-slate-600 font-body-md text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          Tải lên bản chụp/PDF biểu mẫu của bạn. Trợ lý AI sẽ rà soát lỗi sai hoặc hướng dẫn điền từng mục chuẩn pháp lý.
        </p>
      </header>

      {/* SPLIT-SCREEN DASHBOARD */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter mb-24">
        {/* LEFT PANEL (Upload & Preview) */}
        <div className="flex flex-col h-[600px] border border-border-neutral rounded-lg bg-white shadow-sm overflow-hidden">
          {/* Initial Upload State */}
          {analysisState === "idle" && (
            <label className="flex-grow flex flex-col items-center justify-center p-8 cursor-pointer hover:bg-gray-50 m-4 border-2 border-dashed border-accent rounded-lg transition-colors">
              <span className="material-symbols-outlined text-6xl text-accent mb-4">upload_file</span>
              <p className="font-headline-md text-headline-md text-primary text-center mb-2">
                Kéo thả file PDF/Hình ảnh hoặc bấm để tải lên
              </p>
              <p className="font-label-sm text-label-sm text-text-secondary text-center">
                (Tối đa 10MB)
              </p>
              <input type="file" className="hidden" accept="image/*,.pdf" onChange={handleFileUpload} />
            </label>
          )}

          {/* Preview State */}
          {analysisState !== "idle" && (
            <div className="flex-grow relative bg-gray-100 overflow-hidden page-fade-in">
              <div className="absolute inset-0 p-4 flex items-center justify-center">
                {/* Mock document image */}
                <div
                  className="w-full h-full bg-white shadow-sm p-8 border border-border-neutral relative max-w-md mx-auto"
                  style={{
                    backgroundImage: "repeating-linear-gradient(transparent, transparent 31px, #e5e5e5 31px, #e5e5e5 32px)",
                    backgroundPosition: "0 40px"
                  }}
                >
                  <h2 className="text-center font-bold text-lg mb-8 uppercase text-primary border-b border-primary pb-2">Đơn Xin Ly Hôn Đơn Phương</h2>
                  <div className="space-y-6">
                    <div>
                      <label className="font-bold text-sm">Kính gửi:</label>
                      <p className="border-b border-dotted border-gray-400 pb-1 text-sm mt-1">Tòa án nhân dân Quận 1, TPHCM</p>
                    </div>
                    <div>
                      <label className="font-bold text-sm">Họ và tên người khởi kiện:</label>
                      <p className={`border-b border-dotted border-gray-400 pb-1 text-sm mt-1 relative cursor-help ${analysisState === 'complete' ? 'text-red-600 bg-red-50' : ''}`}>
                        Nguyễn Văn A
                        {analysisState === 'complete' && <span className="absolute top-0 right-0 w-3 h-3 bg-accent rounded-full animate-ping"></span>}
                      </p>
                    </div>
                    <div>
                      <label className="font-bold text-sm">Lý do ly hôn:</label>
                      <p className={`border-b border-dotted border-gray-400 pb-1 text-sm mt-1 min-h-[40px] relative cursor-help ${analysisState === 'complete' ? 'text-red-600 bg-red-50' : ''}`}>
                        Không hợp nhau
                        {analysisState === 'complete' && <span className="absolute top-2 right-2 w-3 h-3 bg-accent rounded-full animate-ping"></span>}
                      </p>
                    </div>
                    <div>
                      <label className="font-bold text-sm">Tài sản chung:</label>
                      <p className={`border-b border-dotted border-gray-400 pb-1 text-sm mt-1 relative cursor-help ${analysisState === 'complete' ? 'text-red-600 bg-red-50' : ''}`}>
                        Có một căn nhà
                        {analysisState === 'complete' && <span className="absolute top-1 right-1 w-3 h-3 bg-accent rounded-full animate-ping"></span>}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Laser scanning effect */}
              {analysisState === "scanning" && (
                <div className="absolute inset-0 bg-blue-500/10 z-10 pointer-events-none">
                  <div className="w-full h-1 bg-accent absolute top-0 left-0 shadow-[0_0_15px_5px_rgba(192,150,59,0.5)] animate-scan"></div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* RIGHT PANEL (AI Analysis & Feedback) */}
        <div className="flex flex-col h-[600px] bg-white border border-border-neutral rounded-lg shadow-sm overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-border-neutral">
            <button
              onClick={() => setActiveTab("errors")}
              className={`flex-1 py-4 font-headline-md text-headline-md transition-colors flex justify-center items-center gap-2 ${activeTab === 'errors' ? 'text-primary border-b-2 border-accent bg-surface-alt' : 'text-text-secondary border-b-2 border-transparent hover:text-primary opacity-60'}`}
            >
              <span className="material-symbols-outlined">search</span> Kết quả rà soát lỗi
            </button>
            <button
              onClick={() => setActiveTab("guide")}
              className={`flex-1 py-4 font-headline-md text-headline-md transition-colors flex justify-center items-center gap-2 ${activeTab === 'guide' ? 'text-primary border-b-2 border-accent bg-surface-alt' : 'text-text-secondary border-b-2 border-transparent hover:text-primary opacity-60'}`}
            >
              <span className="material-symbols-outlined">lightbulb</span> Hướng dẫn điền
            </button>
          </div>

          {/* Content Area */}
          <div className="flex-grow overflow-y-auto p-6 bg-surface-main relative">
            {/* State: Waiting for upload */}
            {analysisState === "idle" && (
              <div className="h-full flex flex-col items-center justify-center text-center opacity-50 page-fade-in">
                <span className="material-symbols-outlined text-6xl text-text-secondary mb-4">analytics</span>
                <p className="font-body-md">Vui lòng tải lên biểu mẫu để AI bắt đầu thẩm định.</p>
              </div>
            )}

            {/* State: Scanning */}
            {analysisState === "scanning" && (
              <div className="h-full flex flex-col items-center justify-center text-center page-fade-in">
                <div className="w-16 h-16 border-4 border-surface-alt border-t-accent rounded-full animate-spin mb-4"></div>
                <p className="font-headline-md text-primary mb-2 animate-pulse">AI đang phân tích tài liệu...</p>
                <p className="font-body-md text-text-secondary text-sm">Đang trích xuất văn bản và đối chiếu cơ sở pháp lý</p>
              </div>
            )}

            {/* State: Analysis Complete */}
            {analysisState === "complete" && activeTab === "errors" && (
              <div className="space-y-6 page-fade-in">
                <div className="inline-flex items-center gap-2 bg-yellow-50 border border-accent text-primary px-4 py-2 rounded-full font-label-sm">
                  <span className="w-3 h-3 rounded-full bg-accent"></span>
                  Phát hiện 3 điểm cần lưu ý
                </div>

                {/* Feedback Accordion */}
                <div className="space-y-3">
                  {/* Item 1 */}
                  <div className="border border-border-neutral rounded bg-white overflow-hidden shadow-sm">
                    <button
                      onClick={() => toggleItem(1)}
                      className="w-full px-4 py-3 flex justify-between items-center bg-white hover:bg-gray-50 transition-colors text-left"
                    >
                      <span className="font-headline-md text-base text-primary flex items-center gap-2">
                        <span className="material-symbols-outlined text-error text-lg">error</span>
                        Mục 'Lý do ly hôn': Trình bày quá chung chung
                      </span>
                      <span className={`material-symbols-outlined text-text-secondary transition-transform ${openItem === 1 ? 'rotate-180' : ''}`}>expand_more</span>
                    </button>
                    {openItem === 1 && (
                      <div className="px-4 pb-4 pt-2 border-t border-border-neutral bg-red-50/30 page-fade-in">
                        <p className="font-body-md text-sm text-text-secondary mb-3">
                          Bạn viết: <em>"Không hợp nhau"</em>. Tòa án thường yêu cầu lý do cụ thể và có căn cứ pháp lý hơn (ví dụ: bạo lực gia đình, vi phạm nghiêm trọng quyền và nghĩa vụ vợ chồng).
                        </p>
                        <div className="bg-white border border-accent rounded p-3 relative mt-4">
                          <span className="absolute -top-3 left-3 bg-accent text-white text-xs px-2 py-0.5 rounded font-bold">AI GỢI Ý</span>
                          <p className="text-sm font-medium text-primary mt-1">
                            "Mục đích hôn nhân không đạt được do bất đồng quan điểm sống trầm trọng kéo dài, vi phạm nghiêm trọng quyền và nghĩa vụ của vợ chồng làm cho hôn nhân lâm vào tình trạng trầm trọng..."
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                  {/* Item 2 */}
                  <div className="border border-border-neutral rounded bg-white overflow-hidden shadow-sm">
                    <button
                      onClick={() => toggleItem(2)}
                      className="w-full px-4 py-3 flex justify-between items-center bg-white hover:bg-gray-50 transition-colors text-left"
                    >
                      <span className="font-headline-md text-base text-primary flex items-center gap-2">
                        <span className="material-symbols-outlined text-accent text-lg">warning</span>
                        Mục 'Tài sản chung': Thiếu thông tin giấy tờ
                      </span>
                      <span className={`material-symbols-outlined text-text-secondary transition-transform ${openItem === 2 ? 'rotate-180' : ''}`}>expand_more</span>
                    </button>
                    {openItem === 2 && (
                      <div className="px-4 pb-4 pt-2 border-t border-border-neutral bg-yellow-50/30 page-fade-in">
                        <p className="font-body-md text-sm text-text-secondary mb-3">
                          Trường hợp có tài sản là bất động sản, bạn cần ghi rõ số Giấy chứng nhận QSDĐ, ngày cấp, nơi cấp.
                        </p>
                        <div className="bg-white border border-accent rounded p-3 relative mt-4">
                          <span className="absolute -top-3 left-3 bg-accent text-white text-xs px-2 py-0.5 rounded font-bold">AI GỢI Ý</span>
                          <p className="text-sm font-medium text-primary mt-1">
                            "01 căn nhà tại địa chỉ X theo Giấy chứng nhận quyền sử dụng đất số Y, cấp ngày Z bởi cơ quan W..."
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Item 3 */}
                  <div className="border border-border-neutral rounded bg-white overflow-hidden shadow-sm">
                    <button
                      onClick={() => toggleItem(3)}
                      className="w-full px-4 py-3 flex justify-between items-center bg-white hover:bg-gray-50 transition-colors text-left"
                    >
                      <span className="font-headline-md text-base text-primary flex items-center gap-2">
                        <span className="material-symbols-outlined text-accent text-lg">warning</span>
                        Mục 'Họ tên người khởi kiện': Thiếu số CCCD
                      </span>
                      <span className={`material-symbols-outlined text-text-secondary transition-transform ${openItem === 3 ? 'rotate-180' : ''}`}>expand_more</span>
                    </button>
                    {openItem === 3 && (
                      <div className="px-4 pb-4 pt-2 border-t border-border-neutral bg-yellow-50/30 page-fade-in">
                        <p className="font-body-md text-sm text-text-secondary">
                          Họ tên cần đính kèm số CCCD/CMND để tòa án dễ dàng định danh. Vui lòng bổ sung.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* State: Guide Tab */}
            {analysisState === "complete" && activeTab === "guide" && (
              <div className="h-full flex flex-col items-center justify-center text-center opacity-70 page-fade-in">
                <span className="material-symbols-outlined text-6xl text-text-secondary mb-4">school</span>
                <h3 className="font-headline-md text-primary mb-2">Chưa có hướng dẫn</h3>
                <p className="font-body-md text-sm">Tính năng hướng dẫn điền đang được phát triển thêm cho loại đơn này.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* BOTTOM STICKY ACTION BAR */}
      <div className="fixed bottom-0 left-0 w-full bg-surface-main border-t-2 border-accent shadow-[0_-10px_30px_rgba(100,29,6,0.1)] z-[40] py-4">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-accent text-2xl">info</span>
            <p className="font-body-md text-sm text-text-secondary max-w-2xl">
              Đánh giá của AI mang tính tham khảo. Khuyến nghị Luật sư soát xét lần cuối trước khi nộp cơ quan chức năng để đảm bảo hồ sơ hợp lệ 100%.
            </p>
          </div>
          <Link
            href="/appointment"
            className="shrink-0 bg-accent text-on-accent px-8 py-3 rounded-full font-label-sm font-bold shadow-elegant hover:opacity-90 transition-colors flex items-center gap-2"
          >
            <span className="material-symbols-outlined">support_agent</span>
            Chuyển Luật Sư Thẩm Định Lại (Phí: 500k)
          </Link>
        </div>
      </div>
    </main>
  );
}
