import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';

import { InfoPanel } from './info-panel/info-panel';
import { ChangeMode } from '../ui/change-mode';

import logoUrl from '@/assets/logo.svg';
import { APP_NAME } from '@/config/constants';
import { useIsDesktop } from '@/hooks/is-desktop';

export const Header = () => {
  const { isDesktop } = useIsDesktop();

  return (
    <AppBar
      sx={{
        bgcolor: 'header.background',
        color: 'header.text',
        height: 'shape.headerHeight'
      }}
      position="static"
    >
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >
        <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
          <img src={logoUrl} alt="logo" />
        </IconButton>
        <Typography
          sx={{
            flexGrow: 1,
            display: 'grid',
            placeItems: 'center'
          }}
          variant="h6"
          component="div"
        >
          {APP_NAME}
        </Typography>
        <ChangeMode />
        {!isDesktop && <InfoPanel />}
      </Toolbar>
    </AppBar>
  );
};
