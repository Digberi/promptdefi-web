import { ChangeEventHandler, FC, useEffect, useState } from 'react';

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
import { useProvider } from 'wagmi';

import { tokens } from '@/config/tokens';
import { Uniswap } from '@/core/support-operations/uniswap';
import { useSmartAccount } from '@/hooks/use-smart-account';
import { toAtomic, toReal } from '@/utils/units';

type UniswapParams = Uniswap.CreateSwapPreOpParams;

interface UniswapFormProps {
  data: UniswapParams;
  setData: (data: UniswapParams) => void;
}

export const UniswapForm: FC<UniswapFormProps> = ({ data, setData }) => {
  const [innerData, setInnerData] = useState<UniswapParams>(data);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const provider = useProvider();
  const { smartAccountAddress } = useSmartAccount();

  useEffect(() => {
    if (provider && smartAccountAddress) {
      Uniswap.create(provider, smartAccountAddress);
    }
  }, [provider, smartAccountAddress]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    setData(innerData);
  };

  const selectedInToken = tokens.find(token => token.symbol === innerData.tokenSymbolIn)!;
  const selectedOutToken = tokens.find(token => token.symbol === innerData.tokenSymbolOut)!;

  const handleTokenInChange = ({ target }: SelectChangeEvent) => {
    setInnerData(prev => ({
      ...prev,
      tokenInAddress: target.value
    }));
  };

  const handleTokenOutChange = ({ target }: SelectChangeEvent) => {
    setInnerData(prev => ({
      ...prev,
      tokenOutAddress: target.value
    }));
  };

  const handleAmountChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = ({ target }) => {
    setInnerData(prev => ({
      ...prev,
      atomicAmount: toAtomic(target.value, selectedInToken.decimals).toString() ?? ''
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
        <Chip label="Swap Token" />
        <Chip label="Swap Token" />
      </ButtonGroup>

      <FormGroup
        sx={{
          gap: 2
        }}
      >
        <ListSubheader>Token</ListSubheader>
        <FormControl disabled={!isEditing} fullWidth>
          <InputLabel id="send-token-select-token-label">Input</InputLabel>
          <Select value={selectedInToken.address} label="Input" onChange={handleTokenInChange}>
            {tokens
              .filter(_token => _token.address !== selectedOutToken.address)
              .map((_token, index) => (
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

        <FormControl disabled={!isEditing} fullWidth>
          <InputLabel id="send-token-select-token-label">Output</InputLabel>
          <Select value={selectedOutToken.address} label="Output" onChange={handleTokenOutChange}>
            {tokens
              .filter(_token => _token.address !== selectedInToken.address)
              .map((_token, index) => (
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
            disabled={!isEditing}
            placeholder="Amount"
            value={toReal(innerData.atomicAmount, selectedInToken.decimals)}
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
