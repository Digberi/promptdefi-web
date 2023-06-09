import { ChangeEventHandler, FC, useEffect, useMemo, useState } from 'react';

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
import { JSBI } from '@uniswap/sdk';
import { useProvider } from 'wagmi';

import { tokens } from '@/config/tokens';
import { Uniswap, createToken } from '@/core/support-operations/uniswap';
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
  const [outputAmount, setOutputAmount] = useState<string>('0');
  const [uniswap, setUniswap] = useState<Uniswap>();

  const provider = useProvider();
  const { smartAccountAddress } = useSmartAccount();

  useEffect(() => {
    if (provider && smartAccountAddress) {
      Uniswap.create(provider, smartAccountAddress);

      setUniswap(Uniswap.instance!);
    }
  }, [provider, smartAccountAddress]);

  const selectedInToken = useMemo(
    () => tokens.find(token => token.symbol === innerData.tokenSymbolIn)!,
    [innerData.tokenSymbolIn]
  );
  const selectedOutToken = useMemo(
    () => tokens.find(token => token.symbol === innerData.tokenSymbolOut)!,
    [innerData.tokenSymbolOut]
  );

  useEffect(() => {
    const getOutputAmount = async () => {
      try {
        if (!uniswap) {
          return;
        }
        const tokenIn = createToken(selectedInToken);
        const tokenOut = createToken(selectedOutToken);

        console.log({
          tokenIn,
          tokenOut
        });

        const params = {
          tokenIn,
          tokenOut,
          atomicAmountIn: toAtomic(innerData.amount, selectedInToken.decimals).toString()
        };

        const { amountOut } = await uniswap.getRouteAndQuote(params);

        setOutputAmount(JSBI.BigInt(amountOut).toString());
      } catch (error) {
        console.log(error);
      }
    };

    void getOutputAmount();
  }, [selectedInToken, selectedOutToken, innerData.amount, uniswap]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    setData(innerData);
  };

  const handleTokenInChange = ({ target }: SelectChangeEvent) => {
    setInnerData(prev => ({
      ...prev,
      tokenSymbolIn: target.value
    }));
  };

  const handleTokenOutChange = ({ target }: SelectChangeEvent) => {
    setInnerData(prev => ({
      ...prev,
      tokenSymbolOut: target.value
    }));
  };

  const handleAmountChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = ({ target }) => {
    try {
      setInnerData(prev => ({
        ...prev,
        amount: target.value
      }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        borderRadius: 2,
        p: 2,
        display: 'grid',
        gap: 2
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
        <FormControl disabled={!isEditing} fullWidth>
          <InputLabel id="send-token-select-token-label">Input</InputLabel>
          <Select value={selectedInToken.symbol} label="Input" onChange={handleTokenInChange}>
            {tokens
              .filter(_token => _token.symbol !== selectedOutToken.symbol)
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

        {/* <ListSubheader>Amount</ListSubheader> */}
        <FormControl fullWidth>
          <TextField
            disabled={!isEditing}
            placeholder="Amount"
            value={innerData.amount}
            onChange={handleAmountChange}
          />
        </FormControl>

        <FormControl
          sx={{
            mt: 2
          }}
          disabled={!isEditing}
          fullWidth
        >
          <InputLabel id="send-token-select-token-label">Output</InputLabel>
          <Select value={selectedOutToken.symbol} label="Output" onChange={handleTokenOutChange}>
            {tokens
              .filter(_token => _token.symbol !== selectedInToken.symbol)
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

        <FormControl fullWidth>
          <TextField disabled placeholder="Output Amount" value={toReal(outputAmount, selectedOutToken.decimals)} />
        </FormControl>
      </FormGroup>

      <ButtonGroup
        sx={{
          justifyContent: 'flex-end',
          width: '100%'
        }}
      >
        {isEditing ? <Button onClick={handleSave}>Save</Button> : <Button onClick={handleEdit}>Edit</Button>}
      </ButtonGroup>
    </Box>
  );
};
