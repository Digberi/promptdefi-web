import { useState } from 'react';

import { Box } from '@mui/material';

import { useHomeViewModel } from './home.page.vm';

import { Page } from '@/components/base/page';
import { OperationScreen } from '@/components/operations-screen';
import { PromptInput } from '@/components/promt-input';
import { TabPanel, Tabs, useTab } from '@/components/tabs';
import { Template } from '@/components/template';
import { templates } from '@/config/templates';
import { useOperations } from '@/providers/operations';

const tabs = ['Request', 'Templates'];

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
    <Page
      sx={{
        justifyContent: 'space-between',
        bgcolor: 'background.default',
        px: 0,
        pb: 3,
        position: 'relative',
        flex: 1,
        borderRadius: 2
      }}
    >
      <Tabs tabs={tabs} />
      <TabPanel index={0}>
        <PromptInput onSubmit={onPromtSubmit} placeholder={'Enter Your Request'} />
      </TabPanel>
      <TabPanel index={1}>
        <Box sx={{ display: 'grid', gap: 2, mb: 2 }}>
          {templates.map((template, index) => (
            <Template key={index} text={template} use={setTemplate} />
          ))}
        </Box>
      </TabPanel>

      <OperationScreen isOpen={isOpen} setIsOpen={setIsOpen} />
    </Page>
  );
};
