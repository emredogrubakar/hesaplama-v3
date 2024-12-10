import React, { useState } from 'react';
import { Info, ChevronDown } from 'lucide-react';

export function RentTaxInfo() {
  const [openItem, setOpenItem] = useState<string | null>(null);

  const handleToggle = (id: string) => {
    setOpenItem(openItem === id ? null : id);
  };

  return (
    <article className="bg-white rounded-2xl shadow-xl p-4 sm:p-8">
      <div className="flex items-center gap-3 mb-6">
        <Info className="w-5 h-5 text-indigo-600" />
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
          Kira Geliri Vergisi Hakkında
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6">
        <div className="flex gap-3 p-4 bg-gray-50 rounded-lg">
          <div>
            <h3 className="font-medium text-gray-800 mb-1">2024 İstisna Tutarı</h3>
            <p className="text-gray-600 text-sm">
              2024 yılı için konut kira geliri istisnası 21.000 TL olarak belirlenmiştir.
            </p>
          </div>
        </div>

        <div className="flex gap-3 p-4 bg-gray-50 rounded-lg">
          <div>
            <h3 className="font-medium text-gray-800 mb-1">Vergi Dilimleri</h3>
            <p className="text-gray-600 text-sm">
              2024 yılı için %15 ile %40 arasında değişen artan oranlı vergi tarifesi uygulanır.
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
            <span className="font-medium text-gray-700">Kira geliri vergisi nedir?</span>
            <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${openItem === '1' ? 'rotate-180' : ''}`} />
          </div>
          <div className={`px-4 overflow-hidden transition-all duration-200 ease-in-out ${openItem === '1' ? 'max-h-40 pb-4' : 'max-h-0'}`}>
            <p className="text-gray-600">
              Gayrimenkul sermaye iradı olarak da bilinen kira geliri vergisi, konut veya işyeri kiraya verilmesi sonucu elde edilen gelirler üzerinden ödenen vergidir.
            </p>
          </div>
        </div>

        <div 
          className="group bg-gray-50 rounded-lg cursor-pointer"
          onClick={() => handleToggle('2')}
        >
          <div className="flex items-center justify-between p-4">
            <span className="font-medium text-gray-700">İstisna tutarı ne demektir?</span>
            <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${openItem === '2' ? 'rotate-180' : ''}`} />
          </div>
          <div className={`px-4 overflow-hidden transition-all duration-200 ease-in-out ${openItem === '2' ? 'max-h-40 pb-4' : 'max-h-0'}`}>
            <p className="text-gray-600">
              İstisna tutarı, konut kira gelirlerinde vergi hesaplanmayan kısımdır. 2024 yılı için bu tutar 21.000 TL'dir. İşyeri kira gelirlerinde istisna uygulanmaz.
            </p>
          </div>
        </div>

        <div 
          className="group bg-gray-50 rounded-lg cursor-pointer"
          onClick={() => handleToggle('3')}
        >
          <div className="flex items-center justify-between p-4">
            <span className="font-medium text-gray-700">Götürü ve gerçek gider nedir?</span>
            <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${openItem === '3' ? 'rotate-180' : ''}`} />
          </div>
          <div className={`px-4 overflow-hidden transition-all duration-200 ease-in-out ${openItem === '3' ? 'max-h-48 pb-4' : 'max-h-0'}`}>
            <p className="text-gray-600">
              Götürü gider, kira gelirinin %15'i oranında uygulanan standart gider yöntemidir. Gerçek gider ise, kira geliri ile ilgili olarak yapılan ve belgelendirilebilen giderlerin (bakım, onarım, sigorta vb.) toplam tutarıdır.
            </p>
          </div>
        </div>

        <div 
          className="group bg-gray-50 rounded-lg cursor-pointer"
          onClick={() => handleToggle('4')}
        >
          <div className="flex items-center justify-between p-4">
            <span className="font-medium text-gray-700">Beyanname ne zaman verilir?</span>
            <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${openItem === '4' ? 'rotate-180' : ''}`} />
          </div>
          <div className={`px-4 overflow-hidden transition-all duration-200 ease-in-out ${openItem === '4' ? 'max-h-48 pb-4' : 'max-h-0'}`}>
            <p className="text-gray-600">
              Kira geliri beyannamesi, gelirin elde edildiği yılı takip eden yılın Mart ayının son gününe kadar verilmelidir. Örneğin, 2024 yılı kira gelirleri için beyanname 2025 yılı Mart ayının son gününe kadar verilmelidir.
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}