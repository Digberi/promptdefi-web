import { BigNumberish, utils } from 'ethers';

import lidoAbi from '@/config/abi/lido.abi.json';
import { LIDO_CONTRACT_ADDRESS } from '@/config/contracts';
import { PreOpStruct } from '@/types/custom';

export namespace Lido {
  export interface CreateDepositPreOpParams {
    amount: BigNumberish;
  }
}

export class Lido {
  static readonly Interface = new utils.Interface(lidoAbi);
  static readonly CONTRACT_ADDRESS = LIDO_CONTRACT_ADDRESS;

  static createDepositPreOp({ amount }: Lido.CreateDepositPreOpParams): Array<PreOpStruct> {
    const data = Lido.Interface.encodeFunctionData('submit', ['0']);

    const atomicAmount = utils.parseEther(amount.toString());

    return [
      {
        target: Lido.CONTRACT_ADDRESS,
        value: atomicAmount,
        data
      }
    ];
  }
}
