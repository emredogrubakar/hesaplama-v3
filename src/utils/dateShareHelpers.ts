export const generateDateWhatsAppMessage = (result: {
  totalDays: number;
  workDays: number;
  weekendDays: number;
  years: number;
  months: number;
  weeks: number;
  remainingDays: number;
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
  
  let message = `*İki Tarih Arası Hesaplama Sonucu*\n\n`;
  message += `📅 *Tarih Aralığı:*\n`;
  message += `${formatDate(result.startDate)} - ${formatDate(result.endDate)}\n\n`;
  message += `⏱️ *Toplam Süre:* ${result.totalDays.toLocaleString('tr-TR')} gün\n\n`;
  
  message += `📊 *Detaylı Bilgiler:*\n`;
  message += `• İş Günü: ${result.workDays.toLocaleString('tr-TR')} gün\n`;
  message += `• Hafta Sonu: ${result.weekendDays.toLocaleString('tr-TR')} gün\n\n`;
  
  if (result.years > 0 || result.months > 0 || result.weeks > 0 || result.remainingDays > 0) {
    message += `🗓️ *Detaylı Süre:*\n`;
    if (result.years > 0) message += `• ${result.years} yıl\n`;
    if (result.months > 0) message += `• ${result.months} ay\n`;
    if (result.weeks > 0) message += `• ${result.weeks} hafta\n`;
    if (result.remainingDays > 0) message += `• ${result.remainingDays} gün\n`;
  }

  return message;
}