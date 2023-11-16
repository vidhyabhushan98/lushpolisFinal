import React, { useState } from 'react';
import ReactDOM from 'react-dom/client'
import './navbarsearch.css'; 

const Smallnavsearch = () => {
  const [activeItem, setActiveItem] = useState('bblogs');

  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  return (
    <>  
    <nav className="navbar n1" style={{position: 'fixed'}}>
      <ul className="nav-list n2">
        <li className={`nav-ite ${activeItem === 'bblogs' ? 'active' : ''}`} onClick={() => handleItemClick('bblogs')}>Blogs</li>
        <li className={`nav-ite ${activeItem === 'Uusers' ? 'active' : ''}`} onClick={() => handleItemClick('Abcon')}>Users</li>
      </ul>
    </nav>
    <hr style={{marginTop:'0'}}></hr></>
  );
};

export default Smallnavsearch;
