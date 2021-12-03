import React from 'react';
import './Footer.css';



function Footer() {
  return (
    <div className="footer">
      <input className='btn1' type="button" value="Remonter" />
      <h2 className='viz1'>nom de la view</h2>
      <p className='viz2'>x : </p>
      <p className='viz3'>y : </p> 
      <p>testUHD</p>
      <input className='btn2' type="button" value="Créer un sujet"/>
    </div>
  );
}

export default Footer;