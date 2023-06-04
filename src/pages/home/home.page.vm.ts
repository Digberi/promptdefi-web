import { useState } from 'react';

export const useHomeViewModel = () => {
  const sendPromt = (message: string, callback: (result: boolean) => void) => {
    const result = window.confirm(message);
    callback(result);
  };

  const [promtMessage, setPromtMessage] = useState<string>('');

  return {
    sendPromt,
    promtMessage,
    setPromtMessage
  };
};
