// LAW CONSTANTS — CẬP NHẬT 31/07/2026
// NĐ 293/2025/NĐ-CP: Lương tối thiểu vùng 2026 (hiệu lực 01/01/2026)
// NĐ 161/2026/NĐ-CP: Lương cơ sở từ 01/07/2026 = 2.530.000đ
// Luật BHXH 2024: Trần BHXH = 20 × lương cơ sở (hiệu lực 01/07/2025)
// NQ 954/2020 + NQ mới 2026: Giảm trừ gia cảnh
// NQ 326/2016/UBTVQH14: Án phí (hiệu lực đến nay)

export const MIN_WAGE: Record<number, number> = { 1: 5310000, 2: 4730000, 3: 4140000, 4: 3700000 };
export const BASE_SALARY = 2530000; // Lương cơ sở từ 01/07/2026
export const BHXH_CAP = BASE_SALARY * 20; // 50.600.000 — trần BHXH/BHYT
export const RATES = { bhxh: 0.08, bhyt: 0.015, bhtn: 0.01 };
export const DEDUCTION_SELF = 15500000; // Giảm trừ bản thân 2026
export const DEDUCTION_DEP = 6200000;  // Giảm trừ người phụ thuộc 2026

export const PIT_BRACKETS = [
  { limit: 5000000, rate: 0.05, cumTax: 0 },
  { limit: 10000000, rate: 0.10, cumTax: 250000 },
  { limit: 18000000, rate: 0.15, cumTax: 750000 },
  { limit: 32000000, rate: 0.20, cumTax: 1950000 },
  { limit: 52000000, rate: 0.25, cumTax: 4750000 },
  { limit: 80000000, rate: 0.30, cumTax: 9750000 },
  { limit: Infinity, rate: 0.35, cumTax: 18150000 }
];

export function calcPIT(taxableIncome: number): number {
  if (taxableIncome <= 0) return 0;
  for (let i = 0; i < PIT_BRACKETS.length; i++) {
    const b = PIT_BRACKETS[i];
    if (taxableIncome <= b.limit) {
      const prevLimit = i === 0 ? 0 : (PIT_BRACKETS[i - 1].limit === Infinity ? 80000000 : PIT_BRACKETS[i - 1].limit);
      return b.cumTax + (taxableIncome - prevLimit) * b.rate;
    }
  }
  return 0;
}

export function calcCourtFee(value: number, caseType: string, isExempt: boolean): { fee: number, deposit: number } {
  if (isExempt) return { fee: 0, deposit: 0 };

  // Án phí không có giá ngạch
  const noValueFee = (caseType === 'kinh-doanh') ? 3000000 : 300000;
  if (value <= 0) return { fee: noValueFee, deposit: noValueFee };

  // Bậc thang án phí có giá ngạch (NQ 326 Điều 24)
  let fee = 0;
  if (value <= 6000000) {
    fee = 300000;
  } else if (value <= 400000000) {
    fee = value * 0.05;
  } else if (value <= 800000000) {
    fee = 20000000 + (value - 400000000) * 0.04;
  } else if (value <= 2000000000) {
    fee = 36000000 + (value - 800000000) * 0.03;
  } else if (value <= 4000000000) {
    fee = 72000000 + (value - 2000000000) * 0.02;
  } else {
    fee = 112000000 + (value - 4000000000) * 0.001;
  }

  const deposit = Math.round(fee * 0.5);
  return { fee: Math.round(fee), deposit };
}
