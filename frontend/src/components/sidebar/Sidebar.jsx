import { useContext } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import { Link } from "react-router-dom";
import logo from '@/assets/logo.jpg';
import '@/styles/Sidebar.scss'; 
import { menuConfig } from "@/config/menuConfig";

const Sidebar = ({ menuOpen }) => {
  const { dispatch } = useContext(DarkModeContext);

  return (
    <div className={`sidebar ${menuOpen ? 'active' : ''}`}>
      <div className="top">
        <img src={logo} alt="Logo" className="logo-img" />
      </div>
      <hr />
      <div className="center">
        <ul>
          {menuConfig.map((section, index) => (
            <div key={index}>
              <p className="title">{section.section}</p>
              {section.items.map((item, idx) => (
                <Link to={item.path} className="sidebar-link" key={idx}>
                  <li>
                    {item.icon}
                    <span>{item.name}</span>
                  </li>
                </Link>
              ))}
            </div>
          ))}
        </ul>
      </div>
      <div className="bottom">
        <div className='colorOption' onClick={() => dispatch({ type: "LIGHT" })}></div>
        <div className='colorOption' onClick={() => dispatch({ type: "DARK" })}></div>
      </div>
    </div>
  )
}

export default Sidebar;
