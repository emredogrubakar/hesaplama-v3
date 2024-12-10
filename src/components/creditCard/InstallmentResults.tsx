import React, { useState } from 'react';
import { FileDown, Share2, Mail, Info, Copy, Check } from 'lucide-react';
import { formatNumber } from '../../utils/formatters';
import type { InstallmentCalculation } from '../../types/creditCard';

interface InstallmentResultsProps {
  result: InstallmentCalculation;
}

export function InstallmentResults({ result }: InstallmentResultsProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const text = `Kredi Kartı Ek Taksit Hesaplama Sonucu\n\n` +
      `İşlem Tutarı: ${formatNumber(result.originalAmount)} TL\n` +
      `Mevcut Taksit: ${result.currentInstallments} ay\n` +
      `Yeni Taksit: ${result.newInstallments} ay\n` +
      `Yeni Aylık Taksit: ${formatNumber(result.newMonthlyPayment)} TL\n` +
      `Toplam Geri Ödeme: ${formatNumber(result.totalAmount)} TL`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsAppShare = () => {
    const text = `*Kredi Kartı Ek Taksit Hesaplama Sonucu*\n\n` +
      `💳 *İşlem Tutarı:* ${formatNumber(result.originalAmount)} TL\n` +
      `📅 *Mevcut Taksit:* ${result.currentInstallments} ay\n` +
      `📅 *Yeni Taksit:* ${result.newInstallments} ay\n` +
      `💰 *Yeni Aylık Taksit:* ${formatNumber(result.newMonthlyPayment)} TL\n` +
      `💰 *Toplam Geri Ödeme:* ${formatNumber(result.totalAmount)} TL`;

    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleEmailShare = () => {
    const subject = 'Kredi Kartı Ek Taksit Hesaplama Sonucu';
    const body = `Kredi Kartı Ek Taksit Hesaplama Sonucu\n\n` +
      `İşlem Tutarı: ${formatNumber(result.originalAmount)} TL\n` +
      `Mevcut Taksit: ${result.currentInstallments} ay\n` +
      `Yeni Taksit: ${result.newInstallments} ay\n` +
      `Yeni Aylık Taksit: ${formatNumber(result.newMonthlyPayment)} TL\n` +
      `Toplam Geri Ödeme: ${formatNumber(result.totalAmount)} TL`;

    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="mt-8 space-y-8 animate-fade-in">
      {/* Ana Sonuçlar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-indigo-50 p-6 rounded-lg">
          <h3 className="text-sm font-medium text-indigo-900 mb-1">
            Yeni Aylık Taksit Tutarı
          </h3>
          <p className="text-2xl font-semibold text-indigo-900 animate-number">
            {formatNumber(result.newMonthlyPayment)} TL
          </p>
          <p className="text-sm text-indigo-700 mt-1">
            Mevcut: {formatNumber(result.currentMonthlyPayment)} TL
          </p>
        </div>

        <div className="bg-indigo-50 p-6 rounded-lg">
          <h3 className="text-sm font-medium text-indigo-900 mb-1">
            Toplam Geri Ödeme
          </h3>
          <p className="text-2xl font-semibold text-indigo-900 animate-number">
            {formatNumber(result.totalAmount)} TL
          </p>
          <p className="text-sm text-indigo-700 mt-1">
            Fark: {formatNumber(result.totalAmount - result.originalAmount)} TL
          </p>
        </div>
      </div>

      {/* Detaylı Sonuçlar */}
      <div className="bg-white p-6 rounded-lg border border-gray-100">
        <h4 className="font-medium text-gray-900 mb-4">Hesaplama Detayları</h4>
        
        <div className="space-y-3 text-sm">
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-gray-600">İşlem Tutarı:</span>
            <span className="font-medium text-gray-900">{formatNumber(result.originalAmount)} TL</span>
          </div>

          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-gray-600">Mevcut Taksit Sayısı:</span>
            <span className="font-medium text-gray-900">{result.currentInstallments} ay</span>
          </div>

          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-gray-600">Yeni Taksit Sayısı:</span>
            <span className="font-medium text-gray-900">{result.newInstallments} ay</span>
          </div>

          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-gray-600">Faiz Oranı:</span>
            <span className="font-medium text-gray-900">%{result.interestRate}</span>
          </div>

          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-gray-600">Toplam Faiz Tutarı:</span>
            <span className="font-medium text-gray-900">{formatNumber(result.totalInterest)} TL</span>
          </div>

          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-gray-600">BSMV (%15):</span>
            <span className="font-medium text-gray-900">{formatNumber(result.bsmvAmount)} TL</span>
          </div>

          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-gray-600">KKDF (%15):</span>
            <span className="font-medium text-gray-900">{formatNumber(result.kkdfAmount)} TL</span>
          </div>

          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-gray-600">Aylık Maliyet Oranı:</span>
            <span className="font-medium text-gray-900">%{result.monthlyEffectiveRate.toFixed(4)}</span>
          </div>

          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-gray-600">Yıllık Maliyet Oranı:</span>
            <span className="font-medium text-gray-900">%{result.yearlyEffectiveRate.toFixed(4)}</span>
          </div>
        </div>
      </div>

      {/* Paylaşım Butonları */}
      <div className="flex flex-col sm:flex-row gap-2">
        <button
          onClick={handleEmailShare}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
        >
          <Mail className="w-4 h-4" />
          E-posta
        </button>
        <button
          onClick={handleWhatsAppShare}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-green-700 bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
        >
          <Share2 className="w-4 h-4" />
          WhatsApp'ta Paylaş
        </button>
        <button
          onClick={handleCopy}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${
            copied 
              ? 'text-green-700 bg-green-50' 
              : 'text-gray-700 bg-white border border-gray-200 hover:bg-gray-50'
          }`}
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" />
              Kopyalandı
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              Kopyala
            </>
          )}
        </button>
      </div>

      {/* Uyarılar */}
      <div className="space-y-4">
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex gap-3">
          <Info className="w-5 h-5 text-amber-600 flex-shrink-0" />
          <p className="text-sm text-amber-700">
            Bu hesaplama, bankanın ek taksit işlemi için sabit bir ücret almadığı varsayılarak yapılmıştır. Çoğu banka bu işlem için ücret talep etmez. Ancak, bankanız bir hizmet ücreti alıyorsa, gerçek ödeme tutarlarınız burada belirtilen miktarlardan biraz farklı olabilir.
          </p>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex gap-3">
          <Info className="w-5 h-5 text-amber-600 flex-shrink-0" />
          <p className="text-sm text-amber-700">
            Bu hesaplama aracı bilgilendirme amaçlıdır ve sonuçlar tahminidir. Kesin sonuçlar bankanızın uyguladığı güncel faiz oranları ve koşullara göre değişiklik gösterebilir. Lütfen kesin bilgi için bankanızla iletişime geçiniz.
          </p>
        </div>
      </div>
    </div>
  );
}