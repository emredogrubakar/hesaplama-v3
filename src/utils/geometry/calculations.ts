import type { GeometricShape, CalculationResult } from '../../types/geometry';

export function calculateGeometry(shape: GeometricShape, inputs: Record<string, number>): CalculationResult {
  let result = 0;

  switch (shape.name) {
    case 'Kare':
      result = inputs.side * inputs.side;
      break;
    case 'Dikdörtgen':
      result = inputs.length * inputs.width;
      break;
    case 'Üçgen':
      result = (inputs.base * inputs.height) / 2;
      break;
    case 'Daire':
      result = Math.PI * inputs.radius * inputs.radius;
      break;
    case 'Küp':
      result = inputs.side * inputs.side * inputs.side;
      break;
    case 'Dikdörtgenler Prizması':
      result = inputs.length * inputs.width * inputs.height;
      break;
    case 'Silindir':
      result = Math.PI * inputs.radius * inputs.radius * inputs.height;
      break;
    case 'Küre':
      result = (4/3) * Math.PI * Math.pow(inputs.radius, 3);
      break;
  }

  return {
    shape,
    inputs,
    result: Number(result.toFixed(2))
  };
}