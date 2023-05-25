import { Web3AuthConnectorInstance } from "@/auth/web3-auth";
import { configureChains, createConfig } from "wagmi";
import { goerli } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [goerli],
  [publicProvider()],
 )

export const Web3AuthConnector = Web3AuthConnectorInstance(chains)
 
export const wagmiConfig = createConfig({
   autoConnect: true,
   connectors: [Web3AuthConnector],
  publicClient, 
  webSocketPublicClient
 })