import { utils } from 'ethers';

export const toReal = (value?: string, decimals?: number) => {
  return value && decimals && utils.formatUnits(value, decimals);
};
