import { FC } from 'react';

import { Box } from '@mui/material';

import { createAaveV3Form } from './avve3.from';
import { LidoDepositForm } from './lido-deposit.form';
import { SendTokenForm } from './send-token.from';
import { TriggerForm } from './trigger.form';
import { UniswapForm } from './uniswap.form';
import { WrapEthForm } from './wrap-eth.from';

import { OperationData } from '@/core/operations/operation.type';
import { Operation } from '@/core/operations/operations.enum';

interface FormGeneratorProps {
  listOperations: Array<OperationData>;
  setOperation: (index: number, operation: OperationData) => void;
}

const FormsDictionary = {
  [Operation.SendToken]: SendTokenForm,
  [Operation.LidoDeposit]: LidoDepositForm,
  [Operation.WrapEth]: WrapEthForm,
  [Operation.AaveBorrow]: createAaveV3Form('Borrow'),
  [Operation.AaveDeposit]: createAaveV3Form('Deposit'),
  [Operation.AaveWithdraw]: createAaveV3Form('Withdraw'),
  [Operation.AaveRepay]: createAaveV3Form('Repay'),
  [Operation.SwapTokens]: UniswapForm,
  [Operation.CreatePortfolio]: TriggerForm
} as const;

export const FormsGenerator: FC<FormGeneratorProps> = ({ listOperations, setOperation }) => {
  return (
    <Box
      sx={{
        display: 'grid',
        gap: 2
      }}
    >
      {listOperations.map((operation, index) => {
        const Form = FormsDictionary[operation.kind];

        //TODO: fix types
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const setData = (data: any) => {
          setOperation(index, {
            kind: operation.kind,
            data
          });
        };
        const uniqueKey = `${JSON.stringify(operation)}-${index}`;

        //@ts-ignore
        return <Form key={uniqueKey} data={operation.data} setData={setData} />;
      })}
    </Box>
  );
};
