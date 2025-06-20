import AvatarCircle from '../components/shared/AvatarCircle';
import LocationCityIcon from '@mui/icons-material/LocationCity'; // Importa el ícono
import ApartmentIcon from '@mui/icons-material/Apartment'; // Importa el ícono
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import {
  getInitials,
  capitalizeWords,
  renderTooltip,
  renderContacto,
  renderCorreoLink,
  renderTelefono,
  renderSitioWeb
} from '../utils/renderUtils';

export const columnasPorCategoria = (handleOpenModal) => ({

  //Genera tabla de Personas
  personas: [
    {
      field: 'nombre',
      headerName: 'Nombre',
      flex: 1,
      renderCell: ({ row }) => (
        <div 
          onClick={() => handleOpenModal(row)}
          style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
        >
          <AvatarCircle text={row.nombre} initials={getInitials(row.nombre)} />
          <span>{row.nombre}</span>
        </div>
      )
    },
    {
      field: 'cargo',
      headerName: 'Cargo',
      flex: 1,
      renderCell: ({ value }) => (
        <div style={{ whiteSpace: 'normal', wordBreak: 'break-word' }}>
          {capitalizeWords(value)}
        </div>
      )
    },
    {
      field: 'correo_institucional',
      headerName: 'Correo Institucional',
      flex: 1,
      minWidth: 120,
      maxWidth: 150,
      renderCell: ({ row }) => {
        const contacto = renderContacto(row, 'correo_institucional', 'contactos_persona');
        return renderCorreoLink(contacto?.valor);
      },
    },
    {
      field: 'telefono',
      headerName: 'Teléfono',
      flex: 1,
      renderCell: ({ row }) => {
        const contacto = renderContacto(row, 'telefono', 'contactos_persona');
        return renderTelefono(contacto);
      },
    },
    {
      field: 'dependencia',
      headerName: 'Dependencia',
      flex: 1,
      renderCell: ({ row }) => renderTooltip(row.dependencia?.nombre, <div>{row.dependencia?.nombre}</div>),
    },
    {
      field: 'ubicacion',
      headerName: 'Ubicación',
      flex: 1,
      renderCell: ({ row }) => {
        const ubicacion = row.ubicacion;
        if (!ubicacion?.codigo || !ubicacion?.nombre) return '';
        const texto = `${ubicacion.codigo} - ${ubicacion.nombre}`;
        return renderTooltip(texto, (
          <div>
            <strong>{ubicacion.codigo}</strong> - {ubicacion.nombre}
          </div>
        ));
      },
    },
    {
      field: 'sede',
      headerName: 'Sede',
      flex: 1,
      renderCell: ({ row }) => {
        const sede = row.ubicacion?.sede;
        if (!sede) return '';
        const texto = `${sede.nombre} - ${sede.direccion}, ${sede.ciudad}`;
        return renderTooltip(texto, (
          <div>
            <strong>{sede.nombre}</strong> - {sede.direccion}, {sede.ciudad}
          </div>
        ));
      },
    }
  ],
 
  //Genera tabla de Dependencias
  dependencias: [
    {
      field: 'nombre',
      headerName: 'Nombre',
      flex: 1,
      renderCell: ({ row }) => (
        <div 
          onClick={() => handleOpenModal(row)}
          style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer'}}
          >
          <AvatarCircle text={row.nombre} icon={<CorporateFareIcon fontSize="small" style={{ color: 'white' }} />} />
          <span>{row.nombre}</span>
        </div>
      )
    },
    {
      field: 'correo_institucional',
      headerName: 'Correo Institucional',
      flex: 1,
      renderCell: ({ row }) => {
        const contacto = renderContacto(row, 'correo_institucional', 'contactos_dependencia');
        return renderCorreoLink(contacto?.valor);
      },
    },
    {
      field: 'telefono',
      headerName: 'Teléfono',
      flex: 1,
      renderCell: ({ row }) => {
        const contacto = renderContacto(row, 'telefono', 'contactos_dependencia');
        return renderTelefono(contacto);
      },
    },
    {
      field: 'sitio',
      headerName: 'Sitio Web',
      flex: 1,
      renderCell: ({ row }) => {
        const contacto = renderContacto(row, 'web', 'contactos_dependencia');
        return renderSitioWeb(contacto?.valor);
      },
    },
    {
      field: 'ubicacion',
      headerName: 'Ubicación',
      flex: 1,
      renderCell: ({ row }) => {
        const ubicacion = row.ubicacion;
        if (!ubicacion?.codigo || !ubicacion?.nombre) return '';
        const texto = `${ubicacion.codigo} - ${ubicacion.nombre}`;
        return renderTooltip(texto, (
          <div>
            <strong>{ubicacion.codigo}</strong> - {ubicacion.nombre}
          </div>
        ));
      },
    },
    {
      field: 'sede',
      headerName: 'Sede',
      flex: 1,
      renderCell: ({ row }) => {
        const sede = row.sede;
        if (!sede) return '';
        const texto = `${sede.nombre} - ${sede.direccion}, ${sede.ciudad}`;
        return renderTooltip(texto, (
          <div>
            <strong>{sede.nombre}</strong> - {sede.direccion}, {sede.ciudad}
          </div>
        ));
      },
    },
  ],

  //Genera tabla de Ubicaciones
  ubicaciones: [
    {
      field: 'codigo',
      headerName: 'Código Edificio',
      flex: 1,
      renderCell: ({ row }) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <AvatarCircle text={row.codigo} icon={<ApartmentIcon fontSize="small" style={{ color: 'white' }} />} />
          <span>{row.codigo}</span>
        </div>
      )
    },
    { field: 'nombre', headerName: 'Nombre', flex: 1 },
    {
      field: 'sede',
      headerName: 'Sede',
      flex: 1,
      renderCell: ({ row }) => row.sede ? (
        <div>
          <strong>{row.sede.nombre}</strong> - {row.sede.direccion}, {row.sede.ciudad}
        </div>
      ) : ''
    },
  ],

  //Genera tabla de sedes
  sedes: [
    {
      field: 'nombre',
      headerName: 'Nombre',
      flex: 1,
      renderCell: ({ row }) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <AvatarCircle text={row.nombre} icon={<LocationCityIcon fontSize="small" style={{ color: 'white' }} />} />
          <span>{row.nombre}</span>
        </div>
      )
    },
    { field: 'ciudad', headerName: 'Ciudad', flex: 1 },
    { field: 'direccion', headerName: 'Dirección', flex: 1 },
  ],
});
