import { BigNumberish, utils } from 'ethers';

import aaveV3PoolABI from '@/config/abi/aave-v3-pool.abi.json';

const AAVE_V3_POOL_CONTRACT_ADDRESS = '0x7b5C526B7F8dfdff278b4a3e045083FBA4028790';
const REFERRAL_CODE = 0;
const INTEREST_RATE_MODE = 2; // Variable

export const borrowOnAaveV3 = async (tokenAddress: string, atomicAmount: BigNumberish, receiver: string) => {
  const operations = [];

  const aaveV3PoolInterface = new utils.Interface(aaveV3PoolABI);
  const borrowData = aaveV3PoolInterface.encodeFunctionData('borrow', [
    tokenAddress,
    atomicAmount,
    INTEREST_RATE_MODE,
    REFERRAL_CODE,
    receiver
  ]);

  operations.push({
    target: AAVE_V3_POOL_CONTRACT_ADDRESS,
    value: 0,
    data: borrowData
  });

  return operations;
};
