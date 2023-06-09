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

  const shortAddress = shrink(address);

  return (
    <div>
      {isConnected ? (
        <Button onClick={() => disconnect()}>{shortAddress}</Button>
      ) : (
        <Button color="secondary" onClick={() => connect()}>
          Connect
        </Button>
      )}
    </div>
  );
};
