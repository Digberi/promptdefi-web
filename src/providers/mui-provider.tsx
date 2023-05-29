import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';

import { OverrideLinkBehaviorThemeComponents } from '@/components/base';
import { CFC } from '@/types/react';

export const MuiProvider: CFC = ({ children }) => {
  const theme = createTheme({
    components: {
      ...OverrideLinkBehaviorThemeComponents
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
