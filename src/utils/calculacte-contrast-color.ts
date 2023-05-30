export const calculateContrastColor = (
  backgroundHash: string,
  { lightColor = '#FFFFFF', darkColor = '#000000' } = { lightColor: '#FFFFFF', darkColor: '#000000' }
): string => {
  // Convert the backgroundHash to a number
  const hashNumber = parseInt(backgroundHash.replace('#', ''), 16);

  // Calculate the brightness based on the red, green, and blue components
  const brightness =
    ((hashNumber & 0xff0000) >> 16) * 0.299 + ((hashNumber & 0x00ff00) >> 8) * 0.587 + (hashNumber & 0x0000ff) * 0.114;

  // Determine the contrast color based on the brightness
  return brightness > 127.5 ? darkColor : lightColor;
};
