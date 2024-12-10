import React, { useState } from 'react';
import { Info, ChevronDown } from 'lucide-react';

export function InfoCard() {
  const [openItem, setOpenItem] = useState<string | null>(null);

  const handleToggle = (id: string) => {
    setOpenItem(openItem === id ? null : id);
  };

  return (
    <article className="bg-white rounded-2xl shadow-xl p-4 sm:p-8">
      <div className="flex items-center gap-3 mb-6">
        <Info className="w-5 h-5 text-indigo-600" />
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
          Kredi Kartı Ek Taksit Hakkında
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6">
        <div className="flex gap-3 p-4 bg-gray-50 rounded-lg">
          <div>
            <h3 className="font-medium text-gray-800 mb-1">Güncel Faiz Oranı</h3>
            <p className="text-gray-600 text-sm">
              2024 yılı için ek taksit faiz oranı %4.25 olarak belirlenmiştir.
            </p>
          </div>
        </div>

        <div className="flex gap-3 p-4 bg-gray-50 rounded-lg">
          <div>
            <h3 className="font-medium text-gray-800 mb-1">Hesaplama Yöntemi</h3>
            <p className="text-gray-600 text-sm">
              Ek taksit tutarı, kalan borç ve yeni vade üzerinden hesaplanır.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div 
          className="group bg-gray-50 rounded-lg cursor-pointer"
          onClick={() => handleToggle('1')}
        >
          <div className="flex items-center justify-between p-4">
            <span className="font-medium text-gray-700">Ek taksit nedir?</span>
            <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${openItem === '1' ? 'rotate-180' : ''}`} />
          </div>
          <div className={`px-4 overflow-hidden transition-all duration-200 ease-in-out ${openItem === '1' ? 'max-h-40 pb-4' : 'max-h-0'}`}>
            <p className="text-gray-600">
              Ek taksit, mevcut taksitli alışverişinizin taksit sayısını artırarak aylık ödeme tutarınızı düşürmenizi sağlayan bir bankacılık hizmetidir.
            </p>
          </div>
        </div>

        <div 
          className="group bg-gray-50 rounded-lg cursor-pointer"
          onClick={() => handleToggle('2')}
        >
          <div className="flex items-center justify-between p-4">
            <span className="font-medium text-gray-700">BSMV ve KKDF nedir?</span>
            <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${openItem === '2' ? 'rotate-180' : ''}`} />
          </div>
          <div className={`px-4 overflow-hidden transition-all duration-200 ease-in-out ${openItem === '2' ? 'max-h-40 pb-4' : 'max-h-0'}`}>
            <p className="text-gray-600">
              BSMV (Banka Sigorta Muameleleri Vergisi) ve KKDF (Kaynak Kullanımı Destekleme Fonu), kredi işlemlerinde uygulanan yasal kesintilerdir. Her ikisi de faiz tutarı üzerinden %15 oranında hesaplanır.
            </p>
          </div>
        </div>

        <div 
          className="group bg-gray-50 rounded-lg cursor-pointer"
          onClick={() => handleToggle('3')}
        >
          <div className="flex items-center justify-between p-4">
            <span className="font-medium text-gray-700">Ek taksit nasıl hesaplanır?</span>
            <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${openItem === '3' ? 'rotate-180' : ''}`} />
          </div>
          <div className={`px-4 overflow-hidden transition-all duration-200 ease-in-out ${openItem === '3' ? 'max-h-48 pb-4' : 'max-h-0'}`}>
            <p className="text-gray-600">
              Ek taksit tutarı, kalan borç üzerinden ek vade için belirlenen faiz oranı ile hesaplanır. Bu tutara BSMV ve KKDF eklenerek toplam maliyet belirlenir. Yeni aylık taksit tutarı, toplam borcun yeni vadeye bölünmesiyle bulunur.
            </p>
          </div>
        </div>

        <div 
          className="group bg-gray-50 rounded-lg cursor-pointer"
          onClick={() => handleToggle('4')}
        >
          <div className="flex items-center justify-between p-4">
            <span className="font-medium text-gray-700">Ek taksit ne zaman yapılabilir?</span>
            <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${openItem === '4' ? 'rotate-180' : ''}`} />
          </div>
          <div className={`px-4 overflow-hidden transition-all duration-200 ease-in-out ${openItem === '4' ? 'max-h-48 pb-4' : 'max-h-0'}`}>
            <p className="text-gray-600">
              Ek taksit genellikle mevcut taksitli işlemin ilk taksiti ödendikten sonra yapılabilir. Her banka farklı koşullar sunabilir, bu nedenle bankanızın özel şartlarını kontrol etmeniz önerilir.
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}