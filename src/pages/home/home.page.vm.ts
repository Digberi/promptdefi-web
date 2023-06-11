import { useState } from 'react';

import { PROMT_API_URL } from '@/config/constants';
import { formatCandidate } from '@/core/operations/format-candidate';
import { OperationData } from '@/core/operations/operation.type';
import { useSmartAccount } from '@/hooks/use-smart-account';
import { useAlert } from '@/providers/alert.provider';

export const useHomeViewModel = () => {
  const { smartAccountAddress } = useSmartAccount();
  const [promtMessage, setPromtMessage] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { callAlert } = useAlert();

  const sendPromt = async (_message: string, callback: (operations: Array<OperationData>) => void) => {
    try {
      if (!_message) {
        throw new Error('Message is empty');
      }
      if (!smartAccountAddress) {
        throw new Error('Smart account address is empty');
      }

      setIsSubmitting(true);

      const response = await fetch(PROMT_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          prompt: _message.replace('%', 'percents')
        })
      });

      const candidate = await response.json();
      // const candidate = [
      //   {
      //     action: 'CreatePortfolio',
      //     assets: [
      //       {
      //         token: 'WETH',
      //         amount: '0.001'
      //       }
      //     ],
      //     stopLoss: '-10',
      //     takeProfit: '10'
      //   }
      // ];

      const operations = formatCandidate(candidate, smartAccountAddress);

      setIsSubmitting(false);

      callback(operations);
    } catch (error) {
      callAlert('Sorry, something went wrong. Please try other promt.', '', 0);
      setIsSubmitting(false);
    }
  };

  return {
    isSubmitting,
    sendPromt,
    promtMessage,
    setPromtMessage
  };
};
