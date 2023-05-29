import { BrowserRouter } from 'react-router-dom';

import { ModeProvider } from './mode.provider';
import { MuiProvider } from './mui.provider';
import { WagmiProvider } from './wagmi.provider';

import { CFC } from '@/types/react';

export const ProvidersSandwich: CFC = ({ children }) => {
  return (
    <BrowserRouter>
      <ModeProvider>
        <MuiProvider>
          <WagmiProvider>{children}</WagmiProvider>
        </MuiProvider>
      </ModeProvider>
    </BrowserRouter>
  );
};
