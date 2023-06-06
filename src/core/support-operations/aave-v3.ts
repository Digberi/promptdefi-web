import { BigNumberish, utils } from 'ethers';

import { Erc20 } from './erc20-token';

import { aaveV3PoolABI } from '@/config/abi';
import { AAVE_V3_POOL_CONTRACT_ADDRESS } from '@/config/contracts';
import { PreOpStruct } from '@/types/custom';

export namespace AAveV3 {
  export interface CreateBorrowPreOpParams {
    tokenAddress: string;
    atomicAmount: BigNumberish;
    receiver: string;
  }

  export interface CreateRepayPreOpParams {
    tokenAddress: string;
    atomicAmount: BigNumberish;
    receiver: string;
  }

  export interface CreateDepositPreOpParams {
    tokenAddress: string;
    atomicAmount: BigNumberish;
    receiver: string;
  }

  export interface CreateWithdrawPreOpParams {
    tokenAddress: string;
    atomicAmount: BigNumberish;
    receiver: string;
  }
}

export class AAveV3 {
  static readonly Interface = new utils.Interface(aaveV3PoolABI);
  static readonly REFERRAL_CODE = 0;
  static readonly INTEREST_RATE_MODE = 2; // Variable
  static readonly CONTRACT_ADDRESS = AAVE_V3_POOL_CONTRACT_ADDRESS;

  static createBorrowPreOp({
    tokenAddress,
    atomicAmount,
    receiver
  }: AAveV3.CreateBorrowPreOpParams): Array<PreOpStruct> {
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

  static createRepayPreOp({ tokenAddress, atomicAmount, receiver }: AAveV3.CreateRepayPreOpParams): Array<PreOpStruct> {
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

  static createDepositPreOp({
    tokenAddress,
    atomicAmount,
    receiver
  }: AAveV3.CreateDepositPreOpParams): Array<PreOpStruct> {
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

  static createWithdrawPreOp({
    tokenAddress,
    atomicAmount,
    receiver
  }: AAveV3.CreateWithdrawPreOpParams): Array<PreOpStruct> {
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
