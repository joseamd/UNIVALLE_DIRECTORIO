// components/formModal/AutocompleteWithPagination.jsx

import React, { useState, useEffect } from 'react';
import { Autocomplete, TextField } from '@mui/material';

const AutocompleteWithPagination = ({ fetchOptions, onSelect, value }) => {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = async (event, value) => {
    setSearchTerm(value);  // Guarda el término de búsqueda
    if (value.length >= 3) {  // Realiza la búsqueda solo si tiene 3 o más caracteres
      setLoading(true);
      try {
        const results = await fetchOptions({ searchTerm: value, page: 1 });
        setOptions(results);
        setPage(1);
      } catch (error) {
        console.error('Error al cargar los resultados:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleLoadMore = async (e) => {
    const bottom = e.target.scrollHeight === e.target.scrollTop + e.target.clientHeight;
    if (bottom && !loading && searchTerm.length >= 3) {
      const nextPage = page + 1;
      setPage(nextPage);
      setLoading(true);
      try {
        const results = await fetchOptions({ searchTerm, page: nextPage });
        setOptions((prevOptions) => [...prevOptions, ...results]);
      } catch (error) {
        console.error('Error al cargar más resultados:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleChange = (event, value) => {
    // value es el objeto seleccionado { value: id, label: nombre }
    if (value && onSelect) {
      onSelect(value); // nviamos el objeto completo: { value, label }
    }
  };

  return (
    <Autocomplete
      freeSolo
      options={options}
      value={value} 
      getOptionLabel={(option) => {
        if (typeof option === 'string') return option;
        if (option && typeof option === 'object') return option.label || '';
        return '';
      }}
      onInputChange={handleSearch}
      onChange={handleChange}  // <-- captura selección
      loading={loading}
      onScroll={handleLoadMore}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Buscar Persona"
          variant="outlined"
          fullWidth
        />
      )}
    />
  );
};

export default AutocompleteWithPagination;
