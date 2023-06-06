import { BigNumberish, utils } from 'ethers';

import lidoAbi from '@/config/abi/lido.abi.json';
import { LIDO_CONTRACT_ADDRESS } from '@/config/contracts';
import { PreOpStruct } from '@/types/custom';

export namespace Lido {
  export interface CreateDepositPreOpParams {
    atomicAmount: BigNumberish;
  }
}

export class Lido {
  static readonly Interface = new utils.Interface(lidoAbi);
  static readonly CONTRACT_ADDRESS = LIDO_CONTRACT_ADDRESS;

  static createDepositPreOp({ atomicAmount }: Lido.CreateDepositPreOpParams): Array<PreOpStruct> {
    const data = Lido.Interface.encodeFunctionData('submit', ['0']);

    return [
      {
        target: Lido.CONTRACT_ADDRESS,
        value: atomicAmount,
        data
      }
    ];
  }
}
