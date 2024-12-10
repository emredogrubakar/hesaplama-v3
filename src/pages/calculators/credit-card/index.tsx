import React, { useState, useRef } from 'react';
import { CreditCard } from 'lucide-react';
import { SEO } from '../../../components/SEO';
import { InstallmentForm } from '../../../components/creditCard/InstallmentForm';
import { InstallmentResults } from '../../../components/creditCard/InstallmentResults';
import { InfoCard } from '../../../components/creditCard/InfoCard';
import { calculateAdditionalInstallments } from '../../../utils/creditCard/calculations';
import type { InstallmentCalculation } from '../../../types/creditCard';

export function CreditCardCalculator() {
  const [result, setResult] = useState<InstallmentCalculation | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const handleCalculate = (amount: number, currentInstallments: number, newInstallments: number) => {
    const calculationResult = calculateAdditionalInstallments(amount, currentInstallments, newInstallments);
    setResult(calculationResult);

    setTimeout(() => {
      resultRef.current?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO 
        title="Kredi Kartı Ek Taksit Hesaplama | Hesapio"
        description="Kredi kartı ek taksit hesaplama. Mevcut taksitli alışverişinizi yeni taksit sayısına göre hesaplayın."
        keywords={['kredi kartı ek taksit', 'taksit hesaplama', 'kredi kartı hesaplama', 'taksit artırma']}
      />
      
      <main className="max-w-2xl mx-auto px-4 py-12">
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-50 rounded-2xl mb-6">
            <CreditCard className="w-8 h-8 text-indigo-600" />
          </div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-3">
            Kredi Kartı Ek Taksit Hesaplama
          </h1>
          <p className="text-gray-600 mb-4">
            Mevcut taksitli alışverişinizi yeni taksit sayısına göre hesaplayın
          </p>
          <div className="text-sm text-gray-500">
            Güncel Faiz Oranı: <span className="font-medium text-gray-900">%4.25</span>
            <span className="mx-2">·</span>
            Son Güncelleme: <time dateTime="2024-01-01">1 Ocak 2024</time>
          </div>
        </header>

        <div className="space-y-8">
          <section aria-label="Hesaplama Formu" className="bg-white rounded-2xl shadow-xl p-6">
            <InstallmentForm 
              onCalculate={handleCalculate}
              hasResult={result !== null}
            />
            <div ref={resultRef}>
              {result && <InstallmentResults result={result} />}
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