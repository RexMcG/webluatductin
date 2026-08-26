"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { formLibraryService, FormItem } from "@/services/form-library.service";
import { formLeadService } from "@/services/form-lead.service";
import { exportFormToDoc } from "@/utils/form-exporter";

// Curated standard Vietnamese legal templates fallback & initial library
const POPULAR_FORMS: FormItem[] = [
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
- Giá thuê: ........................................ VNĐ/tháng (Bằng chữ: ........................................................).
- Tiền đặt cọc bảo đảm hợp đồng: ........................................ VNĐ.
- Phương thức thanh toán: Chuyển khoản ngân hàng định kỳ vào ngày ..... hàng tháng.`,
    matchPercent: 95,
  },
  {
    id: 3,
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
    matchPercent: 93,
  },
  {
    id: 4,
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
1. Tóm tắt quá trình phát sinh tranh chấp:
........................................................................................................................
........................................................................................................................
2. Yêu cầu Tòa án giải quyết những vấn đề sau:
- Buộc người bị kiện phải: ................................................................................
- Yêu cầu bồi thường thiệt hại (nếu có): ....................................................................
3. Danh mục tài liệu, chứng cứ kèm theo đơn khởi kiện gồm:
- Hợp đồng / Giấy vay mượn tiền (bản sao y).
- Căn cước công dân người khởi kiện.
- Các biên bản làm việc, sao kê giao dịch liên quan.`,
    matchPercent: 91,
  },
  {
    id: 5,
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
Bên A đồng ý ủy quyền cho Bên B thay mặt Bên A thực hiện các công việc sau:
1. ....................................................................................................................
2. ....................................................................................................................
3. Được quyền nộp, nhận hồ sơ, ký tên vào các biên bản, giấy tờ có liên quan theo quy định pháp luật.
- Thời hạn ủy quyền: Từ ngày ký đến khi hoàn thành xong công việc hoặc có văn bản chấm dứt của Bên A.
- Cam kết: Hai bên cam đoan việc ủy quyền hoàn toàn tự nguyện và chịu trách nhiệm trước pháp luật.`,
    matchPercent: 88,
  },
  {
    id: 6,
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
- Giá chuyển nhượng: ........................................ VNĐ (Bằng chữ: ........................................................).
- Đợt 1: Đặt cọc ..... VNĐ ngay sau khi ký hợp đồng.
- Đợt 2: Thanh toán số tiền còn lại tại Phòng Công chứng sau khi ký công chứng hợp đồng.`,
    matchPercent: 86,
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
    const timer = setTimeout(() => setDebouncedSearchTerm(searchTerm), 400);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Fetch search results from backend API if available
  const { data: searchResults, isLoading } = useQuery({
    queryKey: ["forms", debouncedSearchTerm],
    queryFn: () => formLibraryService.searchForms(debouncedSearchTerm, 10),
    enabled: debouncedSearchTerm.trim().length > 0,
    retry: 1,
  });

  // Only display forms when user has searched
  const displayForms = useMemo(() => {
    if (!debouncedSearchTerm.trim()) {
      return [];
    }

    if (searchResults && searchResults.length > 0) {
      return searchResults;
    }

    // Fallback local semantic keyword search
    const term = debouncedSearchTerm.toLowerCase();
    return POPULAR_FORMS.filter(
      (f) =>
        f.title.toLowerCase().includes(term) ||
        (f.category && f.category.toLowerCase().includes(term)) ||
        (f.description && f.description.toLowerCase().includes(term)) ||
        (f.content && f.content.toLowerCase().includes(term))
    ).map((f) => ({ ...f, matchPercent: 92 }));
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
    const phoneRegex = /^(0|\+84)[0-9]{9,10}$/;
    if (!cleanPhone) {
      errors.phone = "Vui lòng nhập số điện thoại để nhận file.";
    } else if (!phoneRegex.test(cleanPhone)) {
      errors.phone = "Số điện thoại không hợp lệ (gồm 10 chữ số, ví dụ: 0912345678).";
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
          Tra cứu và tải xuống miễn phí các biểu mẫu pháp lý chuẩn xác. Nhập câu văn nói tự nhiên, AI sẽ tự động phân tích ngữ nghĩa và gợi ý biểu mẫu chính xác nhất.
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
      </div>

      {/* Results Section */}
      <section className="w-full py-2">
        <div className="flex items-center gap-2 mb-6 border-b border-border-neutral pb-4">
          <span className="material-symbols-outlined text-amber-700">auto_awesome</span>
          <h2 className="text-xl md:text-2xl font-bold text-slate-900">Kết quả gợi ý từ AI</h2>
          <span className="text-xs font-semibold text-slate-500 ml-auto hidden md:block">
            {isLoading ? "Đang tìm kiếm..." : (debouncedSearchTerm.trim() ? `Tìm thấy ${displayForms.length} biểu mẫu` : "Nhập câu hỏi để tìm kiếm")}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Left Column: Form Cards */}
          <div className="lg:col-span-8 space-y-6">
            {!debouncedSearchTerm.trim() && (
              <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 shadow-xs text-slate-500">
                <span className="material-symbols-outlined text-6xl opacity-20 mb-4 block">search</span>
                Hãy mô tả nhu cầu của bạn, AI sẽ tự động hiểu và tìm biểu mẫu chuẩn xác nhất.
              </div>
            )}

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
