import { Box } from '@mui/material';

import { useHomeViewModel } from './home.page.vm';

import { Page } from '@/components/base/page';
import { ConnectButton } from '@/components/connect-button';
import { PromptInput } from '@/components/promt-input';
import { SendBatch } from '@/components/send-batch';
import { Template } from '@/components/template';
import { templates } from '@/config/templates';
import { useTabs } from '@/hooks/use-tabs';

export const HomePage = () => {
  const { Tabs, TabPanel, setMainTab } = useTabs(['Request', 'Templates']);
  const { sendPromt, promtMessage, setPromtMessage } = useHomeViewModel();

  const onSubmit = () => {
    sendPromt(promtMessage, result => {
      console.log('success' + result);
    });
    setPromtMessage('');
  };
  const setTemplate = (message: string) => {
    setPromtMessage(message);
    setMainTab();
  };

  return (
    <Page
      sx={{
        justifyContent: 'space-between',
        pb: 3
      }}
    >
      <Tabs />
      <TabPanel index={0}>
        <ConnectButton />
        <SendBatch />
        <PromptInput onSubmit={onSubmit} placeholder="Enter your request" promt={promtMessage} />
      </TabPanel>
      <TabPanel index={1}>
        <Box sx={{ display: 'grid', gap: 2, mb: 2 }}>
          {templates.map(template => (
            <Template text={template} use={setTemplate} />
          ))}
        </Box>
      </TabPanel>
    </Page>
  );
};
