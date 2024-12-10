import React, { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import { INSTALLMENT_OPTIONS } from '../../utils/creditCard/calculations';
import { formatInputValue } from '../../utils/formatters';

interface InstallmentFormProps {
  onCalculate: (amount: number, currentInstallments: number, newInstallments: number) => void;
  hasResult: boolean;
}

export function InstallmentForm({ onCalculate, hasResult }: InstallmentFormProps) {
  const [amount, setAmount] = useState('');
  const [currentInstallments, setCurrentInstallments] = useState<number>(0);
  const [newInstallments, setNewInstallments] = useState<number>(0);
  const [errors, setErrors] = useState<{
    amount?: string;
    currentInstallments?: string;
    newInstallments?: string;
  }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    if (!amount) {
      setErrors(prev => ({ ...prev, amount: 'Tutar girilmesi zorunludur' }));
      return;
    }

    if (!currentInstallments) {
      setErrors(prev => ({ ...prev, currentInstallments: 'Mevcut taksit sayısı seçilmelidir' }));
      return;
    }

    if (!newInstallments) {
      setErrors(prev => ({ ...prev, newInstallments: 'Yeni taksit sayısı seçilmelidir' }));
      return;
    }

    if (newInstallments <= currentInstallments) {
      setErrors(prev => ({ ...prev, newInstallments: 'Yeni taksit sayısı mevcut taksit sayısından büyük olmalıdır' }));
      return;
    }

    const numericAmount = parseFloat(amount.replace(/[.,]/g, ''));
    if (isNaN(numericAmount) || numericAmount <= 0) {
      setErrors(prev => ({ ...prev, amount: 'Geçerli bir tutar giriniz' }));
      return;
    }

    onCalculate(numericAmount, currentInstallments, newInstallments);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <span className="text-red-500">*</span> Taksitli İşlem Tutarı (Kalan Borç)
        </label>
        <div className="relative">
          <input
            type="text"
            value={formatInputValue(amount)}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0"
            className={`block w-full pl-3 pr-12 py-2 border rounded-lg focus:ring-2 transition-colors text-right ${
              errors.amount
                ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                : 'border-gray-200 focus:ring-indigo-500 focus:border-indigo-500'
            }`}
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <span className="text-gray-500">₺</span>
          </div>
        </div>
        {errors.amount && (
          <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            {errors.amount}
          </p>
        )}
        <p className="mt-1 text-xs text-gray-500">Örn. 10.000</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <span className="text-red-500">*</span> Mevcut Taksit Sayısı
        </label>
        <select
          value={currentInstallments}
          onChange={(e) => setCurrentInstallments(Number(e.target.value))}
          className={`block w-full px-3 py-2 border rounded-lg focus:ring-2 transition-colors ${
            errors.currentInstallments
              ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
              : 'border-gray-200 focus:ring-indigo-500 focus:border-indigo-500'
          }`}
        >
          <option value={0}>Seçiniz</option>
          {INSTALLMENT_OPTIONS.map(option => (
            <option key={option.months} value={option.months}>
              {option.months} Taksit - %{option.interestRate} Faiz
            </option>
          ))}
        </select>
        {errors.currentInstallments && (
          <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            {errors.currentInstallments}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <span className="text-red-500">*</span> Yeni Taksit Sayısı
        </label>
        <select
          value={newInstallments}
          onChange={(e) => setNewInstallments(Number(e.target.value))}
          className={`block w-full px-3 py-2 border rounded-lg focus:ring-2 transition-colors ${
            errors.newInstallments
              ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
              : 'border-gray-200 focus:ring-indigo-500 focus:border-indigo-500'
          }`}
        >
          <option value={0}>Seçiniz</option>
          {INSTALLMENT_OPTIONS.map(option => (
            <option key={option.months} value={option.months}>
              {option.months} Taksit - %{option.interestRate} Faiz
            </option>
          ))}
        </select>
        {errors.newInstallments && (
          <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            {errors.newInstallments}
          </p>
        )}
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