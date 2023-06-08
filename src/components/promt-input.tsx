import { FC, useCallback, useEffect, useState } from 'react';

import { Box, Button, TextareaAutosize, styled } from '@mui/material';

import { MicroSpeechRecognition } from '@/components/speech-recognition';
import { SpeechRecognitionCustomResult } from '@/hooks/use-speech-recognition';

interface PromptInputProps {
  onSubmit: () => void;
  placeholder: string;
  promt?: string;
}

const StyledTextareaAutosize = styled(TextareaAutosize)(({ theme }) => ({
  width: '100%',
  minHeight: 25,
  resize: 'none',
  padding: 3,
  borderColor: 'transparent',
  borderRadius: theme.spacing(0.5),
  outline: 'none'
}));

export const PromptInput: FC<PromptInputProps> = ({ onSubmit, placeholder, promt }) => {
  const [value, setValue] = useState('');

  useEffect(() => {
    if (!promt) {
      return;
    }

    setValue(promt);
  }, [promt]);

  const onRecognitionResult = useCallback((result: SpeechRecognitionCustomResult) => {
    if (result.confidence > 0.6) {
      setValue(result.transcript);
    }
  }, []);

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
          value={value}
          onChange={e => {
            setValue(e.target.value || '');
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
