import React, { useState } from 'react';
import { Calendar, AlertCircle } from 'lucide-react';
import { calculateDaysBetween, type DateCalculationResult } from '../../../utils/dateCalculations';
import { generateDateWhatsAppMessage } from '../../../utils/dateShareHelpers';
import { DateSummary } from '../../../components/DateSummary';
import { DateFAQ } from '../../../components/DateFAQ';
import { formatDateString, getDateParts, isValidDate } from '../../../utils/dateValidation';

export function DateCalculator() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [result, setResult] = useState<DateCalculationResult | null>(null);
  const [errors, setErrors] = useState<{ start?: string; end?: string }>({});
  const resultRef = React.useRef<HTMLDivElement>(null);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>, setter: (value: string) => void) => {
    const formattedValue = formatDateString(e.target.value);
    setter(formattedValue);
    setErrors({});
  };

  const validateDate = (dateStr: string, field: 'start' | 'end'): boolean => {
    const parts = getDateParts(dateStr);
    if (!parts) {
      setErrors(prev => ({ ...prev, [field]: 'Lütfen GG.AA.YYYY formatında giriniz' }));
      return false;
    }

    if (!isValidDate(parts.day, parts.month, parts.year)) {
      setErrors(prev => ({ ...prev, [field]: 'Geçersiz tarih' }));
      return false;
    }

    return true;
  };

  const validateDates = (start: string, end: string): boolean => {
    const isStartValid = validateDate(start, 'start');
    const isEndValid = validateDate(end, 'end');

    if (!isStartValid || !isEndValid) return false;

    const startParts = getDateParts(start)!;
    const endParts = getDateParts(end)!;
    
    const startDate = new Date(startParts.year, startParts.month - 1, startParts.day);
    const endDate = new Date(endParts.year, endParts.month - 1, endParts.day);

    if (endDate < startDate) {
      setErrors(prev => ({ ...prev, end: 'Bitiş tarihi başlangıç tarihinden önce olamaz' }));
      return false;
    }

    return true;
  };

  const parseDate = (dateStr: string): Date => {
    const parts = getDateParts(dateStr)!;
    return new Date(parts.year, parts.month - 1, parts.day);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    
    if (!startDate) {
      setErrors(prev => ({ ...prev, start: 'Başlangıç tarihi gerekli' }));
      return;
    }
    
    if (!endDate) {
      setErrors(prev => ({ ...prev, end: 'Bitiş tarihi gerekli' }));
      return;
    }

    if (validateDates(startDate, endDate)) {
      const calculationResult = calculateDaysBetween(
        parseDate(startDate),
        parseDate(endDate)
      );
      setResult(calculationResult);
      
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }, 100);
    }
  };

  const handleWhatsAppShare = () => {
    if (result && startDate && endDate) {
      const message = generateDateWhatsAppMessage({
        ...result,
        startDate,
        endDate
      });
      window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
    }
  };

  return (
    <main className="max-w-2xl mx-auto px-4 py-8 sm:py-12">
      <header className="text-center mb-8 sm:mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-50 rounded-2xl mb-6">
          <Calendar className="w-8 h-8 text-indigo-600" />
        </div>
        <h1 className="text-2xl font-semibold text-gray-900 mb-3">
          İki Tarih Arası Gün Hesaplama
        </h1>
        <p className="text-gray-600">
          İki tarih arasındaki gün sayısını detaylı olarak hesaplayın
        </p>
      </header>

      <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Başlangıç Tarihi
              </label>
              <input
                type="text"
                inputMode="numeric"
                placeholder="GG.AA.YYYY"
                value={startDate}
                onChange={(e) => handleDateChange(e, setStartDate)}
                className={`block w-full px-4 py-2.5 text-gray-900 border rounded-lg focus:ring-2 transition-colors text-center ${
                  errors.start 
                    ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                    : 'border-gray-200 focus:ring-indigo-500 focus:border-indigo-500'
                }`}
                maxLength={10}
              />
              {errors.start && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.start}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bitiş Tarihi
              </label>
              <input
                type="text"
                inputMode="numeric"
                placeholder="GG.AA.YYYY"
                value={endDate}
                onChange={(e) => handleDateChange(e, setEndDate)}
                className={`block w-full px-4 py-2.5 text-gray-900 border rounded-lg focus:ring-2 transition-colors text-center ${
                  errors.end 
                    ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                    : 'border-gray-200 focus:ring-indigo-500 focus:border-indigo-500'
                }`}
                maxLength={10}
              />
              {errors.end && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.end}
                </p>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white h-12 rounded-lg hover:bg-indigo-700 transition-colors duration-200 font-medium"
          >
            Hesapla
          </button>
        </form>

        <div ref={resultRef}>
          {result && (
            <DateSummary 
              result={result}
              startDate={startDate}
              endDate={endDate}
              onShare={handleWhatsAppShare}
            />
          )}
        </div>
      </div>

      <DateFAQ />
    </main>
  );
}