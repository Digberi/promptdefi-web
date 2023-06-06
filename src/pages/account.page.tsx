import { SmartToy, Wallet } from '@mui/icons-material';
import { Avatar, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import { useAccount, useBalance, useNetwork } from 'wagmi';

import { Page } from '@/components/base/page';
import { ConnectButton } from '@/components/connect-button';
import { Token, tokens } from '@/config/tokens';
import { useSmartAccount } from '@/hooks/use-smart-account';
import { shrink } from '@/utils/shrink';

const bgcolor = 'background.paper';

const Balance = (token: Token) => {
  const { address } = useAccount();

  const { data: tokenInfo } = useBalance({
    address,
    token: token.address
  });

  return (
    <ListItem
      sx={{
        borderRadius: 2,
        bgcolor,
        display: 'grid',
        gridTemplateColumns: 'auto 1fr auto'
      }}
    >
      <ListItemAvatar>
        <Avatar src={token.logoURI}>{token.symbol.slice(0, 2).toUpperCase()}</Avatar>
      </ListItemAvatar>
      <ListItemText primary={token.symbol} secondary={token?.name} />
      <ListItemText primary={tokenInfo?.formatted} />
    </ListItem>
  );
};

export const AccountPage = () => {
  const { address, isConnected } = useAccount();
  const { smartAccountAddress } = useSmartAccount();
  const { chain } = useNetwork();

  return (
    <Page>
      <ConnectButton />

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

      {isConnected && (
        <>
          <Typography variant="h6">Accounts</Typography>
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
        </>
      )}
      {isConnected && (
        <>
          <Typography variant="h6">Balances</Typography>
          <List
            sx={{
              display: 'grid',
              gap: 2
            }}
          >
            {tokens.map(token => (
              <Balance key={token.address} {...token} />
            ))}
          </List>
        </>
      )}
    </Page>
  );
};
