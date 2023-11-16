import React, { useState } from 'react';
import ReactDOM from 'react-dom/client'
import './smallnav.css'; 

const Smallnav = () => {
  const [activeItem, setActiveItem] = useState('bblogs');

  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  return (
    <>  
    <nav className="navbar n1" style={{position: 'fixed'}}>
      <ul className="nav-list n2">
        <li className={`nav-ite ${activeItem === 'bblogs' ? 'active' : ''}`} onClick={() => handleItemClick('bblogs')}>Blogs</li>
        <li className={`nav-ite ${activeItem === 'SStories' ? 'active' : ''}`} onClick={() => handleItemClick('SStories')}>Stories</li>
        <li className={`nav-ite ${activeItem === 'Abcon' ? 'active' : ''}`} onClick={() => handleItemClick('Abcon')}>About&Contact</li>
      </ul>
    </nav>
    <hr style={{marginTop:'0'}}></hr></>
  );
};

export default Smallnav;
