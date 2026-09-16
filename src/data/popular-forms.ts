export interface StandardFormItem {
  id: number;
  title: string;
  category: string;
  description: string;
  content: string;
  matchPercent?: number;
  fileUrl?: string;
  createdAt?: string;
}

export const POPULAR_FORMS: StandardFormItem[] = [
  // 1. HÔN NHÂN & GIA ĐÌNH
  {
    id: 1,
    title: "Đơn yêu cầu công nhận thuận tình ly hôn, nuôi con và chia tài sản",
    category: "Hôn nhân & Gia đình",
    description: "Mẫu đơn chuẩn Tòa án nhân dân dành cho hai vợ chồng đồng thuận chấm dứt quan hệ hôn nhân, thỏa thuận quyền trực tiếp nuôi con và phân chia tài sản chung.",
    content: `Kính gửi: TÒA ÁN NHÂN DÂN QUẬN/HUYỆN ................................................................

Người yêu cầu thứ nhất:
- Họ và tên: ............................................................ Sinh năm: ....................
- CCCD số: ................................. Cấp ngày: ................ Nơi cấp: ................
- Địa chỉ thường trú: ................................................................................

Người yêu cầu thứ hai:
- Họ và tên: ............................................................ Sinh năm: ....................
- CCCD số: ................................. Cấp ngày: ................ Nơi cấp: ................
- Địa chỉ thường trú: ................................................................................

NỘI DUNG YÊU CẦU CÔNG NHẬN THUẬN TÌNH LY HÔN:
1. Về quan hệ hôn nhân: Chúng tôi tự nguyện kết hôn và đăng ký tại UBND ......................................... ngày ...../...../......... Sau thời gian chung sống, do bất đồng quan điểm sống sâu sắc, mục đích hôn nhân không đạt được nên hai bên thống nhất xin thuận tình ly hôn.
2. Về con chung: Hai bên có ..... con chung gồm:
- Cháu: ................................................... Sinh ngày: ...../...../.........
Thỏa thuận giao cháu cho ........................................ trực tiếp chăm sóc, nuôi dưỡng. Nghĩa vụ cấp dưỡng: ................................................................................
3. Về tài sản chung và nợ chung: Hai bên tự thỏa thuận phân chia, không yêu cầu Tòa án giải quyết.`,
    matchPercent: 98,
    fileUrl: "/uploads/forms/don-yeu-cau-cong-nhan-thuan-tinh-ly-hon.docx",
    createdAt: "2026-03-01T08:00:00.000Z",
  },
  {
    id: 2,
    title: "Đơn khởi kiện ly hôn đơn phương (Tranh chấp quyền nuôi con & Tài sản)",
    category: "Hôn nhân & Gia đình",
    description: "Mẫu đơn khởi kiện đơn phương ly hôn chuẩn Tòa án nhân dân khi một bên vợ/chồng không đồng thuận hoặc bạo lực gia đình, yêu cầu giành quyền nuôi con và chia tài sản.",
    content: `Kính gửi: TÒA ÁN NHÂN DÂN ................................................................................

Người khởi kiện:
- Họ và tên: ............................................................ Sinh năm: ....................
- CCCD số: ................................. Cấp ngày: ................ Nơi cấp: ................
- Địa chỉ thường trú: ................................................................................

Người bị kiện:
- Họ và tên: ............................................................ Sinh năm: ....................
- CCCD số: ................................. Cấp ngày: ................ Nơi cấp: ................
- Địa chỉ thường trú: ................................................................................

NỘI DUNG KHỞI KIỆN ĐƠN PHƯƠNG LY HÔN:
1. Về tình cảm vợ chồng: Chúng tôi kết hôn ngày ...../...../......... có đăng ký kết hôn hợp pháp. Quá trình chung sống phát sinh nhiều mâu thuẫn trầm trọng, không thể hòa giải.
2. Về con chung: Yêu cầu Tòa án giao con chung là cháu ........................................ cho tôi trực tiếp nuôi dưỡng và yêu cầu người bị kiện cấp dưỡng ..... VNĐ/tháng.
3. Về tài sản chung: Yêu cầu Tòa án phân chia tài sản chung gồm nhà đất và các khoản tiền gửi theo quy định pháp luật.`,
    matchPercent: 96,
    fileUrl: "/uploads/forms/don-khoi-kien-ly-hon-don-phuong.docx",
    createdAt: "2026-03-02T08:00:00.000Z",
  },
  {
    id: 3,
    title: "Văn bản cam kết thỏa thuận tài sản riêng của vợ/chồng",
    category: "Hôn nhân & Gia đình",
    description: "Văn bản công chứng thỏa thuận xác định rõ bất động sản, tiền gửi ngân hàng là tài sản riêng của một bên, không nhập vào khối tài sản chung vợ chồng.",
    content: `CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
Độc lập - Tự do - Hạnh phúc

VĂN BẢN CAM KẾT TÀI SẢN RIÊNG CỦA VỢ/CHỒNG

Hôm nay, ngày ...../...../........., tại ................................................................
Tôi là: ............................................................ Sinh năm: ....................
CCCD số: ................................. do Công an ................................. cấp ngày ...../...../.........
Đăng ký thường trú tại: ................................................................................
Là chồng/vợ của bà/ông: ............................................................

BẰNG VĂN BẢN NÀY, TÔI XIN CAM ĐOAN VÀ KHẲNG ĐỊNH:
Quyền sử dụng đất và quyền sở hữu nhà ở tại thửa đất số ....., tờ bản đồ số ....., địa chỉ: ........................................................ theo Giấy chứng nhận quyền sử dụng đất số ................................. do UBND ................................. cấp ngày ...../...../......... hoàn toàn là TÀI SẢN RIÊNG của vợ/chồng tôi.
Tôi không có bất kỳ đóng góp nào và từ chối mọi quyền lợi đối với tài sản nêu trên.`,
    matchPercent: 94,
    fileUrl: "/uploads/forms/van-ban-cam-ket-tai-san-rieng.docx",
    createdAt: "2026-03-03T08:00:00.000Z",
  },
  {
    id: 4,
    title: "Bản tự khai về quan hệ hôn nhân, con chung và cấp dưỡng ly hôn",
    category: "Hôn nhân & Gia đình",
    description: "Bản tự khai chi tiết gửi Thẩm phán giải quyết vụ án ly hôn, trình bày nguyện vọng nuôi dưỡng con nhỏ và điều kiện kinh tế của người cha/mẹ.",
    content: `TÒA ÁN NHÂN DÂN ................................................................

BẢN TỰ KHAI CỦA ĐƯƠNG SỰ

Tên tôi là: ............................................................ Sinh năm: ....................
CCCD số: ................................. Cấp ngày: ................ Nơi cấp: ................
Địa chỉ thường trú: ................................................................................
Là đương sự trong vụ án hôn nhân và gia đình thụ lý số: ...../...../TLST-HNGĐ.

NỘI DUNG TỰ KHAI:
1. Về nguyên nhân mâu thuẫn: ................................................................................
2. Về con chung và điều kiện chăm sóc: Bản thân tôi có công việc và thu nhập ổn định ..... VNĐ/tháng, đảm bảo môi trường phát triển toàn diện cho con.
3. Kính đề nghị Quý Tòa giao quyền nuôi con cho tôi và buộc đối phương cấp dưỡng định kỳ hàng tháng.`,
    matchPercent: 91,
    fileUrl: "/uploads/forms/ban-tu-khai-ly-hon.docx",
    createdAt: "2026-03-04T08:00:00.000Z",
  },
  {
    id: 5,
    title: "Giấy ủy quyền nộp hồ sơ đăng ký kết hôn / Trích lục hộ tịch",
    category: "Hôn nhân & Gia đình",
    description: "Mẫu văn bản ủy quyền người thân thực hiện thủ tục trích lục giấy đăng ký kết hôn, giấy khai sinh hoặc nộp hồ sơ hộ tịch tại UBND.",
    content: `GIẤY ỦY QUYỀN TRÍCH LỤC HỘ TỊCH

Người ủy quyền: .................................................... Sinh năm: ....................
CCCD số: ................................. Địa chỉ: ........................................................

Người được ủy quyền: ............................................ Sinh năm: ....................
CCCD số: ................................. Địa chỉ: ........................................................

NỘI DUNG ỦY QUYỀN:
Bên được ủy quyền đại diện nộp hồ sơ và nhận kết quả trích lục Giấy chứng nhận kết hôn / Giấy khai sinh tại UBND ................................................................................`,
    matchPercent: 88,
    fileUrl: "/uploads/forms/giay-uy-quyen-ho-tich.docx",
    createdAt: "2026-03-05T08:00:00.000Z",
  },

  // 2. ĐẤT ĐAI & HỢP ĐỒNG
  {
    id: 6,
    title: "Hợp đồng thuê nhà ở / Mặt bằng kinh doanh thương mại",
    category: "Đất đai & Hợp đồng",
    description: "Hợp đồng thuê nhà và mặt bằng chặt chẽ, đầy đủ điều khoản đặt cọc, thời hạn thanh toán, bàn giao hiện trạng, bảo toàn quyền lợi bên cho thuê và bên thuê.",
    content: `HỢP ĐỒNG THUÊ NHÀ Ở VÀ MẶT BẰNG KINH DOANH

BÊN CHO THUÊ (BÊN A):
- Ông/Bà: ............................................................ Sinh năm: ....................
- CCCD số: ................................. Cấp ngày: ................ Nơi cấp: ................
- Địa chỉ: ............................................................................................

BÊN THUÊ (BÊN B):
- Ông/Bà / Tổ chức: .................................................. Mã số thuế / CCCD: ....................
- Đại diện bởi: ....................................................... Chức vụ: ....................

HAI BÊN THỐNG NHẤT KÝ KẾT CÁC ĐIỀU KHOẢN SAU:
Điều 1: Đối tượng hợp đồng
Bên A đồng ý cho Bên B thuê toàn bộ căn nhà/mặt bằng tại địa chỉ: .................................................................
Diện tích sử dụng: ........... m2.
Điều 2: Thời hạn thuê và mục đích sử dụng
- Thời hạn thuê là ..... năm, bắt đầu từ ngày ...../...../......... đến ngày ...../...../.........
- Mục đích: Làm nhà ở kết hợp văn phòng / kinh doanh thương mại.
Điều 3: Giá thuê và phương thức thanh toán
- Giá thuê: ........................................ VNĐ/tháng.
- Tiền đặt cọc bảo đảm hợp đồng: ........................................ VNĐ.
- Phương thức thanh toán: Chuyển khoản ngân hàng định kỳ vào ngày ..... hàng tháng.`,
    matchPercent: 97,
    fileUrl: "/uploads/forms/hop-dong-thue-nha-kinh-doanh.docx",
    createdAt: "2026-03-06T08:00:00.000Z",
  },
  {
    id: 7,
    title: "Hợp đồng chuyển nhượng quyền sử dụng đất và tài sản gắn liền với đất",
    category: "Đất đai & Hợp đồng",
    description: "Mẫu hợp đồng mua bán nhà đất chuẩn công chứng, bảo vệ quyền lợi về pháp lý quy hoạch, thanh toán và sang tên sổ đỏ sổ hồng an toàn.",
    content: `HỢP ĐỒNG CHUYỂN NHƯỢNG QUYỀN SỬ DỤNG ĐẤT VÀ TÀI SẢN GẮN LIỀN VỚI ĐẤT

BÊN CHUYỂN NHƯỢNG (BÊN A):
- Ông/Bà: ............................................................ Sinh năm: ....................
- CCCD số: ................................. Cấp ngày: ................ Nơi cấp: ................
- Cùng vợ/chồng là Bà/Ông: ................................................................................

BÊN NHẬN CHUYỂN NHƯỢNG (BÊN B):
- Ông/Bà: ............................................................ Sinh năm: ....................
- CCCD số: ................................. Cấp ngày: ................ Nơi cấp: ................

CÁC BÊN THỐNG NHẤT THỎA THUẬN VÀ KÝ KẾT HỢP ĐỒNG VỚI NỘI DUNG SAU:
Điều 1: Thửa đất chuyển nhượng
- Thửa đất số: ........... Tờ bản đồ số: ...........
- Địa chỉ thửa đất: ..........................................................................................
- Diện tích: ........... m2. Hình thức sử dụng: Sử dụng riêng.
- Giấy chứng nhận QSDĐ số: ................................. do UBND ................................. cấp ngày ...../...../.........
Điều 2: Giá chuyển nhượng và thanh toán
- Giá chuyển nhượng: ........................................ VNĐ.
- Đợt 1: Đặt cọc ..... VNĐ ngay sau khi ký hợp đồng.
- Đợt 2: Thanh toán số tiền còn lại tại Phòng Công chứng sau khi ký công chứng hợp đồng.`,
    matchPercent: 96,
    fileUrl: "/uploads/forms/hop-dong-chuyen-nhuong-nha-dat.docx",
    createdAt: "2026-03-07T08:00:00.000Z",
  },
  {
    id: 8,
    title: "Hợp đồng đặt cọc mua bán, chuyển nhượng nhà đất chuẩn pháp lý",
    category: "Đất đai & Hợp đồng",
    description: "Hợp đồng đặt cọc mua nhà đất có điều khoản phạt cọc rõ ràng, thời hạn ra công chứng và cam kết hiện trạng quy hoạch không tranh chấp.",
    content: `HỢP ĐỒNG ĐẶT CỌC CHUYỂN NHƯỢNG BẤT ĐỘNG SẢN

Bên đặt cọc (Bên A): ............................................ CCCD: ....................
Bên nhận đặt cọc (Bên B): .................................... CCCD: ....................

NỘI DUNG ĐẶT CỌC:
1. Bên A đặt cọc số tiền: ........................................ VNĐ để đảm bảo mua thửa đất số ..... tại ........................................................
2. Thời hạn đặt cọc: Trong vòng ..... ngày, hai bên có mặt tại Văn phòng công chứng để ký hợp đồng chính thức.
3. Chế tài vi phạm: Nếu Bên B không bán thì phải trả lại tiền cọc và bồi thường gấp đôi số tiền cọc cho Bên A.`,
    matchPercent: 93,
    fileUrl: "/uploads/forms/hop-dong-dat-coc-nha-dat.docx",
    createdAt: "2026-03-08T08:00:00.000Z",
  },
  {
    id: 9,
    title: "Đơn đề nghị cấp đổi, cấp lại Giấy chứng nhận quyền sử dụng đất (Sổ đỏ)",
    category: "Đất đai & Hợp đồng",
    description: "Mẫu đơn nộp Văn phòng Đăng ký đất đai yêu cầu cấp lại Giấy chứng nhận quyền sử dụng đất do bị mất, rách nát hoặc thay đổi thông tin căn cước.",
    content: `CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
Độc lập - Tự do - Hạnh phúc

ĐƠN ĐỀ NGHỊ CẤP LẠI GIẤY CHỨNG NHẬN QUYỀN SỬ DỤNG ĐẤT

Kính gửi: VĂN PHÒNG ĐĂNG KÝ ĐẤT ĐAI ................................................................

1. Người sử dụng đất: .................................................... CCCD số: ....................
2. Thông tin thửa đất: Thửa đất số: ....., tờ bản đồ: ..... tại địa chỉ: ................................................................
3. Lý do xin cấp lại: Giấy chứng nhận bị mất / rách nát không sử dụng được. Tôi cam đoan Giấy chứng nhận không cầm cố, thế chấp hay chuyển nhượng trái phép.`,
    matchPercent: 90,
    fileUrl: "/uploads/forms/don-cap-doi-so-do.docx",
    createdAt: "2026-03-09T08:00:00.000Z",
  },
  {
    id: 10,
    title: "Đơn yêu cầu hòa giải tranh chấp đất đai tại UBND cấp xã/phường",
    category: "Đất đai & Hợp đồng",
    description: "Đơn bắt buộc theo Luật Đất đai để yêu cầu UBND phường/xã tổ chức hòa giải cơ sở trước khi khởi kiện ra Tòa án nhân dân.",
    content: `Kính gửi: ỦY BAN NHÂN DÂN XÃ/PHƯỜNG ................................................................

Người làm đơn: ........................................................ CCCD: .................... Địa chỉ: ........................................................
Người bị tranh chấp: ................................................ Địa chỉ: ........................................................

NỘI DUNG TRANH CHẤP:
Tranh chấp ranh giới thửa đất liền kề tại ................................................................
Kính đề nghị UBND tổ chức hòa giải cơ sở theo đúng Điều 236 Luật Đất đai để giải quyết dứt điểm mâu thuẫn ranh giới đất.`,
    matchPercent: 88,
    fileUrl: "/uploads/forms/don-hoa-giai-tranh-chap-dat-dai.docx",
    createdAt: "2026-03-10T08:00:00.000Z",
  },

  // 3. DOANH NGHIỆP & THƯƠNG MẠI
  {
    id: 11,
    title: "Điều lệ công ty trách nhiệm hữu hạn hai thành viên trở lên chuẩn Luật Doanh nghiệp",
    category: "Doanh nghiệp & Đầu tư",
    description: "Bộ điều lệ công ty đầy đủ các quy định về tỷ lệ vốn góp, quyền biểu quyết, thẩm quyền của Hội đồng thành viên và chuyển nhượng phần vốn.",
    content: `ĐIỀU LỆ CÔNG TY TNHH HAI THÀNH VIÊN TRỞ LÊN

Tên công ty: CÔNG TY TNHH ................................................................
Vốn điều lệ: ........................................ VNĐ.
Gồm các điều khoản chuẩn hóa về cơ cấu quản trị, cuộc họp Hội đồng thành viên, quyền lợi và nghĩa vụ của các thành viên sáng lập theo Luật Doanh nghiệp 2020.`,
    matchPercent: 95,
    fileUrl: "/uploads/forms/dieu-le-cong-ty-tnhh.docx",
    createdAt: "2026-03-11T08:00:00.000Z",
  },
  {
    id: 12,
    title: "Hợp đồng hợp tác kinh doanh (BCC) giữa các nhà đầu tư",
    category: "Doanh nghiệp & Đầu tư",
    description: "Hợp đồng góp vốn liên doanh, phân chia lợi nhuận và nghĩa vụ tài chính theo quy định Luật Đầu tư mà không thành lập pháp nhân mới.",
    content: `HỢP ĐỒNG HỢP TÁC KINH DOANH (BCC)

Các bên tham gia: Bên A và Bên B.
Điều 1: Mục đích hợp tác đầu tư dự án ................................................................
Điều 2: Tỷ lệ góp vốn: Bên A góp .....% (tương đương ..... VNĐ), Bên B góp .....% (tương đương ..... VNĐ).
Điều 3: Phân chia doanh thu, lợi nhuận và chịu rủi ro tương ứng theo tỷ lệ vốn góp.`,
    matchPercent: 93,
    fileUrl: "/uploads/forms/hop-dong-hop-tac-kinh-doanh.docx",
    createdAt: "2026-03-12T08:00:00.000Z",
  },
  {
    id: 13,
    title: "Biên bản họp Đại hội đồng cổ đông / Hội đồng thành viên thông qua tăng vốn điều lệ",
    category: "Doanh nghiệp & Đầu tư",
    description: "Mẫu biên bản họp và Nghị quyết chuẩn thông qua phương án phát hành thêm cổ phần hoặc tiếp nhận thành viên góp vốn mới.",
    content: `BIÊN BẢN HỌP HỘI ĐỒNG THÀNH VIÊN
CÔNG TY TNHH ................................................................

Thời gian: ..... giờ ..... ngày ...../...../.........
Địa điểm: Trụ sở chính công ty.
Nội dung: Thảo luận và biểu quyết thông qua việc tăng vốn điều lệ công ty từ ........................ VNĐ lên ........................ VNĐ.`,
    matchPercent: 91,
    fileUrl: "/uploads/forms/bien-ban-hop-tang-von.docx",
    createdAt: "2026-03-13T08:00:00.000Z",
  },

  // 4. LAO ĐỘNG & TIỀN LƯƠNG
  {
    id: 14,
    title: "Hợp đồng lao động xác định thời hạn (Chuẩn Bộ luật Lao động mới nhất)",
    category: "Lao động & Tiền lương",
    description: "Mẫu hợp đồng lao động chuẩn hóa theo Bộ luật Lao động 2019, quy định rõ ràng tiền lương, bảo hiểm xã hội, thời giờ làm việc và bảo mật thông tin.",
    content: `HỢP ĐỒNG LAO ĐỘNG

NGƯỜI SỬ DỤNG LAO ĐỘNG (BÊN A):
- Công ty: ............................................................................................
- Mã số doanh nghiệp: ................................. Đại diện bởi: .................................... Chức vụ: ....................

NGƯỜI LAO ĐỘNG (BÊN B):
- Ông/Bà: ............................................................ Sinh năm: ....................
- Số CCCD: ................................. Cấp ngày: ................ Nơi cấp: ................
- Trình độ chuyên môn: ................................................................................

HAI BÊN THỎA THUẬN KÝ KẾT HỢP ĐỒNG LAO ĐỘNG VỚI CÁC ĐIỀU KHOẢN SAU:
Điều 1: Thời hạn và công việc hợp đồng
- Loại hợp đồng lao động: Xác định thời hạn ..... tháng (từ ngày ...../...../......... đến ngày ...../...../.........).
- Vị trí/Chức danh chuyên môn: ................................................................................
- Địa điểm làm việc: ..........................................................................................
Điều 2: Chế độ làm việc và tiền lương
- Thời giờ làm việc: 8 giờ/ngày, từ thứ Hai đến thứ Sáu (nghỉ thứ Bảy, Chủ nhật).
- Mức lương chính: ........................................ VNĐ/tháng.
- Các khoản phụ cấp, thưởng theo kết quả kinh doanh và quy chế công ty.
- Được đóng đầy đủ BHXH, BHYT, BHTN theo quy định pháp luật hiện hành.`,
    matchPercent: 97,
    fileUrl: "/uploads/forms/hop-dong-lao-dong-chuan.docx",
    createdAt: "2026-03-14T08:00:00.000Z",
  },
  {
    id: 15,
    title: "Hợp đồng thử việc và thỏa thuận bảo mật thông tin, không cạnh tranh (NDA)",
    category: "Lao động & Tiền lương",
    description: "Mẫu hợp đồng thử việc kèm phụ lục bảo mật bí mật kinh doanh, cam kết không làm việc cho đối thủ cạnh tranh sau khi nghỉ việc.",
    content: `HỢP ĐỒNG THỬ VIỆC VÀ THỎA THUẬN BẢO MẬT (NDA)

1. Thời gian thử việc: 60 ngày đối với vị trí chuyên môn kỹ thuật cao.
2. Mức lương thử việc: 85% lương chính thức = ........................................ VNĐ/tháng.
3. Cam kết bảo mật thông tin (NDA): Người lao động cam đoan không tiết lộ dữ liệu khách hàng, mã nguồn, bí quyết kinh doanh của Công ty trong và sau khi chấm dứt hợp đồng.`,
    matchPercent: 93,
    fileUrl: "/uploads/forms/hop-dong-thu-viec-nda.docx",
    createdAt: "2026-03-15T08:00:00.000Z",
  },

  // 5. TỐ TỤNG & TRANH CHẤP
  {
    id: 16,
    title: "Đơn khởi kiện vụ án dân sự chuẩn mẫu Nghị quyết số 01/2017/NQ-HĐTP",
    category: "Tố tụng & Khởi kiện",
    description: "Mẫu đơn khởi kiện chuẩn Tòa án tối cao bắt buộc cho tất cả các tranh chấp hợp đồng kinh tế, vay nợ, bồi thường thiệt hại ngoài hợp đồng.",
    content: `CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
Độc lập - Tự do - Hạnh phúc

ĐƠN KHỞI KIỆN DÂN SỰ
(Mẫu số 23-DS ban hành kèm theo Nghị quyết số 01/2017/NQ-HĐTP)

Kính gửi: TÒA ÁN NHÂN DÂN ................................................................

Người khởi kiện: .................................................... CCCD: ....................
Người bị kiện: ........................................................ CCCD: ....................

NỘI DUNG KHỞI KIỆN:
Yêu cầu Tòa án giải quyết buộc Người bị kiện phải hoàn trả số tiền gốc và lãi quá hạn theo Hợp đồng vay tài sản ký ngày ...../...../......... với tổng số tiền là ........................................ VNĐ.`,
    matchPercent: 98,
    fileUrl: "/uploads/forms/don-khoi-kien-dan-su-chuan.docx",
    createdAt: "2026-03-16T08:00:00.000Z",
  },
  {
    id: 17,
    title: "Mẫu số 08/UQ-QTT-TNCN: Giấy ủy quyền quyết toán thuế thu nhập cá nhân",
    category: "Thuế & Tài chính",
    description: "Mẫu giấy ủy quyền chuẩn của Tổng cục Thuế để người lao động ủy quyền cho công ty quyết toán thuế TNCN cuối năm thay mình.",
    content: `MẪU SỐ 08/UQ-QTT-TNCN
(Ban hành kèm theo Thông tư số 80/2021/TT-BTC)

GIẤY ỦY QUYỀN QUYẾT TOÁN THUẾ THU NHẬP CÁ NHÂN

Kính gửi: TỔ CHỨC TRẢ THU NHẬP ................................................................
Tên tôi là: ............................................................ Mã số thuế: ....................
Ủy quyền cho Công ty quyết toán thuế TNCN thay tôi đối với thu nhập phát sinh trong năm tính thuế theo đúng quy định.`,
    matchPercent: 92,
    fileUrl: "/uploads/forms/mau-08-uq-qtt-tncn.docx",
    createdAt: "2026-03-17T08:00:00.000Z",
  }
];
