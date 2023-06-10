import { Add, SsidChart } from '@mui/icons-material';

import { NavigationItem } from './navigation.types';

import { NetworkAvatar } from '@/components/ui/network-avatar';
import { Routes } from '@/router/routes.enum';

interface NavigationConfig {
  list: NavigationItem[];
}

export const NavigationConfig: NavigationConfig = {
  list: [
    {
      label: 'New Bundle',
      link: Routes.HOME,
      icon: <Add />
    },
    {
      label: 'Active Strategies',
      link: Routes.STRATEGIES,
      disabled: true,
      //TODO: Replace with custom icon
      icon: <SsidChart />
    },
    {
      label: 'Account',
      link: Routes.ACCOUNT,
      icon: <NetworkAvatar />
    }
  ]
};
