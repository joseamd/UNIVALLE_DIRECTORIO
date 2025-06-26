import React from 'react';
import { Modal, Box, Typography, Divider, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import '../../../styles/publicModal.scss';

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
      <Box className="public-modal" tabIndex={-1}>
        <Box className="public-modal__header">
          <Typography
            id="modal-title"
            component="h2"
            className="public-modal__title"
          >
            Información del Funcionario
          </Typography>
          <IconButton
            onClick={onClose}
            size="small"
            className="public-modal__close-button"
            aria-label="Cerrar modal"
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <Box className="public-modal__content">
          <Divider className="public-modal__divider" />

          <Typography className="public-modal__label">Nombre:</Typography>
          <Typography className="public-modal__value">{persona.nombre}</Typography>

          <Divider className="public-modal__divider" />

          <Typography className="public-modal__label">Cargo:</Typography>
          <Typography className="public-modal__value">{persona.cargo}</Typography>

          <Divider className="public-modal__divider" />

          <Typography className="public-modal__label">Correo:</Typography>
          <Typography className="public-modal__value">
            <a href={`mailto:${correo}`} style={{ color: '#1976d2', textDecoration: 'none' }}>
              {correo}
            </a>
          </Typography>

          <Divider className="public-modal__divider" />

          <Typography className="public-modal__label">Teléfono:</Typography>
          <Typography className="public-modal__value">{telefono}</Typography>

          <Divider className="public-modal__divider" />

          {persona.dependencia && (
            <>
              <Typography className="public-modal__label">Dependencia:</Typography>
              <Typography className="public-modal__value">{persona.dependencia.nombre}</Typography>
            </>
          )}

          <Divider className="public-modal__divider" />

          {persona.ubicacion && (
            <>
              <Typography className="public-modal__label">Ubicación:</Typography>
              <Typography className="public-modal__value">
                Edificio {persona.ubicacion.codigo} - {persona.ubicacion.nombre}
              </Typography>
            </>
          )}

          <Divider className="public-modal__divider" />

          {persona.ubicacion?.sede && (
            <>
              <Typography className="public-modal__label">Sede:</Typography>
              <Typography className="public-modal__value">
                {persona.ubicacion.sede.nombre}, {persona.ubicacion.sede.direccion}, {persona.ubicacion.sede.ciudad}
              </Typography>
            </>            
          )}
          <Divider className="public-modal__divider" />
        </Box>
      </Box>
    </Modal>
  );
};

export default PersonaModal;
