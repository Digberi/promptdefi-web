import { RouterItem } from './router.types';
import { Routes } from './routes.enum';

import { AccountPage } from '@/pages/account.page';
import { HomePage } from '@/pages/home/home.page';
// import { StrategiesPage } from '@/pages/strategies.page';

interface RouterConfig {
  list: RouterItem[];
}

export const RouterConfig: RouterConfig = {
  list: [
    {
      path: Routes.HOME,
      element: <HomePage />
    },
    // {
    //   path: Routes.STRATEGIES,
    //   element: <StrategiesPage />
    // },
    {
      path: Routes.ACCOUNT,
      element: <AccountPage />
    }
  ]
};
