export const stringToColorHash = (string: string): string => {
  let hash = 0;

  for (let i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (let i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    const hexValue = value.toString(16).padStart(2, '0');
    color += hexValue;
  }

  return color;
};
