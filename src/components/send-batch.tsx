import { useCallback } from 'react';

import { Box, Button } from '@mui/material';
import { utils } from 'ethers';
import { useAccount, useBalance, useProvider, useSigner } from 'wagmi';

import { bundlerClient } from '@/account-abstraction/bandler-client';
// import { entryDepositTo } from '@/core/entrypoint-deposit-to';
import { sendEth } from '@/core/send-eth';
import { getSendTokenPreOp } from '@/core/send-token';
import { getWrappedEthPreOp } from '@/core/wrap-eth';
import { useEntrypointDepositBalance } from '@/hooks/use-entrypont-deposit-balance';
import { useSmartAccount } from '@/hooks/use-smart-account';
import { preOpToBatchOp } from '@/utils/pre-op-to-batch-op';

const TokenAddress = '0x2e8d98fd126a32362f2bd8aa427e59a1ec63f780';

const toReal = (value?: string, decimals?: number) => {
  return value && decimals && utils.formatUnits(value, decimals);
};

export const SendBatch = () => {
  const { address, isConnected } = useAccount();
  const provider = useProvider();
  const { data: signer } = useSigner();
  const { smartAccountApi, smartAccountAddress } = useSmartAccount();

  const { data: usdtInfoOfSA } = useBalance({
    address: smartAccountAddress,
    token: TokenAddress
  });
  const { data: ethInfoOfSA } = useBalance({
    address: smartAccountAddress
  });

  const { balance } = useEntrypointDepositBalance();
  const { data: ethInfoOfUser } = useBalance({
    address
  });

  const sendBatchTokens = useCallback(async () => {
    try {
      console.log('sendBatch');
      if (!isConnected || !signer || !address || !provider || !smartAccountApi || !smartAccountAddress) {
        return;
      }
      console.log({ smartAccountAddress });

      // const { tx } = await entryDepositTo(signer, smartAccountAddress, '0.1');
      // console.log({ hash: tx.hash });

      const preOp = getSendTokenPreOp(TokenAddress, address, '22');
      const secondPreOp = getSendTokenPreOp(TokenAddress, '0xd27aCC8Eec0E6285c81972B5eEcd8dA241a4bCb5', '56');

      const batchOp = preOpToBatchOp([preOp, secondPreOp]);

      const op = await smartAccountApi.createSignedUserBatchOp(batchOp);
      console.log({ op });

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
    const tx = await sendEth(signer, smartAccountAddress, utils.parseEther('0.001'));
    console.log({ hash: tx });
    const preOp = getWrappedEthPreOp('20000');

    const op = await smartAccountApi.createSignedUserOp({ ...preOp, gasLimit: '100000' });
    console.log({ op });

    const opHash = await bundlerClient.sendUserOpToBundler(op);
    console.log(opHash);
  }, [address, isConnected, provider, signer, smartAccountAddress, smartAccountApi]);

  const lidoDeposit = useCallback(async () => {
    if (!isConnected || !signer || !address || !provider || !smartAccountApi || !smartAccountAddress) {
      return;
    }
    const preOp = getWrappedEthPreOp('15000');

    const op = await smartAccountApi.createSignedUserOp({ ...preOp, gasLimit: '100000' });

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
        Token({usdtInfoOfSA?.symbol}) balance of smartAccount is{' '}
        {toReal(usdtInfoOfSA?.value.toString(), usdtInfoOfSA?.decimals)}
      </Box>
      <Box>Eth balance of smartAccount on EntryPoint is {toReal(balance.toString(), usdtInfoOfSA?.decimals)}</Box>
      <Box>Eth balance of smartAccount is {toReal(ethInfoOfSA?.value.toString(), ethInfoOfSA?.decimals)}</Box>
      <Box>Eth balance of user is {toReal(ethInfoOfUser?.value.toString(), ethInfoOfUser?.decimals)}</Box>

      <Button onClick={async () => sendBatchTokens()}>Send Batch Tokens</Button>
      <Button onClick={async () => sendWrapEth()}>Send Wrap Eth</Button>
      <Button onClick={async () => lidoDeposit()}>Lido Deposit</Button>
    </Box>
  );
};
