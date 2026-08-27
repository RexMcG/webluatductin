import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Chính Sách Bảo Mật Thông Tin & Dữ Liệu Cá Nhân",
  description:
    "Chính sách bảo mật thông tin khách hàng và bảo vệ dữ liệu cá nhân tại Công ty Luật TNHH Đức Tín và Cộng sự theo Nghị định 13/2023/NĐ-CP và Luật Luật sư.",
  alternates: {
    canonical: "https://webluatductin.vercel.app/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
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
            <span className="text-slate-900 font-medium">Chính sách bảo mật</span>
          </nav>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
            Chính Sách Bảo Mật Thông Tin &amp; Dữ Liệu Cá Nhân
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            Công ty Luật TNHH Đức Tín và Cộng sự • Cập nhật lần cuối: Ngày 01 tháng 01 năm 2026
          </p>
        </div>
      </section>

      {/* Main Document Body */}
      <main className="max-w-4xl mx-auto px-4 md:px-8 pt-8">
        <div className="bg-white rounded-2xl p-6 sm:p-12 border border-slate-200 shadow-xs space-y-8 text-slate-800 leading-relaxed text-sm sm:text-base">
          
          {/* Lời mở đầu */}
          <div>
            <p className="leading-relaxed">
              Công ty Luật TNHH Đức Tín và Cộng sự (sau đây gọi tắt là <strong>"Đức Tín &amp; Cộng sự"</strong> hoặc <strong>"Chúng tôi"</strong>) cam kết bảo vệ tuyệt đối bí mật thông tin và quyền riêng tư đối với dữ liệu cá nhân của Quý khách hàng, thân chủ và người dùng truy cập website <strong>webluatductin.vercel.app</strong>.
            </p>
            <p className="mt-3 leading-relaxed">
              Văn bản này công khai mục đích, phạm vi thu thập, phương thức xử lý và các biện pháp bảo mật nhằm bảo đảm quyền và lợi ích hợp pháp của Quý khách hàng theo quy định của pháp luật Việt Nam.
            </p>
          </div>

          <hr className="border-slate-200" />

          {/* I. CĂN CỨ PHÁP LÝ */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 uppercase">
              I. Căn Cứ Pháp Lý
            </h2>
            <p>
              Chính sách bảo mật này được xây dựng trên cơ sở tuân thủ đầy đủ các văn bản quy phạm pháp luật hiện hành:
            </p>
            <ul className="list-disc pl-6 space-y-1.5 text-slate-700">
              <li><strong>Luật Luật sư số 65/2006/QH11</strong> (sửa đổi, bổ sung năm 2012) – Điều 25 về Bí mật thông tin của khách hàng;</li>
              <li><strong>Nghị định số 13/2023/NĐ-CP</strong> ngày 17/04/2023 của Chính phủ về Bảo vệ Dữ liệu Cá nhân;</li>
              <li><strong>Luật An ninh mạng số 24/2018/QH14</strong>;</li>
              <li><strong>Luật Giao dịch điện tử số 20/2023/QH15</strong> (có hiệu lực từ 01/07/2024);</li>
              <li><strong>Bộ Quy tắc Đạo đức và Ứng xử Nghề nghiệp Luật sư Việt Nam</strong> do Liên đoàn Luật sư Việt Nam ban hành.</li>
            </ul>
          </section>

          {/* II. NGUYÊN TẮC BẢO MẬT NGHỀ NGHIỆP LUẬT SƯ */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 uppercase">
              II. Nguyên Tắc Giữ Bí Mật Thông Tin Khách Hàng
            </h2>
            <p>
              Theo quy định của Luật Luật sư và Đạo đức nghề nghiệp, bí mật thông tin là nghĩa vụ pháp lý và danh dự nghề nghiệp bắt buộc:
            </p>
            <ol className="list-decimal pl-6 space-y-1.5 text-slate-700">
              <li>Luật sư và nhân viên của Đức Tín &amp; Cộng sự không được tiết lộ thông tin về vụ việc, về khách hàng mà mình biết được trong khi hành nghề, trừ trường hợp được khách hàng đồng ý bằng văn bản hoặc pháp luật có quy định khác.</li>
              <li>Nghĩa vụ giữ bí mật thông tin của luật sư có giá trị vĩnh viễn, kể cả sau khi đã chấm dứt hợp đồng dịch vụ pháp lý với khách hàng.</li>
            </ol>
          </section>

          {/* III. PHẠM VI DỮ LIỆU THU THẬP */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 uppercase">
              III. Phạm Vi Dữ Liệu Thu Thập
            </h2>
            <p>
              Chúng tôi chỉ thu thập các thông tin cần thiết phục vụ cho việc liên hệ tư vấn, đặt lịch hẹn và cung cấp dịch vụ pháp lý:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700">
              <li>
                <strong>Thông tin định danh và liên hệ:</strong> Họ và tên, số điện thoại, địa chỉ email, địa chỉ liên lạc hoặc thông tin doanh nghiệp do Quý khách cung cấp tại các biểu mẫu đặt hẹn, liên hệ tư vấn.
              </li>
              <li>
                <strong>Nội dung hồ sơ, vụ việc:</strong> Tóm tắt tình trạng tranh chấp, nhu cầu tư vấn pháp lý, tài liệu hoặc văn bản đính kèm do Quý khách tự nguyện cung cấp để luật sư thẩm định.
              </li>
              <li>
                <strong>Dữ liệu tương tác tính năng trực tuyến:</strong> Câu hỏi gửi đến Trợ lý AI, văn bản tra cứu biểu mẫu hoặc tính toán án phí, lương Gross-Net. Dữ liệu này được xử lý phục vụ phiên làm việc và ẩn danh hóa an toàn.
              </li>
              <li>
                <strong>Dữ liệu kỹ thuật:</strong> Địa chỉ IP, loại trình duyệt, nhật ký truy cập nhằm duy trì tính ổn định và an ninh của hệ thống máy chủ website.
              </li>
            </ul>
          </section>

          {/* IV. MỤC ĐÍCH SỬ DỤNG THÔNG TIN */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 uppercase">
              IV. Mục Đích Xử Lý Thông Tin
            </h2>
            <p>
              Dữ liệu của Quý khách chỉ được sử dụng cho các mục đích cụ thể sau:
            </p>
            <ul className="list-disc pl-6 space-y-1.5 text-slate-700">
              <li>Xác nhận lịch hẹn làm việc trực tiếp hoặc tư vấn trực tuyến với Luật sư;</li>
              <li>Thực hiện các công việc tư vấn pháp luật, soạn thảo văn bản, đại diện hoặc tham gia tố tụng theo Hợp đồng Dịch vụ Pháp lý;</li>
              <li>Phản hồi các yêu cầu giải đáp thắc mắc pháp luật của Quý khách;</li>
              <li>Duy trì an ninh, ngăn chặn các hành vi gian lận hoặc tấn công hệ thống mạng.</li>
            </ul>
          </section>

          {/* V. CAM KẾT KHÔNG CHIA SẺ CHO BÊN THỨ BA */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 uppercase">
              V. Cam Kết Không Chuyển Giao Dữ Liệu
            </h2>
            <p>
              Đức Tín &amp; Cộng sự cam kết <strong>không bán, không cho thuê và không chia sẻ</strong> dữ liệu cá nhân của Quý khách cho bất kỳ bên thứ ba nào vì mục đích thương mại hoặc tiếp thị.
            </p>
            <p>
              Thông tin chỉ được cung cấp trong các trường hợp sau:
            </p>
            <ul className="list-disc pl-6 space-y-1.5 text-slate-700">
              <li>Được sự đồng ý rõ ràng bằng văn bản của chính Quý khách hàng;</li>
              <li>Theo yêu cầu chính thức bằng văn bản của cơ quan nhà nước có thẩm quyền (Tòa án, Viện kiểm sát, Cơ quan điều tra) theo đúng trình tự pháp luật.</li>
            </ul>
          </section>

          {/* VI. QUYỀN CỦA CHỦ THỂ DỮ LIỆU */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 uppercase">
              VI. Quyền Của Khách Hàng Đối Với Dữ Liệu Cá Nhân
            </h2>
            <p>
              Căn cứ theo Nghị định số 13/2023/NĐ-CP, Quý khách với tư cách là chủ thể dữ liệu có đầy đủ các quyền:
            </p>
            <ul className="list-disc pl-6 space-y-1.5 text-slate-700">
              <li><strong>Quyền được biết:</strong> Được thông báo về hoạt động thu thập và xử lý dữ liệu của mình;</li>
              <li><strong>Quyền đồng ý và rút lại sự đồng ý:</strong> Cho phép hoặc yêu cầu dừng xử lý dữ liệu bất kỳ lúc nào;</li>
              <li><strong>Quyền truy cập và chỉnh sửa:</strong> Yêu cầu tra cứu, đính chính các thông tin chưa chính xác;</li>
              <li><strong>Quyền xóa dữ liệu:</strong> Yêu cầu xóa bỏ vĩnh viễn thông tin cá nhân khỏi hệ thống lưu trữ của chúng tôi;</li>
              <li><strong>Quyền khiếu nại, phản ánh:</strong> Đưa ra phản ánh hoặc khiếu nại về việc bảo vệ dữ liệu cá nhân.</li>
            </ul>
          </section>

          {/* VII. BIỆN PHÁP AN TOÀN KỸ THUẬT */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 uppercase">
              VII. Biện Pháp An Ninh &amp; Bảo Mật Kỹ Thuật
            </h2>
            <p>
              Hệ thống website của chúng tôi áp dụng các tiêu chuẩn an toàn thông tin:
            </p>
            <ul className="list-disc pl-6 space-y-1.5 text-slate-700">
              <li>Mã hóa toàn bộ đường truyền dữ liệu bằng giao thức SSL/TLS (HTTPS) 256-bit;</li>
              <li>Cơ sở dữ liệu lưu trữ đám mây được bảo vệ nhiều lớp tường lửa, phân quyền truy cập nghiêm ngặt và sao lưu định kỳ;</li>
              <li>Chỉ nhân sự pháp lý được phân công phụ trách vụ việc mới được quyền tiếp cận hồ sơ của khách hàng.</li>
            </ul>
          </section>

          {/* VIII. THÔNG TIN LIÊN HỆ BẢO MẬT */}
          <section className="space-y-3 pt-4 border-t border-slate-200">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 uppercase">
              VIII. Đầu Mối Tiếp Nhận Yêu Cầu Bảo Mật
            </h2>
            <p>
              Mọi thắc mắc, đề nghị thực thi quyền đối với dữ liệu cá nhân hoặc phản ánh về bảo mật thông tin, Quý khách vui lòng liên hệ:
            </p>
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 text-sm space-y-1.5 text-slate-700">
              <p><strong>CÔNG TY LUẬT TNHH ĐỨC TÍN VÀ CỘNG SỰ (DUC TIN &amp; PARTNERS)</strong></p>
              <p>Người phụ trách: Luật sư Phan Đức Tín – Giám đốc Điều hành</p>
              <p>Hotline: <a href="tel:0937863263" className="text-[#641D06] font-semibold hover:underline">093 786 32 63</a></p>
              <p>Email: <a href="mailto:rexmcg12345678@gmail.com" className="text-[#641D06] hover:underline">rexmcg12345678@gmail.com</a></p>
              <p>Địa chỉ: Thành phố Hồ Chí Minh, Việt Nam</p>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
