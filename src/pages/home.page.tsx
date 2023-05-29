import { Typography } from '@mui/material';

import { Page } from '@/components/base/page';
import { PromptInput } from '@/components/promt-input';

export const HomePage = () => {
  return (
    <Page
      sx={{
        justifyContent: 'space-between',
        pb: 3
      }}
    >
      <Typography variant="h1">Home</Typography>
      <PromptInput />
    </Page>
  );
};
