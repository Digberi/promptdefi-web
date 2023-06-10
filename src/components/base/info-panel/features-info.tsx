import { FC } from 'react';

import { Done, ShutterSpeed } from '@mui/icons-material';
import { Box, Divider, List, ListItem, ListItemIcon, ListItemText, Typography, styled } from '@mui/material';

import { useInfoPanelViewModel } from './use-info-panel.vm';

const CustomListItem = styled(ListItem)(({ theme }) => ({
  padding: theme.spacing(1, 2)
}));
const SubHeader = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(2)
}));

export const FeaturesInfo: FC = () => {
  const { supportedFeatures, triggers } = useInfoPanelViewModel();

  return (
    <Box>
      <Box sx={{ display: 'flex' }}>
        <Typography variant="h5">What can we do?</Typography>
      </Box>

      <SubHeader variant="body1">Supported Features</SubHeader>
      <List>
        {supportedFeatures.map(text => (
          <CustomListItem key={text}>
            <ListItemIcon>
              <Done color="success" />
            </ListItemIcon>
            <ListItemText primary={text} />
          </CustomListItem>
        ))}
      </List>

      <Divider />

      <SubHeader variant="body1">Triggers</SubHeader>
      <List>
        {triggers.map(text => (
          <CustomListItem key={text}>
            <ListItemIcon>
              <ShutterSpeed />
            </ListItemIcon>
            <ListItemText primary={text} />
          </CustomListItem>
        ))}
      </List>
    </Box>
  );
};
