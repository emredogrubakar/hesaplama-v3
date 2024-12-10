import type { GeometricShape } from '../../types/geometry';

export const AREA_SHAPES: GeometricShape[] = [
  {
    name: 'Kare',
    type: 'area',
    description: 'Dört kenarı eşit olan düzgün dörtgen',
    formula: 'A = a²',
    fields: [
      { name: 'side', label: 'Kenar', unit: 'cm' }
    ]
  },
  {
    name: 'Dikdörtgen',
    type: 'area',
    description: 'Karşılıklı kenarları birbirine eşit olan dörtgen',
    formula: 'A = a × b',
    fields: [
      { name: 'length', label: 'Uzunluk', unit: 'cm' },
      { name: 'width', label: 'Genişlik', unit: 'cm' }
    ]
  },
  {
    name: 'Üçgen',
    type: 'area',
    description: 'Üç kenarı olan geometrik şekil',
    formula: 'A = (t × h) / 2',
    fields: [
      { name: 'base', label: 'Taban', unit: 'cm' },
      { name: 'height', label: 'Yükseklik', unit: 'cm' }
    ]
  },
  {
    name: 'Daire',
    type: 'area',
    description: 'Merkeze eşit uzaklıktaki noktaların oluşturduğu şekil',
    formula: 'A = πr²',
    fields: [
      { name: 'radius', label: 'Yarıçap', unit: 'cm' }
    ]
  }
];

export const VOLUME_SHAPES: GeometricShape[] = [
  {
    name: 'Küp',
    type: 'volume',
    description: 'Altı yüzü kare olan üç boyutlu cisim',
    formula: 'V = a³',
    fields: [
      { name: 'side', label: 'Kenar', unit: 'cm' }
    ]
  },
  {
    name: 'Dikdörtgenler Prizması',
    type: 'volume',
    description: 'Altı yüzü dikdörtgen olan üç boyutlu cisim',
    formula: 'V = a × b × h',
    fields: [
      { name: 'length', label: 'Uzunluk', unit: 'cm' },
      { name: 'width', label: 'Genişlik', unit: 'cm' },
      { name: 'height', label: 'Yükseklik', unit: 'cm' }
    ]
  },
  {
    name: 'Silindir',
    type: 'volume',
    description: 'İki paralel daire ve bir yanal yüzeyden oluşan üç boyutlu cisim',
    formula: 'V = πr²h',
    fields: [
      { name: 'radius', label: 'Yarıçap', unit: 'cm' },
      { name: 'height', label: 'Yükseklik', unit: 'cm' }
    ]
  },
  {
    name: 'Küre',
    type: 'volume',
    description: 'Merkeze eşit uzaklıktaki noktaların oluşturduğu üç boyutlu cisim',
    formula: 'V = (4/3)πr³',
    fields: [
      { name: 'radius', label: 'Yarıçap', unit: 'cm' }
    ]
  }
];