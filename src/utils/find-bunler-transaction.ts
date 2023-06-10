import { TransactionResponse } from '@ethersproject/providers';

import { BUNDLER_CONTRACT_ADDRESS, ENTRYPOINT_ADDRESS } from '@/config/contracts';

export const findBundlerTransaction = async (transactions: Array<TransactionResponse>) =>
  transactions.find(
    transaction => transaction.from === BUNDLER_CONTRACT_ADDRESS && transaction.to === ENTRYPOINT_ADDRESS
  );
