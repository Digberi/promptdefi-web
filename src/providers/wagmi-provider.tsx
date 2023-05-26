import { WagmiConfig } from 'wagmi';

import { wagmiClient } from '@/auth/wagmi';
import { CFC } from '@/types/react';

export const WagmiProvider: CFC = ({ children }) => {
  return <WagmiConfig client={wagmiClient}>{children}</WagmiConfig>;
};
