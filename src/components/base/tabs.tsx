import { FC, createContext, useContext, useState } from 'react';

import { Box, Tabs as MTabs, Tab } from '@mui/material';

import { TabPanel as CTabPanel } from '@/components/base/tab-panel';
import { useIsDesktop } from '@/hooks/is-desktop';
import { CFC } from '@/types/react';

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

const TabContext = createContext<{
  value: number;
  handleChange: (_event: React.SyntheticEvent, newValue: number) => void;
  setMainTab: () => void;
}>({
  value: 0,
  handleChange: () => {
    return;
  },
  setMainTab: () => {
    return;
  }
});

export const useTab = () => useContext(TabContext);

export const TabProvider: CFC = ({ children }) => {
  const [value, setValue] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const setMainTab = () => setValue(0);

  return <TabContext.Provider value={{ value, handleChange, setMainTab }}>{children}</TabContext.Provider>;
};

interface TabsProps {
  tabs: Array<string>;
}

export const Tabs: FC<TabsProps> = ({ tabs }) => {
  const { value, handleChange } = useTab();
  const { isDesktop } = useIsDesktop();

  return (
    <Box
      sx={{
        // width: theme => `calc(100% + ${theme.spacing(4)})`,
        // mx: theme => theme.spacing(-2),
        backgroundColor: 'background.paper',
        borderBottom: 1,
        borderColor: 'divider',
        borderTopLeftRadius: isDesktop ? theme => theme.spacing(1) : 0,
        borderTopRightRadius: isDesktop ? theme => theme.spacing(1) : 0
      }}
    >
      {/* <Box
        id="scaffold-tabs-underline"
        sx={{
          width: '100%',
          height: theme => theme.spacing(2),
          borderTopLeftRadius: 2,
          borderTopRightRadius: 2
        }}
      /> */}
      <MTabs
        sx={{
          width: '100%'
        }}
        value={value}
        onChange={handleChange}
      >
        {tabs.map((tab, index) => (
          <Tab
            key={tab}
            sx={{
              width: theme => `calc((100% + ${theme.spacing(3)}) / ${tabs.length})`,
              maxWidth: 'none'
            }}
            label={tab}
            {...a11yProps(index)}
          />
        ))}
      </MTabs>
    </Box>
  );
};

export const TabPanel: CFC<{ index: number }> = ({ index, children }) => {
  const { value } = useTab();

  return (
    <CTabPanel
      sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column'
      }}
      value={value}
      index={index}
      id="scaffold-tabpanel"
    >
      {children}
    </CTabPanel>
  );
};
