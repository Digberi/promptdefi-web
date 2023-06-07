import { JSBI } from '@uniswap/sdk';
import { BigNumber, BigNumberish, utils } from 'ethers';

export const toReal = (value?: BigNumberish, decimals?: number) => {
  return value && decimals && utils.formatUnits(value, decimals);
};

export function toAtomic(value: BigNumberish, decimals: number): BigNumber;
export function toAtomic(value?: BigNumberish, decimals?: number) {
  return value && decimals && utils.parseUnits(value.toString(), decimals);
}

function countDecimals(x: number) {
  if (Math.floor(x) === x) {
    return 0;
  }

  return x.toString().split('.')[1].length || 0;
}

export function fromReadableAmount(amount: number, decimals: number): JSBI {
  const extraDigits = Math.pow(10, countDecimals(amount));
  const adjustedAmount = amount * extraDigits;

  return JSBI.divide(
    JSBI.multiply(JSBI.BigInt(adjustedAmount), JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(decimals))),
    JSBI.BigInt(extraDigits)
  );
}

export function toReadableAmount(rawAmount: number, decimals: number): string {
  return JSBI.divide(JSBI.BigInt(rawAmount), JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(decimals))).toString();
}
