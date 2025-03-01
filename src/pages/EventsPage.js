import EventsSection from '../components/Events';
import React, { useEffect } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

function EventsPage() {
   useEffect(() => {
          window.scrollTo(0, 0);
        }, []);
        
  return (
    <div className="Home">
    
   <Navbar/>
   <EventsSection/>
    <Footer/> 

    
    </div>
  );
}

export default EventsPage;