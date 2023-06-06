import { OperationData } from '@/core/operations/operation.type';
import { Operation } from '@/core/operations/operations.enum';

export const operationsInitialState: Array<OperationData> = [
  {
    kind: Operation.SendToken,
    data: {
      tokenAddress: '0xdac17f958d2ee523a2206206994597c13d831ec7',
      atomicAmount: '500000',
      receiver: '0xd27aCC8Eec0E6285c81972B5eEcd8dA241a4bCb5'
    }
  },
  {
    kind: Operation.SendToken,
    data: {
      tokenAddress: '0xB8c77482e45F1F44dE1745F52C74426C631bDD52',
      atomicAmount: '500000000000000',
      receiver: '0xd27aCC8Eec0E6285c81972B5eEcd8dA241a4bCb5'
    }
  }
];
