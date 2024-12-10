export const isValidDate = (day: number, month: number, year: number): boolean => {
  // Geçerli bir tarih aralığı kontrolü
  if (year < 1900 || year > 2100) return false;
  if (month < 1 || month > 12) return false;
  if (day < 1 || day > 31) return false;

  // Ay bazında gün kontrolü
  const daysInMonth = new Date(year, month, 0).getDate();
  if (day > daysInMonth) return false;

  return true;
};

export const validateDatePart = (value: string, part: 'day' | 'month' | 'year'): string => {
  const digit = value.slice(-1);
  const currentValue = value.slice(0, -1);
  
  // Sadece rakam girişine izin ver
  if (!/^\d$/.test(digit)) return currentValue;
  
  const newValue = currentValue + digit;
  const num = parseInt(newValue, 10);

  switch (part) {
    case 'day':
      // İlk rakam 3'ten büyükse veya 3 ise ikinci rakam 1'den büyük olamaz
      if (newValue.length === 1 && num > 3) return currentValue;
      if (newValue.length === 2 && parseInt(newValue[0], 10) === 3 && parseInt(newValue[1], 10) > 1) return currentValue;
      if (num > 31) return currentValue;
      break;
      
    case 'month':
      // İlk rakam 1'den büyükse veya 1 ise ikinci rakam 2'den büyük olamaz
      if (newValue.length === 1 && num > 1) return currentValue;
      if (newValue.length === 2 && parseInt(newValue[0], 10) === 1 && parseInt(newValue[1], 10) > 2) return currentValue;
      if (num > 12) return currentValue;
      break;
      
    case 'year':
      // 1900-2100 arası yıllara izin ver
      if (newValue.length === 4 && (num < 1900 || num > 2100)) return currentValue;
      break;
  }

  return newValue;
};

export const formatDateString = (value: string): string => {
  // Sadece rakamları al
  const numbers = value.replace(/\D/g, '');
  
  // Parçalara ayır ve validate et
  let day = numbers.slice(0, 2);
  let month = numbers.slice(2, 4);
  let year = numbers.slice(4, 8);
  
  // Her parçayı ayrı ayrı validate et
  day = validateDatePart(day, 'day');
  month = validateDatePart(month, 'month');
  year = validateDatePart(year, 'year');
  
  // Formatlama: GG.AA.YYYY
  const parts = [day, month, year].filter(Boolean);
  return parts.join('.');
};

export const getDateParts = (dateStr: string): { day: number; month: number; year: number } | null => {
  const parts = dateStr.split('.');
  if (parts.length !== 3) return null;

  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10);
  const year = parseInt(parts[2], 10);

  if (isNaN(day) || isNaN(month) || isNaN(year)) return null;

  return { day, month, year };
};