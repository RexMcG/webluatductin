import Link from "next/link";

const FORMS = [
  {
    id: 1,
    match: 98,
    matchColor: "text-green-700 bg-green-50 border-green-200",
    title: "Đơn xin Ly hôn đơn phương",
    description: "Mẫu đơn xin ly hôn theo yêu cầu của một bên khi không có sự đồng thuận của bên kia. Áp dụng theo Luật Hôn nhân và Gia đình 2014.",
    tags: ["Hôn nhân", "Ly hôn", "Đơn phương"],
    isAI: true
  },
  {
    id: 2,
    match: 92,
    matchColor: "text-blue-700 bg-blue-50 border-blue-200",
    title: "Đơn yêu cầu giải quyết ly hôn",
    description: "Mẫu đơn yêu cầu Tòa án giải quyết việc ly hôn, bao gồm các vấn đề về quyền nuôi con, cấp dưỡng và phân chia tài sản chung.",
    tags: ["Hôn nhân", "Ly hôn", "Tài sản"],
    isAI: false
  },
  {
    id: 3,
    match: 87,
    matchColor: "text-purple-700 bg-purple-50 border-purple-200",
    title: "Bản tự khai về tài sản chung vợ chồng",
    description: "Mẫu tự khai chi tiết về tài sản chung và tài sản riêng của vợ chồng trong thời kỳ hôn nhân, phục vụ cho thủ tục ly hôn hoặc phân chia tài sản.",
    tags: ["Hôn nhân", "Tài sản", "Tự khai"],
    isAI: false
  },
  {
    id: 4,
    match: 82,
    matchColor: "text-orange-700 bg-orange-50 border-orange-200",
    title: "Biên bản thỏa thuận phân chia tài sản chung",
    description: "Mẫu biên bản ghi nhận sự thỏa thuận của vợ chồng về việc phân chia tài sản chung trong thời kỳ hôn nhân hoặc khi ly hôn.",
    tags: ["Hôn nhân", "Tài sản", "Thỏa thuận"],
    isAI: false
  }
];

export default function AIFormLibrary() {
  return (
    <main className="pt-32 pb-section-padding page-fade-in min-h-screen">
      {/* Hero Section */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="font-headline-xl-mobile md:font-headline-xl text-headline-xl-mobile md:text-headline-xl text-primary mb-stack-md">
            Thư Viện Biểu Mẫu AI
          </h1>
          <p className="font-body-md text-body-md text-text-secondary mb-4">
            Tra cứu và tải xuống các biểu mẫu pháp lý thông minh. Hệ thống AI của chúng tôi sẽ gợi ý biểu mẫu phù hợp nhất với nhu cầu của bạn.
          </p>
          <div className="relative max-w-2xl mx-auto">
            <input
              type="text"
              className="w-full h-14 pl-4 pr-12 border border-border-neutral rounded focus:border-primary focus:border-2 bg-surface-main text-text-primary placeholder:text-border-neutral outline-none"
              placeholder="Nhập nhu cầu pháp lý của bạn, ví dụ: 'Tôi muốn ly hôn'..."
            />
            <span className="material-symbols-outlined absolute right-4 top-4 text-border-neutral cursor-pointer hover:text-primary">
              search
            </span>
          </div>
        </div>
      </section>

      {/* Category Filter Pills */}
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-stack-md">
        <div className="flex flex-wrap justify-center gap-2">
          <button className="bg-accent text-on-accent rounded-full px-5 py-2 font-label-sm text-sm uppercase transition-colors font-semibold">Tất cả</button>
          <button className="bg-surface-main border border-border-neutral text-text-secondary hover:text-primary rounded-full px-5 py-2 font-label-sm text-sm uppercase transition-colors font-semibold">Hôn nhân &amp; Gia đình</button>
          <button className="bg-surface-main border border-border-neutral text-text-secondary hover:text-primary rounded-full px-5 py-2 font-label-sm text-sm uppercase transition-colors font-semibold">Đất đai &amp; Bất động sản</button>
          <button className="bg-surface-main border border-border-neutral text-text-secondary hover:text-primary rounded-full px-5 py-2 font-label-sm text-sm uppercase transition-colors font-semibold">Doanh nghiệp</button>
          <button className="bg-surface-main border border-border-neutral text-text-secondary hover:text-primary rounded-full px-5 py-2 font-label-sm text-sm uppercase transition-colors font-semibold">Lao động</button>
          <button className="bg-surface-main border border-border-neutral text-text-secondary hover:text-primary rounded-full px-5 py-2 font-label-sm text-sm uppercase transition-colors font-semibold">Hình sự</button>
        </div>
      </div>

      {/* Results Section */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-8">
        <div className="flex items-center gap-2 mb-6 border-b border-border-neutral pb-4">
          <span className="material-symbols-outlined text-text-secondary">auto_awesome</span>
          <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary">Kết quả gợi ý từ AI</h2>
          <span className="font-label-sm text-label-sm text-text-secondary ml-auto hidden md:block">Tìm thấy {FORMS.length} biểu mẫu phù hợp</span>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
          {/* Left Column: AI Match Cards */}
          <div className="lg:col-span-8 space-y-6">
            {FORMS.map((form) => (
              <div key={form.id} className="bg-surface-main border border-border-neutral hover:border-primary transition-colors p-6 rounded-lg flex flex-col md:flex-row gap-6 shadow-sm">
                <div className="flex-1 space-y-4">
                  <div className="flex items-center gap-2">
                    <span className={`inline-flex items-center gap-1 text-sm font-bold px-3 py-1 rounded-full border ${form.matchColor}`}>
                      <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
                      {form.match}% phù hợp
                    </span>
                    {form.isAI && (
                      <span className="bg-surface-alt border border-border-neutral text-text-secondary text-xs px-2 py-0.5 rounded font-label-sm">AI Đề xuất</span>
                    )}
                  </div>
                  <h3 className="font-headline-md text-headline-md text-primary">{form.title}</h3>
                  <p className="font-body-md text-body-md text-text-secondary">
                    {form.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {form.tags.map((tag) => (
                      <span key={tag} className="bg-surface-alt text-text-secondary text-xs px-3 py-1 rounded-full border border-border-neutral">{tag}</span>
                    ))}
                  </div>
                  <div className="flex items-center gap-3 mt-4 pt-2">
                    <button className="bg-accent text-on-accent h-10 px-5 rounded font-label-sm text-label-sm hover:opacity-90 transition-opacity flex items-center gap-2 font-bold">
                      <span className="material-symbols-outlined text-[18px]">download</span> Tải xuống
                    </button>
                    <button className="bg-surface-main border border-border-neutral text-text-secondary h-10 px-5 rounded font-label-sm text-label-sm hover:border-primary transition-colors flex items-center gap-2">
                      <span className="material-symbols-outlined text-[18px]">visibility</span> Xem trước
                    </button>
                  </div>
                </div>
                <div className="hidden md:flex flex-col items-center justify-center w-24 shrink-0 border-l border-border-neutral pl-6">
                  <span className="text-3xl font-bold text-primary">{form.match}%</span>
                  <span className="font-label-sm text-label-sm text-text-secondary text-center mt-1">Tỉ lệ phù hợp</span>
                </div>
              </div>
            ))}
          </div>

          {/* Right Sidebar: Quick Actions */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-surface-main border border-border-neutral p-6 rounded-lg shadow-sm">
              <h3 className="font-headline-md text-headline-md text-primary mb-4">Bạn không tìm thấy mẫu?</h3>
              <p className="font-body-md text-body-md text-text-secondary mb-6">
                Yêu cầu hệ thống AI tạo biểu mẫu mới theo đúng trường hợp cụ thể của bạn.
              </p>
              <button className="w-full bg-primary text-on-primary h-12 rounded font-label-sm text-label-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity font-bold">
                <span className="material-symbols-outlined text-[20px]">magic_button</span>
                Tạo Biểu Mẫu Mới
              </button>
            </div>

            <div className="bg-surface-alt border border-border-neutral p-6 rounded-lg shadow-sm">
              <h3 className="font-headline-md text-headline-md text-primary mb-4">Dịch Vụ Liên Quan</h3>
              <div className="space-y-4">
                <Link href="/ai-form-checker" className="flex items-center gap-3 p-3 bg-surface-main border border-border-neutral rounded hover:border-primary transition-colors">
                  <span className="material-symbols-outlined text-text-secondary">fact_check</span>
                  <div>
                    <div className="font-label-sm text-label-sm text-text-primary">AI Thẩm Định Form</div>
                    <div className="font-body-md text-body-md text-text-secondary text-xs mt-1">Kiểm tra tính hợp lệ của đơn</div>
                  </div>
                </Link>
                <Link href="/court-fee-calculator" className="flex items-center gap-3 p-3 bg-surface-main border border-border-neutral rounded hover:border-primary transition-colors">
                  <span className="material-symbols-outlined text-text-secondary">account_balance_wallet</span>
                  <div>
                    <div className="font-label-sm text-label-sm text-text-primary">Tính Án Phí</div>
                    <div className="font-body-md text-body-md text-text-secondary text-xs mt-1">Công cụ tính toán án phí</div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
