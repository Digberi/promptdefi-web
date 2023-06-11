import React, { createContext } from 'react';

import { Snackbar, Alert, SnackbarCloseReason, Link } from '@mui/material';

import { CFC } from '@/types/react';

enum AlertType {
  SUCCESS = 'success',

  ERROR = 'error',
  WARNING = 'warning',
  INFO = 'info'
}
const types = [AlertType.ERROR, AlertType.SUCCESS];

interface AlertContextProps {
  callAlert: (message: string, href: string, status: number) => void;
}

export const AlertContext = createContext<AlertContextProps>({
  callAlert: () => {
    return;
  }
});

export const useAlert = () => React.useContext(AlertContext);

export const AlertProvider: CFC = ({ children }) => {
  const [open, setOpen] = React.useState(false);
  const [content, setContent] = React.useState<{ message: string; href: string; type: AlertType }>();

  const handleClick = () => {
    setOpen(true);
  };

  const callAlert = (message: string, href: string, status: number) => {
    const type = types[status];
    setContent({ message, href, type });
    handleClick();
  };

  const handleExited = () => {
    setContent(undefined);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSnackClose = (_event: Event | React.SyntheticEvent<any, Event>, reason: SnackbarCloseReason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <AlertContext.Provider value={{ callAlert }}>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleSnackClose}
        TransitionProps={{ onExited: handleExited }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          variant="filled"
          elevation={6}
          onClose={handleClose}
          severity={content?.type}
          sx={{ minWidth: 300, width: '100%', alignItems: 'center' }}
        >
          <div>{content?.message}</div>
          {content?.href && (
            <Link href={content.href} target="_blank" underline="hover">
              View transaction
            </Link>
          )}
        </Alert>
      </Snackbar>
      {children}
    </AlertContext.Provider>
  );
};
