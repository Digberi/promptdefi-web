import { BlurCircular } from '@mui/icons-material';
import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';

import { InfoPanel } from './info-panel/info-panel';
import { ChangeMode } from '../change-mode';

import { APP_NAME } from '@/config/constants';

export const Header = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <BlurCircular />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {APP_NAME}
          </Typography>
          <ChangeMode />
          <InfoPanel />
        </Toolbar>
      </AppBar>
    </Box>
  );
};
