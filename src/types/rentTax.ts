export interface TaxBracket {
  limit: number;
  rate: number;
  baseAmount: number;
}

export interface RentTaxInput {
  yearlyRentIncome: string;
  hasExpenses: boolean;
  expenseType: 'goturu' | 'gercek';
  realExpenseAmount: string;
  isNewlyStarted: boolean;
  monthCount: number;
  taxYear: string;
  incomeType: string;
  hasExemption: boolean;
  otherIncome: string;
  willDeclareOtherIncome: boolean;
  lossFromPreviousPeriod: string;
  donations: string;
}

export interface RentTaxResult {
  yearlyRentIncome: number;
  taxableIncome: number;
  expenseAmount: number;
  taxAmount: number;
  effectiveTaxRate: number;
  expenseType: 'goturu' | 'gercek';
  monthCount: number;
  exemptionAmount: number;
  otherIncome: number;
  totalDeductions: number;
  damgaVergisi: number;
  totalTaxAmount: number;
  taxBrackets: TaxBracket[];
  beyannameDonemi: string;
}