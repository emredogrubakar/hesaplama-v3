import React from 'react';
import { formatNumber } from '../utils/formatters';
import type { TaxBracket } from '../types/rentTax';

interface TaxBracketsTableProps {
  brackets: TaxBracket[];
}

export function TaxBracketsTable({ brackets }: TaxBracketsTableProps) {
  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <h4 className="font-medium text-gray-900 mb-4">2024 Vergi Dilimleri</h4>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-2 px-3 text-gray-600 font-medium">Gelir Aralığı</th>
              <th className="text-right py-2 px-3 text-gray-600 font-medium">Vergi Oranı</th>
              <th className="text-right py-2 px-3 text-gray-600 font-medium">Sabit Tutar</th>
            </tr>
          </thead>
          <tbody>
            {brackets.map((bracket, index) => {
              const prevLimit = index === 0 ? 0 : brackets[index - 1].limit;
              const isLastBracket = bracket.limit === Infinity;
              
              return (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-100 transition-colors">
                  <td className="py-2 px-3">
                    {isLastBracket ? (
                      `${formatNumber(3000000)} TL üzeri`
                    ) : index === 0 ? (
                      `0 TL - ${formatNumber(bracket.limit)} TL arası`
                    ) : (
                      `${formatNumber(prevLimit)} TL - ${formatNumber(bracket.limit)} TL arası`
                    )}
                  </td>
                  <td className="text-right py-2 px-3">%{bracket.rate * 100}</td>
                  <td className="text-right py-2 px-3">{formatNumber(bracket.baseAmount)} TL</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}