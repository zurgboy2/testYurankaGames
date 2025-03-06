import logo from './logo.svg';
import './App.css';
import {HashRouter, Routes,Route} from "react-router-dom";
import Home from './pages/Home';
import ReservationsPage from './pages/ReservationsPage';
import AboutUsPage from './pages/AboutUsPage';
import EventsPage from './pages/EventsPage';
import LoginAndSignupPage from './pages/Login&SignupPage';
import DashboardPage from './pages/DashboardPage';

function App() {
  return (
    <div >
         <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/store" element={<Store />} /> */}
        <Route path="/events" element={<EventsPage />} />
        <Route path="/reservations" element={<ReservationsPage />} />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/login&signup" element={<LoginAndSignupPage/>}/>
        <Route path="/dashboard" element={<DashboardPage/>}/>

      </Routes>
    </div>
  );
}

export default App;
