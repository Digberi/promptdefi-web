import { FC } from 'react';

import { Done, Update } from '@mui/icons-material';
import { Box, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';

import { useInfoPanelViewModel } from './use-info-panel.vm';

export const FeaturesInfo: FC = () => {
  const { supportedFeatures, comingSoonFeatures } = useInfoPanelViewModel();

  return (
    <Box>
      <Box sx={{ display: 'flex' }}>
        <Typography variant="h5">What can we do?</Typography>
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
  );
};
