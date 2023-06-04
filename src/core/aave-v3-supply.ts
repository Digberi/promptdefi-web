import { BigNumberish, utils } from 'ethers';

import tokenABI from '@/config/abi/erc20.abi.json';
import aaveV3PoolABI from '@/config/abi/aave-v3-pool.abi.json';

const AAVE_V3_POOL_CONTRACT_ADDRESS = '0x7b5C526B7F8dfdff278b4a3e045083FBA4028790';
const REFERRAL_CODE = 0;

export const depositToAaveV3 = async (tokenAddress: string, atomicAmount: BigNumberish, receiver: string) => {
  const operations = [];

  const tokenInterface = new utils.Interface(tokenABI);

  const approveData = tokenInterface.encodeFunctionData('approve', [AAVE_V3_POOL_CONTRACT_ADDRESS, atomicAmount]);
  operations.push({
    target: tokenAddress,
    value: 0,
    data: approveData
  });

  const aaveV3PoolInterface = new utils.Interface(aaveV3PoolABI);
  const supplyData = aaveV3PoolInterface.encodeFunctionData('supply', [
    tokenAddress,
    atomicAmount,
    receiver,
    REFERRAL_CODE
  ]);
  operations.push({
    target: AAVE_V3_POOL_CONTRACT_ADDRESS,
    value: 0,
    data: supplyData
  });

  return operations;
};
