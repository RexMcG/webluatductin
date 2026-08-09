"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

type Message = {
  id: number;
  sender: "user" | "ai";
  text: string;
};

const RESPONSES = [
  'Cảm ơn bạn đã đặt câu hỏi. Theo quy định tại Bộ luật Dân sự 2015, vấn đề này cần được xem xét dựa trên các tình tiết cụ thể. Tôi khuyên bạn nên tham khảo ý kiến luật sư để được tư vấn chi tiết.',
  'Về vấn đề của bạn, căn cứ theo Luật Hôn nhân và Gia đình 2014, việc giải quyết sẽ phụ thuộc vào thỏa thuận giữa các bên. Trường hợp không thỏa thuận được, Tòa án sẽ quyết định dựa trên quy định pháp luật.',
  'Theo quy định hiện hành, thủ tục này bao gồm các bước: (1) Chuẩn bị hồ sơ, (2) Nộp tại cơ quan có thẩm quyền, (3) Xử lý hồ sơ, (4) Nhận kết quả. Thời gian xử lý thông thường từ 15-30 ngày làm việc.',
  'Đây là một vấn đề pháp lý phức tạp. Tôi khuyến nghị bạn nên tìm đến sự hỗ trợ của luật sư chuyên môn để được tư vấn chi tiết và bảo vệ quyền lợi tốt nhất. Bạn có muốn tôi kết nối bạn với luật sư chuyên về lĩnh vực này không?'
];

export default function AIChatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "ai",
      text: "Xin chào! Tôi là trợ lý pháp lý AI của **Công Ty Luật Đức Tín**. \n\nTôi có thể hỗ trợ bạn về các vấn đề pháp lý như:\n- Tư vấn thủ tục dân sự, hôn nhân gia đình\n- Thành lập doanh nghiệp và tư vấn đầu tư\n- Tranh chấp lao động, bảo hiểm xã hội\n- Pháp lý bất động sản và xây dựng\n- Các vấn đề hình sự và tố tụng\n\nHãy đặt câu hỏi cho tôi bên dưới nhé!",
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = { id: Date.now(), sender: "user", text: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const randomResponse = RESPONSES[Math.floor(Math.random() * RESPONSES.length)];
      const aiMessage: Message = { id: Date.now(), sender: "ai", text: randomResponse };
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 800 + Math.random() * 1200);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleConsultSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Yêu cầu của bạn đã được ghi nhận. Chúng tôi sẽ liên hệ trong thời gian sớm nhất.");
  };

  return (
    <main className="pt-32 pb-section-padding page-fade-in min-h-screen">
      {/* Page Header */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-stack-md">
          <div>
            <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary">
              Trợ Lý Pháp Lý AI
            </h1>
            <p className="font-body-md text-body-md text-text-secondary mt-2">
              Tư vấn pháp luật thông minh 24/7 - Hỗ trợ mọi lĩnh vực pháp lý
            </p>
          </div>
          <div className="flex items-center gap-stack-sm">
            <span className="inline-flex items-center gap-2 font-label-sm text-label-sm text-text-secondary bg-surface-alt border border-border-neutral px-4 py-2 rounded-full relative">
              <span className="w-2 h-2 bg-green-500 rounded-full inline-block animate-ping"></span>
              <span className="w-2 h-2 bg-green-500 rounded-full inline-block absolute left-4"></span>
              Đang hoạt động
            </span>
          </div>
        </div>
      </section>

      {/* 3-Column Chat Interface */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
          {/* ===== LEFT SIDEBAR: Topics & History ===== */}
          <aside className="lg:col-span-3 flex flex-col gap-stack-md">
            {/* Topics */}
            <div className="bg-surface-main border border-border-neutral p-4 shadow-sm rounded-lg">
              <h2 className="font-headline-md text-headline-md text-primary mb-stack-md flex items-center gap-2">
                <span className="material-symbols-outlined text-text-secondary">category</span>
                Chủ đề tư vấn
              </h2>
              <div className="flex flex-wrap gap-2">
                <button className="bg-accent text-on-accent px-4 py-2 rounded font-label-sm text-label-sm hover:opacity-90 transition-opacity">
                  Dân sự
                </button>
                <button className="bg-surface-alt border border-border-neutral text-text-secondary px-4 py-2 rounded font-label-sm text-label-sm hover:border-primary hover:text-primary transition-colors">
                  Hôn nhân &amp; Gia đình
                </button>
                <button className="bg-surface-alt border border-border-neutral text-text-secondary px-4 py-2 rounded font-label-sm text-label-sm hover:border-primary hover:text-primary transition-colors">
                  Doanh nghiệp
                </button>
                <button className="bg-surface-alt border border-border-neutral text-text-secondary px-4 py-2 rounded font-label-sm text-label-sm hover:border-primary hover:text-primary transition-colors">
                  Lao động
                </button>
              </div>
            </div>

            {/* Chat History */}
            <div className="bg-surface-main border border-border-neutral p-4 flex-1 shadow-sm rounded-lg">
              <h2 className="font-headline-md text-headline-md text-primary mb-stack-md flex items-center gap-2">
                <span className="material-symbols-outlined text-text-secondary">history</span>
                Lịch sử
              </h2>
              <div className="flex flex-col gap-2">
                <button className="flex items-center gap-3 p-3 bg-surface-alt border border-border-neutral hover:border-primary transition-colors group rounded w-full text-left">
                  <span className="material-symbols-outlined text-text-secondary group-hover:text-primary transition-colors">forum</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-label-sm text-label-sm text-text-primary truncate">Tư vấn thủ tục ly hôn</p>
                    <p className="font-body-md text-body-md text-text-secondary text-xs">Hôm qua, 14:30</p>
                  </div>
                </button>
                <button className="flex items-center gap-3 p-3 hover:bg-surface-alt border border-transparent hover:border-border-neutral transition-all group rounded w-full text-left">
                  <span className="material-symbols-outlined text-text-secondary group-hover:text-primary transition-colors">forum</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-label-sm text-label-sm text-text-primary truncate">Thủ tục thành lập công ty</p>
                    <p className="font-body-md text-body-md text-text-secondary text-xs">2 ngày trước</p>
                  </div>
                </button>
                <button className="mt-4 w-full bg-surface-alt border border-border-neutral text-text-secondary h-10 rounded font-label-sm text-label-sm hover:bg-surface-main hover:text-primary transition-colors flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined text-[20px]">add</span>
                  Cuộc trò chuyện mới
                </button>
              </div>
            </div>
          </aside>

          {/* ===== CENTER CHAT PANEL ===== */}
          <div className="lg:col-span-6 flex flex-col bg-surface-main border border-border-neutral h-[600px] lg:h-[680px] shadow-sm rounded-lg overflow-hidden">
            {/* Chat Header */}
            <div className="flex items-center justify-between px-4 lg:px-6 py-4 border-b border-border-neutral bg-surface-alt">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center border border-primary">
                  <span className="material-symbols-outlined">balance</span>
                </div>
                <div>
                  <h3 className="font-label-sm text-label-sm text-text-primary">Trợ Lý Pháp Lý AI</h3>
                  <p className="font-body-md text-body-md text-text-secondary text-xs flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full inline-block"></span>
                    Trực tuyến
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="material-symbols-outlined text-text-secondary hover:text-primary transition-colors cursor-pointer" title="Xóa hội thoại">
                  delete
                </button>
                <button className="material-symbols-outlined text-text-secondary hover:text-primary transition-colors cursor-pointer" title="Tải xuống">
                  download
                </button>
              </div>
            </div>

            {/* Chat Feed */}
            <div className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-6">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex gap-4 max-w-[85%] page-fade-in ${msg.sender === "user" ? "self-end flex-row-reverse ml-auto" : ""}`}>
                  {/* Avatar */}
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border ${msg.sender === "user" ? "border-border-neutral bg-surface-main" : "bg-primary text-on-primary border-primary"}`}>
                    <span className="material-symbols-outlined">
                      {msg.sender === "user" ? "person" : "balance"}
                    </span>
                  </div>
                  
                  {/* Bubble */}
                  <div className={`flex flex-col gap-1 ${msg.sender === "user" ? "items-end" : ""}`}>
                    <span className="font-label-sm text-label-sm text-text-secondary">
                      {msg.sender === "user" ? "Bạn" : "Trợ Lý AI"}
                    </span>
                    <div className={`p-4 rounded-lg font-body-md text-body-md leading-relaxed ${
                      msg.sender === "user" 
                        ? "bg-primary text-on-primary border border-primary rounded-tr-none" 
                        : "bg-surface-alt border border-border-neutral text-text-primary rounded-tl-none whitespace-pre-wrap"
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-4 max-w-[85%] page-fade-in">
                  <div className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center shrink-0 border border-primary">
                    <span className="material-symbols-outlined">balance</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="font-label-sm text-label-sm text-text-secondary">Trợ Lý AI</span>
                    <div className="bg-surface-alt border border-border-neutral p-4 rounded-lg rounded-tl-none flex items-center gap-1">
                      <span className="w-2 h-2 bg-text-secondary rounded-full animate-bounce"></span>
                      <span className="w-2 h-2 bg-text-secondary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                      <span className="w-2 h-2 bg-text-secondary rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Chat Input Area */}
            <div className="border-t border-border-neutral bg-surface-alt px-4 lg:px-6 py-4">
              <div className="flex items-end gap-3">
                <div className="flex-1 relative">
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="w-full border border-border-neutral rounded px-4 py-3 pr-12 bg-surface-main text-text-primary placeholder:text-border-neutral outline-none focus:border-primary focus:border-2 resize-none font-body-md text-body-md"
                    placeholder="Nhập câu hỏi của bạn tại đây..."
                    rows={1}
                    style={{ minHeight: "48px", maxHeight: "160px" }}
                  />
                  <div className="absolute right-3 bottom-3 flex items-center gap-1">
                    <button className="material-symbols-outlined text-border-neutral hover:text-text-secondary transition-colors cursor-pointer text-[20px]" title="Đính kèm file">
                      attach_file
                    </button>
                  </div>
                </div>
                <button
                  onClick={handleSend}
                  className="bg-accent text-on-accent h-12 w-12 rounded flex items-center justify-center hover:opacity-90 transition-opacity shrink-0 cursor-pointer"
                  title="Gửi tin nhắn"
                >
                  <span className="material-symbols-outlined">send</span>
                </button>
              </div>
              <p className="font-body-md text-body-md text-text-secondary text-xs mt-2 text-center">
                Trợ lý AI cung cấp thông tin tham khảo, không thay thế tư vấn pháp lý chính thức.
              </p>
            </div>
          </div>

          {/* ===== RIGHT SIDEBAR: Lawyer Profile & Consultation Form ===== */}
          <aside className="lg:col-span-3 flex flex-col gap-stack-md">
            {/* Lawyer Profile Card */}
            <div className="bg-surface-main border border-border-neutral p-4 shadow-sm rounded-lg">
              <h2 className="font-headline-md text-headline-md text-primary mb-stack-md flex items-center gap-2">
                <span className="material-symbols-outlined text-text-secondary">badge</span>
                Luật sư trực
              </h2>
              <div className="flex flex-col items-center text-center">
                <div className="w-24 h-24 bg-surface-alt rounded-full border border-border-neutral mb-4 overflow-hidden relative">
                  {/* Using a placeholder image for now, but should ideally come from public/img */}
                  <Image 
                    src="/img/hero_bg.jpg" 
                    alt="Attorney" 
                    fill 
                    className="object-cover" 
                  />
                </div>
                <h3 className="font-headline-md text-headline-md text-primary">Ls. Nguyễn Văn A</h3>
                <p className="font-label-sm text-label-sm text-text-secondary uppercase mt-1">Giám đốc Điều hành</p>
                <p className="font-body-md text-body-md text-text-secondary text-sm mt-3 leading-relaxed">
                  Hơn 15 năm kinh nghiệm trong lĩnh vực tranh tụng dân sự và tư vấn doanh nghiệp. Tốt nghiệp Đại học Luật TP. Hồ Chí Minh.
                </p>
                <Link
                  href="/appointment"
                  className="mt-4 w-full bg-primary text-on-primary h-10 rounded font-label-sm text-label-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2 font-bold"
                >
                  <span className="material-symbols-outlined text-[20px]">calendar_month</span>
                  Đặt lịch hẹn
                </Link>
              </div>
            </div>

            {/* Consultation Form */}
            <div className="bg-surface-main border border-border-neutral p-4 shadow-sm rounded-lg">
              <h2 className="font-headline-md text-headline-md text-primary mb-stack-md flex items-center gap-2">
                <span className="material-symbols-outlined text-text-secondary">contact_mail</span>
                Gửi yêu cầu tư vấn
              </h2>
              <form className="flex flex-col gap-4" onSubmit={handleConsultSubmit}>
                <div>
                  <label className="font-label-sm text-label-sm text-text-primary block mb-1" htmlFor="consult-name">Họ và tên</label>
                  <input className="w-full border border-border-neutral rounded px-3 py-2 bg-surface-alt outline-none focus:border-primary focus:border-2" id="consult-name" placeholder="Nhập họ tên" type="text" required />
                </div>
                <div>
                  <label className="font-label-sm text-label-sm text-text-primary block mb-1" htmlFor="consult-phone">Số điện thoại</label>
                  <input className="w-full border border-border-neutral rounded px-3 py-2 bg-surface-alt outline-none focus:border-primary focus:border-2" id="consult-phone" placeholder="Nhập số điện thoại" type="tel" required />
                </div>
                <div>
                  <label className="font-label-sm text-label-sm text-text-primary block mb-1" htmlFor="consult-message">Nội dung</label>
                  <textarea className="w-full border border-border-neutral rounded px-3 py-2 bg-surface-alt outline-none focus:border-primary focus:border-2 resize-none" id="consult-message" placeholder="Mô tả vấn đề của bạn..." rows={3} required></textarea>
                </div>
                <button className="w-full bg-accent text-on-accent h-11 rounded font-label-sm text-label-sm hover:opacity-90 transition-opacity font-bold" type="submit">
                  Gửi yêu cầu
                </button>
              </form>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
