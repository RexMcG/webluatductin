# DUC TIN & Partners - Website Hãng Luật

Website pháp lý toàn diện với 6 trang giao diện được tích hợp từ các wireframe, sử dụng **Tailwind CSS** (CDN) và **Material Symbols**.

## 🚀 Cấu Trúc Dự Án

```
DemoWebLuat/
├── index.html                     # Trang chủ
├── css/
│   └── shared.css                 # CSS dùng chung
├── js/
│   └── main.js                    # JavaScript dùng chung (tính toán, chat, v.v.)
└── pages/
    ├── services.html              # Dịch vụ pháp lý
    ├── appointment.html           # Đặt lịch hẹn
    ├── ai-chatbot.html            # Trợ lý pháp lý AI
    ├── ai-form-library.html       # Thư viện biểu mẫu AI
    ├── court-fee-calculator.html  # Tính án phí tòa án
    └── salary-calculator.html     # Tính lương Gross-to-Net
```

## 🖥️ Cách Chạy Local

### Cách 1: Mở trực tiếp
Mở file `index.html` bằng trình duyệt (double-click hoặc kéo vào browser).

### Cách 2: Dùng VS Code Live Server (Khuyến nghị)
1. Mở thư mục `DemoWebLuat` trong VS Code
2. Cài extension **Live Server** (nếu chưa có)
3. Right-click `index.html` → **Open with Live Server**

### Cách 3: Dùng Python HTTP Server
```bash
cd DemoWebLuat
python -m http.server 8000
# Mở http://localhost:8000
```

### Cách 4: Dùng Node.js http-server
```bash
cd DemoWebLuat
npx http-server
```

## 📋 Danh Sách Trang

| Trang | File | Mô tả |
|-------|------|-------|
| 🏠 Trang chủ | `index.html` | Hero, lĩnh vực hoạt động, stats, công cụ nổi bật, đội ngũ luật sư |
| ⚖️ Dịch vụ | `pages/services.html` | Danh mục dịch vụ pháp lý, quy trình 4 bước, FAQ |
| 📅 Đặt lịch | `pages/appointment.html` | Form đặt lịch hẹn 4 bước (dịch vụ → luật sư → thời gian → xác nhận) |
| 🤖 AI Chat | `pages/ai-chatbot.html` | Chat interface với trợ lý pháp lý AI |
| 📝 Biểu mẫu AI | `pages/ai-form-library.html` | Tra cứu & tải biểu mẫu pháp lý, lead gate modal |
| 💰 Tính án phí | `pages/court-fee-calculator.html` | Tính tạm ứng án phí & án phí chính thức |
| 💼 Tính lương | `pages/salary-calculator.html` | Tính lương gross-to-net, BHXH, BHYT, BHTN, thuế TNCN |

## 🎨 Tính Năng

- **Responsive**: Tương thích mobile & desktop
- **Navigation đồng bộ**: Navbar & footer giống nhau trên tất cả trang
- **Dark Mode sẵn sàng**: Tailwind config hỗ trợ dark mode (class-based)
- **Floating AI Widget**: Truy cập nhanh trợ lý AI từ mọi trang
- **Lead Gate Modal**: Form thu thập thông tin trước khi tải biểu mẫu
- **Tính toán tự động**: JS tính án phí & lương theo quy định hiện hành
- **Chat Simulator**: AI Chat với phản hồi mô phỏng

## 🛠️ Công Nghệ

- **Tailwind CSS** (CDN) - Utility-first CSS framework
- **Inter Font** của Google Fonts
- **Material Symbols** của Google Icons
- **Vanilla JavaScript** - Không framework, chạy trực tiếp trên browser
