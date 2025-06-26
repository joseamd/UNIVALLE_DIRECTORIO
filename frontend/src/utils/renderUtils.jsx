import { Tooltip } from '@mui/material';

// Función para generar iniciales a partir de un texto
export const getInitials = (text = '') =>
  text
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .substring(0, 4)
    .toUpperCase();

// Función para capitalizar palabras
export const capitalizeWords = (text) => {
  if (typeof text !== 'string') return '';
  return text.replace(/\b\w/g, char => char.toUpperCase());
};

// Función para generar color basado en string
export const getColorFromString = (str = '') => {
  const hashCode = str.split('').reduce((acc, char) => char.charCodeAt(0) + ((acc << 5) - acc), 0);
  return `hsl(${Math.abs(hashCode) % 360}, 80%, 40%)`;
};

// Función para mostrar tooltip si hay contenido
export const renderTooltip = (text, children) =>
  text ? <Tooltip title={text} placement="top">{children}</Tooltip> : '';

// Función para obtener un contacto según tipo
export const renderContacto = (row, tipo, contactosKey) =>
  row[contactosKey]?.find((c) => c.tipo?.toLowerCase().includes(tipo));

// Función para renderizar link de correo
export const renderCorreoLink = (correo) => correo ? (
  <Tooltip title={correo} placement="top">
    <a
      href={`mailto:${correo}`}
      style={{
        cursor: 'pointer',
        color: '#1976d2',
        textDecoration: 'underline',
        overflowWrap: 'anywhere'
      }}
    >
      {correo}
    </a>
  </Tooltip>
) : '';

// Función para renderizar teléfono
export const renderTelefono = (contacto) =>
  contacto
    ? `${contacto.valor}${contacto.extension ? ` Ext. ${contacto.extension}` : ''}`
    : '';

// Función para renderizar sitio web
export const renderSitioWeb = (url) => url ? (
  <a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    style={{ color: '#1976d2', textDecoration: 'underline' }}
  >
    {url}
  </a>
) : '';
