import { formatNumber } from '../formatters';
import type { RentTaxResult } from '../../types/rentTax';

export const generateWhatsAppMessage = (result: RentTaxResult): string => {
  return `*Kira Geliri Vergisi Hesaplama Sonucu*\n\n` +
    `• *Yıllık Kira Geliri:* ${formatNumber(result.yearlyRentIncome)} TL\n` +
    `• *Gider Tutarı:* ${formatNumber(result.expenseAmount)} TL\n` +
    `• *Vergi Matrahı:* ${formatNumber(result.taxableIncome)} TL\n` +
    `• *Ödenecek Vergi:* ${formatNumber(result.taxAmount)} TL\n` +
    `• *Efektif Vergi Oranı:* %${result.effectiveTaxRate.toFixed(2)}\n\n` +
    `Not: Bu hesaplama bilgilendirme amaçlıdır. Kesin sonuçlar için mali müşavirinize danışınız.`;
};

export const generateEmailContent = (result: RentTaxResult): { subject: string; body: string } => {
  const subject = 'Kira Geliri Vergisi Hesaplama Sonucu';
  const body = `Kira Geliri Vergisi Hesaplama Sonucu\n\n` +
    `• Yıllık Kira Geliri: ${formatNumber(result.yearlyRentIncome)} TL\n` +
    `• Gider Tutarı: ${formatNumber(result.expenseAmount)} TL\n` +
    `• Vergi Matrahı: ${formatNumber(result.taxableIncome)} TL\n` +
    `• Ödenecek Vergi: ${formatNumber(result.taxAmount)} TL\n` +
    `• Efektif Vergi Oranı: %${result.effectiveTaxRate.toFixed(2)}\n\n` +
    `Not: Bu hesaplama bilgilendirme amaçlıdır. Kesin sonuçlar için mali müşavirinize danışınız.`;

  return { subject, body };
};