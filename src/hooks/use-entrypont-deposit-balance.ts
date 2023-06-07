import { useState, useEffect } from 'react';

import { EntryPoint__factory } from '@account-abstraction/contracts';
import { BigNumber } from 'ethers';
import { useSigner } from 'wagmi';

import { useSmartAccount } from './use-smart-account';

import { ENTRYPOINT_ADDRESS } from '@/config/contracts';

export const useEntrypointDepositBalance = () => {
  const [balance, setBalance] = useState<BigNumber>(BigNumber.from(0));
  const { data: signer } = useSigner();
  const { smartAccountAddress } = useSmartAccount();

  useEffect(() => {
    const getBalance = async () => {
      if (!signer || !smartAccountAddress) {
        return;
      }
      const entrypoint = EntryPoint__factory.connect(ENTRYPOINT_ADDRESS, signer);

      const [balanceBN] = await entrypoint.functions.balanceOf(smartAccountAddress);

      setBalance(balanceBN);
    };
    getBalance();
  }, [signer, smartAccountAddress]);

  return {
    balance
  };
};
