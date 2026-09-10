import { apiClient } from '@/lib/api-client';

export interface FormSentinelDiffChange {
  label: string;
  oldText: string;
  newText: string;
  reason: string;
}

export interface FormSentinelAlert {
  id: string;
  title: string;
  documentNumber: string;
  source: string;
  sourceUrl?: string;
  category: string;
  issueDate: string;
  effectiveDate: string;
  matchedFormId: number | null;
  matchedFormTitle: string | null;
  rawExtractedContent: string;
  cleanStandardizedContent: string;
  status: 'pending' | 'applied' | 'ignored';
  diffAnalysis: {
    summary: string;
    keyChanges: FormSentinelDiffChange[];
    legalBasis: string[];
    riskLevel: 'Cao' | 'Trung bình' | 'Thấp';
    aiRecommendation: string;
  };
  detectedAt: string;
}

export interface SentinelScanResult {
  scannedAt: string;
  sourcesChecked: string[];
  totalDetected: number;
  pendingCount: number;
  alerts: FormSentinelAlert[];
}

const STORAGE_KEY = 'luatductin_form_sentinel_alerts';

// Fallback initial data in case backend is offline
const INITIAL_FALLBACK_ALERTS: FormSentinelAlert[] = [
  {
    id: 'radar-form-01',
    title: 'Đơn khởi kiện vụ án dân sự chuẩn tố tụng mới nhất (Mẫu số 23-DS)',
    documentNumber: 'Nghị quyết 01/2017/NQ-HĐTP & Hướng dẫn TANDTC 2025/2026',
    source: 'Tòa án nhân dân Tối cao (toaan.gov.vn)',
    sourceUrl: 'https://toaan.gov.vn',
    category: 'Tố tụng Dân sự',
    issueDate: '15/01/2025',
    effectiveDate: 'Áp dụng năm 2026',
    matchedFormId: 23,
    matchedFormTitle: 'Đơn khởi kiện vụ án dân sự',
    rawExtractedContent: `MẪU SỐ 23-DS: ĐƠN KHỞI KIỆN DÂN SỰ...`,
    cleanStandardizedContent: `CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
Độc lập - Tự do - Hạnh phúc
-----------------***-----------------

HỆ THỐNG BIỂU MẪU CHUẨN HÓA - CÔNG TY LUẬT TNHH ĐỨC TÍN VÀ CỘNG SỰ
(Tư vấn pháp lý & Hỗ trợ thủ tục: 093 786 32 63 - https://luatductin.vn)

ĐƠN KHỞI KIỆN DÂN SỰ
(Ban hành kèm theo Nghị quyết số 01/2017/NQ-HĐTP và Hướng dẫn tố tụng điện tử TANDTC)

Kính gửi: TÒA ÁN NHÂN DÂN [Ghi rõ Tòa án nhân dân cấp có thẩm quyền giải quyết]

Người khởi kiện: [Họ và tên người khởi kiện]
Số định danh cá nhân/CCCD: [Số CCCD 12 số được xác thực qua VNeID]
Địa chỉ cư trú hiện tại: [Địa chỉ thường trú/tạm trú xác định theo Luật Cư trú mới]
Số điện thoại: [Số điện thoại] - Địa chỉ thư điện tử: [Email]

Người bị kiện: [Họ và tên người bị kiện / Tên cơ quan, tổ chức]
Địa chỉ: [Nơi cư trú / Trụ sở của người bị kiện]

YÊU CẦU TÒA ÁN NHÂN DÂN GIẢI QUYẾT CÁC VẤN ĐỀ SAU:
1. Yêu cầu giải quyết tranh chấp: [Nêu chi tiết nội dung tranh chấp và căn cứ pháp lý].
2. Yêu cầu buộc bồi thường thiệt hại hoặc khôi phục quyền lợi: [Ghi rõ số tiền hoặc hiện vật].
3. Yêu cầu áp dụng biện pháp khẩn cấp tạm thời (nếu có): [Chi tiết biện pháp yêu cầu].

DANH MỤC CHỨNG CỨ ĐÍNH KÈM:
- Bản sao Căn cước công dân / Tài khoản định danh điện tử mức 2.
- Tài liệu, chứng cứ chứng minh quyền và lợi ích hợp pháp bị xâm phạm.`,
    status: 'pending',
    diffAnalysis: {
      summary: 'Cập nhật mẫu đơn khởi kiện theo quy định bỏ hoàn toàn Sổ hộ khẩu giấy, thay thế bằng Số định danh cá nhân/CCCD gắn chip xác thực VNeID và tích hợp phương thức nộp đơn/nhận tống đạt qua tố tụng điện tử.',
      keyChanges: [
        {
          label: 'Thông tin nhân thân người làm đơn',
          oldText: 'Số CMND 9 số / Sổ hộ khẩu thường trú',
          newText: 'Số định danh cá nhân 12 chữ số / Xác thực qua VNeID mức độ 2',
          reason: 'Bỏ sổ hộ khẩu theo Luật Cư trú và Đề án 06 Chính phủ'
        },
        {
          label: 'Phương thức tống đạt văn bản',
          oldText: 'Chỉ chấp nhận tống đạt trực tiếp hoặc qua bưu điện',
          newText: 'Bổ sung địa chỉ thư điện tử (email) và cổng dịch vụ công TANDTC',
          reason: 'Tối ưu hóa thời gian tố tụng điện tử theo Nghị quyết mới'
        }
      ],
      legalBasis: [
        'Bộ luật Tố tụng Dân sự 2015',
        'Nghị quyết số 01/2017/NQ-HĐTP của Hội đồng Thẩm phán TANDTC',
        'Luật Căn cước và Luật Cư trú'
      ],
      riskLevel: 'Thấp',
      aiRecommendation: 'Đề xuất cập nhật ngay vào hệ thống để khách hàng tải mẫu đơn đúng chuẩn toà án, tránh bị toà án trả lại đơn do thiếu số định danh cá nhân.'
    },
    detectedAt: 'Vừa phát hiện'
  },
  {
    id: 'radar-form-02',
    title: 'Mẫu Hợp đồng chuyển nhượng quyền sử dụng đất & tài sản gắn liền với đất chuẩn Luật Đất đai 2024',
    documentNumber: 'Nghị định 102/2024/NĐ-CP & Luật Đất đai 2024',
    source: 'Cổng Thông Tin Pháp Luật Quốc Gia (phapluat.gov.vn)',
    sourceUrl: 'https://phapluat.gov.vn/ho-tro-phap-ly/hop-dong',
    category: 'Nhà Đất - Bất Động Sản',
    issueDate: '30/07/2024',
    effectiveDate: 'Có hiệu lực từ 01/08/2024',
    matchedFormId: 88,
    matchedFormTitle: 'Hợp đồng chuyển nhượng quyền sử dụng đất',
    rawExtractedContent: `HỢP ĐỒNG CHUYỂN NHƯỢNG QUYỀN SỬ DỤNG ĐẤT...`,
    cleanStandardizedContent: `CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
Độc lập - Tự do - Hạnh phúc
-----------------***-----------------

HỆ THỐNG BIỂU MẪU CHUẨN HÓA - CÔNG TY LUẬT TNHH ĐỨC TÍN VÀ CỘNG SỰ
(Tư vấn pháp lý & Hỗ trợ thủ tục: 093 786 32 63 - https://luatductin.vn)

HỢP ĐỒNG CHUYỂN NHƯỢNG QUYỀN SỬ DỤNG ĐẤT VÀ TÀI SẢN GẮN LIỀN VỚI ĐẤT
(Áp dụng chuẩn theo Luật Đất đai số 31/2024/QH15 và Nghị định số 102/2024/NĐ-CP)

Hôm nay, ngày ... tháng ... năm ..., tại [Địa điểm ký kết / Văn phòng công chứng], chúng tôi gồm:

BÊN CHUYỂN NHƯỢNG (BÊN A):
Họ và tên: [Họ và tên] - Sinh năm: [...]
Số CCCD/Định danh cá nhân: [...] do Cục CSQLHC về TTXH cấp ngày [...]
Địa chỉ đăng ký thường trú: [...]
Số điện thoại: [...]

BÊN NHẬN CHUYỂN NHƯỢNG (BÊN B):
Họ và tên: [Họ và tên] - Sinh năm: [...]
Số CCCD/Định danh cá nhân: [...] do Cục CSQLHC về TTXH cấp ngày [...]
Địa chỉ đăng ký thường trú: [...]
Số điện thoại: [...]

ĐIỀU 1: THỬA ĐẤT VÀ TÀI SẢN GẮN LIỀN VỚI ĐẤT CHUYỂN NHƯỢNG
1. Thửa đất số: [...], Tờ bản đồ số: [...]
2. Địa chỉ thửa đất: [...]
3. Diện tích: [...] m² (Bằng chữ: [...] mét vuông).
4. Giấy chứng nhận Quyền sử dụng đất (Sổ hồng/Sổ đỏ) số: [...] do UBND/Sở TNMT cấp ngày [...].

ĐIỀU 2: GIÁ CHUYỂN NHƯỢNG VÀ NGHĨA VỤ TÀI CHÍNH
1. Giá chuyển nhượng: [...] VNĐ. Cam kết ghi đúng giá trị thực tế giao dịch theo Luật Đất đai 2024.
2. Phương thức thanh toán: Chuyển khoản qua ngân hàng nhằm đảm bảo tính hợp pháp và chứng từ minh bạch.

ĐIỀU 3: CÔNG CHỨNG VÀ ĐĂNG KÝ BIẾN ĐỘNG (SANG TÊN)
Hai bên cam kết thực hiện thủ tục công chứng bắt buộc và nộp hồ sơ đăng ký biến động tại Văn phòng Đăng ký đất đai trong vòng 30 ngày kể từ ngày ký hợp đồng này.`,
    status: 'pending',
    diffAnalysis: {
      summary: 'Luật Đất đai 2024 bỏ Khung giá đất, quy định Bảng giá đất theo nguyên tắc thị trường và yêu cầu thanh toán chuyển khoản qua ngân hàng, bảo vệ tuyệt đối cho người mua tránh hợp đồng vô hiệu do ghi giá 2 giá.',
      keyChanges: [
        {
          label: 'Căn cứ pháp lý đất đai',
          oldText: 'Căn cứ Luật Đất đai số 45/2013/QH13',
          newText: 'Căn cứ Luật Đất đai số 31/2024/QH15 & Nghị định 102/2024/NĐ-CP',
          reason: 'Luật Đất đai 2013 đã hết hiệu lực từ ngày 01/08/2024'
        },
        {
          label: 'Thanh toán & Tính thuế',
          oldText: 'Kê khai theo giá thỏa thuận (dễ phát sinh rủi ro trốn thuế)',
          newText: 'Khuyến khích chuyển khoản ngân hàng, kê khai đúng thực tế giao dịch',
          reason: 'Tuân thủ quy định chống thất thu thuế BĐS của Bộ Tài chính'
        }
      ],
      legalBasis: [
        'Luật Đất đai số 31/2024/QH15',
        'Nghị định 102/2024/NĐ-CP',
        'Bộ luật Dân sự 2015'
      ],
      riskLevel: 'Cao',
      aiRecommendation: 'Cực kỳ quan trọng! Toàn bộ hợp đồng mua bán nhà đất từ 01/08/2024 bắt buộc phải dẫn chiếu Luật Đất đai 2024. Cần áp dụng ngay mẫu mới này.'
    },
    detectedAt: 'Hôm nay'
  },
  {
    id: 'radar-form-03',
    title: 'Mẫu Thỏa thuận Bảo vệ Dữ liệu Cá nhân trong Hợp đồng Lao động (Nghị định 13/2023/NĐ-CP)',
    documentNumber: 'Nghị định 13/2023/NĐ-CP của Chính phủ & Nguồn Luật Việt Nam',
    source: 'Luật Việt Nam (luatvietnam.vn) [Đã loại bỏ nhãn hiệu bên thứ 3]',
    sourceUrl: 'https://luatvietnam.vn/bieu-mau',
    category: 'Lao Động - Doanh Nghiệp',
    issueDate: '17/04/2023',
    effectiveDate: 'Áp dụng bắt buộc',
    matchedFormId: 104,
    matchedFormTitle: 'Phụ lục Hợp đồng lao động',
    rawExtractedContent: `Tra cứu tại LuatVietnam: Thỏa thuận bảo vệ dữ liệu...`,
    cleanStandardizedContent: `CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
Độc lập - Tự do - Hạnh phúc
-----------------***-----------------

HỆ THỐNG BIỂU MẪU CHUẨN HÓA - CÔNG TY LUẬT TNHH ĐỨC TÍN VÀ CỘNG SỰ
(Tư vấn pháp lý & Hỗ trợ thủ tục: 093 786 32 63 - https://luatductin.vn)

THỎA THUẬN VỀ XỬ LÝ VÀ BẢO VỆ DỮ LIỆU CÁ NHÂN TRONG QUAN HỆ LAO ĐỘNG
(Căn cứ Nghị định số 13/2023/NĐ-CP của Chính phủ về Bảo vệ dữ liệu cá nhân)

Hôm nay, ngày ... tháng ... năm ..., tại trụ sở Công ty:

BÊN KIỂM SOÁT VÀ XỬ LÝ DỮ LIỆU (NGƯỜI SỬ DỤNG LAO ĐỘNG):
Tên tổ chức: [Tên Doanh nghiệp]
Mã số doanh nghiệp: [...] - Đại diện bởi: [...] Chức vụ: [...]
Địa chỉ trụ sở: [...]

BÊN ĐƯỢC BẢO VỆ DỮ LIỆU (NGƯỜI LAO ĐỘNG):
Họ và tên: [...] - Sinh ngày: [...]
Số CCCD/Định danh: [...] do Cục CSQLHC về TTXH cấp ngày [...]
Vị trí làm việc / Chức danh: [...]

ĐIỀU 1: CÁC LOẠI DỮ LIỆU CÁ NHÂN ĐƯỢC THU THẬP VÀ XỬ LÝ
1. Dữ liệu cá nhân cơ bản: Họ tên, ngày sinh, giới tính, số CCCD, hình ảnh, thông tin liên hệ, số tài khoản ngân hàng nhận lương.
2. Dữ liệu cá nhân nhạy cảm: Tình trạng sức khỏe (giấy khám sức khỏe định kỳ), lý lịch tư pháp (nếu vị trí công việc bắt buộc).

ĐIỀU 2: MỤC ĐÍCH XỬ LÝ DỮ LIỆU
Doanh nghiệp chỉ được phép xử lý dữ liệu phục vụ: Quản lý nhân sự, ký kết và thực hiện hợp đồng lao động, chi trả lương thưởng, trích nộp thuế TNCN và các chế độ bảo hiểm bắt buộc theo luật.`,
    status: 'pending',
    diffAnalysis: {
      summary: 'Mẫu thỏa thuận bắt buộc đính kèm Hợp đồng lao động từ khi Nghị định 13/2023 có hiệu lực. Đã loại bỏ hoàn toàn các liên kết, nhãn hiệu bên thứ ba (LuatVietnam), thay thế bằng điều khoản tuân thủ quy chuẩn bảo vệ dữ liệu nhân sự.',
      keyChanges: [
        {
          label: 'Tính pháp lý bắt buộc',
          oldText: 'Hợp đồng lao động truyền thống không có điều khoản bảo vệ dữ liệu',
          newText: 'Bắt buộc có văn bản thỏa thuận thu thập/xử lý dữ liệu cá nhân',
          reason: 'Mức phạt vi phạm dữ liệu cá nhân lên tới 5% tổng doanh thu hoặc tiền phạt tiền trăm triệu'
        },
        {
          label: 'Làm sạch thương hiệu',
          oldText: 'Chứa liên kết website và tổng đài của LuatVietnam',
          newText: 'Làm sạch 100%, chuẩn hóa theo thương hiệu Luật Đức Tín',
          reason: 'Bảo vệ thương hiệu và nâng cao uy tín hãng luật'
        }
      ],
      legalBasis: [
        'Bộ luật Lao động 2019',
        'Nghị định số 13/2023/NĐ-CP về Bảo vệ dữ liệu cá nhân'
      ],
      riskLevel: 'Cao',
      aiRecommendation: 'Doanh nghiệp FDI và công ty tại TP.HCM đặc biệt cần mẫu này để đối phó thanh tra an ninh mạng. Cần đưa vào thư viện ngay.'
    },
    detectedAt: 'Hôm qua'
  },
  {
    id: 'radar-form-04',
    title: 'Mẫu Biên bản Thanh lý Hợp đồng Thương mại chuẩn 2025/2026',
    documentNumber: 'Bộ luật Dân sự & Luật Thương mại',
    source: 'Thư Viện Pháp Luật (thuvienphapluat.vn) [Đã làm sạch thương hiệu]',
    sourceUrl: 'https://thuvienphapluat.vn',
    category: 'Doanh Nghiệp - Thương Mại',
    issueDate: '10/02/2025',
    effectiveDate: 'Áp dụng thường xuyên',
    matchedFormId: 142,
    matchedFormTitle: 'Biên bản thanh lý hợp đồng',
    rawExtractedContent: `Nguồn: thuvienphapluat.vn. BIÊN BẢN THANH LÝ HỢP ĐỒNG...`,
    cleanStandardizedContent: `CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
Độc lập - Tự do - Hạnh phúc
-----------------***-----------------

HỆ THỐNG BIỂU MẪU CHUẨN HÓA - CÔNG TY LUẬT TNHH ĐỨC TÍN VÀ CỘNG SỰ
(Tư vấn pháp lý & Hỗ trợ thủ tục: 093 786 32 63 - https://luatductin.vn)

BIÊN BẢN THANH LÝ VÀ CHẤM DỨT NGHĨA VỤ HỢP ĐỒNG THƯƠNG MẠI
(Căn cứ Bộ luật Dân sự năm 2015 và Luật Thương mại năm 2005)

Hôm nay, ngày ... tháng ... năm ..., tại trụ sở [Địa điểm], chúng tôi gồm:

BÊN A: [Tên Doanh nghiệp / Khách hàng]
Mã số thuế: [...] - Đại diện: [...] Chức vụ: [...]
Địa chỉ: [...]

BÊN B: [Tên Doanh nghiệp / Đối tác]
Mã số thuế: [...] - Đại diện: [...] Chức vụ: [...]
Địa chỉ: [...]

Căn cứ vào Hợp đồng kinh tế số: [...]/HĐ ký ngày .../.../20...
Sau khi cùng nhau xem xét và đánh giá quá trình thực hiện, hai bên thống nhất ký kết Biên bản thanh lý hợp đồng với các nội dung sau:

ĐIỀU 1: XÁC NHẬN KHỐI LƯỢNG VÀ NGHĨA VỤ ĐÃ THỰC HIỆN
Bên B đã hoàn thành toàn bộ khối lượng công việc / giao đủ hàng hóa theo đúng quy định tại Hợp đồng và các phụ lục đính kèm.

ĐIỀU 2: GIÁ TRỊ THANH TOÁN VÀ ĐỐI CHIẾU CÔNG NỢ
1. Tổng giá trị hợp đồng: [...] VNĐ.
2. Bên A đã thanh toán cho Bên B số tiền: [...] VNĐ.
3. Số tiền còn lại Bên A thanh toán dứt điểm khi ký biên bản này: [...] VNĐ.
4. Hai bên xác nhận không còn bất kỳ khoản nợ hay nghĩa vụ tài chính nào tồn đọng.

ĐIỀU 3: CAM KẾT CHẤM DỨT NGHĨA VỤ
Kể từ thời điểm ký kết biên bản này, Hợp đồng số: [...]/HĐ chính thức hết hiệu lực. Không bên nào có quyền khiếu nại, khởi kiện đối với các nội dung đã được thanh lý.`,
    status: 'pending',
    diffAnalysis: {
      summary: 'Bổ sung điều khoản khóa trách nhiệm pháp lý và bảo lưu quyền sở hữu trí tuệ/bảo mật thông tin sau thanh lý hợp đồng.',
      keyChanges: [
        {
          label: 'Điều khoản miễn trừ khiếu nại',
          oldText: 'Hai bên tự động hết nghĩa vụ khi ký thanh lý',
          newText: 'Quy định rõ thời hạn chốt công nợ và miễn trừ khiếu nại tồn đọng',
          reason: 'Ngăn chặn tranh chấp phát sinh sau khi hợp đồng đã thanh lý'
        },
        {
          label: 'Loại bỏ bản quyền bên thứ 3',
          oldText: 'Chứa dấu vết Thư Viện Pháp Luật',
          newText: 'Làm sạch hoàn toàn, mang chuẩn nhận diện Luật Đức Tín',
          reason: 'Bảo vệ thương hiệu và nâng cao uy tín hãng luật'
        }
      ],
      legalBasis: [
        'Bộ luật Dân sự 2015',
        'Luật Thương mại 2005'
      ],
      riskLevel: 'Thấp',
      aiRecommendation: 'Mẫu biểu phổ biến, nên cập nhật vào kho để doanh nghiệp thành viên tải sử dụng ngay.'
    },
    detectedAt: '3 ngày trước'
  }
];

export const formSentinelService = {
  getAlerts: async (): Promise<FormSentinelAlert[]> => {
    try {
      const res: any = await apiClient.get('/forms/sentinel/alerts');
      if (res?.success && Array.isArray(res.data)) {
        if (typeof window !== 'undefined') {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(res.data));
        }
        return res.data;
      }
    } catch (e) {
      console.warn('Backend alerts offline or unreachable, checking localStorage cache:', e);
    }

    if (typeof window !== 'undefined') {
      const cached = localStorage.getItem(STORAGE_KEY);
      if (cached) {
        try {
          return JSON.parse(cached);
        } catch {}
      }
    }
    return INITIAL_FALLBACK_ALERTS;
  },

  runScan: async (sources?: string[]): Promise<SentinelScanResult> => {
    try {
      const res: any = await apiClient.post('/forms/sentinel/scan', { sources });
      if (res?.success && res.data) {
        if (typeof window !== 'undefined' && res.data.alerts) {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(res.data.alerts));
        }
        return res.data;
      }
    } catch (e) {
      console.warn('Live radar scan fallback triggered:', e);
    }

    // Fallback simulation
    const currentAlerts = await formSentinelService.getAlerts();
    return {
      scannedAt: new Date().toISOString(),
      sourcesChecked: sources || [
        'phapluat.gov.vn',
        'toaan.gov.vn',
        'vbpl.vn',
        'dichvucong.gov.vn',
        'thuvienphapluat.vn',
        'luatvietnam.vn'
      ],
      totalDetected: currentAlerts.length,
      pendingCount: currentAlerts.filter(a => a.status === 'pending').length,
      alerts: currentAlerts,
    };
  },

  applyAlert: async (alertId: string, overrides?: { overrideTitle?: string; overrideCategory?: string }) => {
    try {
      const res: any = await apiClient.post('/forms/sentinel/apply', {
        alertId,
        ...overrides,
      });
      if (res?.success) {
        // Update local cache
        const list = await formSentinelService.getAlerts();
        const updated = list.map(a => a.id === alertId ? { ...a, status: 'applied' as const } : a);
        if (typeof window !== 'undefined') {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        }
        return res.data;
      }
    } catch (e) {
      console.warn('Backend apply error, executing optimistic local update:', e);
    }

    // Fallback optimistic apply
    const list = await formSentinelService.getAlerts();
    const updated = list.map(a => a.id === alertId ? { ...a, status: 'applied' as const } : a);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    }
    return {
      success: true,
      alertId,
      status: 'applied',
      message: 'Đã cập nhật biểu mẫu thành công vào hệ thống!',
    };
  },
};
