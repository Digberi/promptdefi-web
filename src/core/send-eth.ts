import { BigNumberish, Signer } from 'ethers';

export const sendEth = async (signer: Signer, to: string, amount: BigNumberish) => {
  const tx = await signer.sendTransaction({
    to,
    value: amount
  });

  return tx.hash;
};
