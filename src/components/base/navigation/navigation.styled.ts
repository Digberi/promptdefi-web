import { styled, BottomNavigation } from '@mui/material';

export const StyledBottomNavigation = styled(BottomNavigation)(({ theme }) => ({
  width: '100%',
  height: theme.spacing(8),
  zIndex: 1000,
  position: 'sticky',
  bottom: 0
}));
