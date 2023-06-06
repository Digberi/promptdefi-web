import { BigNumberish, utils } from 'ethers';

import wrapEthABI from '@/config/abi/wrap-eth.abi.json';
import { WRAP_ETH_CONTRACT_ADDRESS } from '@/config/contracts';
import { PreOpStruct } from '@/types/custom';

export namespace WrapEth {
  export interface CreateDepositPreOpParams {
    atomicAmount: BigNumberish;
  }
}

export class WrapEth {
  static readonly Interface = new utils.Interface(wrapEthABI);
  static readonly CONTRACT_ADDRESS = WRAP_ETH_CONTRACT_ADDRESS;

  static createDepositPreOp({ atomicAmount }: WrapEth.CreateDepositPreOpParams): Array<PreOpStruct> {
    const data = WrapEth.Interface.encodeFunctionData('deposit', []);

    return [
      {
        target: WrapEth.CONTRACT_ADDRESS,
        value: atomicAmount,
        data
      }
    ];
  }
}
