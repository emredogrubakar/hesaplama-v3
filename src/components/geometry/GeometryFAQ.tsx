import React, { useState } from 'react';
import { Info, ChevronDown } from 'lucide-react';

interface GeometryFAQProps {
  type: 'area' | 'volume';
}

export function GeometryFAQ({ type }: GeometryFAQProps) {
  const [openItem, setOpenItem] = useState<string | null>(null);

  const handleToggle = (id: string) => {
    setOpenItem(openItem === id ? null : id);
  };

  const questions = type === 'area' ? [
    {
      id: '1',
      question: 'Alan nasıl bulunur?',
      answer: 'Alan, bir yüzeyin kapladığı miktardır. Matematikte genelde kare santimetre (cm²), metre kare (m²) gibi birimlerle ölçülür. Formüller şekle göre değişir.'
    },
    {
      id: '2',
      question: 'Dikdörtgenin alanı nasıl bulunur?',
      answer: 'Dikdörtgenin alanını hesaplamak için uzun kenar ile kısa kenarı çarpmanız yeterli. Örneğin: Uzun kenar 5 cm, kısa kenar 3 cm ise alan: 5 × 3 = 15 cm².'
    },
    {
      id: '3',
      question: 'Karenin alanı nasıl bulunur?',
      answer: 'Kare için işlem çok basit. Çünkü kenarların hepsi eşit! Formül: Bir kenar × Bir kenar. Örneğin: Kenar uzunluğu 4 cm ise alan: 4 × 4 = 16 cm².'
    },
    {
      id: '4',
      question: 'Üçgenin alanı nasıl bulunur?',
      answer: 'Üçgenin alanını bulmak için şu formülü kullanıyoruz: Taban × Yükseklik ÷ 2. Örneğin: Taban uzunluğu 6 cm, yükseklik 4 cm ise alan: (6 × 4) ÷ 2 = 12 cm².'
    },
    {
      id: '5',
      question: 'Alan nasıl ölçülür?',
      answer: 'Bir alanı ölçerken, genelde cetvel veya ölçüm cihazlarıyla uzunlukları belirleriz. Ölçtüğümüz değerleri doğru formüle yerleştirmek yeterli.'
    },
    {
      id: '6',
      question: 'Alanı çevreye çevirmek ne demek?',
      answer: 'Burada alanla çevreyi karıştırmamak önemli. Alan, yüzeyin kapladığı yer; çevre ise şeklin dış hatlarının toplam uzunluğudur. Mesela kare için çevre: 4 × Kenar Uzunluğu.'
    },
    {
      id: '7',
      question: '6. Sınıf seviyesinde alan nasıl anlatılır?',
      answer: 'Alanı, bir şeklin içine kaç tane "birim kare" sığdığını düşünerek öğrenebilirsin. Örneğin, 1 cm²\'lik küçük kareleri bir şeklin içine yerleştirip saymayı hayal et.'
    },
    {
      id: '8',
      question: 'Alan hesaplamaya pratik yaklaşım',
      answer: 'Bir formülü unutursanız bile panik yapmayın! Şeklin özelliklerine odaklanıp, basit adımlarla ilerleyin. Dikdörtgen ve karede çarpın, üçgende çarpıp ikiye bölün. Kafanız karışırsa örneklerle çalışmayı deneyin!'
    }
  ] : [
    {
      id: '1',
      question: 'Hacim nedir?',
      answer: 'Hacim, bir cismin ya da maddenin uzayda kapladığı alan miktarıdır. Başka bir deyişle, bir şeyin içine ne kadar şey sığabileceğini ifade eder.'
    },
    {
      id: '2',
      question: 'Hacim nasıl hesaplanır?',
      answer: 'Hacim, şekle göre farklı formüllerle hesaplanır. Örneğin: Küp için kenar³, dikdörtgen prizma için uzunluk × genişlik × yükseklik, silindir için πr²h formülleri kullanılır.'
    },
    {
      id: '3',
      question: 'Hacim formülü nedir?',
      answer: 'Hacim formülü, cismin şekline göre değişir. Örneğin: Küre için (4/3)πr³, koni için (1/3)πr²h formülleri kullanılır. Şeklin geometrik yapısını bilmek, doğru formülü seçmek için önemlidir.'
    },
    {
      id: '4',
      question: 'Hacim skaler mi?',
      answer: 'Evet, hacim bir skaler büyüklüktür. Yani yalnızca büyüklüğü vardır, yönü yoktur. Örneğin, 3 m³ hacim sadece bir miktarı ifade eder.'
    },
    {
      id: '5',
      question: 'Hacim sembolü nedir?',
      answer: 'Hacim genellikle V harfi ile gösterilir (Volume kelimesinden gelir).'
    },
    {
      id: '6',
      question: 'Hacim ne demek?',
      answer: 'Hacim, bir nesnenin içine ne kadar şey sığabileceğini ifade eder. Örneğin, bir kutunun içine kaç litre su koyabileceğinizi düşünün; işte bu hacimdir.'
    },
    {
      id: '7',
      question: 'Hacim birimleri nelerdir?',
      answer: 'Hacim, metrik sistemde şu birimlerle ölçülür: m³ (metreküp): Büyük hacimler için, cm³ (santimetreküp): Küçük hacimler için, Litre (L): Sıvıların hacmi için kullanılır (1 L = 1000 cm³).'
    },
    {
      id: '8',
      question: 'SI biriminde hacim nedir?',
      answer: 'Hacmin SI birimi metreküp (m³)\'tür. Bu, uluslararası standart bir ölçüm birimidir.'
    },
    {
      id: '9',
      question: 'Hacim nasıl bulunur?',
      answer: 'Hacmi bulmak için cismin şekline göre uygun formülü kullanmanız yeterlidir. Örneğin: Dikdörtgen prizma için uzunluk × genişlik × yükseklik, silindir için πr²h formülleri kullanılır.'
    },
    {
      id: '10',
      question: 'Hacim hesaplama neden önemli?',
      answer: 'Hacim, bir cismin içine ne kadar sıvı, gaz veya başka bir madde sığabileceğini belirlemek için kullanılır. Özellikle mühendislik, günlük yaşam ve bilimsel çalışmalar için çok önemlidir.'
    }
  ];

  return (
    <article className="bg-white rounded-2xl shadow-xl p-4 sm:p-8">
      <div className="flex items-center gap-3 mb-6">
        <Info className="w-5 h-5 text-indigo-600" />
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
          Sıkça Sorulan Sorular
        </h2>
      </div>

      <div className="space-y-3">
        {questions.map(({ id, question, answer }) => (
          <div 
            key={id}
            className="group bg-gray-50 rounded-lg cursor-pointer"
            onClick={() => handleToggle(id)}
          >
            <div className="flex items-center justify-between p-4">
              <span className="font-medium text-gray-700">{question}</span>
              <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${openItem === id ? 'rotate-180' : ''}`} />
            </div>
            <div className={`px-4 overflow-hidden transition-all duration-200 ease-in-out ${openItem === id ? 'max-h-48 pb-4' : 'max-h-0'}`}>
              <p className="text-gray-600">{answer}</p>
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}