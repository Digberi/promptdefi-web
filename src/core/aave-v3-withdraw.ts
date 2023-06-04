import { BigNumberish, utils } from 'ethers';

import aaveV3PoolABI from '@/config/abi/aave-v3-pool.abi.json';

const AAVE_V3_POOL_CONTRACT_ADDRESS = '0x7b5C526B7F8dfdff278b4a3e045083FBA4028790';

export const withdrawFromAaveV3 = async (tokenAddress: string, atomicAmount: BigNumberish, receiver: string) => {
  const operations = [];

  const aaveV3PoolInterface = new utils.Interface(aaveV3PoolABI);
  const withdrawData = aaveV3PoolInterface.encodeFunctionData('withdraw', [tokenAddress, atomicAmount, receiver]);

  operations.push({
    target: AAVE_V3_POOL_CONTRACT_ADDRESS,
    value: 0,
    data: withdrawData
  });

  return operations;
};
