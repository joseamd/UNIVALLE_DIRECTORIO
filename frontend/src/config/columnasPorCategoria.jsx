import EmailIcon from '../assets/email.svg'
import LocationCityIcon from '@mui/icons-material/LocationCity'; // Importa el ícono
import ApartmentIcon from '@mui/icons-material/Apartment'; // Importa el ícono

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
          (c) => c.tipo.toLowerCase().includes('correo institucional')
        );
        const correo = contacto?.valor;

        return correo ? (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              height: '100%',
            }}
          >
            <a href={`mailto:${correo}`} title={correo}>
              <img src={EmailIcon} alt="Correo" width="20" />
            </a>
          </div>
        ) : '';
      },
    },
    {
      field: 'telefono',
      headerName: 'Teléfono',
      flex: 1,
      renderCell: (params) => {
        const contacto = params.row.contactos_persona?.find(
          (c) => c.tipo.toLowerCase().includes('teléfono')
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
        return (
          <div style={{ whiteSpace: 'normal', wordBreak: 'break-word' }} title={dependencia?.nombre || ''}>
            {dependencia?.nombre || ''}
          </div>
        );
      },
    },
    {
      field: 'edificio',
      headerName: 'Edificio',
      flex: 1,
      minWidth: 120, 
      maxWidth: 80,
      renderCell: (params) => {
        const edificio = params.row.edificio;
        return (
          <div style={{ whiteSpace: 'normal', wordBreak: 'break-word' }}>
            {edificio?.codigo || ''}
          </div>
        );
      },
    },
    {
      field: 'sede',
      headerName: 'Ubicación',
      flex: 1,
      renderCell: (params) => {
        const sede = params.row.sede;
        return sede ? (
          <div style={{ whiteSpace: 'normal', wordBreak: 'break-word' }} title={sede.nombre + " - "+ sede.direccion + ", "+sede.ciudad} >
            <strong>{sede.nombre}</strong> - {sede.direccion}, {sede.ciudad}
          </div>
        ) : '';
      },
    },
  ],
 
  //Genera tabla de Dependencias
  dependencias: [
    { field: 'nombre', headerName: 'Nombre', flex: 1 },
    {
      field: 'correo_institucional',
      headerName: 'Correo Institucional',
      flex: 1,
      renderCell: (params) => {
        const contacto = params.row.contactos_dependencia?.find(
          (c) => c.tipo.toLowerCase().includes('correo')
        );
        return contacto?.valor || '';
      },
    },
    {
      field: 'telefono',
      headerName: 'Teléfono',
      flex: 1,
      renderCell: (params) => {
        const contacto = params.row.contactos_dependencia?.find(
          (c) => c.tipo.toLowerCase().includes('teléfono')
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
          (c) => c.tipo.toLowerCase().includes('sitio')
        );
        return contacto?.valor ? (
          <a href={contacto.valor} target="_blank" rel="noopener noreferrer">
            {contacto.valor}
          </a>
        ) : '';
      },
    },
    {
      field: 'edificio',
      headerName: 'Edificio',
      flex: 1,
      minWidth: 120, 
      maxWidth: 80,
      renderCell: (params) => {
        const edificio = params.row.edificio;
        return edificio ? `${edificio.codigo}` : '';
      },
    },
    {
      field: 'sede',
      headerName: 'Ubicación',
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

  //Genera tabla de Edificios
  edificios: [
    {
      field: 'codigo',
      headerName: 'Código',
      flex: 1,
      renderCell: (params) => {
        const codigoEdificio = params.row.codigo || '';

        // Generamos el color aleatorio basado en el código del edificio
        const hashCode = (str) =>
          str.split('').reduce((acc, char) => char.charCodeAt(0) + ((acc << 5) - acc), 0);
        const color = `hsl(${Math.abs(hashCode(codigoEdificio)) % 360}, 80%, 40%)`;

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
              {/* Aquí el ícono de apartamento centrado en el círculo */}
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
              {codigoEdificio}
            </span>
          </div>
        );
      }
    },
    { field: 'nombre', headerName: 'Nombre', flex: 1 },
    {
      field: 'sede',
      headerName: 'Ubicación',
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
