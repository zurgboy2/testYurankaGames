import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { FaBars, FaTimes } from "react-icons/fa";
import logo from "../assets/logo.png"; // Make sure to replace this with your actual logo path
import { Link,useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//         // Prevent closing when clicking on the menu button itself
//         if (event.target.closest(".menu-icon")) {
//             return;
//         }

//         if (menuOpen && !event.target.closest(".nav-links")) {
//             setMenuOpen(false);
//         }
//     };

//     document.addEventListener("click", handleClickOutside);
//     return () => document.removeEventListener("click", handleClickOutside);
// }, [menuOpen]);

useEffect(() => {
  const handleClickOutside = (event) => {
    if (
      menuOpen &&
      !event.target.closest(".nav-links") && 
      !event.target.closest(".menu-icon")
    ) {
      setMenuOpen(false);
    }
  };

  // Add event listener
  document.addEventListener("click", handleClickOutside);

  // Cleanup event listener on unmount
  return () => document.removeEventListener("click", handleClickOutside);
}, [menuOpen]);

  // Add event listener

  return (
    <nav className="navbar" >

          {/* Hamburger Menu (Mobile) */}
          <div className="menu-icon" onClick={(e) => 
            {e.stopPropagation(); 
            setMenuOpen(!menuOpen)}}>
                     <FaBars />
        {/* {menuOpen ? <FaTimes /> : <FaBars />} */}
      </div>


      {/* Logo on the left side */}
      <div className="logo-container">
        <img src={logo} alt="YurankaGames Logo" className="logo" />
      </div>

      {/* Navigation Links inside an oval */}
      <ul className={menuOpen ? "nav-links active" : "nav-links" } >
      <li><Link to="/" >Home</Link></li>
      <li><a href="https://store.yuranka.com">Store</a></li>
      <li><Link to="/events" >Events</Link></li>
      <li><Link to="/reservations" >Reservations</Link></li>
        <li><a href="#boardgames">Board Games</a></li>
        <li><a href="#videogames">Video Games</a></li>
        <li><Link to="/about">About Us</Link></li>

        {/* Auth Buttons for Mobile */}
      <li className="mobile-auth">
        <button className="signin" onClick={() => navigate("/login&signup", { state: { isLogin: true } })}>Login</button>
      </li>
      <li className="mobile-auth">
        <button className="signup" onClick={() => navigate("/login&signup", { state: { isLogin: false } })}>Sign Up</button>
      </li>
      </ul>

      {/* Auth Buttons */}
      <div className="auth-buttons">
        <button className="signin" onClick={() => navigate("/login&signup", { state: { isLogin: true } })}>Login</button>
        <button className="signup" onClick={() => navigate("/login&signup", { state: { isLogin: false } })}>Sign Up</button>
      </div>

 
    </nav>
  );
};

export default Navbar;
