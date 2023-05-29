import { Done, Update, ErrorOutline, Close } from '@mui/icons-material';
import {
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer,
  Typography
} from '@mui/material';

import { useInfoPanelViewModel } from './use-info-panel.vm';

const anchor = 'right';

export const InfoPanel = () => {
  const { isOpen, toggleDrawer, supportedFeatures, comingSoonFeatures } = useInfoPanelViewModel();

  return (
    <div>
      <IconButton key={anchor} onClick={toggleDrawer(true)}>
        <ErrorOutline />
      </IconButton>
      <SwipeableDrawer anchor={anchor} open={isOpen} onClose={toggleDrawer(false)} onOpen={toggleDrawer(true)}>
        <Box sx={{ width: '100vw' }} role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
          <Box sx={{ display: 'flex' }}>
            <Typography variant="h5">What can we do?</Typography>

            <IconButton key={anchor} onClick={toggleDrawer(false)}>
              <Close />
            </IconButton>
          </Box>

          <Typography variant="h6">Supported Features</Typography>
          <List>
            {supportedFeatures.map(text => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <Done />
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          <Divider />

          <Typography variant="h6">Coming Soon</Typography>
          <List>
            {comingSoonFeatures.map(text => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <Update />
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </SwipeableDrawer>
    </div>
  );
};
