import { FC, useCallback } from 'react';

import { Box, Button, TextareaAutosize, styled } from '@mui/material';

import { MicroSpeechRecognition } from '@/components/speech-recognition';
import { SpeechRecognitionCustomResult } from '@/hooks/use-speech-recognition';

interface PromptInputProps {
  onSubmit: () => void;
  setPromtMessage: (message: string) => void;
  placeholder: string;
  promt?: string;
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

export const PromptInput: FC<PromptInputProps> = ({ onSubmit, placeholder, promt, setPromtMessage }) => {
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
        />
        <MicroSpeechRecognition onRecognitionResult={onRecognitionResult} />
      </Box>
      <Button
        sx={{
          width: '100%'
        }}
        variant="contained"
        onClick={onSubmit}
      >
        SEND REQUEST
      </Button>
    </Box>
  );
};
