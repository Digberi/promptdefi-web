import { BigNumberish, utils } from 'ethers';

import { Erc20 } from './erc20-token';

import { aaveV3PoolABI } from '@/config/abi';
import { AAVE_V3_POOL_CONTRACT_ADDRESS } from '@/config/contracts';
import { PreOpStruct } from '@/types/custom';
import { getTokenByTokenSymbol } from '@/utils/get-token-by-symbol';
import { toAtomic } from '@/utils/units';

export namespace AAveV3 {
  export interface CreateBorrowPreOpParams {
    tokenSymbol: string;
    amount: BigNumberish;
    receiver: string;
  }

  export interface CreateRepayPreOpParams {
    tokenSymbol: string;
    amount: BigNumberish;
    receiver: string;
  }

  export interface CreateDepositPreOpParams {
    tokenSymbol: string;
    amount: BigNumberish;
    receiver: string;
  }

  export interface CreateWithdrawPreOpParams {
    tokenSymbol: string;
    amount: BigNumberish;
    receiver: string;
  }
}

const getData = (tokenSymbol: string, amount: BigNumberish) => {
  const token = getTokenByTokenSymbol(tokenSymbol);
  const atomicAmount = toAtomic(amount, token.decimals).toString();
  const tokenAddress = token.address!;

  return { atomicAmount, tokenAddress };
};

export class AAveV3 {
  static readonly Interface = new utils.Interface(aaveV3PoolABI);
  static readonly REFERRAL_CODE = 0;
  static readonly INTEREST_RATE_MODE = 2; // Variable
  static readonly CONTRACT_ADDRESS = AAVE_V3_POOL_CONTRACT_ADDRESS;

  static createBorrowPreOp({ tokenSymbol, amount, receiver }: AAveV3.CreateBorrowPreOpParams): Array<PreOpStruct> {
    const { atomicAmount, tokenAddress } = getData(tokenSymbol, amount);

    const borrowData = AAveV3.Interface.encodeFunctionData('borrow', [
      tokenAddress,
      atomicAmount,
      AAveV3.INTEREST_RATE_MODE,
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

  static createRepayPreOp({ tokenSymbol, amount, receiver }: AAveV3.CreateRepayPreOpParams): Array<PreOpStruct> {
    const { atomicAmount, tokenAddress } = getData(tokenSymbol, amount);

    const approvePreOp = Erc20.createApprovePreOp({
      tokenAddress,
      atomicAmount,
      confidant: AAveV3.CONTRACT_ADDRESS
    });

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

  static createDepositPreOp({ tokenSymbol, amount, receiver }: AAveV3.CreateDepositPreOpParams): Array<PreOpStruct> {
    const { atomicAmount, tokenAddress } = getData(tokenSymbol, amount);

    const approvePreOp = Erc20.createApprovePreOp({
      tokenAddress,
      atomicAmount,
      confidant: AAveV3.CONTRACT_ADDRESS
    });

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

  static createWithdrawPreOp({ tokenSymbol, amount, receiver }: AAveV3.CreateWithdrawPreOpParams): Array<PreOpStruct> {
    const { atomicAmount, tokenAddress } = getData(tokenSymbol, amount);
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
