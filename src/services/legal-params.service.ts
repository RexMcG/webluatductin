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
  deductionSelf: 15500000,
  deductionDep: 6200000,
  baseSalary: 2530000,
  bhxhCap: 50600000,
  minWages: { 1: 5310000, 2: 4730000, 3: 4140000, 4: 3700000 },
  rates: { bhxh: 0.08, bhyt: 0.015, bhtn: 0.01 },
  ratesEmployer: { bhxh: 0.175, bhyt: 0.03, bhtn: 0.01 },
  courtFeeNoValue: 300000,
  courtFeeBusinessNoValue: 3000000,
  legalBasis: "Nghị định 293/2025/NĐ-CP & Nghị định 161/2026/NĐ-CP & Nghị quyết 326/2016/UBTVQH14",
  effectiveDate: "01/07/2026",
  lastUpdated: "28/08/2026",
};

export const MOCK_LEGAL_ALERTS: LegalAlert[] = [
  {
    id: "alert-pit-2026",
    source: "Cổng Thông Tin Điện Tử Quốc Hội & Bộ Tài Chính",
    documentNumber: "Nghị quyết số 142/2026/UBTVQH15",
    title: "Điều chỉnh mức giảm trừ gia cảnh thuế TNCN áp dụng từ kỳ tính thuế 2026",
    summary: "Nâng mức giảm trừ cho bản thân người nộp thuế lên 15.5 triệu đồng/tháng (186 triệu/năm) và mỗi người phụ thuộc lên 6.2 triệu đồng/tháng.",
    issueDate: "20/06/2026",
    effectiveDate: "01/07/2026",
    status: "applied",
    suggestedChanges: [
      { field: "deductionSelf", label: "Giảm trừ bản thân", oldValue: "11.000.000 VNĐ", newValue: "15.500.000 VNĐ" },
      { field: "deductionDep", label: "Giảm trừ người phụ thuộc", oldValue: "4.400.000 VNĐ", newValue: "6.200.000 VNĐ" },
    ]
  },
  {
    id: "alert-salary-region-2026",
    source: "Cơ Sở Dữ Liệu Quốc Gia VBQPPL (chinhphu.vn)",
    documentNumber: "Nghị định số 293/2025/NĐ-CP",
    title: "Quy định mức lương tối thiểu vùng đối với người lao động làm việc theo HĐLĐ",
    summary: "Tăng mức lương tối thiểu vùng thêm trung bình 6% áp dụng cho cả 4 vùng kinh tế trên toàn quốc.",
    issueDate: "15/11/2025",
    effectiveDate: "01/01/2026",
    status: "applied",
    suggestedChanges: [
      { field: "minWage1", label: "Lương tối thiểu Vùng I", oldValue: "4.960.000 VNĐ", newValue: "5.310.000 VNĐ" },
      { field: "minWage2", label: "Lương tối thiểu Vùng II", oldValue: "4.410.000 VNĐ", newValue: "4.730.000 VNĐ" },
      { field: "minWage3", label: "Lương tối thiểu Vùng III", oldValue: "3.860.000 VNĐ", newValue: "4.140.000 VNĐ" },
      { field: "minWage4", label: "Lương tối thiểu Vùng IV", oldValue: "3.450.000 VNĐ", newValue: "3.700.000 VNĐ" },
    ]
  },
  {
    id: "alert-base-salary-2026",
    source: "Bộ Lao Động - Thương Binh & Xã Hội / BHXH Việt Nam",
    documentNumber: "Nghị định số 161/2026/NĐ-CP",
    title: "Quy định mức lương cơ sở đối với cán bộ, công chức và mức đóng trần BHXH",
    summary: "Điều chỉnh mức lương cơ sở lên 2.530.000 VNĐ/tháng. Mức đóng BHXH tối đa (20 lần) được điều chỉnh lên 50.600.000 VNĐ/tháng.",
    issueDate: "25/05/2026",
    effectiveDate: "01/07/2026",
    status: "applied",
    suggestedChanges: [
      { field: "baseSalary", label: "Mức lương cơ sở / tham chiếu", oldValue: "2.340.000 VNĐ", newValue: "2.530.000 VNĐ" },
      { field: "bhxhCap", label: "Trần đóng BHXH (20 lần)", oldValue: "46.800.000 VNĐ", newValue: "50.600.000 VNĐ" },
    ]
  }
];

const STORAGE_KEY = "ductin_legal_params";
const ALERTS_STORAGE_KEY = "ductin_legal_alerts";

export const legalParamsService = {
  getParams: (): LegalParams => {
    if (typeof window === "undefined") return DEFAULT_LEGAL_PARAMS;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? { ...DEFAULT_LEGAL_PARAMS, ...JSON.parse(stored) } : DEFAULT_LEGAL_PARAMS;
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
      if (alertId === "alert-pit-2026") {
        params = legalParamsService.saveParams({
          deductionSelf: 15500000,
          deductionDep: 6200000,
          legalBasis: `${target.documentNumber} (${target.title})`,
          effectiveDate: target.effectiveDate
        });
      } else if (alertId === "alert-salary-region-2026") {
        params = legalParamsService.saveParams({
          minWages: { 1: 5310000, 2: 4730000, 3: 4140000, 4: 3700000 },
          legalBasis: `${target.documentNumber} (${target.title})`,
          effectiveDate: target.effectiveDate
        });
      } else if (alertId === "alert-base-salary-2026") {
        params = legalParamsService.saveParams({
          baseSalary: 2530000,
          bhxhCap: 50600000,
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
