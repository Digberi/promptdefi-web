import { FC } from 'react';

import { Box } from '@mui/material';

import { SendTokenForm } from './send-token';

import { OperationData } from '@/core/operations/operation.type';
import { Operation } from '@/core/operations/operations.enum';
import { Erc20 } from '@/core/support-operations/erc20-token';

interface FormGeneratorProps {
  listOperations: Array<OperationData>;
  setOperation: (index: number, operation: OperationData) => void;
}

const FormsDictionary = {
  [Operation.SendToken]: SendTokenForm
};

export const FormsGenerator: FC<FormGeneratorProps> = ({ listOperations, setOperation }) => {
  return (
    <Box
      sx={{
        display: 'grid',
        gap: 2
      }}
    >
      {listOperations.map((operation, index) => {
        if (operation.kind === Operation.SendToken) {
          const Form = FormsDictionary[operation.kind];

          const setData = (data: Erc20.CreateSendPreOpParams) => {
            setOperation(index, {
              kind: operation.kind,
              data
            });
          };

          return <Form key={index} data={operation.data} setData={setData} />;
        } else {
          return null;
        }
      })}
    </Box>
  );
};
