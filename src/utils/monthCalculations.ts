import { DateCalculationResult } from './dateCalculations';

export interface MonthCalculationResult extends Omit<DateCalculationResult, 'workDays' | 'weekendDays' | 'weeks'> {
  totalMonths: number;
  exactYears: number;
  exactMonths: number;
}

export function calculateMonthsBetween(startDate: Date, endDate: Date): MonthCalculationResult {
  const start = new Date(Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDate()));
  const end = new Date(Date.UTC(endDate.getFullYear(), endDate.getMonth(), endDate.getDate()));

  // Toplam gün hesaplama
  const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
  const diffInTime = end.getTime() - start.getTime();
  const totalDays = Math.round(Math.abs(diffInTime / oneDayInMilliseconds));

  // Ay hesaplama
  const monthDiff = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
  const totalMonths = Math.abs(monthDiff);

  // Tam yıl ve ay hesaplama
  const exactYears = Math.floor(totalMonths / 12);
  const exactMonths = totalMonths % 12;

  // Yıl ve kalan gün hesaplama (DateCalculationResult uyumluluğu için)
  const years = Math.floor(totalDays / 365);
  const remainingDaysAfterYears = totalDays % 365;
  const months = Math.floor(remainingDaysAfterYears / 30);
  const remainingDays = remainingDaysAfterYears % 30;

  return {
    totalDays,
    totalMonths,
    exactYears,
    exactMonths,
    years,
    months,
    remainingDays
  };
}