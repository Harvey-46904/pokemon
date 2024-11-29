import React from 'react';
import { Link } from 'react-router-dom';

import '../Styles/MyStyles.css';
import logo from '../assets/img/pokemon.png';  // Ruta de la imagen

const Navbar: React.FC = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        {/* Logo centrado en móvil y en desktop grande en el centro */}
        <Link className="navbar-brand mx-auto d-block d-sm-none" to="/">
          <img src={logo} alt="Logo" className="logo-mobile" />
        </Link>
        
        {/* Logo centrado y grande en escritorio */}
        <Link className="navbar-brand d-none d-sm-block mx-auto" to="/">
          <img src={logo} alt="Logo" className="logo-desktop" />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
