import { useCallback } from 'react';

import { Box, Button } from '@mui/material';
import { useAccount, useBalance, useProvider, useSigner } from 'wagmi';

import { bundlerClient } from '@/account-abstraction/bandler-client';
import { getSendTokenPreOp } from '@/core/send-token';
import { getWrappedEthPreOp } from '@/core/wrap-eth';
import { useSmartAccount } from '@/hooks/use-smart-account';
import { preOpToBatchOp } from '@/utils/pre-op-to-batch-op';

const TokenAddress = '0x2e8d98fd126a32362f2bd8aa427e59a1ec63f780';

export const SendBatch = () => {
  const { address, isConnected } = useAccount();
  const provider = useProvider();
  const { data: signer } = useSigner();
  const { smartAccountApi, smartAccountAddress } = useSmartAccount();

  const { data: tokenInfo } = useBalance({
    address: smartAccountAddress,
    token: TokenAddress
  });

  const sendBatchTokens = useCallback(async () => {
    try {
      console.log('sendBatch');
      if (!isConnected || !signer || !address || !provider || !smartAccountApi || !smartAccountAddress) {
        return;
      }

      console.log({ smartAccountAddress });

      const preOp = getSendTokenPreOp(TokenAddress, address, '22');
      const secondPreOp = getSendTokenPreOp(TokenAddress, '0xd27aCC8Eec0E6285c81972B5eEcd8dA241a4bCb5', '56');

      const batchOp = preOpToBatchOp([preOp, secondPreOp]);

      const op = await smartAccountApi.createSignedUserBatchOp(batchOp);

      const opHash = await bundlerClient.sendUserOpToBundler(op);
      console.log(opHash);

      return opHash;
    } catch (e) {
      console.error(e);
    }
  }, [isConnected, signer, address, provider, smartAccountApi, smartAccountAddress]);

  const sendWrapEth = useCallback(async () => {
    if (!isConnected || !signer || !address || !provider || !smartAccountApi || !smartAccountAddress) {
      return;
    }
    const preOp = getWrappedEthPreOp('152');

    const op = await smartAccountApi.createSignedUserOp(preOp);

    const opHash = await bundlerClient.sendUserOpToBundler(op);
    console.log(opHash);
  }, [address, isConnected, provider, signer, smartAccountAddress, smartAccountApi]);

  const lidoDeposit = useCallback(async () => {
    if (!isConnected || !signer || !address || !provider || !smartAccountApi || !smartAccountAddress) {
      return;
    }
    const preOp = getWrappedEthPreOp('234');

    const op = await smartAccountApi.createSignedUserOp(preOp);

    const opHash = await bundlerClient.sendUserOpToBundler(op);
    console.log(opHash);
  }, [address, isConnected, provider, signer, smartAccountAddress, smartAccountApi]);

  return (
    <Box
      sx={{
        margin: 3
      }}
    >
      <Box>
        Token({tokenInfo?.symbol}) balance is {tokenInfo?.value.div(tokenInfo.decimals).toString()}
      </Box>
      <Button onClick={async () => sendBatchTokens()}>Send Batch Tokens</Button>
      <Button onClick={async () => sendWrapEth()}>Send Wrap Eth</Button>
      <Button onClick={async () => lidoDeposit()}>Lido Deposit</Button>
    </Box>
  );
};
