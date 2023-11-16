import React from 'react';
import NavBar from '../components/Navbar';
import Footer from '../components/footer';
import ZapierEmbed from './embed';
import Loading from './loading'; 
import { useState, useEffect } from "react";

const ChatBot = () => {
    const [scriptLoaded, setScriptLoaded] = useState(false);

    useEffect(() => {   
        setTimeout(() => {
          setScriptLoaded(true);
        }, 3000);
      }, []);

    const containerStyle = {
        // display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '90vh', // This sets the height to 100% of the viewport height for vertical centering
    };

    return (
        <>
        <NavBar/>
        <div className="container marketing">
        <div style={containerStyle}>
          {scriptLoaded ? (
            <ZapierEmbed />
          ) : (
            <Loading />
          )}
        </div>
        </div>
        <Footer/>
        </>
    )
}

export default ChatBot;
