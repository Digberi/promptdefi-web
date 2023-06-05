import { BigNumberish, utils } from 'ethers';

import { Erc20 } from './erc20-token';

import { aaveV3PoolABI } from '@/config/abi';
import { AAVE_V3_POOL_CONTRACT_ADDRESS } from '@/config/contracts';
import { PreOpStruct } from '@/types/custom';

export class AAveV3 {
  static readonly Interface = new utils.Interface(aaveV3PoolABI);
  static readonly REFERRAL_CODE = 0;
  static readonly INTEREST_RATE_MODE = 2; // Variable
  static readonly CONTRACT_ADDRESS = AAVE_V3_POOL_CONTRACT_ADDRESS;

  createBorrowPreOp(tokenAddress: string, atomicAmount: BigNumberish, receiver: string): Array<PreOpStruct> {
    const borrowData = AAveV3.Interface.encodeFunctionData('borrow', [
      tokenAddress,
      atomicAmount,
      AAveV3.INTEREST_RATE_MODE, // Variable
      AAveV3.REFERRAL_CODE,
      receiver
    ]);

    return [
      {
        target: AAveV3.CONTRACT_ADDRESS,
        value: 0,
        data: borrowData
      }
    ];
  }

  createRepayPreOp(tokenAddress: string, atomicAmount: BigNumberish, receiver: string): Array<PreOpStruct> {
    const approvePreOp = Erc20.createApprovePreOp(tokenAddress, atomicAmount, AAveV3.CONTRACT_ADDRESS);

    const repayData = AAveV3.Interface.encodeFunctionData('repay', [
      tokenAddress,
      atomicAmount,
      AAveV3.INTEREST_RATE_MODE,
      receiver
    ]);

    const repayPreOp = {
      target: AAveV3.CONTRACT_ADDRESS,
      value: 0,
      data: repayData
    };

    return approvePreOp.concat(repayPreOp);
  }

  createDepositPreOp(tokenAddress: string, atomicAmount: BigNumberish, receiver: string): Array<PreOpStruct> {
    const approvePreOp = Erc20.createApprovePreOp(tokenAddress, atomicAmount, AAveV3.CONTRACT_ADDRESS);

    const depositData = AAveV3.Interface.encodeFunctionData('supply', [
      tokenAddress,
      atomicAmount,
      receiver,
      AAveV3.REFERRAL_CODE
    ]);

    const depositPreOp = {
      target: AAveV3.CONTRACT_ADDRESS,
      value: 0,
      data: depositData
    };

    return approvePreOp.concat(depositPreOp);
  }

  createWithdrawPreOp(tokenAddress: string, atomicAmount: BigNumberish, receiver: string): Array<PreOpStruct> {
    const withdrawData = AAveV3.Interface.encodeFunctionData('withdraw', [tokenAddress, atomicAmount, receiver]);

    return [
      {
        target: AAveV3.CONTRACT_ADDRESS,
        value: 0,
        data: withdrawData
      }
    ];
  }
}
