export const formatDate = (date) => {
  const options = {
    weekday: 'long', day: '2-digit', month: 'long', year: 'numeric',
    hour: '2-digit', minute: '2-digit', second: '2-digit'
  };
  const formatted = date.toLocaleDateString('es-ES', options).replace(',', '');
  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
};