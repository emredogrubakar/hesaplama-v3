import type { InstallmentCalculation, InstallmentOption } from '../../types/creditCard';

export const INSTALLMENT_OPTIONS: InstallmentOption[] = [
  { months: 2, interestRate: 4.25 },
  { months: 3, interestRate: 4.25 },
  { months: 4, interestRate: 4.25 },
  { months: 6, interestRate: 4.25 },
  { months: 9, interestRate: 4.25 },
  { months: 12, interestRate: 4.25 }
];

const BSMV_RATE = 0.15; // %15
const KKDF_RATE = 0.15; // %15

export function calculateAdditionalInstallments(
  amount: number, 
  currentInstallments: number,
  newInstallments: number
): InstallmentCalculation {
  // 1. Ek vade süresini hesapla
  const additionalMonths = newInstallments - currentInstallments;

  // 2. Mevcut aylık taksit tutarını hesapla
  const currentMonthlyPayment = amount / currentInstallments;

  // 3. Ana faizi hesapla (Kalan Borç × Faiz Oranı × Ek Vade Süresi)
  const interestRate = 0.0425; // %4.25
  const baseInterest = amount * interestRate * (additionalMonths / 12);

  // 4. BSMV ve KKDF hesapla
  const bsmvAmount = baseInterest * BSMV_RATE;
  const kkdfAmount = baseInterest * KKDF_RATE;

  // 5. Toplam faiz tutarını hesapla
  const totalInterest = baseInterest + bsmvAmount + kkdfAmount;

  // 6. Yeni toplam borcu hesapla
  const totalAmount = amount + totalInterest;

  // 7. Yeni aylık taksiti hesapla
  const newMonthlyPayment = totalAmount / newInstallments;

  // Efektif oranlar
  const monthlyEffectiveRate = ((totalAmount / amount - 1) / additionalMonths) * 100;
  const yearlyEffectiveRate = monthlyEffectiveRate * 12;

  return {
    originalAmount: amount,
    currentInstallments,
    newInstallments,
    currentMonthlyPayment: Number(currentMonthlyPayment.toFixed(2)),
    newMonthlyPayment: Number(newMonthlyPayment.toFixed(2)),
    totalAmount: Number(totalAmount.toFixed(2)),
    interestRate: 4.25,
    totalInterest: Number(totalInterest.toFixed(2)),
    additionalInstallments: additionalMonths,
    bsmvAmount: Number(bsmvAmount.toFixed(2)),
    kkdfAmount: Number(kkdfAmount.toFixed(2)),
    monthlyEffectiveRate: Number(monthlyEffectiveRate.toFixed(4)),
    yearlyEffectiveRate: Number(yearlyEffectiveRate.toFixed(4))
  };
}