import AboutUs from '../components/AboutUs';
import Hero from '../components/Hero';
import Navbar from '../components/Navbar';
import OurServices from '../components/OurServices';
import Footer from '../components/Footer';

import logo from '../logo.svg';
import './Home.css';
import ReservationForm from '../components/ReservationForm';
import AboutYuranka from '../components/AboutYuranka';
import EventsSection from '../components/Events';
import React, { useEffect } from 'react';
import EventsLandingPageSection from '../components/EventsLanding';
import BoardGamesSection from '../components/BoardGames';
import LoginAndSignup from '../components/Login&Signup';

function Home() {
   useEffect(() => {
          window.scrollTo(0, 0);
        }, []);
        
  return (
    <div className="Home">
      <Navbar/>
      <Hero />
      <AboutUs/>
      <OurServices/>
      <EventsLandingPageSection/>
      <Footer/>

      {/* <Navbar/>
      <ReservationForm/>
      <Footer/> */}

    {/* <Navbar/>
     <AboutYuranka/>
     <Footer/> */}
{/* 
     <EventsSection/> */}

     {/* <BoardGamesSection/> */}

      {/* <Navbar/>
     <LoginAndSignup/>
     <Footer/> */}
    </div>
  );
}

export default Home;
