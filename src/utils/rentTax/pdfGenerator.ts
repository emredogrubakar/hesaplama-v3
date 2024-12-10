import jsPDF from 'jspdf';
import { formatNumber } from '../formatters';
import type { RentTaxResult } from '../../types/rentTax';

export const generatePDF = (result: RentTaxResult) => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
    putOnlyUsedFonts: true,
    floatPrecision: 16
  });

  // Türkçe font desteği için
  doc.addFont('https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Me5Q.ttf', 'Roboto', 'normal');
  doc.setFont('Roboto');
  
  // Header bölümü
  doc.setFillColor(79, 70, 229);
  doc.rect(0, 0, 210, 40, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.text('Kira Geliri Vergisi Raporu', 20, 25);
  
  // Tarih
  doc.setTextColor(51, 51, 51);
  doc.setFontSize(11);
  const tarih = new Date().toLocaleDateString('tr-TR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  doc.text(`Oluşturma Tarihi: ${tarih}`, 20, 50);
  
  // Ana içerik
  const startY = 70;
  const boxHeight = 25;
  const margin = 20;
  const width = 170;
  
  // Kira geliri kutusu
  doc.setFillColor(249, 250, 251);
  doc.rect(margin, startY, width, boxHeight, 'F');
  doc.setFontSize(12);
  doc.setTextColor(107, 114, 128);
  doc.text('Yıllık Kira Geliri', margin + 10, startY + 8);
  doc.setFontSize(14);
  doc.setTextColor(17, 24, 39);
  doc.text(`${formatNumber(result.yearlyRentIncome)} TL`, margin + 10, startY + 20);
  
  // Gider tutarı kutusu
  const secondBoxY = startY + boxHeight + 10;
  doc.setFillColor(249, 250, 251);
  doc.rect(margin, secondBoxY, width, boxHeight, 'F');
  doc.setFontSize(12);
  doc.setTextColor(107, 114, 128);
  doc.text('Gider Tutarı', margin + 10, secondBoxY + 8);
  doc.setFontSize(14);
  doc.setTextColor(17, 24, 39);
  doc.text(`${formatNumber(result.expenseAmount)} TL`, margin + 10, secondBoxY + 20);
  
  // Vergi matrahı kutusu
  const thirdBoxY = secondBoxY + boxHeight + 10;
  doc.setFillColor(249, 250, 251);
  doc.rect(margin, thirdBoxY, width, boxHeight, 'F');
  doc.setFontSize(12);
  doc.setTextColor(107,  114, 128);
  doc.text('Vergi Matrahı', margin + 10, thirdBoxY + 8);
  doc.setFontSize(14);
  doc.setTextColor(17, 24, 39);
  doc.text(`${formatNumber(result.taxableIncome)} TL`, margin + 10, thirdBoxY + 20);
  
  // Vergi tutarı kutusu
  const fourthBoxY = thirdBoxY + boxHeight + 10;
  doc.setFillColor(238, 242, 255);
  doc.rect(margin, fourthBoxY, width, boxHeight, 'F');
  doc.setFontSize(12);
  doc.setTextColor(79, 70, 229);
  doc.text('Ödenecek Vergi Tutarı', margin + 10, fourthBoxY + 8);
  doc.setFontSize(14);
  doc.text(`${formatNumber(result.taxAmount)} TL`, margin + 10, fourthBoxY + 20);
  
  // Efektif oran kutusu
  const fifthBoxY = fourthBoxY + boxHeight + 10;
  doc.setFillColor(238, 242, 255);
  doc.rect(margin, fifthBoxY, width, boxHeight, 'F');
  doc.setFontSize(12);
  doc.text('Efektif Vergi Oranı', margin + 10, fifthBoxY + 8);
  doc.setFontSize(14);
  doc.text(`%${result.effectiveTaxRate.toFixed(2)}`, margin + 10, fifthBoxY + 20);
  
  // Bilgi notu
  const noteY = fifthBoxY + boxHeight + 20;
  doc.setFillColor(255, 251, 235);
  doc.rect(margin, noteY, width, 30, 'F');
  doc.setFontSize(10);
  doc.setTextColor(146, 64, 14);
  doc.text('Önemli Not:', margin + 10, noteY + 8);
  doc.setTextColor(180, 83, 9);
  doc.text('Bu rapor bilgilendirme amaçlıdır. Kesin sonuçlar için lütfen', margin + 10, noteY + 18);
  doc.text('mali müşavirinize danışınız.', margin + 10, noteY + 26);
  
  // Footer
  const footerY = 270;
  doc.setFontSize(8);
  doc.setTextColor(156, 163, 175);
  doc.text('© 2024 Kira Geliri Vergisi Hesaplama Aracı', margin, footerY);
  
  doc.save('kira-geliri-vergisi-raporu.pdf');
}