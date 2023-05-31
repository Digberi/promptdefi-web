import * as React from 'react';

import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

import { Page } from '@/components/base/page';
import { PromptInput } from '@/components/promt-input';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

export const HomePage = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Page
      sx={{
        justifyContent: 'space-between',
        pb: 3
      }}
    >
      <Box
        sx={{
          borderBottom: 1,
          borderColor: 'divider',
          width: 'calc(100% + 32px)',
          mx: '-16px'
        }}
      >
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab
            sx={{
              width: '50%'
            }}
            label="Create Request"
            {...a11yProps(0)}
          />
          <Tab
            sx={{
              width: '50%'
            }}
            label="Use templates"
            {...a11yProps(1)}
          />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <PromptInput />
      </TabPanel>
      <TabPanel value={value} index={1}>
        Use templates
      </TabPanel>
    </Page>
  );
};
