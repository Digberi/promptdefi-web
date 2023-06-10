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
import { Aave } from '../svg/aave';

import { tokens } from '@/config/tokens';
import { AAveV3 } from '@/core/support-operations/aave-v3';

type AAveV3Params =
  | AAveV3.CreateBorrowPreOpParams
  | AAveV3.CreateDepositPreOpParams
  | AAveV3.CreateWithdrawPreOpParams
  | AAveV3.CreateRepayPreOpParams;

interface AAveV3FormProps<T> {
  label?: string;
  data: T;
  setData: (data: T) => void;
}

export const createAaveV3Form = <T extends AAveV3Params>(label: string) => {
  const Comp: FC<AAveV3FormProps<T>> = ({ data, setData }) => {
    const [innerData, setInnerData] = useState<AAveV3FormProps<T>['data']>(data);
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
          <Chip avatar={<Aave />} label="Aave V3" />
          <Chip label={label} />
        </ButtonGroup>

        <FormGroup>
          <RelSubHeader>Token</RelSubHeader>
          <FormControl disabled={!isEditing} fullWidth>
            <InputLabel>Select token</InputLabel>
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

  return Comp;
};
