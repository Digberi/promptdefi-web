import { BrowserRouter } from 'react-router-dom';

import { MuiProvider } from './mui-provider';
import { WagmiProvider } from './wagmi-provider';

import { CFC } from '@/types/react';

export const ProvidersSandwich: CFC = ({ children }) => {
  return (
    <BrowserRouter>
      <MuiProvider>
        <WagmiProvider>{children}</WagmiProvider>;
      </MuiProvider>
    </BrowserRouter>
  );
};
