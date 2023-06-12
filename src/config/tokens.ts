export interface Token {
  address?: `0x${string}`;
  logoURI: string;
  symbol: string;
  name: string;
  decimals: number;
  triggerInfo?: {
    priceFeed: string;
    poolFee: number;
  };
  faucet?: {
    amount: string;
  };
}

export const tokens: Array<Token> = [
  {
    logoURI: 'https://cryptologos.cc/logos/ethereum-eth-logo.png?v=025',
    decimals: 18,
    symbol: 'ETH',
    name: 'Ethereum'
  },
  {
    address: '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6',
    logoURI: 'https://etherscan.io/token/images/weth_28.png',
    decimals: 18,
    symbol: 'WETH',
    name: 'Wrapped Ether',
    triggerInfo: {
      priceFeed: '0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e',
      poolFee: 3000
    }
  },
  {
    name: 'Wrapped BTC',
    symbol: 'WBTC',
    decimals: 8,
    logoURI: 'https://etherscan.io/token/images/wbtc_28.png',
    address: '0x45AC379F019E48ca5dAC02E54F406F99F5088099',
    triggerInfo: {
      priceFeed: '0x779877A7B0D9E8603169DdbD7836e478b4624789',
      poolFee: 3000
    }
  },
  {
    address: '0x2E8D98fd126a32362F2Bd8aA427E59a1ec63F780',
    logoURI: 'https://etherscan.io/token/images/tethernew_32.png',
    decimals: 6,
    symbol: 'USDT',
    name: 'Tether USD',
    faucet: {
      amount: '1000'
    }
  },
  {
    address: '0x65aFADD39029741B3b8f0756952C74678c9cEC93',
    logoURI: 'https://etherscan.io/token/images/centre-usdc_28.png',
    decimals: 6,
    symbol: 'USDC',
    name: 'USD Coin',
    faucet: {
      amount: '1000'
    }
  },
  {
    address: '0x326C977E6efc84E512bB9C30f76E30c160eD06FB',
    logoURI: 'https://etherscan.io/token/images/chainlinktoken_32.png',
    decimals: 18,
    symbol: 'LINK',
    name: 'Chainlink'
  }
  // {
  //   address: '0xBC33cfbD55EA6e5B97C6da26F11160ae82216E2b',
  //   logoURI: 'https://etherscan.io/token/images/statiseuro_28.png',
  //   decimals: 2,
  //   symbol: 'EURS',
  //   name: 'STASIS EURS Token'
  // },
  // {
  //   address: '0x8153A21dFeB1F67024aA6C6e611432900FF3dcb9',
  //   logoURI: 'https://etherscan.io/token/images/aave_32.png',
  //   decimals: 18,
  //   symbol: 'AAVE',
  //   name: 'Aave Token'
  // },
  // {
  //   name: 'DAI Stablecoin',
  //   symbol: 'DAI',
  //   decimals: 18,
  //   logoURI: 'https://etherscan.io/token/images/MCDDai_32.png',
  //   address: '0xBa8DCeD3512925e52FE67b1b5329187589072A55'
  // }
];

// export const aaveTokens: Array<Token> = [
//   {
//     address: '0x8Be59D90A7Dc679C5cE5a7963cD1082dAB499918',
//     logoURI: 'https://etherscan.io/token/images/aave_32.png',
//     symbol: 'aEthUSDC',
//     decimals: 6,
//     name: 'Aave Ethereum USDC'
//   },
//   {
//     address: '0xf3368D1383cE079006E5D1d56878b92bbf08F1c2',
//     logoURI: 'https://etherscan.io/token/images/aave_32.png',
//     symbol: 'aEthUSDT',
//     decimals: 6,
//     name: 'Aave Ethereum USDT'
//   },
//   {
//     address: '0x493DC51c35F7ddD891262b8733C63eABaf14786f',
//     logoURI: 'https://etherscan.io/token/images/aave_32.png',
//     symbol: 'aEthLINK',
//     name: 'Aave Ethereum LINK',
//     decimals: 18
//   },
//   {
//     address: '0x76a79F46329a8EB7d7d1c50F45a4090707588864',
//     logoURI: 'https://etherscan.io/token/images/aave_32.png',
//     symbol: 'variableDebtEthLINK',
//     name: 'Aave Ethereum LINK Variable Debt',
//     decimals: 18
//   }
// ];

export const tokenAddresses = [
  '0x2E8D98fd126a32362F2Bd8aA427E59a1ec63F780', // USDT
  '0x65aFADD39029741B3b8f0756952C74678c9cEC93', // USDC
  '0xe9c4393a23246293a8D31BF7ab68c17d4CF90A29', // LINK
  '0xBC33cfbD55EA6e5B97C6da26F11160ae82216E2b', //EURS
  '0x8153A21dFeB1F67024aA6C6e611432900FF3dcb9' //AAVE
];
