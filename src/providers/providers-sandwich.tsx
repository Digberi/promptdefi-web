import { BrowserRouter } from 'react-router-dom';

import { ModeProvider } from './mode.provider';
import { MuiProvider } from './mui.provider';
import { OperationsProvider } from './operations/operations.provider';
import { SmartAccountProvider } from './smart-account.provider';
import { WagmiProvider } from './wagmi.provider';

import { TabProvider } from '@/components/base/tabs';
import { CFC } from '@/types/react';

export const ProvidersSandwich: CFC = ({ children }) => {
  return (
    <BrowserRouter>
      <ModeProvider>
        <MuiProvider>
          <WagmiProvider>
            <SmartAccountProvider>
              <OperationsProvider>
                <TabProvider>{children}</TabProvider>
              </OperationsProvider>
            </SmartAccountProvider>
          </WagmiProvider>
        </MuiProvider>
      </ModeProvider>
    </BrowserRouter>
  );
};
