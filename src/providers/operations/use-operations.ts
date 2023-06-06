import { useContext } from 'react';

import { OperationsContext } from './operations.provider';

export const useOperations = () => {
  const context = useContext(OperationsContext);

  if (context === undefined) {
    throw new Error('useOperations must be used within a OperationsProvider');
  }

  return context;
};
