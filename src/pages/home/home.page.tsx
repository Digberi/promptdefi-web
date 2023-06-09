import { useState } from 'react';

import { Box, Typography, styled } from '@mui/material';

import { useHomeViewModel } from './home.page.vm';

import { Page } from '@/components/base/page';
import { OperationScreen } from '@/components/operations-screen';
import { PromptInput } from '@/components/promt-input';
import { Hand } from '@/components/svg/hand';
import { TabPanel, Tabs, useTab } from '@/components/tabs';
import { Template } from '@/components/template';
import { templates } from '@/config/templates';
import { useOperations } from '@/providers/operations';

const tabs = ['Request', 'Templates'];

const HomePlaceholder = () => {
  return (
    <Box sx={{ display: 'grid', placeItems: 'center', height: 'fit-content', alignSelf: 'center' }}>
      <Hand />
      <Typography variant="h6">Hi! I am CHANGE NAME Helper</Typography>
      <Typography variant="body1">Just describe your request, and I'll assist you.</Typography>
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
  padding: theme.spacing(0, 0, 1.5),
  borderRadius: theme.spacing(1)
}));

export const HomePage = () => {
  const { sendPromt, promtMessage, setPromtMessage } = useHomeViewModel();
  const { setOperations } = useOperations();
  const { setMainTab } = useTab();
  const [isOpen, setIsOpen] = useState<boolean>(false);

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
    <HomePageLayout>
      <Tabs tabs={tabs} />
      <TabPanel index={0}>
        <Box sx={{ display: 'grid', gap: 2, gridTemplateRows: '1fr auto', flex: 1 }}>
          <HomePlaceholder />
          <PromptInput promt={promtMessage} onSubmit={onPromtSubmit} placeholder={'Enter Your Request'} />
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
    </HomePageLayout>
  );
};
