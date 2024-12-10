import React, { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import { formatCurrency } from '../../../utils/formatters';
import type { RentTaxInput } from '../../../types/rentTax';

interface RentTaxFormProps {
  onCalculate: (input: RentTaxInput) => void;
}

const INITIAL_FORM_DATA: RentTaxInput = {
  yearlyRentIncome: '',
  hasExpenses: false,
  expenseType: 'goturu',
  realExpenseAmount: '',
  isNewlyStarted: false,
  monthCount: 12,
  taxYear: '2024',
  incomeType: 'konut',
  hasExemption: true,
  otherIncome: '',
  willDeclareOtherIncome: false,
  lossFromPreviousPeriod: '',
  donations: ''
};

export function RentTaxForm({ onCalculate }: RentTaxFormProps) {
  const [formData, setFormData] = useState<RentTaxInput>(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<Partial<Record<keyof RentTaxInput, string>>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (type === 'radio') {
      setFormData(prev => ({ ...prev, [name]: value }));
    } else if (['yearlyRentIncome', 'realExpenseAmount', 'otherIncome', 'lossFromPreviousPeriod', 'donations'].includes(name)) {
      // Remove non-numeric characters and format
      const numericValue = value.replace(/[^\d]/g, '');
      setFormData(prev => ({ ...prev, [name]: numericValue }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }

    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof RentTaxInput, string>> = {};

    if (!formData.yearlyRentIncome) {
      newErrors.yearlyRentIncome = 'Yıllık kira tutarı zorunludur';
    }
    if (!formData.taxYear) {
      newErrors.taxYear = 'Gelir yılı seçilmelidir';
    }
    if (!formData.incomeType) {
      newErrors.incomeType = 'Gelir kaynağı seçilmelidir';
    }
    if (!formData.expenseType) {
      newErrors.expenseType = 'Gider türü seçilmelidir';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onCalculate(formData);
    }
  };

  const formatInputValue = (value: string) => {
    if (!value) return '';
    const number = parseInt(value, 10);
    return number ? number.toLocaleString('tr-TR') : '';
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <span className="text-red-500">*</span> Gelir Yılı
        </label>
        <select
          name="taxYear"
          value={formData.taxYear}
          onChange={handleInputChange}
          className="block w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="2024">2024 (Beyan Dönemi: Mart 2025)</option>
          <option value="2023">2023 (Beyan Dönemi: Mart 2024)</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <span className="text-red-500">*</span> Gelir Kaynakları
        </label>
        <select
          name="incomeType"
          value={formData.incomeType}
          onChange={handleInputChange}
          className="block w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="konut">Sadece Konut Kira Geliri</option>
          <option value="isyeri">Sadece İş Yeri Kira Geliri</option>
          <option value="karma">Konut ve İş Yeri Kira Geliri</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <span className="text-red-500">*</span> Gider Türü
        </label>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="radio"
              name="expenseType"
              value="gercek"
              checked={formData.expenseType === 'gercek'}
              onChange={handleInputChange}
              className="form-radio text-indigo-600"
            />
            <span className="ml-2">Gerçek Gider</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="expenseType"
              value="goturu"
              checked={formData.expenseType === 'goturu'}
              onChange={handleInputChange}
              className="form-radio text-indigo-600"
            />
            <span className="ml-2">Götürü Gider (%15)</span>
          </label>
        </div>
      </div>

      <div>
        <label className="flex items-center mb-4">
          <input
            type="checkbox"
            name="hasExemption"
            checked={formData.hasExemption}
            onChange={handleInputChange}
            className="form-checkbox text-indigo-600 rounded"
          />
          <span className="ml-2 text-sm text-gray-700">
            2024 yılı için 33.000 TL konut kira geliri istisnasından yararlanıyorum
          </span>
        </label>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <span className="text-red-500">*</span> Yıllık Toplam Kira Geliri
        </label>
        <div className="relative">
          <input
            type="text"
            name="yearlyRentIncome"
            value={formatInputValue(formData.yearlyRentIncome)}
            onChange={handleInputChange}
            placeholder="0"
            className={`block w-full pl-3 pr-12 py-2 border rounded-lg focus:ring-2 transition-colors text-right ${
              errors.yearlyRentIncome
                ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                : 'border-gray-200 focus:ring-indigo-500 focus:border-indigo-500'
            }`}
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <span className="text-gray-500">₺</span>
          </div>
        </div>
        {errors.yearlyRentIncome && (
          <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            {errors.yearlyRentIncome}
          </p>
        )}
        <p className="mt-1 text-xs text-gray-500">Örn. 120.000</p>
      </div>

      {formData.expenseType === 'gercek' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Gerçek Gider Tutarı
          </label>
          <div className="relative">
            <input
              type="text"
              name="realExpenseAmount"
              value={formatInputValue(formData.realExpenseAmount)}
              onChange={handleInputChange}
              placeholder="0"
              className="block w-full pl-3 pr-12 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-right"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <span className="text-gray-500">₺</span>
            </div>
          </div>
          <p className="mt-1 text-xs text-gray-500">Örn. 12.350</p>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Kira Harici Vergiye Tabi Gelir
        </label>
        <div className="relative">
          <input
            type="text"
            name="otherIncome"
            value={formatInputValue(formData.otherIncome)}
            onChange={handleInputChange}
            placeholder="0"
            className="block w-full pl-3 pr-12 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-right"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <span className="text-gray-500">₺</span>
          </div>
        </div>
        <p className="mt-1 text-xs text-gray-500">Örn. 76.300</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <span className="text-red-500">*</span> Kira Harici Gelir Beyanı
        </label>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="radio"
              name="willDeclareOtherIncome"
              value="false"
              checked={!formData.willDeclareOtherIncome}
              onChange={(e) => setFormData(prev => ({ ...prev, willDeclareOtherIncome: false }))}
              className="form-radio text-indigo-600"
            />
            <span className="ml-2">Vermeyeceğim</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="willDeclareOtherIncome"
              value="true"
              checked={formData.willDeclareOtherIncome}
              onChange={(e) => setFormData(prev => ({ ...prev, willDeclareOtherIncome: true }))}
              className="form-radio text-indigo-600"
            />
            <span className="ml-2">Vereceğim</span>
          </label>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Devreden Zarar Tutarı
        </label>
        <div className="relative">
          <input
            type="text"
            name="lossFromPreviousPeriod"
            value={formatInputValue(formData.lossFromPreviousPeriod)}
            onChange={handleInputChange}
            placeholder="0"
            className="block w-full pl-3 pr-12 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-right"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <span className="text-gray-500">₺</span>
          </div>
        </div>
        <p className="mt-1 text-xs text-gray-500">Örn. 7.450</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Makbuzlu Yapılan Bağışlar
        </label>
        <div className="relative">
          <input
            type="text"
            name="donations"
            value={formatInputValue(formData.donations)}
            onChange={handleInputChange}
            placeholder="0"
            className="block w-full pl-3 pr-12 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-right"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <span className="text-gray-500">₺</span>
          </div>
        </div>
        <p className="mt-1 text-xs text-gray-500">Örn. 3.250</p>
      </div>

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white h-12 rounded-lg hover:bg-indigo-700 transition-colors duration-200 font-medium"
      >
        Hesapla
      </button>
    </form>
  );
}