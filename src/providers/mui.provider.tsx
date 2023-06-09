import { useMemo } from 'react';

import { CssBaseline, PaletteMode, PaletteOptions, ThemeProvider, createTheme } from '@mui/material';
import { indigo, blueGrey } from '@mui/material/colors';

import { useColorMode } from './mode.provider';

import { OverrideLinkBehaviorThemeComponents } from '@/components/base';
import { CFC } from '@/types/react';

const pallettes: Record<PaletteMode, PaletteOptions> = {
  light: {
    mode: 'light',
    background: {
      default: '#F5F5F5',
      paper: '#fff'
    },
    primary: indigo,
    header: {
      background: indigo[500],
      text: '#fff'
    }
  },
  dark: {
    mode: 'dark',
    background: {
      default: '#121212',
      paper: '#1e1e1e'
    },
    primary: indigo,
    header: {
      background: indigo[900],
      text: '#fff'
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
                backgroundColor: themeParam.palette.mode === 'dark' ? blueGrey[900] : blueGrey[100]
              }
            })
          }
        },
        shape: {
          headerHeight: '4rem'
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
