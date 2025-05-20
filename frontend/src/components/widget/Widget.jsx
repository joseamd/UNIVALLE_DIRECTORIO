import React, { useEffect, useState } from 'react';
import '@/styles/widget.scss';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import BusinessIcon from '@mui/icons-material/Business';
import UpdateIcon from '@mui/icons-material/Update';
import InfoIcon from '@mui/icons-material/Info';
import API from '../../services/api'; // Asegúrate de que la ruta es correcta

const Widget = ({ type }) => {
  const [amount, setAmount] = useState(0);
  const diff = 15;
  let data = {};

  useEffect(() => {
    let endpoint = "";
  
    switch (type) {
      case "funcionarios":
        endpoint = "funcionarios/";
        break;
      case "dependencias":
        endpoint = "dependencias/";
        break;
      case "ultimos_registros":
        endpoint = "funcionarios/";
        break;
      case "otros":
        endpoint = "contratistas/";
        break;
      default:
        return;
    }
  
    API.get(endpoint)
      .then((res) => {
        console.log("Datos recibidos:", res.data); // 👈 Úsalo para debug
        const data = Array.isArray(res.data) ? res.data : res.data.results || [];
        setAmount(data.length);
      })
      .catch((err) => {
        console.error("Error al obtener datos del widget:", err);
        setAmount(0);
      });
  }, [type]);

  switch (type) {
    case 'funcionarios':
      data = {
        title: 'FUNCIONARIOS',
        isMoney: false,
        link: 'Ver funcionarios',
        icon: (
          <PersonOutlineIcon
            className="icon"
            style={{ color: 'teal', background: 'rgba(0, 128, 128, 0.2)' }}
          />
        ),
      };
      break;

    case 'dependencias':
      data = {
        title: 'DEPENDENCIAS',
        isMoney: false,
        link: 'Ver dependencias',
        icon: (
          <BusinessIcon
            className="icon"
            style={{
              color: 'darkorange',
              background: 'rgba(255, 140, 0, 0.2)',
            }}
          />
        ),
      };
      break;

    case 'ultimos_registros':
      data = {
        title: 'REGISTROS RECIENTES',
        isMoney: false,
        link: 'Ver recientes',
        icon: (
          <UpdateIcon
            className="icon"
            style={{ color: 'purple', background: 'rgba(128, 0, 128, 0.2)' }}
          />
        ),
      };
      break;

    case 'otros':
      data = {
        title: 'OTROS DATOS',
        isMoney: false,
        link: 'Ver todos',
        icon: (
          <InfoIcon
            className="icon"
            style={{ color: 'gray', background: 'rgba(128, 128, 128, 0.2)' }}
          />
        ),
      };
      break;

    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {data.isMoney ? `$${amount}` : amount}
        </span>
        <span className="link">{data.link}</span>
      </div>
      <div className="right">
        <div className="percentage positive">
          <KeyboardArrowUpIcon />
          {diff}%
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
