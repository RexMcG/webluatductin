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
  quote: string;
  lawyerName: string;
  lawyerTitle: string;
  lawyerBio: string;
  experienceYears: string;
  successRate: string;
  casesCount: string;
  corporateClientsCount: string;
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
      heading: "Về Đức Tín & Cộng Sự",
      subHeading: "Tận Tâm • Bản Lĩnh • Chuẩn Mực Pháp Lý",
      quote: "Chúng tôi không chỉ cung cấp ý kiến pháp lý đơn thuần, mà đồng hành như một đối tác chiến lược bảo vệ an toàn tối đa cho từng bước tiến của khách hàng.",
      lawyerName: "Luật sư Phan Đức Tín",
      lawyerTitle: "Luật sư Điều hành — Giám đốc Hãng luật",
      lawyerBio: "Với hơn 15 năm kinh nghiệm thực chiến trong các lĩnh vực Tranh tụng Tòa án, M&A Doanh nghiệp và Bất động sản phức tạp, Luật sư Phan Đức Tín cùng đội ngũ luật sư cộng sự đã bảo vệ thành công quyền lợi hợp pháp cho hàng nghìn khách hàng cá nhân và doanh nghiệp trên toàn quốc.",
      experienceYears: "15+",
      successRate: "98%",
      casesCount: "2,500+",
      corporateClientsCount: "350+",
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

const STORAGE_KEY = "ductin_site_content_v1";
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
        about: { ...DEFAULT_SITE_CONTENT.home.about, ...(saved.home?.about || {}) },
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
