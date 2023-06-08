import { Box, styled } from '@mui/material';

export const Page = styled(Box)(({ theme }) => ({
  paddingLeft: theme.spacing(1),
  paddingRight: theme.spacing(1),

  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1
}));
