import { ComponentPropsWithoutRef } from 'react';

import { Box } from '@mui/material';

interface TabPanelProps extends ComponentPropsWithoutRef<typeof Box> {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export const TabPanel = ({ children, value, index, ...other }: TabPanelProps) => (
  <Box
    role="tabpanel"
    hidden={value !== index}
    id={`simple-tabpanel-${index}`}
    aria-labelledby={`simple-tab-${index}`}
    {...other}
  >
    {value === index && (
      <Box
        sx={{
          p: 3,
          display: 'flex',
          flexDirection: 'column',
          flex: 1
        }}
      >
        {children}
      </Box>
    )}
  </Box>
);
