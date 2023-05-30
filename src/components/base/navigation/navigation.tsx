import { SyntheticEvent, useCallback, useState } from 'react';

import { BottomNavigationAction, Link } from '@mui/material';

import { NavigationConfig } from './navigation.config';
import { StyledBottomNavigation } from './navigation.styled';

export const Navigation = () => {
  const [value, setValue] = useState(0);

  const handleChange = useCallback((_: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  }, []);

  return (
    <StyledBottomNavigation showLabels value={value} onChange={handleChange}>
      {NavigationConfig.list.map((item, index) => (
        <BottomNavigationAction key={index} label={item.label} component={Link} href={item.link} icon={item.icon} />
      ))}
    </StyledBottomNavigation>
  );
};
