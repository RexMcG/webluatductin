import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Chính Sách Bảo Mật Thông Tin Khách Hàng & Dữ Liệu Cá Nhân",
  description:
    "Chính sách bảo mật thông tin khách hàng và bảo vệ dữ liệu cá nhân tại Công ty Luật TNHH Đức Tín và Cộng sự theo Nghị định 13/2023/NĐ-CP và Luật Luật sư.",
  alternates: {
    canonical: "https://webluatductin.vercel.app/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-amber-900/10 via-amber-900/5 to-transparent pt-14 pb-10 border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs md:text-sm text-slate-500 font-semibold mb-6">
            <Link href="/" className="hover:text-emerald-700 transition-colors">
              Trang chủ
            </Link>
            <span>/</span>
            <span className="text-slate-900 font-bold">Chính sách bảo mật</span>
          </nav>

          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-4">
              <span className="material-symbols-outlined text-[16px]">verified_user</span>
              Bảo Mật Tuyệt Đối Theo Quy Định Pháp Luật
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 font-sans tracking-tight mb-4 uppercase leading-tight">
              Chính Sách Bảo Mật Thông Tin &amp; Dữ Liệu Cá Nhân
            </h1>
            <p className="text-sm md:text-base text-slate-600 leading-relaxed">
              Áp dụng tại <strong>Công ty Luật TNHH Đức Tín và Cộng sự</strong> (DUC TIN &amp; PARTNERS).<br className="hidden sm:inline" />
              Cập nhật và hiệu lực từ ngày <strong>01/01/2026</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Body */}
      <main className="max-w-5xl mx-auto px-4 md:px-8 pt-10">
        <div className="bg-white rounded-3xl p-6 sm:p-12 border border-slate-200 shadow-sm space-y-10 text-slate-700 leading-relaxed">
          
          {/* Box Cam kết Danh dự */}
          <div className="bg-amber-50/70 border-l-4 border-[#641D06] p-6 rounded-2xl">
            <h2 className="font-bold text-[#641D06] text-lg mb-2 flex items-center gap-2">
              <span className="material-symbols-outlined text-2xl">gavel</span>
              TÔN CHỈ BẢO MẬT CỦA CÔNG TY LUẬT ĐỨC TÍN VÀ CỘNG SỰ
            </h2>
            <p className="text-sm text-slate-700 leading-relaxed">
              "Bí mật thông tin của khách hàng là <strong>Danh dự và Nghĩa vụ pháp lý tối thượng</strong> của Luật sư theo quy định tại <strong>Điều 25 Luật Luật sư</strong> và <strong>Quy tắc Đạo đức nghề nghiệp Luật sư Việt Nam</strong>. Mọi thông tin, tài liệu vụ việc, nội dung trao đổi hoặc dữ liệu cá nhân mà quý khách cung cấp đều được chúng tôi bảo vệ ở cấp độ an toàn cao nhất."
            </p>
          </div>

          {/* Điều 1: Căn cứ pháp lý */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2.5 pb-2 border-b border-slate-100">
              <span className="w-8 h-8 rounded-xl bg-[#641D06] text-white flex items-center justify-center text-sm font-bold shrink-0">
                1
              </span>
              Căn Cứ Pháp Lý Áp Dụng
            </h2>
            <p className="text-sm sm:text-base">
              Chính sách bảo mật này được xây dựng và tuân thủ nghiêm ngặt theo các văn bản quy phạm pháp luật hiện hành của nước Cộng hòa Xã hội Chủ nghĩa Việt Nam:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-sm sm:text-base text-slate-600">
              <li><strong>Luật Luật sư số 65/2006/QH11</strong> (được sửa đổi, bổ sung bởi Luật số 20/2012/QH13) – Quy định về quyền và nghĩa vụ giữ bí mật thông tin của luật sư;</li>
              <li><strong>Nghị định số 13/2023/NĐ-CP</strong> ngày 17/04/2023 của Chính phủ về Bảo vệ Dữ liệu Cá nhân (PDPD);</li>
              <li><strong>Luật An ninh mạng số 24/2018/QH14</strong>;</li>
              <li><strong>Luật Giao dịch điện tử số 20/2023/QH15</strong> (có hiệu lực từ 01/07/2024);</li>
              <li><strong>Bộ Quy tắc Đạo đức và Ứng xử Nghề nghiệp Luật sư Việt Nam</strong> do Liên đoàn Luật sư Việt Nam ban hành.</li>
            </ul>
          </section>

          {/* Điều 2: Các loại dữ liệu thu thập */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2.5 pb-2 border-b border-slate-100">
              <span className="w-8 h-8 rounded-xl bg-[#641D06] text-white flex items-center justify-center text-sm font-bold shrink-0">
                2
              </span>
              Phạm Vi Dữ Liệu Thu Thập
            </h2>
            <p className="text-sm sm:text-base">
              Chúng tôi chỉ thu thập các dữ liệu thực sự cần thiết để phục vụ cho việc cung cấp dịch vụ pháp lý và giải đáp thắc mắc của khách hàng:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
                <h3 className="font-bold text-slate-900 text-base mb-2 flex items-center gap-2">
                  <span className="material-symbols-outlined text-amber-700 text-lg">person</span>
                  Dữ liệu định danh &amp; Liên hệ
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Họ và tên, Số điện thoại (Hotline/Zalo), Địa chỉ email, Địa chỉ cư trú hoặc trụ sở doanh nghiệp khi khách hàng gửi biểu mẫu đặt lịch hẹn hoặc yêu cầu tư vấn.
                </p>
              </div>

              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
                <h3 className="font-bold text-slate-900 text-base mb-2 flex items-center gap-2">
                  <span className="material-symbols-outlined text-amber-700 text-lg">folder_open</span>
                  Dữ liệu hồ sơ vụ việc pháp lý
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Tóm tắt nội dung tranh chấp, tài liệu hợp đồng, giấy tờ nhà đất, chứng cứ vụ án do khách hàng tự nguyện cung cấp để luật sư nghiên cứu thẩm định.
                </p>
              </div>

              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
                <h3 className="font-bold text-slate-900 text-base mb-2 flex items-center gap-2">
                  <span className="material-symbols-outlined text-amber-700 text-lg">smart_toy</span>
                  Dữ liệu tương tác Trợ lý AI &amp; Biểu mẫu
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Lịch sử câu hỏi pháp luật gửi đến Trợ lý AI, văn bản biểu mẫu tải về từ Thư viện Biểu mẫu hoặc tải lên công cụ Kiểm tra Biểu mẫu. Dữ liệu được mã hóa và ẩn danh hóa an toàn.
                </p>
              </div>

              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
                <h3 className="font-bold text-slate-900 text-base mb-2 flex items-center gap-2">
                  <span className="material-symbols-outlined text-amber-700 text-lg">devices</span>
                  Dữ liệu kỹ thuật &amp; Trình duyệt
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Địa chỉ IP, loại trình duyệt, thời gian truy cập (Cookie phiên làm việc phục vụ duy trì giao diện và tốc độ tải trang, không theo dõi định danh cá nhân ngoài ý muốn).
                </p>
              </div>
            </div>
          </section>

          {/* Điều 3: Mục đích xử lý dữ liệu */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2.5 pb-2 border-b border-slate-100">
              <span className="w-8 h-8 rounded-xl bg-[#641D06] text-white flex items-center justify-center text-sm font-bold shrink-0">
                3
              </span>
              Mục Đích Xử Lý &amp; Sử Dụng Dữ Liệu
            </h2>
            <p className="text-sm sm:text-base">
              Dữ liệu của quý khách chỉ được sử dụng cho các mục đích hợp pháp sau:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-sm sm:text-base text-slate-600">
              <li>Xác nhận lịch hẹn tư vấn và liên hệ trực tiếp giữa Luật sư Phan Đức Tín / đội ngũ luật sư với khách hàng;</li>
              <li>Thực hiện các dịch vụ tư vấn pháp luật, soạn thảo văn bản, tham gia tố tụng và đại diện ngoài tố tụng theo Hợp đồng Dịch vụ Pháp lý;</li>
              <li>Cung cấp kết quả tính toán tự động (Án phí Tòa án, Lương Gross sang Net, Thuế TNCN);</li>
              <li>Nâng cao chất lượng phản hồi pháp lý của Trợ lý AI và ngăn chặn các hành vi tấn công, lạm dụng hệ thống mạng.</li>
            </ul>
          </section>

          {/* Điều 4: Cam kết không chia sẻ & Bảo mật */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2.5 pb-2 border-b border-slate-100">
              <span className="w-8 h-8 rounded-xl bg-[#641D06] text-white flex items-center justify-center text-sm font-bold shrink-0">
                4
              </span>
              Cam Kết Tuyệt Đối Không Chia Sẻ Dữ Liệu Cho Bên Thứ Ba
            </h2>
            <p className="text-sm sm:text-base">
              Công ty Luật TNHH Đức Tín và Cộng sự <strong>TUYỆT ĐỐI KHÔNG</strong> bán, cho thuê, thương mại hóa hay tiết lộ thông tin của quý khách cho bất kỳ bên thứ ba nào vì mục đích quảng cáo hoặc tiếp thị.
            </p>
            <p className="text-sm sm:text-base">
              Thông tin chỉ được cung cấp trong các trường hợp đặc biệt sau:
            </p>
            <ul className="list-disc pl-6 space-y-1.5 text-sm sm:text-base text-slate-600">
              <li>Có sự đồng ý bằng văn bản rõ ràng của chính khách hàng;</li>
              <li>Cung cấp cho cơ quan tiến hành tố tụng (Tòa án, Viện kiểm sát, Cơ quan điều tra) theo đúng trình tự và quyết định theo quy định của pháp luật.</li>
            </ul>
          </section>

          {/* Điều 5: Quyền của Khách hàng (Chủ thể dữ liệu) */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2.5 pb-2 border-b border-slate-100">
              <span className="w-8 h-8 rounded-xl bg-[#641D06] text-white flex items-center justify-center text-sm font-bold shrink-0">
                5
              </span>
              Quyền Của Chủ Thể Dữ Liệu Theo Nghị Định 13/2023/NĐ-CP
            </h2>
            <p className="text-sm sm:text-base">
              Theo quy định của pháp luật Việt Nam, quý khách có đầy đủ các quyền sau đối với dữ liệu cá nhân của mình:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-700 pt-1">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <strong>1. Quyền được biết:</strong> Được thông báo về hoạt động xử lý dữ liệu cá nhân của mình.
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <strong>2. Quyền đồng ý &amp; Rút lại:</strong> Cho phép hoặc rút lại sự đồng ý xử lý dữ liệu bất kỳ lúc nào.
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <strong>3. Quyền truy cập &amp; Chỉnh sửa:</strong> Xem và yêu cầu đính chính dữ liệu không chính xác.
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <strong>4. Quyền xóa dữ liệu:</strong> Yêu cầu xóa vĩnh viễn dữ liệu cá nhân khỏi hệ thống lưu trữ.
              </div>
            </div>
          </section>

          {/* Điều 6: Biện pháp kỹ thuật bảo vệ */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2.5 pb-2 border-b border-slate-100">
              <span className="w-8 h-8 rounded-xl bg-[#641D06] text-white flex items-center justify-center text-sm font-bold shrink-0">
                6
              </span>
              Biện Pháp Kỹ Thuật &amp; An Ninh Thông Tin
            </h2>
            <p className="text-sm sm:text-base">
              Toàn bộ hạ tầng website được trang bị các tiêu chuẩn bảo mật điện toán tiên tiến:
            </p>
            <ul className="list-disc pl-6 space-y-1.5 text-sm sm:text-base text-slate-600">
              <li>Mã hóa toàn bộ lưu lượng dữ liệu truyền tải bằng giao thức bảo mật <strong>SSL/TLS (HTTPS) 256-bit</strong>;</li>
              <li>Cơ sở dữ liệu lưu trữ đám mây được phân quyền bảo vệ nhiều lớp, tường lửa chống DDoS và sao lưu định kỳ;</li>
              <li>Quy trình quản trị nội bộ: Chỉ các luật sư và chuyên viên pháp lý có thẩm quyền trực tiếp xử lý hồ sơ mới được phép tiếp cận tài liệu của khách hàng.</li>
            </ul>
          </section>

          {/* Điều 7: Đầu mối liên hệ bảo vệ dữ liệu */}
          <section className="space-y-4 pt-4 border-t border-slate-200">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-xl bg-[#641D06] text-white flex items-center justify-center text-sm font-bold shrink-0">
                7
              </span>
              Thông Tin Đầu Mối Tiếp Nhận Yêu Cầu Bảo Mật
            </h2>
            <p className="text-sm sm:text-base">
              Mọi thắc mắc, phản ánh hoặc yêu cầu thực thi các quyền về dữ liệu cá nhân (chỉnh sửa, xóa dữ liệu, khiếu nại), quý khách vui lòng liên hệ trực tiếp:
            </p>

            <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl space-y-3">
              <div className="text-amber-400 font-bold text-xs uppercase tracking-widest">
                ĐƠN VỊ KIỂM SOÁT VÀ XỬ LÝ DỮ LIỆU CÁ NHÂN
              </div>
              <h3 className="text-xl font-bold text-white">
                CÔNG TY LUẬT TNHH ĐỨC TÍN VÀ CỘNG SỰ
              </h3>
              <div className="space-y-1.5 text-sm text-slate-300">
                <p>👤 <strong>Người đại diện phụ trách:</strong> Luật sư Phan Đức Tín – Giám đốc Điều hành</p>
                <p>📞 <strong>Hotline/Zalo tiếp nhận:</strong> <a href="tel:0937863263" className="text-amber-300 hover:underline font-bold">093 786 32 63</a></p>
                <p>📧 <strong>Email pháp lý:</strong> <a href="mailto:rexmcg12345678@gmail.com" className="text-amber-300 hover:underline">rexmcg12345678@gmail.com</a></p>
                <p>📍 <strong>Trụ sở chính:</strong> Thành phố Hồ Chí Minh, Việt Nam</p>
              </div>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
