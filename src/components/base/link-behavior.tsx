import { forwardRef } from 'react';

import { LinkProps } from '@mui/material/Link';
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';

export const LinkBehavior = forwardRef<
  HTMLAnchorElement,
  Omit<RouterLinkProps, 'to'> & { href: RouterLinkProps['to'] }
>((props, ref) => {
  const { href, ...other } = props;

  // Map href (Material UI) -> to (react-router)
  return <RouterLink ref={ref} to={href} {...other} />;
});

export const OverrideLinkBehaviorThemeComponents = {
  MuiLink: {
    defaultProps: {
      component: LinkBehavior
    } as LinkProps
  },
  MuiButtonBase: {
    defaultProps: {
      LinkComponent: LinkBehavior
    }
  }
};
