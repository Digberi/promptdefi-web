import { EntryPoint__factory } from '@account-abstraction/contracts';
import { BigNumberish, Signer, utils } from 'ethers';

import { ENTRYPOINT_ADDRESS } from '@/config/constants';

export const EntryDepositTo = async (signer: Signer, smartAccountAddress: string, realAmount: BigNumberish) => {
  const entrypoint = EntryPoint__factory.connect(ENTRYPOINT_ADDRESS, signer);

  const result = await entrypoint.functions.depositTo(smartAccountAddress, {
    value: utils.parseEther(realAmount.toString())
  });

  const contractReceipt = await result.wait(1);

  return {
    tx: result.hash,
    cr: contractReceipt
  };
};
