import type { Metadata } from "next";
import Link from "next/link";
import { getCanonicalUrl, SITE_CONFIG } from "@/config/site";

export const metadata: Metadata = {
  title: "Tuyên Bố Từ Chối Trách Nhiệm | Công ty Luật TNHH Đức Tín & Cộng sự",
  description:
    "Tuyên bố từ chối trách nhiệm pháp lý đối với thông tin, biểu mẫu và công cụ tiện ích trên website Công ty Luật TNHH Đức Tín & Cộng sự (Ls. Phan Đức Tín).",
  alternates: {
    canonical: getCanonicalUrl("/disclaimer"),
  },
};

export default function DisclaimerPage() {
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
            <span className="text-slate-900 font-medium">Tuyên bố từ chối trách nhiệm</span>
          </nav>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
            Tuyên Bố Từ Chối Trách Nhiệm
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            Công ty Luật TNHH Đức Tín &amp; Cộng sự • Áp dụng cho toàn bộ nội dung xuất bản trực tuyến
          </p>
        </div>
      </section>

      {/* Main Document Body */}
      <main className="max-w-4xl mx-auto px-4 md:px-8 pt-8">
        <div className="bg-white rounded-2xl p-6 sm:p-12 border border-slate-200 shadow-xs space-y-8 text-slate-800 leading-relaxed text-sm sm:text-base">
          
          {/* Lời mở đầu */}
          <div className="border-l-4 border-amber-600 bg-amber-50/50 p-4 sm:p-5 rounded-r-2xl">
            <p className="font-bold text-[#641D06] uppercase tracking-wider text-xs sm:text-sm">
              LƯU Ý PHÁP LÝ QUAN TRỌNG:
            </p>
            <p className="mt-2 text-slate-700 leading-relaxed">
              Trang web này và toàn bộ nội dung xuất bản trên tên miền <strong>{SITE_CONFIG.domain}</strong> (bao gồm bài viết chuyên môn, bản tin án lệ, thư viện biểu mẫu pháp lý, tiện ích tính toán và Trợ lý Luật sư AI) được cung cấp với mục đích duy nhất là phổ biến kiến thức pháp luật và mang tính chất thông tin tham khảo chung.
            </p>
          </div>

          <hr className="border-slate-200" />

          {/* I. KHÔNG CẤU THÀNH Ý KIẾN TƯ VẤN PHÁP LÝ CHÍNH THỨC */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 uppercase">
              I. Không Cấu Thành Ý Kiến Tư Vấn Pháp Lý Chính Thức
            </h2>
            <p>
              Các bài viết phân tích quy định pháp luật, câu trả lời do hệ thống Trợ lý Luật sư AI cung cấp hoặc các bảng tính án phí/thuế/lương trên Website:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700">
              <li>
                <strong>Không được coi là ý kiến tư vấn pháp lý chính thức:</strong> Các thông tin này không thay thế cho việc đánh giá hồ sơ chuyên sâu, phân tích chứng cứ và đưa ra phương án giải quyết vụ việc cụ thể của một Luật sư có chứng chỉ hành nghề độc lập.
              </li>
              <li>
                <strong>Không xác lập quan hệ Luật sư - Thân chủ:</strong> Việc người dùng truy cập Website, gửi câu hỏi hoặc trao đổi sơ bộ qua biểu mẫu liên hệ không tạo lập bất kỳ nghĩa vụ đại diện tố tụng hoặc cam kết bảo đảm kết quả vụ án nào từ phía Đức Tín &amp; Cộng sự cho đến khi hai bên ký kết Hợp đồng dịch vụ pháp lý chính thức.
              </li>
            </ul>
          </section>

          {/* II. TÍNH CHẤT BIẾN ĐỘNG CỦA HỆ THỐNG VĂN BẢN PHÁP LUẬT */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 uppercase">
              II. Tính Chất Biến Động Của Hệ Thống Văn Bản Pháp Luật
            </h2>
            <p>
              Hệ thống pháp luật Việt Nam thường xuyên được sửa đổi, bổ sung, bãi bỏ hoặc thay thế bởi các văn bản quy phạm pháp luật mới của Quốc hội, Chính phủ và các Bộ ngành.
            </p>
            <p>
              Mặc dù đội ngũ Luật sư của Đức Tín &amp; Cộng sự luôn nỗ lực cập nhật kịp thời các chính sách pháp lý mới nhất, Chúng tôi không cam đoan hoặc bảo đảm tuyệt đối rằng mọi thông tin, biểu mẫu hoặc văn bản đăng tải tại một thời điểm nhất định là phù hợp hoàn toàn với quy định pháp luật mới nhất vừa được ban hành. Người dùng nên tham vấn trực tiếp với luật sư trước khi đưa ra bất kỳ quyết định pháp lý hoặc hành động thực tế nào.
            </p>
          </section>

          {/* III. MIỄN TRỪ ĐỐI VỚI VIỆC SỬ DỤNG BIỂU MẪU & CÔNG CỤ TÍNH TOÁN */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 uppercase">
              III. Sử Dụng Biểu Mẫu Pháp Lý &amp; Công Cụ Tiện Ích
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-slate-700">
              <li>
                <strong>Biểu mẫu tải về:</strong> Hơn 2.600 văn bản và biểu mẫu trong Thư viện biểu mẫu là các văn bản định dạng chuẩn mẫu ban hành kèm theo Nghị định, Thông tư hoặc biểu mẫu mẫu dùng trong thực tiễn. Do tính chất đặc thù của từng quan hệ hợp đồng hoặc giao dịch dân sự, người sử dụng phải tự chịu trách nhiệm về việc điền nội dung và rà soát các điều khoản thỏa thuận cụ thể. Đức Tín &amp; Cộng sự không chịu trách nhiệm đối với các tranh chấp phát sinh từ việc người dùng tự ý áp dụng biểu mẫu mà không có sự kiểm tra chuyên môn.
              </li>
              <li>
                <strong>Công cụ tính án phí &amp; thuế TNCN:</strong> Kết quả trả về từ công cụ tính toán tự động dựa trên các thông số do người dùng tự nhập liệu và các hệ số quy định chung. Kết quả này mang tính chất ước tính chi phí tham khảo, số liệu thực tế tại Tòa án hoặc Cơ quan Thuế có thể thay đổi tùy thuộc vào phán quyết phân chia nghĩa vụ nộp án phí hoặc các điều kiện miễn giảm đặc biệt.
              </li>
            </ul>
          </section>

          {/* IV. LIÊN KẾT ĐẾN CÁC TRANG WEB BÊN THỨ BA */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 uppercase">
              IV. Liên Kết Đến Các Website Bên Thứ Ba
            </h2>
            <p>
              Website có thể chứa các đường dẫn siêu liên kết (hyperlink) trỏ tới các trang web của cơ quan nhà nước, cổng dịch vụ công trực tuyến, bản đồ Google Maps hoặc nền tảng mạng xã hội (Zalo, Facebook).
            </p>
            <p>
              Các liên kết này chỉ nhằm mục đích tạo sự thuận tiện cho người tra cứu. Đức Tín &amp; Cộng sự không kiểm soát, không chứng thực và không chịu bất kỳ trách nhiệm nào về nội dung, tính an toàn hoặc chính sách bảo mật của các trang web bên thứ ba đó.
            </p>
          </section>

          {/* V. GIỚI HẠN TRÁCH NHIỆM PHÁP LÝ TỐI ĐA */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 uppercase">
              V. Giới Hạn Trách Nhiệm Pháp Lý Tối Đa
            </h2>
            <p>
              Trong phạm vi tối đa được pháp luật Việt Nam cho phép, Công ty Luật TNHH Đức Tín &amp; Cộng sự, các luật sư thành viên, luật sư cộng tác và nhân viên sẽ không chịu trách nhiệm đối với bất kỳ tổn thất, thiệt hại trực tiếp, gián tiếp, ngẫu nhiên hoặc hệ quả nào (bao gồm thiệt hại do mất cơ hội kinh doanh, thiệt hại tài sản hoặc tổn thất chi phí) phát sinh từ việc:
            </p>
            <ol className="list-decimal pl-6 space-y-1.5 text-slate-700">
              <li>Người dùng tin tưởng hoặc áp dụng các thông tin, biểu mẫu tham khảo trên Website mà không có sự tư vấn trực tiếp từ luật sư;</li>
              <li>Sự gián đoạn truy cập, lỗi đường truyền internet, virus máy tính hoặc các sự cố kỹ thuật ngoài tầm kiểm soát hợp lý của Chúng tôi.</li>
            </ol>
          </section>

          {/* VI. KHUYẾN NGHỊ THAM VẤN TRỰC TIẾP */}
          <section className="bg-slate-50 p-5 rounded-xl border border-slate-200 text-slate-700 space-y-2">
            <h3 className="font-bold text-slate-900 text-base">
              Khuyến Nghị Tư Vấn Trực Tiếp Với Luật Sư
            </h3>
            <p className="text-xs sm:text-sm leading-relaxed">
              Mỗi vụ việc pháp lý đều có tình tiết và hồ sơ chứng cứ riêng biệt. Để bảo vệ tối đa quyền và lợi ích hợp pháp của mình, Quý khách vui lòng liên hệ trực tiếp với <strong>Luật sư Phan Đức Tín</strong> để được thẩm định hồ sơ và cung cấp giải pháp pháp lý toàn diện, bảo đảm tính pháp lý chặt chẽ theo luật định.
            </p>
            <div className="pt-2 flex flex-wrap gap-4 text-xs sm:text-sm font-bold">
              <span>Hotline 24/7: <a href="tel:0937863263" className="text-emerald-700 hover:underline">093 786 32 63</a></span>
              <span>Đặt lịch hẹn: <Link href="/appointment" className="text-[#641D06] hover:underline">Đặt lịch trực tuyến 1:1</Link></span>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
