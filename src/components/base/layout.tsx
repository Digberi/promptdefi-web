import { Container, styled } from '@mui/material';

import { Navigation } from './navigation';

import { CFC } from '@/types/react';

const FullSizeContainer: CFC = styled(Container)({
  height: '100vh'
});

export const Layout: CFC = ({ children }) => {
  return (
    <FullSizeContainer>
      {children}
      <Navigation />
    </FullSizeContainer>
  );
};
