import { FC } from 'react';

import { Box } from '@mui/material';

import { SendTokenForm } from './send-token';

import { OperationData } from '@/core/operations/operation.type';
import { Operation } from '@/core/operations/operations.enum';

interface FormGeneratorProps {
  listOperations: Array<OperationData>;
}

const FormsDictionary = {
  [Operation.SendToken]: SendTokenForm
};

export const FormsGenerator: FC<FormGeneratorProps> = ({ listOperations }) => {
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

          return <Form key={index} data={operation.data} />;
        } else {
          return null;
        }
      })}
    </Box>
  );
};
