import React, { useState } from 'react';
import { Share2, Copy, Check, Info, AlertTriangle, Scale, ThumbsUp, AlertCircle } from 'lucide-react';
import { BMI_CATEGORIES } from '../../utils/health/bmiCalculations';
import type { BMIResult } from '../../types/health';

interface BMIResultsProps {
  result: BMIResult;
}

export function BMIResults({ result }: BMIResultsProps) {
  const [copied, setCopied] = useState(false);

  // Aktif kategoriyi bul
  const category = BMI_CATEGORIES.find(cat => cat.name === result.category);

  const getCategoryIcon = () => {
    switch (category?.name) {
      case 'Normal':
        return <ThumbsUp className="w-8 h-8 text-green-600" />;
      case 'Zayıf':
        return <AlertCircle className="w-8 h-8 text-yellow-600" />;
      default:
        return <AlertTriangle className="w-8 h-8 text-red-600" />;
    }
  };

  const handleCopy = () => {
    const text = `Vücut Kitle İndeksi (VKİ) Hesaplama Sonucu\n\n` +
      `Boy: ${result.height} cm\n` +
      `Kilo: ${result.weight} kg\n` +
      `VKİ: ${result.bmi}\n` +
      `Kategori: ${result.category}\n` +
      `İdeal Kilo Aralığı: ${result.idealWeight.min}-${result.idealWeight.max} kg`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsAppShare = () => {
    const text = `*Vücut Kitle İndeksi (VKİ) Hesaplama Sonucu*\n\n` +
      `📏 *Boy:* ${result.height} cm\n` +
      `⚖️ *Kilo:* ${result.weight} kg\n` +
      `📊 *VKİ:* ${result.bmi}\n` +
      `📋 *Kategori:* ${result.category}\n` +
      `✨ *İdeal Kilo Aralığı:* ${result.idealWeight.min}-${result.idealWeight.max} kg`;

    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="mt-8 space-y-8 animate-fade-in">
      {/* Ana Sonuç */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className={`p-6 rounded-lg ${
          category?.name === 'Normal' 
            ? 'bg-green-50' 
            : category?.name === 'Zayıf'
            ? 'bg-yellow-50'
            : 'bg-red-50'
        }`}>
          <div className="flex items-center gap-3 mb-3">
            {getCategoryIcon()}
            <h3 className={`text-sm font-medium ${
              category?.name === 'Normal'
                ? 'text-green-900'
                : category?.name === 'Zayıf'
                ? 'text-yellow-900'
                : 'text-red-900'
            }`}>
              VKİ Değeriniz
            </h3>
          </div>
          <p className={`text-3xl font-semibold animate-number ${
            category?.name === 'Normal'
              ? 'text-green-900'
              : category?.name === 'Zayıf'
              ? 'text-yellow-900'
              : 'text-red-900'
          }`}>
            {result.bmi}
          </p>
          <p className={`text-sm mt-2 ${
            category?.name === 'Normal'
              ? 'text-green-700'
              : category?.name === 'Zayıf'
              ? 'text-yellow-700'
              : 'text-red-700'
          }`}>
            {category?.description}
          </p>
        </div>

        <div className="bg-indigo-50 p-6 rounded-lg">
          <div className="flex items-center gap-3 mb-3">
            <Scale className="w-8 h-8 text-indigo-600" />
            <h3 className="text-sm font-medium text-indigo-900">
              İdeal Kilo Aralığı
            </h3>
          </div>
          <p className="text-3xl font-semibold text-indigo-900 animate-number">
            {result.idealWeight.min}-{result.idealWeight.max} kg
          </p>
          <p className="text-sm mt-2 text-indigo-700">
            Boyunuza göre sağlıklı kilo aralığı
          </p>
        </div>
      </div>

      {/* VKİ Kategorileri Tablosu */}
      <div className="bg-white p-6 rounded-lg border border-gray-100">
        <h4 className="font-medium text-gray-900 mb-4">VKİ Kategorileri</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 px-3 text-gray-600 font-medium">VKİ Değeri</th>
                <th className="text-left py-2 px-3 text-gray-600 font-medium">Kategori</th>
              </tr>
            </thead>
            <tbody>
              {BMI_CATEGORIES.map((cat, index) => (
                <tr 
                  key={index} 
                  className={`border-b border-gray-100 ${cat.name === result.category ? 'bg-indigo-50' : ''}`}
                >
                  <td className="py-2 px-3">
                    {cat.range.max === Infinity 
                      ? `${cat.range.min} ve üzeri`
                      : `${cat.range.min} - ${cat.range.max}`}
                  </td>
                  <td className="py-2 px-3">{cat.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Kategori Bilgisi ve Öneriler */}
      {category && (
        <div className="bg-white p-6 rounded-lg border border-gray-100">
          <h4 className="font-medium text-gray-900 mb-4">Değerlendirme ve Öneriler</h4>
          
          <div className="space-y-4">
            <p className="text-gray-600">{category.description}</p>

            <div className="space-y-2">
              <h5 className="font-medium text-gray-900">Öneriler:</h5>
              <ul className="list-disc list-inside space-y-1 text-gray-600">
                {category.recommendations.map((rec, index) => (
                  <li key={index}>{rec}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

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

      {/* Uyarılar */}
      <div className="space-y-4">
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex gap-3">
          <Info className="w-5 h-5 text-amber-600 flex-shrink-0" />
          <p className="text-sm text-amber-700">
            Bu hesaplama aracı bilgilendirme amaçlıdır. Kesin sonuçlar için lütfen bir sağlık uzmanına danışınız.
          </p>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex gap-3">
          <Info className="w-5 h-5 text-amber-600 flex-shrink-0" />
          <p className="text-sm text-amber-700">
            VKİ hesaplaması genel bir değerlendirme sunar ve vücut yağ oranı, kas kütlesi gibi önemli faktörleri dikkate almaz. Sporcular, hamileler ve çocuklar için yanıltıcı sonuçlar verebilir.
          </p>
        </div>
      </div>
    </div>
  );
}