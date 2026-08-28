"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { calcPIT, getLegalParams } from "@/utils/calculator";
import CalculatorGuide, { InfoTooltip } from "@/components/calculator/CalculatorGuide";
import { LegalParams, DEFAULT_LEGAL_PARAMS } from "@/services/legal-params.service";

export default function PITCalculator() {
  const [params, setParams] = useState<LegalParams>(DEFAULT_LEGAL_PARAMS);
  const [gross, setGross] = useState<string>("");
  const [insurance, setInsurance] = useState<string>("0");
  const [dependents, setDependents] = useState<number>(0);

  useEffect(() => {
    setParams(getLegalParams());
    const handleUpdate = () => setParams(getLegalParams());
    window.addEventListener("legal_params_updated", handleUpdate);
    return () => window.removeEventListener("legal_params_updated", handleUpdate);
  }, []);

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
    
    const taxableIncome = Math.max(0, grossVal - insuranceVal - params.deductionSelf - dependents * params.deductionDep);
    const pit = calcPIT(taxableIncome);

    setResult({
      gross: grossVal,
      insurance: insuranceVal,
      dependentsDeduction: dependents * params.deductionDep,
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
    <div className="max-w-7xl mx-auto px-4 md:px-8 pt-10 pb-16 min-h-screen">
      {/* Page Title */}
      <div className="text-center mb-10 max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 font-sans tracking-tight uppercase mb-3 leading-tight">
          Tính Năng Tính Thuế TNCN (PIT)
        </h1>
        <div className="text-amber-600 flex items-center justify-center my-3">
          <span className="tracking-widest font-bold text-lg">— ⚖️ —</span>
        </div>
        <p className="text-slate-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-4">
          Tính toán nhanh và chuẩn xác số thuế Thu nhập cá nhân phải nộp theo biểu thuế lũy tiến từng phần và giảm trừ gia cảnh mới nhất.
        </p>

        {/* Live Legal Status Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>Áp dụng theo: <strong>{params.legalBasis}</strong> (Bản thân: {(params.deductionSelf / 1000000).toFixed(1)} tr, Phụ thuộc: {(params.deductionDep / 1000000).toFixed(1)} tr)</span>
        </div>
      </div>

      {/* Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
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
                  <InfoTooltip
                    title="Thu nhập chịu thuế"
                    content="Toàn bộ tiền lương, tiền công, tiền thưởng và các khoản thù lao nhận được trong tháng trước khi trừ bảo hiểm và giảm trừ gia cảnh."
                  />
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
                  <InfoTooltip
                    title="Khoản trừ bảo hiểm"
                    content="Số tiền 10.5% (BHXH 8%, BHYT 1.5%, BHTN 1%) đã được khấu trừ từ lương, được miễn tính thuế TNCN."
                  />
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
                  <InfoTooltip
                    title="Giảm trừ người phụ thuộc"
                    content="Mỗi người phụ thuộc đủ điều kiện (con cái <18 tuổi, cha mẹ già) giúp bạn giảm thêm 4.400.000 VNĐ/tháng thu nhập tính thuế."
                  />
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
                  Mỗi người phụ thuộc được giảm trừ {(params.deductionDep / 1000000).toLocaleString('vi-VN')} triệu VNĐ/tháng.
                </p>
              </div>

              {/* Submit Button */}
              <button
                className="w-full bg-accent text-on-accent h-14 rounded font-label-sm text-label-sm uppercase tracking-wider hover:opacity-90 transition-opacity flex items-center justify-center gap-2 mt-8 font-bold cursor-pointer"
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
                      <td className="py-4 px-2 text-right text-error">- {params.deductionSelf.toLocaleString('vi-VN')}</td>
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
                    <tr className="bg-amber-50/60">
                      <td className="py-6 px-2 text-text-primary font-bold text-lg">Thuế TNCN phải nộp</td>
                      <td className="py-6 px-2 text-right text-[#641D06] font-black text-xl">{Math.round(result.pit).toLocaleString('vi-VN')}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 mt-8 pt-6 border-t border-border-neutral">
                <Link
                  href="/ai-chatbot?q=T%C6%B0%20v%E1%BA%A5n%20thu%E1%BA%BF%20thu%20nh%E1%BA%ADp%20c%C3%A1%20nh%C3%A2n%20v%C3%A0%20quy%E1%BA%BFt%20to%C3%A1n"
                  className="bg-accent text-on-accent h-10 px-5 rounded font-label-sm text-label-sm hover:opacity-90 transition-opacity flex items-center gap-2 font-bold cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[20px]">smart_toy</span>
                  Hỏi Luật Sư AI
                </Link>
                <Link
                  href="/appointment"
                  className="bg-surface-main border border-primary text-primary h-10 px-5 rounded font-label-sm text-label-sm hover:bg-surface-alt transition-colors flex items-center gap-2 font-bold cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[20px]">calendar_month</span>
                  Đặt Lịch Tư Vấn
                </Link>
                <button
                  onClick={handleReset}
                  className="bg-surface-main border border-border-neutral text-text-secondary h-10 px-5 rounded font-label-sm text-label-sm hover:bg-surface-alt transition-colors flex items-center gap-2 ml-auto cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[20px]">refresh</span>
                  Làm lại
                </button>
              </div>
            </div>
          )}

          {/* Info Section */}
          <div className="bg-surface-alt border border-border-neutral p-6 rounded-lg shadow-sm">
            <h3 className="font-headline-md text-headline-md text-primary mb-4">Thông Tin Quy Định Nhanh</h3>
            <ul className="space-y-3 font-body-md text-body-md text-text-secondary">
              <li className="flex items-start gap-2">
                <span className="material-symbols-outlined text-sm mt-0.5 text-primary">info</span>
                <span>Mức giảm trừ gia cảnh hiện hành: <strong>{(params.deductionSelf / 1000000).toLocaleString('vi-VN')} triệu VNĐ/tháng</strong> cho bản thân và <strong>{(params.deductionDep / 1000000).toLocaleString('vi-VN')} triệu VNĐ/tháng</strong> cho mỗi người phụ thuộc.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="material-symbols-outlined text-sm mt-0.5 text-primary">info</span>
                <span>Thuế suất TNCN tính theo biểu thuế lũy tiến từng phần với 7 bậc (từ 5% đến 35%).</span>
              </li>
            </ul>
          </div>
        </div>

        {/* ===== RIGHT SIDEBAR ===== */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-surface-alt border border-border-neutral p-6 rounded-lg shadow-sm sticky top-24">
            <h3 className="font-headline-md text-headline-md text-primary mb-6">Tính Năng Liên Quan</h3>
            <div className="space-y-4">
              <Link className="flex items-center gap-4 p-4 bg-surface-main border border-border-neutral rounded hover:border-primary transition-colors" href="/salary-calculator">
                <span className="material-symbols-outlined text-text-secondary">calculate</span>
                <div>
                  <div className="font-label-sm text-label-sm text-text-primary">Tính Lương</div>
                  <div className="font-body-md text-body-md text-text-secondary text-xs mt-1">Tính lương Gross to Net</div>
                </div>
              </Link>
              <Link className="flex items-center gap-4 p-4 bg-surface-main border border-border-neutral rounded hover:border-primary transition-colors" href="/court-fee-calculator">
                <span className="material-symbols-outlined text-text-secondary">account_balance_wallet</span>
                <div>
                  <div className="font-label-sm text-label-sm text-text-primary">Tính Án Phí</div>
                  <div className="font-body-md text-body-md text-text-secondary text-xs mt-1">Tính án phí tố tụng tòa án</div>
                </div>
              </Link>
              <Link className="flex items-center gap-4 p-4 bg-surface-main border border-border-neutral rounded hover:border-primary transition-colors" href="/ai-form-library">
                <span className="material-symbols-outlined text-text-secondary">description</span>
                <div>
                  <div className="font-label-sm text-label-sm text-text-primary">Biểu Mẫu AI</div>
                  <div className="font-body-md text-body-md text-text-secondary text-xs mt-1">Mẫu tờ khai thuế &amp; đơn từ</div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ===== FULL-WIDTH LEGAL KNOWLEDGE GUIDE SECTION ===== */}
      <CalculatorGuide type="pit" />
    </div>
  );
}
