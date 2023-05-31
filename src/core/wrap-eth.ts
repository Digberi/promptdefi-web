import { BigNumberish, utils } from 'ethers';

import wrapEthABI from '@/config/abi/wrap-eth.abi.json';

const WRAP_ETH_CONTRACT_ADDRESS = '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6';

export const getWrappedEthPreOp = (atomicAmount: BigNumberish) => {
  const wrapEthInterface = new utils.Interface(wrapEthABI);

  const data = wrapEthInterface.encodeFunctionData('deposit', []);

  return {
    target: WRAP_ETH_CONTRACT_ADDRESS,
    value: atomicAmount,
    data
  };
};
