"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { chatbotService, ChatMessageResponse, LawyerInfo, SuggestedForm, QuickAction } from "@/services/chatbot.service";
import MindmapVisual, { extractMindmapAndCleanText } from "@/components/common/MindmapVisual";
import { useSearchParams } from "next/navigation";

type Message = {
  id: number;
  sender: "user" | "ai";
  text: string;
  lawyer?: LawyerInfo;
  suggestedForms?: SuggestedForm[];
  quickActions?: QuickAction[];
};

const INITIAL_MESSAGE: Message = {
  id: 1,
  sender: "ai",
  text: `Xin chào! Tôi là Trợ lý Pháp lý AI của **Công ty Luật TNHH Đức Tín và Cộng sự**.

Tôi có thể hỗ trợ giải đáp nhanh theo **quy định pháp luật hiện hành năm 2026** về:
- **Đất đai & Bất động sản:** Cấp sổ đỏ, chuyển nhượng, tặng cho, tranh chấp ranh giới.
- **Hôn nhân & Gia đình:** Ly hôn đơn phương/thuận tình, quyền nuôi con, phân chia tài sản.
- **Doanh nghiệp & Hợp đồng:** Thành lập công ty, hợp đồng kinh tế, tranh chấp nợ.
- **Giao thông, Lao động & Dân sự:** Xử phạt vi phạm, hợp đồng lao động, bồi thường thiệt hại.

Bạn đang có thắc mắc hoặc cần tư vấn về vấn đề gì, hãy nhập câu hỏi bên dưới nhé!`,
  quickActions: [
    { label: "Vạch mắt võng giao thông", action: "Tôi muốn biết ở một tuyến đường có vạch mắt võng nhưng không có đèn xanh thì tôi có được phép rẽ theo vạch mắt võng đó không", icon: "traffic", type: "prompt" },
    { label: "Thủ tục ly hôn đơn phương", action: "Tôi muốn tư vấn thủ tục ly hôn đơn phương và giành quyền nuôi con", icon: "family_restroom", type: "prompt" },
    { label: "Cấp sổ đỏ lần đầu", action: "Điều kiện và thủ tục cấp giấy chứng nhận quyền sử dụng đất lần đầu năm 2026", icon: "real_estate_agent", type: "prompt" },
    { label: "Gọi Hotline Ls. Tín", action: "tel:0937863263", icon: "call", type: "call" }
  ]
};

function AIChatbotContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q");
  const hasAutoSent = useRef(false);

  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId, setSessionId] = useState<number | undefined>(undefined);
  const chatFeedRef = useRef<HTMLDivElement>(null);

  // Consultation popup state
  const [showConsultModal, setShowConsultModal] = useState(false);
  const [consultForm, setConsultForm] = useState({ name: "", phone: "", message: "" });
  const [consultSubmitted, setConsultSubmitted] = useState(false);

  const scrollToBottom = () => {
    if (chatFeedRef.current) {
      chatFeedRef.current.scrollTo({
        top: chatFeedRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const sendQuery = async (queryText: string) => {
    if (!queryText.trim() || isTyping) return;

    const userMessage: Message = { id: Date.now(), sender: "user", text: queryText.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const res: ChatMessageResponse = await chatbotService.sendMessage({
        message: queryText.trim(),
        sessionId: sessionId
      });

      if (res.sessionId) {
        setSessionId(res.sessionId);
      }

      const aiMessage: Message = {
        id: Date.now() + 1,
        sender: "ai",
        text: res.reply,
        lawyer: res.lawyer,
        suggestedForms: res.suggestedForms,
        quickActions: res.quickActions
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Chat error:", error);
      const fallbackMessage: Message = {
        id: Date.now() + 1,
        sender: "ai",
        text: "Chào bạn, hệ thống AI đang xử lý nhiều lượt tư vấn cùng lúc. Để được tư vấn trực tiếp và bảo vệ quyền lợi tối ưu, bạn vui lòng liên hệ ngay với **Luật sư Phan Đức Tín** qua Hotline/Zalo: **093 786 32 63**.",
        quickActions: [
          { label: "Gọi Hotline Ls. Tín", action: "tel:0937863263", icon: "call", type: "call" },
          { label: "Chat Zalo Luật sư", action: "https://zalo.me/0937863263", icon: "chat", type: "zalo" }
        ]
      };
      setMessages((prev) => [...prev, fallbackMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  useEffect(() => {
    if (initialQuery && !hasAutoSent.current) {
      hasAutoSent.current = true;
      sendQuery(initialQuery);
    }
  }, [initialQuery]);

  const handleSend = () => {
    sendQuery(input);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleQuickAction = (action: QuickAction) => {
    if (action.type === "prompt") {
      sendQuery(action.action);
    } else if (action.type === "appointment") {
      setShowConsultModal(true);
    } else if (action.action.startsWith("tel:") || action.action.startsWith("http")) {
      window.open(action.action, "_blank");
    }
  };

  const handleConsultSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setConsultSubmitted(true);
    setTimeout(() => {
      alert(`Cảm ơn ${consultForm.name}! Yêu cầu tư vấn của bạn đã được chuyển tới Luật sư Phan Đức Tín. Chúng tôi sẽ liên hệ số ${consultForm.phone} trong ít phút.`);
      setConsultForm({ name: "", phone: "", message: "" });
      setConsultSubmitted(false);
      setShowConsultModal(false);
    }, 400);
  };

  const clearChat = () => {
    setMessages([INITIAL_MESSAGE]);
    setSessionId(undefined);
  };

  return (
    <main className="pt-2 pb-6 min-h-[calc(100vh-80px)] bg-slate-50 relative flex flex-col justify-between">
      
      {/* Consultation Modal */}
      {showConsultModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white p-6 md:p-8 rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 relative">
            <button 
              onClick={() => setShowConsultModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 material-symbols-outlined cursor-pointer"
            >
              close
            </button>
            <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-xl flex items-center justify-center mb-3">
              <span className="material-symbols-outlined text-2xl">calendar_month</span>
            </div>
            <h2 className="text-lg font-bold text-slate-900 mb-1">Đặt Lịch Tư Vấn Với Luật Sư</h2>
            <p className="text-xs text-slate-600 mb-5 leading-relaxed">
              Luật sư <strong>Phan Đức Tín</strong> (Giám đốc Điều hành) sẽ trực tiếp liên hệ thẩm định hồ sơ cho bạn.
            </p>
            <form onSubmit={handleConsultSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Họ và tên</label>
                <input 
                  required
                  type="text" 
                  value={consultForm.name}
                  onChange={e => setConsultForm({...consultForm, name: e.target.value})}
                  className="w-full h-10 px-3 border border-slate-300 rounded-lg text-xs outline-none focus:border-emerald-600 bg-white" 
                  placeholder="Ví dụ: Nguyễn Văn A"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Số điện thoại</label>
                <input 
                  required
                  type="tel" 
                  value={consultForm.phone}
                  onChange={e => setConsultForm({...consultForm, phone: e.target.value})}
                  className="w-full h-10 px-3 border border-slate-300 rounded-lg text-xs outline-none focus:border-emerald-600 bg-white" 
                  placeholder="Ví dụ: 0912345678"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Nội dung tóm tắt</label>
                <textarea 
                  rows={2}
                  value={consultForm.message}
                  onChange={e => setConsultForm({...consultForm, message: e.target.value})}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs outline-none focus:border-emerald-600 bg-white resize-none" 
                  placeholder="Mô tả ngắn vụ việc cần tư vấn..."
                />
              </div>
              <button 
                type="submit"
                disabled={consultSubmitted}
                className="w-full h-11 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl mt-3 text-xs transition-colors cursor-pointer shadow-xs"
              >
                {consultSubmitted ? "Đang gửi..." : "Xác Nhận Đặt Hẹn"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Main Expansive 2-Column Interface (Spacious Width) */}
      <div className="max-w-[1728px] w-full mx-auto px-2 sm:px-4 md:px-6 flex-1 flex flex-col">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 flex-1 items-stretch">
          
          {/* ===== LEFT SIDEBAR: Lawyer Card & Quick Shortcuts ===== */}
          <aside className="lg:col-span-3 xl:col-span-3 flex flex-col gap-4">
            {/* Lawyer Profile Card */}
            <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm text-center">
              <div className="w-20 h-20 bg-emerald-100 rounded-2xl mx-auto mb-3 overflow-hidden relative border border-emerald-200 shadow-2xs">
                <Image 
                  src="/img/avatar1.png" 
                  alt="Luật sư Phan Đức Tín" 
                  fill 
                  className="object-cover" 
                />
              </div>
              <h2 className="text-base font-bold text-slate-900">Ls. PHAN ĐỨC TÍN</h2>
              <p className="text-xs font-semibold text-emerald-700 uppercase mt-0.5">Luật sư Trưởng - Giám đốc Điều hành</p>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed text-justify">
                Hơn 15 năm kinh nghiệm tranh tụng tại Tòa án và tư vấn pháp lý chuyên sâu về Đất đai, Hôn nhân gia đình, Doanh nghiệp &amp; Hình sự.
              </p>

              <div className="mt-4 pt-3 border-t border-slate-100 space-y-2">
                <a
                  href="tel:0937863263"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white h-9 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                >
                  <span className="material-symbols-outlined text-base">call</span>
                  Hotline: 093 786 32 63
                </a>
                <a
                  href="https://zalo.me/0937863263"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white h-9 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                >
                  <span className="material-symbols-outlined text-base">chat</span>
                  Chat Zalo Trực Tiếp
                </a>
                <button
                  onClick={() => setShowConsultModal(true)}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white h-9 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-base">calendar_month</span>
                  Đặt Lịch Tư Vấn 1:1
                </button>
              </div>
            </div>

            {/* Quick Suggested Topics */}
            <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-sm flex-1">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-emerald-600 text-base">saved_search</span>
                Chủ Đề Phổ Biến
              </h3>
              <div className="flex flex-col gap-1.5">
                {[
                  { label: "Vạch mắt võng có được rẽ không?", query: "Tôi muốn biết ở một tuyến đường có vạch mắt võng nhưng không có đèn xanh thì tôi có được phép rẽ theo vạch mắt võng đó không" },
                  { label: "Thủ tục ly hôn đơn phương", query: "Tư vấn thủ tục ly hôn đơn phương và giành quyền nuôi con" },
                  { label: "Tranh chấp đất đai & sổ đỏ", query: "Tư vấn tranh chấp ranh giới đất đai và thủ tục cấp sổ đỏ lần đầu năm 2026" },
                  { label: "Thành lập công ty TNHH", query: "Tư vấn thủ tục thành lập công ty TNHH và các bước kê khai thuế ban đầu" },
                  { label: "Thủ tục lập di chúc hợp pháp", query: "Tư vấn thủ tục lập di chúc hợp pháp và khai nhận di sản thừa kế" }
                ].map((item, idx) => (
                  <button 
                    key={idx}
                    onClick={() => sendQuery(item.query)}
                    className="text-left text-xs font-medium text-slate-700 hover:text-emerald-700 bg-slate-50 hover:bg-emerald-50/60 p-2 rounded-xl border border-slate-100 hover:border-emerald-300 transition-all flex items-center justify-between group cursor-pointer"
                  >
                    <span className="truncate pr-1">{item.label}</span>
                    <span className="material-symbols-outlined text-slate-400 group-hover:text-emerald-600 text-xs">arrow_forward</span>
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* ===== CENTER EXPANDED CHAT PANEL (Spans 9 Columns) ===== */}
          <div className="lg:col-span-9 flex flex-col bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden h-[calc(100vh-120px)] min-h-[640px]">
            
            {/* Chat Bar Header */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-slate-200 bg-slate-50/90">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                  <span className="material-symbols-outlined text-xl">balance</span>
                </div>
                <div>
                  <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    Trợ Lý AI Luật Đức Tín
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                      Pháp Luật Hiện Hành 2026
                    </span>
                  </h2>
                  <p className="text-[11px] text-slate-500">
                    Phản hồi trực tiếp, ngắn gọn • Kết nối trực tiếp Ls. Phan Đức Tín (093 786 32 63)
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={clearChat}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-rose-600 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 transition-colors cursor-pointer" 
                  title="Bắt đầu hội thoại mới"
                >
                  <span className="material-symbols-outlined text-sm">add</span>
                  Hội thoại mới
                </button>
              </div>
            </div>

            {/* Chat Feed */}
            <div ref={chatFeedRef} className="flex-1 overflow-y-auto p-5 md:p-6 space-y-6">
              {messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex gap-3 w-full page-fade-in ${msg.sender === "user" ? "self-end flex-row-reverse ml-auto max-w-[80%]" : "max-w-full"}`}
                >
                  {/* Avatar */}
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold ${
                    msg.sender === "user" 
                      ? "bg-slate-800 text-white shadow-xs" 
                      : "bg-emerald-600 text-white shadow-xs"
                  }`}>
                    <span className="material-symbols-outlined text-base">
                      {msg.sender === "user" ? "person" : "balance"}
                    </span>
                  </div>
                  
                  {/* Bubble Content */}
                  <div className={`flex flex-col gap-1.5 ${msg.sender === "user" ? "items-end" : "flex-1 min-w-0"}`}>
                    <span className="text-[11px] font-semibold text-slate-400">
                      {msg.sender === "user" ? "Bạn" : "Trợ Lý AI"}
                    </span>
                    
                    <div className={`p-4 md:p-5 rounded-2xl text-sm leading-relaxed ${
                      msg.sender === "user" 
                        ? "bg-emerald-600 text-white rounded-tr-none shadow-sm" 
                        : "bg-slate-50 border border-slate-200 text-slate-800 rounded-tl-none shadow-2xs prose prose-sm max-w-none prose-slate"
                    }`}>
                      {msg.sender === "user" ? (
                        <p className="whitespace-pre-wrap">{msg.text}</p>
                      ) : (() => {
                        const { cleanText } = extractMindmapAndCleanText(msg.text);
                        return (
                          <div className="space-y-3">
                            <ReactMarkdown 
                              remarkPlugins={[remarkGfm]}
                              components={{
                                strong: ({ children }) => <strong className="font-bold text-slate-900">{children}</strong>,
                                p: ({ children }) => <p className="mb-2.5 last:mb-0 leading-relaxed text-slate-800">{children}</p>,
                                ul: ({ children }) => <ul className="list-disc pl-5 mb-2.5 space-y-1 text-slate-800">{children}</ul>,
                                ol: ({ children }) => <ol className="list-decimal pl-5 mb-2.5 space-y-1 text-slate-800">{children}</ol>,
                                li: ({ children }) => <li className="leading-relaxed">{children}</li>,
                              }}
                            >
                              {cleanText}
                            </ReactMarkdown>

                            {/* Seamless Connected Mindmap Visualization */}
                            <MindmapVisual rawText={msg.text} />
                          </div>
                        );
                      })()}

                      {/* Suggested Forms Card (if any) */}
                      {msg.suggestedForms && msg.suggestedForms.length > 0 && (
                        <div className="mt-4 pt-3 border-t border-slate-200 space-y-2">
                          <p className="text-xs font-bold text-slate-700 flex items-center gap-1">
                            <span className="material-symbols-outlined text-sm text-emerald-600">download_for_offline</span>
                            Biểu mẫu tham khảo liên quan:
                          </p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {msg.suggestedForms.map((form) => (
                              <Link 
                                key={form.id} 
                                href={`http://localhost:3001${form.fileUrl}`}
                                target="_blank"
                                className="flex items-center justify-between p-2.5 bg-white border border-slate-200 rounded-xl hover:border-emerald-500 hover:bg-emerald-50/40 transition-all text-xs font-semibold text-slate-900 group"
                              >
                                <span className="line-clamp-1 flex items-center gap-1.5">
                                  <span className="material-symbols-outlined text-emerald-600 text-sm">description</span>
                                  {form.title}
                                </span>
                                <span className="material-symbols-outlined text-slate-400 group-hover:text-emerald-600 text-sm">download</span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Quick Actions (Call / Zalo / Booking) */}
                      {msg.quickActions && msg.quickActions.length > 0 && (
                        <div className="mt-4 pt-3 border-t border-slate-200 flex flex-wrap gap-2">
                          {msg.quickActions.map((action, idx) => (
                            <button
                              key={idx}
                              onClick={() => handleQuickAction(action)}
                              className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-emerald-50 hover:border-emerald-400 hover:text-emerald-700 text-slate-700 transition-all shadow-2xs cursor-pointer"
                            >
                              <span className="material-symbols-outlined text-[16px] text-emerald-600">{action.icon}</span>
                              {action.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-3 max-w-[85%] page-fade-in">
                  <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-base">balance</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[11px] font-semibold text-slate-400">Trợ Lý AI</span>
                    <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-2xl rounded-tl-none flex items-center gap-2">
                      <span className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce"></span>
                      <span className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                      <span className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                      <span className="text-xs text-slate-500 ml-2">Đang phân tích căn cứ pháp luật...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Chat Input Area */}
            <div className="border-t border-slate-200 bg-white p-3.5 md:p-4">
              <div className="flex items-end gap-2.5">
                <div className="flex-1 relative">
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="w-full border border-slate-300 rounded-xl px-4 py-3 bg-white text-slate-900 placeholder:text-slate-400 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 resize-none text-sm leading-relaxed"
                    placeholder="Nhập câu hỏi pháp lý của bạn tại đây (ví dụ: 'Vạch mắt võng có được rẽ không', 'Thủ tục ly hôn')..."
                    rows={1}
                    style={{ minHeight: "48px", maxHeight: "140px" }}
                  />
                </div>
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isTyping}
                  className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white h-12 w-12 rounded-xl flex items-center justify-center transition-colors shrink-0 cursor-pointer shadow-xs"
                  title="Gửi tin nhắn"
                >
                  <span className="material-symbols-outlined text-xl">send</span>
                </button>
              </div>
              <p className="text-[11px] text-slate-500 mt-2 text-center">
                * Trợ lý AI cung cấp thông tin tham khảo. Để bảo vệ quyền lợi hợp pháp tối đa, bạn nên liên hệ trực tiếp với Luật sư Phan Đức Tín.
              </p>
            </div>

          </div>

        </div>
      </div>
    </main>
  );
}

export default function AIChatbot() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
          <div className="flex flex-col items-center gap-3">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#641D06]"></div>
            <p className="text-sm font-semibold text-slate-600">Đang khởi tạo Trợ lý AI...</p>
          </div>
        </div>
      }
    >
      <AIChatbotContent />
    </Suspense>
  );
}

