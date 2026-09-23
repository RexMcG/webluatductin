import { SERVICES_DATA, ServiceDetail } from "@/data/servicesData";

export interface HeroContent {
  badge: string;
  titlePrimary: string;
  titleSecondary: string;
  titleAccent: string;
  description: string;
  searchPlaceholder: string;
  ctaButtonText: string;
  aiChatButtonText: string;
}

export interface AboutContent {
  heading: string;
  subHeading: string;
  paragraphs: string[];
  quote?: string;
  lawyerName?: string;
  lawyerTitle?: string;
  lawyerBio?: string;
  experienceYears?: string;
  successRate?: string;
  casesCount?: string;
  corporateClientsCount?: string;
}

export interface PrincipleItem {
  title: string;
  desc: string;
}

export interface PrinciplesContent {
  heading: string;
  subHeading: string;
  items: PrincipleItem[];
}

export interface StatItem {
  value: string;
  label: string;
  desc: string;
  icon: string;
}

export interface StatsContent {
  heading: string;
  subHeading: string;
  items: StatItem[];
}

export interface LawyerItem {
  name: string;
  role: string;
  desc: string;
  img: string;
}

export interface LawyersContent {
  heading: string;
  subHeading: string;
  items: LawyerItem[];
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface ConsultFormContent {
  heading: string;
  subHeading: string;
  description: string;
}

export interface HomeContent {
  hero: HeroContent;
  about: AboutContent;
  principles: PrinciplesContent;
  stats: StatsContent;
  lawyers: LawyersContent;
  faqHeading: string;
  faqSubHeading: string;
  faqs: FaqItem[];
  consultForm: ConsultFormContent;
}

export interface ServicesPageContent {
  hero: {
    title: string;
    titleAccent: string;
    description: string;
  };
  section: {
    heading: string;
    subHeading: string;
    description: string;
  };
}

export interface FooterContent {
  companyName: string;
  brandName: string;
  description: string;
  barAssociation: string;
  privacyCommitment: string;
  hotline: string;
  email: string;
  address: string;
  zaloUrl: string;
  copyright: string;
  disclaimer: string;
}

export interface SiteContentData {
  home: HomeContent;
  servicesPage: ServicesPageContent;
  servicesDetail: Record<string, ServiceDetail>;
  footer: FooterContent;
}

export const DEFAULT_SITE_CONTENT: SiteContentData = {
  home: {
    hero: {
      badge: "CÔNG TY LUẬT UY TÍN TP.HCM",
      titlePrimary: "Công Ty Luật",
      titleSecondary: "Đức Tín & Cộng Sự",
      titleAccent: "Hãng Luật Hàng Đầu TP.HCM",
      description: "Đồng hành pháp lý chiến lược — Giải pháp toàn diện cho Doanh nghiệp & Cá nhân.",
      searchPlaceholder: "Nhập nhu cầu (VD: tranh chấp đất đai, tính án phí, ly hôn, rà soát hợp đồng M&A...)",
      ctaButtonText: "Đặt Lịch Tham Vấn Luật Sư",
      aiChatButtonText: "Tham Vấn Trực Tuyến 24/7",
    },
    about: {
      heading: "Về Chúng Tôi",
      subHeading: "GIỚI THIỆU",
      paragraphs: [
        "Luật sư Phan Đức Tín là người sáng lập kiêm Giám đốc Điều hành Công ty Luật TNHH Đức Tín và Cộng sự (Đoàn Luật sư TP.HCM). Hãng luật đã tham gia tư vấn, giải quyết thành công hàng trăm vụ việc chuyên sâu về các lĩnh vực: đầu tư nước ngoài (FDI), lập dự án và thẩm định hồ sơ cấp Giấy chứng nhận đăng ký đầu tư cho các tập đoàn, doanh nhân đến từ Nhật Bản, Hàn Quốc, Mỹ, Singapore, Đức...",
        "Đồng thời, chúng tôi trực tiếp đại diện tranh tụng tại Tòa án các cấp và Trọng tài thương mại quốc tế (VIAC); tư vấn và thẩm định pháp lý hợp đồng mua bán doanh nghiệp (M&A), cơ cấu nguồn vốn, giải quyết dứt điểm các tranh chấp phức tạp về đất đai, nhà ở, thừa kế và hôn nhân gia đình."
      ],
      quote: "Chúng tôi không chỉ cung cấp ý kiến pháp lý đơn thuần, mà đồng hành như một đối tác chiến lược bảo vệ an toàn tối đa cho từng bước tiến của khách hàng.",
      lawyerName: "Luật sư Phan Đức Tín",
      lawyerTitle: "Luật sư Điều hành — Giám đốc Hãng luật",
      lawyerBio: "Với nhiều năm kinh nghiệm thực chiến trong các lĩnh vực Tranh tụng Tòa án, M&A Doanh nghiệp và Bất động sản phức tạp, Luật sư Phan Đức Tín đã trực tiếp bảo vệ thành công quyền lợi hợp pháp cho đông đảo khách hàng cá nhân và doanh nghiệp trên toàn quốc.",
      experienceYears: "15+",
      successRate: "98%",
      casesCount: "2,500+",
      corporateClientsCount: "350+",
    },
    principles: {
      heading: "Tôn Chỉ Hoạt Động & Năng Lực Vượt Trội",
      subHeading: "TÔN CHỈ HOẠT ĐỘNG",
      items: [
        {
          title: "1. Luật sư chuyên sâu & giàu kinh nghiệm",
          desc: "Luật sư của DucTin & Partners năng động, sắc bén trong tranh tụng, vững chuyên môn nghiệp vụ, tiên phong ứng dụng công nghệ pháp lý và tuân thủ nghiêm ngặt Quy tắc Đạo đức nghề nghiệp."
        },
        {
          title: "2. Giải pháp pháp lý toàn diện & dứt điểm",
          desc: "Trực tiếp tháo gỡ các nút thắt pháp lý của thân chủ nhanh chóng, triệt để với lộ trình tối ưu chi phí. \"Chất lượng dịch vụ là Danh dự của Luật sư\"."
        },
        {
          title: "3. Bảo mật thông tin thân chủ tuyệt đối",
          desc: "Tuân thủ chặt chẽ nghĩa vụ giữ bí mật nghề nghiệp theo Điều 25 Luật Luật sư. Toàn bộ hồ sơ, thông tin vụ việc của thân chủ được bảo hộ an toàn tuyệt đối."
        },
        {
          title: "4. Đánh giá đúng bản chất & tính khả thi",
          desc: "Phân tích khách quan các rủi pro pháp lý, cung cấp phương án hành động có tính khả thi cao nhất, không cam kết khống hoặc gây ngộ nhận cho thân chủ."
        },
        {
          title: "5. Chi phí minh bạch theo hợp đồng dịch vụ pháp lý",
          desc: "Mọi khoản thù lao và chi phí tố tụng đều được thỏa thuận rõ ràng, minh bạch trong Hợp đồng dịch vụ pháp lý, phù hợp với tính chất phức tạp của từng vụ việc."
        },
        {
          title: "6. Tận tâm đồng hành bảo vệ thân chủ",
          desc: "Luôn đặt quyền và lợi ích hợp pháp của thân chủ lên hàng đầu, chủ động cập nhật tiến độ giải quyết và sát cánh cùng thân chủ trong mọi giai đoạn tố tụng."
        }
      ]
    },
    stats: {
      heading: "Dấu Ấn Thành Tựu & Năng Lực Thực Chiến",
      subHeading: "CHỈ SỐ THỰC TẾ",
      items: [
        { value: "15+", label: "Năm Kinh Nghiệm", desc: "Thực chiến giải quyết tranh tụng Tòa án & tư vấn FDI", icon: "history_edu" },
        { value: "98%", label: "Tỷ Lệ Thành Công", desc: "Bảo vệ tối đa quyền & lợi ích hợp pháp của thân chủ", icon: "verified" },
        { value: "2,500+", label: "Vụ Việc Giải Quyết", desc: "Tranh chấp đất đai, hợp đồng kinh tế, thừa kế & hình sự", icon: "gavel" },
        { value: "350+", label: "Doanh Nghiệp Đồng Hành", desc: "Cố vấn pháp lý thường xuyên, quản trị nội bộ & M&A", icon: "apartment" }
      ]
    },
    lawyers: {
      heading: "Luật Sư Điều Hành",
      subHeading: "LUẬT SƯ PHỤ TRÁCH CHUYÊN MÔN",
      items: [
        {
          name: "Ls. Phan Đức Tín",
          role: "Luật sư Sáng lập — Giám đốc Điều hành",
          desc: "Luật sư Phan Đức Tín là người sáng lập kiêm Giám đốc Điều hành Công ty Luật TNHH Đức Tín và Cộng sự. Với nhiều năm kinh nghiệm thực chiến chuyên sâu, Luật sư đã trực tiếp tư vấn chiến lược và bảo vệ thành công quyền lợi hợp pháp cho hàng nghìn khách hàng cá nhân cũng như các tập đoàn, doanh nghiệp trong nước và quốc tế (FDI).\n\nThế mạnh mũi nhọn của Luật sư Phan Đức Tín là năng lực tranh tụng sắc bén tại các cấp Tòa án và Trung tâm Trọng tài Thương mại Quốc tế (VIAC) trong các vụ án kinh doanh thương mại, tranh chấp đất đai - bất động sản phức tạp, cơ cấu nguồn vốn và mua bán sáp nhập doanh nghiệp (M&A). Đồng thời, Luật sư trực tiếp tham gia tư vấn giải quyết dứt điểm các vướng mắc về hợp đồng kinh tế và phòng ngừa rủi ro pháp lý cho thân chủ.\n\nVới tôn chỉ hoạt động \"Chất lượng dịch vụ là Danh dự của Luật sư\", Luật sư Phan Đức Tín luôn đích thân nghiên cứu hồ sơ, trực tiếp tham gia các phiên xét xử/đàm phán, đảm bảo tính bảo mật tuyệt đối, tinh thần trách nhiệm cao nhất và mang lại kết quả tối ưu cho từng thân chủ.",
          img: "avatar1.webp"
        }
      ]
    },
    faqHeading: "Câu Hỏi Thường Gặp",
    faqSubHeading: "Giải đáp nhanh các thắc mắc phổ biến về dịch vụ pháp lý tại Đức Tín & Cộng sự",
    faqs: [
      {
        q: "Chi phí tư vấn pháp lý ban đầu tại Đức Tín & Cộng sự được tính như thế nào?",
        a: "Chúng tôi áp dụng chính sách tham vấn sơ bộ hoàn toàn minh bạch. Khách hàng có thể trải nghiệm hỏi đáp sơ bộ 24/7 qua Trợ lý Luật sư AI hoặc đặt lịch hẹn trực tiếp tại văn phòng. Mọi chi phí dịch vụ cụ thể sẽ được báo giá rõ ràng bằng văn bản trước khi ký kết hợp đồng dịch vụ pháp lý."
      },
      {
        q: "Thời gian giải quyết một vụ việc tranh chấp đất đai hoặc hợp đồng thường kéo dài bao lâu?",
        a: "Tùy thuộc vào tính chất phức tạp của hồ sơ và giai đoạn tố tụng (Hòa giải, Sơ thẩm, Phúc thẩm), đội ngũ luật sư của Đức Tín sẽ lập kế hoạch hành động chi tiết theo từng mốc thời gian, cam kết đẩy nhanh tiến độ và cập nhật liên tục cho thân chủ."
      },
      {
        q: "Doanh nghiệp vừa và nhỏ (SME) có nên thuê luật sư nội bộ trọn gói?",
        a: "Gói Cố vấn Pháp lý Doanh nghiệp của Đức Tín được thiết kế linh hoạt, tối ưu chi phí hơn 60% so với việc duy trì một phòng pháp chế riêng, đồng thời đảm bảo doanh nghiệp luôn có sự hỗ trợ đa lĩnh vực từ đội ngũ luật sư chuyên sâu 24/7."
      }
    ],
    consultForm: {
      heading: "Gửi Yêu Cầu Tư Vấn Nhanh",
      subHeading: "Đức Tín & Cộng sự sẽ liên hệ bảo mật trong vòng 30 phút làm việc",
      description: "Để lại thông tin và tóm tắt vướng mắc pháp lý của bạn, Luật sư phụ trách chuyên môn sẽ chủ động liên hệ hỗ trợ phương án giải quyết tối ưu nhất."
    }
  },

  servicesPage: {
    hero: {
      title: "Giải Pháp Pháp Lý",
      titleAccent: "Toàn Diện & Tận Tâm",
      description: "Bảo vệ tối đa quyền lợi hợp pháp, đồng hành giải quyết tranh chấp và kiến tạo giá trị bền vững cho doanh nghiệp và cá nhân.",
    },
    section: {
      heading: "Lĩnh Vực Hoạt Động Cốt Lõi",
      subHeading: "LĨNH VỰC HOẠT ĐỘNG",
      description: "Đức Tín & Cộng sự quy tụ đội ngũ luật sư chuyên gia với bề dày thực chiến, giải quyết nhanh chóng và hiệu quả mọi bài toán pháp lý.",
    }
  },

  servicesDetail: SERVICES_DATA,

  footer: {
    companyName: "CÔNG TY LUẬT TNHH ĐỨC TÍN VÀ CỘNG SỰ (DUC TIN & PARTNERS)",
    brandName: "Đức Tín & Cộng Sự",
    description: "Công ty Luật TNHH Đức Tín & Cộng Sự do Luật sư Phan Đức Tín trực tiếp điều hành. Cung cấp giải pháp pháp lý toàn diện cho cá nhân và doanh nghiệp, kết hợp đột phá cùng công nghệ AI pháp luật.",
    barAssociation: "Đoàn Luật sư TP. Hồ Chí Minh",
    privacyCommitment: "Cam kết bảo mật tuyệt đối & bảo vệ tối đa quyền lợi khách hàng",
    hotline: "093 786 32 63",
    email: "rexmcg12345678@gmail.com",
    address: "Tòa nhà Saigon Trade Center, 37 Tôn Đức Thắng, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh",
    zaloUrl: "https://zalo.me/0937863263",
    copyright: "© 2026 Duc Tin & Partners Law Firm. Bảo lưu mọi quyền.",
    disclaimer: "Các công cụ tính toán và nội dung trên website mang tính chất tham khảo pháp lý. Vui lòng liên hệ luật sư để được tư vấn chính xác cho từng vụ việc cụ thể."
  }
};

const STORAGE_KEY = "ductin_site_content_v4";
const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

class SiteContentService {
  private memoryCache: SiteContentData | null = null;
  private listeners: Set<(data: SiteContentData) => void> = new Set();

  constructor() {
    if (typeof window !== "undefined") {
      this.initFromLocal();
      this.fetchFromBackend();
    }
  }

  private initFromLocal(): SiteContentData {
    if (typeof window === "undefined") return DEFAULT_SITE_CONTENT;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        this.memoryCache = this.mergeWithDefault(parsed);
        return this.memoryCache;
      }
    } catch (e) {
      console.error("Failed to parse site content from localStorage:", e);
    }
    this.memoryCache = DEFAULT_SITE_CONTENT;
    return DEFAULT_SITE_CONTENT;
  }

  private mergeWithDefault(saved: Partial<SiteContentData>): SiteContentData {
    return {
      home: {
        ...DEFAULT_SITE_CONTENT.home,
        ...(saved.home || {}),
        hero: { ...DEFAULT_SITE_CONTENT.home.hero, ...(saved.home?.hero || {}) },
        about: {
          ...DEFAULT_SITE_CONTENT.home.about,
          ...(saved.home?.about || {}),
          paragraphs: saved.home?.about?.paragraphs || DEFAULT_SITE_CONTENT.home.about.paragraphs,
        },
        principles: {
          ...DEFAULT_SITE_CONTENT.home.principles,
          ...(saved.home?.principles || {}),
          items: saved.home?.principles?.items || DEFAULT_SITE_CONTENT.home.principles.items,
        },
        stats: {
          ...DEFAULT_SITE_CONTENT.home.stats,
          ...(saved.home?.stats || {}),
          items: saved.home?.stats?.items || DEFAULT_SITE_CONTENT.home.stats.items,
        },
        lawyers: {
          ...DEFAULT_SITE_CONTENT.home.lawyers,
          ...(saved.home?.lawyers || {}),
          items: saved.home?.lawyers?.items || DEFAULT_SITE_CONTENT.home.lawyers.items,
        },
        consultForm: { ...DEFAULT_SITE_CONTENT.home.consultForm, ...(saved.home?.consultForm || {}) },
        faqs: saved.home?.faqs || DEFAULT_SITE_CONTENT.home.faqs,
      },
      servicesPage: {
        ...DEFAULT_SITE_CONTENT.servicesPage,
        ...(saved.servicesPage || {}),
        hero: { ...DEFAULT_SITE_CONTENT.servicesPage.hero, ...(saved.servicesPage?.hero || {}) },
        section: { ...DEFAULT_SITE_CONTENT.servicesPage.section, ...(saved.servicesPage?.section || {}) },
      },
      servicesDetail: {
        ...DEFAULT_SITE_CONTENT.servicesDetail,
        ...(saved.servicesDetail || {}),
      },
      footer: {
        ...DEFAULT_SITE_CONTENT.footer,
        ...(saved.footer || {}),
      },
    };
  }

  public async fetchFromBackend(): Promise<SiteContentData> {
    try {
      const res = await fetch(`${API_BASE}/api/site-content`, { cache: "no-store" });
      if (res.ok) {
        const json = await res.json();
        if (json && json.data) {
          const merged = this.mergeWithDefault(json.data);
          this.memoryCache = merged;
          if (typeof window !== "undefined") {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
          }
          this.notify();
          return merged;
        }
      }
    } catch {
      // Backend offline or unreachable, retain current local cache
    }
    return this.getContent();
  }

  public getContent(): SiteContentData {
    if (!this.memoryCache) {
      return this.initFromLocal();
    }
    return this.memoryCache;
  }

  public async saveContent(partial: Partial<SiteContentData>): Promise<SiteContentData> {
    const current = this.getContent();
    const updated = this.mergeWithDefault({
      ...current,
      ...partial,
      home: {
        ...current.home,
        ...(partial.home || {}),
        about: {
          ...current.home.about,
          ...(partial.home?.about || {}),
        },
        principles: {
          ...current.home.principles,
          ...(partial.home?.principles || {}),
        },
        stats: {
          ...current.home.stats,
          ...(partial.home?.stats || {}),
        },
        lawyers: {
          ...current.home.lawyers,
          ...(partial.home?.lawyers || {}),
        },
      },
      servicesPage: {
        ...current.servicesPage,
        ...(partial.servicesPage || {}),
      },
      servicesDetail: {
        ...current.servicesDetail,
        ...(partial.servicesDetail || {}),
      },
      footer: {
        ...current.footer,
        ...(partial.footer || {}),
      },
    });

    this.memoryCache = updated;
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    }
    this.notify();

    // Push to backend asynchronously
    try {
      await fetch(`${API_BASE}/api/site-content`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });
    } catch (e) {
      console.warn("Backend save failed, saved locally in browser:", e);
    }

    return updated;
  }

  public async resetContent(): Promise<SiteContentData> {
    this.memoryCache = DEFAULT_SITE_CONTENT;
    if (typeof window !== "undefined") {
      localStorage.removeItem(STORAGE_KEY);
    }
    this.notify();

    try {
      await fetch(`${API_BASE}/api/site-content/reset`, { method: "POST" });
    } catch (e) {
      console.warn("Backend reset failed:", e);
    }

    return DEFAULT_SITE_CONTENT;
  }

  public subscribe(cb: (data: SiteContentData) => void): () => void {
    this.listeners.add(cb);
    return () => this.listeners.delete(cb);
  }

  private notify() {
    if (!this.memoryCache) return;
    for (const listener of this.listeners) {
      listener(this.memoryCache);
    }
  }
}

export const siteContentService = new SiteContentService();
