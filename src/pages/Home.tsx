import React from 'react';
import { Link } from 'react-router-dom';
import { Calculator, CalendarDays, CalendarRange, Percent, Home as HomeIcon, CreditCard, Sparkles, Ruler, Box, Weight } from 'lucide-react';
import { SEO } from '../components/SEO';
import { SearchBar } from '../components/SearchBar';

export function Home() {
  const tools = [
    {
      icon: Calculator,
      title: 'Kurumlar Vergisi',
      description: '2024 yılı güncel oranlarıyla kurumlar vergisi hesaplama',
      path: '/kurumlar-vergisi-hesaplama'
    },
    {
      icon: HomeIcon,
      title: 'Kira Geliri Vergisi',
      description: '2024 yılı kira geliri vergisi hesaplama',
      path: '/kira-geliri-vergisi-hesaplama'
    },
    {
      icon: CreditCard,
      title: 'Taksit Hesaplama',
      description: 'Kredi kartı taksit tutarı ve toplam ödeme hesaplama',
      path: '/kredi-karti-taksit-hesaplama'
    },
    {
      icon: CalendarDays,
      title: 'Gün Hesaplama',
      description: 'İki tarih arası gün sayısı hesaplama',
      path: '/iki-tarih-arasi-gun-hesaplama'
    },
    {
      icon: CalendarRange,
      title: 'Ay Hesaplama',
      description: 'İki tarih arası ay sayısı hesaplama',
      path: '/iki-tarih-arasi-ay-hesaplama'
    },
    {
      icon: Sparkles,
      title: 'Güneş Burcu',
      description: 'Doğum tarihinize göre güneş burcu hesaplama',
      path: '/gunes-burcu-hesaplama'
    },
    {
      icon: Ruler,
      title: 'Alan Hesaplama',
      description: 'Geometrik şekillerin alan hesaplamaları',
      path: '/alan-hesaplama'
    },
    {
      icon: Box,
      title: 'Hacim Hesaplama',
      description: 'Geometrik cisimlerin hacim hesaplamaları',
      path: '/hacim-hesaplama'
    },
    {
      icon: Weight,
      title: 'Vücut Kitle İndeksi',
      description: 'Vücut kitle indeksi hesaplama ve ideal kilo analizi',
      path: '/vucut-kitle-indeksi-hesaplama'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:py-16">
      <header className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Hesapio - Online Hesaplama Araçları
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
          Vergi, tarih, finans ve daha fazlası için ücretsiz online hesaplama araçları
        </p>
        <div className="max-w-3xl mx-auto">
          <SearchBar 
            placeholder="Hesaplama aracı ara... (örn: vergi, tarih, alan)" 
            className="text-lg"
          />
        </div>
      </header>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map(({ icon: Icon, title, description, path }) => (
          <Link
            key={path}
            to={path}
            className="group relative bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden"
          >
            <div className="p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-indigo-50 mb-4 group-hover:scale-110 transition-transform">
                <Icon className="w-8 h-8 text-indigo-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {title}
              </h2>
              <p className="text-gray-600">
                {description}
              </p>
            </div>
            <div className="absolute inset-x-0 bottom-0 h-1 bg-indigo-500 transform scale-x-0 group-hover:scale-x-100 transition-transform" />
          </Link>
        ))}
      </div>
    </div>
  );
}