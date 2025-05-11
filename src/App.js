import logo from './logo.svg';
import './App.css';
import {HashRouter, Routes, Route} from "react-router-dom";
import Home from './pages/Home';
import ReservationsPage from './pages/ReservationsPage';
import AboutUsPage from './pages/AboutUsPage';
import EventsPage from './pages/EventsPage';
import LoginAndSignupPage from './pages/Login&SignupPage';
import DashboardPage from './pages/DashboardPage';
import VideoGamesPage from './pages/VideoGamesPage';
import BoardGamesPage from './pages/BoardGamesPage';
import MiniConsPage from './pages/MiniConsPage';
import StarWarsPage from './pages/StarWarsPage';
import StorePage from './pages/StorePage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import { CartProvider } from './context/CartContext';

function App() {
  return (
    // Wrap your entire app with the CartProvider
    <CartProvider>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/minicons" element={<MiniConsPage/>}/>
          <Route path="/reservations" element={<ReservationsPage />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/store" element={<StorePage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/product" element={<ProductPage />} />
          <Route path="/login&signup" element={<LoginAndSignupPage/>}/>
          <Route path="/dashboard" element={<DashboardPage/>}/>
          <Route path="/videogames" element={<VideoGamesPage/>}/>
          <Route path="/boardgames" element={<BoardGamesPage/>}/>
          <Route path="/starwars" element={<StarWarsPage/>}/>
        </Routes>
      </div>
    </CartProvider>
  );
}

export default App;