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
  ListSubheader,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography
} from '@mui/material';

import { tokens } from '@/config/tokens';
import { Erc20 } from '@/core/support-operations/erc20-token';
import { toAtomic, toReal } from '@/utils/units';

type SendTokenParams = Erc20.CreateSendPreOpParams;

interface SendTokenFormProps {
  data: SendTokenParams;
}

export const SendTokenForm: FC<SendTokenFormProps> = ({ data }) => {
  const [innerData, setInnerData] = useState<SendTokenParams>(data);

  const selectedToken = tokens.find(token => token.address === innerData.tokenAddress);

  const handleTokenChange = ({ target }: SelectChangeEvent) => {
    setInnerData(prev => ({
      ...prev,
      tokenAddress: target.value
    }));
  };

  const handleAmountChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = ({ target }) => {
    setInnerData(prev => ({
      ...prev,
      amount: toAtomic(target.value, selectedToken?.decimals) ?? ''
    }));
  };

  const handleAddressChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = ({ target }) => {
    setInnerData(prev => ({
      ...prev,
      receiver: target.value
    }));
  };

  const handleSave = () => {
    console.log(innerData);
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
        <Chip label="Send Token" />
      </ButtonGroup>

      <FormGroup>
        <ListSubheader>Token</ListSubheader>
        <FormControl fullWidth>
          <InputLabel id="send-token-select-token-label">Select token</InputLabel>
          <Select value={innerData.tokenAddress} label="Select token" onChange={handleTokenChange}>
            {tokens.map((_token, index) => (
              <MenuItem key={index} value={_token.address}>
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

        <ListSubheader>Amount</ListSubheader>
        <FormControl fullWidth>
          <TextField
            placeholder="Amount"
            value={toReal(innerData.atomicAmount, selectedToken?.decimals)}
            onChange={handleAmountChange}
          />
        </FormControl>
      </FormGroup>

      <FormGroup>
        <ListSubheader>Address</ListSubheader>
        <FormControl fullWidth>
          <TextField placeholder="receiver" value={innerData.receiver} onChange={handleAddressChange} />
        </FormControl>
      </FormGroup>

      <ButtonGroup
        sx={{
          mt: 2,
          justifyContent: 'flex-end',
          width: '100%'
        }}
      >
        <Button onClick={handleSave}>Save</Button>
      </ButtonGroup>
    </Box>
  );
};
