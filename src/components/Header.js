import React, { useState } from "react";
import './Header.css';
import logo from '../logo.svg';




function Header(props) {



  const [idval, setId] = useState("");
  const [mdpval, setMdp] = useState("");

  const [display,setD] = useState("none");
  const [display2,setD2] = useState('visible');

  const Headline = (id,mdp) => {
    if(mdp==="root" && id === "root"){
      console.log("tamerelapute");
      setD("");
      setD2("hidden")
    }
  };
  
  return (
    <div className="header" style={{display : props.display}}>
      <img className='imglogo' src={logo} onClick={() => {props.childToParent5(true)}} />
      <h1 className='titre'>Universal Topic</h1>
      <input style={{visibility:display2}} className='id' type="text" placeholder="identifiant" value={idval} onChange={e => setId(e.target.value)} />
      <input style={{visibility:display2}} className="mdp" type="password" placeholder="mdp" value={mdpval} onChange={e => setMdp(e.target.value)} />
      <input style={{visibility:display2}} className="connect" type ="button" value="se connecter" onClick={() => { Headline(idval,mdpval)} }/>
      <p style={{display:display}} className="faked" >Bonjour root</p>
    </div>
  );
}

export default Header;
