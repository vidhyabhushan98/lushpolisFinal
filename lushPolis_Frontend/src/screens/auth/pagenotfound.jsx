import React from 'react';
import pagenotfound from '../../assets/images/pagenotfound.jpg';
import NavBar from '../components/Navbar';
import Footer from '../components/footer';

const PageNotFound = () => {

    return (
        <>
        <NavBar/>
        <div className="container marketing" > 
        <img src={pagenotfound} alt="Page Not Found" style={{width:"100%", height:"100%"}}/>
        </div>
        <Footer/>
        </>
    )
}

export default PageNotFound;
