import { Button } from '@mui/material';

const CustomButton = ({ children, ...props }) => (
  <Button
    variant="contained"
    color="primary"
    sx={{ borderRadius: 2, textTransform: 'none' }}
    {...props}
  >
    {children}
  </Button>
);

export default CustomButton;
