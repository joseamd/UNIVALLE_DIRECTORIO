import React, { useEffect, useState } from 'react';
import { DataGrid, GridToolbar} from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import '../../styles/genericTable.scss';

import { tableConfigs } from '../../config/tableConfig';  // Config específico para cada tipo de entidad
import FormDrawer from '../formModal/FormDrawer';          // Drawer lateral para formularios
import ColorButtons from '../button/CreateButton';          // Botón "Crear"
import EditIconButton from '../button/EditIconButton';      // Botón "Editar"
import DeleteIconButton from '../button/DeleteIconButton';  // Botón "Eliminar"
import localeTextES from '../../utils/localeTextES';        // Traducciones

import DeleteConfirmationModal from './DeleteConfirmationModal';
import { formatDate } from '../../utils/formatDate';
import CustomSnackbar from './CustomSnackbar';


const GenericTable = ({ type }) => {  
  const [rows, setRows] = useState([]);  // Estado para almacenar registros actuales  
  const [openDrawer, setOpenDrawer] = useState(false); // Estado para controlar el formulario (Drawer)
  const [selectedRow, setSelectedRow] = useState(null);
  const [fechaActual, setFechaActual] = useState(new Date());
  const [paginationModel, setPaginationModel] = useState({pageSize: 10, page: 0, });

  // Estado para manejar los Snackbars
  const [errorOpen, setErrorOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [message, setMessage] = useState('');

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false); // Estado para el diálogo de confirmación
  const [selectedRowId, setSelectedRowId] = useState(null); // Estado para el id del registro seleccionado
  const config = tableConfigs[type];     // Obtener configuración específica según el tipo de entidad (ej: 'dependencias', 'funcionarios')
  

  // Obtener datos al cargar o al cambiar el tipo
  useEffect(() => {
    if (config) {
      config.getData().then((res) => setRows(res.data));
    }
  }, [type]);


  //la fecha se actualiza cada segundo
  useEffect(() => {
    const intervalo = setInterval(() => setFechaActual(new Date()), 1000);
    return () => clearInterval(intervalo); // limpieza al desmontar
  }, []);  
  

  // Función de eliminación con confirmación
  const handleDelete = (id) => {
    setSelectedRowId(id); // Guardamos el id del registro
    setOpenDeleteDialog(true); // Abrimos el diálogo
  };

  // Confirmación de eliminación
  const handleConfirmDelete = async () => {
    try {
      await config.deleteRow(selectedRowId);
      setRows((prev) => prev.filter((row) => row.id !== selectedRowId));
      setMessage('Registro eliminado exitosamente.');
      setSuccessOpen(true);
    } catch (error) {
      console.error('Error al eliminar:', error);
      setMessage('No se puede eliminar el registro, ya que tiene relación asociadas.');
      setErrorOpen(true);
    } finally {
      setOpenDeleteDialog(false);
    }
  };

  // Cancelar eliminación
  const handleCancelDelete = () => {
    setOpenDeleteDialog(false);
  };  

  // ✏️ Abrir el drawer o modal para editar
  const handleEdit = (row) => {
    setSelectedRow(row); // Cargar datos al drawer
    setOpenDrawer(true); // Mostrar drawer con info para editar
  };

  // ➕ Abrir drawer o modal vacío para crear
  const handleCreate = () => {
    setSelectedRow(null); // Limpiar selección para creación
    setOpenDrawer(true); // Mostrar drawer vacío
  };

  // Manejo de creación/actualización de un Registro
  const handleSubmit = async (data) => {
    try {
      if (selectedRow?.id) {        
        await config.updateRow(selectedRow.id, data); // Actualizar
      } else {        
        await config.createRow(data);  // Crear nuevo
      }

      // Recargar datos después del cambio
      const response = await config.getData();
      setRows(response.data);      
      setMessage('Registro guardado exitosamente.');  // Mostrar mensaje de éxito
      setSuccessOpen(true);

    } catch (error) {
      console.error('Error en submit:', error);
      setMessage('Error al guardar el registro. Intente nuevamente.');
      setErrorOpen(true); // Muestra el Snackbar de error
    }
  };  

  // Mostrar error si el tipo no está configurado
  if (!config) return <div>No hay configuración para el tipo: {type}</div>;


  // Agregar columna de acciones
  const columns = [
    ...config.columns.map((col) => ({
      ...col,
      flex: 1, // Hace que las columnas se ajusten automáticamente
    })),
    {
      field: 'acciones',
      headerName: 'Acciones',
      sortable: false,
      filterable: false,
      width: 150,
      renderCell: (params) => (
        <>
          <EditIconButton onClick={() => handleEdit(params.row)} />
          <DeleteIconButton onClick={() => handleDelete(params.row.id)} />
        </>
      ),
    }
  ];

  return (
    <Paper sx={{ width: '90%', mt: 2, p: 2, overflow: 'hidden' }}>
      <div className="fecha">{formatDate(fechaActual)}</div>
      <div className="custom-header">   
        <h2>{config.title}</h2>  

        {/* Botón crear */}
        <div className='button-create'>
          <ColorButtons
            onClick={handleCreate}
            label={`Crear ${tableConfigs[type]?.title.split(' ')[2] ?? type}`}
          />
        </div>    
      </div>      

      {/* DataGrid ajustado */}
      <div className="data-grid-wrapper">
        <DataGrid
          className="custom-data-grid"
          rows={rows}
          columns={columns}
          checkboxSelection
          disableRowSelectionOnClick
          localeText={localeTextES}    //idioma español  
          paginationModel={paginationModel}
          onPaginationModelChange={(newModel) => setPaginationModel(newModel)}
          pageSizeOptions={[5, 10, 15, 20, 50]} // aquí puedes personalizar los valores
          slots={{ toolbar: GridToolbar }}  //menu de filtros
          slotProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 },
            },
          }}
        />
      </div>


      {/* Drawer */}
      <FormDrawer
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        initialData={selectedRow}
        onSubmit={handleSubmit}
        fields={config.fields || []}
      />

      {/* Dialog de confirmación para eliminar DeleteConfirmationModal.jsx*/}
      <DeleteConfirmationModal
        open={openDeleteDialog}
        onCancel={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />

      {/* Snackbar de error */}
      <CustomSnackbar
        open={errorOpen}
        onClose={() => setErrorOpen(false)}
        severity="error"
        message={message}
      />

      {/* Snackbar de éxito */}
      <CustomSnackbar
        open={successOpen}
        onClose={() => setSuccessOpen(false)}
        severity="success"
        message={message}
      />
    </Paper>
  );
};

export default GenericTable;
