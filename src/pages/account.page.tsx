import { SmartToy, Wallet } from '@mui/icons-material';
import { Avatar, Box, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import { useAccount, useNetwork } from 'wagmi';

import { ConnectButton } from '@/components/connect-button';
import { useSmartAccount } from '@/hooks/use-smart-account';
import { shrink } from '@/utils/shrink';

const bgcolor = 'background.paper';

export const AccountPage = () => {
  const { address, isConnected } = useAccount();
  const { smartAccountAddress } = useSmartAccount();
  const { chain } = useNetwork();

  return (
    <Box>
      <Typography variant="h6">Network</Typography>
      <ListItem
        sx={{
          borderRadius: 2,
          bgcolor
        }}
      >
        <ListItemAvatar>
          <Avatar>{chain?.name.slice(0, 2).toUpperCase()}</Avatar>
        </ListItemAvatar>
        <ListItemText primary={chain?.name} />
      </ListItem>

      <Typography variant="h6">Accounts</Typography>
      {isConnected ? (
        <List>
          <ListItem
            sx={{
              borderRadius: 2,
              bgcolor
            }}
          >
            <ListItemAvatar>
              <Avatar>
                <Wallet />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Signer Address" secondary={shrink(address)} />
          </ListItem>

          <ListItem
            sx={{
              borderRadius: 2,
              bgcolor,
              mt: 3
            }}
          >
            <ListItemAvatar>
              <Avatar>
                <SmartToy />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Smart Account" secondary={shrink(smartAccountAddress)} />
          </ListItem>
        </List>
      ) : (
        <ConnectButton />
      )}
    </Box>
  );
};
