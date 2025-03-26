import AboutUs from '../components/AboutUs';
import Hero from '../components/Hero';
import Navbar from '../components/Navbar';
import OurServices from '../components/OurServices';
import Footer from '../components/Footer';

import './Home.css';

import React, { useEffect } from 'react';
import VideoGamesSection from '../components/VideoGames';
import BoardGamesSection from '../components/BoardGames';

function BoardGamesPage() {
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);

    return (
    <div className="Home">
      <Navbar/>
      <BoardGamesSection/>
      <Footer/>
    </div>
  );
}

export default BoardGamesPage;
