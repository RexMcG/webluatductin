"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

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
    category: "1",
    title: "",
    message: ""
  });
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

  const handleConsultSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consultForm.name || !consultForm.phone) {
      alert("Vui lòng điền họ tên và số điện thoại.");
      return;
    }
    setConsultSending(true);
    try {
      await fetch('http://localhost:3001/api/v1/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: consultForm.name,
          phone: consultForm.phone,
          email: consultForm.email || 'khachhang@ductinlaw.vn',
          appointmentDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
          appointmentTime: '09:00:00',
        })
      });
      setConsultSent(true);
    } catch (err) {
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
        style={{ backgroundImage: "url('/img/herobanner.png')" }}
      >
        <div className="relative z-10 max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-28 md:py-40 flex flex-col items-center justify-center min-h-[500px] md:min-h-[620px]">
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

      {/* Floating Sub-Nav Pill Bar */}
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg">
        <div className="flex flex-wrap justify-center gap-stack-sm bg-surface-alt border border-border-neutral rounded-full p-2">
          <Link
            className="bg-primary text-on-primary rounded-full px-5 py-2.5 font-label-sm text-sm uppercase transition-colors font-semibold flex items-center gap-2"
            href="/services"
          >
            <span className="material-symbols-outlined text-lg">gavel</span>
            Lĩnh vực Pháp lý
          </Link>
          <Link
            className="bg-surface-main text-text-secondary hover:text-primary rounded-full px-5 py-2.5 font-label-sm text-sm uppercase transition-colors font-semibold flex items-center gap-2"
            href="/ai-form-library"
          >
            <span className="material-symbols-outlined text-lg">description</span>
            Thư viện Biểu mẫu AI
          </Link>
          <Link
            className="bg-surface-main text-text-secondary hover:text-primary rounded-full px-5 py-2.5 font-label-sm text-sm uppercase transition-colors font-semibold flex items-center gap-2"
            href="/court-fee-calculator"
          >
            <span className="material-symbols-outlined text-lg">calculate</span>
            Công cụ Tính toán
          </Link>
          <Link
            className="bg-surface-main text-text-secondary hover:text-primary rounded-full px-5 py-2.5 font-label-sm text-sm uppercase transition-colors font-semibold flex items-center gap-2"
            href="/news"
          >
            <span className="material-symbols-outlined text-lg">newspaper</span>
            Bảng tin Pháp luật
          </Link>
          <Link
            className="bg-surface-main text-text-secondary hover:text-primary rounded-full px-5 py-2.5 font-label-sm text-sm uppercase transition-colors font-semibold flex items-center gap-2"
            href="/ai-chatbot"
          >
            <span className="material-symbols-outlined text-lg">smart_toy</span>
            Trợ lý Luật sư AI
          </Link>
        </div>
      </div>

      {/* About Us & Why Choose Us */}
      <section id="about-us" className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pb-section-padding">
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
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-12">
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
            <div className="bg-surface-main shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)] rounded-[calc(2.5rem-0.5rem)] p-8 h-full flex flex-col border border-border-neutral/50">
              <div className="rounded-full px-3 py-1 bg-surface-alt text-[10px] uppercase tracking-[0.2em] font-medium text-text-secondary w-max mb-8 border border-border-neutral/50">
                Doanh nghiệp
              </div>
              <h3 className="font-headline-lg text-[28px] text-primary mb-4 leading-tight">Nội bộ doanh nghiệp</h3>
              <p className="font-body-md text-text-secondary leading-relaxed mb-10 flex-grow">
                Xây dựng quy chế hoạt động, cơ cấu quản trị nội bộ, giải quyết mâu thuẫn giữa các thành viên/cổ đông.
              </p>
              <div className="flex flex-col gap-3 mt-auto">
                <Link href="/appointment" className="flex w-full items-center justify-between bg-primary text-on-primary rounded-full pl-6 pr-2 py-2 hover:bg-secondary transition-colors duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group/btn">
                  <span className="font-label-sm font-semibold tracking-wide text-sm">Đặt lịch hẹn</span>
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center group-hover/btn:translate-x-1 group-hover/btn:-translate-y-[1px] group-hover/btn:scale-105 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]">
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </div>
                </Link>
                <Link href="/ai-chatbot" className="flex w-full items-center justify-center gap-2 bg-surface-main border border-border-neutral text-primary rounded-full px-6 py-3 hover:bg-surface-alt transition-colors duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98]">
                  <span className="material-symbols-outlined text-base text-accent">smart_toy</span>
                  <span className="font-label-sm font-semibold tracking-wide text-sm">Hỏi ngay AI</span>
                </Link>
              </div>
            </div>
          </div>

          {/* 2. Tư vấn đầu tư */}
          <div className="bg-border-neutral/30 p-2 rounded-[2.5rem] transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-[0.98] group">
            <div className="bg-surface-main shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)] rounded-[calc(2.5rem-0.5rem)] p-8 h-full flex flex-col border border-border-neutral/50">
              <div className="rounded-full px-3 py-1 bg-surface-alt text-[10px] uppercase tracking-[0.2em] font-medium text-text-secondary w-max mb-8 border border-border-neutral/50">
                Thương mại
              </div>
              <h3 className="font-headline-lg text-[28px] text-primary mb-4 leading-tight">Tư vấn đầu tư FDI</h3>
              <p className="font-body-md text-text-secondary leading-relaxed mb-10 flex-grow">
                Cố vấn chiến lược cho các nhà đầu tư trong và ngoài nước (FDI). Đánh giá tính pháp lý của dự án, tối ưu hóa cấu trúc vốn.
              </p>
              <div className="flex flex-col gap-3 mt-auto">
                <Link href="/appointment" className="flex w-full items-center justify-between bg-primary text-on-primary rounded-full pl-6 pr-2 py-2 hover:bg-secondary transition-colors duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group/btn">
                  <span className="font-label-sm font-semibold tracking-wide text-sm">Đặt lịch hẹn</span>
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center group-hover/btn:translate-x-1 group-hover/btn:-translate-y-[1px] group-hover/btn:scale-105 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]">
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </div>
                </Link>
                <Link href="/ai-chatbot" className="flex w-full items-center justify-center gap-2 bg-surface-main border border-border-neutral text-primary rounded-full px-6 py-3 hover:bg-surface-alt transition-colors duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98]">
                  <span className="material-symbols-outlined text-base text-accent">smart_toy</span>
                  <span className="font-label-sm font-semibold tracking-wide text-sm">Hỏi ngay AI</span>
                </Link>
              </div>
            </div>
          </div>

          {/* 3. Tranh tụng */}
          <div className="bg-border-neutral/30 p-2 rounded-[2.5rem] transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-[0.98] group">
            <div className="bg-surface-main shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)] rounded-[calc(2.5rem-0.5rem)] p-8 h-full flex flex-col border border-border-neutral/50">
              <div className="rounded-full px-3 py-1 bg-surface-alt text-[10px] uppercase tracking-[0.2em] font-medium text-text-secondary w-max mb-8 border border-border-neutral/50">
                Cốt lõi
              </div>
              <h3 className="font-headline-lg text-[28px] text-primary mb-4 leading-tight">Tranh tụng Tòa án</h3>
              <p className="font-body-md text-text-secondary leading-relaxed mb-10 flex-grow">
                Đại diện khách hàng tham gia tố tụng tại Tòa án và Trọng tài thương mại các cấp. Bào chữa, bảo vệ tối đa quyền lợi.
              </p>
              <div className="flex flex-col gap-3 mt-auto">
                <Link href="/appointment" className="flex w-full items-center justify-between bg-primary text-on-primary rounded-full pl-6 pr-2 py-2 hover:bg-secondary transition-colors duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group/btn">
                  <span className="font-label-sm font-semibold tracking-wide text-sm">Đặt lịch hẹn</span>
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center group-hover/btn:translate-x-1 group-hover/btn:-translate-y-[1px] group-hover/btn:scale-105 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]">
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </div>
                </Link>
                <Link href="/ai-chatbot" className="flex w-full items-center justify-center gap-2 bg-surface-main border border-border-neutral text-primary rounded-full px-6 py-3 hover:bg-surface-alt transition-colors duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98]">
                  <span className="material-symbols-outlined text-base text-accent">smart_toy</span>
                  <span className="font-label-sm font-semibold tracking-wide text-sm">Hỏi ngay AI</span>
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Featured Tools */}
      <section className="bg-surface-alt border-y border-border-neutral py-12">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="text-center mb-12 w-full flex flex-col items-center justify-center">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 font-sans leading-tight tracking-tight uppercase text-center mb-2">
              Công Cụ Pháp Lý &amp; AI
            </h2>
            <div className="text-accent flex items-center justify-center mt-1">
              <span className="tracking-widest font-bold text-lg">— ⚖️ —</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            <div className="bg-surface-main border border-border-neutral p-6 hover:shadow-elegant-hover shadow-elegant transition-shadow rounded-2xl">
              <span className="material-symbols-outlined text-4xl text-emerald-700 mb-4">calculate</span>
              <h3 className="font-headline-md text-xl font-bold text-primary mb-2">Tính Lương Gross-to-Net</h3>
              <p className="font-body-md text-text-secondary mb-4 h-12 text-sm">Công cụ tính lương, BHXH, BHYT và các khoản trích theo lương chuẩn xác 2026.</p>
              <Link className="block w-full bg-surface-main border border-primary text-primary h-11 rounded-xl font-bold hover:bg-primary hover:text-white transition-colors text-center leading-[44px]" href="/salary-calculator">Sử dụng ngay</Link>
            </div>
            <div className="bg-surface-main border border-border-neutral p-6 hover:shadow-elegant-hover shadow-elegant transition-shadow rounded-2xl">
              <span className="material-symbols-outlined text-4xl text-emerald-700 mb-4">account_balance_wallet</span>
              <h3 className="font-headline-md text-xl font-bold text-primary mb-2">Tính Án Phí Tòa Án</h3>
              <p className="font-body-md text-text-secondary mb-4 h-12 text-sm">Tính toán nhanh án phí dân sự, kinh doanh thương mại và lệ phí tòa án.</p>
              <Link className="block w-full bg-surface-main border border-primary text-primary h-11 rounded-xl font-bold hover:bg-primary hover:text-white transition-colors text-center leading-[44px]" href="/court-fee-calculator">Sử dụng ngay</Link>
            </div>
            <div className="bg-surface-main border border-border-neutral p-6 hover:shadow-elegant-hover shadow-elegant transition-shadow rounded-2xl">
              <span className="material-symbols-outlined text-4xl text-emerald-700 mb-4">smart_toy</span>
              <h3 className="font-headline-md text-xl font-bold text-primary mb-2">Thư Viện Biểu Mẫu AI</h3>
              <p className="font-body-md text-text-secondary mb-4 h-12 text-sm">Tìm kiếm thông minh và tải về biểu mẫu pháp lý chuẩn xác (.doc) tức thì.</p>
              <Link className="block w-full bg-surface-main border border-primary text-primary h-11 rounded-xl font-bold hover:bg-primary hover:text-white transition-colors text-center leading-[44px]" href="/ai-form-library">Sử dụng ngay</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Consultation Form & FAQ */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-16 my-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          
          {/* Consultation Form (Left) */}
          <div className="bg-[#c29837] p-8 md:p-12 text-white h-full flex flex-col justify-center rounded-3xl shadow-xl">
            <h2 className="text-2xl md:text-3xl font-black mb-3 uppercase leading-snug font-sans">ĐẶT CÂU HỎI VỚI LUẬT SƯ PHAN ĐỨC TÍN</h2>
            <p className="mb-8 text-amber-100 text-sm md:text-base">Điền thông tin vụ việc, chúng tôi sẽ liên hệ tư vấn trong thời gian sớm nhất.</p>

            {consultSent ? (
              <div className="bg-white/20 border border-white/40 p-6 rounded-2xl text-center">
                <span className="material-symbols-outlined text-5xl mb-2">check_circle</span>
                <h3 className="text-xl font-bold mb-2">Đã Gửi Yêu Cầu Thành Công!</h3>
                <p className="text-sm text-white/90">Luật sư Phan Đức Tín sẽ liên hệ lại với bạn qua số điện thoại <strong>{consultForm.phone}</strong>.</p>
              </div>
            ) : (
              <form className="space-y-4" onSubmit={handleConsultSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input 
                    type="text" 
                    placeholder="Họ và tên *" 
                    value={consultForm.name} 
                    onChange={e => setConsultForm({...consultForm, name: e.target.value})} 
                    className="w-full px-4 py-3.5 bg-white text-gray-800 rounded-xl border-none focus:ring-2 focus:ring-amber-300 outline-none text-sm" 
                    required 
                  />
                  <input 
                    type="email" 
                    placeholder="Địa chỉ Email" 
                    value={consultForm.email} 
                    onChange={e => setConsultForm({...consultForm, email: e.target.value})} 
                    className="w-full px-4 py-3.5 bg-white text-gray-800 rounded-xl border-none focus:ring-2 focus:ring-amber-300 outline-none text-sm" 
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input 
                    type="tel" 
                    placeholder="Số điện thoại *" 
                    value={consultForm.phone} 
                    onChange={e => setConsultForm({...consultForm, phone: e.target.value})} 
                    className="w-full px-4 py-3.5 bg-white text-gray-800 rounded-xl border-none focus:ring-2 focus:ring-amber-300 outline-none text-sm" 
                    required 
                  />
                  <div className="relative">
                    <select 
                      value={consultForm.category} 
                      onChange={e => setConsultForm({...consultForm, category: e.target.value})} 
                      className="w-full px-4 py-3.5 bg-white text-gray-800 rounded-xl border-none focus:ring-2 focus:ring-amber-300 outline-none text-sm cursor-pointer"
                    >
                      <option value="Dân sự & Thương mại">Dân sự & Thương mại</option>
                      <option value="Hình sự & Bào chữa">Hình sự & Bào chữa</option>
                      <option value="Doanh nghiệp & Đầu tư">Doanh nghiệp & Đầu tư</option>
                      <option value="Đất đai & Nhà ở">Đất đai & Nhà ở</option>
                    </select>
                  </div>
                </div>
                <div>
                  <textarea 
                    placeholder="Mô tả tóm tắt vụ việc của bạn..." 
                    rows={4} 
                    value={consultForm.message} 
                    onChange={e => setConsultForm({...consultForm, message: e.target.value})} 
                    className="w-full px-4 py-3.5 bg-white text-gray-800 rounded-xl border-none focus:ring-2 focus:ring-amber-300 outline-none resize-none text-sm"
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  disabled={consultSending}
                  className="bg-slate-900 text-white font-bold uppercase px-8 py-3.5 rounded-xl hover:bg-black transition-colors shadow-md text-sm cursor-pointer disabled:opacity-50"
                >
                  {consultSending ? "Đang gửi..." : "GỬI YÊU CẦU CHO LUẬT SƯ"}
                </button>
              </form>
            )}
          </div>

          {/* FAQ Accordion (Right) */}
          <div className="p-4 md:p-8">
            <h2 className="text-[#c29837] font-black text-2xl md:text-3xl uppercase mb-2 font-sans">CÂU HỎI &amp; GIẢI ĐÁP PHÁP LUẬT</h2>
            <div className="text-[#c29837] mb-8 flex items-center">
              <span className="tracking-widest font-bold">— ⚖️ —</span>
            </div>

            <div className="space-y-4">
              {/* FAQ 1 */}
              <div className="faq-item rounded-xl overflow-hidden border border-slate-200 shadow-sm">
                <button
                  onClick={() => toggleFaq(1)}
                  className={`w-full text-left font-semibold py-4 px-6 flex items-center justify-between transition-colors ${openFaq === 1 ? 'bg-primary text-white' : 'bg-white text-slate-800 hover:bg-slate-50'}`}
                >
                  <span>Khi Giấy chứng nhận quyền sử dụng đất hết thời hạn phải làm sao?</span>
                  <span className="text-xl font-bold ml-2">{openFaq === 1 ? '−' : '+'}</span>
                </button>
                <div className={`${openFaq === 1 ? 'block' : 'hidden'} bg-white text-slate-600 p-6 text-sm leading-relaxed border-t border-slate-100`}>
                  <p className="mb-3">Theo Luật Đất đai mới nhất, hộ gia đình, cá nhân trực tiếp sản xuất nông nghiệp khi hết thời hạn sử dụng đất nếu có nhu cầu thì được tiếp tục sử dụng mà không phải làm thủ tục gia hạn.</p>
                  <p>Đối với đất thương mại dịch vụ hoặc tổ chức, cần nộp hồ sơ xin gia hạn trước khi hết hạn ít nhất 06 tháng.</p>
                </div>
              </div>

              {/* FAQ 2 */}
              <div className="faq-item rounded-xl overflow-hidden border border-slate-200 shadow-sm">
                <button
                  onClick={() => toggleFaq(2)}
                  className={`w-full text-left font-semibold py-4 px-6 flex items-center justify-between transition-colors ${openFaq === 2 ? 'bg-primary text-white' : 'bg-white text-slate-800 hover:bg-slate-50'}`}
                >
                  <span>Thủ tục ly hôn thuận tình cần chuẩn bị những hồ sơ gì?</span>
                  <span className="text-xl font-bold ml-2">{openFaq === 2 ? '−' : '+'}</span>
                </button>
                <div className={`${openFaq === 2 ? 'block' : 'hidden'} bg-white text-slate-600 p-6 text-sm leading-relaxed border-t border-slate-100`}>
                  <p className="mb-2">Hồ sơ ly hôn thuận tình gồm có:</p>
                  <ul className="list-disc pl-5 space-y-1 mb-3">
                    <li>Đơn yêu cầu công nhận thuận tình ly hôn (theo mẫu chuẩn của Tòa án).</li>
                    <li>Bản chính Giấy chứng nhận kết hôn.</li>
                    <li>Bản sao CCCD của hai vợ chồng.</li>
                    <li>Bản sao Giấy khai sinh của các con chung.</li>
                    <li>Giấy tờ chứng minh quyền sở hữu tài sản chung (nếu có yêu cầu công nhận).</li>
                  </ul>
                  <p>Bạn có thể tải ngay mẫu đơn chuẩn tại <strong>Kho Biểu Mẫu AI</strong> của chúng tôi.</p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <Link href="/news" className="inline-block bg-[#c29837] text-white font-bold uppercase px-8 py-3.5 rounded-xl hover:bg-[#a37b2c] transition-colors shadow-sm text-sm">
                XEM THÊM BÀI VIẾT
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* Expert Attorneys */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-12">
        <div className="text-center mb-12 w-full flex flex-col items-center justify-center">
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 font-sans leading-tight tracking-tight uppercase text-center mb-2">
            Đội Ngũ Luật Sư Điều Hành
          </h2>
          <div className="text-accent flex items-center justify-center mt-1">
            <span className="tracking-widest font-bold text-lg">— ⚖️ —</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {[
            {
              name: "Ls. Phan Đức Tín",
              role: "Luật sư Trưởng - Giám đốc Điều hành",
              desc: "Hơn 15 năm kinh nghiệm tranh tụng, tư vấn đầu tư FDI và mua bán sáp nhập doanh nghiệp.",
              img: "avatar1.png"
            },
            {
              name: "Ls. Nguyễn Hoàng Long",
              role: "Phó Giám đốc - Trưởng ban Tranh tụng",
              desc: "Chuyên sâu tố tụng Tòa án, giải quyết tranh chấp kinh doanh thương mại và bất động sản.",
              img: "avatar2.png"
            },
            {
              name: "Ls. Trần Minh Tuấn",
              role: "Trưởng phòng Doanh nghiệp & Đầu tư",
              desc: "Chuyên thẩm định pháp lý hợp đồng quốc tế, sở hữu trí tuệ và cơ cấu vốn doanh nghiệp.",
              img: "avatar3.png"
            }
          ].map((ls, idx) => (
            <div key={idx} className="border border-border-neutral p-6 rounded-3xl bg-white shadow-sm flex flex-col items-center text-center hover:shadow-lg transition-all">
              <div className="w-28 h-28 bg-emerald-100 rounded-full border-2 border-emerald-300 mb-4 overflow-hidden shadow-inner">
                <img alt={ls.name} className="w-full h-full object-cover" src={`/img/${ls.img}`} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 font-sans mb-1">{ls.name}</h3>
              <p className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-3">{ls.role}</p>
              <p className="text-slate-600 text-sm mb-6 leading-relaxed flex-grow">{ls.desc}</p>
              <div className="flex gap-2 w-full">
                <Link className="flex items-center justify-center gap-1.5 flex-1 bg-emerald-700 text-white h-10 rounded-xl font-bold text-xs hover:bg-emerald-800 transition-colors" href="/appointment">
                  <span className="material-symbols-outlined text-sm">calendar_month</span> Đặt hẹn
                </Link>
                <Link className="flex items-center justify-center gap-1.5 flex-1 bg-slate-100 text-slate-800 border border-slate-200 h-10 rounded-xl font-bold text-xs hover:bg-slate-200 transition-colors" href="/ai-chatbot">
                  <span className="material-symbols-outlined text-sm">chat</span> Hỏi AI
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Client Marquee */}
      <section className="border-y border-border-neutral py-10 bg-surface-main overflow-hidden">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mb-8 text-center">
          <h3 className="font-label-sm text-text-secondary uppercase tracking-widest text-sm font-bold">
            Đối Tác & Khách Hàng Tiêu Biểu
          </h3>
        </div>
        <div className="relative w-full overflow-hidden flex">
          <div className="flex whitespace-nowrap animate-marquee w-max items-center">
            {/* Logos */}
            {[
              "1_16695707988051.png",
              "2_16695708063758.png",
              "3_16695708141883.png",
              "4_16695708242618.png",
              "5_16695708351998.png",
              "6_16695708438339.png",
              "7_16695708602002.png",
              "Global_Catering_16700553488686.png",
            ].map((img, i) => (
              <img
                key={i}
                src={`/img/${img}`}
                className="h-16 mx-12 object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all"
                alt="Client Logo"
              />
            ))}
            {/* Duplicate for marquee effect */}
            {[
              "1_16695707988051.png",
              "2_16695708063758.png",
              "3_16695708141883.png",
              "4_16695708242618.png",
              "5_16695708351998.png",
              "6_16695708438339.png",
              "7_16695708602002.png",
              "Global_Catering_16700553488686.png",
            ].map((img, i) => (
              <img
                key={`dup-${i}`}
                src={`/img/${img}`}
                className="h-16 mx-12 object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all"
                alt="Client Logo"
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
