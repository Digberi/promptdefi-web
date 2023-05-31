import { BigNumber, BigNumberish, utils } from 'ethers';
import { erc20ABI } from 'wagmi';

export const getSendTokenPreOp = (tokenAddress: string, receiver: string, atomicAmount: BigNumberish) => {
  if (!receiver) {
    throw new Error('No receiver address provided');
  }
  if (!utils.isAddress(receiver)) {
    throw new Error('Invalid receiver address');
  }
  if (!atomicAmount) {
    throw new Error('No amount provided');
  }
  const atomicAmountBN = BigNumber.from(atomicAmount);

  if (atomicAmountBN.lte(0)) {
    throw new Error('Amount must be greater than 0');
  }

  const erc20Interface = new utils.Interface(erc20ABI);
  const data = erc20Interface.encodeFunctionData('transfer', [receiver, atomicAmountBN.toString()]);

  return {
    target: tokenAddress,
    data
  };
};
