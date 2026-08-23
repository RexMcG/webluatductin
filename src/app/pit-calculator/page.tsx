"use client";

import { useState } from "react";
import Link from "next/link";
import { calcPIT, DEDUCTION_SELF, DEDUCTION_DEP } from "@/utils/calculator";

export default function PITCalculator() {
  const [gross, setGross] = useState<string>("");
  const [insurance, setInsurance] = useState<string>("0");
  const [dependents, setDependents] = useState<number>(0);

  const [result, setResult] = useState<{
    gross: number;
    insurance: number;
    dependentsDeduction: number;
    taxableIncome: number;
    pit: number;
  } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const grossVal = parseFloat(gross) || 0;
    const insuranceVal = parseFloat(insurance) || 0;
    
    const taxableIncome = Math.max(0, grossVal - insuranceVal - DEDUCTION_SELF - dependents * DEDUCTION_DEP);
    const pit = calcPIT(taxableIncome);

    setResult({
      gross: grossVal,
      insurance: insuranceVal,
      dependentsDeduction: dependents * DEDUCTION_DEP,
      taxableIncome,
      pit,
    });
  };

  const handleReset = () => {
    setGross("");
    setInsurance("0");
    setDependents(0);
    setResult(null);
  };

  return (
    <main className="pt-32 pb-section-padding page-fade-in bg-background min-h-screen">
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg">
        {/* Page Title */}
        <header className="mb-10 border-b border-border-neutral pb-stack-md text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-3 uppercase tracking-wider">
            <span className="material-symbols-outlined text-[16px]">receipt_long</span>
            Luật Thuế Thu Nhập Cá Nhân 2026
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 font-sans leading-tight tracking-tight uppercase mb-3">
            Công Cụ Tính Thuế TNCN (PIT)
          </h1>
          <div className="text-amber-600 flex items-center justify-center my-3">
            <span className="tracking-widest font-bold text-lg">— ⚖️ —</span>
          </div>
          <p className="text-slate-600 font-body-md text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Tính toán nhanh và chuẩn xác số thuế Thu nhập cá nhân phải nộp theo biểu thuế lũy tiến từng phần và giảm trừ gia cảnh mới nhất.
          </p>
        </header>

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
          {/* ===== LEFT COLUMN: Calculator ===== */}
          <div className="lg:col-span-2 space-y-stack-lg">
            {/* Calculator Form */}
            <div className="bg-surface-alt border border-border-neutral p-6 md:p-8 rounded-lg shadow-sm">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <h2 className="font-headline-md text-headline-md text-primary mb-4">Nhập Thông Tin</h2>
                
                {/* Monthly Income */}
                <div>
                  <label className="font-label-sm text-label-sm text-text-primary block mb-2" htmlFor="monthly-income">
                    Tổng thu nhập hàng tháng <span className="text-error">*</span>
                  </label>
                  <div className="relative">
                    <input
                      className="w-full h-12 pl-4 pr-16 border border-border-neutral rounded focus:border-primary focus:ring-1 focus:ring-primary bg-surface-main text-text-primary placeholder:text-border-neutral outline-none"
                      id="monthly-income"
                      min="0"
                      step="100000"
                      type="number"
                      placeholder="Ví dụ: 30000000"
                      value={gross}
                      onChange={(e) => setGross(e.target.value)}
                      required
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 font-label-sm text-label-sm text-text-secondary pointer-events-none">VNĐ</span>
                  </div>
                </div>

                {/* Insurance Payments */}
                <div>
                  <label className="font-label-sm text-label-sm text-text-primary block mb-2" htmlFor="insurance-deduction">
                    Các khoản bảo hiểm bắt buộc đã nộp (nếu có)
                  </label>
                  <div className="relative">
                    <input
                      className="w-full h-12 pl-4 pr-16 border border-border-neutral rounded focus:border-primary focus:ring-1 focus:ring-primary bg-surface-main text-text-primary placeholder:text-border-neutral outline-none"
                      id="insurance-deduction"
                      min="0"
                      step="10000"
                      type="number"
                      placeholder="Ví dụ: 1000000"
                      value={insurance}
                      onChange={(e) => setInsurance(e.target.value)}
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 font-label-sm text-label-sm text-text-secondary pointer-events-none">VNĐ</span>
                  </div>
                </div>

                {/* Number of Dependents */}
                <div>
                  <label className="font-label-sm text-label-sm text-text-primary block mb-2" htmlFor="dependents">
                    Số người phụ thuộc
                  </label>
                  <input
                    className="w-full h-12 pl-4 pr-4 border border-border-neutral rounded focus:border-primary focus:ring-1 focus:ring-primary bg-surface-main text-text-primary outline-none"
                    id="dependents"
                    max="20"
                    min="0"
                    type="number"
                    value={dependents}
                    onChange={(e) => setDependents(parseInt(e.target.value) || 0)}
                  />
                  <p className="font-body-md text-body-md text-text-secondary text-xs mt-2">
                    Mỗi người phụ thuộc được giảm trừ {(DEDUCTION_DEP / 1000000).toLocaleString('vi-VN')} triệu VNĐ/tháng.
                  </p>
                </div>

                {/* Submit Button */}
                <button
                  className="w-full bg-accent text-on-accent h-14 rounded font-label-sm text-label-sm uppercase tracking-wider hover:opacity-90 transition-opacity flex items-center justify-center gap-2 mt-8 font-bold"
                  type="submit"
                >
                  <span className="material-symbols-outlined">calculate</span>
                  Tính Thuế Ngay
                </button>
              </form>
            </div>

            {/* Results Card */}
            {result && (
              <div className="bg-surface-main border border-border-neutral p-6 md:p-8 rounded-lg page-fade-in shadow-sm">
                <h2 className="font-headline-md text-headline-md text-primary mb-6">Kết Quả Tính Thuế TNCN</h2>
                
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b-2 border-border-neutral">
                        <th className="text-left font-label-sm text-label-sm text-text-primary py-3 px-2 uppercase tracking-wider">Khoản mục</th>
                        <th className="text-right font-label-sm text-label-sm text-text-primary py-3 px-2 uppercase tracking-wider">Số tiền (VNĐ)</th>
                      </tr>
                    </thead>
                    <tbody className="font-body-md text-body-md">
                      <tr className="border-b border-border-neutral">
                        <td className="py-4 px-2 text-text-primary font-medium">Tổng thu nhập</td>
                        <td className="py-4 px-2 text-right text-text-primary font-medium">{Math.round(result.gross).toLocaleString('vi-VN')}</td>
                      </tr>
                      <tr className="border-b border-border-neutral">
                        <td className="py-4 px-2 text-text-secondary">- Giảm trừ gia cảnh (Bản thân)</td>
                        <td className="py-4 px-2 text-right text-error">- {DEDUCTION_SELF.toLocaleString('vi-VN')}</td>
                      </tr>
                      <tr className="border-b border-border-neutral">
                        <td className="py-4 px-2 text-text-secondary">- Giảm trừ người phụ thuộc</td>
                        <td className="py-4 px-2 text-right text-error">- {Math.round(result.dependentsDeduction).toLocaleString('vi-VN')}</td>
                      </tr>
                      <tr className="border-b border-border-neutral">
                        <td className="py-4 px-2 text-text-secondary">- Bảo hiểm bắt buộc</td>
                        <td className="py-4 px-2 text-right text-error">- {Math.round(result.insurance).toLocaleString('vi-VN')}</td>
                      </tr>
                      <tr className="border-b border-border-neutral">
                        <td className="py-4 px-2 text-text-primary font-medium">Thu nhập tính thuế</td>
                        <td className="py-4 px-2 text-right text-text-primary font-medium">{Math.round(result.taxableIncome).toLocaleString('vi-VN')}</td>
                      </tr>
                      <tr className="bg-surface-alt">
                        <td className="py-6 px-2 text-text-primary font-bold text-lg">Thuế TNCN phải nộp</td>
                        <td className="py-6 px-2 text-right text-primary font-bold text-lg">{Math.round(result.pit).toLocaleString('vi-VN')}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4 mt-8 pt-6 border-t border-border-neutral">
                  <button className="bg-accent text-on-accent h-10 px-5 rounded font-label-sm text-label-sm hover:opacity-90 transition-opacity flex items-center gap-2">
                    <span className="material-symbols-outlined text-[20px]">file_download</span>
                    Xuất Excel
                  </button>
                  <button className="bg-surface-main border border-primary text-primary h-10 px-5 rounded font-label-sm text-label-sm hover:bg-surface-alt transition-colors flex items-center gap-2">
                    <span className="material-symbols-outlined text-[20px]">mail</span>
                    Gửi Email
                  </button>
                  <button
                    onClick={handleReset}
                    className="bg-surface-main border border-border-neutral text-text-secondary h-10 px-5 rounded font-label-sm text-label-sm hover:bg-surface-alt transition-colors flex items-center gap-2 ml-auto"
                  >
                    <span className="material-symbols-outlined text-[20px]">refresh</span>
                    Làm lại
                  </button>
                </div>
              </div>
            )}

            {/* Info Section */}
            <div className="bg-surface-alt border border-border-neutral p-6 rounded-lg shadow-sm">
              <h3 className="font-headline-md text-headline-md text-primary mb-4">Thông Tin Tham Khảo</h3>
              <ul className="space-y-3 font-body-md text-body-md text-text-secondary">
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-sm mt-0.5 text-primary">info</span>
                  <span>Mức giảm trừ gia cảnh: {(DEDUCTION_SELF / 1000000).toLocaleString('vi-VN')} triệu VNĐ/tháng cho bản thân người nộp thuế và {(DEDUCTION_DEP / 1000000).toLocaleString('vi-VN')} triệu VNĐ/tháng cho mỗi người phụ thuộc.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-sm mt-0.5 text-primary">info</span>
                  <span>Thuế suất TNCN được tính theo biểu thuế lũy tiến từng phần với 7 bậc thuế, phụ thuộc vào mức thu nhập tính thuế.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* ===== RIGHT SIDEBAR ===== */}
          <div className="lg:col-span-1 space-y-6">
            {/* Other Tools */}
            <div className="bg-surface-alt border border-border-neutral p-6 rounded-lg shadow-sm sticky top-24">
              <h3 className="font-headline-md text-headline-md text-primary mb-6">Công Cụ Khác</h3>
              <div className="space-y-4">
                <Link className="flex items-center gap-4 p-4 bg-surface-main border border-border-neutral rounded hover:border-primary transition-colors" href="/court-fee-calculator">
                  <span className="material-symbols-outlined text-text-secondary">account_balance_wallet</span>
                  <div>
                    <div className="font-label-sm text-label-sm text-text-primary">Tính Án Phí</div>
                    <div className="font-body-md text-body-md text-text-secondary text-xs mt-1">Tính án phí tòa án</div>
                  </div>
                </Link>
                <Link className="flex items-center gap-4 p-4 bg-surface-main border border-border-neutral rounded hover:border-primary transition-colors" href="/salary-calculator">
                  <span className="material-symbols-outlined text-text-secondary">calculate</span>
                  <div>
                    <div className="font-label-sm text-label-sm text-text-primary">Tính Lương</div>
                    <div className="font-body-md text-body-md text-text-secondary text-xs mt-1">Tính lương Gross to Net</div>
                  </div>
                </Link>
                <Link className="flex items-center gap-4 p-4 bg-surface-main border border-border-neutral rounded hover:border-primary transition-colors" href="/ai-form-library">
                  <span className="material-symbols-outlined text-text-secondary">description</span>
                  <div>
                    <div className="font-label-sm text-label-sm text-text-primary">Biểu Mẫu AI</div>
                    <div className="font-body-md text-body-md text-text-secondary text-xs mt-1">Tra cứu &amp; điền biểu mẫu</div>
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
