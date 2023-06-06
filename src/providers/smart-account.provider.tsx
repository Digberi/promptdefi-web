import { createContext, useState, useEffect } from 'react';

import { useAccount, useProvider, useSigner } from 'wagmi';

import { accountApiFactory } from '@/account-abstraction/account-api';
import { BatchAccountAPI } from '@/account-abstraction/batch-simple-account-api';
import { CFC } from '@/types/react';

export const SmartAccountContext = createContext<{
  smartAccountApi?: BatchAccountAPI;
  smartAccountAddress?: `0x${string}`;
}>({});

export const SmartAccountProvider: CFC = ({ children }) => {
  const { address, isConnected } = useAccount();
  const provider = useProvider();
  const { data: signer } = useSigner();

  const [smartAccountApi, setSmartAccountApi] = useState<BatchAccountAPI | undefined>();
  const [smartAccountAddress, setSmartAccountAddress] = useState<`0x${string}` | undefined>();

  useEffect(() => {
    (async () => {
      try {
        if (isConnected && provider && address && signer) {
          const tempBatchAccountApi = await accountApiFactory({
            provider,
            signer
          });

          setSmartAccountApi(tempBatchAccountApi);
          const accAddress = (await tempBatchAccountApi.getAccountAddress()) as `0x${string}`;

          setSmartAccountAddress(accAddress);
        }
      } catch (e) {
        console.error(e);
      }
    })();
  }, [provider, isConnected, address, signer]);

  return (
    <SmartAccountContext.Provider value={{ smartAccountApi, smartAccountAddress }}>
      {children}
    </SmartAccountContext.Provider>
  );
};
