"use client";

import React, { useState } from "react";
import Link from "next/link";

interface Topic {
  id: string;
  title: string;
  badge: string;
  summary: string;
  content: React.ReactNode;
}

interface CalculatorGuideProps {
  type: "salary" | "pit" | "court-fee";
}

export function InfoTooltip({ title, content }: { title: string; content: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block ml-1.5 align-middle">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        className="w-4 h-4 rounded-full bg-amber-100 hover:bg-amber-200 text-[#641D06] text-[10px] font-bold inline-flex items-center justify-center cursor-pointer transition-colors border border-amber-300"
        title="Bấm xem chú thích pháp lý"
        aria-label={`Chú thích: ${title}`}
      >
        i
      </button>

      {isOpen && (
        <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-64 sm:w-72 p-3 bg-slate-900 text-white rounded-2xl shadow-xl z-50 text-xs leading-relaxed animate-fadeIn pointer-events-none">
          <div className="font-bold text-amber-300 mb-1 flex items-center gap-1">
            <span className="material-symbols-outlined text-xs">gavel</span>
            <span>{title}</span>
          </div>
          <p className="text-slate-200 text-[11.5px]">{content}</p>
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900"></div>
        </div>
      )}
    </div>
  );
}

export default function CalculatorGuide({ type }: CalculatorGuideProps) {
  const [activeTab, setActiveTab] = useState(0);

  // Content for Salary (Lương Gross - Net)
  const salaryTopics: Topic[] = [
    {
      id: "gross-vs-net",
      badge: "Khái niệm cốt lõi",
      title: "Lương Gross là gì? Lương Net là gì? Khác nhau như thế nào?",
      summary: "Phân biệt bản chất pháp lý giữa Lương Gross và Lương Net để tránh bị thiệt thòi khi ký hợp đồng lao động.",
      content: (
        <div className="space-y-4 text-slate-700 leading-relaxed text-sm sm:text-[15px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-amber-50/60 p-4 rounded-2xl border border-amber-200">
              <h4 className="font-bold text-[#641D06] text-base mb-1.5 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-lg">payments</span>
                Lương Gross (Tổng thu nhập)
              </h4>
              <p className="text-xs sm:text-sm text-slate-600">
                Là <strong>tổng thu nhập</strong> mà người lao động được hưởng trước khi trừ các khoản đóng bảo hiểm bắt buộc (BHXH, BHYT, BHTN) và thuế thu nhập cá nhân (TNCN).
              </p>
              <div className="mt-2 text-[11.5px] font-semibold text-amber-900 bg-amber-100/70 p-2 rounded-xl">
                📌 Công thức: Lương Gross = Lương Net + Bảo hiểm (10.5%) + Thuế TNCN (nếu có).
              </div>
            </div>

            <div className="bg-emerald-50/60 p-4 rounded-2xl border border-emerald-200">
              <h4 className="font-bold text-emerald-900 text-base mb-1.5 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-lg">account_balance_wallet</span>
                Lương Net (Thực nhận về tay)
              </h4>
              <p className="text-xs sm:text-sm text-slate-600">
                Là <strong>số tiền thực tế</strong> được chuyển vào tài khoản ngân hàng hoặc nhận tiền mặt mỗi tháng sau khi người sử dụng lao động đã trích nộp đầy đủ bảo hiểm và thuế.
              </p>
              <div className="mt-2 text-[11.5px] font-semibold text-emerald-900 bg-emerald-100/70 p-2 rounded-xl">
                📌 Công thức: Lương Net = Lương Gross - (BHXH 8% + BHYT 1.5% + BHTN 1%) - Thuế TNCN.
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200">
            <h4 className="font-bold text-slate-900 text-sm mb-2">⚖️ Lời khuyên từ Luật sư: Nên đàm phán Lương Gross hay Net?</h4>
            <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm text-slate-600">
              <li>
                <strong>Nên chọn LƯƠNG GROSS:</strong> Giúp người lao động chủ động kiểm soát chính xác mức đóng bảo hiểm. Mọi quyền lợi về chế độ <strong>thai sản, ốm đau, tai nạn lao động, trợ cấp thôi việc và trợ cấp thất nghiệp</strong> đều tính trên mức lương đóng BHXH thực tế.
              </li>
              <li>
                <strong>Rủi ro khi nhận LƯƠNG NET:</strong> Một số doanh nghiệp có thể lách luật bằng cách chỉ khai báo đóng BHXH ở mức lương tối thiểu vùng, dẫn đến khi nghỉ thai sản hoặc thất nghiệp, số tiền trợ cấp bạn nhận được sẽ rất thấp.
              </li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      id: "insurance-tax-responsibility",
      badge: "Trách nhiệm nộp",
      title: "Ai là người chịu mức thuế và bảo hiểm trong quan hệ lao động?",
      summary: "Quy định mới nhất về tỷ lệ trích nộp bảo hiểm (32%) và trách nhiệm pháp lý của Doanh nghiệp vs Người lao động.",
      content: (
        <div className="space-y-4 text-slate-700 leading-relaxed text-sm sm:text-[15px]">
          <p>
            Theo quy định của <strong>Luật Bảo hiểm xã hội 2014</strong>, <strong>Luật Việc làm</strong> và <strong>Luật An toàn vệ sinh lao động</strong>, tổng tỷ lệ đóng bảo hiểm bắt buộc là <strong>32%</strong> trên quỹ tiền lương đóng BHXH, được phân chia cụ thể như sau:
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse rounded-xl overflow-hidden shadow-2xs">
              <thead>
                <tr className="bg-[#641D06] text-white">
                  <th className="p-3">Loại Bảo Hiểm</th>
                  <th className="p-3 text-center">Người Lao Động chịu</th>
                  <th className="p-3 text-center">Doanh Nghiệp chịu</th>
                  <th className="p-3 text-center">Tổng Cộng</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                <tr className="hover:bg-slate-50">
                  <td className="p-3 font-semibold text-slate-800">1. Bảo hiểm Xã hội (BHXH)</td>
                  <td className="p-3 text-center font-bold text-amber-900 bg-amber-50/40">8% (Hưu trí & Tử tuất)</td>
                  <td className="p-3 text-center text-slate-700">17.5% (Ốm đau, Thai sản, TNLĐ)</td>
                  <td className="p-3 text-center font-bold text-slate-900">25.5%</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-3 font-semibold text-slate-800">2. Bảo hiểm Y tế (BHYT)</td>
                  <td className="p-3 text-center font-bold text-amber-900 bg-amber-50/40">1.5%</td>
                  <td className="p-3 text-center text-slate-700">3.0%</td>
                  <td className="p-3 text-center font-bold text-slate-900">4.5%</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-3 font-semibold text-slate-800">3. Bảo hiểm Thất nghiệp (BHTN)</td>
                  <td className="p-3 text-center font-bold text-amber-900 bg-amber-50/40">1.0%</td>
                  <td className="p-3 text-center text-slate-700">1.0%</td>
                  <td className="p-3 text-center font-bold text-slate-900">2.0%</td>
                </tr>
                <tr className="bg-slate-100 font-black text-slate-900">
                  <td className="p-3">TỔNG CỘNG NGHĨA VỤ</td>
                  <td className="p-3 text-center text-[#641D06] bg-amber-100">10.5%</td>
                  <td className="p-3 text-center text-blue-900">21.5%</td>
                  <td className="p-3 text-center text-emerald-900">32.0%</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
            <h4 className="font-bold text-slate-900 text-sm">🏛️ Trách nhiệm pháp lý của Doanh nghiệp:</h4>
            <p className="text-xs sm:text-sm text-slate-600">
              Doanh nghiệp có nghĩa vụ <strong>khấu trừ 10.5% từ lương của người lao động</strong>, kết hợp với <strong>21.5% từ quỹ của doanh nghiệp</strong> để trực tiếp nộp cho cơ quan BHXH định kỳ hàng tháng. Hành vi chậm đóng, trốn đóng bảo hiểm cho người lao động có thể bị xử phạt vi phạm hành chính hoặc truy cứu trách nhiệm hình sự theo Điều 216 Bộ luật Hình sự.
            </p>
          </div>
        </div>
      ),
    },
  ];

  // Content for PIT (Thuế Thu Nhập Cá Nhân)
  const pitTopics: Topic[] = [
    {
      id: "who-pays-pit",
      badge: "Đối tượng nộp thuế",
      title: "Ai là người bắt buộc phải nộp Thuế Thu Nhập Cá Nhân?",
      summary: "Căn cứ xác định thu nhập chịu thuế và cách tính thuế theo biểu lũy tiến từng phần 7 bậc.",
      content: (
        <div className="space-y-4 text-slate-700 leading-relaxed text-sm sm:text-[15px]">
          <p>
            Theo <strong>Luật Thuế Thu nhập cá nhân</strong>, cá nhân cư trú có thu nhập từ tiền lương, tiền công vượt quá mức <strong>giảm trừ gia cảnh</strong> theo quy định thì bắt buộc phải nộp thuế TNCN.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-amber-50/60 rounded-2xl border border-amber-200">
              <span className="font-bold text-[#641D06] block text-sm mb-1">Mức giảm trừ bản thân:</span>
              <span className="text-xl font-black text-slate-900">11.000.000 VNĐ/tháng</span>
              <span className="block text-xs text-slate-500 mt-1">(Tương đương 132.000.000 VNĐ/năm)</span>
            </div>
            <div className="p-4 bg-blue-50/60 rounded-2xl border border-blue-200">
              <span className="font-bold text-blue-900 block text-sm mb-1">Mức giảm trừ người phụ thuộc:</span>
              <span className="text-xl font-black text-slate-900">4.400.000 VNĐ/tháng</span>
              <span className="block text-xs text-slate-500 mt-1">(Cho mỗi người phụ thuộc đăng ký hợp lệ)</span>
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <h4 className="font-bold text-slate-900 text-sm mb-2">📊 Biểu thuế lũy tiến từng phần (7 Bậc Thuế):</h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
              <div className="p-2 bg-white rounded-xl border border-slate-200">
                <span className="block font-bold text-slate-800">Bậc 1: 5%</span>
                <span className="text-[10.5px] text-slate-500">Đến 5 triệu</span>
              </div>
              <div className="p-2 bg-white rounded-xl border border-slate-200">
                <span className="block font-bold text-slate-800">Bậc 2: 10%</span>
                <span className="text-[10.5px] text-slate-500">5 - 10 triệu</span>
              </div>
              <div className="p-2 bg-white rounded-xl border border-slate-200">
                <span className="block font-bold text-slate-800">Bậc 3: 15%</span>
                <span className="text-[10.5px] text-slate-500">10 - 18 triệu</span>
              </div>
              <div className="p-2 bg-white rounded-xl border border-slate-200">
                <span className="block font-bold text-slate-800">Bậc 4: 20%</span>
                <span className="text-[10.5px] text-slate-500">18 - 32 triệu</span>
              </div>
              <div className="p-2 bg-white rounded-xl border border-slate-200">
                <span className="block font-bold text-slate-800">Bậc 5: 25%</span>
                <span className="text-[10.5px] text-slate-500">32 - 52 triệu</span>
              </div>
              <div className="p-2 bg-white rounded-xl border border-slate-200">
                <span className="block font-bold text-slate-800">Bậc 6: 30%</span>
                <span className="text-[10.5px] text-slate-500">52 - 80 triệu</span>
              </div>
              <div className="p-2 bg-white rounded-xl border border-slate-200 col-span-2">
                <span className="block font-bold text-red-700">Bậc 7: 35%</span>
                <span className="text-[10.5px] text-slate-500">Trên 80 triệu/tháng</span>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "dependents-guide",
      badge: "Tối ưu thuế",
      title: "Ai được tính là Người Phụ Thuộc để giảm trừ thuế TNCN hợp pháp?",
      summary: "Hồ sơ và điều kiện đăng ký người phụ thuộc (con cái, cha mẹ, người thân mất sức lao động).",
      content: (
        <div className="space-y-3 text-slate-700 leading-relaxed text-sm sm:text-[15px]">
          <p>Các đối tượng được đăng ký giảm trừ 4.400.000 VNĐ/tháng gồm:</p>
          <ul className="list-disc list-inside space-y-2 text-xs sm:text-sm text-slate-600 bg-white p-4 rounded-2xl border border-slate-200">
            <li>
              <strong>Con cái:</strong> Con chưa đủ 18 tuổi; hoặc con từ 18 tuổi trở lên bị khuyết tật, không có khả năng lao động; hoặc đang theo học đại học/cao đẳng có thu nhập không quá 1 triệu đồng/tháng.
            </li>
            <li>
              <strong>Cha đẻ, mẹ đẻ, cha mẹ vợ/chồng:</strong> Người hết tuổi lao động hoặc không có khả năng lao động và có thu nhập bình quân tháng không vượt quá 1.000.000 VNĐ.
            </li>
            <li>
              <strong>Vợ hoặc chồng:</strong> Không có khả năng lao động và không có thu nhập hoặc thu nhập dưới 1 triệu/tháng.
            </li>
          </ul>
        </div>
      ),
    },
  ];

  // Content for Court Fee (Án Phí Tòa Án)
  const courtFeeTopics: Topic[] = [
    {
      id: "who-pays-court-fee",
      badge: "Nghĩa vụ án phí",
      title: "Ai là người phải nộp tiền tạm ứng án phí và chịu án phí khi Tòa xét xử?",
      summary: "Nguyên tắc chịu án phí theo Điều 147 Bộ luật Tố tụng Dân sự và Nghị quyết 326/2016/UBTVQH14.",
      content: (
        <div className="space-y-4 text-slate-700 leading-relaxed text-sm sm:text-[15px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-amber-50/60 rounded-2xl border border-amber-200">
              <h4 className="font-bold text-[#641D06] text-sm mb-1">1. Tiền tạm ứng án phí:</h4>
              <p className="text-xs sm:text-sm text-slate-600">
                <strong>Người khởi kiện / Người nộp đơn</strong> phải nộp tiền tạm ứng án phí trước để Tòa án chính thức thụ lý vụ án. Mức tạm ứng là <strong>50%</strong> mức án phí dự tính đối với vụ án có giá ngạch (hoặc 300.000 VNĐ với vụ án không có giá ngạch).
              </p>
            </div>

            <div className="p-4 bg-emerald-50/60 rounded-2xl border border-emerald-200">
              <h4 className="font-bold text-emerald-900 text-sm mb-1">2. Nghĩa vụ chịu án phí cuối cùng:</h4>
              <p className="text-xs sm:text-sm text-slate-600">
                Áp dụng nguyên tắc <strong>"Bên thua kiện chịu án phí"</strong>. Nếu yêu cầu của người khởi kiện được Tòa án chấp nhận toàn bộ, người bị kiện phải nộp toàn bộ án phí và người khởi kiện được <strong>hoàn trả 100%</strong> số tiền tạm ứng đã nộp.
              </p>
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <h4 className="font-bold text-slate-900 text-sm mb-1">⚖️ Nếu hai bên hòa giải thành công:</h4>
            <p className="text-xs sm:text-sm text-slate-600">
              Các đương sự chỉ phải chịu <strong>50% mức án phí</strong> theo luật định. Hai bên có thể tự thỏa thuận về người nộp phần án phí này.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "claim-types-and-exemptions",
      badge: "Khung án phí & Miễn giảm",
      title: "Phân biệt Vụ án Có giá ngạch vs Không giá ngạch & Trường hợp được miễn giảm",
      summary: "Mức án phí chuẩn theo Nghị quyết 326 và các trường hợp người nghèo, người có công được miễn 100% án phí.",
      content: (
        <div className="space-y-4 text-slate-700 leading-relaxed text-sm sm:text-[15px]">
          <ul className="list-disc list-inside space-y-2 text-xs sm:text-sm text-slate-600 bg-white p-4 rounded-2xl border border-slate-200">
            <li>
              <strong>Không có giá ngạch (300.000 VNĐ):</strong> Là vụ án mà yêu cầu không phải là số tiền cụ thể (VD: Xin ly hôn không chia tài sản, yêu cầu hủy hợp đồng vô hiệu, yêu cầu thay đổi người nuôi con...).
            </li>
            <li>
              <strong>Có giá ngạch:</strong> Là vụ án yêu cầu giải quyết số tiền cụ thể hoặc tài sản định giá được (VD: Đòi nợ 500 triệu, tranh chấp chia thừa kế nhà đất 2 tỷ đồng...). Mức án phí tính theo tỷ lệ % lũy tiến theo giá trị tài sản tranh chấp.
            </li>
          </ul>

          <div className="bg-rose-50/60 p-4 rounded-2xl border border-rose-200">
            <h4 className="font-bold text-rose-950 text-sm mb-1">🌟 Các trường hợp được MIỄN 100% Án phí:</h4>
            <p className="text-xs sm:text-sm text-slate-700">
              Người thuộc hộ nghèo, cận nghèo; Người có công với cách mạng; Đồng bào dân tộc thiểu số ở các xã có điều kiện KT-XH đặc biệt khó khăn; Tranh chấp đòi tiền lương, trợ cấp mất việc làm, bảo hiểm xã hội; Tranh chấp cấp dưỡng nuôi con.
            </p>
          </div>
        </div>
      ),
    },
  ];

  const topics = type === "salary" ? salaryTopics : type === "pit" ? pitTopics : courtFeeTopics;

  return (
    <div className="mt-12 bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Section Header */}
      <div className="bg-[#641D06] p-6 sm:p-8 text-white flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold uppercase tracking-wider mb-2 border border-amber-400/30">
            <span className="material-symbols-outlined text-sm">menu_book</span>
            Cẩm Nang &amp; Hướng Dẫn Pháp Lý Mới Nhất
          </div>
          <h2 className="text-xl sm:text-2xl font-black font-sans leading-tight">
            {type === "salary" && "Kiến Thức Tiền Lương & Bảo Hiểm Xã Hội 2026"}
            {type === "pit" && "Cẩm Nang Thuế Thu Nhập Cá Nhân & Giảm Trừ"}
            {type === "court-fee" && "Quy Định Án Phí & Tố Tụng Tòa Án Thực Tiễn"}
          </h2>
          <p className="text-xs sm:text-sm text-amber-100/90 mt-1 max-w-2xl">
            Biên soạn và cập nhật chuẩn xác bởi đội ngũ Luật sư Phan Đức Tín &amp; Cộng sự.
          </p>
        </div>

        <Link
          href="/ai-chatbot"
          className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-5 py-2.5 rounded-2xl text-xs sm:text-sm shadow-md transition-transform active:scale-95 shrink-0"
        >
          <span className="material-symbols-outlined text-lg">smart_toy</span>
          <span>Hỏi Luật Sư AI 24/7</span>
        </Link>
      </div>

      {/* Tabs Switcher */}
      <div className="flex border-b border-slate-200 bg-slate-50/70 overflow-x-auto p-2 gap-2">
        {topics.map((t, idx) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(idx)}
            className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all shrink-0 cursor-pointer flex items-center gap-2 ${
              activeTab === idx
                ? "bg-white text-[#641D06] shadow-sm border border-slate-200/80"
                : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
            <span>{t.title.length > 42 ? `${t.title.slice(0, 42)}...` : t.title}</span>
          </button>
        ))}
      </div>

      {/* Active Tab Content */}
      <div className="p-6 sm:p-8">
        <div className="mb-4">
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-amber-900 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
            {topics[activeTab].badge}
          </span>
          <h3 className="text-lg sm:text-xl font-black text-slate-900 mt-2 mb-1">
            {topics[activeTab].title}
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            {topics[activeTab].summary}
          </p>
        </div>

        <div className="pt-4 border-t border-slate-100">
          {topics[activeTab].content}
        </div>

        {/* Action Banner */}
        <div className="mt-8 p-5 bg-linear-to-r from-[#641D06]/5 via-amber-50/40 to-transparent rounded-2xl border border-amber-200/70 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#641D06] text-amber-300 flex items-center justify-center shrink-0 shadow-xs">
              <span className="material-symbols-outlined text-xl">support_agent</span>
            </div>
            <div>
              <div className="font-bold text-slate-900 text-sm">Cần tư vấn trực tiếp trường hợp của bạn?</div>
              <div className="text-xs text-slate-500">Đặt lịch làm việc riêng với Luật sư Phan Đức Tín để bảo vệ quyền lợi tối đa.</div>
            </div>
          </div>

          <Link
            href="/appointment"
            className="inline-flex items-center gap-2 bg-[#641D06] hover:bg-black text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-xs transition-colors shrink-0"
          >
            <span>Đặt lịch tư vấn</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
