export interface GeometricShape {
  name: string;
  type: 'area' | 'volume';
  description: string;
  formula: string;
  fields: {
    name: string;
    label: string;
    unit: string;
  }[];
}

export interface CalculationResult {
  shape: GeometricShape;
  inputs: Record<string, number>;
  result: number;
}