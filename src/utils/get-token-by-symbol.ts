import { tokens } from '@/config/tokens';

export const getTokenByTokenSymbol = (tokenSymbol: string) => {
  const token = tokens.find(({ symbol }) => symbol.toLowerCase() === tokenSymbol.toLowerCase());
  if (!token) {
    throw new Error(`Token ${tokenSymbol} not found`);
  }

  return token;
};
