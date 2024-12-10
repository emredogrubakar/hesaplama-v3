import React, { useState, useRef } from 'react';
import { Sparkles } from 'lucide-react';
import { SEO } from '../../../components/SEO';
import { SunSignForm } from '../../../components/zodiac/SunSignForm';
import { SunSignResults } from '../../../components/zodiac/SunSignResults';
import { SunSignFAQ } from '../../../components/zodiac/SunSignFAQ';
import { calculateSunSign } from '../../../utils/zodiac/sunSign';
import type { SunSignResult } from '../../../types/zodiac';

export function SunSignCalculator() {
  const [result, setResult] = useState<SunSignResult | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const handleCalculate = (birthDate: string) => {
    const sign = calculateSunSign(birthDate);
    setResult({ sign, birthDate });

    setTimeout(() => {
      resultRef.current?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }, 100);
  };

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Güneş Burcu Hesaplama',
    description: 'Doğum tarihinize göre güneş burcunuzu hesaplayın. Burç özellikleri ve detaylı astrolojik bilgiler.',
    applicationCategory: 'LifestyleApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'TRY'
    },
    mainEntity: {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Güneş burcu nedir?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Güneş burcu, doğduğunuz anda Güneş\'in zodyakta hangi burçta olduğunu gösterir. Kişiliğinizin temel özelliklerini ve yaşam enerjinizi simgeler.'
          }
        },
        {
          '@type': 'Question',
          name: 'Güneş burcumu nasıl hesaplarım?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Güneş burcu doğum tarihinizle hesaplanır. Zodyak kuşağında Güneş\'in 12 burçtan birine girdiği tarih aralıklarına bakılır.'
          }
        },
        {
          '@type': 'Question',
          name: 'Burçlar her yıl aynı mı kalır?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Güneş\'in burç değiştirdiği tarihler yıldan yıla birkaç saat fark edebilir. Bu yüzden sınır tarihlerde doğanların detaylı hesaplama yapması gerekir.'
          }
        }
      ]
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO 
        title="Güneş Burcu Hesaplama | Hesapio"
        description="Doğum tarihinize göre güneş burcunuzu hesaplayın. Burç özellikleri ve detaylı astrolojik bilgiler."
        keywords={['güneş burcu', 'burç hesaplama', 'zodyak', 'astroloji', 'burç özellikleri']}
        schemaData={schemaData}
      />
      
      <main className="max-w-2xl mx-auto px-4 py-12">
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-50 rounded-2xl mb-6">
            <Sparkles className="w-8 h-8 text-indigo-600" />
          </div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-3">
            Güneş Burcu Hesaplama
          </h1>
          <p className="text-gray-600">
            Doğum tarihinize göre güneş burcunuzu öğrenin
          </p>
        </header>

        <div className="space-y-8">
          <section className="bg-white rounded-2xl shadow-xl p-6">
            <SunSignForm 
              onCalculate={handleCalculate}
              hasResult={result !== null}
            />
            <div ref={resultRef}>
              {result && <SunSignResults result={result} />}
            </div>
          </section>

          <SunSignFAQ />
        </div>
      </main>
    </div>
  );
}