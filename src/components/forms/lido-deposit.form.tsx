import { ChangeEventHandler, FC, useState } from 'react';

import { Box, Button, ButtonGroup, Chip, FormControl, FormGroup, TextField } from '@mui/material';

import { RelSubHeader } from './list-subheader';

import { Lido } from '@/core/support-operations/lido';

type LidoDepositProps = Lido.CreateDepositPreOpParams;

interface LidoDepositFormProps {
  data: LidoDepositProps;
  setData: (data: LidoDepositProps) => void;
}

export const LidoDepositForm: FC<LidoDepositFormProps> = ({ data, setData }) => {
  const [innerData, setInnerData] = useState<LidoDepositProps>(data);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    setData(innerData);
  };

  const handleAmountChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = ({ target }) => {
    setInnerData(prev => ({
      ...prev,
      amount: target.value
    }));
  };

  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        borderRadius: 2,
        p: 2
      }}
    >
      <ButtonGroup
        sx={{
          gap: 1
        }}
      >
        <Chip label="Lido deposit" />
      </ButtonGroup>
      <FormGroup>
        <RelSubHeader>Amount</RelSubHeader>
        <FormControl fullWidth>
          <TextField
            disabled={!isEditing}
            placeholder="Amount"
            value={innerData.amount}
            onChange={handleAmountChange}
          />
        </FormControl>
      </FormGroup>
      <ButtonGroup
        sx={{
          mt: 2,
          justifyContent: 'flex-end',
          width: '100%'
        }}
      >
        {isEditing ? <Button onClick={handleSave}>Save</Button> : <Button onClick={handleEdit}>Edit</Button>}
      </ButtonGroup>
    </Box>
  );
};
