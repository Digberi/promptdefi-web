import { Web3AuthConnector } from "@/auth/wagmi";
import { useAccount, useConnect, useDisconnect } from "wagmi";

export const ConnectButton = () => {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect({
    connector: Web3AuthConnector
  });
  const { disconnect } = useDisconnect();

  const shortAddress = address && address.substring(0, 6) + "..." + address.substring(address.length - 4);

  console.log(address)

  return (
    <div>
      {isConnected ? (
        <button onClick={() => disconnect()}>{shortAddress}</button>
      ) : (
        <button onClick={() => connect()}>Connect</button>
      )}
    </div>
  )
}