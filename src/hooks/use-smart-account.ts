import { useContext } from 'react';

import { SmartAccountContext } from '@/providers/smart-account.provider';

export const useSmartAccount = () => {
  return useContext(SmartAccountContext);
};
