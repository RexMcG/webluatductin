export interface LegalParams {
  deductionSelf: number;
  deductionDep: number;
  baseSalary: number;
  bhxhCap: number;
  minWages: { [key: number]: number };
  rates: { bhxh: number; bhyt: number; bhtn: number };
  ratesEmployer: { bhxh: number; bhyt: number; bhtn: number };
  courtFeeNoValue: number;
  courtFeeBusinessNoValue: number;
  legalBasis: string;
  effectiveDate: string;
  lastUpdated: string;
}

export interface LegalAlert {
  id: string;
  source: string;
  documentNumber: string;
  title: string;
  summary: string;
  issueDate: string;
  effectiveDate: string;
  status: 'pending' | 'applied' | 'dismissed';
  suggestedChanges: {
    field: keyof LegalParams | string;
    label: string;
    oldValue: string | number;
    newValue: string | number;
  }[];
}

export const DEFAULT_LEGAL_PARAMS: LegalParams = {
  deductionSelf: 11000000,
  deductionDep: 4400000,
  baseSalary: 2340000,
  bhxhCap: 46800000,
  minWages: { 1: 4960000, 2: 4410000, 3: 3860000, 4: 3450000 },
  rates: { bhxh: 0.08, bhyt: 0.015, bhtn: 0.01 },
  ratesEmployer: { bhxh: 0.175, bhyt: 0.03, bhtn: 0.01 },
  courtFeeNoValue: 300000,
  courtFeeBusinessNoValue: 3000000,
  legalBasis: "Nghị quyết 954/2020/UBTVQH14 & Nghị định 73/2024/NĐ-CP & Nghị định 74/2024/NĐ-CP",
  effectiveDate: "01/07/2024",
  lastUpdated: "29/09/2026",
};

export const MOCK_LEGAL_ALERTS: LegalAlert[] = [
  {
    id: "alert-pit-draft-proposal",
    source: "Cổng Thông Tin Điện Tử Quốc Hội & Bộ Tài Chính",
    documentNumber: "Dự thảo sửa đổi Luật Thuế TNCN (Bộ Tài chính đề xuất)",
    title: "Đề xuất nâng mức giảm trừ gia cảnh lên 15.5 triệu đồng/tháng & điều chỉnh biểu thuế lũy tiến",
    summary: "Bộ Tài chính đang hoàn thiện hồ sơ dự án Luật Thuế TNCN (sửa đổi), đề xuất điều chỉnh mức giảm trừ gia cảnh cho bản thân từ 11 triệu lên 15.5 triệu đồng/tháng và mỗi người phụ thuộc từ 4.4 triệu lên 6.2 triệu đồng/tháng theo biến động CPI, dự kiến trình Quốc hội xem xét.",
    issueDate: "Đang lấy ý kiến",
    effectiveDate: "Dự kiến kỳ họp Quốc hội tới",
    status: "pending",
    suggestedChanges: [
      { field: "deductionSelf", label: "Giảm trừ bản thân", oldValue: "11.000.000 VNĐ", newValue: "15.500.000 VNĐ (Dự thảo)" },
      { field: "deductionDep", label: "Giảm trừ người phụ thuộc", oldValue: "4.400.000 VNĐ", newValue: "6.200.000 VNĐ (Dự thảo)" },
    ]
  },
  {
    id: "alert-salary-region-nd74",
    source: "Cơ Sở Dữ Liệu Quốc Gia VBQPPL (chinhphu.vn)",
    documentNumber: "Nghị định số 74/2024/NĐ-CP",
    title: "Quy định mức lương tối thiểu vùng mới nhất đối với người lao động làm việc theo HĐLĐ",
    summary: "Quy định mức lương tối thiểu vùng theo tháng áp dụng toàn quốc: Vùng I là 4.960.000 đ/tháng, Vùng II là 4.410.000 đ/tháng, Vùng III là 3.860.000 đ/tháng, Vùng IV là 3.450.000 đ/tháng.",
    issueDate: "30/06/2024",
    effectiveDate: "01/07/2024",
    status: "applied",
    suggestedChanges: [
      { field: "minWage1", label: "Lương tối thiểu Vùng I", oldValue: "4.680.000 VNĐ", newValue: "4.960.000 VNĐ" },
      { field: "minWage2", label: "Lương tối thiểu Vùng II", oldValue: "4.160.000 VNĐ", newValue: "4.410.000 VNĐ" },
      { field: "minWage3", label: "Lương tối thiểu Vùng III", oldValue: "3.640.000 VNĐ", newValue: "3.860.000 VNĐ" },
      { field: "minWage4", label: "Lương tối thiểu Vùng IV", oldValue: "3.250.000 VNĐ", newValue: "3.450.000 VNĐ" },
    ]
  },
  {
    id: "alert-base-salary-nd73",
    source: "Bộ Lao Động - Thương Binh & Xã Hội / BHXH Việt Nam",
    documentNumber: "Nghị định số 73/2024/NĐ-CP & Luật BHXH 2024",
    title: "Quy định mức lương cơ sở 2.340.000 VNĐ/tháng và trần đóng BHXH, BHYT tối đa",
    summary: "Quy định mức lương cơ sở là 2.340.000 VNĐ/tháng. Mức đóng BHXH, BHYT tối đa (20 lần mức lương cơ sở) là 46.800.000 VNĐ/tháng.",
    issueDate: "30/06/2024",
    effectiveDate: "01/07/2024",
    status: "applied",
    suggestedChanges: [
      { field: "baseSalary", label: "Mức lương cơ sở hiện hành", oldValue: "1.800.000 VNĐ", newValue: "2.340.000 VNĐ" },
      { field: "bhxhCap", label: "Trần đóng BHXH/BHYT (20 lần)", oldValue: "36.000.000 VNĐ", newValue: "46.800.000 VNĐ" },
    ]
  }
];

const STORAGE_KEY = "ductin_legal_params_v3";
const ALERTS_STORAGE_KEY = "ductin_legal_alerts_v3";

export const legalParamsService = {
  getParams: (): LegalParams => {
    if (typeof window === "undefined") return DEFAULT_LEGAL_PARAMS;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Clean out any stale 15.5m mock data from previous tests
        if (parsed.deductionSelf === 15500000) {
          localStorage.removeItem(STORAGE_KEY);
          return DEFAULT_LEGAL_PARAMS;
        }
        return { ...DEFAULT_LEGAL_PARAMS, ...parsed };
      }
      return DEFAULT_LEGAL_PARAMS;
    } catch {
      return DEFAULT_LEGAL_PARAMS;
    }
  },

  saveParams: (params: Partial<LegalParams>): LegalParams => {
    const current = legalParamsService.getParams();
    const updated = {
      ...current,
      ...params,
      lastUpdated: new Date().toLocaleDateString("vi-VN"),
    };
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        window.dispatchEvent(new Event("legal_params_updated"));
      } catch (e) {
        console.error("Failed to save legal params", e);
      }
    }
    return updated;
  },

  getAlerts: (): LegalAlert[] => {
    if (typeof window === "undefined") return MOCK_LEGAL_ALERTS;
    try {
      const stored = localStorage.getItem(ALERTS_STORAGE_KEY);
      return stored ? JSON.parse(stored) : MOCK_LEGAL_ALERTS;
    } catch {
      return MOCK_LEGAL_ALERTS;
    }
  },

  saveAlerts: (alerts: LegalAlert[]) => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(ALERTS_STORAGE_KEY, JSON.stringify(alerts));
      } catch (e) {
        console.error("Failed to save alerts", e);
      }
    }
  },

  applyAlert: (alertId: string): LegalParams => {
    const alerts = legalParamsService.getAlerts();
    const target = alerts.find(a => a.id === alertId);
    let params = legalParamsService.getParams();

    if (target) {
      if (alertId === "alert-pit-draft-proposal") {
        params = legalParamsService.saveParams({
          deductionSelf: 15500000,
          deductionDep: 6200000,
          legalBasis: `${target.documentNumber} (${target.title})`,
          effectiveDate: target.effectiveDate
        });
      } else if (alertId === "alert-salary-region-nd74") {
        params = legalParamsService.saveParams({
          minWages: { 1: 4960000, 2: 4410000, 3: 3860000, 4: 3450000 },
          legalBasis: `${target.documentNumber} (${target.title})`,
          effectiveDate: target.effectiveDate
        });
      } else if (alertId === "alert-base-salary-nd73") {
        params = legalParamsService.saveParams({
          baseSalary: 2340000,
          bhxhCap: 46800000,
          legalBasis: `${target.documentNumber} (${target.title})`,
          effectiveDate: target.effectiveDate
        });
      }

      const updatedAlerts = alerts.map(a => a.id === alertId ? { ...a, status: 'applied' as const } : a);
      legalParamsService.saveAlerts(updatedAlerts);
    }

    return params;
  }
};
