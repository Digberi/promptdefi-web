import { createContext, useState, useMemo, useContext } from 'react';

import { PaletteMode } from '@mui/material';

import { CFC } from '@/types/react';

interface ColorMode {
  toggleColorMode: () => void;
  mode: PaletteMode;
}

const ModeContext = createContext<ColorMode>({
  toggleColorMode: () => {
    return;
  },
  mode: 'light'
});

export const ModeProvider: CFC = ({ children }) => {
  // const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  // const [mode, setMode] = useState<PaletteMode>(prefersDarkMode ? 'dark' : 'light');
  const [mode, setMode] = useState<PaletteMode>('light');
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode: PaletteMode) => (prevMode === 'light' ? 'dark' : 'light'));
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
