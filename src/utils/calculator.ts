// LAW CONSTANTS & DYNAMIC PARAMETER GETTER
import { legalParamsService, DEFAULT_LEGAL_PARAMS } from "@/services/legal-params.service";

export const MIN_WAGE: Record<number, number> = DEFAULT_LEGAL_PARAMS.minWages;
export const BASE_SALARY = DEFAULT_LEGAL_PARAMS.baseSalary;
export const BHXH_CAP = DEFAULT_LEGAL_PARAMS.bhxhCap;
export const RATES = DEFAULT_LEGAL_PARAMS.rates;
export const DEDUCTION_SELF = DEFAULT_LEGAL_PARAMS.deductionSelf;
export const DEDUCTION_DEP = DEFAULT_LEGAL_PARAMS.deductionDep;

export function getLegalParams() {
  return legalParamsService.getParams();
}

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

  const params = getLegalParams();
  // Án phí không có giá ngạch
  const noValueFee = (caseType === 'kinh-doanh') ? params.courtFeeBusinessNoValue : params.courtFeeNoValue;
  if (value <= 0) return { fee: noValueFee, deposit: noValueFee };

  // Bậc thang án phí có giá ngạch (NQ 326 Điều 24)
  let fee = 0;
  if (value <= 6000000) {
    fee = params.courtFeeNoValue;
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
