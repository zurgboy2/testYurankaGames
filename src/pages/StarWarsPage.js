import React from 'react';
import PersonalityTest from '../components/PersonalityTest';
import './StarWarsPage.css';
import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './Home.css';
import OrientationWarning from '../components/OrientationWarning'; 

const StarWarsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="starwars-page">
      <OrientationWarning />
      <Navbar/>
      <div className="starwars-header">
        <h1>Star Wars Universe</h1>
        <p>Explore the galaxy far, far away...</p>
      </div>
      
      <div className="starwars-content">
        <div className="feature-section">
          <PersonalityTest />
        </div>
        
        {/* Future content sections can be added here */}
        {/* For example:
        <div className="additional-section">
          <h2>Star Wars Timeline</h2>
          <p>Coming soon...</p>
        </div>
        
        <div className="additional-section">
          <h2>Character Database</h2>
          <p>Coming soon...</p>
        </div>
        */}
      </div>
      <Footer/>
    </div>
  );
};

export default StarWarsPage;