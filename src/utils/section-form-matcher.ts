// -*- coding: utf-8 -*-
/**
 * Thuật toán đối soát và tự động gắn biểu mẫu phù hợp vào từng Giai đoạn / Bước của bài viết hướng dẫn
 * (Phương án C: Inline Form Attachment)
 */
import { POPULAR_FORMS, StandardFormItem } from "@/data/popular-forms";

export interface MatchedForm {
  id: number;
  title: string;
  category: string;
  description: string;
  content: string;
  fileUrl?: string;
}

/**
 * Tìm biểu mẫu phù hợp nhất cho một Section trong bài viết
 */
export function getAttachedFormForSection(
  section: { id?: string; number?: number | string; title?: string; content?: string; summary?: string },
  article: { title?: string; category?: string; summary?: string },
  alreadyUsedFormIds: Set<number>
): MatchedForm | null {
  const secTitle = (section.title || "").toLowerCase();
  const secContent = (section.content || "").toLowerCase();
  const secSummary = (section.summary || "").toLowerCase();
  const artCategory = (article.category || "").toLowerCase();
  const artTitle = (article.title || "").toLowerCase();

  const combinedText = `${secTitle} ${secSummary} ${secContent}`;

  // 1. Kiểm tra các từ khóa đặc thù theo từng mẫu chuẩn
  const rules: Array<{ formId: number; keywords: string[] }> = [
    // HÔN NHÂN & GIA ĐÌNH
    {
      formId: 1,
      keywords: ["thuận tình ly hôn", "đồng thuận ly hôn", "mẫu đơn thuận tình", "xin ly hôn thuận tình", "yêu cầu công nhận thuận tình"],
    },
    {
      formId: 2,
      keywords: ["đơn phương ly hôn", "khởi kiện ly hôn", "ly hôn đơn phương", "giành quyền nuôi con", "tranh chấp nuôi con"],
    },
    {
      formId: 3,
      keywords: ["tài sản riêng", "thỏa thuận tài sản riêng", "cam kết tài sản riêng", "nhập tài sản riêng"],
    },
    {
      formId: 4,
      keywords: ["bản tự khai", "tự khai ly hôn", "tự khai hôn nhân", "lấy lời khai"],
    },
    {
      formId: 5,
      keywords: ["trích lục kết hôn", "trích lục hộ tịch", "ủy quyền nộp hồ sơ kết hôn", "xin cấp lại giấy chứng nhận kết hôn"],
    },

    // ĐẤT ĐAI & HỢP ĐỒNG / THỪA KẾ
    {
      formId: 6,
      keywords: ["đặt cọc", "hợp đồng đặt cọc", "tiền cọc", "phạt cọc", "ký cọc mua nhà"],
    },
    {
      formId: 7,
      keywords: ["chuyển nhượng quyền sử dụng đất", "hợp đồng mua bán đất", "chuyển nhượng nhà đất", "sang tên sổ đỏ", "hợp đồng chuyển nhượng"],
    },
    {
      formId: 8,
      keywords: ["tặng cho quyền sử dụng đất", "hợp đồng tặng cho", "cho tặng nhà đất", "tặng cho con"],
    },
    {
      formId: 9,
      keywords: ["tranh chấp đất đai", "hòa giải tại ubnd", "đơn yêu cầu hòa giải", "ubnd cấp xã hòa giải", "tranh chấp ranh giới"],
    },
    {
      formId: 10,
      keywords: ["phân chia di sản", "thỏa thuận phân chia", "văn bản thỏa thuận thừa kế", "chia di sản thừa kế", "khai nhận di sản"],
    },
    {
      formId: 11,
      keywords: ["từ chối nhận di sản", "khước từ di sản", "văn bản từ chối thừa kế", "không nhận di sản"],
    },

    // LAO ĐỘNG & TIỀN LƯƠNG
    {
      formId: 12,
      keywords: ["hợp đồng lao động", "ký hợp đồng lao động", "thử việc", "giao kết hợp đồng lao động"],
    },
    {
      formId: 13,
      keywords: ["nghỉ việc", "đơn xin thôi việc", "chấm dứt hợp đồng lao động", "đơn xin nghỉ việc"],
    },
    {
      formId: 14,
      keywords: ["sa thải", "kỷ luật sa thải", "khiếu nại sa thải", "sa thải trái luật", "đơn khiếu nại kỷ luật"],
    },
    {
      formId: 15,
      keywords: ["thỏa thuận chấm dứt", "biên bản thỏa thuận", "trợ cấp thôi việc", "thôi việc"],
    },
    {
      formId: 16,
      keywords: ["thai sản", "nghỉ thai sản", "chế độ thai sản", "trợ cấp thai sản"],
    },

    // TỐ TỤNG & KHỞI KIỆN
    {
      formId: 17,
      keywords: ["mẫu số 23-ds", "đơn khởi kiện vụ án dân sự", "nộp đơn khởi kiện", "mẫu đơn khởi kiện chuẩn tòa án", "khởi kiện dân sự"],
    },
    {
      formId: 18,
      keywords: ["kinh doanh thương mại", "tranh chấp hợp đồng kinh tế", "đòi nợ doanh nghiệp", "thu hồi nợ", "khởi kiện thương mại"],
    },
    {
      formId: 19,
      keywords: ["bản tự khai dân sự", "tự khai tại tòa", "bản tự khai của đương sự"],
    },
    {
      formId: 20,
      keywords: ["biện pháp khẩn cấp tạm thời", "phong tỏa tài sản", "kê biên tài sản", "cấm xuất cảnh", "tạm thời"],
    },
    {
      formId: 21,
      keywords: ["kháng cáo", "đơn kháng cáo", "kháng nghị", "phúc thẩm", "không đồng ý bản án sơ thẩm"],
    },

    // HÀNH CHÍNH & DOANH NGHIỆP
    {
      formId: 22,
      keywords: ["hợp đồng ủy quyền", "giấy ủy quyền tham gia", "đại diện theo ủy quyền", "ủy quyền luật sư"],
    },
    {
      formId: 23,
      keywords: ["hợp đồng hợp tác kinh doanh", "hợp đồng bcc", "góp vốn đầu tư", "liên doanh không thành lập pháp nhân"],
    },
    {
      formId: 24,
      keywords: ["quyết toán thuế", "ủy quyền quyết toán thuế", "mẫu 08/uq-qtt-tncn", "thuế tncn"],
    },
    {
      formId: 25,
      keywords: ["điều lệ công ty", "thành lập công ty", "thành lập tnhh", "điều lệ tnhh", "vốn điều lệ"],
    },
  ];

  // Duyệt qua các luật khớp từ khóa chính xác
  for (const rule of rules) {
    if (alreadyUsedFormIds.has(rule.formId)) continue;
    const hasMatch = rule.keywords.some((kw) => combinedText.includes(kw));
    if (hasMatch) {
      const found = POPULAR_FORMS.find((f) => f.id === rule.formId);
      if (found) {
        alreadyUsedFormIds.add(found.id);
        return found;
      }
    }
  }

  // 2. Nếu section nói về hồ sơ, nộp đơn, thủ tục nhưng chưa khớp luật cụ thể:
  const isProceduralSection =
    secTitle.includes("hồ sơ") ||
    secTitle.includes("nộp đơn") ||
    secTitle.includes("thủ tục") ||
    secTitle.includes("chuẩn bị") ||
    secTitle.includes("các bước") ||
    secTitle.includes("quy trình");

  if (isProceduralSection) {
    // Tìm form chưa dùng phù hợp với Chuyên mục bài viết
    let matchedByCategory = POPULAR_FORMS.find((f) => {
      if (alreadyUsedFormIds.has(f.id)) return false;
      if (artCategory.includes("hôn nhân") || artTitle.includes("ly hôn")) {
        return f.category === "Hôn nhân & Gia đình";
      }
      if (artCategory.includes("đất") || artCategory.includes("thừa kế") || artTitle.includes("đất") || artTitle.includes("thừa kế")) {
        return f.category === "Đất đai & Hợp đồng";
      }
      if (artCategory.includes("lao động") || artTitle.includes("lương") || artTitle.includes("sa thải")) {
        return f.category === "Lao động & Tiền lương";
      }
      if (artCategory.includes("tố tụng") || artCategory.includes("tranh tụng") || artTitle.includes("khởi kiện")) {
        return f.category === "Tố tụng & Khởi kiện";
      }
      return false;
    });

    if (matchedByCategory) {
      alreadyUsedFormIds.add(matchedByCategory.id);
      return matchedByCategory;
    }
  }

  return null;
}
