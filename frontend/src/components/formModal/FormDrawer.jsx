import React, { useEffect, useState, useRef } from 'react'; // Importaciones de React y hooks
// Componentes de Material UI
import {
  Modal, Button, TextField, MenuItem,
  Box, Typography, IconButton, Fade, Backdrop
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import '@/styles/FormModal.scss'; 
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import AutocompleteWithPagination from '../formModal/AutocompleteWithPagination';

// Componente principal: formulario dentro de el Modal centrado
const FormModal = ({ open, onClose, initialData = null, onSubmit, fields = [] }) => {
  const [formData, setFormData] = useState({}); // Estado que guarda los valores del formulario
  const [errors, setErrors] = useState({});     // Estado que guarda los errores por campo
  const openButtonRef = useRef(null);           // Ref para el botón que abre el modal
  const modalRef = useRef(null);                // Ref para el modal para evitar problemas con aria-hidden

  useEffect(() => {
    // Inicializa el formulario con los valores iniciales
    if (initialData) {
      setFormData(initialData);
    } else {
      const emptyData = {};
      fields.forEach(field => {
        emptyData[field.name] = '';
      });
      setFormData(emptyData);
    }

    // Recorre cada campo y carga las opciones si es necesario
    const loadOptions = async () => {
      for (const field of fields) {
        if (field.type === 'select' && typeof field.fetchOptions === 'function') {
          try {
            const response = await field.fetchOptions();

            // Verifica si field.options es un array, si no, inicializa uno vacío
            if (!Array.isArray(field.options)) {
              field.options = [];
            }

            // Asegura que field.options esté vacío antes de cargar nuevas opciones
            field.options.length = 0;

            // Si la respuesta es un array plano
            if (Array.isArray(response)) {
              field.options.push(...response);
            } 
            // Si la respuesta es un objeto con una propiedad "data" que es un array
            else if (response && response.data && Array.isArray(response.data)) {
              response.data.forEach(item => {
                field.options.push({ value: item.id, label: item.nombre });
              });
            } 
            else {
              console.warn(`fetchOptions para "${field.name}" no devolvió un array válido`);
              field.options = [];  // Asigna un arreglo vacío si la respuesta no es válida
            }

          } catch (error) {
            console.error(`Error al cargar opciones para ${field.name}:`, error);
          }
        }
      }
    };

    // Llama a la función para cargar las opciones
    loadOptions();

    // Limpia los errores cada vez que se reinicia el formulario
    setErrors({});
  }, [initialData, open, fields]);

  // Manejador de cambio para los inputs del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Función de validación: verifica que los campos requeridos estén llenos
  const validate = () => {
    const newErrors = {};
    fields.forEach(field => {
      if (field.required && !formData[field.name]) {
        newErrors[field.name] = 'Este campo es obligatorio';
      }
    });
    setErrors(newErrors); // Se guardan errores y se retorna true/false según si hay errores
    return Object.keys(newErrors).length === 0;
  };

  // Función para enviar el formulario

  const handleSubmit = () => {
    if (!validate()) return;

    // Crear copia para no mutar directamente formData
    const dataToSend = { ...formData };

    fields.forEach(field => {
      if (field.type === 'autocomplete') {
        const val = dataToSend[field.name];
        // Si el valor es un objeto { value, label }, tomar solo el id (value)
        if (val && typeof val === 'object' && 'value' in val) {
          dataToSend[field.name] = val.value;
        }
      }
    });
    onSubmit(dataToSend);    // Ejecuta la función enviada como prop
    onClose();               // Cierra el Modal
  };  

  // Función que genera el componente de cada campo según el tipo
  const renderField = (field) => {
    const { name, label, type = 'text', options = [] } = field;
    // Propiedades comunes para todos los campos
    const commonProps = {
      fullWidth: true,
      margin: 'normal',
      name,
      label,
      value: formData[name] || '',
      onChange: handleChange,
      error: !!errors[name],
      helperText: errors[name],
    };

    // Campo Date field con DatePicker
    if (type === 'date') {
      return (
        <DatePicker
          key={name}
          label={label}
          value={formData[name] ? dayjs(formData[name]) : null}
          onChange={(date) => {
            const formatted = date ? date.format('YYYY-MM-DD') : '';
            setFormData(prev => ({ ...prev, [name]: formatted }));
          }}
          slotProps={{
            textField: {
              fullWidth: true,
              margin: 'normal',
              error: !!errors[name],
              helperText: errors[name],
            }
          }}
        />
      );
    }

    // Campo tipo textarea
    if (type === 'textarea') {
      return <TextField {...commonProps} multiline rows={4} key={name} />;
    }

    // Campo tipo select con opciones
    if (type === 'select') {
      return (
        <TextField {...commonProps} select key={name}>
          {options.map((opt) => (
            <MenuItem key={opt.value} value={opt.value}>
              {opt.label}
            </MenuItem>
          ))}
        </TextField>
      );
    }

    // Campo tipo autocomplete
    if (type === 'autocomplete') {
      return (
        <AutocompleteWithPagination
          key={name}
          fetchOptions={field.fetchOptions}
          onSelect={(selectedOption) => {
            setFormData(prev => ({ ...prev, [name]: selectedOption }));
          }}
          value={formData[name] || null}
        />
      );
    }
    // if (type === 'autocomplete') {
    //   // Si estamos en modo edición (cuando "persona" ya tiene un valor)
    //   if (formData[name]) {
    //     return (
    //       <TextField
    //         {...commonProps}
    //         key={name}
    //       />
    //     );
    //   } else {
    //     return (
    //       <AutocompleteWithPagination
    //         key={name}
    //         fetchOptions={field.fetchOptions}   // Pasa la función fetchOptions definida en fields
    //         onSelect={(selectedOption) => {
    //           setFormData(prev => ({ ...prev, [name]: selectedOption }));
    //         }}
    //         value={formData[name] || null}
    //       />
    //     );
    //   }
    // }

    return <TextField {...commonProps} type={type} inputProps={field.inputProps || {}}key={name} />;
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    maxWidth: 500,
    bgcolor: 'background.paper',
    borderRadius: 4,
    boxShadow: 24,
    p: 4,
    maxHeight: '90vh',
    overflowY: 'auto',
  };

  // Función para manejar el cierre del modal y restaurar el foco
  const handleModalClose = () => {
    onClose();
    // Restaurar el foco al botón que abrió el modal
    openButtonRef.current?.focus();
  };

  return (
    <Modal
      open={open}
      onClose={handleModalClose} // Usar handleModalClose para manejar el cierre
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{ backdrop: { timeout: 500 } }}
      // Agregar inert para el contenedor del modal para evitar interacción con elementos fuera
      ref={modalRef} 
      aria-hidden={open ? 'false' : 'true'} // Asegurarse de que el modal esté accesible cuando esté abierto
    >
      <Fade in={open}>
        <Box className="form-modal-box">
          <Box className="form-modal-header">
            <Typography variant="h5" className="form-modal-title">
              {initialData?.id ? 'Editar registro' : 'Crear Registro'}
            </Typography>
            <IconButton onClick={handleModalClose}>
              <CloseIcon />
            </IconButton>
          </Box>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <form noValidate>
              {fields.map(renderField)}
            </form>
          </LocalizationProvider>

          <Box className="form-modal-actions">
            <Button onClick={handleModalClose} variant="outlined" color="error">
              Cancelar
            </Button>
            <Button onClick={handleSubmit} variant="contained" color="primary">
              Guardar
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default FormModal;
