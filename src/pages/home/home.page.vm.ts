import { useState } from 'react';

import { PROMT_API_URL } from '@/config/constants';
import { OperationData } from '@/core/operations/operation.type';
import { operationsInitialState } from '@/providers/operations/test-state';

export const useHomeViewModel = () => {
  const sendPromt = async (_message: string, callback: (operations: Array<OperationData>) => void) => {
    console.log(_message);

    const response = await fetch(PROMT_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        prompt: _message
      })
    });

    const candidate = await response.json();

    console.log(candidate);

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
