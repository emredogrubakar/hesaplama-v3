import React, { useState } from 'react';
import { Clock, Calendar, Copy, Share2, Check } from 'lucide-react';
import type { MonthCalculationResult } from '../utils/monthCalculations';

interface MonthSummaryProps {
  result: MonthCalculationResult;
  startDate: string;
  endDate: string;
  onShare: () => void;
}

export function MonthSummary({ result, startDate, endDate, onShare }: MonthSummaryProps) {
  const [copied, setCopied] = useState(false);

  const formatDate = (dateStr: string) => {
    const [day, month, year] = dateStr.split('.');
    const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    return date.toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const summaryText = `Tarih Aralığı: ${formatDate(startDate)} - ${formatDate(endDate)}

Toplam Süre: ${result.totalMonths.toLocaleString('tr-TR')} ay

${result.exactYears.toLocaleString('tr-TR')} yıl
${result.exactMonths.toLocaleString('tr-TR')} ay
${result.remainingDays.toLocaleString('tr-TR')} gün`;

  const handleCopy = () => {
    navigator.clipboard.writeText(summaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mt-8 space-y-6">
      <div className="bg-gray-50 rounded-lg p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-indigo-600" />
            <h3 className="text-lg font-medium text-gray-900">Hesaplama Özeti</h3>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center gap-2 text-sm text-gray-600 pb-4 border-b border-gray-200">
            <Calendar className="w-4 h-4" />
            <span>
              {formatDate(startDate)} - {formatDate(endDate)}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3">Gün Bazında</h4>
              <ul className="space-y-2">
                <li className="bg-white p-2.5 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Toplam Gün</span>
                    <span className="font-medium text-gray-900">{result.totalDays.toLocaleString('tr-TR')}</span>
                  </div>
                </li>
                <li className="bg-white p-2.5 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">İş Günü</span>
                    <span className="font-medium text-gray-900">{Math.round(result.totalDays * 5/7).toLocaleString('tr-TR')}</span>
                  </div>
                </li>
                <li className="bg-white p-2.5 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Hafta Sonu</span>
                    <span className="font-medium text-gray-900">{Math.round(result.totalDays * 2/7).toLocaleString('tr-TR')}</span>
                  </div>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3">Detaylı Süre</h4>
              <ul className="space-y-2">
                <li className="bg-white p-2.5 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Yıl</span>
                    <span className="font-medium text-gray-900">{result.exactYears.toLocaleString('tr-TR')}</span>
                  </div>
                </li>
                <li className="bg-white p-2.5 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Ay</span>
                    <span className="font-medium text-gray-900">{result.exactMonths.toLocaleString('tr-TR')}</span>
                  </div>
                </li>
                <li className="bg-white p-2.5 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Gün</span>
                    <span className="font-medium text-gray-900">{result.remainingDays.toLocaleString('tr-TR')}</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 pt-4 border-t border-gray-200">
            <button
              onClick={handleCopy}
              className={`flex items-center justify-center gap-1.5 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
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
            <button
              onClick={onShare}
              className="flex items-center justify-center gap-1.5 px-3 py-2 text-sm font-medium text-green-700 bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
            >
              <Share2 className="w-4 h-4" />
              WhatsApp'tan Gönder
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}