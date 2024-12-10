export interface InstallmentCalculation {
  originalAmount: number;
  currentInstallments: number;
  newInstallments: number;
  currentMonthlyPayment: number;
  newMonthlyPayment: number;
  totalAmount: number;
  interestRate: number;
  totalInterest: number;
  additionalInstallments: number;
  bsmvAmount: number;
  kkdfAmount: number;
  monthlyEffectiveRate: number;
  yearlyEffectiveRate: number;
}

export interface InstallmentOption {
  months: number;
  interestRate: number;
}