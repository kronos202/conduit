export const getArrayTagFromString = (s?: string): string[] => {
  return s?.split(',').map((item) => item.trim());
};
