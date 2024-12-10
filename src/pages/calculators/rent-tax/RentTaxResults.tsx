import React, { useEffect } from 'react';
import { FileDown, Share2, Mail } from 'lucide-react';
import { formatNumber } from '../../../utils/formatters';
import { generatePDF } from '../../../utils/rentTax/pdfGenerator';
import { generateWhatsAppMessage, generateEmailContent } from '../../../utils/rentTax/shareHelpers';
import { TaxBracketsTable } from '../../../components/TaxBracketsTable';
import type { RentTaxResult } from '../../../types/rentTax';

interface RentTaxResultsProps {
  result: RentTaxResult;
}

export function RentTaxResults({ result }: RentTaxResultsProps) {
  useEffect(() => {
    // Smooth scroll to results
    const element = document.getElementById('results-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const handlePDFDownload = () => {
    generatePDF(result);
  };

  const handleWhatsAppShare = () => {
    const message = generateWhatsAppMessage(result);
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleEmailShare = () => {
    const { subject, body } = generateEmailContent(result);
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div id="results-section" className="mt-8 space-y-8 animate-fade-in">
      {/* Ana Sonuç - Animasyonlu */}
      <div className="bg-indigo-50 p-6 rounded-lg transform transition-all duration-500 animate-result">
        <h3 className="text-sm font-medium text-indigo-900 mb-2 text-center">
          Ödenecek Vergiler Toplamı
        </h3>
        <p className="text-4xl font-bold text-indigo-900 text-center animate-number">
          {formatNumber(result.totalTaxAmount)} TL
        </p>
      </div>

      {/* Detaylı Sonuçlar */}
      <div className="space-y-6 bg-white p-6 rounded-lg border border-gray-100">
        <h4 className="font-medium text-gray-900 mb-4">Hesaplama Detayları</h4>
        
        <div className="space-y-3 text-sm">
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-gray-600">Toplam Kira Geliri:</span>
            <span className="font-medium text-gray-900">{formatNumber(result.yearlyRentIncome)} TL</span>
          </div>

          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-gray-600">Konut İstisna Tutarı:</span>
            <span className="font-medium text-gray-900">{formatNumber(result.exemptionAmount)} TL</span>
          </div>
          
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-gray-600">İndirilebilecek Giderler Toplamı:</span>
            <span className="font-medium text-gray-900">{formatNumber(result.totalDeductions)} TL</span>
          </div>
          
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-gray-600">Vergiye Tabi Gelir:</span>
            <span className="font-medium text-gray-900">{formatNumber(result.taxableIncome)} TL</span>
          </div>
          
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-gray-600">Ödenecek Kira Gelir Vergisi:</span>
            <span className="font-medium text-gray-900">{formatNumber(result.taxAmount)} TL</span>
          </div>
          
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-gray-600">Ödenecek Damga Vergisi (2024):</span>
            <span className="font-medium text-gray-900">{formatNumber(result.damgaVergisi)} TL</span>
          </div>

          <div className="flex justify-between py-3 border-b border-gray-100 bg-indigo-50 px-3 rounded-lg">
            <span className="font-medium text-indigo-900">Ödenecek Vergiler Toplamı:</span>
            <span className="font-bold text-indigo-900">{formatNumber(result.totalTaxAmount)} TL</span>
          </div>
        </div>

        <div className="py-2">
          <span className="text-gray-600">Beyanname Verme Dönemi:</span>
          <span className="font-medium text-gray-900 ml-2">{result.beyannameDonemi}</span>
        </div>

        {/* Vergi Dilimleri Tablosu */}
        <TaxBracketsTable brackets={result.taxBrackets} />
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
          onClick={handlePDFDownload}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-red-700 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
        >
          <FileDown className="w-4 h-4" />
          PDF
        </button>
      </div>
    </div>
  );
}