import type { TaxBracket } from '../../types/rentTax';

export const TAX_BRACKETS_2024: TaxBracket[] = [
  { limit: 110000, rate: 0.15, baseAmount: 0 },
  { limit: 230000, rate: 0.20, baseAmount: 16500 },
  { limit: 580000, rate: 0.27, baseAmount: 40500 },
  { limit: 3000000, rate: 0.35, baseAmount: 135000 },
  { limit: Infinity, rate: 0.40, baseAmount: 982000 }
];

export const EXEMPTION_AMOUNT_2024 = 33000;
export const GOTURU_EXPENSE_RATE = 0.15;
export const DAMGA_VERGISI_2024 = 467.20; // Fixed stamp tax amount