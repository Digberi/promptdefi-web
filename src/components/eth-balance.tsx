import { BigNumber } from "@ethersproject/bignumber";
import { useEffect, useState } from "react";
import { useAccount, useProvider } from "wagmi";

export const EthBalance = () => {
  const { address, isConnected } = useAccount();

  const provider = useProvider();
  const [balance, setBalance] = useState<BigNumber | null>(null);

  useEffect(() => {
    if (isConnected && provider && address) {
      provider.getBalance(address).then((balance) => {
        setBalance(balance);
      });
    }
  }, [provider, isConnected, address]);

  return (
    <div>
      <h1>ETH Balance of {address} is {balance?.toString()}</h1>
    </div>
  )
}