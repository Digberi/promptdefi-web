import { useEffect, useState } from 'react';

import { useAccount, useProvider, useSigner } from 'wagmi';

import { accountApiFactory } from '@/account-abstraction/account-api';
import { BatchAccountAPI } from '@/account-abstraction/batch-simple-account-api';

export const useBatchAccountApi = () => {
  const { address, isConnected } = useAccount();

  const provider = useProvider();
  const { data: signer } = useSigner();

  const [batchAccountApi, setBatchAccountApi] = useState<BatchAccountAPI | undefined>();
  const [accountAddress, setAccountAddress] = useState<`0x${string}` | undefined>();

  useEffect(() => {
    (async () => {
      try {
        if (isConnected && provider && address && signer) {
          const tempBatchAccountApi = await accountApiFactory({
            provider,
            signer
          });

          setBatchAccountApi(tempBatchAccountApi);
          const accAddress = (await tempBatchAccountApi.getAccountAddress()) as `0x${string}`;

          setAccountAddress(accAddress);
        }
      } catch (e) {
        console.error(e);
      }
    })();
  }, [provider, isConnected, address, signer]);

  return {
    batchAccountApi,
    accountAddress
  };
};
