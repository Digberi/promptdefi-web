import { BigNumberish } from 'ethers';
import { Interface } from 'ethers/lib/utils.js';

import { erc20ABI } from '@/config/abi';
import { tokens } from '@/config/tokens';
import { PreOpStruct } from '@/types/custom';
import { toAtomic } from '@/utils/units';

export namespace Erc20 {
  export interface CreateSendPreOpParams {
    tokenSymbol: string;
    amount: BigNumberish;
    receiver: string;
  }

  export interface CreateApprovePreOpParams {
    tokenAddress: string;
    atomicAmount: BigNumberish;
    confidant: string;
  }
}

const getTokenByTokenSymbol = (tokenSymbol: string) => {
  const token = tokens.find(({ symbol }) => symbol === tokenSymbol);
  if (!token) {
    throw new Error(`Token ${tokenSymbol} not found`);
  }

  return token;
};
export class Erc20 {
  static readonly Interface = new Interface(erc20ABI);

  static createSendPreOp({ tokenSymbol, amount, receiver }: Erc20.CreateSendPreOpParams): Array<PreOpStruct> {
    const token = getTokenByTokenSymbol(tokenSymbol);
    const atomicAmount = toAtomic(amount, token.decimals).toString();

    const data = Erc20.Interface.encodeFunctionData('transfer', [receiver, atomicAmount]);

    return [
      {
        target: token.address!,
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
