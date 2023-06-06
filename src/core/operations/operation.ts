import { Operation } from './operations.enum';
import { AAveV3 } from '../support-operations/aave-v3';
import { Erc20 } from '../support-operations/erc20-token';
import { Lido } from '../support-operations/lido';
import { WrapEth } from '../support-operations/wrap-eth';

export const OperationDictionary = {
  [Operation.SendToken]: Erc20.createSendPreOp,
  [Operation.LidoDeposit]: Lido.createDepositPreOp,
  [Operation.WrapEth]: WrapEth.createDepositPreOp,
  [Operation.AaveDeposit]: AAveV3.createDepositPreOp,
  [Operation.AaveBorrow]: AAveV3.createBorrowPreOp,
  [Operation.AaveRepay]: AAveV3.createRepayPreOp,
  [Operation.AaveWithdraw]: AAveV3.createWithdrawPreOp
} as const;
