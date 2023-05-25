import { bundlerClient } from "@/account-abstraction/bandler-client";
import { ENTRYPOINT_ADDRESS } from "@/config/constants";
import { useBatchAccountApi } from "@/hooks/use-batch-account-api";
import { EntryPoint__factory } from "@account-abstraction/contracts";
import { utils } from "ethers";
import { useCallback } from "react";
import { erc20ABI, useAccount, useBalance, useProvider, useSigner } from "wagmi"

const TokenAddress = '0x2e8d98fd126a32362f2bd8aa427e59a1ec63f780';

export const SendBatch = () => {
  const { address, isConnected } = useAccount();
  const provider = useProvider();
  const { data: signer } = useSigner();
  const { batchAccountApi, accountAddress } = useBatchAccountApi();

  const { data: tokenInfo } = useBalance({ address: accountAddress , token:TokenAddress });

  const sendBatch = useCallback(async () => {
    try {
      console.log('sendBatch')
      if (!signer) return;
      if (!provider) return;
      if (!isConnected) return;
      if (!batchAccountApi) return;
      if (!accountAddress) return;

      const entrypoint = EntryPoint__factory.connect(ENTRYPOINT_ADDRESS, signer);
      console.log('create entrypoint')

      const result = await entrypoint.functions.depositTo(accountAddress, { value: utils.parseEther('0.1') })
      console.log('send depositTo')

      console.log(result.hash)
      await result.wait(1)
      console.log('wait confirm')

      const erc20Interface = new utils.Interface(erc20ABI);
      const firstData = erc20Interface.encodeFunctionData("transfer", [
        address,
        '22',
      ]);
      const secondData = erc20Interface.encodeFunctionData("transfer", [
        '0xd27aCC8Eec0E6285c81972B5eEcd8dA241a4bCb5',
        '56',
      ]);

      const op = await batchAccountApi.createSignedUserBatchOp({
        target: [TokenAddress, TokenAddress],
        data: [firstData, secondData],
      })

      // const op = await batchAccountApi.createSignedUserOp({
      //   target: TokenAddress,
      //   data: secondData,
      // })

      const opHash = await bundlerClient.sendUserOpToBundler(op);
      console.log(opHash)
      return opHash;
    } catch (e) {
      console.error(e);
    }
  }, [accountAddress, batchAccountApi, isConnected, provider, signer]);

  return (
    <div>
      <div>Token({tokenInfo?.symbol}) balance is {tokenInfo?.value.div(tokenInfo.decimals).toString()}</div>
      <button onClick={() => sendBatch()}>Send Batch</button>
    </div>
  )
}