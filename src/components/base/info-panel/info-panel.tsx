import { ErrorOutline } from '@mui/icons-material';
import { Box, IconButton, SwipeableDrawer } from '@mui/material';

import { FeaturesInfo } from './features-info';
import { useInfoPanelViewModel } from './use-info-panel.vm';

const anchor = 'right';

export const InfoPanel = () => {
  const { isOpen, toggleDrawer } = useInfoPanelViewModel();

  return (
    <div>
      <IconButton key={anchor} onClick={toggleDrawer(true)}>
        <ErrorOutline
          sx={{
            color: 'header.text'
          }}
        />
      </IconButton>
      <SwipeableDrawer
        sx={{
          zIndex: theme => theme.zIndex.drawer + 2
        }}
        anchor={anchor}
        open={isOpen}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        <Box
          sx={{ width: '100vw', padding: 3 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <FeaturesInfo />
        </Box>
      </SwipeableDrawer>
    </div>
  );
};
