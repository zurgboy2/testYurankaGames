import React from "react";
import { FaCalendarAlt, FaClock } from "react-icons/fa";
import "./ReservationForm.css"; // Import external CSS for styling
import bigTables from "../assets/bigTables.jpg";
import smallTables from "../assets/smallTables.jpg";
import couchSpaces from "../assets/couchSpaces.jpg";
import {  makeRegistrationRequestCall,makeRequestCall } from "../api/api";
import { useState, useEffect, useRef } from "react";


const ReservationForm = () => {

  const [selectedDate, setSelectedDate] = useState("");
  const [error, setError] = useState("");
  const [timeSlots, setTimeSlots] = useState([]);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [spaces, setSpaces] = useState([]);
  const [bigTablesSelected, setBigTablesSelected] = useState(0); // Selected big tables
  const [smallTablesSelected, setSmallTablesSelected] = useState(0); // Selected small tables
  const [couchSpacesSelected, setCouchSpacesSelected] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState('');
  const [checkoutUrl, setCheckoutUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false); // State for loading
  const reservationOptionsRef = useRef(null);


    useEffect(() => {
      const storedName = sessionStorage.getItem("name") || "";
      setName(storedName);
    }, []);
  
    useEffect(() => {
      const storedEmail = sessionStorage.getItem("email") || "";
      setEmail(storedEmail);
    }, []);

  const handleDateChange = async (e) => {
    setTimeSlots("");
    const date = e.target.value;
    setSelectedDate(date);

    const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format

    if (date < today) {
      setError("Please select a future date.");
      return;
    }

    setError(""); // Clear error if date is valid

    setIsLoading(true);
    try {
      const slots = await makeRegistrationRequestCall('registration_script',"getTimeSlots", { date });
      console.log("Available slots:", slots); // Handle slots (e.g., update state)
      setTimeSlots(slots);
      setStartTime(""); // Reset selected start time
      setEndTime("");
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching time slots:", error);
      setIsLoading(false);

    }
  };

  const handleStartTimeChange = (slot) => {
    setStartTime(slot);
    setEndTime(""); // Reset end time selection when start time changes
  };

  const handleEndTimeChange = async (slot) => {
    setEndTime(slot);
    setIsLoading(true);

    try {
      const capacities = await makeRegistrationRequestCall('registration_script',"checkUnavailability", { 
       date: selectedDate, 
       startTime: startTime, 
        endTime: slot 
      });

      console.log("Capacity Data:", capacities);
      setSpaces(capacities);
      setIsLoading(false);

      console.log(spaces["Big Tables"].count);

    } catch (error) {
      console.error("Error checking unavailability:", error);
    }
  };

  const handleBigTableChange = (e) => {
    const value = Math.max(0, Math.min(e.target.value, spaces["Big Tables"].count));
    setBigTablesSelected(value);
  };
  
  const handleSmallTableChange = (e) => {
    const value = Math.max(0, Math.min(e.target.value, spaces["Small Tables"].count));
    setSmallTablesSelected(value);
  };
  
  const handleCouchSpaceChange = (e) => {
    const value = Math.max(0, Math.min(e.target.value, spaces["Couch Spaces"].count));
    setCouchSpacesSelected(value);
  };

  const handleReservationSubmit = async () => {
    var username = sessionStorage.getItem('username');
    var googleToken = sessionStorage.getItem('googleToken');

    var availabilityData = [];
    availabilityData.push({type: "Big Tables",chosenAmount: parseInt(bigTablesSelected)},
    {type: "Small Tables",chosenAmount: parseInt(smallTablesSelected)},
    {type: "Couch Spaces",chosenAmount: parseInt(couchSpacesSelected)});

    const reservationDetails = {
      date: selectedDate,
      startTime,
      endTime,
      name,
      email,
      username,
      googleToken,
      availability: availabilityData,
    };
  
    console.log(reservationDetails);
  
    setIsLoading(true);
    try {
      const response = await makeRegistrationRequestCall("registration_script","submitReservationDetails", { reservationDetails });
      setIsLoading(false);

      if (response.checkoutUrl) {
       // const message = `Dear ${name},<br>Your reservation for ${selectedDate} from ${startTime} to ${endTime} has been successfully submitted! Please click the link below for payment.`;
        //showPopup(message, response.checkoutUrl);
        //console.log(message);
        const dynamicMessage = `Dear ${name},\nYour reservation for ${selectedDate} from ${startTime} to ${endTime} has been successfully submitted! Please click the link below for payment.`;
      setMessage(dynamicMessage);
      setCheckoutUrl(response.checkoutUrl);
      setShowPopup(true);
      } else {
        //showPopup(response.message || "It seems there was an error. Did you happen to choose any options?");
        const errorMessage = response.message || "It seems there was an error. Did you select any options?";
        setMessage(errorMessage);
        setCheckoutUrl('');
        setShowPopup(true);
      }
    } catch (error) {
      console.error("Error submitting reservation:", error);
      //showPopup("There was a problem submitting your reservation. Please try again. Make sure to reserve tables or couch spaces.");
      console.log(error);
      setMessage("There was a problem submitting your reservation. Please try again. Make sure to reserve tables or couch spaces.");
      setCheckoutUrl('');
      setShowPopup(true);

    } finally {
     // document.querySelector(".submit-button").disabled = false; // Re-enable the button
     // hideLoading();
    }
  };

  useEffect(() => {
    if (spaces  && window.innerWidth >= 768) {
      // Scroll to the reservation options section once spaces are set
      reservationOptionsRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [spaces]); 

  return (
    <div className="reservations-container">
      {/* Title */}
      <h1 className="reservations-title">Reservations Form</h1>

      <div className="reservations-content">
        {/* Left Side - Reservation Form */}
        <div className="reservation-form">
          {/* Select Date */}
          <div className="form-group">
            <label>Select Date</label>
            <div className="input-container">
              <input type="date" value={selectedDate} onChange={handleDateChange}/>
            </div>
            {error && <p className="error-message">{error}</p>}

          </div>

{timeSlots.length > 0 && (
          <>

          {/* Start Time */}
          <div className="form-group">
            <label>Select Start Time</label>
            <div className="time-grid">
            {timeSlots.map((slot) => (
              <button
                key={slot}
                className={`reservationform-time-slot ${startTime === slot ? "selected" : ""}`}
                onClick={() => handleStartTimeChange(slot)}
              >
                {slot}
              </button>
            ))}
          </div>
          </div>

          {/* End Time */}
          <div className="form-group">
            <label>Select End Time</label>
            <div className="time-grid">
            {timeSlots
              .filter((slot) => startTime && slot > startTime) // Only show slots after start time
              .map((slot) => (
                <button
                  key={slot}
                  className={`reservationform-time-slot ${endTime === slot ? "selected" : ""}`}
                  onClick={() => handleEndTimeChange(slot)}
                >
                  {slot}
                </button>
              ))}
          </div>
          </div>

          </>
)}
        </div>

        {/* Right Side - Disclaimer Section */}
        <div className="disclaimer-section">
          <h2 className="disclaimer-title">Disclaimer</h2>
          <p>
            You can book any combination of items below. The people limit is
            more of a counter for ourselves, as we might be able to provide a
            discount if you have more than 10 people coming. Though, only
            registering the number of people, and not any spaces, implies that
            you require no seating at the venue and are happy to stand.
          </p>
          <p>
            The reservation fee is charged on the basis of you being able to
            reserve. The amount paid will be deducted from your final bill for
            the total use of the items reserved. Additionally, if you do not
            show up, the reservation fee will not be refunded.
          </p>
          <p>
            You are also allowed to show up at the venue without having
            reserved, but you will not be guaranteed a spot if your requested
            spot is already occupied.
          </p>
        </div>

      </div>

    <div class="reservation-options" ref={reservationOptionsRef}>
        <div class="reservation-card">
            <img src= {bigTables} alt="Big Table"/>
            <h3>Big Tables</h3>
            <p>Space for 6 people to comfortably play any board game, or just hang out. TCGs related activities would be playable, but for 4 people.</p>
            {spaces && Object.keys(spaces).length > 0 && (
  <>
            <label>Available amount: <span class="available-count">{spaces["Big Tables"]?.count}</span></label>
            <label class="labelquantitypicker">Choose amount: <input type="number" class="quantity-picker" min="0" max={spaces["Big Tables"]?.count} value={bigTablesSelected}   onChange={handleBigTableChange} /></label>
            </>
)}
        </div>

        <div class="reservation-card">
            <img src= {smallTables} alt="Big Table"/>
            <h3>Small Tables</h3>
            <p>Space for 4 people to comfortably play any board game, or to just hang out. TCGs related activities would be playable, but for 2 people.</p>
            {spaces && Object.keys(spaces).length > 0 && (
  <>
            <label>Available amount: <span class="available-count">{spaces["Small Tables"]?.count}</span></label>
            <label class="labelquantitypicker">Choose amount: <input type="number" class="quantity-picker" min="0" max={spaces["Small Tables"]?.count}   value={smallTablesSelected} 
    onChange={handleSmallTableChange} /></label>
 </>
)}
        </div>

        <div class="reservation-card">
            <img src={couchSpaces} alt="Big Table"/>
            <h3>Couch Spaces</h3>
            <p>Comfortable seating for 6 people. Often accompanied by various video games.</p>
            {spaces && Object.keys(spaces).length > 0 && (
  <>
            <label>Available amount: <span class="available-count">{spaces["Couch Spaces"]?.count}</span></label>
            <label class="labelquantitypicker">Choose amount: <input type="number" class="quantity-picker" min="0" max={spaces["Couch Spaces"]?.count}   value={couchSpacesSelected} 
    onChange={handleCouchSpaceChange} /></label>
              </>
)}
        </div>
    </div>

    <div class="reservation-form2">
        <div class="input-group">
            <label for="name">Name</label>
            <input type="text" id="name" placeholder="Enter name"  value={name}  onChange={(e) => setName(e.target.value)}/>
        </div>
        <div class="input-group">
            <label for="email">Email</label>
            <input type="email" id="email" placeholder="Enter email" value={email}
          onChange={(e) => setEmail(e.target.value)}/>
        </div>
    </div>
 
    <button class="submit-button" onClick={handleReservationSubmit}>Submit Reservation</button>

{showPopup && <ConfirmationPopup message={message} checkoutUrl={checkoutUrl} onClose={() => setShowPopup(false)} />}
<LoadingModal isLoading={isLoading} />
    </div>
    
  );
};

const ConfirmationPopup = ({ message, checkoutUrl, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>

        {/* Render message as JSX instead of using dangerouslySetInnerHTML */}
        <p className="modal-message">
          {message}
        </p>

        {checkoutUrl && (
          <button 
            className="checkout-btn" 
            onClick={() => window.open(checkoutUrl, "_blank")}
          >
            Proceed to Checkout
          </button>
        )}
        
      </div>
    </div>
  );
};

const LoadingModal = ({ isLoading }) => {
  return (
    isLoading && (
      <div className="modal-overlay">
        <div className="modal-content">
          <p className="loading-message">Loading...</p>
        </div>
      </div>
    )
  );
};

export default ReservationForm;
