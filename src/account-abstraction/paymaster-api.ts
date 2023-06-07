import { UserOperationStruct } from '@account-abstraction/contracts';
import { PaymasterAPI } from '@account-abstraction/sdk';
import { defaultAbiCoder, hexConcat } from 'ethers/lib/utils.js';

import { PAYMASTER_ADDRESS } from '@/config/contracts';

export class CustomPaymasterAPI extends PaymasterAPI {
  paymasterAddress: string;

  constructor() {
    super();
    this.paymasterAddress = PAYMASTER_ADDRESS;
  }

  async getPaymasterAndData(userOp: Partial<UserOperationStruct>): Promise<string | undefined> {
    console.log({ userOp });

    return hexConcat([this.paymasterAddress, defaultAbiCoder.encode(['uint48', 'uint48'], [10000000000000, 0])]);
  }
}
