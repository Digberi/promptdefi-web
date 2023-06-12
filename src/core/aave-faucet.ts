import { BigNumberish, utils } from 'ethers';

import { AAVE_V3_FAUCET_ADDRESS } from '@/config/contracts';
import { tokens } from '@/config/tokens';
import { PreOpStruct } from '@/types/custom';
import { toAtomic } from '@/utils/units';

const simpleAbi = [
  {
    inputs: [
      { internalType: 'address', name: 'token', type: 'address' },
      { internalType: 'address', name: 'to', type: 'address' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' }
    ],
    name: 'mint',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'nonpayable',
    type: 'function'
  }
];

const mintInterface = new utils.Interface(simpleAbi);

const getMintPreOp = (token: string, to: string, amount: BigNumberish): PreOpStruct => {
  const data = mintInterface.encodeFunctionData('mint', [token, to, amount]);

  return {
    target: AAVE_V3_FAUCET_ADDRESS,
    data,
    value: 0
  };
};

export const getMintPreOps = (to: string): Array<PreOpStruct> => {
  return tokens
    .filter(token => token.faucet)
    .map(token => getMintPreOp(token.address!, to, toAtomic(token.faucet!.amount, token.decimals)));
};
