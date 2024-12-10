import { TAX_BRACKETS_2024 } from './constants';

export function calculateTaxByBrackets(taxableIncome: number): number {
  let remainingIncome = taxableIncome;
  let totalTax = 0;

  for (let i = 0; i < TAX_BRACKETS_2024.length; i++) {
    const bracket = TAX_BRACKETS_2024[i];
    const prevLimit = i === 0 ? 0 : TAX_BRACKETS_2024[i - 1].limit;
    
    if (taxableIncome <= prevLimit) continue;
    
    const taxableInBracket = Math.min(
      remainingIncome,
      bracket.limit - prevLimit
    );
    
    if (taxableInBracket <= 0) break;
    
    const bracketTax = taxableInBracket * bracket.rate;
    totalTax += bracketTax;
    remainingIncome -= taxableInBracket;
    
    if (remainingIncome <= 0) break;
  }

  // Kuruş hassasiyeti için yuvarlama yapmadan 2 decimal noktasında kes
  return Number(totalTax.toFixed(2));
}