import { FC } from 'react';

import { Box } from '@mui/material';

import { createAaveV3Form } from './avve3.from';
import { LidoDepositForm } from './lido-deposit.form';
import { SendTokenForm } from './send-token.from';
import { WrapEthForm } from './wrap-eth.from';

import { OperationData } from '@/core/operations/operation.type';
import { Operation } from '@/core/operations/operations.enum';
import { Erc20 } from '@/core/support-operations/erc20-token';

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
  [Operation.AaveRepay]: createAaveV3Form('Aave repay')
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
        const setData = (data: Erc20.CreateSendPreOpParams) => {
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
