import React, { useState } from 'react';
import './CreateTopic.css';



function CreateTopic(props) {


    return (
        <div className="createtopic" style={{position:'absolute',top:130,left:800,maxWidth:"500px",display:props.display}}>

            <h1 className='subTitle'>Creer un sujet</h1>
            <p className='closeSub' onClick={() => {props.childToParent3(true)}}>X</p>
            <div className='div1'></div>
            <label className="primtxt">Galaxie :</label>

            <select className="primselect" name="primary">
                <option value="">----</option>
                <option value="informatique">informatique</option>
                <option value="ecologie">ecologie</option>
                <option value="politique">politique</option>
                <option value="gaming">gaming</option>
            </select>
            <div  className='div2'></div>
            <label className="sectxt" >Systeme solaire:</label>

            <select className="secselect" name="secondary" >
                <option value="">----</option>
                <option value="angular">Angular</option>
                <option value="javascript">javascript</option>
                <option value="threejs">Three.js</option>
                <option value="react">React</option>
            </select>
            <div  className='div3'></div>
            <label className='subtxt'>Planete :</label>
            <textarea className="subInput" placeholder='sujet' />
            <input className="subCreate" type="button" value="creer" onClick={() => {props.childToParent3(true)}}/>
        </div>
    );
}

export default CreateTopic;