"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { calcPIT, getLegalParams } from "@/utils/calculator";
import CalculatorGuide, { InfoTooltip } from "@/components/calculator/CalculatorGuide";
import { LegalParams, DEFAULT_LEGAL_PARAMS } from "@/services/legal-params.service";

export default function SalaryCalculator() {
  const [params, setParams] = useState<LegalParams>(DEFAULT_LEGAL_PARAMS);
  const [gross, setGross] = useState<string>("");
  const [dependents, setDependents] = useState<number>(0);
  const [region, setRegion] = useState<number>(1);
  const [includeInsurance, setIncludeInsurance] = useState<boolean>(true);

  useEffect(() => {
    setParams(getLegalParams());
    const handleUpdate = () => setParams(getLegalParams());
    window.addEventListener("legal_params_updated", handleUpdate);
    return () => window.removeEventListener("legal_params_updated", handleUpdate);
  }, []);

  const [result, setResult] = useState<{
    gross: number;
    bhxh: number;
    bhyt: number;
    bhtn: number;
    pit: number;
    net: number;
  } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const grossVal = parseFloat(gross) || 0;
    
    let bhxh = 0, bhyt = 0, bhtn = 0;
    if (includeInsurance) {
      const bhxCap = Math.min(grossVal, params.bhxhCap);
      const bhtnCap = params.minWages[region] ? params.minWages[region] * 20 : params.minWages[1] * 20;
      bhxh = bhxCap * params.rates.bhxh;      // 8%
      bhyt = bhxCap * params.rates.bhyt;      // 1.5%
      bhtn = Math.min(grossVal, bhtnCap) * params.rates.bhtn; // 1%
    }

    const taxableIncome = Math.max(0, grossVal - bhxh - bhyt - bhtn - params.deductionSelf - dependents * params.deductionDep);
    const pit = calcPIT(taxableIncome);
    const net = grossVal - bhxh - bhyt - bhtn - pit;

    setResult({
      gross: grossVal,
      bhxh,
      bhyt,
      bhtn,
      pit,
      net,
    });
  };

  const handleReset = () => {
    setGross("");
    setDependents(0);
    setRegion(1);
    setIncludeInsurance(true);
    setResult(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 pt-10 pb-16 min-h-screen">
      {/* Page Title */}
      <div className="text-center mb-10 max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 font-sans tracking-tight uppercase mb-3 leading-tight">
          Tính Năng Tính Lương Gross-to-Net
        </h1>
        <div className="text-amber-600 flex items-center justify-center my-3">
          <span className="tracking-widest font-bold text-lg">— ⚖️ —</span>
        </div>
        <p className="text-slate-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-4">
          Tính toán chính xác lương thực nhận (Net) từ lương tổng (Gross), các khoản trích nộp BHXH, BHYT, BHTN và thuế TNCN theo quy định mới nhất.
        </p>

        {/* Live Legal Status Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>Áp dụng theo: <strong>{params.legalBasis}</strong> (Hiệu lực: {params.effectiveDate})</span>
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
              
              {/* Gross Salary */}
              <div>
                <label className="font-label-sm text-label-sm text-text-primary block mb-2" htmlFor="gross-salary">
                  Tổng thu nhập (Gross) <span className="text-error">*</span>
                  <InfoTooltip
                    title="Lương Gross"
                    content="Lương Gross là tổng thu nhập bạn được nhận trước khi trừ các khoản đóng bảo hiểm (10.5%) và thuế TNCN."
                  />
                </label>
                <div className="relative">
                  <input
                    className="w-full h-12 pl-4 pr-16 border border-border-neutral rounded focus:border-primary focus:ring-1 focus:ring-primary bg-surface-main text-text-primary placeholder:text-border-neutral outline-none"
                    id="gross-salary"
                    min="0"
                    step="100000"
                    type="number"
                    placeholder="Ví dụ: 20000000"
                    value={gross}
                    onChange={(e) => setGross(e.target.value)}
                    required
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 font-label-sm text-label-sm text-text-secondary pointer-events-none">VNĐ</span>
                </div>
              </div>

              {/* Number of Dependents */}
              <div>
                <label className="font-label-sm text-label-sm text-text-primary block mb-2" htmlFor="dependents">
                  Số người phụ thuộc
                  <InfoTooltip
                    title="Người phụ thuộc"
                    content="Mỗi người phụ thuộc hợp lệ (con cái, cha mẹ hết tuổi lao động) được giảm trừ 4.400.000 VNĐ/tháng khi tính thuế TNCN."
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

              {/* Region Dropdown */}
              <div>
                <label className="font-label-sm text-label-sm text-text-primary block mb-2" htmlFor="region">
                  Khu vực
                  <InfoTooltip
                    title="Lương tối thiểu vùng"
                    content="Áp dụng để giới hạn mức đóng bảo hiểm thất nghiệp tối đa (không quá 20 lần mức lương tối thiểu vùng)."
                  />
                </label>
                <select
                  className="w-full h-12 pl-4 pr-4 border border-border-neutral rounded focus:border-primary focus:ring-1 focus:ring-primary bg-surface-main text-text-primary outline-none"
                  id="region"
                  value={region}
                  onChange={(e) => setRegion(parseInt(e.target.value))}
                >
                  <option value={1}>Vùng I (Hà Nội, TP. Hồ Chí Minh)</option>
                  <option value={2}>Vùng II</option>
                  <option value={3}>Vùng III</option>
                  <option value={4}>Vùng IV</option>
                </select>
              </div>

              {/* Insurance Checkbox */}
              <div className="flex items-center gap-3 pt-2">
                <input
                  className="w-5 h-5 border-border-neutral rounded text-primary focus:ring-primary cursor-pointer accent-primary"
                  id="include-insurance"
                  type="checkbox"
                  checked={includeInsurance}
                  onChange={(e) => setIncludeInsurance(e.target.checked)}
                />
                <label className="font-body-md text-body-md text-text-primary cursor-pointer" htmlFor="include-insurance">
                  Bao gồm bảo hiểm bắt buộc (NLĐ đóng 10.5%: BHXH 8%, BHYT 1.5%, BHTN 1%)
                </label>
              </div>

              {/* Submit Button */}
              <button
                className="w-full bg-accent text-on-accent h-14 rounded font-label-sm text-label-sm uppercase tracking-wider hover:opacity-90 transition-opacity flex items-center justify-center gap-2 mt-8 font-bold cursor-pointer"
                type="submit"
              >
                <span className="material-symbols-outlined">calculate</span>
                Tính Lương Ngay
              </button>
            </form>
          </div>

          {/* Results Card */}
          {result && (
            <div className="bg-surface-main border border-border-neutral p-6 md:p-8 rounded-lg page-fade-in shadow-sm">
              <h2 className="font-headline-md text-headline-md text-primary mb-6">Kết Quả Tính Lương</h2>
              
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
                      <td className="py-4 px-2 text-text-primary font-medium">Tổng thu nhập (Gross)</td>
                      <td className="py-4 px-2 text-right text-text-primary font-medium">{Math.round(result.gross).toLocaleString('vi-VN')}</td>
                    </tr>
                    <tr className="border-b border-border-neutral">
                      <td className="py-4 px-2 text-text-secondary">- Bảo hiểm xã hội (BHXH 8%)</td>
                      <td className="py-4 px-2 text-right text-error">- {Math.round(result.bhxh).toLocaleString('vi-VN')}</td>
                    </tr>
                    <tr className="border-b border-border-neutral">
                      <td className="py-4 px-2 text-text-secondary">- Bảo hiểm y tế (BHYT 1.5%)</td>
                      <td className="py-4 px-2 text-right text-error">- {Math.round(result.bhyt).toLocaleString('vi-VN')}</td>
                    </tr>
                    <tr className="border-b border-border-neutral">
                      <td className="py-4 px-2 text-text-secondary">- Bảo hiểm thất nghiệp (BHTN 1%)</td>
                      <td className="py-4 px-2 text-right text-error">- {Math.round(result.bhtn).toLocaleString('vi-VN')}</td>
                    </tr>
                    <tr className="border-b border-border-neutral">
                      <td className="py-4 px-2 text-text-secondary">- Thuế TNCN (PIT)</td>
                      <td className="py-4 px-2 text-right text-error">- {Math.round(result.pit).toLocaleString('vi-VN')}</td>
                    </tr>
                    <tr className="bg-amber-50/60">
                      <td className="py-6 px-2 text-text-primary font-bold text-lg">Lương thực nhận (Net)</td>
                      <td className="py-6 px-2 text-right text-[#641D06] font-black text-xl">{Math.round(result.net).toLocaleString('vi-VN')}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 mt-8 pt-6 border-t border-border-neutral">
                <Link
                  href="/ai-chatbot?q=T%C6%B0%20v%E1%BA%A5n%20h%E1%BB%A3p%20%C4%91%E1%BB%93ng%20lao%20%C4%91%E1%BB%99ng%20v%C3%A0%20ti%E1%BB%81n%20l%C6%B0%C6%A1ng"
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
                <span>Mức lương đóng BHXH, BHYT, BHTN tối đa bằng 20 lần mức tham chiếu/lương cơ sở.</span>
              </li>
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
              <Link className="flex items-center gap-4 p-4 bg-surface-main border border-border-neutral rounded hover:border-primary transition-colors" href="/pit-calculator">
                <span className="material-symbols-outlined text-text-secondary">account_balance</span>
                <div>
                  <div className="font-label-sm text-label-sm text-text-primary">Tính Thuế TNCN</div>
                  <div className="font-body-md text-body-md text-text-secondary text-xs mt-1">Tính chi tiết thuế thu nhập</div>
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
                  <div className="font-body-md text-body-md text-text-secondary text-xs mt-1">Hợp đồng lao động chuẩn</div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ===== FULL-WIDTH LEGAL KNOWLEDGE GUIDE SECTION ===== */}
      <CalculatorGuide type="salary" />
    </div>
  );
}
