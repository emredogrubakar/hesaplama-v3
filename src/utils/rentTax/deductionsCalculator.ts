import { EXEMPTION_AMOUNT_2024, GOTURU_EXPENSE_RATE } from './taxBrackets';

interface DeductionsInput {
  yearlyRentIncome: number;
  expenseType: 'goturu' | 'gercek';
  realExpenseAmount: number;
  hasExemption: boolean;
  incomeType: string;
}

export function calculateDeductions(input: DeductionsInput) {
  // Calculate exemption with proper conditions
  const exemptionAmount = input.hasExemption && input.incomeType === 'konut' 
    ? Math.min(EXEMPTION_AMOUNT_2024, input.yearlyRentIncome)
    : 0;

  // Calculate expenses with 2 decimal precision
  const expenseAmount = input.expenseType === 'goturu'
    ? Number((Math.min(input.yearlyRentIncome * GOTURU_EXPENSE_RATE, 67050)).toFixed(2))
    : Number(input.realExpenseAmount.toFixed(2));

  return {
    exemptionAmount: Number(exemptionAmount.toFixed(2)),
    expenseAmount
  };
}