import React, { useState } from 'react';
import { AlertCircle } from 'lucide-react';

interface SunSignFormProps {
  onCalculate: (birthDate: string) => void;
  hasResult: boolean;
}

const MONTHS = [
  { value: '01', label: 'Ocak' },
  { value: '02', label: 'Şubat' },
  { value: '03', label: 'Mart' },
  { value: '04', label: 'Nisan' },
  { value: '05', label: 'Mayıs' },
  { value: '06', label: 'Haziran' },
  { value: '07', label: 'Temmuz' },
  { value: '08', label: 'Ağustos' },
  { value: '09', label: 'Eylül' },
  { value: '10', label: 'Ekim' },
  { value: '11', label: 'Kasım' },
  { value: '12', label: 'Aralık' }
];

export function SunSignForm({ onCalculate, hasResult }: SunSignFormProps) {
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [error, setError] = useState<string>('');

  const handleDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    
    // Maksimum 2 rakam
    if (value.length > 2) {
      value = value.slice(0, 2);
    }

    // Gün değeri kontrolü
    const dayNum = parseInt(value);
    if (dayNum > 31) {
      value = '31';
    }

    setDay(value);
    setError('');
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMonth(e.target.value);
    setError('');
  };

  const validateDate = (): boolean => {
    if (!day || !month) {
      setError('Gün ve ay seçilmelidir');
      return false;
    }

    const dayNum = parseInt(day);
    const monthNum = parseInt(month);

    if (dayNum < 1 || dayNum > 31) {
      setError('Geçersiz gün');
      return false;
    }

    // Ay bazında gün sayısı kontrolü
    const daysInMonth = new Date(2024, monthNum, 0).getDate();
    if (dayNum > daysInMonth) {
      setError(`${MONTHS[monthNum - 1].label} ayı için geçersiz gün`);
      return false;
    }

    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateDate()) {
      onCalculate(`${day}.${month}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <span className="text-red-500">*</span> Gün
          </label>
          <input
            type="text"
            inputMode="numeric"
            placeholder="GG"
            value={day}
            onChange={handleDayChange}
            className={`block w-full px-4 py-2.5 text-gray-900 border rounded-lg focus:ring-2 transition-colors text-center ${
              error && !day
                ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                : 'border-gray-200 focus:ring-indigo-500 focus:border-indigo-500'
            }`}
            maxLength={2}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <span className="text-red-500">*</span> Ay
          </label>
          <select
            value={month}
            onChange={handleMonthChange}
            className={`block w-full px-4 py-2.5 text-gray-900 border rounded-lg focus:ring-2 transition-colors ${
              error && !month
                ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                : 'border-gray-200 focus:ring-indigo-500 focus:border-indigo-500'
            }`}
          >
            <option value="">Seçiniz</option>
            {MONTHS.map(month => (
              <option key={month.value} value={month.value}>
                {month.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {error && (
        <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
          <AlertCircle className="w-4 h-4" />
          {error}
        </p>
      )}

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white h-12 rounded-lg hover:bg-indigo-700 transition-colors duration-200 font-medium"
      >
        {hasResult ? 'Yeniden Hesapla' : 'Hesapla'}
      </button>
    </form>
  );
}