import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Điều Khoản Sử Dụng Website | Công ty Luật TNHH Đức Tín & Cộng sự",
  description:
    "Điều khoản sử dụng website và các tiện ích pháp lý trực tuyến tại Công ty Luật TNHH Đức Tín & Cộng sự (Luật sư Phan Đức Tín).",
  alternates: {
    canonical: "https://webluatductin.vercel.app/terms-of-use",
  },
};

export default function TermsOfUsePage() {
  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Top Header */}
      <section className="bg-white border-b border-slate-200 pt-8 pb-8">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <nav className="flex items-center gap-2 text-xs md:text-sm text-slate-500 mb-4">
            <Link href="/" className="hover:text-[#641D06] transition-colors">
              Trang chủ
            </Link>
            <span>/</span>
            <span className="text-slate-900 font-medium">Điều khoản sử dụng</span>
          </nav>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
            Điều Khoản Sử Dụng Website
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            Công ty Luật TNHH Đức Tín &amp; Cộng sự • Cập nhật lần cuối: Tháng 01 năm 2026
          </p>
        </div>
      </section>

      {/* Main Document Body */}
      <main className="max-w-4xl mx-auto px-4 md:px-8 pt-8">
        <div className="bg-white rounded-2xl p-6 sm:p-12 border border-slate-200 shadow-xs space-y-8 text-slate-800 leading-relaxed text-sm sm:text-base">
          
          {/* Lời mở đầu */}
          <div>
            <p className="leading-relaxed">
              Chào mừng Quý khách đến với website chính thức của <strong>Công ty Luật TNHH Đức Tín &amp; Cộng sự</strong> (sau đây gọi tắt là <strong>&quot;Đức Tín &amp; Cộng sự&quot;</strong>, <strong>&quot;Chúng tôi&quot;</strong> hoặc <strong>&quot;Website&quot;</strong>).
            </p>
            <p className="mt-3 leading-relaxed">
              Bằng việc truy cập, tra cứu thông tin, sử dụng các công cụ tính toán pháp lý hoặc gửi yêu cầu tư vấn qua Website này, Quý khách xác nhận đã đọc, hiểu rõ và đồng ý tuân thủ toàn bộ các điều khoản và điều kiện được quy định dưới đây. Nếu Quý khách không đồng ý với bất kỳ phần nào trong Điều khoản sử dụng này, xin vui lòng ngừng việc sử dụng Website.
            </p>
          </div>

          <hr className="border-slate-200" />

          {/* I. QUYỀN SỞ HỮU TRÍ TUỆ */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 uppercase">
              I. Quyền Sở Hữu Trí Tuệ
            </h2>
            <p>
              Toàn bộ nội dung xuất bản trên Website này bao gồm nhưng không giới hạn ở: các bài viết chuyên môn, bản tin pháp luật, cấu trúc sơ đồ tư duy (mindmap), biểu mẫu pháp lý mẫu, mã nguồn thuật toán tính án phí, thuế TNCN, lương Gross - Net, hình ảnh nhận diện thương hiệu, logo và nhãn hiệu dịch vụ đều thuộc quyền sở hữu trí tuệ hợp pháp của Công ty Luật TNHH Đức Tín &amp; Cộng sự hoặc đã được cấp phép sử dụng theo luật định.
            </p>
            <ul className="list-disc pl-6 space-y-1.5 text-slate-700">
              <li>Mọi hành vi sao chép, trích dẫn nội dung vì mục đích thương mại mà không có sự đồng ý trước bằng văn bản của Chúng tôi đều cấu thành hành vi xâm phạm quyền tác giả.</li>
              <li>Trường hợp trích dẫn phi thương mại hoặc nghiên cứu học thuật, người sử dụng bắt buộc phải ghi rõ nguồn gốc thông tin: <em>&quot;Theo Công ty Luật TNHH Đức Tín &amp; Cộng sự - webluatductin.vercel.app&quot;</em> kèm đường dẫn liên kết (hyperlink) trỏ về bài viết gốc.</li>
            </ul>
          </section>

          {/* II. KHÔNG THIẾT LẬP QUAN HỆ LUẬT SƯ - THÂN CHỦ TỰ ĐỘNG */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 uppercase">
              II. Giới Hạn Quan Hệ Pháp Lý (Luật Sư - Thân Chủ)
            </h2>
            <p>
              Quý khách vui lòng lưu ý rằng:
            </p>
            <ol className="list-decimal pl-6 space-y-2 text-slate-700">
              <li>
                <strong>Không xác lập quan hệ đại diện tự động:</strong> Việc Quý khách truy cập Website, tương tác với Trợ lý AI, tải biểu mẫu hoặc gửi biểu mẫu đặt hẹn tư vấn chưa cấu thành quan hệ đại diện pháp lý giữa Luật sư và Thân chủ. Quan hệ dịch vụ pháp lý chính thức chỉ được xác lập khi hai bên ký kết <strong>Hợp đồng dịch vụ pháp lý bằng văn bản</strong> theo đúng quy định của Luật Luật sư Việt Nam.
              </li>
              <li>
                <strong>Tính chất tham khảo:</strong> Các bài viết phân tích án lệ, câu trả lời tự động của AI và kết quả từ các công cụ tính toán tiện ích chỉ mang giá trị tham khảo định hướng kiến thức, không thay thế cho ý kiến tư vấn pháp lý chính thức được ban hành bằng văn bản bởi Luật sư có chứng chỉ hành nghề.
              </li>
            </ol>
          </section>

          {/* III. QUY ĐỊNH SỬ DỤNG TIỆN ÍCH TRỰC TUYẾN & BIỂU MẪU */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 uppercase">
              III. Sử Dụng Tiện Ích Trực Tuyến &amp; Kho Biểu Mẫu
            </h2>
            <p>
              Đức Tín &amp; Cộng sự cung cấp miễn phí các tiện ích phục vụ cộng đồng doanh nghiệp và người dân:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700">
              <li>
                <strong>Kho biểu mẫu pháp lý:</strong> Các biểu mẫu đơn từ, hợp đồng mẫu được biên soạn dựa trên quy định pháp luật hiện hành. Người sử dụng có trách nhiệm tự rà soát, điền thông tin và hiệu chỉnh cho phù hợp với hoàn cảnh thực tế của giao dịch cụ thể trước khi ký kết.
              </li>
              <li>
                <strong>Công cụ tính toán (Án phí, Thuế, Lương):</strong> Thuật toán được lập trình dựa trên Nghị quyết 326/2016/UBTVQH14, Luật Thuế TNCN và Nghị định về tiền lương tối thiểu. Chúng tôi nỗ lực tối đa để thuật toán luôn chính xác, nhưng khuyến nghị người dùng kiểm tra lại các điều kiện giảm trừ đặc thù cá nhân.
              </li>
              <li>
                <strong>Trợ lý Luật sư AI 24/7:</strong> Ứng dụng mô hình trí tuệ nhân tạo hỗ trợ tra cứu văn bản pháp luật nhanh. AI không đưa ra kết luận pháp lý thay thế cho thẩm phán hoặc luật sư tranh tụng.
              </li>
            </ul>
          </section>

          {/* IV. CÁC HÀNH VI BỊ NGHIÊM CẤM */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 uppercase">
              IV. Các Hành Vi Bị Nghiêm Cấm Khi Sử Dụng Website
            </h2>
            <p>Khi truy cập và tương tác trên Website, người dùng cam kết không thực hiện các hành vi sau:</p>
            <ul className="list-disc pl-6 space-y-1.5 text-slate-700">
              <li>Sử dụng các công cụ tự động (bot, crawler, scraper) để thu thập dữ liệu với tần suất gây quá tải hoặc làm gián đoạn hạ tầng máy chủ của Chúng tôi;</li>
              <li>Phát tán mã độc, virus, can thiệp trái phép vào hệ thống bảo mật hoặc cơ sở dữ liệu của Website;</li>
              <li>Mạo danh nhân viên, luật sư của Công ty Luật TNHH Đức Tín &amp; Cộng sự để thực hiện các hành vi lừa đảo hoặc trục lợi bất chính;</li>
              <li>Gửi các nội dung vi phạm pháp luật, trái thuần phong mỹ tục hoặc xâm phạm danh dự, uy tín của tổ chức, cá nhân khác vào biểu mẫu liên hệ hoặc khung chat.</li>
            </ul>
          </section>

          {/* V. THAY ĐỔI ĐIỀU KHOẢN & LUẬT ÁP DỤNG */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 uppercase">
              V. Sửa Đổi Điều Khoản &amp; Luật Áp Dụng
            </h2>
            <p>
              Đức Tín &amp; Cộng sự có quyền cập nhật, bổ sung hoặc sửa đổi Điều khoản sử dụng này vào bất kỳ thời điểm nào nhằm phù hợp với chính sách hoạt động và các biến động của pháp luật Việt Nam. Phiên bản cập nhật sẽ có hiệu lực ngay khi được công bố trên Website.
            </p>
            <p>
              Điều khoản này được điều chỉnh và giải thích theo quy định của <strong>Pháp luật nước Cộng hòa Xã hội Chủ nghĩa Việt Nam</strong>. Mọi tranh chấp phát sinh từ việc sử dụng Website sẽ được giải quyết thông qua thương lượng hòa giải; trường hợp không đạt được thỏa thuận, tranh chấp sẽ được đưa ra Tòa án nhân dân có thẩm quyền tại Thành phố Hồ Chí Minh để giải quyết.
            </p>
          </section>

          {/* VI. THÔNG TIN LIÊN HỆ */}
          <section className="space-y-2 pt-2 border-t border-slate-200">
            <h2 className="text-base font-bold text-slate-900">
              Thông Tin Liên Hệ Giải Đáp
            </h2>
            <p className="text-sm text-slate-700">
              Nếu Quý khách có bất kỳ thắc mắc hoặc yêu cầu làm rõ về Điều khoản sử dụng, vui lòng liên hệ trực tiếp với Chúng tôi:
            </p>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs sm:text-sm space-y-1 text-slate-700">
              <p><strong>CÔNG TY LUẬT TNHH ĐỨC TÍN VÀ CỘNG SỰ</strong></p>
              <p>Đoàn Luật sư Thành phố Hồ Chí Minh</p>
              <p>Trụ sở: Phòng 1901, Tầng 19, Saigon Trade Center, 37 Tôn Đức Thắng, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh</p>
              <p>Hotline: <a href="tel:0937863263" className="text-[#641D06] font-bold">093 786 32 63</a> • Email: <a href="mailto:rexmcg12345678@gmail.com" className="text-[#641D06] font-bold">rexmcg12345678@gmail.com</a></p>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
