import React, {useState} from 'react';
import './SearchBar.css';




function SearchBar(props) {

    const [search, setSearch] = useState("");

    return (
        <div className="searchbar" style={{ position: 'absolute', top: 150, left: 50, maxWidth: "500px" }}>
            <div className='form'>
                <input className='intup' type="search" required  value={search} onChange={e => setSearch(e.target.value)}/>
                <i className="fa" onClick={() => {props.childToParent4(search);setSearch("")}}></i>
            </div>
        </div>
    );
}

export default SearchBar;