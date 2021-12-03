import React from 'react';
import './Header.css';
import logo from '../logo.svg';


function Header() {
  return (
    <div className="header">
      <img className='logo' src={logo} />
      <h1 className='titre'>Universal Topic</h1>
      <input className='id' type="text" value="identifiant"/>
      <input className="mdp" type="text" value="mdp" />
      <input className="connect" type ="button" value="se connecter" />
    </div>
  );
}

export default Header;
