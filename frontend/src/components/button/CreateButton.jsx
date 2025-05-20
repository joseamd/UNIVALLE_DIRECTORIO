import React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import AddIcon from '@mui/icons-material/Add';

const CreateButton = ({ onClick, label = 'Crear ' }) => {
  return (
    <Stack direction="row" spacing={2} sx={{ mb: 0, alignItems: 'center'}}>
      <Button
        variant="contained"
        color="success"
        startIcon={<AddIcon />}
        onClick={onClick}
        size="small"
        sx={{
          fontSize: '0.8rem',
          padding: '6px 12px',
          minWidth: 'auto',
          textTransform: 'none', // Si no quieres que esté en mayúsculas
        }}
      >
        {label}
      </Button>
    </Stack>
  );
};

export default CreateButton;
