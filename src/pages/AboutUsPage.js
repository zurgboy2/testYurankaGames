import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import './Home.css';
import AboutYuranka from '../components/AboutYuranka';
import React, { useEffect } from 'react';

function AboutUsPage() {
     useEffect(() => {
            window.scrollTo(0, 0);
          }, []);

  return (
    <div className="Home">
  
    <Navbar/>
     <AboutYuranka/>
     <Footer/>

  
    </div>
  );
}

export default AboutUsPage;
