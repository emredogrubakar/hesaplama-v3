import React, { useState } from 'react';
import { Share2, Copy, Check, AlertTriangle } from 'lucide-react';
import type { SunSignResult } from '../../types/zodiac';

interface SunSignResultsProps {
  result: SunSignResult;
}

export function SunSignResults({ result }: SunSignResultsProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const text = `Güneş Burcu Hesaplama Sonucu\n\n` +
      `Doğum Tarihi: ${result.birthDate}\n` +
      `Güneş Burcu: ${result.sign.name} ${result.sign.symbol}\n` +
      `Element: ${result.sign.element}\n` +
      `Nitelik: ${result.sign.quality}\n\n` +
      `${result.sign.description}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsAppShare = () => {
    const text = `*Güneş Burcu Hesaplama Sonucu*\n\n` +
      `📅 *Doğum Tarihi:* ${result.birthDate}\n` +
      `⭐ *Güneş Burcu:* ${result.sign.name} ${result.sign.symbol}\n` +
      `🌟 *Element:* ${result.sign.element}\n` +
      `✨ *Nitelik:* ${result.sign.quality}\n\n` +
      `${result.sign.description}`;

    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  // Burç geçiş tarihlerini kontrol et
  const isBorderDate = (): boolean => {
    const [day, month] = result.birthDate.split('.').map(Number);
    const borderDates = [
      { day: 20, month: 1 },  // Oğlak-Kova
      { day: 18, month: 2 },  // Kova-Balık
      { day: 20, month: 3 },  // Balık-Koç
      { day: 19, month: 4 },  // Koç-Boğa
      { day: 20, month: 5 },  // Boğa-İkizler
      { day: 21, month: 6 },  // İkizler-Yengeç
      { day: 22, month: 7 },  // Yengeç-Aslan
      { day: 22, month: 8 },  // Aslan-Başak
      { day: 22, month: 9 },  // Başak-Terazi
      { day: 22, month: 10 }, // Terazi-Akrep
      { day: 21, month: 11 }, // Akrep-Yay
      { day: 21, month: 12 }  // Yay-Oğlak
    ];

    return borderDates.some(date => 
      (date.day === day && date.month === month) || 
      (date.day === day + 1 && date.month === month) ||
      (date.day === day - 1 && date.month === month)
    );
  };

  return (
    <div className="mt-8 space-y-8 animate-fade-in">
      {/* Ana Sonuç */}
      <div className="bg-indigo-50 p-6 rounded-lg text-center">
        <h3 className="text-sm font-medium text-indigo-900 mb-2">
          Güneş Burcunuz
        </h3>
        <p className="text-4xl font-bold text-indigo-900 mb-2 animate-number">
          {result.sign.name} {result.sign.symbol}
        </p>
        <p className="text-sm text-indigo-700">
          {result.sign.startDate} - {result.sign.endDate}
        </p>
      </div>

      {/* Sınır Tarih Uyarısı */}
      {isBorderDate() && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0" />
          <div>
            <h3 className="font-medium text-amber-800 mb-1">Önemli Not</h3>
            <p className="text-sm text-amber-700">
              Burç geçiş tarihine yakın bir günde doğduğunuz için, kesin burcunuzu belirlemek için doğum saatiniz önemlidir. Daha hassas bir hesaplama için doğum saatinizi ve yerinizi de dikkate alan profesyonel bir astrologa danışmanızı öneririz.
            </p>
          </div>
        </div>
      )}

      {/* Detaylı Bilgiler */}
      <div className="bg-white p-6 rounded-lg border border-gray-100">
        <h4 className="font-medium text-gray-900 mb-4">Burç Detayları</h4>
        
        <div className="space-y-3 text-sm">
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-gray-600">Element:</span>
            <span className="font-medium text-gray-900">{result.sign.element}</span>
          </div>

          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-gray-600">Nitelik:</span>
            <span className="font-medium text-gray-900">{result.sign.quality}</span>
          </div>

          <div className="py-2 border-b border-gray-100">
            <span className="text-gray-600">Genel Özellikler:</span>
            <p className="mt-1 text-gray-900">{result.sign.description}</p>
          </div>
        </div>
      </div>

      {/* Paylaşım Butonları */}
      <div className="flex flex-col sm:flex-row gap-2">
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
    </div>
  );
}