import { useCallback } from 'react';

import { EntryPoint__factory } from '@account-abstraction/contracts';
import { Button } from '@mui/material';
import { utils } from 'ethers';
import { erc20ABI, useAccount, useBalance, useProvider, useSigner } from 'wagmi';

import { bundlerClient } from '@/account-abstraction/bandler-client';
import { ENTRYPOINT_ADDRESS } from '@/config/constants';
import { useSmartAccount } from '@/hooks/use-smart-account';

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

  const sendBatch = useCallback(async () => {
    try {
      console.log('sendBatch');
      if (!signer) {
        return;
      }
      if (!provider) {
        return;
      }
      if (!isConnected) {
        return;
      }
      if (!smartAccountApi) {
        return;
      }
      if (!smartAccountAddress) {
        return;
      }

      const entrypoint = EntryPoint__factory.connect(ENTRYPOINT_ADDRESS, signer);
      console.log('create entrypoint');

      const result = await entrypoint.functions.depositTo(smartAccountAddress, {
        value: utils.parseEther('0.1')
      });
      console.log('send depositTo');

      console.log(result.hash);
      await result.wait(1);
      console.log('wait confirm');

      const erc20Interface = new utils.Interface(erc20ABI);
      const firstData = erc20Interface.encodeFunctionData('transfer', [address, '22']);
      const secondData = erc20Interface.encodeFunctionData('transfer', [
        '0xd27aCC8Eec0E6285c81972B5eEcd8dA241a4bCb5',
        '56'
      ]);

      const op = await smartAccountApi.createSignedUserBatchOp({
        target: [TokenAddress, TokenAddress],
        data: [firstData, secondData]
      });

      // const op = await smartAccountApi.createSignedUserOp({
      //   target: TokenAddress,
      //   data: secondData,
      // })

      const opHash = await bundlerClient.sendUserOpToBundler(op);
      console.log(opHash);

      return opHash;
    } catch (e) {
      console.error(e);
    }
  }, [smartAccountAddress, address, smartAccountApi, isConnected, provider, signer]);

  return (
    <div>
      <div>
        Token({tokenInfo?.symbol}) balance is {tokenInfo?.value.div(tokenInfo.decimals).toString()}
      </div>
      <Button onClick={async () => sendBatch()}>Send Batch</Button>
    </div>
  );
};
