// src/components/Navbar.tsx
import React from 'react';
import { Link } from 'react-router-dom';

import '../Styles/myStyles.css';
import logo from '../assets/img/pokemon.png';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand mx-auto d-block d-sm-none" to="/">
          <img src={logo} alt="Logo" className="logo-mobile" />
        </Link>

        <Link className="navbar-brand d-none d-sm-block mx-auto" to="/">
          <img src={logo} alt="Logo" className="logo-desktop" />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
