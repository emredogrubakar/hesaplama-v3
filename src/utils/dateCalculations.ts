export interface DateCalculationResult {
  totalDays: number;
  workDays: number;
  weekendDays: number;
  years: number;
  months: number;
  weeks: number;
  remainingDays: number;
}

export function calculateDaysBetween(startDate: Date, endDate: Date): DateCalculationResult {
  // Tarihleri UTC'ye çevirerek saat farkından kaynaklanan sorunları önle
  const start = new Date(Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDate()));
  const end = new Date(Date.UTC(endDate.getFullYear(), endDate.getMonth(), endDate.getDate()));

  // Toplam gün hesaplama
  const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
  const diffInTime = end.getTime() - start.getTime();
  const totalDays = Math.round(Math.abs(diffInTime / oneDayInMilliseconds));

  // İş günü ve hafta sonu hesaplama
  let workDays = 0;
  let weekendDays = 0;
  const currentDate = new Date(Math.min(start.getTime(), end.getTime()));
  const lastDate = new Date(Math.max(start.getTime(), end.getTime()));

  while (currentDate <= lastDate) {
    const dayOfWeek = currentDate.getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      weekendDays++;
    } else {
      workDays++;
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }

  // Yıl, ay, hafta hesaplama
  const years = Math.floor(totalDays / 365);
  const remainingDaysAfterYears = totalDays % 365;
  const months = Math.floor(remainingDaysAfterYears / 30);
  const remainingDaysAfterMonths = remainingDaysAfterYears % 30;
  const weeks = Math.floor(remainingDaysAfterMonths / 7);
  const remainingDays = remainingDaysAfterMonths % 7;

  return {
    totalDays,
    workDays,
    weekendDays,
    years,
    months,
    weeks,
    remainingDays
  };
}