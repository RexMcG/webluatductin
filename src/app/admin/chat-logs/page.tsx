"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { chatbotService, ChatSessionSummary } from "@/services/chatbot.service";
import { Document, Packer, Paragraph, TextRun, HeadingLevel, Table, TableRow, TableCell, WidthType, AlignmentType, BorderStyle } from "docx";
import { saveAs } from "file-saver";

export default function AdminChatLogsPage() {
  const queryClient = useQueryClient();
  const [selectedSessionId, setSelectedSessionId] = useState<number | null>(null);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [isExportingDocx, setIsExportingDocx] = useState(false);
  const [isExportingDataset, setIsExportingDataset] = useState(false);

  // Fetch list of sessions
  const { data: sessionData, isLoading: isLoadingSessions } = useQuery({
    queryKey: ["admin-chat-sessions"],
    queryFn: () => chatbotService.getSessions(1, 100),
  });

  // Fetch details of selected session
  const { data: detailData, isLoading: isLoadingDetail } = useQuery({
    queryKey: ["admin-chat-detail", selectedSessionId],
    queryFn: () => (selectedSessionId ? chatbotService.getSessionDetail(selectedSessionId) : null),
    enabled: !!selectedSessionId,
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: (id: number) => chatbotService.deleteSession(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-chat-sessions"] });
      if (selectedSessionId) setSelectedSessionId(null);
    },
  });

  const sessions = sessionData?.data?.sessions || [];
  const filteredSessions = sessions.filter(
    (s) =>
      s.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      (s.firstUserQuery && s.firstUserQuery.toLowerCase().includes(searchKeyword.toLowerCase())) ||
      String(s.id).includes(searchKeyword)
  );

  // Export a session to DOCX
  const handleExportDocx = async () => {
    if (!detailData?.data) return;
    setIsExportingDocx(true);

    try {
      const { session, messages } = detailData.data;

      const doc = new Document({
        sections: [
          {
            properties: {},
            children: [
              // Header
              new Paragraph({
                text: "CÔNG TY LUẬT TNHH ĐỨC TÍN VÀ CỘNG SỰ (DUC TIN & PARTNERS)",
                heading: HeadingLevel.HEADING_2,
                alignment: AlignmentType.CENTER,
              }),
              new Paragraph({
                text: "Địa chỉ: Saigon Trade Center Tower, Quận 1, TP. Hồ Chí Minh | Hotline: 093 786 32 63",
                alignment: AlignmentType.CENTER,
                spacing: { after: 300 },
              }),

              // Title
              new Paragraph({
                text: "BIÊN BẢN LỊCH SỬ TƯ VẤN PHÁP LUẬT QUA TRỢ LÝ AI",
                heading: HeadingLevel.TITLE,
                alignment: AlignmentType.CENTER,
                spacing: { after: 200 },
              }),

              // Meta table
              new Table({
                width: { size: 100, type: WidthType.PERCENTAGE },
                rows: [
                  new TableRow({
                    children: [
                      new TableCell({
                        children: [new Paragraph({ children: [new TextRun({ text: "Mã Phiên:", bold: true })] })],
                        width: { size: 25, type: WidthType.PERCENTAGE },
                      }),
                      new TableCell({
                        children: [new Paragraph({ text: `#SESSION-${session.id}` })],
                        width: { size: 75, type: WidthType.PERCENTAGE },
                      }),
                    ],
                  }),
                  new TableRow({
                    children: [
                      new TableCell({
                        children: [new Paragraph({ children: [new TextRun({ text: "Thời gian bắt đầu:", bold: true })] })],
                      }),
                      new TableCell({
                        children: [new Paragraph({ text: new Date(session.createdAt).toLocaleString("vi-VN") })],
                      }),
                    ],
                  }),
                  new TableRow({
                    children: [
                      new TableCell({
                        children: [new Paragraph({ children: [new TextRun({ text: "Tổng số lượt đối thoại:", bold: true })] })],
                      }),
                      new TableCell({
                        children: [new Paragraph({ text: `${messages.length} lượt tin nhắn` })],
                      }),
                    ],
                  }),
                ],
              }),

              new Paragraph({ text: "", spacing: { after: 300 } }),

              // Conversation Section
              new Paragraph({
                text: "NỘI DUNG TRAO ĐỔI CHI TIẾT:",
                heading: HeadingLevel.HEADING_2,
                spacing: { before: 200, after: 200 },
              }),

              ...messages.flatMap((m, index) => {
                const isUser = m.role === "user";
                const roleLabel = isUser ? "👤 Khách Hàng (User)" : "⚖️ Trợ Lý Pháp Lý AI (Assistant)";
                const timeStr = new Date(m.createdAt).toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" });

                return [
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: `[${index + 1}] ${roleLabel} - ${timeStr}`,
                        bold: true,
                        color: isUser ? "0284C7" : "059669",
                      }),
                    ],
                    spacing: { before: 180, after: 80 },
                  }),
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: m.content,
                      }),
                    ],
                    spacing: { after: 150 },
                  }),
                ];
              }),

              new Paragraph({ text: "", spacing: { after: 400 } }),

              // Footer Note
              new Paragraph({
                text: "Trích xuất tự động từ Hệ thống Quản trị Luật Đức Tín. Dữ liệu phục vụ đánh giá nghiệp vụ và huấn luyện mô hình.",
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: `\nNgày xuất file: ${new Date().toLocaleString("vi-VN")}`,
                    italics: true,
                    size: 18,
                  }),
                ],
              }),
            ],
          },
        ],
      });

      const blob = await Packer.toBlob(doc);
      saveAs(blob, `Lich_su_chat_AI_Session_${session.id}_${new Date().toISOString().slice(0, 10)}.docx`);
    } catch (err) {
      console.error("Export Docx error:", err);
      alert("Có lỗi khi xuất file Word. Vui lòng thử lại!");
    } finally {
      setIsExportingDocx(false);
    }
  };

  // Export all sessions to JSONL Dataset
  const handleExportDataset = async () => {
    setIsExportingDataset(true);
    try {
      const res = await chatbotService.exportDataset();
      if (!res?.data || res.data.length === 0) {
        alert("Chưa có dữ liệu phiên chat nào đủ điều kiện xuất dataset!");
        return;
      }

      // Convert array to JSONL string (1 JSON object per line)
      const jsonlLines = res.data.map((item) => JSON.stringify(item)).join("\n");
      const blob = new Blob([jsonlLines], { type: "application/x-jsonlines;charset=utf-8" });
      saveAs(blob, `ductin_law_chatbot_dataset_${new Date().toISOString().slice(0, 10)}.jsonl`);
    } catch (err) {
      console.error("Export Dataset error:", err);
      alert("Có lỗi khi xuất file Dataset. Vui lòng thử lại!");
    } finally {
      setIsExportingDataset(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-xs border border-slate-200">
        <div>
          <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2.5">
            <span className="material-symbols-outlined text-amber-700 text-3xl">forum</span>
            Lịch Sử Chat Khách Hàng (AI Chat Logs)
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Theo dõi các phiên tư vấn trực tiếp của khách hàng và trích xuất dữ liệu huấn luyện AI.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExportDataset}
            disabled={isExportingDataset || sessions.length === 0}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer disabled:opacity-50"
            title="Tải toàn bộ hội thoại về làm Dataset huấn luyện AI"
          >
            <span className="material-symbols-outlined text-lg">smart_toy</span>
            {isExportingDataset ? "Đang xuất..." : "Xuất Dataset (.jsonl)"}
          </button>
        </div>
      </div>

      {/* Main 2-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Session List */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col h-[750px] overflow-hidden">
          {/* Search bar */}
          <div className="p-4 border-b border-slate-100 bg-slate-50/50">
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-2.5 text-slate-400 text-lg">
                search
              </span>
              <input
                type="text"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                placeholder="Tìm theo ID, câu hỏi khách hàng..."
                className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:border-amber-600 focus:outline-hidden"
              />
            </div>
            <div className="flex justify-between items-center mt-2 text-[11px] text-slate-500 font-semibold px-1">
              <span>Tổng số: {filteredSessions.length} cuộc hội thoại</span>
            </div>
          </div>

          {/* List Items */}
          <div className="flex-1 overflow-y-auto divide-y divide-slate-100 p-2 space-y-1">
            {isLoadingSessions ? (
              <div className="p-8 text-center text-slate-400 text-xs">Đang tải danh sách phiên chat...</div>
            ) : filteredSessions.length === 0 ? (
              <div className="p-8 text-center text-slate-400 text-xs">Không tìm thấy cuộc trò chuyện nào.</div>
            ) : (
              filteredSessions.map((s) => {
                const isSelected = selectedSessionId === s.id;
                const formattedDate = new Date(s.createdAt).toLocaleString("vi-VN", {
                  hour: "2-digit",
                  minute: "2-digit",
                  day: "2-digit",
                  month: "2-digit",
                });

                return (
                  <div
                    key={s.id}
                    onClick={() => setSelectedSessionId(s.id)}
                    className={`p-3.5 rounded-xl cursor-pointer transition-all ${
                      isSelected
                        ? "bg-amber-50/80 border border-amber-300 shadow-xs"
                        : "hover:bg-slate-50 border border-transparent"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                        #ID: {s.id}
                      </span>
                      <span className="text-[11px] text-slate-400 font-medium">{formattedDate}</span>
                    </div>

                    <p className="text-xs font-bold text-slate-800 line-clamp-2 leading-relaxed">
                      {s.firstUserQuery || s.title}
                    </p>

                    <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-slate-100/60 text-[11px]">
                      <span className="text-emerald-700 font-semibold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        {s.messageCount} lượt trao đổi
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (confirm(`Xác nhận xóa phiên chat #${s.id}?`)) {
                            deleteMutation.mutate(s.id);
                          }
                        }}
                        className="text-slate-400 hover:text-rose-600 transition-colors p-1"
                        title="Xóa phiên chat này"
                      >
                        <span className="material-symbols-outlined text-sm">delete</span>
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column: Transcript View & Docx Export */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col h-[750px] overflow-hidden">
          {selectedSessionId === null ? (
            <div className="h-full flex flex-col items-center justify-center p-8 text-center text-slate-400">
              <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center mb-3">
                <span className="material-symbols-outlined text-3xl">chat_paste_go</span>
              </div>
              <p className="font-bold text-slate-700 text-sm">Chọn một phiên chat ở danh sách bên trái</p>
              <p className="text-xs text-slate-400 mt-1 max-w-xs">
                Xem toàn bộ nội dung hội thoại, đánh giá câu trả lời và xuất biên bản Word (.docx).
              </p>
            </div>
          ) : isLoadingDetail ? (
            <div className="h-full flex items-center justify-center p-8 text-slate-400 text-xs">
              Đang tải nội dung cuộc hội thoại...
            </div>
          ) : detailData?.data ? (
            <>
              {/* Detail Header */}
              <div className="p-4 md:p-5 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-amber-900 bg-amber-100 px-2.5 py-0.5 rounded-md">
                      Phiên #{detailData.data.session.id}
                    </span>
                    <span className="text-xs text-slate-500">
                      {new Date(detailData.data.session.createdAt).toLocaleString("vi-VN")}
                    </span>
                  </div>
                  <h2 className="text-sm font-bold text-slate-900 mt-1 line-clamp-1">
                    {detailData.data.session.title}
                  </h2>
                </div>

                <button
                  onClick={handleExportDocx}
                  disabled={isExportingDocx}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer shrink-0"
                  title="Xuất nội dung này thành file Word (.docx)"
                >
                  <span className="material-symbols-outlined text-base">description</span>
                  {isExportingDocx ? "Đang tạo Word..." : "Xuất File Word (.docx)"}
                </button>
              </div>

              {/* Messages Feed */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-slate-50/30">
                {detailData.data.messages.map((m, idx) => {
                  const isUser = m.role === "user";
                  return (
                    <div
                      key={m.id || idx}
                      className={`flex gap-3 max-w-[85%] ${isUser ? "ml-auto flex-row-reverse" : "mr-auto"}`}
                    >
                      {/* Avatar */}
                      <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                          isUser ? "bg-slate-800 text-white" : "bg-emerald-600 text-white"
                        }`}
                      >
                        <span className="material-symbols-outlined text-sm">
                          {isUser ? "person" : "smart_toy"}
                        </span>
                      </div>

                      {/* Content */}
                      <div
                        className={`p-3.5 rounded-2xl text-xs leading-relaxed ${
                          isUser
                            ? "bg-slate-900 text-white rounded-tr-none"
                            : "bg-white border border-slate-200 text-slate-800 rounded-tl-none shadow-2xs"
                        }`}
                      >
                        <div className="flex items-center justify-between gap-4 mb-1 text-[10px] opacity-70">
                          <span className="font-bold">{isUser ? "Khách hàng" : "Trợ lý AI"}</span>
                          <span>
                            {new Date(m.createdAt).toLocaleTimeString("vi-VN", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>
                        <p className="whitespace-pre-wrap">{m.content}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <div className="h-full flex items-center justify-center p-8 text-slate-400 text-xs">
              Không thể tải chi tiết phiên chat.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
