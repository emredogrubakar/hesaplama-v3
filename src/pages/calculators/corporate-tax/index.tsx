import React, { useState, useRef } from 'react';
import { Header } from '../../../components/Header';
import { CalculatorForm } from '../../../components/CalculatorForm';
import { ResultsDisplay } from '../../../components/ResultsDisplay';
import { InfoCard } from '../../../components/InfoCard';
import { hesaplaVergi } from '../../../utils/calculations';
import { SEO } from '../../../components/SEO';

export function CorporateTax() {
  const [gelir, setGelir] = useState<string>('');
  const [sonuclar, setSonuclar] = useState<{
    vergiMatrahi: number;
    vergiOrani: number;
    vergiTutari: number;
  } | null>(null);
  
  const resultRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const gelirNum = parseFloat(gelir.replace(/[.,]/g, ''));
    if (!isNaN(gelirNum)) {
      setSonuclar(hesaplaVergi(gelirNum));
      
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }, 100);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO 
        title="Kurumlar Vergisi Hesaplama 2024 | Ücretsiz Hesaplama Aracı"
        description="2024 yılı güncel oranlarıyla kurumlar vergisi hesaplama. Ücretsiz, kolay kullanımlı ve anlık sonuç veren kurumlar vergisi hesaplama aracı."
        keywords={['kurumlar vergisi', 'vergi hesaplama', '2024 kurumlar vergisi', 'vergi matrahı', 'vergi oranı']}
      />
      
      <main className="max-w-2xl mx-auto px-4 py-12">
        <Header />
        
        <div className="space-y-8">
          <section aria-label="Hesaplama Formu" className="bg-white rounded-2xl shadow-xl p-6">
            <CalculatorForm 
              gelir={gelir}
              setGelir={setGelir}
              onSubmit={handleSubmit}
              hesaplamaSonucuVar={sonuclar !== null}
            />
            <div ref={resultRef}>
              {sonuclar && <ResultsDisplay sonuclar={sonuclar} />}
            </div>
          </section>

          <section aria-label="Bilgi Kartı">
            <InfoCard />
          </section>
        </div>
      </main>
    </div>
  );
}