import { BigNumberish, utils } from 'ethers';

import lidoAbi from '@/config/abi/lido.abi.json';
import { LIDO_CONTRACT_ADDRESS } from '@/config/contracts';
import { PreOpStruct } from '@/types/custom';

export class Lido {
  static readonly Interface = new utils.Interface(lidoAbi);
  static readonly CONTRACT_ADDRESS = LIDO_CONTRACT_ADDRESS;

  static createDepositPreOp(atomicAmount: BigNumberish): Array<PreOpStruct> {
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
