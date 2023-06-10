import { ChangeEventHandler, FC, useState } from 'react';

import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Chip,
  FormControl,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography
} from '@mui/material';

import { RelSubHeader } from './list-subheader';

import { tokens } from '@/config/tokens';
import { Erc20 } from '@/core/support-operations/erc20-token';

type SendTokenParams = Erc20.CreateSendPreOpParams;

interface SendTokenFormProps {
  data: SendTokenParams;
  setData: (data: SendTokenParams) => void;
}

export const SendTokenForm: FC<SendTokenFormProps> = ({ data, setData }) => {
  const [innerData, setInnerData] = useState<SendTokenParams>(data);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    setData(innerData);
  };

  const handleTokenChange = ({ target }: SelectChangeEvent) => {
    setInnerData(prev => ({
      ...prev,
      tokenSymbol: target.value
    }));
  };

  const handleAmountChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = ({ target }) => {
    setInnerData(prev => ({
      ...prev,
      amount: target.value
    }));
  };

  const handleAddressChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = ({ target }) => {
    setInnerData(prev => ({
      ...prev,
      receiver: target.value
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
        <Chip label="Send Token" />
      </ButtonGroup>

      <FormGroup>
        <RelSubHeader>Token</RelSubHeader>
        <FormControl disabled={!isEditing} fullWidth>
          <InputLabel id="send-token-select-token-label">Select token</InputLabel>
          <Select value={innerData.tokenSymbol} label="Select token" onChange={handleTokenChange}>
            {tokens.map((_token, index) => (
              <MenuItem key={index} value={_token.symbol}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                  }}
                >
                  <Avatar src={_token.logoURI} alt={_token.symbol} />
                  <Typography variant="body1">{_token.symbol}</Typography>
                </Box>
              </MenuItem>
            ))}
          </Select>
        </FormControl>

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

      <FormGroup>
        <RelSubHeader>Address</RelSubHeader>
        <FormControl fullWidth>
          <TextField
            disabled={!isEditing}
            placeholder="receiver"
            value={innerData.receiver}
            onChange={handleAddressChange}
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
