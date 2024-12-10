import React from 'react';

interface CalculatorFormProps {
  gelir: string;
  setGelir: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  hesaplamaSonucuVar: boolean;
}

export function CalculatorForm({ gelir, setGelir, onSubmit, hesaplamaSonucuVar }: CalculatorFormProps) {
  const formatInput = (value: string) => {
    const cleanValue = value.replace(/[^\d.,]/g, '');
    const number = parseFloat(cleanValue.replace(/[.,]/g, ''));
    if (!isNaN(number)) {
      return new Intl.NumberFormat('tr-TR').format(number);
    }
    return cleanValue;
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div>
        <label 
          htmlFor="gelir" 
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Yıllık Toplam Kira Geliri
        </label>
        <div className="relative mt-1">
          <input
            type="text"
            inputMode="numeric"
            id="gelir"
            value={gelir}
            onChange={(e) => setGelir(formatInput(e.target.value))}
            className="block w-full px-4 py-3.5 text-gray-900 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
            placeholder="0,00"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-4">
            <span className="text-gray-500">₺</span>
          </div>
        </div>
        <p className="mt-1 text-sm text-gray-500">
          Örnek: 120.000 (Yıllık toplam kira geliri)
        </p>
      </div>

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white h-12 rounded-lg hover:bg-indigo-700 transition-colors duration-200 font-medium"
      >
        {hesaplamaSonucuVar ? 'Yeniden Hesapla' : 'Hesapla'}
      </button>
    </form>
  );
}