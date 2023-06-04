import { useMemo } from 'react';

import { CssBaseline, PaletteMode, PaletteOptions, ThemeProvider, createTheme } from '@mui/material';

import { useColorMode } from './mode.provider';

import { OverrideLinkBehaviorThemeComponents } from '@/components/base';
import { CFC } from '@/types/react';

const pallettes: Record<PaletteMode, PaletteOptions> = {
  light: {
    mode: 'light',
    background: {
      default: '#fff',
      paper: '#fff'
    }
  },
  dark: {
    mode: 'dark',
    background: {
      default: '#121212',
      paper: '#1e1e1e'
    }
  }
};

export const MuiProvider: CFC = ({ children }) => {
  const { mode } = useColorMode();

  const theme = useMemo(
    () =>
      createTheme({
        palette: pallettes[mode],
        components: {
          ...OverrideLinkBehaviorThemeComponents,
          MuiCssBaseline: {
            styleOverrides: themeParam => ({
              body: {
                backgroundColor: themeParam.palette.mode === 'dark' ? '#0A1929' : '#9C9C9C'
              }
            })
          }
        }
      }),
    [mode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
