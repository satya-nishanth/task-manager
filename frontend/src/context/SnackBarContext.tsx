import React, { createContext, useContext, useState } from 'react';
import { Snackbar, Alert } from '@mui/material';

interface SnackbarState {
  message: string;
  severity: 'error' | 'warning' | 'info' | 'success';
}

interface SnackbarContextType {
  openSnackbar: (
    message: string,
    severity: 'error' | 'warning' | 'info' | 'success'
  ) => void;
}

const SnackbarContext = createContext<SnackbarContextType | undefined>(
  undefined
);

export const SnackbarProvider: React.FC<any> = ({ children }) => {
  const [snackbar, setSnackbar] = useState<SnackbarState | null>(null);

  const openSnackbar = (
    message: string,
    severity: 'error' | 'warning' | 'info' | 'success'
  ) => {
    setSnackbar({ message, severity });
  };

  const handleClose = () => {
    setSnackbar(null);
  };

  return (
    <SnackbarContext.Provider value={{ openSnackbar }}>
      {children}
      <Snackbar
        open={snackbar !== null}
        autoHideDuration={5000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <div>
          {snackbar && (
            <Alert
              onClose={handleClose}
              severity={snackbar.severity}
              sx={{ width: '100%' }}
            >
              {snackbar.message}
            </Alert>
          )}
        </div>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error('useSnackbar must be used within a SnackbarProvider');
  }
  return context;
};
