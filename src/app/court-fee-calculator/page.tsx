"use client";

import { useState } from "react";
import Link from "next/link";
import { calcCourtFee } from "@/utils/calculator";

export default function CourtFeeCalculator() {
  const [caseType, setCaseType] = useState("dan-su");
  const [courtLevel, setCourtLevel] = useState("so-tham");
  const [claimType, setClaimType] = useState("ngach");
  const [claimValue, setClaimValue] = useState("");
  const [isExempt, setIsExempt] = useState(false);
  
  const [result, setResult] = useState<{ fee: number; deposit: number } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const value = claimType === "ngach" ? (parseFloat(claimValue) || 0) : 0;
    const { fee, deposit } = calcCourtFee(value, caseType, isExempt);
    setResult({ fee, deposit });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 pt-10 pb-16 min-h-screen">
      <div className="text-center mb-10 max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 font-sans tracking-tight uppercase mb-3 leading-tight">
          Công Cụ Tính Án Phí Tòa Án
        </h1>
        <div className="text-amber-600 flex items-center justify-center my-3">
          <span className="tracking-widest font-bold text-lg">— ⚖️ —</span>
        </div>
        <p className="text-slate-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          Tính toán nhanh mức tạm ứng án phí và án phí chính thức theo quy định hiện hành mới nhất.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8">
        {/* Calculator Widget */}
        <div className="md:col-span-7 lg:col-span-8 bg-surface-main border border-border-neutral p-6 md:p-8 rounded shadow-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block font-label-sm text-label-sm text-primary mb-2">Lĩnh vực tranh chấp</label>
                <select
                  value={caseType}
                  onChange={(e) => setCaseType(e.target.value)}
                  className="w-full border border-border-neutral bg-surface-alt text-primary p-3 rounded focus:border-primary focus:ring-1 focus:ring-primary font-body-md text-body-md outline-none"
                >
                  <option value="dan-su">Dân sự</option>
                  <option value="kinh-doanh">Kinh doanh thương mại</option>
                  <option value="hon-nhan">Hôn nhân gia đình</option>
                  <option value="lao-dong">Lao động</option>
                </select>
              </div>
              <div>
                <label className="block font-label-sm text-label-sm text-primary mb-2">Cấp tòa án</label>
                <select
                  value={courtLevel}
                  onChange={(e) => setCourtLevel(e.target.value)}
                  className="w-full border border-border-neutral bg-surface-alt text-primary p-3 rounded focus:border-primary focus:ring-1 focus:ring-primary font-body-md text-body-md outline-none"
                >
                  <option value="so-tham">Sơ thẩm</option>
                  <option value="phuc-tham">Phúc thẩm</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-label-sm text-label-sm text-primary mb-2">Loại tranh chấp</label>
              <div className="flex gap-6 mt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="claim_type"
                    value="ngach"
                    checked={claimType === "ngach"}
                    onChange={() => setClaimType("ngach")}
                    className="text-primary focus:ring-primary accent-primary"
                  />
                  <span className="font-body-md text-body-md text-primary">Có giá ngạch</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="claim_type"
                    value="khong_ngach"
                    checked={claimType === "khong_ngach"}
                    onChange={() => setClaimType("khong_ngach")}
                    className="text-primary focus:ring-primary accent-primary"
                  />
                  <span className="font-body-md text-body-md text-primary">Không có giá ngạch</span>
                </label>
              </div>
            </div>

            {claimType === "ngach" && (
              <div className="page-fade-in">
                <label className="block font-label-sm text-label-sm text-primary mb-2">Giá trị yêu cầu (VNĐ)</label>
                <div className="relative">
                  <input
                    type="number"
                    value={claimValue}
                    onChange={(e) => setClaimValue(e.target.value)}
                    placeholder="Nhập giá trị yêu cầu..."
                    className="w-full border border-border-neutral bg-surface-alt text-primary p-3 pr-16 rounded focus:border-primary focus:ring-1 focus:ring-primary font-body-md text-body-md outline-none"
                    required
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 font-label-sm text-label-sm text-text-secondary">
                    VNĐ
                  </span>
                </div>
              </div>
            )}

            <div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isExempt}
                  onChange={(e) => setIsExempt(e.target.checked)}
                  className="text-primary focus:ring-primary border-border-neutral rounded accent-primary w-4 h-4"
                />
                <span className="font-body-md text-body-md text-primary">Thuộc diện miễn/giảm án phí</span>
              </label>
            </div>

            <div className="pt-6 border-t border-border-neutral">
              <button
                type="submit"
                className="w-full md:w-auto bg-accent text-on-accent font-label-sm text-label-sm px-8 py-3 rounded hover:bg-opacity-90 transition-colors font-bold"
              >
                TÍNH TOÁN
              </button>
            </div>
          </form>
        </div>

        {/* Results + Consult */}
        <div className="md:col-span-5 lg:col-span-4 flex flex-col gap-6">
          {/* Results Card */}
          {result && (
            <div className="bg-surface-alt border border-border-neutral p-6 rounded flex-1 page-fade-in shadow-sm">
              <div className="flex items-center gap-2 mb-6 border-b border-border-neutral pb-4">
                <span className="material-symbols-outlined text-primary">gavel</span>
                <h2 className="font-headline-md text-headline-md text-primary">Kết Quả Tính Toán</h2>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-label-sm text-label-sm text-text-secondary mb-1">Tạm Ứng Án Phí (50%)</h3>
                  <p className={`font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg font-bold ${isExempt && result.deposit > 0 ? "text-gray-400 line-through" : "text-primary"}`}>
                    {result.deposit.toLocaleString('vi-VN')} VNĐ
                  </p>
                </div>
                
                <div>
                  <h3 className="font-label-sm text-label-sm text-text-secondary mb-1">Án Phí Chính Thức</h3>
                  <p className={`font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg font-bold ${isExempt && result.fee > 0 ? "text-gray-400 line-through" : "text-primary"}`}>
                    {result.fee.toLocaleString('vi-VN')} VNĐ
                  </p>
                </div>
                
                {isExempt && result.fee > 0 && (
                  <div className="page-fade-in">
                    <h3 className="font-label-sm text-label-sm text-text-secondary mb-1">Số Tiền Phải Nộp</h3>
                    <p className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg font-bold text-green-600">
                      0 VNĐ (Được miễn/giảm)
                    </p>
                  </div>
                )}
                
                <div className="inline-flex items-center gap-2 bg-surface-main px-3 py-2 border border-border-neutral rounded mt-4">
                  <span className="material-symbols-outlined text-text-secondary text-sm">info</span>
                  <span className="font-label-sm text-label-sm text-text-secondary text-xs">Căn cứ: Nghị quyết 326/2016/UBTVQH14</span>
                </div>
              </div>
            </div>
          )}

          {/* Consult Banner */}
          <div className="bg-primary text-on-primary p-6 rounded flex flex-col items-start gap-3 shadow-elegant">
            <h3 className="font-headline-md text-headline-md text-white">Án phí quá cao?</h3>
            <p className="font-body-md text-body-md text-white/80 mb-2">
              Nhận tư vấn từ Luật sư Tranh tụng để tối ưu chi phí và bảo vệ quyền lợi.
            </p>
            <Link
              href="/appointment"
              className="bg-white text-primary font-label-sm text-label-sm px-6 py-2 rounded font-bold hover:bg-gray-100 transition-colors inline-block"
            >
              Gặp Luật Sư
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
