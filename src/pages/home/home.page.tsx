import { Box, Button } from '@mui/material';
import { useSigner } from 'wagmi';

import { useHomeViewModel } from './home.page.vm';

import { Page } from '@/components/base/page';
import { ConnectButton } from '@/components/connect-button';
import { FormsGenerator } from '@/components/forms/forms.generator';
import { TabPanel, Tabs, useTab } from '@/components/tabs';
import { Template } from '@/components/template';
import { templates } from '@/config/templates';
import { sendEth } from '@/core/send-eth';
import { useOperations } from '@/providers/operations';
import { toAtomic } from '@/utils/units';

const tabs = ['Request', 'Templates'];

export const HomePage = () => {
  const { /*sendPromt, promtMessage,*/ setPromtMessage } = useHomeViewModel();
  const { data: signer } = useSigner();
  const { setMainTab } = useTab();

  const setTemplate = (message: string) => {
    setPromtMessage(message);
    setMainTab();
  };

  const { operations, updateOperation, sendOperations } = useOperations();

  const handleSend = async () => {
    if (!signer) {
      return console.log('no signer');
    }
    const result = await sendEth(signer, '0x4C202F3507552B913eB930eF2906789a9210742f', toAtomic('0.02', 18)!);
    console.log({ result });
  };

  return (
    <Page
      sx={{
        justifyContent: 'space-between',
        pb: 3
      }}
    >
      <Tabs tabs={tabs} />
      <TabPanel index={0}>
        <ConnectButton />
        <Button onClick={handleSend}>Send Eth</Button>
        {operations && updateOperation && <FormsGenerator listOperations={operations} setOperation={updateOperation} />}
        <Button onClick={sendOperations}>Send</Button>
      </TabPanel>
      <TabPanel index={1}>
        <Box sx={{ display: 'grid', gap: 2, mb: 2 }}>
          {templates.map((template, index) => (
            <Template key={index} text={template} use={setTemplate} />
          ))}
        </Box>
      </TabPanel>
    </Page>
  );
};
