import React, { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import type { GeometricShape } from '../../types/geometry';

interface GeometryFormProps {
  shapes: GeometricShape[];
  onCalculate: (shape: GeometricShape, inputs: Record<string, number>) => void;
  hasResult: boolean;
}

export function GeometryForm({ shapes, onCalculate, hasResult }: GeometryFormProps) {
  const [selectedShape, setSelectedShape] = useState<GeometricShape | null>(null);
  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleShapeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const shape = shapes.find(s => s.name === e.target.value);
    setSelectedShape(shape || null);
    setInputs({});
    setErrors({});
  };

  const handleInputChange = (field: string, value: string) => {
    setInputs(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const validateInputs = (): boolean => {
    if (!selectedShape) {
      setErrors({ shape: 'Lütfen bir şekil seçin' });
      return false;
    }

    const newErrors: Record<string, string> = {};
    let isValid = true;

    selectedShape.fields.forEach(field => {
      const value = parseFloat(inputs[field.name]);
      if (!inputs[field.name]) {
        newErrors[field.name] = `${field.label} girilmelidir`;
        isValid = false;
      } else if (isNaN(value) || value <= 0) {
        newErrors[field.name] = `Geçerli bir ${field.label.toLowerCase()} giriniz`;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateInputs() && selectedShape) {
      const numericInputs = Object.fromEntries(
        Object.entries(inputs).map(([key, value]) => [key, parseFloat(value)])
      );
      onCalculate(selectedShape, numericInputs);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <span className="text-red-500">*</span> Geometrik Şekil
        </label>
        <select
          value={selectedShape?.name || ''}
          onChange={handleShapeChange}
          className={`block w-full px-3 py-2 border rounded-lg focus:ring-2 transition-colors ${
            errors.shape
              ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
              : 'border-gray-200 focus:ring-indigo-500 focus:border-indigo-500'
          }`}
        >
          <option value="">Seçiniz</option>
          {shapes.map(shape => (
            <option key={shape.name} value={shape.name}>{shape.name}</option>
          ))}
        </select>
        {errors.shape && (
          <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            {errors.shape}
          </p>
        )}
      </div>

      {selectedShape && (
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="text-sm text-gray-600 mb-4">
            <p>{selectedShape.description}</p>
            <p className="mt-1 font-medium">Formül: {selectedShape.formula}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {selectedShape.fields.map(field => (
              <div key={field.name}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <span className="text-red-500">*</span> {field.label}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    inputMode="decimal"
                    value={inputs[field.name] || ''}
                    onChange={(e) => handleInputChange(field.name, e.target.value)}
                    placeholder="0"
                    className={`block w-full pl-3 pr-12 py-2 border rounded-lg focus:ring-2 transition-colors text-right ${
                      errors[field.name]
                        ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                        : 'border-gray-200 focus:ring-indigo-500 focus:border-indigo-500'
                    }`}
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <span className="text-gray-500">{field.unit}</span>
                  </div>
                </div>
                {errors[field.name] && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors[field.name]}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
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