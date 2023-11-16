import React from 'react'
import { useState, useEffect } from 'react';
import './profilepage.css'
import Navbar from '../components/Navbar.jsx';
import Ucard from './userdetailscard.jsx';
import Smallnav from './smallnav.jsx';
import FollowingList from './followinglist.jsx';
import BlogsList from './blogsdisplay.jsx';
import PeopleList from './peoplelist.jsx';
import MACA from './storylist.jsx';
import {useParams}  from 'react-router-dom';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import axios from 'axios';
import baseUrl from '../../api/serverAPI';

const Containerr = ({user, setUser}) => {

  const [activeItem, setActiveItem] = useState('bblogs');
  const handleItemClick = (item) => {
    setActiveItem(item);
  };
  return (
    <div className="container marketing padno">
      <div className="row">
        <div className="col-md-8 leftsection">
        <nav className="navbar n1">
        <ul className="nav-list n2">
          <li className={`nav-ite ${activeItem === 'bblogs' ? 'active' : ''}`} onClick={() => handleItemClick('bblogs')}>Blogs</li>
          <li className={`nav-ite ${activeItem === 'SStories' ? 'active' : ''}`} onClick={() => handleItemClick('SStories')}>Diaries</li>
          <li className={`nav-ite ${activeItem === 'Ffollowingg' ? 'active' : ''}`} onClick={() => handleItemClick('Ffollowingg')}>Following</li>
        </ul>
        </nav>
        <hr style={{marginTop:'0'}}></hr>
        {activeItem === 'bblogs' ? <BlogsList user={user.user}/> : (activeItem === 'Ffollowingg' ? <PeopleList user={user.user}/> : <MACA user={user.user}/> )}
        </div>
          <div className="col-lg-4 sec2">
            {console.log("In user containerr",user.user)}
            <Ucard user={user.user} setUser={setUser} setActiveItem={setActiveItem}/>
            {/* <FollowingList /> */}
          </div>
        </div>
    </div>
  );
};

const ProfilePage = () => {

  const {id} = useParams();
  //const user = useSelector((state) => state.user);
  //const user = JSON.parse(localStorage.getItem("user"));

  const [user, setUser] = React.useState({});
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${baseUrl}/getUser/${id}`);
        setUser(res.data);
      }
      catch (err) {
        console.log(err);
      }
      finally {
        setIsLoading(false);
      }
    }
    fetchUser();
  }
  , [id]);

  
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width" />
        <meta name="viewport" content="width=device-width" />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/bodymovin/5.12.2/lottie.min.js" integrity="sha512-jEnuDt6jfecCjthQAJ+ed0MTVA++5ZKmlUcmDGBv2vUI/REn6FuIdixLNnQT+vKusE2hhTk2is3cFvv5wA+Sgg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous" />
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"></link>

        </head>
        <body>
          {isLoading ?  <>
         <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        {/* Loading Indicator */}
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
        </div>
        </> :
          <>
          <Navbar />
          {console.log("In user profile",user.user)}
          <Containerr user={user} setUser={setUser}/>
          </>
          }
        </body>
    </html>
  );
};

export default ProfilePage;

