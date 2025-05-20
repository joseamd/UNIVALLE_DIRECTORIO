// components/formModal/AutocompleteWithPagination.jsx

import React, { useState } from 'react';
import { Autocomplete, TextField } from '@mui/material';

const AutocompleteWithPagination = ({ fetchOptions }) => {
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
      setPage(prevPage => prevPage + 1);  // Incrementa la página
      setLoading(true);
      try {
        const results = await fetchOptions({ searchTerm, page });
        setOptions((prevOptions) => [...prevOptions, ...results]);
      } catch (error) {
        console.error('Error al cargar más resultados:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Autocomplete
      freeSolo
      options={options}
      getOptionLabel={(option) => option.label}
      onInputChange={handleSearch}
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
