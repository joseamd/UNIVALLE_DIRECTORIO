import React from 'react';
import MuiAlert from '@mui/material/Alert';

const CustomAlert = React.forwardRef(function CustomAlert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default CustomAlert;
