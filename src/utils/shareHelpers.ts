import { formatNumber } from './formatters';

interface VeriHesaplama {
  vergiMatrahi: number;
  vergiOrani: number;
  vergiTutari: number;
}

export const generateWhatsAppMessage = (data: VeriHesaplama): string => {
  const aylikTutar = data.vergiTutari / 12;
  
  return `*Kurumlar Vergisi Hesaplama Sonucu*\n\n` +
    `• *Vergi Matrahı:* ${formatNumber(data.vergiMatrahi)} TL\n` +
    `• *Vergi Oranı:* %${data.vergiOrani}\n` +
    `• *Vergi Tutarı:* ${formatNumber(data.vergiTutari)} TL\n` +
    `• *Aylık Ödeme:* ${formatNumber(aylikTutar)} TL\n\n` +
    `Not: Bu hesaplama bilgilendirme amaçlıdır. Kesin sonuçlar için mali müşavirinize danışınız.`;
};

export const generateEmailContent = (data: VeriHesaplama): { subject: string; body: string } => {
  const aylikTutar = data.vergiTutari / 12;
  
  const subject = 'Kurumlar Vergisi Hesaplama Sonucu';
  const body = `Kurumlar Vergisi Hesaplama Sonucu\n\n` +
    `• Vergi Matrahı: ${formatNumber(data.vergiMatrahi)} TL\n` +
    `• Vergi Oranı: %${data.vergiOrani}\n` +
    `• Vergi Tutarı: ${formatNumber(data.vergiTutari)} TL\n` +
    `• Aylık Ödeme: ${formatNumber(aylikTutar)} TL\n\n` +
    `Not: Bu hesaplama bilgilendirme amaçlıdır. Kesin sonuçlar için mali müşavirinize danışınız.`;

  return { subject, body };
};