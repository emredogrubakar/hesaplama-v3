import React, { useState } from 'react';
import { Info, ChevronDown } from 'lucide-react';

export function SunSignFAQ() {
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
            <span className="font-medium text-gray-700">Güneş burcu nedir?</span>
            <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${openItem === '1' ? 'rotate-180' : ''}`} />
          </div>
          <div className={`px-4 overflow-hidden transition-all duration-200 ease-in-out ${openItem === '1' ? 'max-h-40 pb-4' : 'max-h-0'}`}>
            <p className="text-gray-600">
              Güneş burcu, doğduğunuz anda Güneş'in zodyakta hangi burçta olduğunu gösterir. Kişiliğinizin temel özelliklerini ve yaşam enerjinizi simgeler.
            </p>
          </div>
        </div>

        <div 
          className="group bg-gray-50 rounded-lg cursor-pointer"
          onClick={() => handleToggle('2')}
        >
          <div className="flex items-center justify-between p-4">
            <span className="font-medium text-gray-700">Güneş burcumu nasıl hesaplarım?</span>
            <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${openItem === '2' ? 'rotate-180' : ''}`} />
          </div>
          <div className={`px-4 overflow-hidden transition-all duration-200 ease-in-out ${openItem === '2' ? 'max-h-48 pb-4' : 'max-h-0'}`}>
            <p className="text-gray-600">
              Güneş burcu doğum tarihinizle hesaplanır. Zodyak kuşağında Güneş'in 12 burçtan birine girdiği tarih aralıklarına bakılır. Sınır tarihlerde doğduysanız, Güneş'in tam olarak hangi saatte burç değiştirdiğini anlamak için doğum saatinizi bilmeniz gerekebilir.
            </p>
          </div>
        </div>

        <div 
          className="group bg-gray-50 rounded-lg cursor-pointer"
          onClick={() => handleToggle('3')}
        >
          <div className="flex items-center justify-between p-4">
            <span className="font-medium text-gray-700">Burçlar her yıl aynı mı kalır?</span>
            <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${openItem === '3' ? 'rotate-180' : ''}`} />
          </div>
          <div className={`px-4 overflow-hidden transition-all duration-200 ease-in-out ${openItem === '3' ? 'max-h-48 pb-4' : 'max-h-0'}`}>
            <p className="text-gray-600">
              Güneş'in burç değiştirdiği tarihler yıldan yıla birkaç saat fark edebilir. Bu yüzden 20 Mart, 21 Haziran gibi sınır tarihlerde doğanların detaylı hesaplama yapması gerekir.
            </p>
          </div>
        </div>

        <div 
          className="group bg-gray-50 rounded-lg cursor-pointer"
          onClick={() => handleToggle('4')}
        >
          <div className="flex items-center justify-between p-4">
            <span className="font-medium text-gray-700">Hangi burçlar birbiriyle uyumludur?</span>
            <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${openItem === '4' ? 'rotate-180' : ''}`} />
          </div>
          <div className={`px-4 overflow-hidden transition-all duration-200 ease-in-out ${openItem === '4' ? 'max-h-48 pb-4' : 'max-h-0'}`}>
            <p className="text-gray-600">
              Uyum, elementler (Ateş, Toprak, Hava, Su) ve burçların özelliklerine dayanır. Örneğin, Ateş burçları (Koç, Aslan, Yay) genelde diğer ateş ve hava burçlarıyla, Toprak burçları (Boğa, Başak, Oğlak) su burçlarıyla iyi anlaşır.
            </p>
          </div>
        </div>

        <div 
          className="group bg-gray-50 rounded-lg cursor-pointer"
          onClick={() => handleToggle('5')}
        >
          <div className="flex items-center justify-between p-4">
            <span className="font-medium text-gray-700">Burcum kaderimi belirler mi?</span>
            <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${openItem === '5' ? 'rotate-180' : ''}`} />
          </div>
          <div className={`px-4 overflow-hidden transition-all duration-200 ease-in-out ${openItem === '5' ? 'max-h-40 pb-4' : 'max-h-0'}`}>
            <p className="text-gray-600">
              Hayır, burçlar sadece karakterinizin bazı yönlerini anlamanızı sağlar. Hayatınızı etkileyen asıl şey, yaptığınız seçimlerdir. Astroloji, olasılıkları anlamanız için bir rehberdir.
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}