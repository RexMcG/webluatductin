# BÁO CÁO TRẠNG THÁI DỰ ÁN — webluatductin

> Ngày cập nhật: 31/07/2026
> Mục đích: Tài liệu phối hợp giữa Hermes (tớ) và Antigravity — cùng đọc, cùng cập nhật khi xong việc.

## 1. Tổng quan

- **Repo**: https://github.com/RexMcG/webluatductin.git — branch `master`
- **Stack**: HTML tĩnh + Tailwind CSS (CDN) + Vanilla JS (`js/main.js`) + Material Symbols
- **Theme**: Legal-Tech sang trọng — primary `#641D06` (nâu đỏ gụ), accent `#C0963B` (vàng gold), nền trắng
- **9 trang**: index + 8 trang trong `pages/`

## 2. Trạng thái từng trang

| # | Trang | File | UI | Logic | Ghi chú |
|---|-------|------|----|----|----|
| 1 | Trang chủ | `index.html` | ✅ | ⚠️ | Search widget → chatbot ✅; stats counter ✅; **chưa thấy Timeline 15+ năm** |
| 2 | Dịch vụ | `pages/services.html` | ✅ | ✅ | FAQ accordion; lead gate brochure (mock) |
| 3 | Đặt lịch | `pages/appointment.html` | ✅ | ⚠️ | Stepper 4 bước, time slots, summary card — **form không gửi đi đâu** |
| 4 | AI Chatbot | `pages/ai-chatbot.html` | ✅ | 🔴 | **Trả lời random từ 4 câu mẫu — chưa phải AI thật** |
| 5 | Thư viện biểu mẫu | `pages/ai-form-library.html` | ✅ | ⚠️ | 19 biểu mẫu, match score, bundle — **cần kiểm tra logic search**; download là mock |
| 6 | AI thẩm định đơn | `pages/ai-form-checker.html` | ✅ | 🔴 | Upload xong **chờ 3s hiện kết quả mẫu cố định — hoàn toàn giả lập** |
| 7 | Tính án phí | `pages/court-fee-calculator.html` | ✅ | ✅ | Bậc thang án phí + tạm ứng 50%; đã nhắc miễn/giảm |
| 8 | Tính lương | `pages/salary-calculator.html` | ✅ | ⚠️ | Gross→Net, BHXH/BHYT/BHTN, TNCN; có chọn vùng + xuất file — **cần kiểm tra nút xuất/email chạy thật không** |
| 9 | Tính thuế TNCN | `pages/pit-calculator.html` | ✅ | ✅ | Tính thuế lũy tiến từng phần |

## 3. Danh sách việc còn thiếu (theo mức ưu tiên)

### 🔴 P0 — Logic thật (đang là mock/giả lập)
1. **Chatbot AI thật** — thay mảng 4 câu trả lời random bằng API AI (Gemini free / OmniRoute local / OpenRouter). Kèm disclaimer "thông tin tham khảo, không thay thế tư vấn luật sư".
2. **AI thẩm định đơn** — hiện chỉ fake 3 giây. Cần ít nhất: checklist phân tích cơ bản phía client, hoặc gọi AI đọc nội dung file, hoặc tạm thời chuyển thành "gửi đơn cho luật sư duyệt" (lead capture thật).
3. **Search thư viện biểu mẫu** — kiểm tra xem tìm kiếm theo câu tự nhiên có map sang danh mục không; nếu chưa thì viết keyword-matching cho 19 biểu mẫu hiện có.

### 🟡 P1 — Lead capture & forms (đang "hít khói")
4. **Appointment form** — submit phải gửi được: gợi ý Formspree (free 50 leads/tháng) hoặc Google Form embed, hoặc tạo endpoint serverless. Tối thiểu: mailto fallback.
5. **Lead gate modal** — sau khi điền SĐT/email phải gửi đi (Formspree/Google Sheet), không chỉ set sessionStorage.
6. **Download biểu mẫu** — tạo file mẫu thật (.doc/.pdf) trong thư mục `files/`, nút download trỏ vào file thật sau khi pass lead gate.

### 🟠 P2 — Nội dung & SEO
7. **Số điện thoại thật** — thay toàn bộ `09xx.xxx.xxx` / `09xxxxxxxx` (hiện nằm rải rác ~20 chỗ).
8. **Timeline 15+ năm** trên index (theo spec UI/UX).
9. **Schema markup** FAQ + LegalService + Organization (JSON-LD) cho các trang chính.
10. **Meta title/description/OG tags** chuẩn SEO cho từng trang.
11. **Trang hồ sơ luật sư** chi tiết (báo cáo đánh giá đề xuất: ảnh, bằng cấp, chuyên môn).

### 🟢 P3 — Nâng cấp sau (theo UI/UX spec)
12. Nút gọi nhanh (click-to-call) nổi bật trên mobile.
13. Công cụ tra cứu văn bản pháp luật.
14. Newsletter đăng ký nhận bản tin.
15. Case study / đánh giá khách hàng.

## 4. Phân công đề xuất (Hermes ↔ Antigravity)

- **Hermes (tớ)**: logic JS, kết nối API AI, forms/lead capture, SEO kỹ thuật (schema/meta), file biểu mẫu thật, sửa số điện thoại.
- **Antigravity**: UI/UX tinh chỉnh, layout, animation, dark mode, trang hồ sơ luật sư, timeline index.
- **Quy tắc git**: mỗi bên 1 branch `feature/<tên>`, merge vào `master` khi xong; không sửa cùng 1 file trong cùng lúc (báo nhau qua README/báo cáo này).

## 5. Cách chạy thử

```bash
cd C:\Users\GIGA\Documents\web\webluatductin
python -m http.server 8000
# mở http://localhost:8000
```
