import { useState } from 'react';

import { PROMT_API_URL } from '@/config/constants';
import { OperationData } from '@/core/operations/operation.type';
import { Operation } from '@/core/operations/operations.enum';
import { useSmartAccount } from '@/hooks/use-smart-account';

const formatOperations: Record<Operation, (candidate: Record<string, string>, walletAddress: string) => OperationData> =
  {
    [Operation.SwapTokens]: candidate =>
      ({
        kind: Operation.SwapTokens,
        data: {
          tokenSymbolIn: candidate.tokenFrom,
          tokenSymbolOut: candidate.tokenTo,
          amount: candidate.amountIn
        }
      } as const),
    [Operation.LidoDeposit]: candidate => ({
      kind: Operation.LidoDeposit,
      data: {
        amount: candidate.amount
      }
    }),
    [Operation.WrapEth]: candidate => ({
      kind: Operation.WrapEth,
      data: {
        amount: candidate.amount
      }
    }),
    [Operation.SendToken]: candidate => ({
      kind: Operation.SendToken,
      data: {
        tokenSymbol: candidate.token,
        amount: candidate.amount,
        receiver: candidate.to
      }
    }),
    [Operation.AaveDeposit]: (candidate, walletAddress) => ({
      kind: Operation.AaveDeposit,
      data: {
        tokenSymbol: candidate.token,
        amount: candidate.amount,
        receiver: walletAddress
      }
    }),
    [Operation.AaveBorrow]: (candidate, walletAddress) => ({
      kind: Operation.AaveBorrow,
      data: {
        tokenSymbol: candidate.token,
        amount: candidate.amount,
        receiver: walletAddress
      }
    }),
    [Operation.AaveRepay]: (candidate, walletAddress) => ({
      kind: Operation.AaveRepay,
      data: {
        tokenSymbol: candidate.token,
        amount: candidate.amount,
        receiver: walletAddress
      }
    }),
    [Operation.AaveWithdraw]: (candidate, walletAddress) => ({
      kind: Operation.AaveWithdraw,
      data: {
        tokenSymbol: candidate.token,
        amount: candidate.amount,
        receiver: walletAddress
      }
    })
  };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const formatCandidate = (candidate: Array<any>, walletAddress: string) => {
  const operations: Array<OperationData> = [];

  for (const operation of candidate) {
    const formatter = formatOperations[operation.action as unknown as Operation];
    const formattedOperation = formatter(operation, walletAddress);
    console.log({
      candidate: operation,
      operation: formattedOperation
    });
    operations.push(formattedOperation);
  }

  return operations;
};

export const useHomeViewModel = () => {
  const { smartAccountAddress } = useSmartAccount();

  const sendPromt = async (_message: string, callback: (operations: Array<OperationData>) => void) => {
    if (!_message) {
      throw new Error('Message is empty');
    }
    if (!smartAccountAddress) {
      throw new Error('Smart account address is empty');
    }

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

    const operations = formatCandidate(candidate, smartAccountAddress);

    callback(operations);
  };

  const [promtMessage, setPromtMessage] = useState<string>('Swap 10 USDT to ETH');

  return {
    sendPromt,
    promtMessage,
    setPromtMessage
  };
};
