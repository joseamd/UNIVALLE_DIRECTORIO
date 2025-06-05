import React from 'react';
import { Modal, Box, Typography, Divider, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import '../../../styles/publicModal.scss';

const DependenciaModal = ({ open, onClose, dependencia }) => {
    if (!dependencia) return null;

    const correo = dependencia.contactos_dependencia?.find(c =>
        c.tipo.toLowerCase().includes('correo_institucional')
    )?.valor;

    const telefono = dependencia.contactos_dependencia?.find(c =>
        c.tipo.toLowerCase().includes('telefono')
    );

    const sitioWeb = dependencia.contactos_dependencia?.find(c =>
        c.tipo.toLowerCase().includes('web')
    )?.valor;

  return (
    <Modal open={open} onClose={onClose}>
      <Box className="public-modal" tabIndex={-1}>
        <Box className="public-modal__header">
          <Typography
            id="modal-dependencia-title"
            component="h2"
            className="public-modal__title"
          >
            Información de la Dependencia
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
            <Typography className="public-modal__label">Dependencia:</Typography>
            <Typography className="public-modal__value">{dependencia.nombre}</Typography>
            
            <Divider className="public-modal__divider" />
            {correo && (
              <>
                <Typography className="public-modal__label">Correo:</Typography>
                <Typography className="public-modal__value">
                  <a href={`mailto:${correo}`} style={{ color: '#1976d2' }}>
                      {correo}
                  </a>
                </Typography>
                <Divider className="public-modal__divider" />
              </>
            )}

            {telefono && (
              <>
                <Typography className="public-modal__label">Teléfono:</Typography>
                <Typography className="public-modal__value">
                  {telefono.valor}
                  {telefono.extension ? ` Ext. ${telefono.extension}` : ''}
                </Typography>
                <Divider className="public-modal__divider" />
              </>
            )}

            {sitioWeb && (
              <>
                <Typography className="public-modal__label">Sitio Web:</Typography>
                <Typography className="public-modal__value">
                  <a
                      href={sitioWeb}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: '#1976d2' }}
                  >
                      {sitioWeb}
                  </a>
                </Typography>
                <Divider className="public-modal__divider" />
              </>
            )}

            {dependencia.ubicacion && (
              <>
                <Typography className="public-modal__label">Ubicación:</Typography>
                <Typography className="public-modal__value">
                    Edificio {dependencia.ubicacion.codigo} - {dependencia.ubicacion.nombre}
                </Typography>
                <Divider className="public-modal__divider" />
              </>
            )}

            {dependencia.sede && (
              <>
                <Typography className="public-modal__label">Sede:</Typography>
                <Typography className="public-modal__value">
                    {dependencia.sede.nombre}, {dependencia.sede.direccion},{' '}
                    {dependencia.sede.ciudad}
                </Typography>
                <Divider className="public-modal__divider" />
              </>
            )}

            {dependencia.personas?.length > 0 && (
              <>
                <Typography className="public-modal__label">Funcionarios Asociados:</Typography>
                <ul className="public-modal__value">
                  {dependencia.personas.map((p, i) => (
                      <li key={i}>
                          <strong>{p.nombre}</strong> — {p.cargo}
                      </li>
                  ))}
                </ul>
                <Divider className="public-modal__divider" />
              </>
            )}
        </Box>
      </Box>
    </Modal>
  );
};

export default DependenciaModal;
