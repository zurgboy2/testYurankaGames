import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './Home.css';
import React, { useEffect } from 'react';
import OrientationWarning from '../components/OrientationWarning'; 
import ProductDetail from '../components/ProductDetail';

function ProductPage() {
     useEffect(() => {
            window.scrollTo(0, 0);
          }, []);

  return (
      <div className="Home">
      <OrientationWarning />
      <Navbar/>
      <ProductDetail/>
      <Footer/>
    </div>
  );
}

export default ProductPage;
