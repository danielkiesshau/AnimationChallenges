export const minClamp = (value: number, minValue: number): number => {
  'worklet';
  return value < minValue ? minValue : value;
};

export const maxClamp = (value: number, maxValue: number): number => {
  'worklet';
  return value > maxValue ? maxValue : value;
};
