import { useSmartAccount } from './use-smart-account';

import { TypeDataFreeTransactionDetails } from '@/account-abstraction/batch-simple-account-api';
import { bundlerClient } from '@/account-abstraction/bundler-client';
import { preOpToBatchOp } from '@/core/helpers/pre-op-to-batch-op';
import { PreOpStruct } from '@/types/custom';

interface Options {
  log?: boolean;
  overrides?: TypeDataFreeTransactionDetails;
}

export const useSendBatch = (params?: Options) => {
  const { smartAccountApi } = useSmartAccount();

  const logIf = (...data: Parameters<typeof console.log>) => {
    if (params?.log) {
      console.log(...data);
    }
  };

  const sendBatch = async (batch: Array<PreOpStruct>, overrides?: TypeDataFreeTransactionDetails) => {
    if (!smartAccountApi) {
      throw new Error('Wallet not connected');
    }
    const batchOp = preOpToBatchOp(batch);

    logIf({ batchOp });

    const unsignedUserOperationStruct = await smartAccountApi.createUnsignedUserBatchOp({
      ...batchOp,
      ...params?.overrides,
      ...overrides
    });

    logIf({ unsignedUserOperationStruct });

    const signerUserOperationStruct = await smartAccountApi.signUserOp(unsignedUserOperationStruct);

    logIf({ signerUserOperationStruct });

    const uselessHash = await bundlerClient.sendUserOpToBundler(signerUserOperationStruct);

    logIf({ uselessHash });

    return uselessHash;
  };

  return {
    sendBatch
  };
};
