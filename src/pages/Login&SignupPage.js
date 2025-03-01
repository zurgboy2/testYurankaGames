import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import LoginAndSignup from '../components/Login&Signup';
import Footer from '../components/Footer';

function LoginAndSignupPage(){

      useEffect(() => {
            window.scrollTo(0, 0);
          }, []);

          return(
            <div className="Home">
                <Navbar/>
                <LoginAndSignup/>
                <Footer/>
            </div>
          )
}

export default LoginAndSignupPage;