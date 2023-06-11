import { tokens } from '@/config/tokens';

export const getTokenByTokenSymbol = (tokenSymbol: string) => {
  if (tokenSymbol === 'BTC') {
    return tokens[2];
  }

  const token = tokens.find(({ symbol }) => symbol.toLowerCase() === tokenSymbol.toLowerCase());

  if (!token) {
    return tokens[1];
  }

  return token;
};
