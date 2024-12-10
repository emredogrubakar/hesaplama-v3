import { TAX_BRACKETS_2024 } from './taxBrackets';

export function calculateTaxByBrackets(taxableIncome: number): number {
  let totalTax = 0;

  // First bracket (0-110,000): 15%
  const firstBracketAmount = Math.min(taxableIncome, 110000);
  totalTax += Number((firstBracketAmount * 0.15).toFixed(2));
  
  // Second bracket (110,000-230,000): 20%
  if (taxableIncome > 110000) {
    const secondBracketAmount = Math.min(taxableIncome - 110000, 120000);
    totalTax += Number((secondBracketAmount * 0.20).toFixed(2));
  }

  // Third bracket (230,000-580,000): 27%
  if (taxableIncome > 230000) {
    const thirdBracketAmount = Math.min(taxableIncome - 230000, 350000);
    totalTax += Number((thirdBracketAmount * 0.27).toFixed(2));
  }

  // Fourth bracket (580,000-3,000,000): 35%
  if (taxableIncome > 580000) {
    const fourthBracketAmount = Math.min(taxableIncome - 580000, 2420000);
    totalTax += Number((fourthBracketAmount * 0.35).toFixed(2));
  }

  // Fifth bracket (3,000,000+): 40%
  if (taxableIncome > 3000000) {
    const fifthBracketAmount = taxableIncome - 3000000;
    totalTax += Number((fifthBracketAmount * 0.40).toFixed(2));
  }

  return Number(totalTax.toFixed(2));
}