import React, { useState } from 'react';
import { Home } from 'lucide-react';
import { RentTaxForm } from './RentTaxForm';
import { RentTaxResults } from './RentTaxResults';
import { RentTaxInfo } from './RentTaxInfo';
import { SEO } from '../../../components/SEO';
import { calculateRentTax } from '../../../utils/rentTax/calculations';
import type { RentTaxInput, RentTaxResult } from '../../../types/rentTax';

export function RentTax() {
  const [result, setResult] = useState<RentTaxResult | null>(null);

  const handleCalculate = (input: RentTaxInput) => {
    const calculationResult = calculateRentTax(input);
    setResult(calculationResult);
  };

  const seoData = {
    title: 'Kira Geliri Vergisi Hesaplama 2024 | Ücretsiz Hesaplama Aracı',
    description: '2024 yılı güncel oranlarıyla kira geliri vergisi hesaplama. Ücretsiz, kolay kullanımlı ve anlık sonuç veren kira geliri vergisi hesaplama aracı.',
    keywords: [
      'kira vergisi',
      'kira geliri vergisi',
      'kira vergisi hesaplama',
      '2024 kira vergisi',
      'gayrimenkul gelir vergisi',
      'konut kira vergisi',
      'kira stopajı',
      'vergi hesaplama'
    ],
    canonicalUrl: 'https://hesaplama.app/kira-geliri-vergisi-hesaplama',
    schemaData: {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'Kira Geliri Vergisi Hesaplama',
      description: '2024 yılı güncel oranlarıyla kira geliri vergisi hesaplama aracı',
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'Web',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'TRY'
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.8',
        ratingCount: '1250'
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO {...seoData} />
      
      <main className="max-w-2xl mx-auto px-4 py-12">
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-50 rounded-2xl mb-6">
            <Home className="w-8 h-8 text-indigo-600" />
          </div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-3">
            Kira Geliri Vergisi Hesaplama
          </h1>
          <p className="text-gray-600 mb-4">
            2024 yılı güncel oranlarıyla kira geliri vergisi hesaplayın
          </p>
          <div className="text-sm text-gray-500">
            İstisna Tutarı: <span className="font-medium text-gray-900">33.000 TL</span>
            <span className="mx-2">·</span>
            Son Güncelleme: <time dateTime="2024-01-01">1 Ocak 2024</time>
          </div>
        </header>

        <div className="space-y-8">
          <section className="bg-white rounded-2xl shadow-xl p-6">
            <RentTaxForm onCalculate={handleCalculate} />
            {result && <RentTaxResults result={result} />}
          </section>

          <RentTaxInfo />
        </div>
      </main>
    </div>
  );
}