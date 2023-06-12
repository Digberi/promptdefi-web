import { Box, Button, CircularProgress, Link, styled } from '@mui/material';

import { LINK_FAUCET_URL } from '@/config/constants';
import { getMintPreOps } from '@/core/aave-faucet';
import { useSendBatch } from '@/hooks/use-send-batch';
import { useSmartAccount } from '@/hooks/use-smart-account';
import { useSubscribeOperation } from '@/hooks/use-subscribe-operation';

const FButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  width: '100%',
  borderRadius: theme.spacing(1),
  fontWeight: theme.typography.fontWeightBold,
  ':hover': {
    backgroundColor: theme.palette.background.default
  }
}));

export const FaucetButton = () => {
  const { smartAccountAddress } = useSmartAccount();
  const { sendBatch } = useSendBatch();
  const { subscribe, loading } = useSubscribeOperation();

  const faucet = async () => {
    if (!smartAccountAddress) {
      return;
    }
    const preOp = getMintPreOps(smartAccountAddress);

    const hash = await sendBatch(preOp, {
      gasLimit: 1_000_000
    });
    console.log(hash);
    subscribe();
  };

  return (
    <Box
      sx={{
        display: 'grid',
        gap: 1
      }}
    >
      <Link href={LINK_FAUCET_URL} target="_blank">
        <FButton>Get Link token</FButton>
      </Link>
      <FButton onClick={faucet}>{loading ? <CircularProgress /> : 'Get stablecoins'}</FButton>
    </Box>
  );
};
