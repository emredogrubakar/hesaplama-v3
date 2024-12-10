import React, { useState } from 'react';
import { Info, ChevronDown } from 'lucide-react';

export function BMIFAQ() {
  const [openItem, setOpenItem] = useState<string | null>(null);

  const handleToggle = (id: string) => {
    setOpenItem(openItem === id ? null : id);
  };

  return (
    <article className="bg-white rounded-2xl shadow-xl p-4 sm:p-8">
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
            <span className="font-medium text-gray-700">BMI (Vücut Kitle İndeksi) nedir?</span>
            <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${openItem === '1' ? 'rotate-180' : ''}`} />
          </div>
          <div className={`px-4 overflow-hidden transition-all duration-200 ease-in-out ${openItem === '1' ? 'max-h-40 pb-4' : 'max-h-0'}`}>
            <p className="text-gray-600">
              BMI (Body Mass Index), vücut ağırlığınızın boyunuza göre normal olup olmadığını gösteren bir ölçüdür. Kilo (kg) / Boy² (m²) formülü ile hesaplanır.
            </p>
          </div>
        </div>

        <div 
          className="group bg-gray-50 rounded-lg cursor-pointer"
          onClick={() => handleToggle('2')}
        >
          <div className="flex items-center justify-between p-4">
            <span className="font-medium text-gray-700">BMI kategorileri nelerdir?</span>
            <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${openItem === '2' ? 'rotate-180' : ''}`} />
          </div>
          <div className={`px-4 overflow-hidden transition-all duration-200 ease-in-out ${openItem === '2' ? 'max-h-48 pb-4' : 'max-h-0'}`}>
            <p className="text-gray-600">
              BMI değerine göre kategoriler şöyledir:
              • 18.5'in altı: Zayıf
              • 18.5-24.9 arası: Normal
              • 25-29.9 arası: Fazla Kilolu
              • 30 ve üzeri: Obez
            </p>
          </div>
        </div>

        <div 
          className="group bg-gray-50 rounded-lg cursor-pointer"
          onClick={() => handleToggle('3')}
        >
          <div className="flex items-center justify-between p-4">
            <span className="font-medium text-gray-700">BMI hesaplaması herkes için güvenilir midir?</span>
            <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${openItem === '3' ? 'rotate-180' : ''}`} />
          </div>
          <div className={`px-4 overflow-hidden transition-all duration-200 ease-in-out ${openItem === '3' ? 'max-h-48 pb-4' : 'max-h-0'}`}>
            <p className="text-gray-600">
              BMI, genel bir fikir verse de vücut yağ oranını, kas kütlesini ve diğer faktörleri dikkate almaz. Sporcular, hamileler, yaşlılar ve çocuklar için yanıltıcı olabilir. Kesin değerlendirme için bir sağlık uzmanına danışılmalıdır.
            </p>
          </div>
        </div>

        <div 
          className="group bg-gray-50 rounded-lg cursor-pointer"
          onClick={() => handleToggle('4')}
        >
          <div className="flex items-center justify-between p-4">
            <span className="font-medium text-gray-700">İdeal kiloma nasıl ulaşabilirim?</span>
            <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${openItem === '4' ? 'rotate-180' : ''}`} />
          </div>
          <div className={`px-4 overflow-hidden transition-all duration-200 ease-in-out ${openItem === '4' ? 'max-h-48 pb-4' : 'max-h-0'}`}>
            <p className="text-gray-600">
              İdeal kiloya ulaşmak için dengeli beslenme, düzenli egzersiz ve sağlıklı yaşam alışkanlıkları önemlidir. Bir beslenme uzmanı ve doktor eşliğinde kişisel bir program oluşturulması önerilir.
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}