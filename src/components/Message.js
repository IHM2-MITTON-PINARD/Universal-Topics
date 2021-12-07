import React, {useState} from 'react';
import './Message.css';
import Pouce from '../pouce-en-lair.png';



function Message(props) {

    const [countUp, setCountUp] = useState(Math.floor(Math.random() * (9)));
    const [countDown, setCountDown] = useState(Math.floor(Math.random() * (9)));

    return (
        <div className="message">
            <input className='up' type="button" value="&#8593;" onClick={() => setCountUp(countUp + 1)} />
            <p className='vizUp'>{countUp}</p>
            <img className='pouce1' src={Pouce} /> 
            <input className='down' type="button" value="&#8595;" onClick={() => setCountDown(countDown + 1)} />
            <p className='vizDown'>{countDown}</p>
            <img className='pouce2' src={Pouce} /> 
            <div className='separateBar'></div>
            <p className='msg'>{props.message}</p>

        </div>
    );
}

export default Message;