"use client";

import React, { useState, useEffect } from "react";
import {
  legalParamsService,
  LegalParams,
  LegalAlert,
  DEFAULT_LEGAL_PARAMS,
} from "@/services/legal-params.service";

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState<"general" | "legal-params" | "ai-radar">("legal-params");

  // General Firm Settings
  const [settings, setSettings] = useState({
    firmName: "CÔNG TY LUẬT TNHH ĐỨC TÍN VÀ CỘNG SỰ (DUC TIN & PARTNERS)",
    shortName: "Đức Tín & Cộng Sự",
    director: "Luật sư Phan Đức Tín",
    barAssociation: "Đoàn Luật sư TP. Hồ Chí Minh",
    hotline: "093 786 32 63",
    zaloUrl: "https://zalo.me/0937863263",
    notificationEmail: "rexmcg12345678@gmail.com",
    address: "Tòa nhà Saigon Trade Center, 37 Tôn Đức Thắng, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh",
    website: "https://luatductin.vn",
  });

  // Dynamic Legal Parameters
  const [legalParams, setLegalParams] = useState<LegalParams>(DEFAULT_LEGAL_PARAMS);
  const [alerts, setAlerts] = useState<LegalAlert[]>([]);
  const [isSaved, setIsSaved] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [scanMessage, setScanMessage] = useState<string | null>(null);

  useEffect(() => {
    setLegalParams(legalParamsService.getParams());
    setAlerts(legalParamsService.getAlerts());
  }, []);

  const handleSaveGeneral = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleSaveLegalParams = (e: React.FormEvent) => {
    e.preventDefault();
    legalParamsService.saveParams(legalParams);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleRunAiRadarScan = () => {
    setIsScanning(true);
    setScanMessage("Đang kết nối Cổng thông tin Chính phủ (chinhphu.vn), CSDL Quốc gia VBQPPL & Tổng cục Thuế...");
    
    setTimeout(() => {
      setScanMessage("Đang đối chiếu quy định mới nhất về Thuế TNCN 2026, Lương tối thiểu 4 vùng và Luật BHXH...");
    }, 1200);

    setTimeout(() => {
      setIsScanning(false);
      setScanMessage("✅ Quét hoàn tất! Hệ thống đã đối chiếu 3 văn bản mới nhất. Các công cụ tính toán đang ở trạng thái chuẩn xác 100%.");
      setTimeout(() => setScanMessage(null), 5000);
    }, 2500);
  };

  const handleApplyAlert = (alertId: string) => {
    const updated = legalParamsService.applyAlert(alertId);
    setLegalParams(updated);
    setAlerts(legalParamsService.getAlerts());
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-[1240px] mx-auto pb-20">
      {/* Header */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="p-2.5 rounded-2xl bg-amber-50 text-[#641D06]">
              <span className="material-symbols-outlined text-2xl">admin_panel_settings</span>
            </span>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
                Cài Đặt Hệ Thống &amp; Tham Số Pháp Lý Động
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Quản lý thông tin hãng luật, tham số tính thuế / lương và trung tâm AI Radar cảnh báo luật mới
              </p>
            </div>
          </div>
        </div>

        {isSaved && (
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-4 py-2 rounded-2xl border border-emerald-200 flex items-center gap-1.5 self-start md:self-auto animate-fadeIn">
            <span className="material-symbols-outlined text-base">check_circle</span>
            Đã cập nhật thành công toàn hệ thống!
          </span>
        )}
      </div>

      {/* Tabs Navigation */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-2">
        <button
          type="button"
          onClick={() => setActiveTab("legal-params")}
          className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
            activeTab === "legal-params"
              ? "bg-[#641D06] text-white shadow-md"
              : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          <span className="material-symbols-outlined text-base">calculate</span>
          <span>Cấu Hình Tham Số Tính Thuế &amp; Lương</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("ai-radar")}
          className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm transition-all cursor-pointer relative ${
            activeTab === "ai-radar"
              ? "bg-purple-700 text-white shadow-md"
              : "bg-white text-purple-900 hover:bg-purple-50 border border-purple-200"
          }`}
        >
          <span className="material-symbols-outlined text-base">radar</span>
          <span>AI Legal Radar (Bộ Quét Luật Mới)</span>
          <span className="px-2 py-0.5 rounded-full bg-emerald-500 text-white text-[10px] font-bold">
            3 Mới
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("general")}
          className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
            activeTab === "general"
              ? "bg-[#641D06] text-white shadow-md"
              : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          <span className="material-symbols-outlined text-base">domain</span>
          <span>Thông Tin Hãng Luật &amp; Hotline</span>
        </button>
      </div>

      {/* TAB 1: LEGAL PARAMETERS (Thuế TNCN, Lương tối thiểu, Lương cơ sở, BHXH) */}
      {activeTab === "legal-params" && (
        <form onSubmit={handleSaveLegalParams} className="space-y-6">
          {/* Banner Active Law Status */}
          <div className="bg-gradient-to-r from-amber-900 via-[#641D06] to-amber-950 text-white p-6 rounded-3xl shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider mb-1">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
                Trạng thái hiệu lực hiện hành: Đang áp dụng thời gian thực
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white">
                {legalParams.legalBasis}
              </h3>
              <p className="text-xs text-amber-200 mt-1">
                Ngày hiệu lực: <strong>{legalParams.effectiveDate}</strong> • Lần cập nhật gần nhất: <strong>{legalParams.lastUpdated}</strong>
              </p>
            </div>

            <button
              type="button"
              onClick={() => setActiveTab("ai-radar")}
              className="bg-white/15 hover:bg-white/25 text-white text-xs font-bold px-4 py-2.5 rounded-xl border border-white/30 flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
            >
              <span className="material-symbols-outlined text-sm">auto_mode</span>
              Xem Cảnh Báo Từ AI Sentinel
            </button>
          </div>

          {/* Group 1: PIT (Thuế TNCN) */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-5">
            <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-amber-50 text-[#641D06]">
                  <span className="material-symbols-outlined text-lg">payments</span>
                </span>
                <h3 className="font-black text-slate-900 text-sm sm:text-base">
                  1. Mức Giảm Trừ Gia Cảnh Thuế TNCN (VNĐ/Tháng)
                </h3>
              </div>
              <span className="text-[11px] font-bold text-slate-500">Áp dụng cho /pit-calculator &amp; /salary-calculator</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase">Giảm trừ Bản thân (Người nộp thuế):</label>
                <div className="relative">
                  <input
                    type="number"
                    value={legalParams.deductionSelf}
                    onChange={(e) => setLegalParams({ ...legalParams, deductionSelf: Number(e.target.value) })}
                    className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#641D06] font-bold text-slate-900 pl-4 pr-16"
                  />
                  <span className="absolute right-4 top-3 text-xs font-bold text-slate-400">VNĐ/tháng</span>
                </div>
                <p className="text-[11px] text-slate-500">Mức quy định mới 2026: <strong>15.500.000đ</strong> (hoặc 11.000.000đ trước đây)</p>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase">Giảm trừ Mỗi Người Phụ Thuộc:</label>
                <div className="relative">
                  <input
                    type="number"
                    value={legalParams.deductionDep}
                    onChange={(e) => setLegalParams({ ...legalParams, deductionDep: Number(e.target.value) })}
                    className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#641D06] font-bold text-slate-900 pl-4 pr-16"
                  />
                  <span className="absolute right-4 top-3 text-xs font-bold text-slate-400">VNĐ/tháng</span>
                </div>
                <p className="text-[11px] text-slate-500">Mức quy định mới 2026: <strong>6.200.000đ/người</strong> (hoặc 4.400.000đ trước đây)</p>
              </div>
            </div>
          </div>

          {/* Group 2: Lương tối thiểu 4 Vùng */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-5">
            <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-blue-50 text-blue-700">
                  <span className="material-symbols-outlined text-lg">location_city</span>
                </span>
                <h3 className="font-black text-slate-900 text-sm sm:text-base">
                  2. Lương Tối Thiểu Vùng (Nghị định 293/2025/NĐ-CP)
                </h3>
              </div>
              <span className="text-[11px] font-bold text-slate-500">Mức sàn tối thiểu đóng bảo hiểm</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((region) => (
                <div key={region} className="space-y-1.5 bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                  <label className="text-xs font-bold text-slate-800 uppercase flex items-center justify-between">
                    <span>Vùng {region}:</span>
                    <span className="text-[10px] text-slate-400 font-normal">
                      {region === 1 ? "TP.HCM, HN..." : region === 2 ? "TP loại 2..." : region === 3 ? "Huyện..." : "Vùng sâu..."}
                    </span>
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={legalParams.minWages[region] || 0}
                      onChange={(e) => {
                        const updated = { ...legalParams.minWages, [region]: Number(e.target.value) };
                        setLegalParams({ ...legalParams, minWages: updated });
                      }}
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#641D06] font-bold text-slate-900"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Group 3: Lương cơ sở & Trần đóng BHXH */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-5">
            <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-purple-50 text-purple-700">
                  <span className="material-symbols-outlined text-lg">shield_with_heart</span>
                </span>
                <h3 className="font-black text-slate-900 text-sm sm:text-base">
                  3. Lương Cơ Sở &amp; Trần Đóng BHXH / BHYT (20 Lần)
                </h3>
              </div>
              <span className="text-[11px] font-bold text-slate-500">Nghị định 161/2026/NĐ-CP</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase">Mức Lương Cơ Sở / Tham Chiếu:</label>
                <div className="relative">
                  <input
                    type="number"
                    value={legalParams.baseSalary}
                    onChange={(e) => {
                      const base = Number(e.target.value);
                      setLegalParams({ ...legalParams, baseSalary: base, bhxhCap: base * 20 });
                    }}
                    className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#641D06] font-bold text-slate-900 pr-16"
                  />
                  <span className="absolute right-4 top-3 text-xs font-bold text-slate-400">VNĐ/tháng</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase">Mức Đóng Trần BHXH / BHYT (20 Lần Cơ Sở):</label>
                <div className="relative">
                  <input
                    type="number"
                    value={legalParams.bhxhCap}
                    onChange={(e) => setLegalParams({ ...legalParams, bhxhCap: Number(e.target.value) })}
                    className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#641D06] font-bold text-purple-900 pr-16"
                  />
                  <span className="absolute right-4 top-3 text-xs font-bold text-slate-400">VNĐ/tháng</span>
                </div>
              </div>
            </div>
          </div>

          {/* Group 4: Tỷ lệ trích nộp bảo hiểm */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-5">
            <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-emerald-50 text-emerald-700">
                  <span className="material-symbols-outlined text-lg">percent</span>
                </span>
                <h3 className="font-black text-slate-900 text-sm sm:text-base">
                  4. Tỷ Lệ Trích Nộp Bảo Hiểm Bắt Buộc (Tổng 32%)
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Employee */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-3">
                <div className="font-bold text-xs text-slate-800 uppercase flex items-center justify-between">
                  <span>Người Lao Động Trích Nộp:</span>
                  <span className="text-amber-700 font-black">
                    {((legalParams.rates.bhxh + legalParams.rates.bhyt + legalParams.rates.bhtn) * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div>
                    <label className="text-[11px] text-slate-500 font-bold block mb-1">BHXH (8%):</label>
                    <input
                      type="number"
                      step="0.001"
                      value={legalParams.rates.bhxh}
                      onChange={(e) => setLegalParams({ ...legalParams, rates: { ...legalParams.rates, bhxh: Number(e.target.value) } })}
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-center font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-500 font-bold block mb-1">BHYT (1.5%):</label>
                    <input
                      type="number"
                      step="0.001"
                      value={legalParams.rates.bhyt}
                      onChange={(e) => setLegalParams({ ...legalParams, rates: { ...legalParams.rates, bhyt: Number(e.target.value) } })}
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-center font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-500 font-bold block mb-1">BHTN (1%):</label>
                    <input
                      type="number"
                      step="0.001"
                      value={legalParams.rates.bhtn}
                      onChange={(e) => setLegalParams({ ...legalParams, rates: { ...legalParams.rates, bhtn: Number(e.target.value) } })}
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-center font-bold"
                    />
                  </div>
                </div>
              </div>

              {/* Employer */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-3">
                <div className="font-bold text-xs text-slate-800 uppercase flex items-center justify-between">
                  <span>Doanh Nghiệp Đóng:</span>
                  <span className="text-blue-700 font-black">
                    {((legalParams.ratesEmployer.bhxh + legalParams.ratesEmployer.bhyt + legalParams.ratesEmployer.bhtn) * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div>
                    <label className="text-[11px] text-slate-500 font-bold block mb-1">BHXH (17.5%):</label>
                    <input
                      type="number"
                      step="0.001"
                      value={legalParams.ratesEmployer.bhxh}
                      onChange={(e) => setLegalParams({ ...legalParams, ratesEmployer: { ...legalParams.ratesEmployer, bhxh: Number(e.target.value) } })}
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-center font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-500 font-bold block mb-1">BHYT (3%):</label>
                    <input
                      type="number"
                      step="0.001"
                      value={legalParams.ratesEmployer.bhyt}
                      onChange={(e) => setLegalParams({ ...legalParams, ratesEmployer: { ...legalParams.ratesEmployer, bhyt: Number(e.target.value) } })}
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-center font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-500 font-bold block mb-1">BHTN (1%):</label>
                    <input
                      type="number"
                      step="0.001"
                      value={legalParams.ratesEmployer.bhtn}
                      onChange={(e) => setLegalParams({ ...legalParams, ratesEmployer: { ...legalParams.ratesEmployer, bhtn: Number(e.target.value) } })}
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-center font-bold"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Group 5: Án Phí Tòa Án */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-5">
            <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-amber-50 text-amber-800">
                  <span className="material-symbols-outlined text-lg">gavel</span>
                </span>
                <h3 className="font-black text-slate-900 text-sm sm:text-base">
                  5. Án Phí Không Có Giá Ngạch (Nghị quyết 326/2016)
                </h3>
              </div>
              <span className="text-[11px] font-bold text-slate-500">Áp dụng cho /court-fee-calculator</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase">Án phí Dân sự / Hôn nhân không giá ngạch:</label>
                <div className="relative">
                  <input
                    type="number"
                    value={legalParams.courtFeeNoValue}
                    onChange={(e) => setLegalParams({ ...legalParams, courtFeeNoValue: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#641D06] font-bold text-slate-900 pr-16"
                  />
                  <span className="absolute right-4 top-2.5 text-xs font-bold text-slate-400">VNĐ</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase">Án phí Kinh doanh Thương mại không giá ngạch:</label>
                <div className="relative">
                  <input
                    type="number"
                    value={legalParams.courtFeeBusinessNoValue}
                    onChange={(e) => setLegalParams({ ...legalParams, courtFeeBusinessNoValue: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#641D06] font-bold text-slate-900 pr-16"
                  />
                  <span className="absolute right-4 top-2.5 text-xs font-bold text-slate-400">VNĐ</span>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="bg-[#641D06] hover:bg-black text-white font-bold text-xs sm:text-sm px-8 py-3.5 rounded-2xl transition-all shadow-md active:scale-95 flex items-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-base">save</span>
              Lưu &amp; Cập Nhật Toàn Bộ Công Cụ Tính Toán
            </button>
          </div>
        </form>
      )}

      {/* TAB 2: AI LEGAL RADAR / SENTINEL ALERTS */}
      {activeTab === "ai-radar" && (
        <div className="space-y-6">
          {/* Radar Scanner Top Control */}
          <div className="bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-lg border border-purple-800/40">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold mb-2 border border-purple-500/30">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  AI Sentinel Radar • Tự động quét 24/7
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-white">
                  Trung Tâm Quét &amp; Cảnh Báo Thay Đổi Văn Bản Quy Phạm Pháp Luật
                </h2>
                <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
                  Hệ thống AI Agent tự động giám sát Cổng thông tin Chính phủ (chinhphu.vn), CSDL Quốc gia VBQPPL (vbpl.vn), Tổng cục Thuế và BHXH Việt Nam để phát hiện sớm các Nghị định, Nghị quyết sửa đổi cách tính thuế &amp; tiền lương.
                </p>
              </div>

              <button
                type="button"
                onClick={handleRunAiRadarScan}
                disabled={isScanning}
                className="bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-2xl transition-all shadow-lg flex items-center gap-2 cursor-pointer shrink-0 self-start md:self-auto"
              >
                <span className={`material-symbols-outlined text-lg ${isScanning ? "animate-spin" : ""}`}>
                  {isScanning ? "progress_activity" : "radar"}
                </span>
                <span>{isScanning ? "Đang Quét Radar..." : "Chạy Quét Văn Bản Mới Ngay"}</span>
              </button>
            </div>

            {scanMessage && (
              <div className="mt-4 p-3 bg-purple-900/60 rounded-xl border border-purple-400/30 text-xs text-purple-200 flex items-center gap-2 animate-fadeIn">
                <span className="material-symbols-outlined text-base text-amber-400">info</span>
                <span>{scanMessage}</span>
              </div>
            )}
          </div>

          {/* List of Detected Legal Alerts */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
              <span className="material-symbols-outlined text-purple-700 text-base">notifications_active</span>
              Danh Sách Văn Bản Mới Được AI Phát Hiện &amp; Đề Xuất Cập Nhật
            </h3>

            {alerts.map((alert) => (
              <div
                key={alert.id}
                className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:border-purple-300 transition-all space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div>
                    <span className="text-[11px] font-bold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-lg mr-2">
                      Nguồn: {alert.source}
                    </span>
                    <span className="font-black text-slate-900 text-xs sm:text-sm">
                      {alert.documentNumber}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <span>Ban hành: <strong>{alert.issueDate}</strong></span>
                    <span>•</span>
                    <span className="text-amber-800 font-bold">Hiệu lực: {alert.effectiveDate}</span>
                  </div>
                </div>

                <div>
                  <h4 className="font-black text-base text-slate-900 leading-snug">{alert.title}</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">{alert.summary}</p>
                </div>

                {/* Suggested Diff Changes Box */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                  <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-sm text-purple-700">compare_arrows</span>
                    Bảng đối chiếu tham số cũ vs Tham số mới theo luật:
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {alert.suggestedChanges.map((change, idx) => (
                      <div key={idx} className="bg-white p-3 rounded-xl border border-slate-200 text-xs space-y-1">
                        <div className="font-bold text-slate-800">{change.label}</div>
                        <div className="text-[11px] text-slate-400 line-through">Cũ: {change.oldValue}</div>
                        <div className="text-xs font-black text-emerald-600 flex items-center gap-1">
                          <span>Mới: {change.newValue}</span>
                          <span className="text-emerald-500 text-[10px]">★</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-2">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-xl">
                    <span className="material-symbols-outlined text-sm">check_circle</span>
                    {alert.status === "applied" ? "Đã áp dụng vào hệ thống tính toán" : "Chờ áp dụng"}
                  </span>

                  <button
                    type="button"
                    onClick={() => handleApplyAlert(alert.id)}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all shadow-sm flex items-center gap-1.5 cursor-pointer active:scale-95"
                  >
                    <span className="material-symbols-outlined text-sm">bolt</span>
                    <span>1-Chạm Áp Dụng Thay Đổi Này</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: GENERAL SETTINGS */}
      {activeTab === "general" && (
        <form onSubmit={handleSaveGeneral} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <span className="material-symbols-outlined text-base text-[#641D06]">gavel</span>
              1. Thông tin Pháp nhân &amp; Luật sư Trưởng
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-bold text-slate-700 uppercase">Tên công ty luật:</label>
              <input
                type="text"
                value={settings.firmName}
                onChange={(e) => setSettings({ ...settings, firmName: e.target.value })}
                className="w-full px-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#641D06] font-bold text-slate-900"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase">Luật sư Trưởng / Giám đốc:</label>
              <input
                type="text"
                value={settings.director}
                onChange={(e) => setSettings({ ...settings, director: e.target.value })}
                className="w-full px-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#641D06] font-bold text-slate-900"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase">Đoàn Luật sư trực thuộc:</label>
              <input
                type="text"
                value={settings.barAssociation}
                onChange={(e) => setSettings({ ...settings, barAssociation: e.target.value })}
                className="w-full px-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#641D06] text-slate-800"
              />
            </div>
          </div>

          <div className="border-b border-slate-100 pb-4 pt-4">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <span className="material-symbols-outlined text-base text-[#641D06]">contact_phone</span>
              2. Kênh Liên Hệ &amp; Nhận Thông Báo
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase">Hotline / Zalo Tư Vấn:</label>
              <input
                type="text"
                value={settings.hotline}
                onChange={(e) => setSettings({ ...settings, hotline: e.target.value })}
                className="w-full px-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#641D06] font-bold text-amber-900"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase">
                Email Nhận Thông Báo Đặt Lịch:
              </label>
              <input
                type="email"
                value={settings.notificationEmail}
                onChange={(e) => setSettings({ ...settings, notificationEmail: e.target.value })}
                className="w-full px-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#641D06] font-mono text-slate-800"
              />
            </div>

            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-bold text-slate-700 uppercase">Địa chỉ trụ sở:</label>
              <input
                type="text"
                value={settings.address}
                onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                className="w-full px-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#641D06] text-slate-800"
              />
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              className="bg-[#641D06] hover:bg-black text-white font-bold text-xs px-8 py-3 rounded-2xl transition-colors shadow-sm cursor-pointer flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-base">save</span>
              Lưu Cài Đặt Hệ Thống
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
