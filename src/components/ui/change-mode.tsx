import { DarkMode, LightMode } from '@mui/icons-material';
import { ToggleButton } from '@mui/material';

import { useColorMode } from '@/providers/mode.provider';

export const ChangeMode = () => {
  const { mode, toggleColorMode } = useColorMode();

  return (
    <ToggleButton
      sx={{
        '&:hover': {
          backgroundColor: 'transparent'
        },
        '& svg:hover': theme => ({
          color: theme.palette.header.text,
          transition: theme.transitions.create('color', {
            duration: theme.transitions.duration.standard
          })
        }),
        border: 'none'
      }}
      value="mode"
      onChange={toggleColorMode}
    >
      {mode === 'light' ? <DarkMode /> : <LightMode />}
    </ToggleButton>
  );
};
