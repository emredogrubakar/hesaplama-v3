export interface ZodiacSign {
  name: string;
  startDate: string;
  endDate: string;
  element: string;
  quality: string;
  symbol: string;
  description: string;
}

export interface SunSignResult {
  sign: ZodiacSign;
  birthDate: string;
}