import { ENTRYPOINT_ADDRESS, FACTORY_ADDRESS } from "@/config/constants";
import { CustomPaymasterAPI } from "./paymaster-api";
import { SimpleAccountAPI } from "@account-abstraction/sdk";

export type createAccountParams = Pick<ConstructorParameters<typeof SimpleAccountAPI>[0], 'provider'> & {
  signer: ConstructorParameters<typeof SimpleAccountAPI>[0]['owner'];
};

export const AccountApiFactory = async ({provider, signer}:createAccountParams) => new SimpleAccountAPI({
  provider,
  entryPointAddress: ENTRYPOINT_ADDRESS,
  owner: signer,
  factoryAddress: FACTORY_ADDRESS,
  paymasterAPI: new CustomPaymasterAPI(),
})