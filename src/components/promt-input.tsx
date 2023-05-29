import { useState } from 'react';

import { Telegram } from '@mui/icons-material';
import { Box, IconButton, TextareaAutosize, styled } from '@mui/material';

const StyledTextareaAutosize = styled(TextareaAutosize)(({ theme }) => ({
  width: '100%',
  minHeight: 25,
  resize: 'none',
  padding: '10px',
  fontSize: '16px',
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  borderColor: 'transparent',
  borderRadius: theme.spacing(2),
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
        bgcolor: 'background.paper',
        borderRadius: 2,
        //put in the end of the page,
        justifySelf: 'flex-end'
      }}
    >
      <StyledTextareaAutosize
        value={state}
        onChange={e => {
          setState(e.target.value || '');
        }}
      />
      <IconButton onClick={onSubmit}>
        <Telegram />
      </IconButton>
    </Box>
  );
};
