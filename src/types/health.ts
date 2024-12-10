export interface BMIResult {
  bmi: number;
  category: string;
  idealWeight: {
    min: number;
    max: number;
  };
  height: number;
  weight: number;
}

export interface BMICategory {
  name: string;
  range: {
    min: number;
    max: number;
  };
  description: string;
  recommendations: string[];
}