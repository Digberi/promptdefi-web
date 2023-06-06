import { createContext, useState } from 'react';

import { operationsInitialState } from './test-state';

import { bundlerClient } from '@/account-abstraction/bandler-client';
import { preOpToBatchOp } from '@/core/helpers/pre-op-to-batch-op';
import { OperationDictionary } from '@/core/operations/operation';
import { OperationData } from '@/core/operations/operation.type';
import { useSmartAccount } from '@/hooks/use-smart-account';
import { PreOpStruct } from '@/types/custom';
import { CFC } from '@/types/react';

interface OperationsContextProps<T = unknown> {
  operations?: Array<T>;
  updateOperation?: (index: number, operation: T) => void;
  addOperation?: (operation: T) => void;
  sendOperations?: () => void;
}

export const OperationsContext = createContext<OperationsContextProps<OperationData>>({});

export const OperationsProvider: CFC = ({ children }) => {
  const [operations, setOperations] = useState<Array<OperationData>>(operationsInitialState);
  const { smartAccountApi } = useSmartAccount();
  console.log(operations);

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

    const batchPreOp = operations.reduce((acc, operation) => {
      const creator = OperationDictionary[operation.kind];

      // @ts-ignore
      return acc.concat(creator(operation.data));
    }, [] as Array<PreOpStruct>);

    const batchOp = preOpToBatchOp(batchPreOp);

    const op = await smartAccountApi.createSignedUserBatchOp(batchOp);

    await bundlerClient.sendUserOpToBundler(op);

    setOperations([]);
  };

  return (
    <OperationsContext.Provider value={{ operations, updateOperation, addOperation, sendOperations }}>
      {children}
    </OperationsContext.Provider>
  );
};
