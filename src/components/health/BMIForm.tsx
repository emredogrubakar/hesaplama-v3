import React, { useState } from 'react';
import { AlertCircle } from 'lucide-react';

interface BMIFormProps {
  onCalculate: (weight: number, height: number) => void;
  hasResult: boolean;
}

export function BMIForm({ onCalculate, hasResult }: BMIFormProps) {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [errors, setErrors] = useState<{
    weight?: string;
    height?: string;
  }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height);

    if (!weight) {
      setErrors(prev => ({ ...prev, weight: 'Kilo girilmesi zorunludur' }));
      return;
    }

    if (!height) {
      setErrors(prev => ({ ...prev, height: 'Boy girilmesi zorunludur' }));
      return;
    }

    if (isNaN(weightNum) || weightNum <= 0 || weightNum > 300) {
      setErrors(prev => ({ ...prev, weight: 'Geçerli bir kilo giriniz (1-300 kg)' }));
      return;
    }

    if (isNaN(heightNum) || heightNum <= 0 || heightNum > 250) {
      setErrors(prev => ({ ...prev, height: 'Geçerli bir boy giriniz (1-250 cm)' }));
      return;
    }

    onCalculate(weightNum, heightNum);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <span className="text-red-500">*</span> Kilo
          </label>
          <div className="relative">
            <input
              type="text"
              inputMode="decimal"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="0"
              className={`block w-full pl-3 pr-12 py-2 border rounded-lg focus:ring-2 transition-colors text-right ${
                errors.weight
                  ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                  : 'border-gray-200 focus:ring-indigo-500 focus:border-indigo-500'
              }`}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <span className="text-gray-500">kg</span>
            </div>
          </div>
          {errors.weight && (
            <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {errors.weight}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <span className="text-red-500">*</span> Boy
          </label>
          <div className="relative">
            <input
              type="text"
              inputMode="decimal"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="0"
              className={`block w-full pl-3 pr-12 py-2 border rounded-lg focus:ring-2 transition-colors text-right ${
                errors.height
                  ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                  : 'border-gray-200 focus:ring-indigo-500 focus:border-indigo-500'
              }`}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <span className="text-gray-500">cm</span>
            </div>
          </div>
          {errors.height && (
            <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {errors.height}
            </p>
          )}
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white h-12 rounded-lg hover:bg-indigo-700 transition-colors duration-200 font-medium"
      >
        {hasResult ? 'Yeniden Hesapla' : 'Hesapla'}
      </button>
    </form>
  );
}