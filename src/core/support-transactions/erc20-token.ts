import { BigNumberish, utils } from 'ethers';

import { erc20ABI } from '@/config/abi';
import { PreOpStruct } from '@/types/custom';

export class Erc20 {
  static readonly Interface = new utils.Interface(erc20ABI);

  static createSendPreOp(tokenAddress: string, atomicAmount: BigNumberish, receiver: string): Array<PreOpStruct> {
    const data = Erc20.Interface.encodeFunctionData('transfer', [receiver, atomicAmount]);

    return [
      {
        target: tokenAddress,
        value: 0,
        data
      }
    ];
  }

  static createApprovePreOp(tokenAddress: string, atomicAmount: BigNumberish, confidant: string): Array<PreOpStruct> {
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
