import { FormItem } from "@/services/form-library.service";

/**
 * Triệt để loại bỏ mọi dấu vết thương hiệu bên thứ 3 (LuatVietnam, Thư Viện Pháp Luật...)
 * và sửa lỗi nội dung mô tả rác (như thẻ tạm trú dán vào các biểu mẫu xe/thuế/đất đai).
 */
export function cleanBrandText(text: string): string {
  if (!text || typeof text !== "string") return "";

  let cleaned = text;

  // 1. Loại bỏ các cụm câu đặc thù của LuatVietnam
  cleaned = cleaned.replace(/Cùng\s+LuatVietnam(?:\.vn)?\s+tìm hiểu về/gi, "Tìm hiểu về");
  cleaned = cleaned.replace(/LuatVietnam(?:\.vn)?\s+xin giới thiệu/gi, "Sau đây là");
  cleaned = cleaned.replace(/Sau đây\s+LuatVietnam(?:\.vn)?\s+xin giới thiệu/gi, "Sau đây xin giới thiệu");
  cleaned = cleaned.replace(/Theo dõi bài viết sau của\s+LuatVietnam(?:\.vn)?\s+để tìm hiểu rõ hơn/gi, "Dưới đây là chi tiết");
  cleaned = cleaned.replace(/Theo dõi bài viết sau của\s+LuatVietnam(?:\.vn)?\s+để/gi, "Dưới đây là nội dung để");
  cleaned = cleaned.replace(/bài viết sau của\s+LuatVietnam(?:\.vn)?/gi, "bài viết sau");
  cleaned = cleaned.replace(/LuatVietnam(?:\.vn)?\s+cung cấp/gi, "Dưới đây cung cấp");
  cleaned = cleaned.replace(/sẽ được\s+LuatVietnam(?:\.vn)?\s+làm rõ/gi, "sẽ được làm rõ");
  cleaned = cleaned.replace(/tổng đài\s+LuatVietnam(?:\.vn)?/gi, "tổng đài tư vấn pháp lý");
  cleaned = cleaned.replace(/của\s+LuatVietnam(?:\.vn)?/gi, "");
  cleaned = cleaned.replace(/tại\s+LuatVietnam(?:\.vn)?/gi, "");
  cleaned = cleaned.replace(/Luật\s+Việt\s+Nam\s+xin\s+giới\s+thiệu/gi, "Sau đây xin giới thiệu");
  cleaned = cleaned.replace(/Theo\s+Luật\s+Việt\s+Nam/gi, "Theo quy định pháp luật");

  // 2. Loại bỏ các cụm của Thư Viện Pháp Luật
  cleaned = cleaned.replace(/Thư\s*Viện\s*Pháp\s*Luật(?:\.vn)?/gi, "");
  cleaned = cleaned.replace(/THƯ\s*VIỆN\s*PHÁP\s*LUẬT/gi, "");
  cleaned = cleaned.replace(/thuvienphapluat(?:\.vn)?/gi, "");
  cleaned = cleaned.replace(/Tra\s+cứu\s+tại\s+Thư\s+Viện\s+Pháp\s+Luật/gi, "Tra cứu theo văn bản pháp luật");
  cleaned = cleaned.replace(/Nguồn:\s*thuvienphapluat\.vn[^\n]*/gi, "");

  // 3. Xóa domain & từ khóa
  cleaned = cleaned.replace(/https?:\/\/(?:www\.)?luatvietnam\.vn[^\s"'>)]*/gi, "");
  cleaned = cleaned.replace(/https?:\/\/(?:www\.)?thuvienphapluat\.vn[^\s"'>)]*/gi, "");
  cleaned = cleaned.replace(/luatvietnam\.vn/gi, "");
  cleaned = cleaned.replace(/LuatVietnam/gi, "");
  cleaned = cleaned.replace(/luatvietnam/gi, "");
  cleaned = cleaned.replace(/thuvienphapluat\.vn/gi, "");

  // 4. Chuẩn hóa khoảng trắng & dấu câu
  cleaned = cleaned.replace(/[ \t]{2,}/g, " ");
  cleaned = cleaned.replace(/\s+([.,;:])/g, "$1");
  cleaned = cleaned.replace(/\n{3,}/g, "\n\n");

  return cleaned.trim();
}

/**
 * Chuẩn hóa và làm sạch toàn bộ FormItem (tiêu đề, mô tả, nội dung)
 */
export function sanitizeFormItem(item: FormItem): FormItem {
  if (!item) return item;

  let title = cleanBrandText(item.title || "");
  let description = cleanBrandText(item.description || "");
  let content = cleanBrandText(item.content || "");

  // Khắc phục lỗi dữ liệu cũ: nếu mô tả nói về "thẻ tạm trú cho người nước ngoài"
  // nhưng tiêu đề lại là đăng ký xe, thuế, đất đai...
  const titleLower = title.toLowerCase();
  const descLower = description.toLowerCase();
  const isActuallyTamTru = titleLower.includes("tạm trú") || titleLower.includes("na8");

  if (
    !isActuallyTamTru &&
    (descLower.includes("thẻ tạm trú") || descLower.includes("mẫu na8") || descLower.includes("70/2026/tt-bca"))
  ) {
    description = `Biểu mẫu chuẩn: ${title}. Cung cấp đầy đủ nội dung theo mẫu văn bản quy chuẩn hiện hành, dễ dàng tải về và điền thông tin.`;
  }

  // Nếu mô tả vẫn rỗng, fallback về tiêu đề
  if (!description) {
    description = `Biểu mẫu pháp lý chuẩn hóa: ${title}.`;
  }

  return {
    ...item,
    title,
    description,
    content,
  };
}
