import { useState, useCallback } from 'react';

const supportedFeatures = [
  'Swap Tokens',
  'Send Tokens',
  'Deposit to Lido',
  'Wrap Eth',
  'Borrow & Deposit',
  'Repay & Withdraw'
];

const triggers = ['Stop-Loss Trigger', 'Take-Profit Trigger'];

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

  return { isOpen, toggleDrawer, supportedFeatures, triggers };
};
