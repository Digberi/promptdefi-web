import { wagmiClient } from "@/auth/wagmi";
import { CFC } from "@/types/react";
import { WagmiConfig } from "wagmi";

export const WagmiProvider: CFC = ({ children }) => {
  return (
    <WagmiConfig client={wagmiClient}>{children}</WagmiConfig>
  )
}
