import { FC, useCallback } from 'react';

import { Box, Button, CircularProgress, TextareaAutosize, styled } from '@mui/material';

import { ConnectButton } from '../ui/connect-button';

import { MicroSpeechRecognition } from '@/components/base/speech-recognition';
import { useSmartAccount } from '@/hooks/use-smart-account';
import { SpeechRecognitionCustomResult } from '@/hooks/use-speech-recognition';

interface PromptInputProps {
  onSubmit: () => void;
  setPromtMessage: (message: string) => void;
  placeholder: string;
  promt?: string;
  isLoading?: boolean;
}

const StyledTextareaAutosize = styled(TextareaAutosize)(({ theme }) => ({
  width: '100%',
  minHeight: 25,
  resize: 'none',
  padding: theme.spacing(1),

  borderColor: 'transparent',
  borderRadius: theme.spacing(0.5),
  outline: 'none'
}));

export const PromptInput: FC<PromptInputProps> = ({ onSubmit, placeholder, promt, setPromtMessage, isLoading }) => {
  const { smartAccountAddress } = useSmartAccount();

  const onRecognitionResult = useCallback(
    (result: SpeechRecognitionCustomResult) => {
      if (result.confidence > 0.6) {
        setPromtMessage(result.transcript);
      }
    },
    [setPromtMessage]
  );

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        flexDirection: 'column',
        gap: 2
      }}
    >
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          alignItems: 'center',
          gap: 1
        }}
      >
        <StyledTextareaAutosize
          value={promt}
          onChange={e => {
            setPromtMessage(e.target.value || '');
          }}
          placeholder={placeholder}
          disabled={isLoading}
        />
        <MicroSpeechRecognition onRecognitionResult={onRecognitionResult} />
      </Box>
      {smartAccountAddress ? (
        <Button
          sx={{
            width: '100%'
          }}
          variant="contained"
          onClick={onSubmit}
          disabled={isLoading || !promt}
        >
          {isLoading ? <CircularProgress /> : 'SEND REQUEST'}
        </Button>
      ) : (
        <ConnectButton />
      )}
    </Box>
  );
};
