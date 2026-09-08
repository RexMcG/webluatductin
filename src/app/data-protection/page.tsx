import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Chính Sách Bảo Vệ Dữ Liệu Cá Nhân | Công ty Luật TNHH Đức Tín & Cộng sự",
  description:
    "Chính sách bảo vệ dữ liệu cá nhân theo Nghị định 13/2023/NĐ-CP và Luật Luật sư tại Công ty Luật TNHH Đức Tín & Cộng sự (Luật sư Phan Đức Tín).",
  alternates: {
    canonical: "https://webluatductin.vercel.app/data-protection",
  },
};

export default function DataProtectionPage() {
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
            <span className="text-slate-900 font-medium">Bảo vệ dữ liệu cá nhân</span>
          </nav>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
            Chính Sách Bảo Vệ Dữ Liệu Cá Nhân
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            Công ty Luật TNHH Đức Tín &amp; Cộng sự • Tuân thủ Nghị định số 13/2023/NĐ-CP của Chính phủ
          </p>
        </div>
      </section>

      {/* Main Document Body */}
      <main className="max-w-4xl mx-auto px-4 md:px-8 pt-8">
        <div className="bg-white rounded-2xl p-6 sm:p-12 border border-slate-200 shadow-xs space-y-8 text-slate-800 leading-relaxed text-sm sm:text-base">
          
          {/* Lời mở đầu */}
          <div>
            <p className="leading-relaxed">
              <strong>Công ty Luật TNHH Đức Tín và Cộng sự</strong> (sau đây gọi tắt là <strong>&quot;Đức Tín &amp; Cộng sự&quot;</strong> hoặc <strong>&quot;Chúng tôi&quot;</strong>) cam kết tôn trọng tuyệt đối quyền riêng tư và bảo vệ an toàn dữ liệu cá nhân của mọi cá nhân, thân chủ, người truy cập website <strong>webluatductin.vercel.app</strong> và người gửi yêu cầu tư vấn pháp luật.
            </p>
            <p className="mt-3 leading-relaxed">
              Chính sách này được ban hành công khai nhằm minh bạch hóa cách thức Đức Tín &amp; Cộng sự thu thập, ghi nhận, phân tích, lưu trữ, sử dụng và bảo vệ dữ liệu cá nhân, phù hợp với quy định tại <strong>Nghị định số 13/2023/NĐ-CP</strong> về Bảo vệ Dữ liệu Cá nhân và nghĩa vụ giữ bí mật thông tin của luật sư theo <strong>Luật Luật sư</strong>.
            </p>
          </div>

          <hr className="border-slate-200" />

          {/* 1. ĐƠN VỊ KIỂM SOÁT VÀ XỬ LÝ DỮ LIỆU */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 uppercase">
              1. Đơn Vị Kiểm Soát Và Xử Lý Dữ Liệu Cá Nhân
            </h2>
            <div className="bg-slate-50 p-4 sm:p-5 rounded-xl border border-slate-200 space-y-1.5 text-xs sm:text-sm text-slate-700">
              <p><strong>CÔNG TY LUẬT TNHH ĐỨC TÍN VÀ CỘNG SỰ</strong></p>
              <p>Người đại diện theo pháp luật: <strong>Luật sư Phan Đức Tín</strong> (Giám đốc điều hành)</p>
              <p>Tổ chức chủ quản: Đoàn Luật sư Thành phố Hồ Chí Minh</p>
              <p>Địa chỉ trụ sở: Phòng 1901, Tầng 19, Saigon Trade Center, 37 Tôn Đức Thắng, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh</p>
              <p>Điện thoại liên hệ: <a href="tel:0937863263" className="text-[#641D06] font-bold">093 786 32 63</a></p>
              <p>Thư điện tử (Email): <a href="mailto:rexmcg12345678@gmail.com" className="text-[#641D06] font-bold">rexmcg12345678@gmail.com</a></p>
            </div>
          </section>

          {/* 2. PHẠM VI ÁP DỤNG */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 uppercase">
              2. Phạm Vi Áp Dụng
            </h2>
            <p>Chính sách này áp dụng đối với dữ liệu cá nhân được xử lý khi cá nhân:</p>
            <ul className="list-disc pl-6 space-y-1.5 text-slate-700">
              <li>Truy cập và tra cứu thông tin trên website webluatductin.vercel.app;</li>
              <li>Gửi yêu cầu liên hệ, biểu mẫu đặt lịch hẹn tư vấn trực tuyến;</li>
              <li>Tương tác, đặt câu hỏi sơ bộ với Trợ lý Luật sư AI hoặc tải biểu mẫu pháp lý;</li>
              <li>Liên hệ với Chúng tôi qua số điện thoại Hotline, Zalo OA, Email hoặc các kênh liên lạc chính thức khác;</li>
              <li>Cung cấp thông tin trong quá trình thẩm định vụ việc trước khi ký kết Hợp đồng dịch vụ pháp lý.</li>
            </ul>
          </section>

          {/* 3. CÁC LOẠI DỮ LIỆU CÁ NHÂN ĐƯỢC XỬ LÝ */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 uppercase">
              3. Phân Loại Dữ Liệu Cá Nhân Thu Thập
            </h2>
            <div className="space-y-3 text-slate-700">
              <div>
                <strong className="text-slate-900">a. Dữ liệu cá nhân cơ bản:</strong>
                <ul className="list-disc pl-6 mt-1 space-y-1">
                  <li>Họ và tên, giới tính;</li>
                  <li>Số điện thoại liên lạc, địa chỉ thư điện tử (email);</li>
                  <li>Địa chỉ cư trú hoặc địa chỉ doanh nghiệp (nếu người dùng cung cấp để luật sư gửi văn bản);</li>
                  <li>Thời gian yêu cầu cuộc hẹn và ghi chú tóm tắt nhu cầu tư vấn pháp lý.</li>
                </ul>
              </div>

              <div>
                <strong className="text-slate-900">b. Dữ liệu kỹ thuật &amp; nhật ký truy cập:</strong>
                <p className="mt-1">
                  Hệ thống ghi nhận địa chỉ IP, loại trình duyệt, thời điểm tương tác nhằm mục đích ngăn chặn hành vi spam, bảo đảm an toàn thông tin máy chủ và phòng chống tấn công mạng. Chúng tôi không sử dụng các công cụ theo dõi xâm nhập trái phép đời tư người dùng.
                </p>
              </div>

              <div>
                <strong className="text-slate-900">c. Lưu ý quan trọng về Dữ liệu cá nhân nhạy cảm:</strong>
                <p className="mt-1 text-amber-900 bg-amber-50 p-3 rounded-xl border border-amber-200 text-xs sm:text-sm">
                  ⚠️ Nội dung một vụ việc pháp lý có thể chứa dữ liệu cá nhân nhạy cảm (quan hệ hôn nhân gia đình, tình trạng tài chính, tài sản tranh chấp, hành vi bị cáo buộc trong tố tụng). Quý khách <strong>không nên gửi ảnh chụp Căn cước công dân, số tài khoản ngân hàng hoặc hồ sơ bệnh án qua biểu mẫu liên hệ mở</strong>. Luật sư sẽ hướng dẫn phương thức bàn giao hồ sơ bảo mật an toàn trực tiếp khi tiếp nhận chính thức.
                </p>
              </div>
            </div>
          </section>

          {/* 4. MỤC ĐÍCH XỬ LÝ DỮ LIỆU */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 uppercase">
              4. Mục Đích Xử Lý Dữ Liệu Cá Nhân
            </h2>
            <p>Đức Tín &amp; Cộng sự chỉ xử lý dữ liệu cá nhân trong phạm vi tối thiểu cần thiết cho các mục đích hợp pháp sau:</p>
            <ul className="list-disc pl-6 space-y-1.5 text-slate-700">
              <li>Tiếp nhận, xác nhận và phản hồi yêu cầu tư vấn, lịch hẹn làm việc với Luật sư;</li>
              <li>Kiểm tra sơ bộ điều kiện xung đột lợi ích theo Quy tắc Đạo đức và Ứng xử Nghề nghiệp Luật sư;</li>
              <li>Chuẩn bị đề xuất giải pháp pháp lý, thư báo phí hoặc dự thảo Hợp đồng dịch vụ pháp lý;</li>
              <li>Bảo đảm an toàn mạng, an ninh dữ liệu và khả năng vận hành ổn định của hệ thống Website;</li>
              <li>Thực hiện các nghĩa vụ báo cáo theo yêu cầu của cơ quan quản lý nhà nước có thẩm quyền theo quy định của pháp luật.</li>
            </ul>
            <p className="font-semibold text-slate-900">
              🛡️ Cam kết tuyệt đối: Chúng tôi không bao giờ bán, cho thuê hoặc chuyển nhượng dữ liệu cá nhân của Quý khách cho bất kỳ bên thứ ba nào vì mục đích quảng cáo thương mại.
            </p>
          </section>

          {/* 5. NGUYÊN TẮC VÀ CĂN CỨ XỬ LÝ DỮ LIỆU */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 uppercase">
              5. Nguyên Tắc &amp; Căn Cứ Pháp Lý Xử Lý Dữ Liệu
            </h2>
            <p>Hoạt động xử lý dữ liệu tại Đức Tín &amp; Cộng sự được thực hiện trên cơ sở:</p>
            <ul className="list-disc pl-6 space-y-1.5 text-slate-700">
              <li><strong>Sự đồng ý tự nguyện:</strong> Người dùng chủ động cung cấp thông tin tại các biểu mẫu và đồng ý để Chúng tôi liên lạc lại;</li>
              <li><strong>Nghĩa vụ pháp lý theo Luật Luật sư:</strong> Nghĩa vụ giữ bí mật thông tin thân chủ theo Điều 25 Luật Luật sư là nghĩa vụ bắt buộc, vô thời hạn;</li>
              <li><strong>Nguyên tắc hạn chế quyền tiếp cận:</strong> Chỉ có Luật sư phụ trách, trợ lý pháp lý được phân công trực tiếp mới được phép tiếp cận hồ sơ dữ liệu.</li>
            </ul>
          </section>

          {/* 6. THỜI GIAN LƯU TRỮ VÀ BIỆN PHÁP BẢO VỆ */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 uppercase">
              6. Thời Gian Lưu Trữ &amp; Biện Pháp An Toàn
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-slate-700">
              <li>
                <strong>Thời hạn lưu trữ:</strong> Đối với các yêu cầu tư vấn sơ bộ không dẫn đến việc giao kết hợp đồng, dữ liệu sẽ được lưu trữ tối đa 12 tháng kể từ lần tương tác cuối cùng để theo dõi lịch sử hỗ trợ, sau đó được xóa bỏ hoặc ẩn danh hóa an toàn. Đối với thân chủ ký kết hợp đồng, thời gian lưu giữ tuân thủ quy định về hồ sơ lưu trữ nghề nghiệp luật sư.
              </li>
              <li>
                <strong>Biện pháp kỹ thuật:</strong> Toàn bộ đường truyền dữ liệu giữa người dùng và Website được mã hóa bằng giao thức SSL/TLS (HTTPS) tiêu chuẩn cao. Hệ thống máy chủ được bảo vệ bởi tường lửa và các cơ chế giám sát an ninh mạng nghiêm ngặt.
              </li>
            </ul>
          </section>

          {/* 7. QUYỀN VÀ NGHĨA VỤ CỦA CHỦ THỂ DỮ LIỆU (ĐIỀU 9, 10 NGHỊ ĐỊNH 13) */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 uppercase">
              7. Quyền Của Chủ Thể Dữ Liệu
            </h2>
            <p>Theo quy định tại Điều 9 Nghị định 13/2023/NĐ-CP, Quý khách với tư cách là chủ thể dữ liệu có đầy đủ các quyền sau:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <strong>1. Quyền được biết:</strong> Được biết về hoạt động xử lý dữ liệu cá nhân của mình.
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <strong>2. Quyền đồng ý:</strong> Được đồng ý hoặc không đồng ý cho phép xử lý dữ liệu.
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <strong>3. Quyền truy cập:</strong> Được xem, chỉnh sửa hoặc yêu cầu cung cấp dữ liệu cá nhân.
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <strong>4. Quyền rút lại sự đồng ý:</strong> Được rút lại sự đồng ý đã đưa ra trước đó.
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <strong>5. Quyền yêu cầu xóa dữ liệu:</strong> Được yêu cầu xóa hoặc hủy dữ liệu khi không còn nhu cầu.
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <strong>6. Quyền khiếu nại, tố cáo:</strong> Được khiếu nại, khởi kiện theo quy định của pháp luật.
              </div>
            </div>
          </section>

          {/* 8. CÁCH THỨC THỰC HIỆN QUYỀN */}
          <section className="space-y-2 pt-2 border-t border-slate-200">
            <h2 className="text-base font-bold text-slate-900">
              8. Phương Thức Thực Hiện Quyền Của Chủ Thể Dữ Liệu
            </h2>
            <p className="text-sm text-slate-700">
              Để thực hiện các quyền yêu cầu tra cứu, hiệu chỉnh hoặc xóa dữ liệu cá nhân của mình, Quý khách vui lòng gửi văn bản hoặc thư điện tử về cho Chúng tôi theo thông tin tiếp nhận:
            </p>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs sm:text-sm space-y-1 text-slate-700">
              <p><strong>Bộ phận Tiếp nhận &amp; Bảo vệ Dữ liệu - Công ty Luật TNHH Đức Tín &amp; Cộng sự</strong></p>
              <p>Địa chỉ: Phòng 1901, Tầng 19, Saigon Trade Center, 37 Tôn Đức Thắng, Q.1, TP. Hồ Chí Minh</p>
              <p>Email tiếp nhận yêu cầu: <a href="mailto:rexmcg12345678@gmail.com" className="text-[#641D06] font-bold">rexmcg12345678@gmail.com</a></p>
              <p>Hotline hỗ trợ: <a href="tel:0937863263" className="text-[#641D06] font-bold">093 786 32 63</a></p>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
