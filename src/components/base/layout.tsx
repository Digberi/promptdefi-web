import { Box, styled } from '@mui/material';

import { Header } from './header';
import { Navigation } from './navigation';

import { CFC } from '@/types/react';

const FullSizeContainer: CFC = styled(Box)({
  display: 'flex'
});

const Wrapper: CFC = styled(Box)({
  display: 'grid',
  gridTemplateRows: 'auto 1fr auto',
  height: '100vh'
});

export const Layout: CFC = ({ children }) => {
  return (
    <Wrapper>
      <Header />
      <FullSizeContainer>{children}</FullSizeContainer>
      <Navigation />
    </Wrapper>
  );
};
