import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './Home.css';
import React, { useEffect } from 'react';
import OrientationWarning from '../components/OrientationWarning'; 
import StoreCom from '../components/Store';

function AboutUsPage() {
     useEffect(() => {
            window.scrollTo(0, 0);
          }, []);

  return (
      <div className="Home">
      <OrientationWarning />
      <Navbar/>
      <StoreCom/>
      <Footer/>

    </div>
  );
}

export default AboutUsPage;
