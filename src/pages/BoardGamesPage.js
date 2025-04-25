import AboutUs from '../components/AboutUs';
import Hero from '../components/Hero';
import Navbar from '../components/Navbar';
import OurServices from '../components/OurServices';
import Footer from '../components/Footer';
import OrientationWarning from '../components/OrientationWarning'; 
import './Home.css';

import React, { useEffect } from 'react';
import BoardGamesSection from '../components/BoardGames';

function BoardGamesPage() {
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);

    return (
    <div className="Home">
      <OrientationWarning />
      <Navbar/>
      <BoardGamesSection/>
      <Footer/>
    </div>
  );
}

export default BoardGamesPage;
