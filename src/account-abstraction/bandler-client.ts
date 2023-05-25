import { BUNDLER_URL, ENTRYPOINT_ADDRESS } from "@/config/constants";
import { HttpRpcClient } from "@account-abstraction/sdk";
import { goerli } from "wagmi/chains";

const GOERLI_CHAIN_ID = goerli.id

export const bundlerClient = new HttpRpcClient(BUNDLER_URL, ENTRYPOINT_ADDRESS, GOERLI_CHAIN_ID);