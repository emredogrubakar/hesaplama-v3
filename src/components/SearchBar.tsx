import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { calculators } from '../config/calculatorCategories';

interface SearchBarProps {
  className?: string;
  onClose?: () => void;
  placeholder?: string;
}

export function SearchBar({ className = '', onClose, placeholder = 'Hesaplama aracı ara...' }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(calculators);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const filtered = calculators.filter(calc => 
      calc.title.toLowerCase().includes(query.toLowerCase()) ||
      calc.description.toLowerCase().includes(query.toLowerCase())
    );
    setResults(filtered);
  }, [query]);

  const handleLinkClick = () => {
    setQuery('');
    onClose?.();
  };

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-12 pr-4 py-4 text-gray-900 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors text-lg shadow-sm"
        />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 text-gray-400" />
      </div>

      {query && (
        <div className="absolute z-50 w-full mt-2 bg-white rounded-lg shadow-lg border border-gray-100 max-h-96 overflow-y-auto">
          {results.length > 0 ? (
            <div className="py-2">
              {results.map(calc => (
                <Link
                  key={calc.id}
                  to={calc.path}
                  onClick={handleLinkClick}
                  className="flex items-center px-4 py-3 hover:bg-gray-50"
                >
                  <calc.icon className="w-5 h-5 text-gray-500 flex-shrink-0" />
                  <div className="ml-3">
                    <div className="text-sm font-medium text-gray-900">{calc.title}</div>
                    <div className="text-xs text-gray-500">{calc.description}</div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="px-4 py-3 text-sm text-gray-500">
              Sonuç bulunamadı
            </div>
          )}
        </div>
      )}
    </div>
  );
}