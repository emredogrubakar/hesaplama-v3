import React, { useState } from 'react';
import { Weight } from 'lucide-react';
import { SEO } from '../../../components/SEO';
import { BMIForm } from '../../../components/health/BMIForm';
import { BMIResults } from '../../../components/health/BMIResults';
import { BMIFAQ } from '../../../components/health/BMIFAQ';
import { calculateBMI } from '../../../utils/health/bmiCalculations';
import type { BMIResult } from '../../../types/health';

export function BMICalculator() {
  const [result, setResult] = useState<BMIResult | null>(null);

  const handleCalculate = (weight: number, height: number) => {
    const calculationResult = calculateBMI(weight, height);
    setResult(calculationResult);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO 
        title="Vücut Kitle İndeksi Hesaplama | Hesapio"
        description="Boy ve kilonuza göre vücut kitle indeksinizi hesaplayın. İdeal kilo aralığınızı öğrenin ve kişisel öneriler alın."
        keywords={['vücut kitle indeksi', 'vki hesaplama', 'ideal kilo', 'kilo hesaplama']}
      />
      
      <main className="max-w-2xl mx-auto px-4 py-12">
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-50 rounded-2xl mb-6">
            <Weight className="w-8 h-8 text-indigo-600" />
          </div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-3">
            Vücut Kitle İndeksi Hesaplama
          </h1>
          <p className="text-gray-600">
            Boy ve kilonuza göre vücut kitle indeksinizi hesaplayın
          </p>
        </header>

        <div className="space-y-8">
          <section className="bg-white rounded-2xl shadow-xl p-6">
            <BMIForm 
              onCalculate={handleCalculate}
              hasResult={result !== null}
            />
            {result && <BMIResults result={result} />}
          </section>

          <BMIFAQ />
        </div>
      </main>
    </div>
  );
}