import { useProvider } from 'wagmi';

import { OperationsContext } from './operations.context';
import { useOperationState } from './use-operation-state';
import { useAlert } from '../alert.provider';

import { ETHERSCAN_TX_URL } from '@/config/constants';
import { OperationDictionary } from '@/core/operations/operation';
import { OperationData } from '@/core/operations/operation.type';
import { useSendBatch } from '@/hooks/use-send-batch';
import { useSmartAccount } from '@/hooks/use-smart-account';
import { useSubscribeOnBlock } from '@/hooks/use-subscribe-on-block';
import { PreOpStruct } from '@/types/custom';
import { CFC } from '@/types/react';
import { asyncReduce } from '@/utils/async-reducer';
import { awaiter } from '@/utils/awaiter';
import { findBundlerTransaction } from '@/utils/find-bunler-transaction';

const reducer = async (acc: Array<PreOpStruct>, operation: OperationData) => {
  const creator = OperationDictionary[operation.kind];

  // @ts-ignore
  const preOp = await creator(operation.data);

  return acc.concat(preOp);
};

const createBatchPreOp = async (operations: Array<OperationData>) =>
  await asyncReduce(operations, reducer, [] as Array<PreOpStruct>);

export const OperationsProvider: CFC = ({ children }) => {
  const { operations, addOperation, updateOperation, setOperations } = useOperationState();
  const { smartAccountApi } = useSmartAccount();
  const provider = useProvider();
  const { callAlert } = useAlert();
  const { sendBatch } = useSendBatch({ log: true });
  const { subscribe } = useSubscribeOnBlock();

  const sendOperations = async () => {
    if (!operations.length || !smartAccountApi) {
      return;
    }

    const batchPreOp = await createBatchPreOp(operations);

    await sendBatch(batchPreOp, {
      gasLimit: 10_000_000
    });

    subscribe(async (level, unsubscribe) => {
      const { transactions } = await provider.getBlockWithTransactions(level);
      const transaction = await findBundlerTransaction(transactions);
      if (!transaction) {
        return;
      }

      unsubscribe();

      const etherscanLink = `${ETHERSCAN_TX_URL}/${transaction.hash}`;
      const { data: receipt, isOk } = await awaiter(transaction.wait(0));
      if (!isOk) {
        callAlert(`Transaction failed:`, etherscanLink, 0);

        return;
      }

      callAlert(`Transaction mined:`, etherscanLink, receipt.status ?? 1);
    });
  };

  return (
    <OperationsContext.Provider value={{ operations, updateOperation, addOperation, sendOperations, setOperations }}>
      {children}
    </OperationsContext.Provider>
  );
};
