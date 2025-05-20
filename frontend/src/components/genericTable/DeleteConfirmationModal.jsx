import React from 'react';
import { Modal, Backdrop, Fade, Box, Button, Typography } from '@mui/material';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  maxWidth: 400,
  bgcolor: 'background.paper',
  borderRadius: 4,
  boxShadow: 24,
  p: 4,
};

const DeleteConfirmationModal = ({ open, onCancel, onConfirm }) => (
  <Modal
    open={open}
    onClose={onCancel}
    closeAfterTransition
    slots={{ backdrop: Backdrop }}
    slotProps={{ backdrop: { timeout: 500 } }}
  >
    <Fade in={open}>
      <Box sx={modalStyle}>
        <Typography variant="h5" gutterBottom color="#4d4c4c">
          Confirmación de eliminación
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }} color="#4d4c4c">
          ¿Estás seguro de que deseas eliminar este registro?
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <Button onClick={onCancel} variant="contained" color="primary">
            Cancelar
          </Button>
          <Button onClick={onConfirm} variant="outlined" color="error">
            Eliminar
          </Button>
        </Box>
      </Box>
    </Fade>
  </Modal>
);

export default DeleteConfirmationModal;