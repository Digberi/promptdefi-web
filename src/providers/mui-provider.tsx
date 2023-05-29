import { useMemo } from 'react';

import { CssBaseline, ThemeProvider, createTheme, useMediaQuery } from '@mui/material';

import { OverrideLinkBehaviorThemeComponents } from '@/components/base';
import { CFC } from '@/types/react';

export const MuiProvider: CFC = ({ children }) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
          background: {
            default: prefersDarkMode ? '#121212' : '#fff',
            paper: prefersDarkMode ? '#1e1e1e' : '#fff'
          }
        },
        components: {
          ...OverrideLinkBehaviorThemeComponents
        }
      }),
    [prefersDarkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
