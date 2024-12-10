import { MonthCalculationResult } from './monthCalculations';

export const generateMonthWhatsAppMessage = (result: {
  totalMonths: number;
  exactYears: number;
  exactMonths: number;
  startDate: string;
  endDate: string;
}): string => {
  const formatDate = (dateStr: string) => {
    const [day, month, year] = dateStr.split('.');
    const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    return date.toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };
  
  let message = `*İki Tarih Arası Ay Hesaplama Sonucu*\n\n`;
  message += `📅 *Tarih Aralığı:*\n`;
  message += `${formatDate(result.startDate)} - ${formatDate(result.endDate)}\n\n`;
  message += `⏱️ *Toplam Süre:* ${result.totalMonths.toLocaleString('tr-TR')} ay\n\n`;
  
  message += `📊 *Detaylı Süre:*\n`;
  if (result.exactYears > 0) {
    message += `• ${result.exactYears.toLocaleString('tr-TR')} yıl\n`;
  }
  if (result.exactMonths > 0) {
    message += `• ${result.exactMonths.toLocaleString('tr-TR')} ay\n`;
  }

  return message;
}