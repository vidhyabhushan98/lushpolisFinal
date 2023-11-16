import React from 'react'
import {useSelector} from "react-redux";
import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client'
import './Navbar.css'
import {logout} from "../../auth/auth";
import {toast} from "react-toastify";
import logo from '../../assets/images/logo.png'
import dp from '../../assets/images/useracc.png'
import si from '../../assets/images/searchicon.png'
import styles from "./syles.module.css";
import axios from "axios";
import {useNavigate} from 'react-router-dom';

const Navbar = () => {
  //const user = useSelector((state) => state.user);
  const user = JSON.parse(localStorage.getItem("user"));
  const [query, setSearch] = useState('');
  const profile = '/profile/'
  const navigate = useNavigate();

  const handleSearch = async(e) => {
    console.log("search", query)
    e.preventDefault();
    navigate('/search/'+query);
  }
  

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top" style={{ paddingLeft: '10px', paddingRight: '10px' }}>
      <a href="/" className="navbar-brand"><img src={logo} width="120px" height="40px" alt="Logo" /></a>
      <button className="navbar-toggler collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample09" aria-controls="navbarsExample09" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="navbar-collapse collapse" id="navbarsExample09">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <a className="nav-link" href="#"></a>
          </li>
          <li className="nav-item active">
            <a className="nav-link" href="/following">Following</a>
          </li>
          <li className="nav-item active">
            <a className="nav-link" href="/explore">Explore</a>
          </li>
          <li className="nav-item active">
            <a className="nav-link" href="/createPost">Write</a>
          </li>
          <li className="nav-item active">
            <a className="nav-link" href="/chat">Chat</a>
          </li>
          <li className="nav-item active">
            <a className="nav-link" href="/plants">Plants</a>
          </li>
          <li className="nav-item active">
            <a className="nav-link" href="/shop">Shop</a>
          </li>
          <li className="nav-item active">
            <a className="nav-link" href="/assistant">Assistant</a>
          </li>
          <li className="nav-item active">
            <a className="nav-link" href="/diaries">Diaries</a>
          </li>
          <li>
          <div className=" searchp p-1 bg-light rounded rounded-pill shadow-sm" style={{ width: '35rem'}} >
            <div className="input-group">
              <div className="input-group-prepend">
                <button id="button-addon2" type="submit" className="btn btn-link text-warning" onClick={handleSearch} >
                  <img src={si} style={{width: '1.2rem'}} >
                  </img>
                </button>
              </div>
              <input type="search" placeholder="What're you searching for?" aria-describedby="button-addon2" className="form-control border-0 bg-light"
                value={query} 
                onChange={(e) => setSearch(e.target.value)}/>
            </div>
          </div>
          </li>
        </ul>
                
        <button className={styles.white_btn} style={{color:"green"}} onClick={() => logout()}>
					Logout
				</button>
        
        <form className="form-inline my-2 my-md-0">
          <a href={profile + user?._id}>
          <img src={user.image.url?user.image.url:dp}  className="Navbar_logo__dYWXu" alt="User Account" />
          </a>
        </form>
        
      </div>
    </nav>
  );
};


export default Navbar;