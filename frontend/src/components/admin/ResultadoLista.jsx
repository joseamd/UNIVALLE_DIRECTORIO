import '../../styles/BusquedaGlobal.scss';

const ResultadoLista = ({ title, data }) => {
    return (
      <div>
        <h3>{title}</h3>
        <ul>
          {data.map(item => (
            <li key={item.id}>
              {item.id} - {item.nombre} - {item.cargo || item.ubicacion}
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default ResultadoLista;
  