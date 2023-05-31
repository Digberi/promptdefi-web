import { BigNumberish, utils } from 'ethers';

import lidoAbi from '@/config/abi/lido.abi.json';

// const LIDO_PROXY_CONTRACT_ADDRESS = '0x1643E812aE58766192Cf7D2Cf9567dF2C37e9B7F';
const LIDO_CONTRACT_ADDRESS = '0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84';

export const lidoDeposit = async (atomicAmount: BigNumberish) => {
  const lidoInterface = new utils.Interface(lidoAbi);

  const data = lidoInterface.encodeFunctionData('submit', ['0']);

  return {
    target: LIDO_CONTRACT_ADDRESS,
    value: atomicAmount,
    data
  };
};
