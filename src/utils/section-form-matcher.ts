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
  section: { id?: string; number?: number | string; title?: string; content?: string; summary?: string; attachedFormId?: number },
  article: { title?: string; category?: string; summary?: string },
  alreadyUsedFormIds: Set<number>
): MatchedForm | null {
  // 0. Nếu Admin chỉ định thủ công biểu mẫu cho mục này:
  if (section.attachedFormId !== undefined && section.attachedFormId !== 0) {
    if (section.attachedFormId === -1) {
      return null; // Tắt biểu mẫu thủ công
    }
    const manualForm = POPULAR_FORMS.find((f) => f.id === section.attachedFormId);
    if (manualForm) {
      alreadyUsedFormIds.add(manualForm.id);
      return manualForm;
    }
  }

  const secTitle = (section.title || "").toLowerCase();
  const secContent = (section.content || "").toLowerCase();
  const secSummary = (section.summary || "").toLowerCase();
  const artCategory = (article.category || "").toLowerCase();
  const artTitle = (article.title || "").toLowerCase();

  const combinedText = `${secTitle} ${secSummary} ${secContent}`;

  // 1. Kiểm tra các từ khóa đặc thù theo từng mẫu chuẩn
  const rules: Array<{ formId: number; keywords: string[] }> = [
    // HÔN NHÂN & GIA ĐÌNH (1 - 5)
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

    // ĐẤT ĐAI & HỢP ĐỒNG (6 - 10)
    {
      formId: 6,
      keywords: ["thuê nhà", "thuê mặt bằng", "hợp đồng thuê nhà"],
    },
    {
      formId: 7,
      keywords: ["chuyển nhượng quyền sử dụng đất", "hợp đồng mua bán đất", "chuyển nhượng nhà đất", "sang tên sổ đỏ", "hợp đồng chuyển nhượng"],
    },
    {
      formId: 8,
      keywords: ["đặt cọc", "hợp đồng đặt cọc", "tiền cọc", "phạt cọc", "ký cọc mua nhà"],
    },
    {
      formId: 9,
      keywords: ["cấp đổi sổ đỏ", "cấp lại sổ đỏ", "đổi giấy chứng nhận quyền sử dụng đất"],
    },
    {
      formId: 10,
      keywords: ["hòa giải tranh chấp đất đai", "hòa giải tại ubnd", "đơn yêu cầu hòa giải", "ubnd cấp xã hòa giải", "tranh chấp ranh giới"],
    },

    // DOANH NGHIỆP & ĐẦU TƯ (11 - 13)
    {
      formId: 11,
      keywords: ["điều lệ công ty", "thành lập công ty", "thành lập tnhh", "điều lệ tnhh"],
    },
    {
      formId: 12,
      keywords: ["hợp đồng hợp tác kinh doanh", "hợp đồng bcc", "góp vốn đầu tư", "liên doanh không thành lập pháp nhân"],
    },
    {
      formId: 13,
      keywords: ["tăng vốn điều lệ", "họp đại hội đồng cổ đông", "họp hội đồng thành viên", "biên bản họp tăng vốn"],
    },

    // LAO ĐỘNG & TIỀN LƯƠNG (14 - 15)
    {
      formId: 14,
      keywords: ["hợp đồng lao động", "ký hợp đồng lao động", "giao kết hợp đồng lao động"],
    },
    {
      formId: 15,
      keywords: ["thử việc", "hợp đồng thử việc", "thỏa thuận bảo mật", "nda"],
    },

    // TỐ TỤNG & KHỞI KIỆN (16)
    {
      formId: 16,
      keywords: ["mẫu số 23-ds", "đơn khởi kiện vụ án dân sự", "nộp đơn khởi kiện", "mẫu đơn khởi kiện chuẩn tòa án", "khởi kiện dân sự", "khởi kiện ra tòa"],
    },

    // THUẾ & TÀI CHÍNH (17)
    {
      formId: 17,
      keywords: ["quyết toán thuế", "ủy quyền quyết toán thuế", "mẫu 08/uq-qtt-tncn", "thuế tncn"],
    },

    // THỪA KẾ & DI CHÚC (18 - 21)
    {
      formId: 18,
      keywords: ["từ chối nhận di sản", "khước từ di sản", "văn bản từ chối thừa kế", "văn bản từ chối nhận di sản", "không nhận di sản", "từ chối thừa kế"],
    },
    {
      formId: 19,
      keywords: ["phân chia di sản", "thỏa thuận phân chia", "văn bản thỏa thuận thừa kế", "chia di sản thừa kế", "văn bản thỏa thuận phân chia"],
    },
    {
      formId: 20,
      keywords: ["khai nhận di sản", "khai nhận thừa kế", "văn bản khai nhận"],
    },
    {
      formId: 21,
      keywords: ["tranh chấp thừa kế", "khởi kiện tranh chấp thừa kế", "tranh chấp chia di sản", "khởi kiện di sản"],
    },

    // TẶNG CHO ĐẤT ĐAI (22)
    {
      formId: 22,
      keywords: ["tặng cho quyền sử dụng đất", "hợp đồng tặng cho", "cho tặng nhà đất", "tặng cho con"],
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
