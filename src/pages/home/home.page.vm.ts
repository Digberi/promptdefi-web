import { useState } from 'react';

import { OperationData } from '@/core/operations/operation.type';
import { operationsInitialState } from '@/providers/operations/test-state';

export const useHomeViewModel = () => {
  const sendPromt = (message: string, callback: (operations: Array<OperationData>) => void) => {
    const operations = operationsInitialState;

    callback(operations);
  };

  const [promtMessage, setPromtMessage] = useState<string>('');

  return {
    sendPromt,
    promtMessage,
    setPromtMessage
  };
};
