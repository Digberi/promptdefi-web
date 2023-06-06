import { BigNumberish } from 'ethers';
import { Interface } from 'ethers/lib/utils.js';

import { erc20ABI } from '@/config/abi';
import { PreOpStruct } from '@/types/custom';

export namespace Erc20 {
  export interface CreateSendPreOpParams {
    tokenAddress: string;
    atomicAmount: BigNumberish;
    receiver: string;
  }

  export interface CreateApprovePreOpParams {
    tokenAddress: string;
    atomicAmount: BigNumberish;
    confidant: string;
  }
}

export class Erc20 {
  static readonly Interface = new Interface(erc20ABI);

  static createSendPreOp({ tokenAddress, atomicAmount, receiver }: Erc20.CreateSendPreOpParams): Array<PreOpStruct> {
    const data = Erc20.Interface.encodeFunctionData('transfer', [receiver, atomicAmount]);

    return [
      {
        target: tokenAddress,
        value: 0,
        data
      }
    ];
  }

  static createApprovePreOp({
    tokenAddress,
    atomicAmount,
    confidant
  }: Erc20.CreateApprovePreOpParams): Array<PreOpStruct> {
    const data = Erc20.Interface.encodeFunctionData('approve', [confidant, atomicAmount]);

    return [
      {
        target: tokenAddress,
        value: 0,
        data
      }
    ];
  }
}
