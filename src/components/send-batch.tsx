import { useCallback } from 'react';

import { Box, Button } from '@mui/material';
import { utils } from 'ethers';
import { useAccount, useBalance, useProvider, useSigner } from 'wagmi';

import { bundlerClient } from '@/account-abstraction/bandler-client';
// import { entryDepositTo } from '@/core/entrypoint-deposit-to';
import { preOpToBatchOp } from '@/core/helpers/pre-op-to-batch-op';
import { sendEth } from '@/core/send-eth';
import { Erc20 } from '@/core/support-transactions/erc20-token';
import { Lido } from '@/core/support-transactions/lido-deposit';
import { WrapEth } from '@/core/support-transactions/wrap-eth';
import { useEntrypointDepositBalance } from '@/hooks/use-entrypont-deposit-balance';
import { useSmartAccount } from '@/hooks/use-smart-account';
import { toReal } from '@/utils/to-real';

const TokenAddress = '0x2e8d98fd126a32362f2bd8aa427e59a1ec63f780';

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

      const preOp = Erc20.createSendPreOp(TokenAddress, address, '22');
      const secondPreOp = Erc20.createSendPreOp(TokenAddress, '0xd27aCC8Eec0E6285c81972B5eEcd8dA241a4bCb5', '56');

      const batchOp = preOpToBatchOp(preOp.concat(secondPreOp));

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
    const preOp = WrapEth.createDepositPreOp('20000');

    const op = await smartAccountApi.createSignedUserOp({ ...preOp[0], gasLimit: '100000' });
    console.log({ op });

    const opHash = await bundlerClient.sendUserOpToBundler(op);
    console.log(opHash);
  }, [address, isConnected, provider, signer, smartAccountAddress, smartAccountApi]);

  const lidoDeposit = useCallback(async () => {
    if (!isConnected || !signer || !address || !provider || !smartAccountApi || !smartAccountAddress) {
      return;
    }
    const preOp = Lido.createDepositPreOp('15000');

    const op = await smartAccountApi.createSignedUserOp({ ...preOp[0], gasLimit: '100000' });

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
