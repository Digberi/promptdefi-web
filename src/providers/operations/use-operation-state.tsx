import { useState } from 'react';

import { OperationData } from '@/core/operations/operation.type';

export const useOperationState = () => {
  const [operations, setOperations] = useState<Array<OperationData>>([]);

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

  return {
    operations,
    addOperation,
    updateOperation,
    setOperations
  };
};
