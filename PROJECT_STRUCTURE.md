# Cấu trúc dự án Next.js (App Router) - DucTin & Partners

Dự án này sử dụng Next.js (App Router) với TypeScript và Tailwind CSS, nhằm tối ưu SEO, hiệu năng và dễ dàng bảo trì.

## 1. Cấu trúc thư mục (`/app`)

Cấu trúc thư mục được chia theo Route Groups `(folderName)` để tách biệt logic nhóm trang nhưng không làm thay đổi URL.

```text
/
├── app/
│   ├── (marketing)/
│   │   └── services/
│   │       └── page.tsx           # Trang lĩnh vực pháp lý (Server Component)
│   ├── (tools)/
│   │   ├── court-fee-calculator/
│   │   │   └── page.tsx           # Trang tính án phí (Client & Server)
│   │   ├── pit-calculator/
│   │   │   └── page.tsx           # Trang tính thuế TNCN
│   │   └── salary-calculator/
│   │       └── page.tsx           # Trang tính lương Gross to Net
│   ├── (ai)/
│   │   ├── ai-chatbot/
│   │   │   └── page.tsx           # Trang AI Chatbot (Client Component)
│   │   ├── ai-form-checker/
│   │   │   └── page.tsx           # Trang AI Form Checker (Client Component)
│   │   └── ai-form-library/
│   │       └── page.tsx           # Trang Thư viện biểu mẫu AI
│   ├── appointment/
│   │   └── page.tsx               # Trang đặt lịch hẹn
│   ├── api/                       # API Route Handlers
│   │   ├── chatbot/
│   │   │   └── route.ts
│   │   └── form-checker/
│   │       └── route.ts
│   ├── globals.css                # CSS toàn cục (Tailwind directives + shared.css cũ)
│   ├── layout.tsx                 # Root Layout (chứa Header, Footer)
│   └── page.tsx                   # Trang chủ (Server Component)
├── components/
│   ├── layout/
│   │   ├── Header.tsx             # Header navigation dùng chung
│   │   └── Footer.tsx             # Footer dùng chung
│   ├── ui/                        # Các component UI tái sử dụng
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   └── Input.tsx
│   ├── calculators/               # Các form tính toán (Client Components)
│   │   ├── CourtFeeForm.tsx
│   │   ├── PitForm.tsx
│   │   └── SalaryForm.tsx
│   └── ai/                        # Các component liên quan đến giao diện AI
│       └── ChatFeed.tsx
├── lib/
│   └── utils.ts                   # Các hàm tiện ích (vd: cn để merge Tailwind classes)
├── utils/                         # Các logic tính toán thuần túy (Pure Functions)
│   ├── courtFeeCalculator.ts      
│   ├── pitCalculator.ts
│   └── salaryCalculator.ts
├── styles/                        # Các file config style, CSS module nếu cần
├── types/                         # TypeScript interfaces/types
└── public/
    └── img/                       # Thư mục chứa hình ảnh tĩnh (logo, banner...)
```

## 2. Quy tắc Server Component vs Client Component

Để tối ưu hóa SEO và tốc độ tải trang, dự án áp dụng chặt chẽ sự phân tách giữa Server Component (SSR/SSG) và Client Component.

### Server Components (Mặc định)
- **Áp dụng cho:** Trang chủ, Trang lĩnh vực (`services`), trang danh sách biểu mẫu, và các phần bọc (wrapper) của các trang công cụ.
- **Quy tắc:**
  - Không sử dụng các hook của React (`useState`, `useEffect`).
  - Không gắn các event listener (`onClick`, `onChange`).
  - Lấy dữ liệu trực tiếp từ server hoặc database nếu cần.
  - Được phép sử dụng hàm `generateMetadata()` để sinh thẻ `<title>`, `<meta>` động cho SEO.

### Client Components (`"use client"`)
- **Áp dụng cho:** Header (nếu cần quản lý state mobile menu), Form tính toán (án phí, lương, thuế), Chatbot UI.
- **Quy tắc:**
  - Cần thêm chỉ thị `"use client"` ở dòng đầu tiên của file.
  - Chứa các logic tương tác người dùng, quản lý trạng thái form.
  - Phải đặt các Client Component ở nhánh dưới cùng (leaf node) của cây component để không làm ảnh hưởng đến các phần có thể render ở server. (VD: Form tính án phí là Client Component, nhưng trang bọc ngoài chứa tiêu đề H1 và văn bản chuẩn SEO là Server Component).

## 3. Quản lý API và Bảo mật (Route Handlers)

Các tính năng tương tác với AI backend, lấy API key, sẽ KHÔNG ĐƯỢC thực hiện trực tiếp từ Client Component để tránh lộ Key.
- Frontend Client Component sẽ dùng `fetch()` gọi nội bộ tới `/api/chatbot`.
- Next.js Route Handler tại `/app/api/chatbot/route.ts` sẽ giữ API Key và thực hiện request tới LLM/Backend thực sự, trả kết quả về cho frontend.

## 4. Quản lý CSS

Dự án sẽ sử dụng **Tailwind CSS** làm giải pháp chính (tương tự như codebase hiện tại). 
- Các style tùy chỉnh hiện có trong `shared.css` (ví dụ: animations, hide scrollbar) sẽ được di chuyển vào `app/globals.css` dưới cấu trúc chuẩn `@layer utilities` hoặc `@layer components`.
- Bằng cách này, chúng ta không cần đến CSS Modules, giữ nguyên sự linh hoạt của Tailwind và tận dụng lại gần như toàn bộ cấu trúc class HTML cũ.

## 5. Tách biệt Pure Functions
Các hàm tính toán (Luật thuế TNCN 2026, Án phí 2016, Lương vùng) hiện đang dính chặt với DOM trong `main.js`. 
- Trong cấu trúc mới, các logic này sẽ được tách hẳn vào thư mục `/utils` thành các hàm độc lập nhận đầu vào (`number`) và trả ra (`number`/`object`).
- Nhờ vậy, chúng ta có thể dễ dàng viết Unit Test (sử dụng Vitest hoặc Jest) để đảm bảo độ chính xác pháp lý của các công cụ này.
