import { accountApiFactory } from "@/account-abstraction/account-api";
import { useBatchAccountApi } from "@/hooks/use-batch-account-api";
import { BigNumber } from "@ethersproject/bignumber";
import { useEffect, useState } from "react";
import { useAccount, useProvider, useSigner } from "wagmi";

export const EthBalance = () => {
  const { address, isConnected } = useAccount();

  const provider = useProvider();

  const [balance, setBalance] = useState<BigNumber | null>(null);

  const { accountAddress } = useBatchAccountApi();

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
      <h1>Account Address is {accountAddress}</h1>
    </div>
  )
}