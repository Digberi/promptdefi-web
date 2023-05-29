import { Fragment } from 'react';

import { Container, styled } from '@mui/material';

import { Header } from './header';
import { Navigation } from './navigation';

import { CFC } from '@/types/react';

const FullSizeContainer: CFC = styled(Container)({
  height: '100vh'
});

export const Layout: CFC = ({ children }) => {
  return (
    <Fragment>
      <Header />
      <FullSizeContainer>
        {children}
        <Navigation />
      </FullSizeContainer>
    </Fragment>
  );
};
