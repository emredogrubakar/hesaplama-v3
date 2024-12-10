import React from 'react';
import { Link } from 'react-router-dom';
import { calculators } from '../config/calculatorCategories';

export function Footer() {
  const categories = [
    {
      title: 'Finans',
      items: calculators.filter(calc => calc.category === 'finance')
    },
    {
      title: 'Tarih',
      items: calculators.filter(calc => calc.category === 'date')
    },
    {
      title: 'Matematik',
      items: calculators.filter(calc => calc.category === 'math')
    },
    {
      title: 'Sağlık',
      items: calculators.filter(calc => calc.category === 'health')
    }
  ];

  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {categories.map(category => (
            <div key={category.title}>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">
                {category.title}
              </h3>
              <ul className="space-y-2">
                {category.items.map(item => (
                  <li key={item.id}>
                    <Link
                      to={item.path}
                      className="text-sm text-gray-600 hover:text-gray-900"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 pt-8 border-t border-gray-100">
          <div className="text-center text-sm text-gray-500">
            <p>© {new Date().getFullYear()} Hesapio.com - Tüm hakları saklıdır.</p>
            <p className="mt-1">
              Bu sitedeki hesaplamalar bilgilendirme amaçlıdır. Kesin sonuçlar için lütfen ilgili uzmanlara danışınız.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}