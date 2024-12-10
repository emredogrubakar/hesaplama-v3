export const formatNumber = (num: number): string => {
  // Türkçe para birimi formatı - virgülden sonra tam 2 basamak
  return new Intl.NumberFormat('tr-TR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    useGrouping: true
  }).format(Number(num.toFixed(2)));
};

export const formatCurrency = (value: string): string => {
  // Remove all non-numeric characters
  const numericValue = value.replace(/\D/g, '');
  
  // Convert to number and format
  const number = parseInt(numericValue, 10);
  if (isNaN(number)) return '';
  
  // Format with Turkish locale
  return new Intl.NumberFormat('tr-TR', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
    useGrouping: true
  }).format(number);
};

export const parseCurrency = (value: string): number => {
  // Remove all non-numeric characters
  const numericValue = value.replace(/\D/g, '');
  return numericValue ? parseInt(numericValue, 10) : 0;
};

export const formatInputValue = (value: string): string => {
  // Remove all non-numeric characters
  const numericValue = value.replace(/\D/g, '');
  
  // Convert to number
  const number = parseInt(numericValue, 10);
  if (!number) return '';
  
  // Format with Turkish locale
  return new Intl.NumberFormat('tr-TR').format(number);
};