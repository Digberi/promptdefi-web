import { Box, Container, Typography, styled } from '@mui/material';

import { Header } from './components/base/header';
import { FeaturesInfo } from './components/base/info-panel/features-info';
import { AccountPage } from './pages/account.page';
import { HomePage } from './pages/home/home.page';
import { CFC } from './types/react';

const Wrapper: CFC = styled(Box)({
  display: 'grid',
  gridTemplateRows: 'auto 1fr',
  height: '100vh',
  maxHight: '-webkit-fill-available'
});

const FullSizeContainer = styled(Container)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr 2fr 1fr',
  gap: theme.spacing(2),
  paddingTop: theme.spacing(3),
  maxHeight: `calc(100vh - ${theme.shape.headerHeight})`
}));

const DesktopPage: CFC<{ title: string }> = ({ title, children }) => {
  return (
    <Box
      sx={{
        gridRow: '1 / -1',
        display: 'flex',
        flexDirection: 'column',
        mb: 2,
        overflow: 'hidden'
      }}
    >
      <Typography
        sx={{
          color: 'text.secondary',
          pb: 3
        }}
        variant="body1"
      >
        {title}
      </Typography>
      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'scroll'
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export const Desktop = () => {
  return (
    <Wrapper>
      <Header />
      <FullSizeContainer>
        <DesktopPage title="Smart Account Details">
          <AccountPage />
        </DesktopPage>

        <DesktopPage title="Magic space">
          <Box
            id="home-page"
            sx={{
              bgcolor: 'background.default',
              borderRadius: 2,
              flexGrow: 1,
              display: 'flex'
            }}
          >
            <HomePage />
          </Box>
        </DesktopPage>

        <DesktopPage title="Supported Operations">
          <Box
            sx={{
              bgcolor: 'background.paper',
              p: 2,
              borderRadius: 2
            }}
          >
            <FeaturesInfo />
          </Box>
        </DesktopPage>
      </FullSizeContainer>
    </Wrapper>
  );
};
