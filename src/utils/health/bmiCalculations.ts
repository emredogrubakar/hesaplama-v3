import type { BMIResult, BMICategory } from '../../types/health';

export const BMI_CATEGORIES: BMICategory[] = [
  {
    name: 'Zayıf',
    range: { min: 0, max: 18.5 },
    description: 'Vücut ağırlığınız boyunuza göre düşük.',
    recommendations: [
      'Dengeli ve sağlıklı beslenmeye özen gösterin',
      'Düzenli egzersiz yapın',
      'Protein ağırlıklı beslenin',
      'Sağlık kontrollerinizi düzenli yaptırın'
    ]
  },
  {
    name: 'Normal',
    range: { min: 18.5, max: 24.9 },
    description: 'Vücut ağırlığınız boyunuza göre normal.',
    recommendations: [
      'Mevcut beslenme düzeninizi koruyun',
      'Düzenli egzersiz yapmaya devam edin',
      'Sağlıklı yaşam alışkanlıklarınızı sürdürün'
    ]
  },
  {
    name: 'Fazla Kilolu',
    range: { min: 25, max: 29.9 },
    description: 'Vücut ağırlığınız boyunuza göre yüksek.',
    recommendations: [
      'Porsiyon kontrolüne dikkat edin',
      'Düzenli egzersiz yapın',
      'Sağlıklı besinler tüketin',
      'Su tüketiminizi artırın'
    ]
  },
  {
    name: 'Obez',
    range: { min: 30, max: Infinity },
    description: 'Vücut ağırlığınız boyunuza göre çok yüksek.',
    recommendations: [
      'Bir sağlık uzmanına başvurun',
      'Beslenme düzeninizi gözden geçirin',
      'Düzenli egzersiz programı oluşturun',
      'Yaşam tarzı değişiklikleri yapın'
    ]
  }
];

export function calculateBMI(weight: number, height: number): BMIResult {
  // Boy metreye çevrilir
  const heightInMeters = height / 100;
  
  // BMI hesaplanır
  const bmi = weight / (heightInMeters * heightInMeters);
  
  // BMI kategorisi bulunur
  const category = BMI_CATEGORIES.find(
    cat => bmi >= cat.range.min && bmi < cat.range.max
  ) || BMI_CATEGORIES[BMI_CATEGORIES.length - 1];

  // İdeal kilo aralığı hesaplanır (BMI 18.5-24.9 arası)
  const idealWeight = {
    min: 18.5 * (heightInMeters * heightInMeters),
    max: 24.9 * (heightInMeters * heightInMeters)
  };

  return {
    bmi: Number(bmi.toFixed(1)),
    category: category.name,
    idealWeight: {
      min: Math.round(idealWeight.min),
      max: Math.round(idealWeight.max)
    },
    height,
    weight
  };
}