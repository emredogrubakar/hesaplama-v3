export const hesaplaVergi = (gelir: number) => {
  // 2024 yılı kurumlar vergisi oranı
  const VERGI_ORANI = 0.25; // %25

  const vergiTutari = gelir * VERGI_ORANI;

  return {
    vergiMatrahi: gelir,
    vergiOrani: VERGI_ORANI * 100,
    vergiTutari: vergiTutari
  };
};