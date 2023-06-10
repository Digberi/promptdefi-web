import { formatOperations } from './format-operations';
import { Operation } from './operations.enum';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const formatCandidate = (candidate: Array<any>, walletAddress: string) => {
  return candidate.map(operation => {
    const formatter = formatOperations[operation.action as unknown as Operation];

    const formattedOperation = formatter(operation, walletAddress);
    console.log({
      candidate: operation,
      operation: formattedOperation,
      walletAddress
    });

    return formattedOperation;
  });
};
