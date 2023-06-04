import { FC, useEffect, useState } from 'react';

import { Box, Button, TextareaAutosize, styled } from '@mui/material';

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
      <StyledTextareaAutosize
        value={value}
        onChange={e => {
          setValue(e.target.value || '');
        }}
        placeholder={placeholder}
      />
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
