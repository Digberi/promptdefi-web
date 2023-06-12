import { useState } from 'react';

import { useProvider } from 'wagmi';

import { useSubscribeOnBlock } from './use-subscribe-on-block';

import { ETHERSCAN_TX_URL } from '@/config/constants';
import { useAlert } from '@/providers/alert.provider';
import { awaiter } from '@/utils/awaiter';
import { findBundlerTransaction } from '@/utils/find-bunler-transaction';

export const useSubscribeOperation = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const provider = useProvider();
  const { callAlert } = useAlert();
  const { subscribe: sub } = useSubscribeOnBlock();

  const subscribe = () => {
    setLoading(true);

    sub(async (level, unsubscribe) => {
      const { transactions } = await provider.getBlockWithTransactions(level);
      const transaction = await findBundlerTransaction(transactions);
      if (!transaction) {
        return;
      }
      setLoading(false);
      unsubscribe();

      const etherscanLink = `${ETHERSCAN_TX_URL}/${transaction.hash}`;
      const { data: receipt, isOk } = await awaiter(transaction.wait(0), rec => rec.status === 1);

      if (!isOk) {
        callAlert(`Transaction failed:`, etherscanLink, 0);

        return;
      }

      callAlert(`Transaction mined:`, etherscanLink, receipt.status ?? 1);
    });
  };

  return { subscribe, loading };
};
