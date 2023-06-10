import { BrowserRouter } from 'react-router-dom';

import { AlertProvider } from './alert.provider';
import { ModeProvider } from './mode.provider';
import { MuiProvider } from './mui.provider';
import { OperationsProvider } from './operations/operations.provider';
import { SmartAccountProvider } from './smart-account.provider';
import { WagmiProvider } from './wagmi.provider';

import { TabProvider } from '@/components/base/tabs';
import { CFC } from '@/types/react';

export const ProvidersSandwich: CFC = ({ children }) => {
  return (
    <BrowserRouter basename="/promptdefi-web">
      <ModeProvider>
        <MuiProvider>
          <AlertProvider>
            <WagmiProvider>
              <SmartAccountProvider>
                <OperationsProvider>
                  <TabProvider>{children}</TabProvider>
                </OperationsProvider>
              </SmartAccountProvider>
            </WagmiProvider>
          </AlertProvider>
        </MuiProvider>
      </ModeProvider>
    </BrowserRouter>
  );
};
