import { useState } from 'react';

import { Box, Button, TextareaAutosize, styled } from '@mui/material';

const StyledTextareaAutosize = styled(TextareaAutosize)(({ theme }) => ({
  width: '100%',
  minHeight: 25,
  resize: 'none',
  padding: 3,
  borderColor: 'transparent',
  borderRadius: theme.spacing(0.5),
  outline: 'none'
}));

export const PromptInput = () => {
  const [state, setState] = useState('');
  const onSubmit = () => {
    console.log(state);
    setState('');
  };

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
        value={state}
        onChange={e => {
          setState(e.target.value || '');
        }}
        placeholder="Enter Your Request"
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
