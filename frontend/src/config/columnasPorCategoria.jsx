import LocationCityIcon from '@mui/icons-material/LocationCity'; // Importa el ícono
import ApartmentIcon from '@mui/icons-material/Apartment'; // Importa el ícono
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import { Tooltip } from '@mui/material';

export const columnasPorCategoria = {

  //Genera tabla de Personas
  personas: [
    {
      field: 'nombre',
      headerName: 'Nombre',
      flex: 1,
      renderCell: (params) => {
        const nombre = params.row.nombre || '';
        const iniciales = nombre
          .split(' ')
          .map(word => word.charAt(0))
          .join('')
          .substring(0, 4)
          .toUpperCase();

        // Generar color en base al nombre
        const hashCode = (str) =>
          str.split('').reduce((acc, char) => char.charCodeAt(0) + ((acc << 5) - acc), 0);
        const color = `hsl(${Math.abs(hashCode(nombre)) % 360}, 80%, 40%)`;

        return (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                backgroundColor: color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.6em',
                fontWeight: 'bold',
                color: 'white',
                textTransform: 'uppercase',
              }}
            >
              {iniciales}
            </span>
            <span
              style={{
                display: 'table-cell',
                verticalAlign: 'middle',
                whiteSpace: 'nowrap',
                fontSize: 'calc(0.771416em)',
              }}
            >
              {nombre}
            </span>
          </div>
        );
      }
    },
    {
      field: 'cargo',
      headerName: 'Cargo',
      flex: 1,
      renderCell: (params) => {
        const texto = params.value?.toLowerCase() || '';
        const capitalizado = texto.replace(/\b\w/g, char => char.toUpperCase());

        return (
          <div style={{ whiteSpace: 'normal', wordBreak: 'break-word' }}>
            {capitalizado}
          </div>
        );
      }
    },
    {
      field: 'correo_institucional',
      headerName: 'Correo Institucional',
      flex: 1,
      minWidth: 120,
      maxWidth: 150,
      renderCell: (params) => {
        const contacto = params.row.contactos_persona?.find(
          (c) => c.tipo.toLowerCase().includes('correo_institucional')
        );
        const correo = contacto?.valor;

        return correo ? (
          <Tooltip title={correo} placement="top">
            <div
              style={{
                whiteSpace: 'normal',
                wordBreak: 'break-word',
                cursor: 'pointer',
              }}
            >
              {correo}
            </div>
          </Tooltip>
        ) : '';
      },
    },
    {
      field: 'telefono',
      headerName: 'Teléfono',
      flex: 1,
      renderCell: (params) => {
        const contacto = params.row.contactos_persona?.find(
          (c) => c.tipo.toLowerCase().includes('telefono')
        );
        return contacto
          ? `${contacto.valor}${contacto.extension ? ` Ext. ${contacto.extension}` : ''}`
          : '';
      },
    },
    {
      field: 'dependencia',
      headerName: 'Dependencia',
      flex: 1,
      renderCell: (params) => {
        const dependencia = params.row.dependencia;
        if (!dependencia) return '';

        const texto = `${dependencia.nombre}`;
        return (
          <Tooltip title={texto} placement="top">
            <div style={{ whiteSpace: 'normal', wordBreak: 'break-word' }}>
              {dependencia?.nombre || ''}
            </div>
          </Tooltip>          
        );
      },
    },
    {
      field: 'ubicacion',
      headerName: 'Ubicacion',
      flex: 1,
      renderCell: (params) => {
        const ubicacion = params.row.ubicacion;
        if (!ubicacion || !ubicacion.codigo || !ubicacion.nombre) return '';

        const texto = `${ubicacion.codigo} - ${ubicacion.nombre}`;
        return (
          <Tooltip title={texto} placement="top">
              <div style={{ whiteSpace: 'normal', wordBreak: 'break-word' }}>
                <strong>{ubicacion.codigo}</strong> - {ubicacion.nombre}
              </div>
          </Tooltip>          
        );
      },
    },
    {
      field: 'sede',
      headerName: 'Sede',
      flex: 1,
      renderCell: (params) => {
        const sede = params.row.ubicacion?.sede;
        if (!sede) return '';

        const texto = `${sede.nombre} - ${sede.direccion}, ${sede.ciudad}`;
        return (
          <Tooltip title={texto} placement="top">
            <div style={{ whiteSpace: 'normal', wordBreak: 'break-word' }}>
              <strong>{sede.nombre}</strong> - {sede.direccion}, {sede.ciudad}
            </div>
          </Tooltip>
        );
      },
    }
  ],
 
  //Genera tabla de Dependencias
  dependencias: [
    {
      field: 'nombre',
      headerName: 'Nombre',
      flex: 1,
      renderCell: (params) => {
        const nombre = params.row.nombre || '';        

        // Función para generar un color HSL basado en el nombre
        const hashCode = (str) =>
          str.split('').reduce((acc, char) => char.charCodeAt(0) + ((acc << 5) - acc), 0);
        const color = `hsl(${Math.abs(hashCode(nombre)) % 360}, 80%, 40%)`;

        return (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                backgroundColor: color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.8em',
                color: 'white',
              }}
            >
              {/* Aquí el ícono centrado en el círculo */}
              <CorporateFareIcon fontSize="small" style={{ color: 'white' }} />
            </span>
            <span
              style={{
                display: 'table-cell',
                verticalAlign: 'middle',
                whiteSpace: 'nowrap',
                fontSize: 'calc(0.771416em)',
              }}
            >
              {nombre}
            </span>
          </div>
        );
      }
    },

    {
      field: 'correo_institucional',
      headerName: 'Correo Institucional',
      flex: 1,
      renderCell: (params) => {
        const contacto = params.row.contactos_dependencia?.find(
          (c) => c.tipo.toLowerCase().includes('correo_institucional')
        );
        const correo = contacto?.valor;

        return correo ? (
          <Tooltip title={correo} placement="top">
            <div
              style={{
                whiteSpace: 'normal',
                wordBreak: 'break-word',
                cursor: 'pointer',
              }}
            >
              {correo}
            </div>
          </Tooltip>
        ) : '';
      },
    },
    {
      field: 'telefono',
      headerName: 'Teléfono',
      flex: 1,
      renderCell: (params) => {
        const contacto = params.row.contactos_dependencia?.find(
          (c) => c.tipo.toLowerCase().includes('telefono')
        );
        return contacto
          ? `${contacto.valor}${contacto.extension ? ` Ext. ${contacto.extension}` : ''}`
          : '';
      },
    },
    {
      field: 'sitio',
      headerName: 'Sitio Web',
      flex: 1,
      renderCell: (params) => {
        const contacto = params.row.contactos_dependencia?.find(
          (c) => c.tipo.toLowerCase().includes('web')
        );
        return contacto?.valor ? (
          <a href={contacto.valor} target="_blank" rel="noopener noreferrer">
            {contacto.valor}
          </a>
        ) : '';
      },
    },
    {
      field: 'ubicacion',
      headerName: 'Ubicacion',
      flex: 1,
      renderCell: (params) => {
        const ubicacion = params.row.ubicacion;
        if (!ubicacion || !ubicacion.codigo || !ubicacion.nombre) return '';

        const texto = `${ubicacion.codigo} - ${ubicacion.nombre}`;
        return (
          <Tooltip title={texto} placement="top">
              <div style={{ whiteSpace: 'normal', wordBreak: 'break-word' }}>
                <strong>{ubicacion.codigo}</strong> - {ubicacion.nombre}
              </div>
          </Tooltip>          
        );
      },
    },
    {
      field: 'sede',
      headerName: 'Sede',
      flex: 1,
      renderCell: (params) => {
        const sede = params.row.sede;
        if (!sede) return '';

        const texto = `${sede.nombre} - ${sede.direccion}, ${sede.ciudad}`;
        return (
          <Tooltip title={texto} placement="top">
            <div style={{ whiteSpace: 'normal', wordBreak: 'break-word' }}>
              <strong>{sede.nombre}</strong> - {sede.direccion}, {sede.ciudad}
            </div>
          </Tooltip>
        );
      },
    },
  ],

  //Genera tabla de Ubicaciones
  ubicaciones: [
    {
      field: 'codigo',
      headerName: 'Código Edificio',
      flex: 1,
      renderCell: (params) => {
        const codigoUbicacion = params.row ? params.row.codigo : ''; // Asegurarse que params.row esté definido

        // Generamos el color aleatorio basado en el código de la ubicacion
        const hashCode = (str) =>
          str.split('').reduce((acc, char) => char.charCodeAt(0) + ((acc << 5) - acc), 0);
        const color = `hsl(${Math.abs(hashCode(codigoUbicacion)) % 360}, 80%, 40%)`;

        return (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                backgroundColor: color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.8em',
                color: 'white',
              }}
            >
              <ApartmentIcon fontSize="small" style={{ color: 'white' }} />
            </span>
            <span
              style={{
                display: 'table-cell',
                verticalAlign: 'middle',
                whiteSpace: 'nowrap',
                fontSize: 'calc(0.771416em)',
              }}
            >
              {codigoUbicacion}
            </span>
          </div>
        );
      }
    },
    { field: 'nombre', headerName: 'Nombre', flex: 1 },
    {
      field: 'sede',
      headerName: 'Sede',
      flex: 1,
      renderCell: (params) => {
        const sede = params.row.sede;
        return sede ? (
          <div>
            <strong>{sede.nombre}</strong> - {sede.direccion}, {sede.ciudad}
          </div>
        ) : '';
      },
    },
  ],

  //Genera tabla de sedes
  sedes: [
    {
      field: 'nombre',
      headerName: 'Nombre',
      flex: 1,
      renderCell: (params) => {
        const nombreSede = params.row.nombre || '';

        // Generamos el color aleatorio basado en el nombre de la sede
        const hashCode = (str) =>
          str.split('').reduce((acc, char) => char.charCodeAt(0) + ((acc << 5) - acc), 0);
        const color = `hsl(${Math.abs(hashCode(nombreSede)) % 360}, 80%, 40%)`;

        return (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                backgroundColor: color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.8em',
                color: 'white',
              }}
            >
              {/* Aquí el ícono centrado en el círculo */}
              <LocationCityIcon fontSize="small" style={{ color: 'white' }} />
            </span>
            <span
              style={{
                display: 'table-cell',
                verticalAlign: 'middle',
                whiteSpace: 'nowrap',
                fontSize: 'calc(0.771416em)',
              }}
            >
              {nombreSede}
            </span>
          </div>
        );
      }
    },
    { field: 'ciudad', headerName: 'Ciudad', flex: 1 },
    { field: 'direccion', headerName: 'Dirección', flex: 1 },
  ],
};
