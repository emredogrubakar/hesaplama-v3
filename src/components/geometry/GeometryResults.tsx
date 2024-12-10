import React, { useState } from 'react';
import { Share2, Copy, Check } from 'lucide-react';
import { formatNumber } from '../../utils/formatters';
import type { CalculationResult } from '../../types/geometry';

interface GeometryResultsProps {
  result: CalculationResult;
}

export function GeometryResults({ result }: GeometryResultsProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const text = `${result.shape.name} ${result.shape.type === 'area' ? 'Alan' : 'Hacim'} Hesaplama Sonucu\n\n` +
      Object.entries(result.inputs).map(([key, value]) => {
        const field = result.shape.fields.find(f => f.name === key);
        return `${field?.label}: ${value} ${field?.unit}`;
      }).join('\n') +
      `\n\nSonuç: ${formatNumber(result.result)} ${result.shape.type === 'area' ? 'cm²' : 'cm³'}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsAppShare = () => {
    const text = `*${result.shape.name} ${result.shape.type === 'area' ? 'Alan' : 'Hacim'} Hesaplama Sonucu*\n\n` +
      Object.entries(result.inputs).map(([key, value]) => {
        const field = result.shape.fields.find(f => f.name === key);
        return `📏 *${field?.label}:* ${value} ${field?.unit}`;
      }).join('\n') +
      `\n\n📐 *Sonuç:* ${formatNumber(result.result)} ${result.shape.type === 'area' ? 'cm²' : 'cm³'}`;

    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="mt-8 space-y-8 animate-fade-in">
      {/* Ana Sonuç */}
      <div className="bg-indigo-50 p-6 rounded-lg">
        <div className="text-center">
          <h3 className="text-sm font-medium text-indigo-900 mb-2">
            {result.shape.name} {result.shape.type === 'area' ? 'Alanı' : 'Hacmi'}
          </h3>
          <p className="text-3xl font-semibold text-indigo-900 animate-number">
            {formatNumber(result.result)} {result.shape.type === 'area' ? 'cm²' : 'cm³'}
          </p>
        </div>
      </div>

      {/* Detaylı Bilgiler */}
      <div className="bg-white p-6 rounded-lg border border-gray-100">
        <h4 className="font-medium text-gray-900 mb-4">Hesaplama Detayları</h4>
        
        <div className="space-y-3 text-sm">
          {Object.entries(result.inputs).map(([key, value]) => {
            const field = result.shape.fields.find(f => f.name === key);
            return (
              <div key={key} className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">{field?.label}:</span>
                <span className="font-medium text-gray-900">{value} {field?.unit}</span>
              </div>
            );
          })}

          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-gray-600">Formül:</span>
            <span className="font-medium text-gray-900">{result.shape.formula}</span>
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