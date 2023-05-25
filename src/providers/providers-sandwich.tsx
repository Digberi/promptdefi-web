
import { CFC } from "@/types/react";
import { WagmiProvider } from "./wagmi-provider";

export const ProvidersSandwich: CFC = ({ children }) => {
  return (
    <WagmiProvider>
      {children}
    </WagmiProvider>
  );
}