import { Box, Button } from '@mui/material';
import { useSigner } from 'wagmi';

import { useHomeViewModel } from './home.page.vm';

import { Page } from '@/components/base/page';
import { FormsGenerator } from '@/components/forms/forms.generator';
import { Template } from '@/components/template';
import { templates } from '@/config/templates';
import { sendEth } from '@/core/send-eth';
import { useTabs } from '@/hooks/use-tabs';
import { useOperations } from '@/providers/operations';
import { toAtomic } from '@/utils/units';

export const HomePage = () => {
  const { Tabs, TabPanel, setMainTab } = useTabs(['Request', 'Templates']);
  const { /*sendPromt, promtMessage,*/ setPromtMessage } = useHomeViewModel();
  const { data: signer } = useSigner();

  const setTemplate = (message: string) => {
    setPromtMessage(message);
    setMainTab();
  };

  const { operations, updateOperation } = useOperations();

  const handleSend = async () => {
    if (!signer) {
      return console.log('no signer');
    }
    const result = await sendEth(signer, '0xa42635bcBA235B74f49C9dBf78Fed7b5aba8EA70', toAtomic('0.01', 18)!);
    console.log({ result });
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
        <Button onClick={handleSend}>Send Eth</Button>
        {operations && updateOperation && <FormsGenerator listOperations={operations} setOperation={updateOperation} />}
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
