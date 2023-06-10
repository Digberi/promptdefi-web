import { createContext, useState, useMemo, useContext } from 'react';

import { PaletteMode, useMediaQuery } from '@mui/material';

import { CFC } from '@/types/react';

interface ColorModeContext {
  toggleColorMode: () => void;
  mode: PaletteMode;
}

export enum ColorMode {
  LIGHT = 'light',
  DARK = 'dark'
}

const ModeContext = createContext<ColorModeContext>({
  toggleColorMode: () => {
    return;
  },
  mode: ColorMode.LIGHT
});

export const ModeProvider: CFC = ({ children }) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const [mode, setMode] = useState<PaletteMode>(prefersDarkMode ? ColorMode.DARK : ColorMode.LIGHT);
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode: PaletteMode) => (prevMode === ColorMode.LIGHT ? ColorMode.DARK : ColorMode.LIGHT));
      },
      mode
    }),
    [mode]
  );

  return <ModeContext.Provider value={colorMode}>{children}</ModeContext.Provider>;
};

export const useColorMode = () => {
  const context = useContext(ModeContext);

  if (context === undefined) {
    throw new Error('useColorMode must be used within a ModeProvider');
  }

  return context;
};
