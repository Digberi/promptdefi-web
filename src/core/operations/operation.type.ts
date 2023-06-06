import { OperationDictionary } from './operation';
// import { Operation } from './operations.enum';

type OperationConstructor<T> = {
  [K in keyof T]: {
    kind: K;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: T[K] extends (...args: any) => any ? Parameters<T[K]>[0] : never;
  };
}[keyof T];

export type OperationData = OperationConstructor<typeof OperationDictionary>;

// export type OperationData =
//   | {
//       kind: Operation.WrapEth;
//       data: {
//         amount: string;
//       };
//     }
//   | {
//       kind: Operation.LidoDeposit;
//       data: {
//         amount: string;
//       };
//     }
//   | {
//       kind: Operation.SendToken;
//       data: {
//         tokenAddress: string;
//         amount: string;
//         receiver: string;
//       };
//     }
//   | {
//       kind: Operation.AaveDeposit;
//       data: {
//         tokenAddress: string;
//         amount: string;
//         receiver: string;
//       };
//     }
//   | {
//       kind: Operation.AaveBorrow;
//       data: {
//         tokenAddress: string;
//         amount: string;
//         receiver: string;
//       };
//     }
//   | {
//       kind: Operation.AaveRepay;
//       data: {
//         tokenAddress: string;
//         amount: string;
//         receiver: string;
//       };
//     }
//   | {
//       kind: Operation.AaveWithdraw;
//       data: {
//         tokenAddress: string;

//         amount: string;
//         receiver: string;
//       };
//     };
