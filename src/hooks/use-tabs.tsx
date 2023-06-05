import { useState } from 'react';

import { Box, Tabs as MTabs, Tab } from '@mui/material';

import { TabPanel as CTabPanel } from '@/components/base/tab-panel';
import { CFC } from '@/types/react';

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

export const useTabs = (tabs: Array<string>) => {
  const [value, setValue] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const Tabs = () => (
    <Box
      sx={{
        borderBottom: 1,
        borderColor: 'divider',
        width: 'calc(100% + 32px)',
        mx: '-16px'
      }}
    >
      <MTabs value={value} onChange={handleChange} aria-label="basic tabs example">
        {tabs.map((tab, index) => (
          <Tab
            sx={{
              width: `calc(100% / ${tabs.length})`
            }}
            label={tab}
            {...a11yProps(index)}
          />
        ))}
      </MTabs>
    </Box>
  );

  const TabPanel: CFC<{ index: number }> = ({ index, children }) => (
    <CTabPanel value={value} index={index}>
      {children}
    </CTabPanel>
  );

  return {
    Tabs,
    TabPanel,
    setMainTab: () => setValue(0)
  };
};
