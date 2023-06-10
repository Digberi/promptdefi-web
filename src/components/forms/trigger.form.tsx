import { ChangeEventHandler, FC, useEffect, useState } from 'react';

import { ShutterSpeed } from '@mui/icons-material';
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
import { useProvider } from 'wagmi';

import { RelSubHeader } from './list-subheader';

import { tokens } from '@/config/tokens';
import { Trigger } from '@/core/support-operations/trigger';
import { useSmartAccount } from '@/hooks/use-smart-account';

type TriggerParams = Trigger.CreateTriggerPreOpParams;

interface TriggerFormProps {
  data: TriggerParams;
  setData: (data: TriggerParams) => void;
}

export const TriggerForm: FC<TriggerFormProps> = ({ data, setData }) => {
  const [innerData, setInnerData] = useState<TriggerParams>(data);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const provider = useProvider();
  const { smartAccountAddress } = useSmartAccount();

  useEffect(() => {
    if (!provider || !smartAccountAddress) {
      return;
    }

    Trigger.setProvider(provider);
    Trigger.setWalletAddress(smartAccountAddress);
  }, [provider, smartAccountAddress]);

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

  const handleStopLossChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = ({ target }) => {
    setInnerData(prev => ({
      ...prev,
      stopLoss: target.value.replace('%', '')
    }));
  };

  const handleTakeProfitChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = ({ target }) => {
    setInnerData(prev => ({
      ...prev,
      takeProfit: target.value.replace('%', '')
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
        <Chip avatar={<ShutterSpeed />} label="Trigger" />
        <Chip label="Create Portfolio" />
      </ButtonGroup>

      <FormGroup>
        <RelSubHeader>Token</RelSubHeader>
        <FormControl disabled={!isEditing} fullWidth>
          <InputLabel id="send-token-select-token-label">Select token</InputLabel>
          <Select value={innerData.tokenSymbol} label="Select token" onChange={handleTokenChange}>
            {tokens
              .filter(token => !!token.triggerInfo)
              .map((_token, index) => (
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
        <RelSubHeader>Stop Loss Percent</RelSubHeader>
        <FormControl fullWidth>
          <TextField
            disabled={!isEditing}
            placeholder="receiver"
            value={`${Number(innerData.stopLoss)}%`}
            onChange={handleStopLossChange}
          />
        </FormControl>
      </FormGroup>

      <FormGroup>
        <RelSubHeader>Take Profit Percent</RelSubHeader>
        <FormControl fullWidth>
          <TextField
            disabled={!isEditing}
            placeholder="receiver"
            value={`${innerData.takeProfit}%`}
            onChange={handleTakeProfitChange}
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
