import type { RentTaxInput, RentTaxResult } from '../../types/rentTax';
import { parseCurrency } from '../formatters';
import { calculateTaxByBrackets } from './taxCalculator';
import { calculateDeductions } from './deductionsCalculator';
import { TAX_BRACKETS_2024, DAMGA_VERGISI_2024 } from './taxBrackets';

export function calculateRentTax(input: RentTaxInput): RentTaxResult {
  // Parse input values with decimal precision
  const yearlyRentIncome = parseCurrency(input.yearlyRentIncome);
  const realExpenseAmount = parseCurrency(input.realExpenseAmount || '0');
  const otherIncome = parseCurrency(input.otherIncome || '0');
  const lossFromPreviousPeriod = parseCurrency(input.lossFromPreviousPeriod || '0');
  const donations = parseCurrency(input.donations || '0');

  // Calculate deductions
  const { exemptionAmount, expenseAmount } = calculateDeductions({
    yearlyRentIncome,
    expenseType: input.expenseType,
    realExpenseAmount,
    hasExemption: input.hasExemption && yearlyRentIncome <= 550000,
    incomeType: input.incomeType
  });

  // Calculate total deductions with 2 decimal precision
  const totalDeductions = Number((expenseAmount + lossFromPreviousPeriod + donations).toFixed(2));

  // Calculate taxable income
  const taxableIncome = Math.max(0, yearlyRentIncome - exemptionAmount - totalDeductions);

  // Calculate tax using progressive brackets
  const taxAmount = calculateTaxByBrackets(taxableIncome);

  // Calculate total tax amount including damga vergisi with 2 decimal precision
  const totalTaxAmount = Number((taxAmount + DAMGA_VERGISI_2024).toFixed(2));

  // Calculate effective tax rate with 2 decimal precision
  const effectiveTaxRate = Number(((taxAmount / yearlyRentIncome) * 100).toFixed(2));

  return {
    yearlyRentIncome,
    taxableIncome,
    expenseAmount,
    taxAmount,
    effectiveTaxRate,
    expenseType: input.expenseType,
    monthCount: input.monthCount,
    exemptionAmount,
    otherIncome,
    totalDeductions,
    damgaVergisi: DAMGA_VERGISI_2024,
    totalTaxAmount,
    taxBrackets: TAX_BRACKETS_2024,
    beyannameDonemi: '1 - 31 Mart 2025'
  };
}