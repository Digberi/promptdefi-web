export interface Token {
  address: string;
  logoURI: string;
  symbol: string;
  name: string;
  decimals: number;
}

export const tokens: Array<Token> = [
  {
    address: '0xdac17f958d2ee523a2206206994597c13d831ec7',
    logoURI: 'https://etherscan.io/token/images/tethernew_32.png',
    decimals: 6,
    symbol: 'USDT',
    name: 'Tether USD'
  },
  {
    address: '0xB8c77482e45F1F44dE1745F52C74426C631bDD52',
    logoURI: 'https://etherscan.io/token/images/bnb_28_2.png',
    decimals: 18,
    symbol: 'BNB',
    name: 'BNB'
  },
  {
    address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
    logoURI: 'https://etherscan.io/token/images/centre-usdc_28.png',
    decimals: 6,
    symbol: 'USDC',
    name: 'USD Coin'
  }
];
