import { Box, Button } from '@mui/material';
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
    <Box
      sx={{
        width: '100%'
      }}
    >
      {isConnected ? (
        <Button onClick={() => disconnect()}>{shortAddress}</Button>
      ) : (
        <Button
          sx={{
            width: '100%'
          }}
          variant="contained"
          color="success"
          onClick={() => connect()}
        >
          Connect
        </Button>
      )}
    </Box>
  );
};
