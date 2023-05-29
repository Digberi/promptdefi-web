import { ComponentProps } from 'react';

import { BottomNavigationAction } from '@mui/material';

import { Routes } from '@/router/routes.enum';

export interface NavigationItem extends ComponentProps<typeof BottomNavigationAction> {
  link: Routes;
}
