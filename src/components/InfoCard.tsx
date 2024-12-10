import React, { useState } from 'react';
import { Info, Calendar, Calculator, AlertTriangle, ChevronDown } from 'lucide-react';

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
          Kurumlar Vergisi Hakkında
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6">
        <div className="flex gap-3 p-4 bg-gray-50 rounded-lg">
          <Calendar className="w-5 h-5 text-indigo-600 flex-shrink-0" />
          <div>
            <h3 className="font-medium text-gray-800 mb-1">2024 Vergi Oranı</h3>
            <p className="text-gray-600 text-sm">
              2024 yılı için kurumlar vergisi oranı %25 olarak belirlenmiştir.
            </p>
          </div>
        </div>

        <div className="flex gap-3 p-4 bg-gray-50 rounded-lg">
          <Calculator className="w-5 h-5 text-indigo-600 flex-shrink-0" />
          <div>
            <h3 className="font-medium text-gray-800 mb-1">Hesaplama Yöntemi</h3>
            <p className="text-gray-600 text-sm">
              Vergi tutarı, matrah üzerinden sabit %25 oranı ile hesaplanır.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex gap-3 mb-8">
        <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0" />
        <div>
          <h3 className="font-medium text-amber-800 mb-1">Önemli Not</h3>
          <p className="text-amber-700 text-sm">
            Bu hesaplama aracı bilgilendirme amaçlıdır. Kesin sonuçlar için lütfen mali müşavirinize danışınız.
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-lg font-medium text-gray-800 mb-4">Sıkça Sorulan Sorular</h3>
        
        <div 
          className="group bg-gray-50 rounded-lg cursor-pointer"
          onClick={() => handleToggle('1')}
        >
          <div className="flex items-center justify-between p-4">
            <span className="font-medium text-gray-700">Kurumlar vergisi nedir?</span>
            <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${openItem === '1' ? 'rotate-180' : ''}`} />
          </div>
          <div className={`px-4 overflow-hidden transition-all duration-200 ease-in-out ${openItem === '1' ? 'max-h-40 pb-4' : 'max-h-0'}`}>
            <p className="text-gray-600">
              Kurumlar vergisi, şirketlerin ve kurumların bir yıl içinde elde ettikleri kazançlar üzerinden ödedikleri vergidir. Bu vergi, kurumların mali yıl sonunda elde ettikleri net kâr üzerinden hesaplanır.
            </p>
          </div>
        </div>

        <div 
          className="group bg-gray-50 rounded-lg cursor-pointer"
          onClick={() => handleToggle('2')}
        >
          <div className="flex items-center justify-between p-4">
            <span className="font-medium text-gray-700">Vergi matrahı nasıl hesaplanır?</span>
            <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${openItem === '2' ? 'rotate-180' : ''}`} />
          </div>
          <div className={`px-4 overflow-hidden transition-all duration-200 ease-in-out ${openItem === '2' ? 'max-h-40 pb-4' : 'max-h-0'}`}>
            <p className="text-gray-600">
              Vergi matrahı, kurumun ticari kazancından indirilecek giderler ve istisnalar düşüldükten sonra kalan tutardır. Bu tutara vergi oranı uygulanarak ödenecek vergi hesaplanır.
            </p>
          </div>
        </div>

        <div 
          className="group bg-gray-50 rounded-lg cursor-pointer"
          onClick={() => handleToggle('3')}
        >
          <div className="flex items-center justify-between p-4">
            <span className="font-medium text-gray-700">Kurumlar vergisi ne zaman ödenir?</span>
            <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${openItem === '3' ? 'rotate-180' : ''}`} />
          </div>
          <div className={`px-4 overflow-hidden transition-all duration-200 ease-in-out ${openItem === '3' ? 'max-h-48 pb-4' : 'max-h-0'}`}>
            <p className="text-gray-600">
              Kurumlar vergisi beyannamesi, hesap döneminin kapandığı ayı izleyen dördüncü ayın son gününe kadar verilir. Vergi, beyanname verme süresi içinde ödenir. Ancak vergi, Nisan ve Temmuz aylarında iki eşit taksit halinde de ödenebilir.
            </p>
          </div>
        </div>

        <div 
          className="group bg-gray-50 rounded-lg cursor-pointer"
          onClick={() => handleToggle('4')}
        >
          <div className="flex items-center justify-between p-4">
            <span className="font-medium text-gray-700">Geçici vergi nedir?</span>
            <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${openItem === '4' ? 'rotate-180' : ''}`} />
          </div>
          <div className={`px-4 overflow-hidden transition-all duration-200 ease-in-out ${openItem === '4' ? 'max-h-48 pb-4' : 'max-h-0'}`}>
            <p className="text-gray-600">
              Geçici vergi, kurumlar vergisinin yıl içinde üçer aylık dönemler halinde peşin olarak ödenen kısmıdır. Yıl sonunda hesaplanan kurumlar vergisinden mahsup edilir. Geçici vergi dönemleri: Ocak-Mart, Nisan-Haziran, Temmuz-Eylül ve Ekim-Aralık şeklindedir.
            </p>
          </div>
        </div>

        <div 
          className="group bg-gray-50 rounded-lg cursor-pointer"
          onClick={() => handleToggle('5')}
        >
          <div className="flex items-center justify-between p-4">
            <span className="font-medium text-gray-700">Hangi kurumlar vergiye tabidir?</span>
            <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${openItem === '5' ? 'rotate-180' : ''}`} />
          </div>
          <div className={`px-4 overflow-hidden transition-all duration-200 ease-in-out ${openItem === '5' ? 'max-h-40 pb-4' : 'max-h-0'}`}>
            <p className="text-gray-600">
              Sermaye şirketleri (A.Ş., Ltd. Şti.), kooperatifler, iktisadi kamu kuruluşları, dernek ve vakıflara ait iktisadi işletmeler ve iş ortaklıkları kurumlar vergisine tabidir.
            </p>
          </div>
        </div>

        <div 
          className="group bg-gray-50 rounded-lg cursor-pointer"
          onClick={() => handleToggle('6')}
        >
          <div className="flex items-center justify-between p-4">
            <span className="font-medium text-gray-700">Vergi indirimleri ve istisnalar nelerdir?</span>
            <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${openItem === '6' ? 'rotate-180' : ''}`} />
          </div>
          <div className={`px-4 overflow-hidden transition-all duration-200 ease-in-out ${openItem === '6' ? 'max-h-40 pb-4' : 'max-h-0'}`}>
            <p className="text-gray-600">
              Ar-Ge indirimleri, yatırım indirimleri, iştirak kazançları istisnası, emisyon primi istisnası gibi çeşitli indirim ve istisnalar mevcuttur. Bu indirim ve istisnalar vergi matrahını düşürerek ödenecek vergi tutarını azaltır.
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}