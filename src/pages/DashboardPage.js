import React, { useEffect } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import UserDashboard from '../components/UserDashboard';

function DashboardPage() {
   useEffect(() => {
          window.scrollTo(0, 0);
        }, []);
        
  return (
    <div className="Home">
    
   <Navbar/>
   <UserDashboard/>
    <Footer/> 

    
    </div>
  );
}

export default DashboardPage;