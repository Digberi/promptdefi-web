import { BatchAccountAPI } from './batch-simple-account-api';
import { CustomPaymasterAPI } from './paymaster-api';

import { ENTRYPOINT_ADDRESS, FACTORY_ADDRESS } from '@/config/contracts';

export type createAccountParams = Pick<ConstructorParameters<typeof BatchAccountAPI>[0], 'provider'> & {
  signer: ConstructorParameters<typeof BatchAccountAPI>[0]['owner'];
};

export const accountApiFactory = async ({ provider, signer }: createAccountParams) =>
  new BatchAccountAPI({
    provider,
    entryPointAddress: ENTRYPOINT_ADDRESS,
    owner: signer,
    factoryAddress: FACTORY_ADDRESS,
    paymasterAPI: new CustomPaymasterAPI()
  });
