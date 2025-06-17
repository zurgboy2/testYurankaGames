import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './Home.css';
import React, { useEffect } from 'react';
import OrientationWarning from '../components/OrientationWarning'; 
import Cart from '../components/store/Cart';

function AboutUsPage() {
     useEffect(() => {
            window.scrollTo(0, 0);
          }, []);

  return (
      <div className="Home">
      <OrientationWarning />
      <Navbar/>
      <Cart/>
      <Footer/>

    </div>
  );
}

export default AboutUsPage;
