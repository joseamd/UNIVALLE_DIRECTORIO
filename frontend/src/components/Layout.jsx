import React, { useState, useEffect } from 'react';
import Sidebar from './sidebar/Sidebar';
import Navbar from './navbar/Navbar';
import { Outlet } from 'react-router-dom';
import '@/styles/layout.scss';

const Layout = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  // Cierra el menú al hacer clic fuera del sidebar
  const closeMenu = () => {
    if (menuOpen) setMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.sidebar') && !e.target.closest('.navbar')) {
        setMenuOpen(false); // Cerrar el menú si haces clic fuera del sidebar o navbar
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => document.removeEventListener('click', handleClickOutside);
  }, [menuOpen]);

  return (
    <div className="layout">
      <Sidebar menuOpen={menuOpen} />
      <div className="layoutContainer">
        <Navbar toggleMenu={() => setMenuOpen(!menuOpen)} closeMenu={closeMenu} />
        <div className="content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
