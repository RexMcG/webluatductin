"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { questionService } from "@/services/question.service";

export default function Home() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const [openFaq, setOpenFaq] = useState<number | null>(1);
  const [consultForm, setConsultForm] = useState({
    name: "",
    email: "",
    phone: "",
    category: "Dân sự & Thương mại",
    title: "",
    message: ""
  });
  const [consultErrors, setConsultErrors] = useState<{ [key: string]: string }>({});
  const [consultSent, setConsultSent] = useState(false);
  const [consultSending, setConsultSending] = useState(false);

  // Close search suggestions popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const SEARCH_NAV_ROUTES = [
    { keywords: ["lương", "tính lương", "gross", "net", "lương gross", "lương net", "thu nhập"], title: "Tính Lương Gross-to-Net", href: "/salary-calculator", icon: "payments", desc: "Công cụ chuyển đổi lương Gross sang Net & bảo hiểm" },
    { keywords: ["thuế", "thuế tncn", "tính thuế", "thuế thu nhập cá nhân", "giảm trừ gia cảnh"], title: "Tính Thuế TNCN Khấu Trừ", href: "/pit-calculator", icon: "account_balance", desc: "Tính chính xác mức thuế TNCN phải nộp & giảm trừ" },
    { keywords: ["án phí", "tính án phí", "lệ phí tòa", "tòa án", "án phí dân sự", "án phí đất đai"], title: "Tính Án Phí Tòa Án", href: "/court-fee-calculator", icon: "calculate", desc: "Tra cứu & tính án phí sơ thẩm, phúc thẩm nhanh chóng" },
    { keywords: ["hợp đồng", "thẩm định", "soát hợp đồng", "check hợp đồng", "rủi ro hợp đồng"], title: "Tư Vấn Hợp Đồng Với Luật Sư AI", href: "/ai-chatbot", icon: "smart_toy", desc: "Hỏi Luật sư AI để rà soát rủi ro pháp lý hợp đồng" },
    { keywords: ["biểu mẫu", "mẫu đơn", "thư viện", "mẫu hợp đồng", "tải đơn", "văn bản mẫu"], title: "Thư Viện Biểu Mẫu Pháp Lý AI", href: "/ai-form-library", icon: "description", desc: "Tải về miễn phí 100+ mẫu đơn, mẫu hợp đồng chuẩn" },
    { keywords: ["hỏi ai", "tư vấn ai", "chatbot", "luật sư ai", "hỏi luật", "trợ lý ai"], title: "Trợ Lý Luật Sư AI 24/7", href: "/ai-chatbot", icon: "smart_toy", desc: "Giải đáp thắc mắc pháp lý tự động cùng AI chuyên sâu" },
    { keywords: ["đặt lịch", "đặt hẹn", "gặp luật sư", "tư vấn trực tiếp", "phan đức tín"], title: "Đặt Lịch Hẹn Tư Vấn Trực Tiếp", href: "/appointment", icon: "calendar_month", desc: "Đặt lịch làm việc riêng với Ls. Phan Đức Tín" },
    { keywords: ["đất đai", "bất động sản", "sổ đỏ", "sổ hồng", "tranh chấp đất", "nhà đất"], title: "Dịch Vụ Nhà Đất & Đất Đai", href: "/services/bat-dong-san", icon: "home_work", desc: "Tư vấn sang tên sổ đỏ, quy hoạch & tranh chấp đất đai" },
    { keywords: ["doanh nghiệp", "pháp chế", "luật sư nội bộ", "hợp đồng thương mại", "cổ đông"], title: "Dịch Vụ Hợp Tác Doanh Nghiệp", href: "/services/hop-tac-doanh-nghiep", icon: "corporate_fare", desc: "Luật sư nội bộ & phòng ngừa rủi ro hợp đồng doanh nghiệp" },
    { keywords: ["đầu tư", "fdi", "dự án", "m&a", "giấy phép đầu tư"], title: "Dịch Vụ Tư Vấn Đầu Tư FDI", href: "/services/tu-van-dau-tu", icon: "public", desc: "Tư vấn thủ tục đầu tư nước ngoài & M&A dự án" },
    { keywords: ["tranh tụng", "khởi kiện", "tòa án", "bào chữa", "tố tụng"], title: "Dịch Vụ Tranh Tụng Tòa Án", href: "/services/tranh-tung", icon: "gavel", desc: "Đại diện tranh tụng & bảo vệ quyền lợi tại Tòa án" },
    { keywords: ["lao động", "sa thải", "kỷ luật", "bhxh", "thỏa ước"], title: "Dịch Vụ Pháp Lý Lao Động", href: "/services/lao-dong", icon: "badge", desc: "Giải quyết tranh chấp sa thải & quy chế nhân sự" },
    { keywords: ["ly hôn", "hôn nhân", "thừa kế", "nuôi con", "tài sản vợ chồng"], title: "Dịch Vụ Hôn Nhân & Thừa Kế", href: "/services/hon-nhan-gia-dinh", icon: "family_restroom", desc: "Tư vấn ly hôn, quyền nuôi con & phân chia tài sản" },
    { keywords: ["giấy phép", "giấy phép con", "thành lập công ty", "attp", "pccc"], title: "Thủ Tục Pháp Lý & Giấy Phép Con", href: "/services/thu-tuc-phap-ly-giay-phep", icon: "verified", desc: "Xin giấy phép an toàn thực phẩm, PCCC & ĐKKD" },
    { keywords: ["hình sự", "bào chữa", "tạm giam", "bị can", "tội phạm"], title: "Dịch Vụ Bào Chữa Hình Sự", href: "/services/hinh-su-bao-chua", icon: "gavel", desc: "Bào chữa bị can, bị cáo trong các vụ án hình sự" },
    { keywords: ["sở hữu trí tuệ", "nhãn hiệu", "logo", "bản quyền", "sáng chế"], title: "Sở Hữu Trí Tuệ & Thương Hiệu", href: "/services/so-huu-tri-tue", icon: "copyright", desc: "Đăng ký bảo hộ nhãn hiệu, logo & bản quyền tác giả" }
  ];

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const matchingSuggestions = normalizedQuery
    ? SEARCH_NAV_ROUTES.filter((r) =>
        r.title.toLowerCase().includes(normalizedQuery) ||
        r.desc.toLowerCase().includes(normalizedQuery) ||
        r.keywords.some((k) => k.includes(normalizedQuery) || normalizedQuery.includes(k))
      )
    : [];

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!normalizedQuery) return;

    if (matchingSuggestions.length > 0) {
      router.push(matchingSuggestions[0].href);
    } else {
      router.push(`/ai-chatbot?q=${encodeURIComponent(searchQuery)}`);
    }
    setIsSearchOpen(false);
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const validateConsultForm = () => {
    const errors: { [key: string]: string } = {};
    if (!consultForm.name.trim()) {
      errors.name = "Vui lòng nhập họ và tên của bạn";
    } else if (consultForm.name.trim().length < 2) {
      errors.name = "Họ và tên tối thiểu 2 ký tự";
    }

    const phoneClean = consultForm.phone.replace(/[\s.-]/g, '');
    const phoneRegex = /^(0[3|5|7|8|9])[0-9]{8}$/;
    if (!phoneClean) {
      errors.phone = "Vui lòng nhập số điện thoại liên hệ";
    } else if (!phoneRegex.test(phoneClean)) {
      errors.phone = "Số điện thoại không hợp lệ (gồm 10 số, VD: 0937863263)";
    }

    if (consultForm.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(consultForm.email.trim())) {
        errors.email = "Địa chỉ email chưa đúng định dạng";
      }
    }

    if (!consultForm.message.trim()) {
      errors.message = "Vui lòng mô tả tóm tắt nội dung câu hỏi / vụ việc";
    } else if (consultForm.message.trim().length < 10) {
      errors.message = "Nội dung câu hỏi tối thiểu 10 ký tự để luật sư nắm rõ vụ việc";
    }

    setConsultErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleConsultSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateConsultForm()) {
      return;
    }
    setConsultSending(true);
    try {
      await questionService.createQuestion({
        name: consultForm.name.trim(),
        phone: consultForm.phone.trim(),
        email: consultForm.email.trim() || 'khachhang@ductinlaw.vn',
        category: consultForm.category,
        question: consultForm.message.trim(),
      });
      setConsultSent(true);
      setConsultErrors({});
    } catch (err) {
      console.error(err);
      setConsultSent(true);
    } finally {
      setConsultSending(false);
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section
        className="relative w-full bg-cover bg-[center_25%] bg-no-repeat border-b-[7px] border-[#641D06]"
        style={{ backgroundImage: "url('/img/herobanner.webp')" }}
      >
        <div className="relative z-10 max-w-container-max mx-auto px-4 md:px-margin-desktop py-14 md:py-36 flex flex-col items-center justify-center min-h-[420px] md:min-h-[600px]">
          <div className="max-w-4xl w-full flex flex-col items-center text-center space-y-6 md:space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/90 text-accent text-xs md:text-sm font-bold uppercase tracking-wider shadow-lg">
              <span className="w-2.5 h-2.5 rounded-full bg-accent animate-ping" />
              Đoàn Luật Sư Thành Phố Hồ Chí Minh
            </div>
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black font-sans leading-[1.15] tracking-tight">
              <span className="text-primary drop-shadow-sm">Công Ty Luật TNHH</span><br className="hidden sm:inline" />{" "}
              <span className="text-accent drop-shadow-sm">Đức Tín &amp; Cộng Sự</span>
            </h1>
            <p className="font-body-md text-base md:text-xl text-primary font-semibold max-w-3xl leading-relaxed">
              Trực tiếp điều hành bởi **Luật sư Phan Đức Tín** cùng đội ngũ luật sư giỏi, kết hợp AI pháp lý tiên tiến, bảo vệ tối đa quyền lợi cho bạn và doanh nghiệp.
            </p>

            {/* Smart Navigation Search Bar */}
            <div ref={searchRef} className="mt-8 w-full relative max-w-3xl z-40">
              <form onSubmit={handleSearchSubmit} className="relative w-full shadow-2xl rounded-full">
                <input
                  className="w-full h-16 md:h-20 pl-8 pr-20 border-[3px] border-accent rounded-full focus:ring-4 focus:ring-accent/30 focus:border-accent bg-white text-slate-900 placeholder:text-slate-400 outline-none text-base sm:text-lg md:text-xl font-medium shadow-inner"
                  id="hero-search"
                  placeholder="Nhập nhu cầu (VD: tính lương, tính án phí, ly hôn, rà soát hợp đồng...)"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setIsSearchOpen(true);
                  }}
                  onFocus={() => setIsSearchOpen(true)}
                />
                <button
                  type="submit"
                  className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 bg-[#641D06] hover:bg-black text-amber-400 w-11 h-11 md:w-14 md:h-14 rounded-full flex items-center justify-center text-2xl md:text-3xl transition-transform hover:scale-105 cursor-pointer border border-amber-500/40 shadow-md"
                  id="hero-search-btn"
                  title="Tìm kiếm & Trỏ ngay đến trang"
                >
                  search
                </button>
              </form>

              {/* Live Interactive Route Suggestions Dropdown */}
              {isSearchOpen && normalizedQuery.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-3 bg-white rounded-3xl shadow-2xl border border-slate-200 p-3 z-50 text-left overflow-hidden max-h-[380px] overflow-y-auto divide-y divide-slate-100">
                  <div className="px-4 py-2 text-[11px] font-black uppercase tracking-wider text-amber-900 bg-amber-50 rounded-xl mb-1 flex items-center justify-between">
                    <span>Gợi ý điều hướng thông minh</span>
                    <span className="font-semibold text-slate-500">Bấm Enter để chuyển ngay</span>
                  </div>

                  {matchingSuggestions.length > 0 ? (
                    matchingSuggestions.map((item, idx) => (
                      <Link
                        key={idx}
                        href={item.href}
                        onClick={() => setIsSearchOpen(false)}
                        className="flex items-start gap-3.5 p-3 hover:bg-slate-50 rounded-2xl transition-colors group cursor-pointer"
                      >
                        <div className="w-10 h-10 rounded-xl bg-amber-100/70 text-[#641D06] flex items-center justify-center shrink-0 font-bold group-hover:bg-[#641D06] group-hover:text-white transition-colors">
                          <span className="material-symbols-outlined text-xl">{item.icon}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-bold text-slate-900 text-sm group-hover:text-[#641D06] transition-colors flex items-center justify-between">
                            <span>{item.title}</span>
                            <span className="material-symbols-outlined text-base text-slate-400 group-hover:text-[#641D06] group-hover:translate-x-1 transition-all">
                              arrow_forward
                            </span>
                          </div>
                          <div className="text-xs text-slate-500 truncate mt-0.5">{item.desc}</div>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <Link
                      href={`/ai-chatbot?q=${encodeURIComponent(searchQuery)}`}
                      onClick={() => setIsSearchOpen(false)}
                      className="flex items-center gap-3.5 p-4 hover:bg-amber-50/60 rounded-2xl transition-colors group cursor-pointer"
                    >
                      <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-xl">smart_toy</span>
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 text-sm group-hover:text-[#641D06]">
                          Hỏi Trợ lý Luật sư AI về "{searchQuery}"
                        </div>
                        <div className="text-xs text-slate-500">Chuyển sang khung chat AI để giải đáp thắc mắc chi tiết</div>
                      </div>
                    </Link>
                  )}
                </div>
              )}
            </div>

            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <Link
                className="bg-primary hover:bg-secondary text-white h-14 px-8 rounded-full font-label-sm text-base md:text-lg font-bold transition-all inline-flex items-center shadow-lg gap-2"
                href="/appointment"
              >
                <span className="material-symbols-outlined">calendar_month</span>
                Đặt Lịch Hẹn Với Luật Sư
              </Link>
              <Link
                className="bg-accent hover:opacity-90 text-white h-14 px-8 rounded-full font-label-sm text-base md:text-lg font-bold transition-all inline-flex items-center shadow-lg gap-2"
                href="/ai-chatbot"
              >
                <span className="material-symbols-outlined">smart_toy</span>
                Tư Vấn AI 24/7
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Us & Why Choose Us */}
      <section id="about-us" className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pt-12 md:pt-16 pb-16">
        <div className="flex flex-col gap-12">
          {/* About Us */}
          <div>
            <div className="text-center mb-10 w-full flex flex-col items-center justify-center">
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 font-sans leading-tight tracking-tight uppercase text-center mb-2">
                Về Chúng Tôi
              </h2>
              <div className="text-accent flex items-center justify-center mt-1">
                <span className="tracking-widest font-bold text-lg">— ⚖️ —</span>
              </div>
            </div>
            <div className="prose prose-xl md:prose-2xl text-text-secondary leading-relaxed space-y-4 text-justify text-lg md:text-xl">
              <p>
                <strong>Luật sư Phan Đức Tín</strong> là người sáng lập kiêm Giám đốc Điều hành <strong>Công ty Luật TNHH Đức Tín và Cộng sự</strong>. Hãng luật đã tham gia tư vấn, giải quyết thành công hàng trăm vụ việc chuyên về các lĩnh vực như: đầu tư FDI, lập dự án và xin giấy chứng nhận đầu tư cho các doanh nhân đến từ Nhật Bản, Hàn Quốc, Mỹ, Singapore, Đức...
              </p>
              <p>
                Đồng thời đại diện tranh tụng tại Tòa án và Trọng tài thương mại; tư vấn và thẩm định hợp đồng mua bán doanh nghiệp, sáp nhập, chuyển nhượng vốn, xử lý tranh chấp đất đai, nhà ở, thừa kế và hôn nhân gia đình.
              </p>
            </div>
          </div>

          {/* Why Choose Us */}
          <div>
            <div className="text-center mb-10 w-full flex flex-col items-center justify-center">
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 font-sans leading-tight tracking-tight uppercase text-center mb-2">
                Tại Sao Lại Chọn Chúng Tôi
              </h2>
              <div className="text-accent flex items-center justify-center mt-1">
                <span className="tracking-widest font-bold text-lg">— ⚖️ —</span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: "1. Đội ngũ luật sư vững chuyên môn",
                  desc: "Đội ngũ Luật sư của DucTin & Partners năng động, giàu kinh nghiệm, vững chuyên môn, am hiểu về công nghệ, tận tâm và luôn tuân thủ pháp luật, đạo đức nghề nghiệp."
                },
                {
                  title: "2. Giải quyết vấn đề triệt để",
                  desc: "Giúp giải quyết vấn đề của khách hàng nhanh chóng, hiệu quả với chi phí hợp lý. \"Chất lượng dịch vụ là Danh dự của Luật sư\"."
                },
                {
                  title: "3. Đảm bảo bí mật tuyệt đối",
                  desc: "Giữ bí mật tuyệt đối thông tin, tài liệu của khách hàng. Chúng tôi cam kết bảo vệ quyền lợi tối đa cho bạn."
                },
                {
                  title: "4. Tư vấn chính xác",
                  desc: "Nhận định, đánh giá đúng bản chất vấn đề, đưa ra giải pháp toàn diện và tối ưu nhất cho từng trường hợp cụ thể."
                },
                {
                  title: "5. Chi phí hợp lý",
                  desc: "Cung cấp dịch vụ pháp lý với mức chi phí hợp lý, rõ ràng và minh bạch, phù hợp với tính chất của từng vụ việc."
                },
                {
                  title: "6. Tận tâm, chuyên nghiệp",
                  desc: "Luôn đặt quyền lợi của khách hàng lên hàng đầu, chăm sóc và hỗ trợ tận tâm trong mọi giai đoạn của vụ việc."
                }
              ].map((item, idx) => (
                <div key={idx} className="bg-surface-main p-4 border border-border-neutral rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="font-bold text-primary mb-2 text-base md:text-lg uppercase">
                    {item.title}
                  </h3>
                  <p className="text-base md:text-lg text-text-secondary leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Practice Areas Grid */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-16">
        <div className="text-center mb-12 w-full flex flex-col items-center justify-center">
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 font-sans leading-tight tracking-tight uppercase text-center mb-2">
            Lĩnh Vực Hoạt Động Mũi Nhọn
          </h2>
          <div className="text-accent flex items-center justify-center mt-1">
            <span className="tracking-widest font-bold text-lg">— ⚖️ —</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          
          {/* 1. Nội bộ doanh nghiệp */}
          <div className="bg-border-neutral/30 p-2 rounded-[2.5rem] transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-[0.98] group">
            <div className="bg-surface-main shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)] rounded-[calc(2.5rem-0.5rem)] p-6 sm:p-8 h-full flex flex-col border border-border-neutral/50">
              <div className="relative w-full h-48 sm:h-52 rounded-2xl overflow-hidden mb-6 border border-slate-100 bg-slate-100 shadow-2xs">
                <img
                  src="/img/card_business.webp"
                  alt="Nội bộ doanh nghiệp"
                  width={700}
                  height={394}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <span className="rounded-full px-3 py-1 bg-white/95 backdrop-blur-xs text-[10px] uppercase tracking-[0.2em] font-extrabold text-amber-950 border border-amber-200/80 shadow-xs">
                    Doanh nghiệp
                  </span>
                </div>
              </div>
              <h3 className="font-headline-lg text-[26px] sm:text-[28px] text-primary mb-3 leading-tight font-bold">Nội bộ doanh nghiệp</h3>
              <p className="font-body-md text-text-secondary leading-relaxed mb-8 flex-grow text-sm sm:text-base">
                Xây dựng quy chế hoạt động, cơ cấu quản trị nội bộ, giải quyết mâu thuẫn giữa các thành viên/cổ đông.
              </p>
              <div className="flex flex-col gap-3 mt-auto">
                <Link href="/appointment" className="flex w-full items-center justify-center bg-[#641D06] hover:bg-black text-white rounded-full px-6 py-3 transition-colors font-bold text-sm sm:text-[15px] shadow-2xs text-center">
                  Đặt lịch hẹn
                </Link>
                <Link href="/ai-chatbot" className="flex w-full items-center justify-center bg-amber-50 hover:bg-amber-100 text-[#641D06] border border-amber-300/80 rounded-full px-6 py-3 transition-colors font-bold text-sm sm:text-[15px] shadow-2xs text-center">
                  Hỏi ngay AI
                </Link>
              </div>
            </div>
          </div>

          {/* 2. Tư vấn đầu tư */}
          <div className="bg-border-neutral/30 p-2 rounded-[2.5rem] transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-[0.98] group">
            <div className="bg-surface-main shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)] rounded-[calc(2.5rem-0.5rem)] p-6 sm:p-8 h-full flex flex-col border border-border-neutral/50">
              <div className="relative w-full h-48 sm:h-52 rounded-2xl overflow-hidden mb-6 border border-slate-100 bg-slate-100 shadow-2xs">
                <img
                  src="/img/card_fdi.webp"
                  alt="Tư vấn đầu tư FDI"
                  width={700}
                  height={394}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <span className="rounded-full px-3 py-1 bg-white/95 backdrop-blur-xs text-[10px] uppercase tracking-[0.2em] font-extrabold text-amber-950 border border-amber-200/80 shadow-xs">
                    Thương mại
                  </span>
                </div>
              </div>
              <h3 className="font-headline-lg text-[26px] sm:text-[28px] text-primary mb-3 leading-tight font-bold">Tư vấn đầu tư FDI</h3>
              <p className="font-body-md text-text-secondary leading-relaxed mb-8 flex-grow text-sm sm:text-base">
                Cố vấn chiến lược cho các nhà đầu tư trong và ngoài nước (FDI). Đánh giá tính pháp lý của dự án, tối ưu hóa cấu trúc vốn.
              </p>
              <div className="flex flex-col gap-3 mt-auto">
                <Link href="/appointment" className="flex w-full items-center justify-center bg-[#641D06] hover:bg-black text-white rounded-full px-6 py-3 transition-colors font-bold text-sm sm:text-[15px] shadow-2xs text-center">
                  Đặt lịch hẹn
                </Link>
                <Link href="/ai-chatbot" className="flex w-full items-center justify-center bg-amber-50 hover:bg-amber-100 text-[#641D06] border border-amber-300/80 rounded-full px-6 py-3 transition-colors font-bold text-sm sm:text-[15px] shadow-2xs text-center">
                  Hỏi ngay AI
                </Link>
              </div>
            </div>
          </div>

          {/* 3. Tranh tụng */}
          <div className="bg-border-neutral/30 p-2 rounded-[2.5rem] transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-[0.98] group">
            <div className="bg-surface-main shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)] rounded-[calc(2.5rem-0.5rem)] p-6 sm:p-8 h-full flex flex-col border border-border-neutral/50">
              <div className="relative w-full h-48 sm:h-52 rounded-2xl overflow-hidden mb-6 border border-slate-100 bg-slate-100 shadow-2xs">
                <img
                  src="/img/card_court.webp"
                  alt="Tranh tụng Tòa án"
                  width={700}
                  height={394}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <span className="rounded-full px-3 py-1 bg-white/95 backdrop-blur-xs text-[10px] uppercase tracking-[0.2em] font-extrabold text-amber-950 border border-amber-200/80 shadow-xs">
                    Cốt lõi
                  </span>
                </div>
              </div>
              <h3 className="font-headline-lg text-[26px] sm:text-[28px] text-primary mb-3 leading-tight font-bold">Tranh tụng Tòa án</h3>
              <p className="font-body-md text-text-secondary leading-relaxed mb-8 flex-grow text-sm sm:text-base">
                Đại diện khách hàng tham gia tố tụng tại Tòa án và Trọng tài thương mại các cấp. Bào chữa, bảo vệ tối đa quyền lợi.
              </p>
              <div className="flex flex-col gap-3 mt-auto">
                <Link href="/appointment" className="flex w-full items-center justify-center bg-[#641D06] hover:bg-black text-white rounded-full px-6 py-3 transition-colors font-bold text-sm sm:text-[15px] shadow-2xs text-center">
                  Đặt lịch hẹn
                </Link>
                <Link href="/ai-chatbot" className="flex w-full items-center justify-center bg-amber-50 hover:bg-amber-100 text-[#641D06] border border-amber-300/80 rounded-full px-6 py-3 transition-colors font-bold text-sm sm:text-[15px] shadow-2xs text-center">
                  Hỏi ngay AI
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Featured Tools */}
      <section className="bg-surface-alt border-y border-border-neutral py-16">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="text-center mb-12 w-full flex flex-col items-center justify-center">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 font-sans leading-tight tracking-tight uppercase text-center mb-2">
              Công Cụ Pháp Lý &amp; AI
            </h2>
            <div className="text-amber-800 flex items-center justify-center mt-1">
              <span className="tracking-widest font-bold text-lg">— ⚖️ —</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {/* Tool 1 */}
            <div className="bg-border-neutral/30 p-2 rounded-[2.5rem] transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-[0.98] group">
              <div className="bg-surface-main shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)] rounded-[calc(2.5rem-0.5rem)] p-6 sm:p-8 h-full flex flex-col border border-border-neutral/50">
                <div className="relative w-full h-48 sm:h-52 rounded-2xl overflow-hidden mb-6 border border-slate-100 bg-slate-100 shadow-2xs">
                  <img
                    src="/img/card_labor.webp"
                    alt="Tính Lương Gross-to-Net"
                    width={700}
                    height={394}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="rounded-full px-3 py-1 bg-white/95 backdrop-blur-xs text-[10px] uppercase tracking-[0.2em] font-extrabold text-amber-950 border border-amber-200/80 shadow-xs">
                      Lao động & Thuế
                    </span>
                  </div>
                </div>
                <h3 className="font-headline-lg text-[26px] sm:text-[28px] text-primary mb-3 leading-tight font-bold group-hover:text-[#641D06] transition-colors">
                  Tính Lương Gross-to-Net
                </h3>
                <p className="font-body-md text-text-secondary leading-relaxed mb-8 flex-grow text-sm sm:text-base">
                  Công cụ tính lương, BHXH, BHYT và các khoản trích theo lương chuẩn xác theo quy định pháp luật 2026.
                </p>
                <div className="mt-auto">
                  <Link href="/salary-calculator" className="flex w-full items-center justify-center bg-[#641D06] hover:bg-black text-white rounded-full px-6 py-3.5 transition-colors font-bold text-sm sm:text-[15px] shadow-2xs text-center">
                    Sử dụng ngay
                  </Link>
                </div>
              </div>
            </div>

            {/* Tool 2 */}
            <div className="bg-border-neutral/30 p-2 rounded-[2.5rem] transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-[0.98] group">
              <div className="bg-surface-main shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)] rounded-[calc(2.5rem-0.5rem)] p-6 sm:p-8 h-full flex flex-col border border-border-neutral/50">
                <div className="relative w-full h-48 sm:h-52 rounded-2xl overflow-hidden mb-6 border border-slate-100 bg-slate-100 shadow-2xs">
                  <img
                    src="/img/card_tool_calc.webp"
                    alt="Tính Án Phí Tòa Án"
                    width={700}
                    height={394}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="rounded-full px-3 py-1 bg-white/95 backdrop-blur-xs text-[10px] uppercase tracking-[0.2em] font-extrabold text-amber-950 border border-amber-200/80 shadow-xs">
                      Tố tụng & Án phí
                    </span>
                  </div>
                </div>
                <h3 className="font-headline-lg text-[26px] sm:text-[28px] text-primary mb-3 leading-tight font-bold group-hover:text-[#641D06] transition-colors">
                  Tính Án Phí Tòa Án
                </h3>
                <p className="font-body-md text-text-secondary leading-relaxed mb-8 flex-grow text-sm sm:text-base">
                  Tính toán nhanh tạm ứng án phí và án phí chính thức các vụ việc dân sự, kinh doanh thương mại và lệ phí tòa án.
                </p>
                <div className="mt-auto">
                  <Link href="/court-fee-calculator" className="flex w-full items-center justify-center bg-[#641D06] hover:bg-black text-white rounded-full px-6 py-3.5 transition-colors font-bold text-sm sm:text-[15px] shadow-2xs text-center">
                    Sử dụng ngay
                  </Link>
                </div>
              </div>
            </div>

            {/* Tool 3 */}
            <div className="bg-border-neutral/30 p-2 rounded-[2.5rem] transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-[0.98] group">
              <div className="bg-surface-main shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)] rounded-[calc(2.5rem-0.5rem)] p-6 sm:p-8 h-full flex flex-col border border-border-neutral/50">
                <div className="relative w-full h-48 sm:h-52 rounded-2xl overflow-hidden mb-6 border border-slate-100 bg-slate-100 shadow-2xs">
                  <img
                    src="/img/card_tool_forms.webp"
                    alt="Thư Viện Biểu Mẫu AI"
                    width={700}
                    height={394}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="rounded-full px-3 py-1 bg-white/95 backdrop-blur-xs text-[10px] uppercase tracking-[0.2em] font-extrabold text-amber-950 border border-amber-200/80 shadow-xs">
                      Kho biểu mẫu AI
                    </span>
                  </div>
                </div>
                <h3 className="font-headline-lg text-[26px] sm:text-[28px] text-primary mb-3 leading-tight font-bold group-hover:text-[#641D06] transition-colors">
                  Thư Viện Biểu Mẫu AI
                </h3>
                <p className="font-body-md text-text-secondary leading-relaxed mb-8 flex-grow text-sm sm:text-base">
                  Tìm kiếm thông minh ngữ nghĩa và tải về trọn bộ biểu mẫu pháp lý chuẩn xác (.doc) có thẩm định tức thì.
                </p>
                <div className="mt-auto">
                  <Link href="/ai-form-library" className="flex w-full items-center justify-center bg-[#641D06] hover:bg-black text-white rounded-full px-6 py-3.5 transition-colors font-bold text-sm sm:text-[15px] shadow-2xs text-center">
                    Sử dụng ngay
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-16 my-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 items-start">
          
          {/* Consultation Form (Left) */}
          <div className="bg-[#92400e] p-8 md:p-12 text-white h-full flex flex-col justify-center rounded-3xl shadow-xl">
            <h2 className="text-2xl md:text-3xl font-black mb-3 uppercase leading-snug font-sans text-white">ĐẶT CÂU HỎI VỚI LUẬT SƯ PHAN ĐỨC TÍN</h2>
            <p className="mb-8 text-amber-100 text-sm md:text-base font-medium">Điền thông tin vụ việc, chúng tôi sẽ liên hệ tư vấn trong thời gian sớm nhất.</p>

            {consultSent ? (
              <div className="bg-white/20 border border-white/40 p-6 rounded-2xl text-center">
                <span className="material-symbols-outlined text-5xl mb-2">check_circle</span>
                <h3 className="text-xl font-bold mb-2">Đã Gửi Yêu CẦU Thành Công!</h3>
                <p className="text-sm text-white/90">Luật sư Phan Đức Tín sẽ liên hệ lại với bạn qua số điện thoại <strong>{consultForm.phone}</strong>.</p>
              </div>
            ) : (
              <form className="space-y-4" onSubmit={handleConsultSubmit} noValidate>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <input 
                      type="text" 
                      placeholder="Họ và tên *" 
                      aria-label="Họ và tên khách hàng"
                      value={consultForm.name} 
                      onChange={e => {
                        setConsultForm({...consultForm, name: e.target.value});
                        if (consultErrors.name) setConsultErrors({...consultErrors, name: ""});
                      }} 
                      className={`w-full px-4 py-3.5 bg-white text-gray-800 rounded-xl outline-none text-sm border-2 ${
                        consultErrors.name ? 'border-red-400 bg-red-50/20 ring-2 ring-red-400' : 'border-transparent focus:ring-2 focus:ring-amber-300'
                      }`}
                      required 
                    />
                    {consultErrors.name && (
                      <span className="text-amber-200 text-xs mt-1 block font-medium">⚠️ {consultErrors.name}</span>
                    )}
                  </div>
                  <div>
                    <input 
                      type="email" 
                      placeholder="Địa chỉ Email" 
                      aria-label="Địa chỉ Email khách hàng"
                      value={consultForm.email} 
                      onChange={e => {
                        setConsultForm({...consultForm, email: e.target.value});
                        if (consultErrors.email) setConsultErrors({...consultErrors, email: ""});
                      }} 
                      className={`w-full px-4 py-3.5 bg-white text-gray-800 rounded-xl outline-none text-sm border-2 ${
                        consultErrors.email ? 'border-red-400 bg-red-50/20 ring-2 ring-red-400' : 'border-transparent focus:ring-2 focus:ring-amber-300'
                      }`}
                    />
                    {consultErrors.email && (
                      <span className="text-amber-200 text-xs mt-1 block font-medium">⚠️ {consultErrors.email}</span>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <input 
                      type="tel" 
                      placeholder="Số điện thoại (VD: 0937863263) *" 
                      aria-label="Số điện thoại liên hệ"
                      value={consultForm.phone} 
                      onChange={e => {
                        setConsultForm({...consultForm, phone: e.target.value});
                        if (consultErrors.phone) setConsultErrors({...consultErrors, phone: ""});
                      }} 
                      className={`w-full px-4 py-3.5 bg-white text-gray-800 rounded-xl outline-none text-sm border-2 ${
                        consultErrors.phone ? 'border-red-400 bg-red-50/20 ring-2 ring-red-400' : 'border-transparent focus:ring-2 focus:ring-amber-300'
                      }`}
                      required 
                    />
                    {consultErrors.phone && (
                      <span className="text-amber-200 text-xs mt-1 block font-medium">⚠️ {consultErrors.phone}</span>
                    )}
                  </div>
                  <div className="relative">
                    <select 
                      id="consult-service-select"
                      aria-label="Lĩnh vực tư vấn pháp lý"
                      value={consultForm.category} 
                      onChange={e => setConsultForm({...consultForm, category: e.target.value})} 
                      className="w-full px-4 py-3.5 bg-white text-gray-800 rounded-xl border-none focus:ring-2 focus:ring-amber-300 outline-none text-sm cursor-pointer font-medium"
                    >
                      <option value="Dân sự & Thương mại">Dân sự & Thương mại</option>
                      <option value="Hình sự & Bào chữa">Hình sự & Bào chữa</option>
                      <option value="Doanh nghiệp & Đầu tư">Doanh nghiệp & Đầu tư</option>
                      <option value="Đất đai & Nhà ở">Đất đai & Nhà ở</option>
                      <option value="Hôn nhân & Gia đình">Hôn nhân & Gia đình</option>
                      <option value="Sở hữu trí tuệ">Sở hữu trí tuệ</option>
                      <option value="Lao động & Tiền lương">Lao động & Tiền lương</option>
                    </select>
                  </div>
                </div>
                <div>
                  <textarea 
                    placeholder="Mô tả tóm tắt câu hỏi hoặc vụ việc của bạn (tối thiểu 10 ký tự)... *" 
                    aria-label="Mô tả tóm tắt nội dung vụ việc"
                    rows={4} 
                    value={consultForm.message} 
                    onChange={e => {
                      setConsultForm({...consultForm, message: e.target.value});
                      if (consultErrors.message) setConsultErrors({...consultErrors, message: ""});
                    }} 
                    className={`w-full px-4 py-3.5 bg-white text-gray-800 rounded-xl outline-none resize-none text-sm font-medium border-2 ${
                      consultErrors.message ? 'border-red-400 bg-red-50/20 ring-2 ring-red-400' : 'border-transparent focus:ring-2 focus:ring-amber-300'
                    }`}
                  ></textarea>
                  {consultErrors.message && (
                    <span className="text-amber-200 text-xs mt-1 block font-medium">⚠️ {consultErrors.message}</span>
                  )}
                </div>
                <button 
                  type="submit" 
                  disabled={consultSending}
                  className="bg-slate-900 text-white font-bold uppercase px-8 py-3.5 rounded-xl hover:bg-black transition-colors shadow-md text-sm cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {consultSending ? "ĐANG GỬI YÊU CẦU..." : "GỬI YÊU CẦU CHO LUẬT SƯ"}
                </button>
              </form>
            )}
          </div>

          {/* FAQ Accordion (Right) */}
          <div className="p-4 md:p-8">
            <h2 className="text-[#92400e] font-black text-2xl md:text-3xl uppercase mb-2 font-sans">CÂU HỎI &amp; GIẢI ĐÁP PHÁP LUẬT</h2>
            <div className="text-amber-800 mb-8 flex items-center">
              <span className="tracking-widest font-bold">— ⚖️ —</span>
            </div>

            <div className="space-y-4">
              {[
                {
                  q: "Khi Giấy chứng nhận quyền sử dụng đất hết thời hạn phải làm sao?",
                  a: "Theo Luật Đất đai mới nhất, hộ gia đình, cá nhân trực tiếp sản xuất nông nghiệp khi hết thời hạn sử dụng đất nếu có nhu cầu thì được tiếp tục sử dụng mà không phải làm thủ tục gia hạn. Đối với đất thương mại dịch vụ hoặc tổ chức, cần nộp hồ sơ xin gia hạn trước khi hết hạn ít nhất 06 tháng."
                },
                {
                  q: "Thủ tục ly hôn thuận tình cần chuẩn bị những hồ sơ gì?",
                  a: "Hồ sơ gồm: Đơn yêu cầu công nhận thuận tình ly hôn (theo mẫu của Tòa án); Giấy chứng nhận kết hôn (bản chính); Bản sao CCCD/Hộ chiếu của vợ và chồng; Giấy khai sinh của các con chung; Giấy tờ chứng minh tài sản chung và nợ chung (nếu có yêu cầu Tòa án công nhận)."
                },
                {
                  q: "Doanh nghiệp nước ngoài đầu tư vào Việt Nam cần những điều kiện gì?",
                  a: "Cần đáp ứng điều kiện về tiếp cận thị trường theo ngành nghề đăng ký, có dự án đầu tư hợp pháp, địa điểm thực hiện dự án phù hợp quy hoạch, năng lực tài chính và làm thủ tục xin cấp Giấy chứng nhận đăng ký đầu tư (IRC) và Giấy chứng nhận đăng ký doanh nghiệp (ERC)."
                }
              ].map((faq, idx) => (
                <div key={idx} className="border border-slate-200 rounded-2xl overflow-hidden shadow-2xs">
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full text-left p-4 sm:p-5 bg-white hover:bg-slate-50 flex items-center justify-between gap-4 font-bold text-slate-900 text-sm transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <span className="material-symbols-outlined text-slate-400 text-xl flex-shrink-0">
                      {openFaq === idx ? "expand_less" : "expand_more"}
                    </span>
                  </button>
                  {openFaq === idx && (
                    <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-100 text-slate-600 text-sm leading-relaxed">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-8">
              <Link href="/news" className="inline-block bg-[#92400e] text-white font-bold uppercase px-8 py-3.5 rounded-xl hover:bg-[#78350f] transition-colors shadow-sm text-sm">
                XEM THÊM BÀI VIẾT
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* Expert Attorneys */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-14">
        <div className="text-center mb-12 w-full flex flex-col items-center justify-center">
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 font-sans leading-tight tracking-tight uppercase text-center mb-2">
            Đội Ngũ Luật Sư Điều Hành
          </h2>
          <div className="text-amber-800 flex items-center justify-center mt-1">
            <span className="tracking-widest font-bold text-lg">— ⚖️ —</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {[
            {
              name: "Ls. Phan Đức Tín",
              role: "Luật sư Trưởng - Giám đốc Điều hành",
              desc: "Hơn 15 năm kinh nghiệm tranh tụng, tư vấn đầu tư FDI và mua bán sáp nhập doanh nghiệp.",
              img: "avatar1.webp"
            },
            {
              name: "Ls. Nguyễn Hoàng Long",
              role: "Phó Giám đốc - Trưởng ban Tranh tụng",
              desc: "Chuyên sâu tố tụng Tòa án, giải quyết tranh chấp kinh doanh thương mại và bất động sản.",
              img: "avatar2.webp"
            },
            {
              name: "Ls. Trần Minh Tuấn",
              role: "Trưởng phòng Doanh nghiệp & Đầu tư",
              desc: "Chuyên thẩm định pháp lý hợp đồng quốc tế, sở hữu trí tuệ và cơ cấu vốn doanh nghiệp.",
              img: "avatar3.webp"
            }
          ].map((ls, idx) => (
            <div key={idx} className="border border-slate-200 p-6 sm:p-7 rounded-3xl bg-white shadow-sm hover:shadow-xl hover:border-amber-400 hover:-translate-y-1 transition-all flex flex-col items-center text-center">
              <div className="w-28 h-28 bg-emerald-100 rounded-full border-2 border-emerald-300 mb-5 overflow-hidden shadow-xs">
                <img 
                  alt={ls.name} 
                  width={112}
                  height={112}
                  loading="lazy"
                  className="w-full h-full object-cover" 
                  src={`/img/${ls.img}`} 
                />
              </div>
              <h3 className="text-xl font-bold text-slate-900 font-sans mb-1">{ls.name}</h3>
              <p className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-3">{ls.role}</p>
              <p className="text-slate-600 text-sm mb-6 leading-relaxed flex-grow">{ls.desc}</p>
              <div className="w-full pt-4 border-t border-slate-100">
                <Link className="flex items-center justify-center w-full bg-[#641D06] hover:bg-black text-white h-11 rounded-xl font-bold text-sm sm:text-base transition-all shadow-xs text-center" href="/appointment">
                  Đặt Lịch Hẹn Tư Vấn
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Client Marquee */}
      <section className="border-y border-border-neutral py-12 md:py-16 bg-surface-main overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-8 mb-8 text-center">
          <h3 className="font-sans text-slate-800 uppercase tracking-widest text-sm md:text-base font-black">
            Đối Tác &amp; Khách Hàng Tiêu Biểu
          </h3>
          <div className="text-amber-800 flex items-center justify-center mt-1.5">
            <span className="tracking-widest font-bold text-xs">— ⚖️ —</span>
          </div>
        </div>
        <div className="relative w-full overflow-hidden flex py-2">
          <div className="flex whitespace-nowrap animate-marquee w-max items-center">
            {/* Logos */}
            {[
              "1_16695707988051.webp",
              "2_16695708063758.webp",
              "3_16695708141883.webp",
              "4_16695708242618.webp",
              "5_16695708351998.webp",
              "6_16695708438339.webp",
              "7_16695708602002.webp",
            ].map((img, i) => (
              <div key={i} className="mx-6 md:mx-10 shrink-0 flex items-center justify-center">
                <img
                  src={`/img/${img}`}
                  width={200}
                  height={100}
                  loading="lazy"
                  className="h-20 md:h-24 max-w-[160px] md:max-w-[200px] object-contain opacity-100 hover:scale-105 transition-all duration-300"
                  alt="Client Logo"
                />
              </div>
            ))}
            {/* Duplicate for marquee effect */}
            {[
              "1_16695707988051.webp",
              "2_16695708063758.webp",
              "3_16695708141883.webp",
              "4_16695708242618.webp",
              "5_16695708351998.webp",
              "6_16695708438339.webp",
              "7_16695708602002.webp",
            ].map((img, i) => (
              <div key={`dup-${i}`} className="mx-6 md:mx-10 shrink-0 flex items-center justify-center">
                <img
                  src={`/img/${img}`}
                  width={200}
                  height={100}
                  loading="lazy"
                  className="h-20 md:h-24 max-w-[160px] md:max-w-[200px] object-contain opacity-100 hover:scale-105 transition-all duration-300"
                  alt="Client Logo"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
