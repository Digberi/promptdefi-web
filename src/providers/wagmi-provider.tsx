import { wagmiConfig } from "@/auth/wagmi";
import { CFC } from "@/types/react";
import { WagmiConfig } from "wagmi";

export const WagmiProvider: CFC = ({ children }) => {
  return (
    <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>
  )
}
