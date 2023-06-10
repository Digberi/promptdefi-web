import { createContext, useState } from 'react';

import { useProvider } from 'wagmi';

import { useAlert } from '../alert.provider';

import { bundlerClient } from '@/account-abstraction/bundler-client';
import { BUNDLER_CONTRACT_ADDRESS, ENTRYPOINT_ADDRESS } from '@/config/contracts';
import { preOpToBatchOp } from '@/core/helpers/pre-op-to-batch-op';
import { OperationDictionary } from '@/core/operations/operation';
import { OperationData } from '@/core/operations/operation.type';
import { useSmartAccount } from '@/hooks/use-smart-account';
import { PreOpStruct } from '@/types/custom';
import { CFC } from '@/types/react';

interface OperationsContextProps<T = unknown> {
  operations: Array<T>;
  updateOperation: (index: number, operation: T) => void;
  addOperation: (operation: T) => void;
  sendOperations: () => void;
  setOperations: (operations: Array<T>) => void;
}

export const OperationsContext = createContext<OperationsContextProps<OperationData>>({
  operations: [],
  updateOperation: () => {
    return;
  },
  addOperation: () => {
    return;
  },
  sendOperations: () => {
    return;
  },
  setOperations: () => {
    return;
  }
});

export const OperationsProvider: CFC = ({ children }) => {
  const [operations, setOperations] = useState<Array<OperationData>>([]);
  const { smartAccountApi } = useSmartAccount();
  const provider = useProvider();
  const { callAlert } = useAlert();

  const updateOperation = (index: number, operation: OperationData) => {
    setOperations(prevState => {
      const newState = [...prevState];
      newState[index] = operation;

      return newState;
    });
  };

  const addOperation = (operation: OperationData) => {
    setOperations(prevState => [...prevState, operation]);
  };

  const sendOperations = async () => {
    if (!operations.length || !smartAccountApi) {
      return;
    }

    const batchPreOp = await operations.reduce(async (acc, operation) => {
      const accum = await acc;

      const creator = OperationDictionary[operation.kind];

      // @ts-ignore
      const preOp = await creator(operation.data);

      return accum.concat(preOp);
    }, Promise.resolve([]) as Promise<Array<PreOpStruct>>);

    const batchOp = preOpToBatchOp(batchPreOp);

    console.log({ batchOp });

    const unsignedBatchOp = await smartAccountApi.createUnsignedUserBatchOp({ ...batchOp, gasLimit: 1000000 });

    console.log({ unsignedBatchOp });

    const op = await smartAccountApi.signUserOp(unsignedBatchOp);

    console.log({ op });

    const some = await bundlerClient.sendUserOpToBundler(op);

    console.log({ some });

    provider.on('block', async (level: number) => {
      const { transactions } = await provider.getBlockWithTransactions(level);
      const transaction = transactions.find(_transaction => {
        return _transaction.from === BUNDLER_CONTRACT_ADDRESS && _transaction.to === ENTRYPOINT_ADDRESS;
      });
      if (!transaction) {
        return;
      }

      provider.off('block');

      transaction
        .wait(1)
        .then(receipt => {
          if (receipt.status) {
            callAlert(
              `Transaction mined:`,
              `https://goerli.etherscan.io/tx/${receipt.transactionHash}`,
              receipt.status
            );
          } else {
            callAlert(`Transaction failed:`, `https://goerli.etherscan.io/tx/${receipt.transactionHash}`, 0);
          }
        })
        .catch(() => {
          callAlert(`Transaction failed:`, `https://goerli.etherscan.io/tx/${transaction.hash}`, 0);
        });
    });

    // setOperations([]);
  };

  return (
    <OperationsContext.Provider value={{ operations, updateOperation, addOperation, sendOperations, setOperations }}>
      {children}
    </OperationsContext.Provider>
  );
};
