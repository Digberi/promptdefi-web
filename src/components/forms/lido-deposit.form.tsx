import { ChangeEventHandler, FC, useState } from 'react';

import { Box, Button, ButtonGroup, Chip, FormControl, FormGroup, ListSubheader, TextField } from '@mui/material';

import { Lido } from '@/core/support-operations/lido';
import { toAtomic, toReal } from '@/utils/units';

type LidoDepositProps = Lido.CreateDepositPreOpParams;

interface LidoDepositFormProps {
  data: LidoDepositProps;
  setData: (data: LidoDepositProps) => void;
}

const ETH_DECIMALS = 18;

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
      //TODO: fix decimals
      atomicAmount: toAtomic(target.value, ETH_DECIMALS) ?? ''
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
      {' '}
      <ButtonGroup
        sx={{
          gap: 1
        }}
      >
        <Chip label="Lido deposit" />
        <Chip label="Lido deposit" />
      </ButtonGroup>
      <FormGroup>
        <ListSubheader>Amount</ListSubheader>
        <FormControl fullWidth>
          <TextField
            disabled={!isEditing}
            placeholder="Amount"
            value={toReal(innerData.atomicAmount, ETH_DECIMALS)}
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
