"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { formLibraryService, FormItem } from "@/services/form-library.service";
import { formLeadService } from "@/services/form-lead.service";
import { exportFormToDoc } from "@/utils/form-exporter";

// Curated standard Vietnamese legal templates fallback & initial library (25+ chuẩn biểu mẫu)
const POPULAR_FORMS: FormItem[] = [
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
  },
  {
    id: 11,
    title: "Hợp đồng mua bán căn hộ chung cư thương mại",
    category: "Đất đai & Hợp đồng",
    description: "Hợp đồng mua bán căn hộ chung cư chi tiết về diện tích thông thủy, thời hạn bàn giao sổ hồng và phí quản lý vận hành tòa nhà.",
    content: `HỢP ĐỒNG MUA BÁN CĂN HỘ CHUNG CƯ

Bên Bán: ................................................................
Bên Mua: ................................................................

Nội dung: Mua bán Căn hộ số: ..... Tầng: ..... Tòa nhà: ........................................
Diện tích sử dụng căn hộ (thông thủy): .......... m2.
Giá bán: ........................................ VNĐ. Tiến độ thanh toán và bàn giao Giấy chứng nhận sở hữu.`,
    matchPercent: 86,
  },

  // 3. LAO ĐỘNG & TIỀN LƯƠNG
  {
    id: 12,
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
  },
  {
    id: 13,
    title: "Hợp đồng lao động không xác định thời hạn cho nhân sự chủ chốt",
    category: "Lao động & Tiền lương",
    description: "Hợp đồng lao động dài hạn dành cho cấp quản lý, chuyên gia với các điều khoản bảo hiểm cao cấp, thưởng KPI và lộ trình phát triển.",
    content: `HỢP ĐỒNG LAO ĐỘNG KHÔNG XÁC ĐỊNH THỜI HẠN

Đại diện Doanh nghiệp: ........................................ Chức vụ: Giám đốc Điều hành
Người lao động: .................................................... Chức danh: Trưởng bộ phận / Chuyên viên cao cấp

Điều khoản cam kết: Hợp đồng có hiệu lực không xác định thời hạn kể từ ngày ký. Mức lương gross: ........................................ VNĐ/tháng, đóng bảo hiểm đầy đủ và hưởng các gói phúc lợi mở rộng.`,
    matchPercent: 95,
  },
  {
    id: 14,
    title: "Hợp đồng thử việc và thỏa thuận bảo mật thông tin, không cạnh tranh (NDA)",
    category: "Lao động & Tiền lương",
    description: "Mẫu hợp đồng thử việc kèm phụ lục bảo mật bí mật kinh doanh, cam kết không làm việc cho đối thủ cạnh tranh sau khi nghỉ việc.",
    content: `HỢP ĐỒNG THỬ VIỆC VÀ THỎA THUẬN BẢO MẬT (NDA)

1. Thời gian thử việc: 60 ngày đối với vị trí chuyên môn kỹ thuật cao.
2. Mức lương thử việc: 85% lương chính thức = ........................................ VNĐ/tháng.
3. Cam kết bảo mật thông tin (NDA): Người lao động cam đoan không tiết lộ dữ liệu khách hàng, mã nguồn, bí quyết kinh doanh của Công ty trong và sau khi chấm dứt hợp đồng.`,
    matchPercent: 93,
  },
  {
    id: 15,
    title: "Quyết định chấm dứt hợp đồng lao động và biên bản thanh lý quyền lợi",
    category: "Lao động & Tiền lương",
    description: "Văn bản quyết định cho người lao động thôi việc đúng trình tự luật định, thanh toán phép năm còn lại và chốt sổ bảo hiểm xã hội.",
    content: `QUYẾT ĐỊNH CHẤM DỨT HỢP ĐỒNG LAO ĐỘNG

GIÁM ĐỐC CÔNG TY QUYẾT ĐỊNH:
Điều 1: Cho Ông/Bà: .................................................... thôi việc kể từ ngày ...../...../.........
Điều 2: Bộ phận Kế toán thanh toán lương, tiền phép năm chưa nghỉ và chốt trả sổ BHXH đầy đủ trong vòng 14 ngày làm việc.`,
    matchPercent: 90,
  },
  {
    id: 16,
    title: "Đơn xin nghỉ việc hưởng chế độ thai sản / ốm đau bảo hiểm xã hội",
    category: "Lao động & Tiền lương",
    description: "Mẫu đơn xin nghỉ thai sản 6 tháng hoặc nghỉ chăm con ốm đau gửi Phòng Nhân sự để hoàn tất hồ sơ giải quyết trợ cấp BHXH.",
    content: `CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
Độc lập - Tự do - Hạnh phúc

ĐƠN XIN NGHỈ VIỆC HƯỞNG CHẾ ĐỘ THAI SẢN

Kính gửi: BAN GIÁM ĐỐC & PHÒNG HÀNH CHÍNH NHÂN SỰ
Tôi tên: ................................................................ Vị trí: ........................................
Đề nghị được nghỉ thai sản từ ngày ...../...../......... đến ngày ...../...../......... (đủ 06 tháng) và đề nghị Công ty làm thủ tục hưởng trợ cấp thai sản theo Luật BHXH.`,
    matchPercent: 88,
  },

  // 4. TỐ TỤNG & KHỞI KIỆN
  {
    id: 17,
    title: "Đơn khởi kiện vụ án dân sự (Mẫu số 23-DS chuẩn Hội đồng Thẩm phán TANDTC)",
    category: "Tố tụng & Khởi kiện",
    description: "Mẫu đơn khởi kiện giải quyết tranh chấp hợp đồng, nợ vay, quyền tài sản đúng chuẩn Nghị quyết 01/2017/NQ-HĐTP của Tòa án nhân dân Tối cao.",
    content: `Kính gửi: TÒA ÁN NHÂN DÂN ................................................................................

Người khởi kiện: .................................................... Sinh năm: ....................
CCCD số: ................................. Ngày cấp: ................ Nơi cấp: ................
Địa chỉ thường trú: ................................................................................

Người bị kiện: ........................................................ Sinh năm: ....................
Địa chỉ: ............................................................................................

Người có quyền lợi, nghĩa vụ liên quan (nếu có): ....................................................

NỘI DUNG KHỞI KIỆN:
1. Tóm tắt quá trình phát sinh tranh chấp: ................................................................................
2. Yêu cầu Tòa án giải quyết những vấn đề sau:
- Buộc người bị kiện phải thanh toán số tiền gốc: ........................................ VNĐ và tiền lãi phát sinh.
3. Danh mục tài liệu, chứng cứ kèm theo đơn khởi kiện: Hợp đồng vay, sao kê ngân hàng, CCCD...`,
    matchPercent: 98,
  },
  {
    id: 18,
    title: "Đơn khởi kiện tranh chấp hợp đồng kinh doanh thương mại & Thu hồi nợ",
    category: "Tố tụng & Khởi kiện",
    description: "Đơn khởi kiện của doanh nghiệp đòi tiền nợ mua bán hàng hóa, phạt vi phạm hợp đồng 8% và yêu cầu bồi thường thiệt hại kinh tế.",
    content: `Kính gửi: TÒA ÁN NHÂN DÂN CÓ THẨM QUYỀN

Nguyên đơn: CÔNG TY ................................................................ Đại diện bởi: ....................
Bị đơn: CÔNG TY .................................................................... Địa chỉ trụ sở: ....................

YÊU CẦU KHỞI KIỆN:
1. Buộc Bị đơn thanh toán nợ gốc tiền hàng: ........................................ VNĐ.
2. Buộc thanh toán lãi chậm trả theo lãi suất nợ quá hạn ngân hàng và phạt vi phạm hợp đồng 8%.`,
    matchPercent: 96,
  },
  {
    id: 19,
    title: "Bản tự khai của đương sự trong vụ án dân sự tại Tòa án",
    category: "Tố tụng & Khởi kiện",
    description: "Mẫu bản tự khai chính thức gửi Tòa án trình bày toàn bộ sự thật khách quan và chứng cứ bảo vệ quyền lợi hợp pháp.",
    content: `TÒA ÁN NHÂN DÂN ................................................................

BẢN TỰ KHAI

Tôi là: .................................................... Tư cách đương sự: Nguyên đơn / Bị đơn
Địa chỉ: ............................................................................................
Nội dung tự khai: Tôi xin trình bày diễn biến sự việc như sau... Kính đề nghị Quý Tòa bảo vệ quyền lợi chính đáng của tôi.`,
    matchPercent: 92,
  },
  {
    id: 20,
    title: "Đơn yêu cầu áp dụng biện pháp khẩn cấp tạm thời (Kê biên, phong tỏa tài sản)",
    category: "Tố tụng & Khởi kiện",
    description: "Mẫu đơn yêu cầu Thẩm phán phong tỏa tài khoản ngân hàng hoặc kê biên bất động sản của đối phương tránh tẩu tán tài sản trước xét xử.",
    content: `Kính gửi: TÒA ÁN NHÂN DÂN ĐANG THỤ LÝ VỤ ÁN

Người yêu cầu: ................................................................................
YÊU CẦU ÁP DỤNG BIỆN PHÁP KHẨN CẤP TẠM THỜI:
Phong tỏa tài khoản số ................................. mở tại Ngân hàng ................................. của Bị đơn để ngăn ngừa hành vi tẩu tán tài sản trốn tránh nghĩa vụ thi hành án.`,
    matchPercent: 90,
  },
  {
    id: 21,
    title: "Đơn kháng cáo bản án / Quyết định sơ thẩm của Tòa án nhân dân",
    category: "Tố tụng & Khởi kiện",
    description: "Mẫu đơn nộp trong thời hạn 15 ngày kháng cáo lên Tòa án cấp Phúc thẩm xem xét lại bản án sơ thẩm không đúng quy định pháp luật.",
    content: `Kính gửi: TÒA ÁN NHÂN DÂN CẤP PHÚC THẨM

Người kháng cáo: ................................................................
NỘI DUNG KHÁNG CÁO:
Kháng cáo toàn bộ / một phần Bản án dân sự sơ thẩm số: ...../...../DS-ST ngày ...../...../......... của TAND ................................. Lý do: Tòa án cấp sơ thẩm đánh giá chứng cứ chưa khách quan, vi phạm tố tụng.`,
    matchPercent: 88,
  },

  // 5. HÀNH CHÍNH & DOANH NGHIỆP
  {
    id: 22,
    title: "Giấy ủy quyền giải quyết công việc / Đại diện pháp lý",
    category: "Hành chính & Dân sự",
    description: "Văn bản ủy quyền thay mặt cá nhân hoặc tổ chức liên hệ cơ quan nhà nước, đối tác để thực hiện các thủ tục hành chính, ký kết hồ sơ hợp lệ.",
    content: `GIẤY ỦY QUYỀN

BÊN ỦY QUYỀN (BÊN A):
- Họ và tên: ............................................................ Sinh năm: ....................
- Số CCCD: ................................. Cấp ngày: ................ Nơi cấp: ................
- Địa chỉ thường trú: ................................................................................

BÊN ĐƯỢC ỦY QUYỀN (BÊN B):
- Họ và tên: ............................................................ Sinh năm: ....................
- Số CCCD: ................................. Cấp ngày: ................ Nơi cấp: ................
- Địa chỉ thường trú: ................................................................................

NỘI DUNG ỦY QUYỀN:
Bên A đồng ý ủy quyền cho Bên B thay mặt Bên A thực hiện các công việc: Nộp, nhận hồ sơ và ký các biên bản làm việc tại cơ quan có thẩm quyền.`,
    matchPercent: 96,
  },
  {
    id: 23,
    title: "Hợp đồng hợp tác kinh doanh (BCC) giữa các nhà đầu tư",
    category: "Hành chính & Dân sự",
    description: "Hợp đồng góp vốn liên doanh, phân chia lợi nhuận và nghĩa vụ tài chính theo quy định Luật Đầu tư mà không thành lập pháp nhân mới.",
    content: `HỢP ĐỒNG HỢP TÁC KINH DOANH (BCC)

Các bên tham gia: Bên A và Bên B.
Điều 1: Mục đích hợp tác đầu tư dự án ................................................................
Điều 2: Tỷ lệ góp vốn: Bên A góp .....% (tương đương ..... VNĐ), Bên B góp .....% (tương đương ..... VNĐ).
Điều 3: Phân chia doanh thu, lợi nhuận và chịu rủi ro tương ứng theo tỷ lệ vốn góp.`,
    matchPercent: 93,
  },
  {
    id: 24,
    title: "Mẫu số 08/UQ-QTT-TNCN: Giấy ủy quyền quyết toán thuế thu nhập cá nhân",
    category: "Hành chính & Dân sự",
    description: "Mẫu giấy ủy quyền chuẩn của Tổng cục Thuế để người lao động ủy quyền cho công ty quyết toán thuế TNCN cuối năm thay mình.",
    content: `MẪU SỐ 08/UQ-QTT-TNCN
(Ban hành kèm theo Thông tư số 80/2021/TT-BTC)

GIẤY ỦY QUYỀN QUYẾT TOÁN THUẾ THU NHẬP CÁ NHÂN

Kính gửi: TỔ CHỨC TRẢ THU NHẬP ................................................................
Tên tôi là: ............................................................ Mã số thuế: ....................
Ủy quyền cho Công ty quyết toán thuế TNCN thay tôi đối với thu nhập phát sinh trong năm tính thuế theo đúng quy định.`,
    matchPercent: 91,
  },
  {
    id: 25,
    title: "Điều lệ công ty trách nhiệm hữu hạn hai thành viên trở lên chuẩn Luật Doanh nghiệp",
    category: "Hành chính & Dân sự",
    description: "Bộ điều lệ công ty đầy đủ các quy định về tỷ lệ vốn góp, quyền biểu quyết, thẩm quyền của Hội đồng thành viên và chuyển nhượng phần vốn.",
    content: `ĐIỀU LỆ CÔNG TY TNHH HAI THÀNH VIÊN TRỞ LÊN

Tên công ty: CÔNG TY TNHH ................................................................
Vốn điều lệ: ........................................ VNĐ.
Gồm các điều khoản chuẩn hóa về cơ cấu quản trị, cuộc họp Hội đồng thành viên, quyền lợi và nghĩa vụ của các thành viên sáng lập theo Luật Doanh nghiệp 2020.`,
    matchPercent: 89,
  },
];

const CATEGORIES = [
  "Tất cả",
  "Hôn nhân & Gia đình",
  "Đất đai & Hợp đồng",
  "Lao động & Tiền lương",
  "Tố tụng & Khởi kiện",
  "Hành chính & Dân sự",
];

export default function AIFormLibrary() {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedForm, setSelectedForm] = useState<FormItem | null>(null);
  const [leadForm, setLeadForm] = useState({ name: "", phone: "" });
  const [formErrors, setFormErrors] = useState<{ name?: string; phone?: string }>({});
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearchTerm(searchTerm), 350);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Fetch search results from backend API if available (tối đa 4 kết quả)
  const { data: searchResults, isLoading } = useQuery({
    queryKey: ["forms", debouncedSearchTerm],
    queryFn: () => formLibraryService.searchForms(debouncedSearchTerm, 4),
    enabled: debouncedSearchTerm.trim().length > 0,
    retry: 1,
  });

  // ĐỀ XUẤT THÔNG MINH GỌN GÀNG: ĐÚNG 4 BIỂU MẪU CHUẨN XÁC & LIÊN QUAN NHẤT
  const displayForms = useMemo(() => {
    if (!debouncedSearchTerm.trim()) {
      return POPULAR_FORMS.slice(0, 4);
    }

    const term = debouncedSearchTerm.toLowerCase().trim();
    const words = term.split(/\s+/).filter((w) => w.length >= 2);

    const results: FormItem[] = [];
    const seenIds = new Set<number>();

    // 1. Nạp kết quả trực tiếp từ Backend API (tối đa 4)
    if (searchResults && searchResults.length > 0) {
      searchResults.slice(0, 4).forEach((item) => {
        results.push(item);
        seenIds.add(item.id);
      });
    }

    // 2. Chấm điểm tìm kiếm theo từ khóa & ngữ nghĩa trên bộ mẫu chuẩn POPULAR_FORMS
    const scoredLocal = POPULAR_FORMS.map((form) => {
      const titleLower = form.title.toLowerCase();
      const descLower = (form.description || "").toLowerCase();
      const catLower = (form.category || "").toLowerCase();
      const contentLower = (form.content || "").toLowerCase();

      let score = 0;
      if (titleLower.includes(term)) score += 6;
      else if (descLower.includes(term) || catLower.includes(term)) score += 3.5;
      else if (contentLower.includes(term)) score += 2;

      // Phân tích từ khóa thành phần
      for (const w of words) {
        if (titleLower.includes(w)) score += 1.5;
        else if (descLower.includes(w)) score += 0.8;
        else if (catLower.includes(w)) score += 1.0;
      }

      return { form, score };
    });

    // Thêm các kết quả khớp có điểm số cao (giới hạn tối đa 4)
    const directMatches = scoredLocal
      .filter(({ score, form }) => score >= 1.5 && !seenIds.has(form.id))
      .sort((a, b) => b.score - a.score);

    for (const { form } of directMatches) {
      if (results.length >= 4) break;
      const idx = results.length;
      const matchPct = Math.min(98, Math.max(88, 98 - idx * 2));
      results.push({ ...form, matchPercent: form.matchPercent || matchPct });
      seenIds.add(form.id);
    }

    // 3. ĐẢM BẢO ĐỀ XUẤT ĐỦ 4 BIỂU MẪU:
    // Nếu kết quả ít hơn 4 cái, tự động bổ sung biểu mẫu cùng chuyên mục hoặc liên quan
    if (results.length > 0 && results.length < 4) {
      const primaryCat = results[0].category;

      // Ưu tiên 1: Biểu mẫu cùng chuyên mục
      const sameCatForms = POPULAR_FORMS.filter(
        (f) => !seenIds.has(f.id) && f.category === primaryCat
      );

      for (const extra of sameCatForms) {
        if (results.length >= 4) break;
        const prevMatch = results[results.length - 1]?.matchPercent || 88;
        results.push({
          ...extra,
          matchPercent: Math.max(82, prevMatch - 3),
        });
        seenIds.add(extra.id);
      }

      // Ưu tiên 2: Các biểu mẫu có điểm phù hợp tiếp theo
      if (results.length < 4) {
        const remainingLocal = scoredLocal
          .filter(({ form }) => !seenIds.has(form.id))
          .sort((a, b) => b.score - a.score);

        for (const { form } of remainingLocal) {
          if (results.length >= 4) break;
          const prevMatch = results[results.length - 1]?.matchPercent || 85;
          results.push({
            ...form,
            matchPercent: Math.max(78, prevMatch - 3),
          });
          seenIds.add(form.id);
        }
      }
    }

    return results.slice(0, 4);
  }, [debouncedSearchTerm, searchResults]);

  const handleDownloadClick = (form: FormItem) => {
    setSelectedForm(form);
    setFormErrors({});
    setDownloadSuccess(false);
    setShowModal(true);
  };

  const validate = () => {
    const errors: { name?: string; phone?: string } = {};

    if (!leadForm.name.trim()) {
      errors.name = "Vui lòng nhập Họ và Tên của bạn.";
    } else if (leadForm.name.trim().length < 2) {
      errors.name = "Họ và tên phải có ít nhất 2 ký tự.";
    }

    const cleanPhone = leadForm.phone.replace(/[\s.-]/g, "");
    const phoneRegex = /^(0|\+84)(3|5|7|8|9)[0-9]{8}$/;
    if (!cleanPhone) {
      errors.phone = "Vui lòng nhập số điện thoại để nhận file.";
    } else if (!phoneRegex.test(cleanPhone)) {
      errors.phone = "Số điện thoại không hợp lệ (10 chữ số, ví dụ: 0912345678).";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedForm) return;

    // Validate inputs
    if (!validate()) return;

    // 1. Save lead to Admin database / local storage
    await formLeadService.createLead({
      name: leadForm.name.trim(),
      phone: leadForm.phone.trim(),
      formId: selectedForm.id,
      formTitle: selectedForm.title,
      formCategory: selectedForm.category,
    });

    // 2. Dispatch lead to backend asynchronously in background (gracefully ignore failures)
    formLibraryService
      .downloadForm({
        name: leadForm.name.trim(),
        phone: leadForm.phone.trim(),
        formId: selectedForm.id,
      })
      .catch(() => {
        // Silently handled
      });

    // 3. GUARANTEED INSTANT CLIENT DOWNLOAD (Always works on all browsers / computers)
    exportFormToDoc(selectedForm, {
      name: leadForm.name.trim(),
      phone: leadForm.phone.trim(),
    });

    setDownloadSuccess(true);
    setTimeout(() => {
      setShowModal(false);
      setDownloadSuccess(false);
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 pt-10 pb-16 min-h-screen relative">
      {/* Lead Gate Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fadeIn">
          <div className="bg-white p-6 sm:p-8 rounded-3xl max-w-md w-full shadow-2xl border border-slate-100 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 material-symbols-outlined cursor-pointer"
            >
              close
            </button>
            <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center mb-4 shadow-inner">
              <span className="material-symbols-outlined text-2xl">description</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-1.5">Tải Biểu Mẫu Miễn Phí</h2>
            <p className="text-xs sm:text-sm text-slate-600 mb-5 leading-relaxed">
              Biểu mẫu: <strong className="text-[#641D06]">{selectedForm?.title}</strong>
            </p>

            {downloadSuccess ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 text-center space-y-2 animate-bounce">
                <span className="material-symbols-outlined text-4xl text-emerald-600">check_circle</span>
                <h3 className="font-bold text-emerald-900 text-base">Đang tải file về máy!</h3>
                <p className="text-xs text-emerald-700">Tệp Word (.doc) đã được lưu vào thư mục tải về của bạn.</p>
              </div>
            ) : (
              <form onSubmit={handleLeadSubmit} noValidate className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Họ và Tên <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={leadForm.name}
                    onChange={(e) => {
                      setLeadForm({ ...leadForm, name: e.target.value });
                      if (formErrors.name) setFormErrors({ ...formErrors, name: undefined });
                    }}
                    className={`w-full h-12 px-4 border rounded-xl outline-none bg-white text-slate-900 text-sm transition-all ${
                      formErrors.name
                        ? "border-red-500 bg-red-50/30 focus:border-red-600 focus:ring-2 focus:ring-red-100"
                        : "border-slate-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                    }`}
                    placeholder="Ví dụ: Nguyễn Văn A"
                  />
                  {formErrors.name && (
                    <p className="text-[11px] font-bold text-red-600 mt-1 flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs">error</span>
                      {formErrors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Số điện thoại nhận tư vấn <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={leadForm.phone}
                    onChange={(e) => {
                      setLeadForm({ ...leadForm, phone: e.target.value });
                      if (formErrors.phone) setFormErrors({ ...formErrors, phone: undefined });
                    }}
                    className={`w-full h-12 px-4 border rounded-xl outline-none bg-white text-slate-900 text-sm transition-all ${
                      formErrors.phone
                        ? "border-red-500 bg-red-50/30 focus:border-red-600 focus:ring-2 focus:ring-red-100"
                        : "border-slate-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                    }`}
                    placeholder="Ví dụ: 0912 345 678"
                  />
                  {formErrors.phone && (
                    <p className="text-[11px] font-bold text-red-600 mt-1 flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs">error</span>
                      {formErrors.phone}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full h-12 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl mt-4 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-md active:scale-98 text-sm"
                >
                  <span className="material-symbols-outlined text-lg">download</span>
                  Tải Xuống File Word (.doc)
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Hero Section */}
      <div className="text-center mb-10 max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 font-sans tracking-tight uppercase mb-3 leading-tight">
          Kho Biểu Mẫu Pháp Lý AI
        </h1>
        <div className="text-amber-600 flex items-center justify-center my-2">
          <span className="tracking-widest font-bold text-lg">— ⚖️ —</span>
        </div>
        <p className="text-slate-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
          Tra cứu và tải xuống miễn phí các biểu mẫu pháp lý chuẩn xác. Nhập câu văn nói tự nhiên, AI sẽ tự động phân tích ngữ nghĩa và gợi ý biểu mẫu chính xác.
        </p>

        {/* Search Bar */}
        <div className="relative max-w-2xl mx-auto">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-14 pl-5 pr-14 border border-slate-300 rounded-2xl focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100 bg-white text-slate-900 placeholder:text-slate-400 shadow-md outline-none transition-all text-sm md:text-base"
            placeholder="Nhập nhu cầu pháp lý của bạn, ví dụ: 'Tôi muốn ly hôn', 'hợp đồng thuê nhà'..."
          />
          <span className="material-symbols-outlined absolute right-4 top-4 text-slate-400 hover:text-emerald-600 cursor-pointer text-2xl">
            search
          </span>
        </div>

        {/* Quick Suggestion Chips */}
        <div className="flex items-center justify-center gap-2 flex-wrap mt-4 text-xs">
          <span className="text-slate-500 font-medium flex items-center gap-1">
            <span className="material-symbols-outlined text-xs text-amber-600">trending_up</span>
            Gợi ý tra cứu nhanh:
          </span>
          {[
            "Thuận tình ly hôn",
            "Đơn phương ly hôn",
            "Hợp đồng thuê nhà",
            "Chuyển nhượng nhà đất",
            "Hợp đồng lao động",
            "Khởi kiện đòi nợ",
            "Giấy ủy quyền",
          ].map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setSearchTerm(tag)}
              className="px-3 py-1 bg-white hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-300 border border-slate-200 rounded-full text-slate-700 transition-all shadow-2xs font-medium cursor-pointer"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Results Section */}
      <section className="w-full py-2">
        <div className="flex items-center gap-2 mb-6 border-b border-border-neutral pb-4">
          <span className="material-symbols-outlined text-amber-700">auto_awesome</span>
          <h2 className="text-xl md:text-2xl font-bold text-slate-900">
            {debouncedSearchTerm.trim() ? "Đề xuất biểu mẫu từ AI" : "Biểu mẫu pháp lý được tải nhiều nhất"}
          </h2>
          <span className="text-xs font-semibold text-slate-500 ml-auto hidden md:block">
            {isLoading ? "Đang tìm kiếm..." : `${displayForms.length} biểu mẫu đề xuất`}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Left Column: Form Cards */}
          <div className="lg:col-span-8 space-y-6">

            {isLoading && (
              <div className="text-center py-12 text-[#641D06] font-bold flex items-center justify-center gap-2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#641D06]"></div>
                Đang tìm kiếm bằng AI Vector...
              </div>
            )}

            {debouncedSearchTerm.trim().length > 0 && displayForms.length === 0 && !isLoading && (
              <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 shadow-xs">
                <span className="material-symbols-outlined text-6xl text-slate-300 mb-3 block">search_off</span>
                <h3 className="font-bold text-slate-800 text-lg mb-1">Không tìm thấy biểu mẫu phù hợp</h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto mb-5">
                  Vui lòng thử tìm với từ khóa khác hoặc liên hệ trực tiếp với Luật sư để được cung cấp mẫu theo yêu cầu.
                </p>
                <Link
                  href="/appointment"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#641D06] text-white font-bold text-xs"
                >
                  <span className="material-symbols-outlined text-sm">support_agent</span>
                  Liên hệ Luật sư
                </Link>
              </div>
            )}

            {displayForms.map((form) => {
              const matchPercent =
                form.matchPercent !== undefined
                  ? form.matchPercent
                  : form.score !== undefined
                  ? Math.min(99, Math.max(15, Math.round(form.score * 100)))
                  : 85;

              return (
                <div
                  key={form.id}
                  className="bg-white border border-slate-200 hover:border-emerald-600 transition-all p-6 rounded-2xl flex flex-col md:flex-row gap-6 shadow-xs hover:shadow-md relative overflow-hidden group"
                >
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 to-amber-500" />

                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                        <span className="material-symbols-outlined text-[14px]">check_circle</span>
                        {matchPercent}% phù hợp
                      </span>
                      {form.category && (
                        <span className="bg-slate-100 text-slate-700 text-[11px] font-semibold px-2.5 py-0.5 rounded-md border border-slate-200">
                          {form.category}
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#641D06] transition-colors leading-snug">
                      {form.title}
                    </h3>
                    <p className="text-xs md:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                      {form.description || form.content || "Biểu mẫu pháp lý chuẩn hóa"}
                    </p>
                    <div className="flex items-center gap-3 mt-4 pt-2">
                      <button
                        onClick={() => handleDownloadClick(form)}
                        className="bg-emerald-700 text-white hover:bg-emerald-800 h-10 px-5 rounded-xl text-xs md:text-sm font-bold transition-all flex items-center gap-2 shadow-xs cursor-pointer active:scale-95"
                      >
                        <span className="material-symbols-outlined text-[18px]">download</span>
                        Tải xuống (.doc)
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Sidebar: Quick Actions */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-xs space-y-4">
              <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-amber-700">verified</span>
                Hỗ Trợ Pháp Lý Kèm Theo
              </h3>
              <div className="space-y-3">
                <Link
                  href="/ai-form-checker"
                  className="flex items-center gap-3 p-3.5 bg-slate-50 border border-slate-200 rounded-2xl hover:border-emerald-500 hover:bg-emerald-50/40 transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-xl">fact_check</span>
                  </div>
                  <div>
                    <div className="text-xs md:text-sm font-bold text-slate-900">Thẩm Định Biểu Mẫu AI</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">Quét rủi ro và soát lỗi hợp đồng</div>
                  </div>
                </Link>

                <Link
                  href="/ai-chatbot"
                  className="flex items-center gap-3 p-3.5 bg-slate-50 border border-slate-200 rounded-2xl hover:border-amber-500 hover:bg-amber-50/40 transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-xl">smart_toy</span>
                  </div>
                  <div>
                    <div className="text-xs md:text-sm font-bold text-slate-900">Trợ Lý Luật Sư AI 24/7</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">Hướng dẫn điền biểu mẫu đúng luật</div>
                  </div>
                </Link>

                <Link
                  href="/appointment"
                  className="flex items-center gap-3 p-3.5 bg-slate-50 border border-slate-200 rounded-2xl hover:border-[#641D06] hover:bg-amber-50/40 transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-rose-100 text-[#641D06] flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-xl">gavel</span>
                  </div>
                  <div>
                    <div className="text-xs md:text-sm font-bold text-slate-900">Luật Sư Soạn Thảo Riêng</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">Đặt lịch tư vấn trực tiếp 1:1</div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
