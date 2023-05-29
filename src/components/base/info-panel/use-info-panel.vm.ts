import { useState, useCallback } from 'react';

const supportedFeatures = ['Multi Swap', 'Swap & Bridge', 'Deposit & Borrow', 'Repay & Withdraw', 'Collateral Swap'];

const comingSoonFeatures = ['Collateral Swap', 'DeptSwap'];

export const useInfoPanelViewModel = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = useCallback(
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setIsOpen(open);
    },
    []
  );

  return { isOpen, toggleDrawer, supportedFeatures, comingSoonFeatures };
};
