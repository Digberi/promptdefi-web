import { FC, useEffect } from 'react';

import { Mic } from '@mui/icons-material';
import { Box, IconButton, Tooltip } from '@mui/material';

import { SpeechRecognitionCustomResult, useSpeechRecognition } from '@/hooks/use-speech-recognition';

interface MicroSpeechRecognitionProps {
  onRecognitionResult: (result: SpeechRecognitionCustomResult) => void;
}

export const MicroSpeechRecognition: FC<MicroSpeechRecognitionProps> = ({ onRecognitionResult }) => {
  const { isListening, result, isSupported, startSpeechRecognition, stopSpeechRecognition } = useSpeechRecognition();

  useEffect(() => {
    if (result) {
      onRecognitionResult(result);
    }
  }, [onRecognitionResult, result]);

  return (
    <Box
      sx={{
        display: 'grid',
        placeItems: 'center'
      }}
    >
      {isListening ? (
        <IconButton
          sx={{
            position: 'relative',
            animation: 'pulsate 1.5s ease-in-out infinite',
            '@keyframes pulsate': {
              '0%': {
                transform: 'scale(1)',
                opacity: 1
              },
              '50%': {
                transform: 'scale(1.5)',
                opacity: 0.5
              },
              '100%': {
                transform: 'scale(2)',
                opacity: 0
              }
            }
          }}
          onClick={stopSpeechRecognition}
        >
          <Mic color="primary">mic</Mic>
        </IconButton>
      ) : (
        <Tooltip title={!isSupported ? 'Voice input is not supported on your browser' : ''}>
          <IconButton disabled={!isSupported} onClick={startSpeechRecognition}>
            <Mic>mic_off</Mic>
          </IconButton>
        </Tooltip>
      )}
    </Box>
  );
};
