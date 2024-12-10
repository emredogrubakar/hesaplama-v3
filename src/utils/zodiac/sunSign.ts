import type { ZodiacSign } from '../../types/zodiac';

export const ZODIAC_SIGNS: ZodiacSign[] = [
  {
    name: 'Koç',
    startDate: '21 Mart',
    endDate: '19 Nisan',
    element: 'Ateş',
    quality: 'Öncü',
    symbol: '♈',
    description: 'Koç burcu, ateş elementinin öncü niteliğini taşır. Dinamik, cesur ve lider ruhludur.'
  },
  {
    name: 'Boğa',
    startDate: '20 Nisan',
    endDate: '20 Mayıs',
    element: 'Toprak',
    quality: 'Sabit',
    symbol: '♉',
    description: 'Boğa burcu, toprak elementinin sabit niteliğini taşır. Kararlı, güvenilir ve pratiktir.'
  },
  {
    name: 'İkizler',
    startDate: '21 Mayıs',
    endDate: '20 Haziran',
    element: 'Hava',
    quality: 'Değişken',
    symbol: '♊',
    description: 'İkizler burcu, hava elementinin değişken niteliğini taşır. İletişimci, meraklı ve uyumludur.'
  },
  {
    name: 'Yengeç',
    startDate: '21 Haziran',
    endDate: '22 Temmuz',
    element: 'Su',
    quality: 'Öncü',
    symbol: '♋',
    description: 'Yengeç burcu, su elementinin öncü niteliğini taşır. Duygusal, koruyucu ve sezgiseldir.'
  },
  {
    name: 'Aslan',
    startDate: '23 Temmuz',
    endDate: '22 Ağustos',
    element: 'Ateş',
    quality: 'Sabit',
    symbol: '♌',
    description: 'Aslan burcu, ateş elementinin sabit niteliğini taşır. Yaratıcı, cömert ve kendine güvenir.'
  },
  {
    name: 'Başak',
    startDate: '23 Ağustos',
    endDate: '22 Eylül',
    element: 'Toprak',
    quality: 'Değişken',
    symbol: '♍',
    description: 'Başak burcu, toprak elementinin değişken niteliğini taşır. Analitik, çalışkan ve detaycıdır.'
  },
  {
    name: 'Terazi',
    startDate: '23 Eylül',
    endDate: '22 Ekim',
    element: 'Hava',
    quality: 'Öncü',
    symbol: '♎',
    description: 'Terazi burcu, hava elementinin öncü niteliğini taşır. Diplomatik, adil ve uyumludur.'
  },
  {
    name: 'Akrep',
    startDate: '23 Ekim',
    endDate: '21 Kasım',
    element: 'Su',
    quality: 'Sabit',
    symbol: '♏',
    description: 'Akrep burcu, su elementinin sabit niteliğini taşır. Tutkulu, kararlı ve derindir.'
  },
  {
    name: 'Yay',
    startDate: '22 Kasım',
    endDate: '21 Aralık',
    element: 'Ateş',
    quality: 'Değişken',
    symbol: '♐',
    description: 'Yay burcu, ateş elementinin değişken niteliğini taşır. Maceracı, iyimser ve özgürlükçüdür.'
  },
  {
    name: 'Oğlak',
    startDate: '22 Aralık',
    endDate: '19 Ocak',
    element: 'Toprak',
    quality: 'Öncü',
    symbol: '♑',
    description: 'Oğlak burcu, toprak elementinin öncü niteliğini taşır. Disiplinli, sorumlu ve hırslıdır.'
  },
  {
    name: 'Kova',
    startDate: '20 Ocak',
    endDate: '18 Şubat',
    element: 'Hava',
    quality: 'Sabit',
    symbol: '♒',
    description: 'Kova burcu, hava elementinin sabit niteliğini taşır. Yenilikçi, özgün ve insancıldır.'
  },
  {
    name: 'Balık',
    startDate: '19 Şubat',
    endDate: '20 Mart',
    element: 'Su',
    quality: 'Değişken',
    symbol: '♓',
    description: 'Balık burcu, su elementinin değişken niteliğini taşır. Sezgisel, şefkatli ve yaratıcıdır.'
  }
];

const SIGN_DATES = [
  { month: 3, day: 21 }, // Koç başlangıç
  { month: 4, day: 20 }, // Boğa başlangıç
  { month: 5, day: 21 }, // İkizler başlangıç
  { month: 6, day: 21 }, // Yengeç başlangıç
  { month: 7, day: 23 }, // Aslan başlangıç
  { month: 8, day: 23 }, // Başak başlangıç
  { month: 9, day: 23 }, // Terazi başlangıç
  { month: 10, day: 23 }, // Akrep başlangıç
  { month: 11, day: 22 }, // Yay başlangıç
  { month: 12, day: 22 }, // Oğlak başlangıç
  { month: 1, day: 20 }, // Kova başlangıç
  { month: 2, day: 19 }  // Balık başlangıç
];

export function calculateSunSign(birthDate: string): ZodiacSign {
  const [day, month] = birthDate.split('.').map(Number);
  
  // Oğlak burcu özel kontrolü (yıl geçişi)
  if (month === 12 && day >= 22 || month === 1 && day <= 19) {
    return ZODIAC_SIGNS[9]; // Oğlak
  }

  // Diğer burçlar için kontrol
  for (let i = 0; i < SIGN_DATES.length; i++) {
    const currentSign = SIGN_DATES[i];
    const nextSign = SIGN_DATES[(i + 1) % SIGN_DATES.length];
    
    // Aynı ay içindeki kontrol
    if (month === currentSign.month) {
      if (day >= currentSign.day) {
        return ZODIAC_SIGNS[i];
      }
    }
    
    // Ay geçişi kontrolü
    if (month === currentSign.month && day < currentSign.day) {
      return ZODIAC_SIGNS[(i + 11) % 12];
    }
  }

  // Varsayılan olarak Balık (bu noktaya ulaşılmamalı)
  return ZODIAC_SIGNS[11];
}