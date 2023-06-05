import { BigNumberish } from 'ethers';

export interface PreOpStruct {
  target: string;
  value: BigNumberish;
  data: string;
}
