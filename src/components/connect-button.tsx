import { Button } from '@mui/material';
import { useAccount, useConnect, useDisconnect } from 'wagmi';

import { Web3AuthConnector } from '@/auth/wagmi';
import { shrink } from '@/utils/shrink';

export const ConnectButton = () => {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect({
    connector: Web3AuthConnector
  });
  const { disconnect } = useDisconnect();

  const shortAddress = shrink(address); // s

  console.log(address);

  return (
    <div>
      {isConnected ? (
        <Button onClick={() => disconnect()}>{shortAddress}</Button>
      ) : (
        <Button onClick={() => connect()}>Connect</Button>
      )}
    </div>
  );
};
