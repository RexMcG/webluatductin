"use client";

import React, { useState } from "react";

export default function AdminSettingsPage() {
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

  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-[1200px] mx-auto">
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-purple-50 text-purple-700">
              <span className="material-symbols-outlined text-xl">settings</span>
            </span>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900">
              Cài Đặt Hệ Thống &amp; Thông Tin Hãng Luật
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Cập nhật hotline, zalo, email nhận thông báo đặt lịch và hồ sơ văn phòng
          </p>
        </div>

        {isSaved && (
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3.5 py-1.5 rounded-xl border border-emerald-200 flex items-center gap-1.5">
            <span className="material-symbols-outlined text-sm">check_circle</span>
            Đã lưu thành công!
          </span>
        )}
      </div>

      {/* Settings Form */}
      <form onSubmit={handleSave} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
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
    </div>
  );
}
