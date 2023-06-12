import { useState } from 'react';

import { Backdrop, Box, CircularProgress, Typography, styled } from '@mui/material';

import { useHomeViewModel } from './home.page.vm';

import { OperationScreen } from '@/components/base/operations-screen';
import { Page } from '@/components/base/page';
import { PromptInput } from '@/components/base/promt-input';
import { TabPanel, Tabs, useTab } from '@/components/base/tabs';
import { Hand } from '@/components/svg/hand';
import { Template } from '@/components/ui/template';
import { APP_NAME } from '@/config/constants';
import { templates } from '@/config/templates';
import { useIsDesktop } from '@/hooks/is-desktop';
import { useOperations } from '@/providers/operations';

const tabs = ['Request', 'Templates'];

const HomePlaceholder = () => {
  return (
    <Box sx={{ display: 'grid', placeItems: 'center', height: 'fit-content', alignSelf: 'center' }}>
      <Hand />
      <Typography align="center" variant="h6">
        Hi! I am {APP_NAME}
      </Typography>
      <Typography align="center" variant="body1">
        Just describe your request— and I'll do the magic.
      </Typography>
    </Box>
  );
};

const HomePageLayout = styled(Page)(({ theme }) => ({
  width: '100%',
  position: 'relative',

  display: 'grid',
  gridTemplateRows: 'auto 1fr',
  gridTemplateColumns: '1fr',

  backgroundColor: theme.palette.background.default,
  padding: theme.spacing(0, 0, 1.5)
}));

const LoaderScreen = styled(Backdrop)(({ theme }) => ({
  position: 'absolute',
  borderRadius: theme.spacing(1),
  zIndex: theme.zIndex.drawer + 1
}));

export const HomePage = () => {
  const { sendPromt, promtMessage, setPromtMessage, isSubmitting } = useHomeViewModel();
  const { setOperations } = useOperations();
  const { setMainTab } = useTab();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { isDesktop } = useIsDesktop();

  const setTemplate = (message: string) => {
    setPromtMessage(message);
    setMainTab();
  };

  const onPromtSubmit = () => {
    sendPromt(promtMessage, operations => {
      setOperations(operations);
      setIsOpen(true);
    });
    setPromtMessage('');
  };

  return (
    <HomePageLayout
      sx={{
        borderRadius: isDesktop ? 2 : 0
      }}
    >
      <Tabs tabs={tabs} />
      <TabPanel index={0}>
        <Box sx={{ display: 'grid', gap: 2, gridTemplateRows: '1fr auto', flex: 1 }}>
          <HomePlaceholder />
          <PromptInput
            promt={promtMessage}
            setPromtMessage={setPromtMessage}
            onSubmit={onPromtSubmit}
            placeholder={'Enter Your Request'}
          />
        </Box>
      </TabPanel>
      <TabPanel index={1}>
        <Box sx={{ display: 'grid', gap: 2, mb: 2 }}>
          {templates.map((template, index) => (
            <Template key={index} text={template} use={setTemplate} />
          ))}
        </Box>
      </TabPanel>

      <OperationScreen isOpen={isOpen} setIsOpen={setIsOpen} />
      <LoaderScreen open={isSubmitting}>
        <CircularProgress color="success" />
      </LoaderScreen>
    </HomePageLayout>
  );
};
