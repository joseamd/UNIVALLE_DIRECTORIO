import { useContext, useState, useRef  } from "react";
import '@/styles/navbar.scss'; 
import SearchIcon from '@mui/icons-material/Search';
import { DarkModeContext } from "../../context/darkModeContext";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import Avatar from '@/assets/avatar.png';
import { useNavigate } from 'react-router-dom';
import { useSearch } from '../../context/searchContext';

const Navbar = ({ toggleMenu, closeMenu }) => {
  const inputRef = useRef(null); // para controlar el input
  const { dispatch } = useContext(DarkModeContext);  
  const [input, setInput] = useState('');
  const navigate = useNavigate();
  const { setSearchTerm } = useSearch();

  // Validación de la query para evitar caracteres no válidos
  const validarQuery = (texto) => {
    const regex = /^[a-zA-Z0-9áéíóúüÁÉÍÓÚÜÑñ\s.,@-]*$/;
    return regex.test(texto);
  };  

  const buscar = () => {
    const trimmed = input.trim();

    if (!trimmed) {
      setSearchTerm(""); // Limpia resultados anteriores
      navigate("/busqueda");
      setError("El campo de búsqueda está vacío.");
      return;
    }

    setSearchTerm(trimmed);
    navigate("/busqueda");
  };

  return (
    <div className='navbar' onClick={closeMenu}> {/* Cierra el menú al hacer clic en el navbar */}
      <button className="hamburger-btn" onClick={toggleMenu}>☰</button>
      <div className="wrapper">
        <div className="search">
        <input
            type="text"
            ref={inputRef}
            placeholder="Buscar..."
            value={input}
            onChange={(e) => {
              const texto = e.target.value;
              if (validarQuery(texto)) {
                setInput(texto);
                setError(null);
              } else {
                alert("La búsqueda contiene caracteres no válidos.");
              }
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                buscar();
              }
            }}
            className="input-busqueda"
          />
          <SearchIcon onClick={buscar} style={{ cursor: 'pointer' }} />        
        </div>
        <div className="items">
          {/* Botones de íconos */}
          <div className="item" onClick={() => dispatch({ type: "TOGGLE" })}>
            <DarkModeIcon className="icon" />
          </div>
          <div className="item">
            <FullscreenExitIcon className="icon" />
          </div>
          <div className="item">
            <NotificationsNoneIcon className="icon" />
            <div className="counter">1</div>
          </div>
          <div className="item">
            <ChatBubbleOutlineIcon className="icon" />
            <div className="counter">2</div>
          </div>
          <div className="item">
            <FormatListBulletedIcon className="icon" />
          </div>
          <div className="item">
            <img src={Avatar} alt="Logo" className="avatar" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar