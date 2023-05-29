import { NavigationItem } from './navigation.types';

import { Routes } from '@/router/routes.enum';

interface NavigationConfig {
  list: NavigationItem[];
}

export const NavigationConfig: NavigationConfig = {
  list: [
    {
      label: 'New Bundle',
      link: Routes.HOME
    },
    {
      label: 'Active Strategies',
      link: Routes.STRATEGIES
    },
    {
      label: 'Account',
      link: Routes.ACCOUNT
    }
  ]
};
