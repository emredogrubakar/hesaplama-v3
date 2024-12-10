import React, { useState, useRef } from 'react';
import { Box } from 'lucide-react';
import { SEO } from '../../../components/SEO';
import { GeometryForm } from '../../../components/geometry/GeometryForm';
import { GeometryResults } from '../../../components/geometry/GeometryResults';
import { GeometryFAQ } from '../../../components/geometry/GeometryFAQ';
import { calculateGeometry } from '../../../utils/geometry/calculations';
import { VOLUME_SHAPES } from '../../../utils/geometry/shapes';
import type { GeometricShape, CalculationResult } from '../../../types/geometry';

export function VolumeCalculator() {
  const [result, setResult] = useState<CalculationResult | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const handleCalculate = (shape: GeometricShape, inputs: Record<string, number>) => {
    const calculationResult = calculateGeometry(shape, inputs);
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
        title="Hacim Hesaplama | Hesapio"
        description="Küp, dikdörtgenler prizması, silindir, küre gibi geometrik cisimlerin hacim hesaplamaları."
        keywords={['hacim hesaplama', 'geometri', 'matematik', 'küp hacim', 'prizma hacim', 'silindir hacim', 'küre hacim']}
      />
      
      <main className="max-w-2xl mx-auto px-4 py-12">
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-50 rounded-2xl mb-6">
            <Box className="w-8 h-8 text-indigo-600" />
          </div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-3">
            Hacim Hesaplama
          </h1>
          <p className="text-gray-600">
            Geometrik cisimlerin hacim hesaplamalarını yapın
          </p>
        </header>

        <div className="space-y-8">
          <section className="bg-white rounded-2xl shadow-xl p-6">
            <GeometryForm 
              shapes={VOLUME_SHAPES}
              onCalculate={handleCalculate}
              hasResult={result !== null}
            />
            <div ref={resultRef}>
              {result && <GeometryResults result={result} />}
            </div>
          </section>

          <GeometryFAQ type="volume" />
        </div>
      </main>
    </div>
  );
}