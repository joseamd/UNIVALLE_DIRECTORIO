import React from 'react';
import { Modal, Box, Typography, Divider, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import '../../../styles/personaModal.scss';

export const PersonaModal = ({ open, onClose, persona }) => {
  if (!persona) return null;

  const contactoTelefono = persona.contactos_persona?.find(c =>
    c.tipo.toLowerCase().includes('telefono')
  );

  const telefono = contactoTelefono
    ? `${contactoTelefono.valor}${contactoTelefono.extension ? ` Ext. ${contactoTelefono.extension}` : ''}`
    : '';

  const correo = persona.contactos_persona?.find(c =>
    c.tipo.toLowerCase().includes('correo_institucional')
  )?.valor;

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="modal-title">
      <Box className="persona-modal" tabIndex={-1}>
        <Box className="persona-modal__header">
          <Typography
            id="modal-title"
            component="h2"
            className="persona-modal__title"
          >
            Información del Funcionario
          </Typography>
          <IconButton
            onClick={onClose}
            size="small"
            className="persona-modal__close-button"
            aria-label="Cerrar modal"
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <Box className="persona-modal__content">
          <Divider className="persona-modal__divider" />

          <Typography className="persona-modal__label">Nombre:</Typography>
          <Typography className="persona-modal__value">{persona.nombre}</Typography>

          <Divider className="persona-modal__divider" />

          <Typography className="persona-modal__label">Cargo:</Typography>
          <Typography className="persona-modal__value">{persona.cargo}</Typography>

          <Divider className="persona-modal__divider" />

          <Typography className="persona-modal__label">Correo:</Typography>
          <Typography className="persona-modal__value">
            <a href={`mailto:${correo}`} style={{ color: '#1976d2', textDecoration: 'none' }}>
              {correo}
            </a>
          </Typography>

          <Divider className="persona-modal__divider" />

          <Typography className="persona-modal__label">Teléfono:</Typography>
          <Typography className="persona-modal__value">{telefono}</Typography>

          <Divider className="persona-modal__divider" />

          {persona.dependencia && (
            <>
              <Typography className="persona-modal__label">Dependencia:</Typography>
              <Typography className="persona-modal__value">{persona.dependencia.nombre}</Typography>
            </>
          )}

          <Divider className="persona-modal__divider" />

          {persona.ubicacion && (
            <>
              <Typography className="persona-modal__label">Ubicación:</Typography>
              <Typography className="persona-modal__value">
                Edificio {persona.ubicacion.codigo} - {persona.ubicacion.nombre}
              </Typography>
            </>
          )}

          <Divider className="persona-modal__divider" />

          {persona.ubicacion?.sede && (
            <>
              <Typography className="persona-modal__label">Sede:</Typography>
              <Typography className="persona-modal__value">
                {persona.ubicacion.sede.nombre}, {persona.ubicacion.sede.direccion}, {persona.ubicacion.sede.ciudad}
              </Typography>
            </>            
          )}
          <Divider className="persona-modal__divider" />
        </Box>
      </Box>
    </Modal>
  );
};

export default PersonaModal;
