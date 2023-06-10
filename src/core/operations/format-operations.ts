import { OperationData } from './operation.type';
import { Operation } from './operations.enum';

export const formatOperations: Record<
  Operation,
  (candidate: Record<string, string>, walletAddress: string) => OperationData
> = {
  [Operation.SwapTokens]: candidate =>
    ({
      kind: Operation.SwapTokens,
      data: {
        tokenSymbolIn: candidate.tokenFrom.toUpperCase(),
        tokenSymbolOut: candidate.tokenTo.toUpperCase(),
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
      tokenSymbol: candidate.token.toUpperCase(),
      amount: candidate.amount,
      receiver: candidate.to
    }
  }),
  [Operation.AaveDeposit]: (candidate, walletAddress) => ({
    kind: Operation.AaveDeposit,
    data: {
      tokenSymbol: candidate.token.toUpperCase(),
      amount: candidate.amount,
      receiver: walletAddress
    }
  }),
  [Operation.AaveBorrow]: (candidate, walletAddress) => ({
    kind: Operation.AaveBorrow,
    data: {
      tokenSymbol: candidate.token.toUpperCase(),
      amount: candidate.amount,
      receiver: walletAddress
    }
  }),
  [Operation.AaveRepay]: (candidate, walletAddress) => ({
    kind: Operation.AaveRepay,
    data: {
      tokenSymbol: candidate.token.toUpperCase(),
      amount: candidate.amount,
      receiver: walletAddress
    }
  }),
  [Operation.AaveWithdraw]: (candidate, walletAddress) => ({
    kind: Operation.AaveWithdraw,
    data: {
      tokenSymbol: candidate.token.toUpperCase(),
      amount: candidate.amount,
      receiver: walletAddress
    }
  }),
  [Operation.CreatePortfolio]: candidate => ({
    kind: Operation.CreatePortfolio,
    data: {
      //@ts-ignore
      tokenSymbol: candidate.assets[0].token.toUpperCase(),
      //@ts-ignore
      amount: candidate.assets[0].amount,
      stopLoss: candidate.stopLoss,
      takeProfit: candidate.takeProfit
    }
  })
};
