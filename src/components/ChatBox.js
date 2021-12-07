import React from 'react';
import './ChatBox.css';
import Message from './Message';



function ChatBox(props) {


  return (
    <div className="chatbox" style={{position:'absolute',top:150,left:800,maxWidth:"500px",display:props.display}}>
      <div>
          <h1 className='title'>{props.title}</h1>
      </div>
      <div className='msgBox'>
      <Message message="Essayez ceci <img src='ulrdevotreimage'/> "/>
      <Message message="on peu aussi la charger en avance avec import votreNom from ulrdevotreimage" />
      <Message message="n'importe quoi ceci ne marche qu'avec react et non en javascript pure"/>
      <Message message="sinon directement depuis le css avec un background-image : ulr('urldetonimage') que ce soit local ou non le fichier sera chargé donc pas de probleme"/>
      <Message message="Toute personne qui lis ce message n'est vraiment pas trés trés beau et merite une photo de lui dans la galleries des moches :seum:"/>
      </div>
      <div className='sendBox'>
          <input className='chattext' type="text" />
          <input type="button" value="Send"/>
      </div>
    </div>
  );
}

export default ChatBox;