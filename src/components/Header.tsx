import React from 'react';
import { Calculator } from 'lucide-react';

export function Header() {
  return (
    <header className="text-center mb-12">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-50 rounded-2xl mb-6">
        <Calculator className="w-8 h-8 text-indigo-600" />
      </div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-3">
        Kurumlar Vergisi Hesaplama
      </h1>
      <p className="text-gray-600 mb-4">
        2024 yılı güncel oranlarıyla kurumlar vergisi hesaplayın
      </p>
      <div className="text-sm text-gray-500">
        Güncel Oran: <span className="font-medium text-gray-900">%25</span>
        <span className="mx-2">·</span>
        Son Güncelleme: <time dateTime="2024-01-01">1 Ocak 2024</time>
      </div>
    </header>
  );
}