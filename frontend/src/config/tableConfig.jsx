// Archivo generado automáticamente

import {
  getSedes,
  createSede,
  updateSede,
  deleteSede
} from '../services/sede';

import {
  getEspacios,
  createEspacio,
  updateEspacio,
  deleteEspacio
} from '../services/espacio';

import {
  getUbicaciones,
  createUbicacion,
  updateUbicacion,
  deleteUbicacion
} from '../services/ubicacion';

import {
  getTipoDependencias,
  createTipoDependencia,
  updateTipoDependencia,
  deleteTipoDependencia
} from '../services/tipodependencia';

import {
  getTipoDocumentos,
  createTipoDocumento,
  updateTipoDocumento,
  deleteTipoDocumento
} from '../services/tipodocumento';

import {
  getTipoContactos,
  createTipoContacto,
  updateTipoContacto,
  deleteTipoContacto
} from '../services/tipocontacto';

import {
  getTipoVinculaciones,
  createTipoVinculacion,
  updateTipoVinculacion,
  deleteTipoVinculacion
} from '../services/tipovinculacion';

import {
  getCargos,
  createCargo,
  updateCargo,
  deleteCargo
} from '../services/cargo';

import {
  getDependencias,
  createDependencia,
  updateDependencia,
  deleteDependencia
} from '../services/dependencia';

import {
  getPersonas,
  createPersona,
  updatePersona,
  deletePersona
} from '../services/persona';

import {
  getContactosPersona,
  createContactoPersona,
  updateContactoPersona,
  deleteContactoPersona
} from '../services/contactopersona';

import {
  getContactosDependencia,
  createContactoDependencia,
  updateContactoDependencia,
  deleteContactoDependencia
} from '../services/contactodependencia';

import {
  getVinculaciones,
  createVinculacion,
  updateVinculacion,
  deleteVinculacion
} from '../services/vinculacion';

import { renderEstadoLaboral } from '../components/genericTable/customRenderers';
import { Autocomplete, TextField } from '@mui/material';

export const tableConfigs = {
  sede: {
    title: 'Gestión de Sede',
    columns: [
      { field: 'nombre', headerName: 'Nombre' },
      { field: 'ciudad', headerName: 'Ciudad' },
      { field: 'direccion', headerName: 'Direccion' },
    ],
    fields: [
      { name: 'nombre', label: 'Nombre', required: true },
      { name: 'ciudad', label: 'Ciudad', required: true },
      { name: 'direccion', label: 'Direccion', required: true },
    ],
    getData: getSedes,
    createRow: createSede,
    updateRow: updateSede,
    deleteRow: deleteSede,
  },

  espacio: {
    title: 'Gestión de Espacio',
    columns: [
      { field: 'sede', headerName: 'Sede' },
      { field: 'codigo', headerName: 'Codigo' },
      { field: 'nombre', headerName: 'Nombre' },
    ],
    fields: [
      {
        name: 'sede',
        label: 'Sede',
        type: 'select',
        required: true,
        options: [],
        fetchOptions: async () => {
          const tipos = await getSedes(); // Obtenemos los datos
          return tipos.data.map((t) => ({
            value: t.id,
            label: `${t.nombre}`,
          }));
        },
      },
      { name: 'codigo', label: 'Codigo', required: true },
      { name: 'nombre', label: 'Nombre', required: true },
    ],
    getData: getEspacios,
    createRow: createEspacio,
    updateRow: updateEspacio,
    deleteRow: deleteEspacio,
  },

  ubicacion: {
    title: 'Gestión de Ubicacion',
    columns: [
      { field: 'edificio_codigo', headerName: 'Código Edificio' },
      { field: 'edificio_nombre', headerName: 'Nombre Edificio' },
      { field: 'sede', headerName: 'Sede'},
      { field: 'num_piso', headerName: 'Número de Pisos' },
      { field: 'latitud', headerName: 'Latitud' },
      { field: 'longitud', headerName: 'Longitud' },
    ],
    fields: [
      { name: 'edificio_codigo', label: 'Código Edificio', required: true },
      { name: 'edificio_nombre', label: 'Nombre Edificio', required: true },
      {
        name: 'sede',
        label: 'Sede',
        type: 'select',
        required: true,
        options: [],
        fetchOptions: async () => {
          const tipos = await getSedes(); // Obtenemos los datos
          return tipos.data.map((t) => ({
            value: t.id,
            label: `${t.id}. ${t.nombre}`,
          }));
        },
      },
      { 
        name: 'num_piso', 
        label: 'Piso', 
        type: 'number', 
        required: true,
        inputProps: { 
          min: 1, 
          max: 10, 
          pattern: '[0-9]*', 
          inputMode: 'numeric' 
        } 
      },
      { 
        name: 'latitud', 
        label: 'Latitud', 
        type: 'number',
        required: true ,
        inputProps: {
          step: 'any',            //permite decimales
          inputMode: 'decimal',   //muestra teclado decimal en móviles
          min: -90,
          max: 90
        }
      },
      { 
        name: 'longitud', 
        label: 'Longitud', 
        type: 'number',
        required: true,
        inputProps: {
          step: 'any',
          inputMode: 'decimal',
          min: -180,
          max: 180
        }
      },
    ],
    getData: getUbicaciones,
    createRow: createUbicacion,
    updateRow: updateUbicacion,
    deleteRow: deleteUbicacion,
  },

  tipodependencia: {
    title: 'Gestión de TipoDependencia',
    columns: [
      { field: 'nombre', headerName: 'Nombre' },
      { field: 'descripcion', headerName: 'Descripcion' },
    ],
    fields: [
      { name: 'nombre', label: 'Nombre', required: true },
      { name: 'descripcion', label: 'Descripcion', required: true },
    ],
    getData: getTipoDependencias,
    createRow: createTipoDependencia,
    updateRow: updateTipoDependencia,
    deleteRow: deleteTipoDependencia,
  },
  tipodocumento: {
    title: 'Gestión de TipoDocumento',
    columns: [
      { field: 'nombre', headerName: 'Nombre' },
      { field: 'descripcion', headerName: 'Descripcion' },
    ],
    fields: [
      { name: 'nombre', label: 'Nombre', required: true },
      { name: 'descripcion', label: 'Descripcion', required: true },
    ],
    getData: getTipoDocumentos,
    createRow: createTipoDocumento,
    updateRow: updateTipoDocumento,
    deleteRow: deleteTipoDocumento,
  },
  
  tipocontacto: {
    title: 'Gestión de TipoContacto',
    columns: [
      { field: 'nombre', headerName: 'Nombre' },
      { field: 'descripcion', headerName: 'Descripcion' },
    ],
    fields: [
      { name: 'nombre', label: 'Nombre', required: true },
      { name: 'descripcion', label: 'Descripcion', required: true },
    ],
    getData: getTipoContactos,
    createRow: createTipoContacto,
    updateRow: updateTipoContacto,
    deleteRow: deleteTipoContacto,
  },

  tipovinculacion: {
    title: 'Gestión de TipoVinculacion',
    columns: [
      { field: 'nombre', headerName: 'Nombre' },
      { field: 'descripcion', headerName: 'Descripcion' },
    ],
    fields: [
      { name: 'nombre', label: 'Nombre', required: true },
      { name: 'descripcion', label: 'Descripcion', required: true },
    ],
    getData: getTipoVinculaciones,
    createRow: createTipoVinculacion,
    updateRow: updateTipoVinculacion,
    deleteRow: deleteTipoVinculacion,
  },

  cargo: {
    title: 'Gestión de Cargo',
    columns: [
      { field: 'nombre', headerName: 'Nombre' },
      { field: 'descripcion', headerName: 'Descripcion' },
    ],
    fields: [
      { name: 'nombre', label: 'Nombre', required: true },
      { name: 'descripcion', label: 'Descripcion', required: true },
    ],
    getData: getCargos,
    createRow: createCargo,
    updateRow: updateCargo,
    deleteRow: deleteCargo,
  },

  dependencia: {
    title: 'Gestión de Dependencia',
    columns: [
      { field: 'nombre', headerName: 'Nombre' },
      { field: 'tipo_dependencia', headerName: 'Tipo Dependencia' },
      { field: 'dependencia_padre', headerName: 'Dependencia Padre' },
      { field: 'ubicacion', headerName: 'Ubicacion' },
    ],
    fields: [
      { name: 'nombre', label: 'Nombre', required: true },
      {
        name: 'tipo_dependencia',
        label: 'Tipo Dependencia',
        type: 'select',
        required: true,
        options: [],
        fetchOptions: async () => {
          const tipos = await getTipoDependencias(); // Obtenemos los datos
          return tipos.data.map((t) => ({
            value: t.id,
            label: `${t.nombre}`,
          }));
        },
      },
      {
        name: 'dependencia_padre',
        label: 'Dependencia Padre',
        type: 'select',
        required: true,
        options: [],
        fetchOptions: async () => {
          const tipos = await getDependencias(); // Obtenemos los datos
          return tipos.data.map((t) => ({
            value: t.id,
            label: `${t.nombre}`,
          }));
        },
      },
      {
        name: 'ubicacion',
        label: 'Ubicación',
        type: 'select',
        required: true,
        options: [],
        fetchOptions: async () => {
          const tipos = await getUbicaciones(); // Obtenemos los datos
          return tipos.data.map((t) => ({
            value: t.id,
            label: `${t.id}`,
          }));
        },
      },
    ],
    getData: getDependencias,
    createRow: createDependencia,
    updateRow: updateDependencia,
    deleteRow: deleteDependencia,
  },

  persona: {
    title: 'Gestión de Persona',
    columns: [
      { field: 'tipo_documento', headerName: 'Tipo Documento' },
      { field: 'numero_documento', headerName: 'Numero Documento' },
      { field: 'primer_nombre', headerName: 'Primer Nombre' },
      { field: 'segundo_nombre', headerName: 'Segundo Nombre' },
      { field: 'primer_apellido', headerName: 'Primer Apellido' },
      { field: 'segundo_apellido', headerName: 'Segundo Apellido' },
    ],
    fields: [
      {
        name: 'tipo_documento',
        label: 'Tipo documento',
        type: 'select',
        required: true,
        options: [],
        fetchOptions: async () => {
          const tipos = await getTipoDocumentos(); // Obtenemos los datos
          return tipos.data.map((t) => ({
            value: t.id,
            label: `${t.nombre}`,
          }));
        },
      },
      { name: 'numero_documento', label: 'Numero Documento', required: true },
      { name: 'primer_nombre', label: 'Primer Nombre', required: true },
      { name: 'segundo_nombre', label: 'Segundo Nombre', required: true },
      { name: 'primer_apellido', label: 'Primer Apellido', required: true },
      { name: 'segundo_apellido', label: 'Segundo Apellido', required: true },
    ],
    getData: getPersonas,
    createRow: createPersona,
    updateRow: updatePersona,
    deleteRow: deletePersona,
  },

  contactopersona: {
    title: 'Gestión de ContactoPersona',
    columns: [
      { field: 'persona', headerName: 'Persona' },
      { field: 'tipo_contacto', headerName: 'Tipo Contacto' },
      { field: 'valor', headerName: 'Valor' },
      { field: 'extension', headerName: 'Extension' },
    ],
    fields: [
      {
        name: 'persona',
        label: 'Persona',
        type: 'autocomplete',
        required: true,
        options: [],
        fetchOptions: async ({ searchTerm, page = 1 }) => {
          if (searchTerm && searchTerm.length >= 3) {
            try {
              // Llama a la API para obtener personas basadas en el searchTerm
              const res = await getPersonas({ searchTerm, page });
              return res.data.map((p) => ({
                value: p.id,
                label: `${p.primer_nombre} ${p.segundo_nombre || ''} ${p.primer_apellido} ${p.segundo_apellido || ''}`.trim(),
              }));
            } catch (error) {
              console.error('Error al cargar las personas:', error);
              return [];
            }
          }
          return []; // Devuelve un array vacío si no hay un término de búsqueda válido
        },
      },
      {
        name: 'tipo_contacto',
        label: 'Tipo de Contacto',
        type: 'select',
        required: true,
        options: [],
        fetchOptions: async () => {
          const tipos = await getTipoContactos(); // Obtenemos los datos
          return tipos.data.map((t) => ({
            value: t.id,
            label: `${t.nombre}`,
          }));
        },
      },
      { name: 'valor', label: 'Valor', required: true },
      { name: 'extension', label: 'Extension', required: true },
    ],
    getData: getContactosPersona,
    createRow: createContactoPersona,
    updateRow: updateContactoPersona,
    deleteRow: deleteContactoPersona,
  },

  contactodependencia: {
    title: 'Gestión de ContactoDependencia',
    columns: [
      { field: 'dependencia', headerName: 'Dependencia' },
      { field: 'tipo_contacto', headerName: 'Tipo Contacto' },
      { field: 'valor', headerName: 'Valor' },
      { field: 'extension', headerName: 'Extension' },
    ],
    fields: [
      {
        name: 'dependencia',
        label: 'Dependencia',
        type: 'select',
        required: true,
        options: [],
        fetchOptions: async () => {
          const tipos = await getDependencias(); // Obtenemos los datos
          return tipos.data.map((t) => ({
            value: t.id,
            label: `${t.nombre}`,
          }));
        },
      },
      {
        name: 'tipo_contacto',
        label: 'Tipo de Contacto',
        type: 'select',
        required: true,
        options: [],
        fetchOptions: async () => {
          const tipos = await getTipoContactos(); // Obtenemos los datos
          return tipos.data.map((t) => ({
            value: t.id,
            label: `${t.nombre}`,
          }));
        },
      },
      { name: 'valor', label: 'Valor', required: true },
      { name: 'extension', label: 'Extension', required: true },
    ],
    getData: getContactosDependencia,
    createRow: createContactoDependencia,
    updateRow: updateContactoDependencia,
    deleteRow: deleteContactoDependencia,
  },

  vinculacion: {
    title: 'Gestión de Vinculacion',
    columns: [
      { field: 'persona', headerName: 'Persona' },
      { field: 'tipo_vinculacion', headerName: 'Tipo Vinculacion' },
      { field: 'cargo', headerName: 'Cargo' },
      { field: 'dependencia', headerName: 'Dependencia' },
      { field: 'fecha_inicio', headerName: 'Fecha Inicio' },
      { field: 'fecha_fin', headerName: 'Fecha Fin' },
      {
      field: 'estado_laboral',
      headerName: 'Estado Laboral',
      renderCell: renderEstadoLaboral,
    },
  ],
    fields: [
      {
        name: 'persona',
        label: 'Persona',
        type: 'autocomplete',
        required: true,
        readOnlyOnEdit: true,
        options: [],
        fetchOptions: async ({ searchTerm, page = 1 }) => {
          if (searchTerm && searchTerm.length >= 3) {
            try {
              const res = await getPersonas({ searchTerm, page });
              return res.data.map((p) => ({
                value: p.id,
                label: `${p.primer_nombre} ${p.segundo_nombre || ''} ${p.primer_apellido} ${p.segundo_apellido || ''}`.trim(),
              }));
            } catch (error) {
              console.error('Error al cargar las personas:', error);
              return [];
            }
          }
          return [];
        },
        normalizeValue: async (value) => {
          if (!value) return '';
          try {
            const res = await getPersonas(value);
            const p = res.data;
            return {
              value: p.id,
              label: `${p.primer_nombre} ${p.segundo_nombre || ''} ${p.primer_apellido} ${p.segundo_apellido || ''}`.trim(),
            };
          } catch (error) {
            console.error('Error al obtener persona:', error);
            return { value, label: `ID: ${value}` };
          }
        }
      },
      {
        name: 'tipo_vinculacion',
        label: 'Tipo Vinculacion',
        type: 'select',
        required: true,
        options: [],
        fetchOptions: async () => {
          const tipos = await getTipoVinculaciones(); // Obtenemos los datos
          return tipos.data.map((t) => ({
            value: t.id,
            label: `${t.nombre}`,
          }));
        },
      },
      { name: 'cargo', label: 'Cargo', type: 'select', required: true, options: [], fetchOptions: getCargos },
      {
        name: 'dependencia',
        label: 'Dependencia',
        type: 'select',
        required: true,
        options: [],
        fetchOptions: async () => {
          const tipos = await getDependencias(); // Obtenemos los datos
          return tipos.data.map((t) => ({
            value: t.id,
            label: `${t.nombre}`,
          }));
        },
      },
      { name: 'fecha_inicio', label: 'Fecha Inicio', required: true, type: 'date' },
      { name: 'fecha_fin', label: 'Fecha Fin', required: true, type: 'date' },
      {
        name: 'estado_laboral',
        label: 'Estado Laboral',
        type: 'select',
        required: true,
        options: [
          { value: 'activo', label: 'Activo' },
          { value: 'inactivo', label: 'Inactivo' },
        ],
      },
    ],
      getData: getVinculaciones,
      createRow: createVinculacion,
      updateRow: updateVinculacion,
      deleteRow: deleteVinculacion,
  },
};
