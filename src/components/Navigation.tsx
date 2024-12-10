import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Calculator } from 'lucide-react';
import { categories, calculators } from '../config/calculatorCategories';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <Calculator className="w-6 h-6 text-indigo-600" />
            <span className="text-lg font-semibold text-gray-900">
              Hesapio.com
            </span>
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          {/* Desktop Categories */}
          <div className="hidden lg:flex space-x-4">
            {categories.map(category => (
              <div key={category.id} className="relative group">
                <button className="px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50">
                  {category.title}
                </button>
                <div className="absolute left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="py-2">
                    {calculators
                      .filter(calc => calc.category === category.id)
                      .map(calculator => (
                        <Link
                          key={calculator.id}
                          to={calculator.path}
                          className={`flex items-center px-4 py-2 text-sm ${
                            location.pathname === calculator.path
                              ? 'text-indigo-600 bg-indigo-50'
                              : 'text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          <calculator.icon className="w-4 h-4 mr-2" />
                          {calculator.title}
                        </Link>
                      ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="lg:hidden border-t border-gray-100">
          {/* Mobile Categories */}
          <div className="py-2">
            {categories.map(category => (
              <div key={category.id} className="px-4">
                <div className="py-2 font-medium text-gray-900">
                  {category.title}
                </div>
                <div className="ml-4 space-y-1">
                  {calculators
                    .filter(calc => calc.category === category.id)
                    .map(calculator => (
                      <Link
                        key={calculator.id}
                        to={calculator.path}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center py-2 text-sm ${
                          location.pathname === calculator.path
                            ? 'text-indigo-600'
                            : 'text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        <calculator.icon className="w-4 h-4 mr-2" />
                        {calculator.title}
                      </Link>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}