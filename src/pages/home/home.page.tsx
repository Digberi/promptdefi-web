import { Box } from '@mui/material';

import { useHomeViewModel } from './home.page.vm';

import { Page } from '@/components/base/page';
import { FormsGenerator } from '@/components/forms/forms.generator';
import { Template } from '@/components/template';
import { templates } from '@/config/templates';
import { useTabs } from '@/hooks/use-tabs';
import { useOperations } from '@/providers/operations';

export const HomePage = () => {
  const { Tabs, TabPanel, setMainTab } = useTabs(['Request', 'Templates']);
  const { /*sendPromt, promtMessage,*/ setPromtMessage } = useHomeViewModel();

  const setTemplate = (message: string) => {
    setPromtMessage(message);
    setMainTab();
  };

  const { operations, updateOperation } = useOperations();

  return (
    <Page
      sx={{
        justifyContent: 'space-between',
        pb: 3
      }}
    >
      <Tabs />
      <TabPanel index={0}>
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
