import { BigNumberish, utils } from 'ethers';

export const toReal = (value?: BigNumberish, decimals?: number) => {
  return value && decimals && utils.formatUnits(value, decimals);
};

export const toAtomic = (value?: BigNumberish, decimals?: number) => {
  return value && decimals && utils.parseUnits(value.toString(), decimals);
};
