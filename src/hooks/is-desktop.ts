import { useMediaQuery } from '@mui/material';

export const useIsDesktop = () => {
  const isDesktop = useMediaQuery('(min-width:768px)');

  return { isDesktop };
};
