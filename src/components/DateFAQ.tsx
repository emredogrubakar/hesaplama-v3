import React, { useState } from 'react';
import { ChevronDown, Info } from 'lucide-react';

export function DateFAQ() {
  const [openItem, setOpenItem] = useState<string | null>(null);

  const handleToggle = (id: string) => {
    setOpenItem(openItem === id ? null : id);
  };

  return (
    <article className="bg-white rounded-2xl shadow-xl p-4 sm:p-8 mt-8">
      <div className="flex items-center gap-3 mb-6">
        <Info className="w-5 h-5 text-indigo-600" />
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
          Sıkça Sorulan Sorular
        </h2>
      </div>

      <div className="space-y-3">
        <div 
          className="group bg-gray-50 rounded-lg cursor-pointer"
          onClick={() => handleToggle('1')}
        >
          <div className="flex items-center justify-between p-4">
            <span className="font-medium text-gray-700">İş günü hesaplaması nasıl yapılır?</span>
            <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${openItem === '1' ? 'rotate-180' : ''}`} />
          </div>
          <div className={`px-4 overflow-hidden transition-all duration-200 ease-in-out ${openItem === '1' ? 'max-h-40 pb-4' : 'max-h-0'}`}>
            <p className="text-gray-600">
              İş günü hesaplaması, iki tarih arasındaki toplam günlerden hafta sonları (Cumartesi ve Pazar) çıkarılarak yapılır. Resmi tatiller bu hesaplamaya dahil değildir.
            </p>
          </div>
        </div>

        <div 
          className="group bg-gray-50 rounded-lg cursor-pointer"
          onClick={() => handleToggle('2')}
        >
          <div className="flex items-center justify-between p-4">
            <span className="font-medium text-gray-700">Tarih aralığı hesaplamasında hangi günler dahil edilir?</span>
            <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${openItem === '2' ? 'rotate-180' : ''}`} />
          </div>
          <div className={`px-4 overflow-hidden transition-all duration-200 ease-in-out ${openItem === '2' ? 'max-h-40 pb-4' : 'max-h-0'}`}>
            <p className="text-gray-600">
              Tarih aralığı hesaplamasında başlangıç ve bitiş tarihleri dahil olmak üzere aradaki tüm günler hesaplamaya dahil edilir. Örneğin, 1-5 Ocak arasında 5 gün vardır.
            </p>
          </div>
        </div>

        <div 
          className="group bg-gray-50 rounded-lg cursor-pointer"
          onClick={() => handleToggle('3')}
        >
          <div className="flex items-center justify-between p-4">
            <span className="font-medium text-gray-700">Hafta sonu günleri nasıl hesaplanır?</span>
            <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${openItem === '3' ? 'rotate-180' : ''}`} />
          </div>
          <div className={`px-4 overflow-hidden transition-all duration-200 ease-in-out ${openItem === '3' ? 'max-h-40 pb-4' : 'max-h-0'}`}>
            <p className="text-gray-600">
              Hafta sonu hesaplaması, seçilen tarih aralığındaki Cumartesi ve Pazar günlerinin sayılmasıyla yapılır. Bu günler otomatik olarak tespit edilir ve toplam gün sayısından ayrı olarak gösterilir.
            </p>
          </div>
        </div>

        <div 
          className="group bg-gray-50 rounded-lg cursor-pointer"
          onClick={() => handleToggle('4')}
        >
          <div className="flex items-center justify-between p-4">
            <span className="font-medium text-gray-700">Yıl, ay ve hafta cinsinden süre nasıl hesaplanır?</span>
            <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${openItem === '4' ? 'rotate-180' : ''}`} />
          </div>
          <div className={`px-4 overflow-hidden transition-all duration-200 ease-in-out ${openItem === '4' ? 'max-h-48 pb-4' : 'max-h-0'}`}>
            <p className="text-gray-600">
              Toplam gün sayısı önce yıllara (365 gün), sonra aylara (30 gün) ve haftalara (7 gün) bölünerek hesaplanır. Kalan günler ayrıca gösterilir. Bu şekilde daha anlaşılır bir süre gösterimi sağlanır.
            </p>
          </div>
        </div>

        <div 
          className="group bg-gray-50 rounded-lg cursor-pointer"
          onClick={() => handleToggle('5')}
        >
          <div className="flex items-center justify-between p-4">
            <span className="font-medium text-gray-700">Tarih hesaplama sonuçlarını nasıl paylaşabilirim?</span>
            <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${openItem === '5' ? 'rotate-180' : ''}`} />
          </div>
          <div className={`px-4 overflow-hidden transition-all duration-200 ease-in-out ${openItem === '5' ? 'max-h-40 pb-4' : 'max-h-0'}`}>
            <p className="text-gray-600">
              Hesaplama sonuçlarını WhatsApp üzerinden paylaşabilir veya kopyalayarak istediğiniz platformda kullanabilirsiniz. Paylaşılan sonuçlar tarih aralığı, toplam gün, iş günü ve hafta sonu bilgilerini içerir.
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}