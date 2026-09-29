"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { calcPITBreakdown, PITBracketDetail, getLegalParams } from "@/utils/calculator";
import CalculatorGuide, { InfoTooltip } from "@/components/calculator/CalculatorGuide";
import { LegalParams, DEFAULT_LEGAL_PARAMS } from "@/services/legal-params.service";
import SectionDivider from "@/components/common/SectionDivider";

export default function PITCalculator() {
  const [params, setParams] = useState<LegalParams>(DEFAULT_LEGAL_PARAMS);
  const [gross, setGross] = useState<string>("");
  const [insuranceMode, setInsuranceMode] = useState<"auto" | "custom" | "none">("auto");
  const [customInsurance, setCustomInsurance] = useState<string>("");
  const [region, setRegion] = useState<number>(1);
  const [dependents, setDependents] = useState<number>(0);
  const [otherDeductions, setOtherDeductions] = useState<string>("");

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
    totalInsurance: number;
    selfDeduction: number;
    dependentsDeduction: number;
    otherDeductions: number;
    totalDeductions: number;
    taxableIncome: number;
    pit: number;
    netIncome: number;
    effectiveTaxRate: number;
    brackets: PITBracketDetail[];
  } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const grossVal = parseFloat(gross) || 0;
    const otherVal = parseFloat(otherDeductions) || 0;

    let bhxh = 0;
    let bhyt = 0;
    let bhtn = 0;
    let totalInsurance = 0;

    if (insuranceMode === "auto") {
      const bhxhCap = Math.min(grossVal, params.bhxhCap);
      const bhtnCap = (params.minWages[region] || params.minWages[1]) * 20;
      bhxh = bhxhCap * params.rates.bhxh; // 8%
      bhyt = bhxhCap * params.rates.bhyt; // 1.5%
      bhtn = Math.min(grossVal, bhtnCap) * params.rates.bhtn; // 1%
      totalInsurance = bhxh + bhyt + bhtn;
    } else if (insuranceMode === "custom") {
      totalInsurance = parseFloat(customInsurance) || 0;
    } else {
      totalInsurance = 0;
    }

    const selfDeduction = params.deductionSelf;
    const dependentsDeduction = dependents * params.deductionDep;
    const totalDeductions = selfDeduction + dependentsDeduction + totalInsurance + otherVal;

    const taxableIncome = Math.max(0, grossVal - totalDeductions);
    const { totalTax, brackets } = calcPITBreakdown(taxableIncome);
    const netIncome = Math.max(0, grossVal - totalInsurance - totalTax);
    const effectiveTaxRate = grossVal > 0 ? (totalTax / grossVal) * 100 : 0;

    setResult({
      gross: grossVal,
      bhxh,
      bhyt,
      bhtn,
      totalInsurance,
      selfDeduction,
      dependentsDeduction,
      otherDeductions: otherVal,
      totalDeductions,
      taxableIncome,
      pit: totalTax,
      netIncome,
      effectiveTaxRate,
      brackets,
    });
  };

  const handleReset = () => {
    setGross("");
    setInsuranceMode("auto");
    setCustomInsurance("");
    setDependents(0);
    setOtherDeductions("");
    setResult(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 pt-10 pb-16 min-h-screen">
      {/* Page Title */}
      <div className="text-center mb-10 max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-4xl font-bold text-slate-900 font-sans tracking-tight mb-1 leading-tight">
          Tính Thuế Thu Nhập Cá Nhân (PIT)
        </h1>
        <SectionDivider label="TIỆN ÍCH PHÁP LÝ" />
        <p className="text-slate-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-4">
          Công cụ tính thuế Thu nhập cá nhân chính xác theo Luật Thuế TNCN và biểu thuế lũy tiến từng phần 7 bậc mới nhất.
        </p>

        {/* Live Legal Status Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>
            Áp dụng: <strong>{params.legalBasis}</strong> (Bản thân: {(params.deductionSelf / 1000000).toFixed(1)} tr, Phụ thuộc: {(params.deductionDep / 1000000).toFixed(1)} tr/người)
          </span>
        </div>
      </div>

      {/* Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* ===== LEFT COLUMN: Calculator ===== */}
        <div className="lg:col-span-2 space-y-6">
          {/* Calculator Form */}
          <div className="bg-surface-alt border border-border-neutral p-6 md:p-8 rounded-lg shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              <h2 className="font-headline-md text-headline-md text-primary mb-2 flex items-center gap-2">
                <span className="material-symbols-outlined text-amber-800">calculate</span>
                Nhập Thông Tin Thu Nhập &amp; Giảm Trừ
              </h2>

              {/* Monthly Income */}
              <div>
                <label className="font-label-sm text-label-sm text-text-primary block mb-2" htmlFor="monthly-income">
                  Tổng thu nhập hàng tháng (Gross) <span className="text-error">*</span>
                  <InfoTooltip
                    title="Tổng thu nhập chịu thuế"
                    content="Toàn bộ tiền lương, tiền công, tiền thù lao, phụ cấp và các khoản thu nhập khác phát sinh trong tháng trước khi khấu trừ bảo hiểm và thuế."
                  />
                </label>
                <div className="relative">
                  <input
                    className="w-full h-12 pl-4 pr-16 border border-border-neutral rounded focus:border-primary focus:ring-1 focus:ring-primary bg-surface-main text-text-primary placeholder:text-slate-400 outline-none font-semibold"
                    id="monthly-income"
                    min="0"
                    step="100000"
                    type="number"
                    placeholder="Ví dụ: 30000000"
                    value={gross}
                    onChange={(e) => setGross(e.target.value)}
                    required
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 font-label-sm text-label-sm text-text-secondary pointer-events-none">
                    VNĐ
                  </span>
                </div>
                {gross && Number(gross) > 0 && (
                  <p className="text-xs text-amber-800 font-semibold mt-1.5">
                    Mức thu nhập: <strong className="text-slate-900 font-bold">{Number(gross).toLocaleString("vi-VN")}</strong> VNĐ/tháng
                  </p>
                )}
              </div>

              {/* Insurance Mode Selection */}
              <div className="p-4 bg-surface-main border border-border-neutral rounded-lg space-y-3">
                <label className="font-label-sm text-label-sm text-text-primary block font-bold">
                  Khoản trích nộp bảo hiểm bắt buộc:
                  <InfoTooltip
                    title="Bảo hiểm được trừ thuế"
                    content="Theo quy định, tiền đóng BHXH (8%), BHYT (1.5%), BHTN (1%) được khấu trừ trực tiếp khỏi thu nhập chịu thuế TNCN."
                  />
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <label className="flex items-center gap-2 p-2.5 rounded border border-slate-200 bg-white hover:border-amber-700 cursor-pointer text-xs font-medium">
                    <input
                      type="radio"
                      name="insurance_mode"
                      checked={insuranceMode === "auto"}
                      onChange={() => setInsuranceMode("auto")}
                      className="accent-[#641D06]"
                    />
                    <span>Tự động tính 10.5%</span>
                  </label>
                  <label className="flex items-center gap-2 p-2.5 rounded border border-slate-200 bg-white hover:border-amber-700 cursor-pointer text-xs font-medium">
                    <input
                      type="radio"
                      name="insurance_mode"
                      checked={insuranceMode === "custom"}
                      onChange={() => setInsuranceMode("custom")}
                      className="accent-[#641D06]"
                    />
                    <span>Tự nhập số tiền</span>
                  </label>
                  <label className="flex items-center gap-2 p-2.5 rounded border border-slate-200 bg-white hover:border-amber-700 cursor-pointer text-xs font-medium">
                    <input
                      type="radio"
                      name="insurance_mode"
                      checked={insuranceMode === "none"}
                      onChange={() => setInsuranceMode("none")}
                      className="accent-[#641D06]"
                    />
                    <span>Không đóng bảo hiểm</span>
                  </label>
                </div>

                {insuranceMode === "auto" && (
                  <div className="pt-2">
                    <label className="text-xs text-slate-600 block mb-1 font-medium">
                      Vùng lương tối thiểu (áp dụng trần BHTN):
                    </label>
                    <select
                      className="w-full h-10 px-3 border border-border-neutral rounded bg-surface-main text-text-primary text-xs outline-none focus:border-primary"
                      value={region}
                      onChange={(e) => setRegion(Number(e.target.value))}
                    >
                      <option value={1}>Vùng I: Hà Nội, TP.HCM, Bình Dương, Hải Phòng, Đồng Nai ({params.minWages[1].toLocaleString("vi-VN")} đ)</option>
                      <option value={2}>Vùng II: Đà Nẵng, Cần Thơ, Nha Trang, Hải Dương ({params.minWages[2].toLocaleString("vi-VN")} đ)</option>
                      <option value={3}>Vùng III: Các thị xã, thành phố trực thuộc tỉnh còn lại ({params.minWages[3].toLocaleString("vi-VN")} đ)</option>
                      <option value={4}>Vùng IV: Các huyện, khu vực nông thôn ({params.minWages[4].toLocaleString("vi-VN")} đ)</option>
                    </select>
                  </div>
                )}

                {insuranceMode === "custom" && (
                  <div className="pt-2">
                    <div className="relative">
                      <input
                        className="w-full h-10 pl-3 pr-14 border border-border-neutral rounded bg-surface-main text-text-primary text-xs outline-none focus:border-primary"
                        type="number"
                        placeholder="Nhập tổng số tiền bảo hiểm đã nộp"
                        value={customInsurance}
                        onChange={(e) => setCustomInsurance(e.target.value)}
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-text-secondary">VNĐ</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Number of Dependents */}
              <div>
                <label className="font-label-sm text-label-sm text-text-primary block mb-2" htmlFor="dependents">
                  Số người phụ thuộc
                  <InfoTooltip
                    title="Giảm trừ người phụ thuộc"
                    content="Mỗi người phụ thuộc đủ điều kiện hợp pháp giúp bạn giảm trừ 4.400.000 VNĐ/tháng thu nhập tính thuế."
                  />
                </label>
                <input
                  className="w-full h-12 pl-4 pr-4 border border-border-neutral rounded focus:border-primary focus:ring-1 focus:ring-primary bg-surface-main text-text-primary outline-none font-semibold"
                  id="dependents"
                  max="20"
                  min="0"
                  type="number"
                  value={dependents}
                  onChange={(e) => setDependents(parseInt(e.target.value) || 0)}
                />
                <p className="font-body-md text-body-md text-text-secondary text-xs mt-2">
                  Mỗi người phụ thuộc được giảm trừ {(params.deductionDep / 1000000).toLocaleString("vi-VN")} triệu VNĐ/tháng.
                </p>
              </div>

              {/* Other Deductions */}
              <div>
                <label className="font-label-sm text-label-sm text-text-primary block mb-2" htmlFor="other-deductions">
                  Các khoản giảm trừ khác (nếu có)
                  <InfoTooltip
                    title="Giảm trừ khác theo luật"
                    content="Bao gồm: Đóng góp từ thiện, nhân đạo, khuyến học có chứng từ hợp lệ, quỹ hưu trí tự nguyện theo quy định."
                  />
                </label>
                <div className="relative">
                  <input
                    className="w-full h-12 pl-4 pr-16 border border-border-neutral rounded focus:border-primary focus:ring-1 focus:ring-primary bg-surface-main text-text-primary placeholder:text-slate-400 outline-none"
                    id="other-deductions"
                    min="0"
                    step="100000"
                    type="number"
                    placeholder="0"
                    value={otherDeductions}
                    onChange={(e) => setOtherDeductions(e.target.value)}
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 font-label-sm text-label-sm text-text-secondary pointer-events-none">
                    VNĐ
                  </span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                className="w-full bg-[#641D06] text-white hover:bg-[#7D2408] h-14 rounded font-label-sm text-label-sm uppercase tracking-wider transition-colors flex items-center justify-center gap-2 mt-8 font-bold cursor-pointer shadow-md"
                type="submit"
              >
                <span className="material-symbols-outlined">calculate</span>
                Tính Thuế Thu Nhập Cá Nhân Ngay
              </button>
            </form>
          </div>

          {/* Results Card */}
          {result && (
            <div className="bg-surface-main border border-border-neutral p-6 md:p-8 rounded-lg shadow-sm space-y-6">
              <h2 className="font-headline-md text-headline-md text-primary flex items-center gap-2">
                <span className="material-symbols-outlined text-emerald-700">task_alt</span>
                Kết Quả Tính Thuế Thu Nhập Cá Nhân
              </h2>

              {/* Summary 3-Card Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-amber-50/80 border border-amber-200">
                  <span className="text-xs font-bold text-amber-800 uppercase block mb-1">Thuế TNCN phải nộp</span>
                  <div className="text-2xl font-black text-[#641D06]">
                    {Math.round(result.pit).toLocaleString("vi-VN")} <span className="text-xs font-semibold">VNĐ</span>
                  </div>
                  <span className="text-[11px] text-slate-500 mt-1 block">
                    Tỷ lệ thuế hiệu dụng: <strong>{result.effectiveTaxRate.toFixed(1)}%</strong>
                  </span>
                </div>

                <div className="p-4 rounded-lg bg-emerald-50/80 border border-emerald-200">
                  <span className="text-xs font-bold text-emerald-800 uppercase block mb-1">Thực nhận sau thuế (Net)</span>
                  <div className="text-2xl font-black text-emerald-700">
                    {Math.round(result.netIncome).toLocaleString("vi-VN")} <span className="text-xs font-semibold">VNĐ</span>
                  </div>
                  <span className="text-[11px] text-slate-500 mt-1 block">Sau khi trừ thuế &amp; bảo hiểm</span>
                </div>

                <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
                  <span className="text-xs font-bold text-slate-700 uppercase block mb-1">Thu nhập tính thuế</span>
                  <div className="text-2xl font-black text-slate-900">
                    {Math.round(result.taxableIncome).toLocaleString("vi-VN")} <span className="text-xs font-semibold">VNĐ</span>
                  </div>
                  <span className="text-[11px] text-slate-500 mt-1 block">Phần áp dụng biểu thuế 7 bậc</span>
                </div>
              </div>

              {/* Detailed Breakdown Table */}
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b-2 border-border-neutral bg-slate-50">
                      <th className="text-left font-label-sm text-label-sm text-text-primary py-3 px-3 uppercase tracking-wider">
                        Khoản mục
                      </th>
                      <th className="text-right font-label-sm text-label-sm text-text-primary py-3 px-3 uppercase tracking-wider">
                        Số tiền (VNĐ)
                      </th>
                    </tr>
                  </thead>
                  <tbody className="font-body-md text-body-md divide-y divide-border-neutral">
                    <tr>
                      <td className="py-3 px-3 text-text-primary font-bold">1. Tổng thu nhập (Gross)</td>
                      <td className="py-3 px-3 text-right text-text-primary font-bold">
                        {Math.round(result.gross).toLocaleString("vi-VN")}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 text-text-secondary pl-6">
                        - Bảo hiểm bắt buộc: BHXH (8%), BHYT (1.5%), BHTN (1%)
                      </td>
                      <td className="py-2.5 px-3 text-right text-red-600">
                        - {Math.round(result.totalInsurance).toLocaleString("vi-VN")}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 text-text-secondary pl-6">
                        - Giảm trừ gia cảnh cho bản thân
                      </td>
                      <td className="py-2.5 px-3 text-right text-red-600">
                        - {result.selfDeduction.toLocaleString("vi-VN")}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 text-text-secondary pl-6">
                        - Giảm trừ người phụ thuộc ({dependents} người)
                      </td>
                      <td className="py-2.5 px-3 text-right text-red-600">
                        - {Math.round(result.dependentsDeduction).toLocaleString("vi-VN")}
                      </td>
                    </tr>
                    {result.otherDeductions > 0 && (
                      <tr>
                        <td className="py-2.5 px-3 text-text-secondary pl-6">
                          - Các khoản giảm trừ khác (từ thiện, hưu trí)
                        </td>
                        <td className="py-2.5 px-3 text-right text-red-600">
                          - {Math.round(result.otherDeductions).toLocaleString("vi-VN")}
                        </td>
                      </tr>
                    )}
                    <tr className="bg-slate-50 font-bold">
                      <td className="py-3 px-3 text-text-primary">2. Thu nhập tính thuế (1 - Các khoản giảm trừ)</td>
                      <td className="py-3 px-3 text-right text-text-primary">
                        {Math.round(result.taxableIncome).toLocaleString("vi-VN")}
                      </td>
                    </tr>
                    <tr className="bg-amber-50/70">
                      <td className="py-4 px-3 text-text-primary font-bold text-base">
                        3. THUẾ THU NHẬP CÁ NHÂN PHẢI NỘP
                      </td>
                      <td className="py-4 px-3 text-right text-[#641D06] font-black text-xl">
                        {Math.round(result.pit).toLocaleString("vi-VN")}
                      </td>
                    </tr>
                    <tr className="bg-emerald-50/70">
                      <td className="py-4 px-3 text-text-primary font-bold text-base">
                        4. THỰC NHẬN CÒN LẠI (NET)
                      </td>
                      <td className="py-4 px-3 text-right text-emerald-700 font-black text-xl">
                        {Math.round(result.netIncome).toLocaleString("vi-VN")}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* 7 Progressive Tax Brackets Breakdown */}
              <div className="space-y-3 pt-2">
                <h3 className="font-bold text-slate-900 text-sm sm:text-base flex items-center gap-2">
                  <span className="material-symbols-outlined text-amber-800 text-lg">format_list_numbered</span>
                  Chi Tiết Tính Thuế Theo Biểu Thuế Lũy Tiến Từng Phần (7 Bậc)
                </h3>
                <div className="overflow-x-auto border border-border-neutral rounded-lg">
                  <table className="w-full text-xs sm:text-sm text-left border-collapse">
                    <thead className="bg-slate-100 text-slate-700 font-bold border-b border-border-neutral">
                      <tr>
                        <th className="py-2.5 px-3">Bậc</th>
                        <th className="py-2.5 px-3">Mức thu nhập tính thuế</th>
                        <th className="py-2.5 px-3 text-center">Thuế suất</th>
                        <th className="py-2.5 px-3 text-right">Thu nhập trong bậc</th>
                        <th className="py-2.5 px-3 text-right">Tiền thuế (VNĐ)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border-neutral font-medium">
                      {result.brackets.map((b) => {
                        const isActive = b.taxableInBracket > 0;
                        return (
                          <tr
                            key={b.bracket}
                            className={isActive ? "bg-amber-50/40 text-slate-900 font-semibold" : "text-slate-400"}
                          >
                            <td className="py-2.5 px-3">{b.bracket}</td>
                            <td className="py-2.5 px-3">{b.label}</td>
                            <td className="py-2.5 px-3 text-center">{Math.round(b.rate * 100)}%</td>
                            <td className="py-2.5 px-3 text-right">
                              {isActive ? Math.round(b.taxableInBracket).toLocaleString("vi-VN") : "0"}
                            </td>
                            <td className={`py-2.5 px-3 text-right ${isActive ? "text-[#641D06] font-bold" : ""}`}>
                              {isActive ? Math.round(b.tax).toLocaleString("vi-VN") : "0"}
                            </td>
                          </tr>
                        );
                      })}
                      <tr className="bg-slate-100 font-bold text-slate-900">
                        <td colSpan={4} className="py-3 px-3 text-right uppercase">
                          Tổng số thuế TNCN:
                        </td>
                        <td className="py-3 px-3 text-right text-[#641D06] font-black text-base">
                          {Math.round(result.pit).toLocaleString("vi-VN")}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-4 border-t border-border-neutral">
                <Link
                  href="/ai-chatbot?q=T%C6%B0%20v%E1%BA%A5n%20thu%E1%BA%BF%20thu%20nh%E1%BA%ADp%20c%C3%A1%20nh%C3%A2n%20v%C3%A0%20quy%E1%BA%BFt%20to%C3%A1n"
                  className="bg-[#641D06] text-white hover:bg-[#7D2408] h-10 px-5 rounded font-label-sm text-label-sm transition-colors flex items-center gap-2 font-bold cursor-pointer shadow-sm"
                >
                  <span className="material-symbols-outlined text-[20px]">support_agent</span>
                  Tư Vấn Thuế Trực Tuyến
                </Link>
                <Link
                  href="/appointment"
                  className="bg-surface-main border border-[#641D06] text-[#641D06] h-10 px-5 rounded font-label-sm text-label-sm hover:bg-surface-alt transition-colors flex items-center gap-2 font-bold cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[20px]">calendar_month</span>
                  Đặt Lịch Với Luật Sư
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

          {/* Quick Legal Reference */}
          <div className="bg-surface-alt border border-border-neutral p-6 rounded-lg shadow-sm">
            <h3 className="font-headline-md text-headline-md text-primary mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-amber-800">gavel</span>
              Căn Cứ Pháp Lý &amp; Quy Định Mới Nhất
            </h3>
            <ul className="space-y-3 font-body-md text-body-md text-text-secondary text-sm">
              <li className="flex items-start gap-2">
                <span className="material-symbols-outlined text-sm mt-0.5 text-primary">info</span>
                <span>
                  <strong>Mức giảm trừ gia cảnh:</strong> Bản thân người nộp thuế:{" "}
                  <strong>{(params.deductionSelf / 1000000).toLocaleString("vi-VN")} triệu đồng/tháng</strong> (132 triệu đồng/năm); Mỗi người phụ thuộc:{" "}
                  <strong>{(params.deductionDep / 1000000).toLocaleString("vi-VN")} triệu đồng/tháng</strong>.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="material-symbols-outlined text-sm mt-0.5 text-primary">info</span>
                <span>
                  <strong>Biểu thuế lũy tiến từng phần:</strong> Gồm 7 bậc thuế: 5% (đến 5tr), 10% (5-10tr), 15% (10-18tr), 20% (18-32tr), 25% (32-52tr), 30% (52-80tr), 35% (trên 80tr) áp dụng với thu nhập từ tiền lương, tiền công.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="material-symbols-outlined text-sm mt-0.5 text-primary">info</span>
                <span>
                  <strong>Trần đóng BHXH/BHYT:</strong> Tối đa 20 lần mức lương cơ sở ={" "}
                  <strong>{(params.bhxhCap / 1000000).toLocaleString("vi-VN")} triệu đồng/tháng</strong>. Trần BHTN tối đa 20 lần mức lương tối thiểu vùng theo Nghị định hiện hành.
                </span>
              </li>
            </ul>
          </div>

          {/* Educational Legal Guide */}
          <div className="mt-8">
            <CalculatorGuide type="pit" />
          </div>
        </div>

        {/* ===== RIGHT SIDEBAR ===== */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-surface-alt border border-border-neutral p-6 rounded-lg shadow-sm sticky top-24">
            <h3 className="font-headline-md text-headline-md text-primary mb-6">Tiện Ích Pháp Lý Liên Quan</h3>
            <div className="space-y-4">
              <Link
                className="flex items-center gap-4 p-4 bg-surface-main border border-border-neutral rounded hover:border-primary transition-colors"
                href="/ai-chatbot?q=T%C6%B0%20v%E1%BA%A5n%20thu%E1%BA%BF%20thu%20nh%E1%BA%ADp%20c%C3%A1%20nh%C3%A2n"
              >
                <span className="material-symbols-outlined text-[#641D06]">smart_toy</span>
                <div>
                  <div className="font-label-sm text-label-sm text-text-primary">Luật Sư AI Tư Vấn Thuế</div>
                  <div className="font-body-md text-body-md text-text-secondary text-xs mt-1">Hỏi đáp luật thuế TNCN 24/7</div>
                </div>
              </Link>
              <Link
                className="flex items-center gap-4 p-4 bg-surface-main border border-border-neutral rounded hover:border-primary transition-colors"
                href="/court-fee-calculator"
              >
                <span className="material-symbols-outlined text-text-secondary">account_balance_wallet</span>
                <div>
                  <div className="font-label-sm text-label-sm text-text-primary">Tính Án Phí Tòa Án</div>
                  <div className="font-body-md text-body-md text-text-secondary text-xs mt-1">Dự toán tạm ứng án phí tố tụng</div>
                </div>
              </Link>
              <Link
                className="flex items-center gap-4 p-4 bg-surface-main border border-border-neutral rounded hover:border-primary transition-colors"
                href="/ai-form-library"
              >
                <span className="material-symbols-outlined text-text-secondary">description</span>
                <div>
                  <div className="font-label-sm text-label-sm text-text-primary">Thư Viện Biểu Mẫu AI</div>
                  <div className="font-body-md text-body-md text-text-secondary text-xs mt-1">Mẫu tờ khai thuế, hợp đồng, đơn từ</div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
