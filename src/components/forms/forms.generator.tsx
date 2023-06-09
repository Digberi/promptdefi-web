import { FC } from 'react';

import { Box } from '@mui/material';

import { createAaveV3Form } from './avve3.from';
import { LidoDepositForm } from './lido-deposit.form';
import { SendTokenForm } from './send-token.from';
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
  [Operation.AaveBorrow]: createAaveV3Form('Aave borrow'),
  [Operation.AaveDeposit]: createAaveV3Form('Aave deposit'),
  [Operation.AaveWithdraw]: createAaveV3Form('Aave withdraw'),
  [Operation.AaveRepay]: createAaveV3Form('Aave repay'),
  [Operation.SwapTokens]: UniswapForm
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

        //@ts-ignore
        return <Form key={index} data={operation.data} setData={setData} />;
      })}
    </Box>
  );
};
