import { FC, useEffect } from 'react';

import { ContentCopy, LinkOff, SmartToy, Wallet } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  styled
} from '@mui/material';
import { goerli, useAccount, useBalance, useConnect, useDisconnect } from 'wagmi';

import { Web3AuthConnector } from '@/auth/wagmi';
import { Page } from '@/components/base/page';
import { FaucetButton } from '@/components/ui/faucet-button';
import { NetworkAvatar } from '@/components/ui/network-avatar';
import { Token, tokens } from '@/config/tokens';
import { useSmartAccount } from '@/hooks/use-smart-account';
import { useSubscribeOnBlock } from '@/hooks/use-subscribe-on-block';
import { CFC } from '@/types/react';
import { copy } from '@/utils/copy';
import { shrink } from '@/utils/shrink';

const Tile = styled(ListItem)(({ theme }) => ({
  borderRadius: theme.spacing(1),
  backgroundColor: theme.palette.background.paper
}));

const SubHeader = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontWeight: theme.typography.fontWeightBold,
  fontSize: theme.typography.pxToRem(14),
  padding: theme.spacing(1),
  paddingBottom: theme.spacing(0.5)
}));

const GridList = styled(List)(({ theme }) => ({
  display: 'grid',
  gap: theme.spacing(1)
}));

const subs: Record<string, boolean> = {};

const Balance: FC<{ token: Token }> = ({ token }) => {
  const { smartAccountAddress } = useSmartAccount();
  const { subscribe } = useSubscribeOnBlock();

  const { data: tokenInfo, refetch } = useBalance({
    address: smartAccountAddress,
    token: token.address
  });

  useEffect(() => {
    if (subs[token.address ?? '0']) {
      return;
    }

    subs[token.address ?? '0'] = true;

    subscribe(() => {
      refetch();
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Tile
      sx={{
        display: 'grid',
        gridTemplateColumns: 'auto 1fr auto'
      }}
    >
      <ListItemAvatar>
        <Avatar
          sx={{
            width: 32,
            height: 32
          }}
          src={token.logoURI}
        >
          {token.symbol.slice(0, 2).toUpperCase()}
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primaryTypographyProps={{
          variant: 'body2'
        }}
        secondaryTypographyProps={{
          variant: 'caption'
        }}
        primary={token.symbol}
        secondary={token?.name}
      />
      <ListItemText
        primaryTypographyProps={{
          variant: 'body2',
          sx: {
            textAlign: 'right',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            maxWidth: '72px'
          }
        }}
        primary={tokenInfo?.formatted}
      />
    </Tile>
  );
};

const AddressTile: CFC<{ address?: string; label: string; icon: typeof Wallet }> = ({
  address,
  label,
  icon,
  children
}) => {
  const TileIcon = icon;

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'auto 1fr auto',
        gridTemplateRows: 'auto auto',
        columnGap: 1,
        flex: 1
      }}
    >
      <Typography
        sx={{
          gridColumn: '1 / 3',
          gridRow: '1 / 2'
        }}
        variant="caption"
        color="text.secondary"
      >
        {label}
      </Typography>

      <Box
        sx={{
          gridColumn: '1 / 2',
          gridRow: '2 / 3',
          alignSelf: 'center'
        }}
      >
        <TileIcon
          sx={{
            color: 'text.secondary'
          }}
        />
      </Box>

      <Typography
        sx={{
          gridColumn: '2 / 3',
          gridRow: '2 / 3'
        }}
        variant="body1"
      >
        {shrink(address)}
      </Typography>

      <Box
        sx={{
          gridColumn: '3 / 4',
          gridRow: '1 / 3',
          display: 'grid',
          placeItems: 'center'
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

const WalletTile = () => {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect({
    connector: Web3AuthConnector
  });
  const { disconnect } = useDisconnect();

  return (
    <Tile>
      {isConnected ? (
        <AddressTile icon={Wallet} label="Signer Account" address={address}>
          <IconButton size="small" onClick={() => disconnect()}>
            <LinkOff
              sx={{
                color: 'primary.main'
              }}
            />
          </IconButton>
        </AddressTile>
      ) : (
        <Button
          sx={{
            flex: 1,
            alignSelf: 'center',
            justifySelf: 'center'
          }}
          variant="contained"
          onClick={() => connect()}
        >
          Connect web3
        </Button>
      )}
    </Tile>
  );
};

const SmartAccountTile = () => {
  const { smartAccountAddress } = useSmartAccount();

  return (
    <Tile>
      <AddressTile icon={SmartToy} label="Smart Account" address={smartAccountAddress}>
        <IconButton size="small" onClick={() => copy(smartAccountAddress)}>
          <ContentCopy
            sx={{
              color: 'primary.main'
            }}
          />
        </IconButton>
      </AddressTile>
    </Tile>
  );
};

export const AccountPage = () => {
  const { address, isConnected } = useAccount();
  const { smartAccountAddress } = useSmartAccount();

  const isReady = isConnected && address && smartAccountAddress;

  return (
    <Page>
      <SubHeader>Network</SubHeader>
      <Tile>
        <ListItemAvatar>
          <NetworkAvatar />
        </ListItemAvatar>
        <ListItemText primary={goerli.name} />
      </Tile>

      <SubHeader>Accounts</SubHeader>
      <GridList>
        <WalletTile />
        {isReady && <SmartAccountTile />}
      </GridList>

      {isReady && (
        <>
          <SubHeader>Faucet</SubHeader>
          <FaucetButton />

          <SubHeader>Balances</SubHeader>
          <GridList>
            {tokens.map(token => (
              <Balance key={token.address ?? '0'} token={token} />
            ))}
          </GridList>
        </>
      )}
    </Page>
  );
};
