import React from 'react';
import { FileDown, Share2, Mail } from 'lucide-react';
import { generatePDF } from '../utils/pdfGenerator';
import { generateWhatsAppMessage, generateEmailContent } from '../utils/shareHelpers';
import { AnimatedCounter } from './AnimatedCounter';

interface ResultsDisplayProps {
  sonuclar: {
    vergiMatrahi: number;
    vergiOrani: number;
    vergiTutari: number;
  };
}

export function ResultsDisplay({ sonuclar }: ResultsDisplayProps) {
  const effectiveRate = (sonuclar.vergiTutari / sonuclar.vergiMatrahi) * 100;

  const handlePDFDownload = () => {
    generatePDF(sonuclar);
  };

  const handleWhatsAppShare = () => {
    const message = generateWhatsAppMessage(sonuclar);
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleEmailShare = () => {
    const { subject, body } = generateEmailContent(sonuclar);
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="mt-8 space-y-8 animate-fade-in">
      <div className="grid grid-cols-1 gap-4">
        <div className="bg-indigo-50 p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-indigo-900 mb-1">
                Kurumlar Vergisi Tutarı
              </h3>
              <p className="text-2xl font-semibold text-indigo-900">
                <AnimatedCounter end={sonuclar.vergiTutari} /> ₺
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-indigo-700">
                Aylık: <AnimatedCounter end={sonuclar.vergiTutari / 12} /> ₺
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-500 mb-1">
              Vergi Matrahı
            </h3>
            <p className="text-lg font-semibold text-gray-900">
              <AnimatedCounter end={sonuclar.vergiMatrahi} /> ₺
            </p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-500 mb-1">
              Vergi Oranı
            </h3>
            <p className="text-lg font-semibold text-gray-900">
              %<AnimatedCounter end={sonuclar.vergiOrani} duration={800} />
            </p>
            <p className="mt-1 text-sm text-gray-500">
              Efektif: %<AnimatedCounter end={effectiveRate} duration={800} />
            </p>
          </div>
        </div>
      </div>

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