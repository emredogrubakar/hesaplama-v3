import { Calculator, Calendar, Briefcase, Coins, Percent, Scale, Clock, CalendarRange, Home, CreditCard, Sparkles, Ruler, Box, Weight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface CategoryConfig {
  id: string;
  title: string;
  icon: LucideIcon;
  description: string;
}

export interface CalculatorConfig {
  id: string;
  title: string;
  description: string;
  path: string;
  icon: LucideIcon;
  category: string;
  priority: number;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
}

export const categories: CategoryConfig[] = [
  {
    id: 'finance',
    title: 'Finans',
    icon: Coins,
    description: 'Vergi, kredi ve yatırım hesaplamaları'
  },
  {
    id: 'date',
    title: 'Tarih & Zaman',
    icon: Calendar,
    description: 'Tarih ve zaman hesaplamaları'
  },
  {
    id: 'math',
    title: 'Matematik',
    icon: Calculator,
    description: 'Geometri ve matematik hesaplamaları'
  },
  {
    id: 'health',
    title: 'Sağlık',
    icon: Scale,
    description: 'Sağlık ve fitness hesaplamaları'
  }
];

export const calculators: CalculatorConfig[] = [
  {
    id: 'corporate-tax',
    title: 'Kurumlar Vergisi Hesaplama',
    description: '2024 yılı güncel oranlarıyla kurumlar vergisi hesaplama',
    path: '/kurumlar-vergisi-hesaplama',
    icon: Calculator,
    category: 'finance',
    priority: 1.0,
    changefreq: 'monthly'
  },
  {
    id: 'rent-tax',
    title: 'Kira Geliri Vergisi Hesaplama',
    description: '2024 yılı kira geliri vergisi hesaplama',
    path: '/kira-geliri-vergisi-hesaplama',
    icon: Home,
    category: 'finance',
    priority: 0.9,
    changefreq: 'monthly'
  },
  {
    id: 'credit-card',
    title: 'Kredi Kartı Taksit Hesaplama',
    description: 'Kredi kartı taksit tutarı ve toplam ödeme hesaplama',
    path: '/kredi-karti-taksit-hesaplama',
    icon: CreditCard,
    category: 'finance',
    priority: 0.8,
    changefreq: 'monthly'
  },
  {
    id: 'date-calculator',
    title: 'Gün Hesaplama',
    description: 'İki tarih arası gün sayısı hesaplama',
    path: '/iki-tarih-arasi-gun-hesaplama',
    icon: Clock,
    category: 'date',
    priority: 0.8,
    changefreq: 'monthly'
  },
  {
    id: 'month-calculator',
    title: 'Ay Hesaplama',
    description: 'İki tarih arası ay sayısı hesaplama',
    path: '/iki-tarih-arasi-ay-hesaplama',
    icon: CalendarRange,
    category: 'date',
    priority: 0.8,
    changefreq: 'monthly'
  },
  {
    id: 'sun-sign',
    title: 'Güneş Burcu Hesaplama',
    description: 'Doğum tarihinize göre güneş burcu hesaplama',
    path: '/gunes-burcu-hesaplama',
    icon: Sparkles,
    category: 'date',
    priority: 0.7,
    changefreq: 'monthly'
  },
  {
    id: 'area',
    title: 'Alan Hesaplama',
    description: 'Geometrik şekillerin alan hesaplamaları',
    path: '/alan-hesaplama',
    icon: Ruler,
    category: 'math',
    priority: 0.7,
    changefreq: 'monthly'
  },
  {
    id: 'volume',
    title: 'Hacim Hesaplama',
    description: 'Geometrik cisimlerin hacim hesaplamaları',
    path: '/hacim-hesaplama',
    icon: Box,
    category: 'math',
    priority: 0.7,
    changefreq: 'monthly'
  },
  {
    id: 'bmi',
    title: 'Vücut Kitle İndeksi Hesaplama',
    description: 'Vücut kitle indeksi hesaplama ve ideal kilo analizi',
    path: '/vucut-kitle-indeksi-hesaplama',
    icon: Weight,
    category: 'health',
    priority: 0.7,
    changefreq: 'monthly'
  }
];