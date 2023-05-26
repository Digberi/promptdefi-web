import { WagmiProvider } from './wagmi-provider';

import { CFC } from '@/types/react';

export const ProvidersSandwich: CFC = ({ children }) => {
  return <WagmiProvider>{children}</WagmiProvider>;
};
