export const shrink = (address: string | undefined) => {
  if (!address) {
    return '';
  }

  return `${address.slice(0, 8)}...${address.slice(-6)}`;
};
