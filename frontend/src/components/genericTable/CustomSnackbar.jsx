import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';
import CustomAlert from './CustomAlert';


const CustomSnackbar = ({
  open,
  onClose,
  severity,
  message,
  duration = 3000,
  anchorOrigin = { vertical: 'top', horizontal: 'center' },
}) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={duration}
      onClose={onClose}
      anchorOrigin={anchorOrigin}
      TransitionComponent={Slide} 
    >
      <CustomAlert onClose={onClose} severity={severity} sx={{ width: '100%' }}>
        {message}
      </CustomAlert>
    </Snackbar>
  );
};

export default CustomSnackbar;
