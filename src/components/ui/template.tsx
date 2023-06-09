import { FC } from 'react';

import { Box, Button, Typography } from '@mui/material';

interface TemplateProps {
  text: string;
  use: (message: string) => void;
}

export const Template: FC<TemplateProps> = ({ text, use }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',

        width: '100%',
        p: 2,

        borderRadius: 2,
        bgcolor: 'background.paper'
      }}
    >
      <Typography variant="body2">{text}</Typography>
      <Button
        sx={{
          alignSelf: 'flex-end',
          minWidth: 70
        }}
        onClick={() => use(text)}
      >
        Use
      </Button>
    </Box>
  );
};
