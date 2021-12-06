import React from 'react';
import './Footer.css';



function Footer(props) {

  return (
    <div className="footer">
      <input className='btn1' type="button" value="Remonter" onClick={() => {props.childToParent(true)}}/>
      <h2 className='viz1'>{props.currentObj}</h2>
      <input className='btn2' type="button" value="Créer un sujet"/>
    </div>
  );
}

export default Footer;