import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MiniCons from '../components/MiniCons';

function MiniConsPage(){

      useEffect(() => {
            window.scrollTo(0, 0);
          }, []);

          return(
            <div className="Home">
                <Navbar/>
                <MiniCons/>
                <Footer/>
            </div>
          )
}

export default MiniConsPage;