import { RouteObject } from 'react-router-dom';
import { CorporateTax } from '../pages/calculators/corporate-tax';
import { RentTax } from '../pages/calculators/rent-tax';
import { DateCalculator } from '../pages/calculators/date';
import { MonthCalculator } from '../pages/calculators/month';
import { CreditCardCalculator } from '../pages/calculators/credit-card';
import { SunSignCalculator } from '../pages/calculators/zodiac/sun-sign';
import { AreaCalculator } from '../pages/calculators/geometry/area';
import { VolumeCalculator } from '../pages/calculators/geometry/volume';
import { BMICalculator } from '../pages/calculators/health/bmi';

export const calculatorRoutes: RouteObject[] = [
  {
    path: '/kurumlar-vergisi-hesaplama',
    element: <CorporateTax />
  },
  {
    path: '/kira-geliri-vergisi-hesaplama',
    element: <RentTax />
  },
  {
    path: '/kredi-karti-taksit-hesaplama',
    element: <CreditCardCalculator />
  },
  {
    path: '/iki-tarih-arasi-gun-hesaplama',
    element: <DateCalculator />
  },
  {
    path: '/iki-tarih-arasi-ay-hesaplama',
    element: <MonthCalculator />
  },
  {
    path: '/gunes-burcu-hesaplama',
    element: <SunSignCalculator />
  },
  {
    path: '/alan-hesaplama',
    element: <AreaCalculator />
  },
  {
    path: '/hacim-hesaplama',
    element: <VolumeCalculator />
  },
  {
    path: '/vucut-kitle-indeksi-hesaplama',
    element: <BMICalculator />
  }
];