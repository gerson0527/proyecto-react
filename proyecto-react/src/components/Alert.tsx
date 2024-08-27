import React, { useState, useEffect } from 'react';
import { Snackbar, Alert as MuiAlert, LinearProgress, Box } from '@mui/material';
import { AlertColor } from '@mui/material/Alert';

interface CustomAlertProps {
  type: AlertColor;
  message: string;
  variant: 'filled' | 'outlined';
  onClose: () => void;
  duration?: number;
}

const Alert: React.FC<CustomAlertProps> = ({ type, message, variant, onClose, duration = 4000 }) => {
  const [open, setOpen] = useState(true);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 0) {
          clearInterval(timer);
          setOpen(false);
          onClose();
          return 0;
        }
        const diff = 100 / (duration / 100);
        return Math.max(oldProgress - diff, 0);
      });
    }, 100);

    return () => {
      clearInterval(timer);
    };
  }, [onClose, duration]);

  return (
    <Snackbar
      open={open}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Box sx={{ 
        width: '100%', 
        maxWidth: 400, 
        borderRadius: 1, 
        overflow: 'hidden',
        boxShadow: 3
      }}>
        <MuiAlert
          elevation={0}
          variant={variant}
          severity={type}
          sx={{
            width: '100%',
            borderRadius: 0,
            '& .MuiAlert-icon': {
              marginRight: 1,
            }
          }}
        >
          {message}
        </MuiAlert>
        <LinearProgress 
          variant="determinate" 
          value={progress} 
          sx={{ 
            height: 4,
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
            '& .MuiLinearProgress-bar': {
              backgroundColor: type === 'error' ? '#d32f2f' : 
                               type === 'warning' ? '#ed6c02' : 
                               type === 'info' ? '#0288d1' : '#2e7d32'
            }
          }}
        />
      </Box>
    </Snackbar>
  );
};

export default Alert;