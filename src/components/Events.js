import { makeRegistrationRequestCall, makeRequestCall } from "../api/api";
import React, {useState, useEffect,useRef} from "react";
import './Events.css';
import moment from 'moment';
import noposter from "../assets/noposter.png";
import { useLocation,useNavigate  } from "react-router-dom";

//   makeRequestCall('tournament_script','getActiveTournaments').then(tournamentData => {
//     const tournaments = JSON.parse(tournamentData.result);
//     console.log(tournaments);
// })
// .catch(error => {
//     console.error("Error loading tournaments:", error);
//     alert("Error loading tournaments for next month. Please try again.");
// });

const  EventsSection= ()=>{

  const [tournaments, setTournaments] = useState([]);
  const [selectedTournament, setSelectedTournament] = useState(null);
  const detailsRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  

useEffect(() => {
  makeRequestCall('tournament_script', 'getActiveTournaments')
    .then((tournamentData) => {
      const tournamentsArray = JSON.parse(tournamentData.result);
      setTournaments(tournamentsArray);
      console.log(tournamentsArray);
      setLoading(false);

    })
    .catch((error) => {
      console.error("Error loading tournaments:", error);
      alert("Error loading tournaments for next month. Please try again.");
      setLoading(false);

    });
}, []);

useEffect(() => {
  if (selectedTournament && detailsRef.current) {
    // Allow a slight delay to ensure the details section has rendered with proper height
    setTimeout(() => {
      detailsRef.current.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }
}, [selectedTournament]);

const location = useLocation();

useEffect(() => {
  console.log("got here 1");
  if (location.state?.tournament) {
    console.log("got here 2");

    setSelectedTournament(location.state.tournament);
    // Scroll into view after state update
    console.log("tournament set");

    setTimeout(() => {
      if (detailsRef.current) {
        detailsRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
    navigate(location.pathname, { replace: true });
  }
}, [location.state, navigate]);

useEffect(() => {
  if((location.state?.tournament)){
    window.scrollTo(0, 0); // Scrolls to the top on component mount
  }
}, [tournaments,location.state]);

return (
  <div className ="events-container"> 
    <h1 className="events-title">Upcoming Tournaments & Events</h1>

{loading? (  <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading events & tournaments...</p>
        </div>)
        :(
          <div className="tournament-cards-container">
    {tournaments.map((tournament, index) => (
      <div key={index} className="tournament-card">
        {/* <div className="card-image">
          <img src={tournament.posterUrl} alt={tournament.name} />
        </div> */}
        {/* <div className="card-image">
          {tournament.id >46 &&(
          <img src={"https://ik.imagekit.io/mcgszbooe/Blue_Eyes_White_Destiny_Structure_Deck_Pre-release_tournament_q07R__tum"} alt={tournament.name} />

          )}
        </div> */}
        {/* <div className="card-image">
          {tournament.id <47 &&(
          <img src={tournament.posterUrl} alt={tournament.name} />

          )}
        </div> */}
        
        <div className="card-image">
          <img src={tournament.posterUrl} alt={noposter} />
          </div>

        <h3 className="card-title">{tournament.name}</h3>
        <div className="card-details">
        <div className="detail-item">
        <span className="label">Date:</span> 
        <span className="detail-value">{tournament.date 
        ? moment(tournament.date).format("MMMM Do dddd")
        : "To be informed"}</span>
        </div>
        <div className="detail-item">
         <span className="label">Time:</span> 
         <span className="detail-value">{tournament.time || "To be informed"}</span>
         </div>
        <div className="detail-item">
        <span className="label">Entrance fee:</span> 
        <span className="detail-value">{tournament.price || "To be informed"} EUR</span>
        </div>
          <div className="detail-item">
            <span className="label"></span> <span className="detail-readerinfo">
              {tournament.readerInfo|| ""} </span>
          </div>
          {/* <div className="detail-item">
            <span className="detail-readerinfo">
            Get behind the wheel in Aetherdrift, a multiversal 
            race filled with adrenaline-fueled Magic gameplay across three planes.
            </span>
            </div> */}
             <div className="detail-item">
            <span className="detail-readerinfo">
            🏆 Prizes:
          🎲 1 Random Attendee(who didn't get any extra prizing): 1x Aetherdrift Booster Pack
          🎟 Per Win Bonus: 1x Booster Pack of Aetherdrift for every match you win!

            </span>
            </div>
             {/* <div className="detail-item">
            <span className="detail-readerinfo">
            📜 Rules:
            🔄 Format: Best of Three
            ⏱ Time Limit: 50 minutes per match
            ⏱ End of match time procedures: 5 turns, starting from 0.
            🃏 Deck Size: 40 cards
            📘 Deckbuilding Guide: A leaflet in your Pre-release Bundle will provide instructions to help you build your deck.

            </span>
            </div> */}
             <div className="detail-item">
            <span className="detail-readerinfo">
            🎒 Pre-Release Bundle Includes:
            📦 6 Aetherdrift Booster Packs
            ✨ 1 Aetherdrift Promo Pack (at least Rare)
            🎲 D20 Die (1 of 5 colors!)
            📄 Deckbuilding Leafl
            </span>
            </div>
        </div>
        <button className="register-button" onClick={()=>{setSelectedTournament(tournament);
          //  if (detailsRef.current) {
          //   detailsRef.current.scrollIntoView({ behavior: 'smooth' });
          // }
         }}>Register</button>
      </div>
    )
    )
    }
  </div>
        )
        }

  
  <div ref={detailsRef}>
  <TournamentDetailsSection tournament={selectedTournament} />

  </div>

  </div>
  
);
}


const TournamentDetailsSection = ({ tournament }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [result, setResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false); 

  useEffect(() => {
    const storedName = sessionStorage.getItem("name") || "";
    setName(storedName);
  }, []);

  useEffect(() => {
    const storedEmail = sessionStorage.getItem("email") || "";
    setEmail(storedEmail);
  }, []);

  async function handleRegistration(e) {
    e.preventDefault();

  if (!name.trim() || !email.trim()) {
    alert("Please fill in all required fields.");
    return;
  }
    setIsLoading(true);
    // const selectedTournamentId = document.getElementById("registrationForm").dataset.selectedTournament;
    // if (!selectedTournamentId) {
    //   alert("Please select a tournament from the calendar first.");
    //   return;
    // }
    const username = sessionStorage.getItem('username') || '';
    const googleToken = sessionStorage.getItem("googleToken") || "";

    // Show loading overlay
    // const loadingOverlay = document.getElementById("loadingOverlay");
    // loadingOverlay.style.display = "flex";

    try {
      const result = await makeRegistrationRequestCall('tournament_script','registerForEvent', {
        eventId: tournament.id,
        name: name,
        email: email,
        username: username, // Using name as the username (adjust if needed)
        googleToken: googleToken,
      });

      //loadingOverlay.style.display = "none";

      // const checkoutUrl = result.checkoutUrl;
      // const organizerMessage = result.message;

      // const confirmationMessage = checkoutUrl
      //   ? "Your registration is confirmed. Please proceed to checkout. If you cannot pay via PayPal, you can pay at the store. Please note that your place is only confirmed once payment is received."
      //   : "Your registration is confirmed and no payment is required. Enjoy the event!";

      // const checkoutButton = checkoutUrl
      //   ? `<a href="${checkoutUrl}" class="btn btn-primary" style="margin-bottom: 20px; display: block;" target="_blank">Proceed to Checkout</a>`
      //   : "";

      //showConfirmationPopup(confirmationMessage, organizerMessage, checkoutButton);
      console.log(result);

      setResult(result);
      setErrorMessage(""); // Clear any previous error
      setShowPopup(true);

    } catch (error) {
      // console.error("Error processing registration:", error);
      // //loadingOverlay.style.display = "none";
      // alert("An error occurred while processing your registration. Please try again later.");
      console.error("Error processing registration:", error);
      setResult(null);
      setErrorMessage("An error occurred while processing your registration. Please try again later.");
      setShowPopup(true);
    }
    finally{
      setIsLoading(false); 
    }
  }
  
  if (!tournament) {
    return (
      <div className="tournament-details-section">
        <p>Select an event to register.</p>
      </div>
    );
  }
  return (
    <div className="tournament-details-section">
      <p>Register Now!</p>
      <div className="details-top">
        {/* Left Column: Image Box */}
        <div className="image-box">
          <img src={tournament.posterUrl} alt={noposter} className="tournament-image" />
        </div>
        {/* Right Column: Tournament Details */}
        <div className="details-column">
          <div className="detail-row">
            <span className="detail-label">Event:</span>
            <span className="detail-val">{tournament.name}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Date:</span>
           <span className="detail-val">{tournament.date 
        ? moment(tournament.date).format("MMMM Do dddd")
        : "To be informed"}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Time:</span>
            <span className="detail-val">{tournament.time||"To be informed. Stay tuned!"}</span>
          </div>
          {/* <div className="detail-row">
            <span className="detail-label">Entrance Fee:</span>
            <span className="detail-val">€{tournament.price||"To be informed. Stay tuned!"}</span>
          </div> */}
          <div className="detail-row">
            <span className="detail-label-bundle">Pre-Release Bundle Includes:</span>
            <span className="detail-value-bundle">Aetherdrift Booster Packs ✨ 1 Aetherdrift Promo Pack (at least Rare) 🎲 D20 Die (1 of 5 colors!) 📄 Deckbuilding Leafl</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Prizes:</span>
            <span className="detail-value-prizes">🎲 1 Random Attendee(who didn't get any extra prizing): 1x Aetherdrift Booster Pack 🎟 Per Win Bonus: 1x Booster Pack of Aetherdrift for every match you win!</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Rules:</span>
            <span className="detail-value-rules">
            📜 Rules:
            🔄 Format: Best of Three
            ⏱ Time Limit: 50 minutes per match
            ⏱ End of match time procedures: 5 turns, starting from 0.
            🃏 Deck Size: 40 cards
            📘 Deckbuilding Guide: A leaflet in your Pre-release Bundle will provide instructions to help you build your deck.
            </span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Entrance Fee:</span>
            <span className="detail-val">{tournament.price||"To be informed. Stay tuned!"} EUR</span>
          </div>

        </div>
      </div>
      {/* Registration Form: Name and Email */}
      <form className="registration-form" id="registrationForm"  onSubmit={handleRegistration}>
        <div className="form-group">
          <label htmlFor="participant-name">Name</label>
          <input type="text" id="participant-name" placeholder="Enter your name" value={name}
          onChange={(e) => setName(e.target.value)}required/>
        </div>
        <div className="form-group">
          <label htmlFor="participant-email">Email</label>
          <input type="email" id="participant-email" placeholder="Enter your email" value={email}
          onChange={(e) => setEmail(e.target.value)} required/>
        </div>
      </form>
      {/* Disclaimer */}
      <div className="disclaimer-section">
        <div className="disclaimer-heading" ><h3 >Disclaimer</h3>
        </div>
        </div>    
          <div  className="disclaimer-text">
          Your personal information is collected solely for the purpose of tournament
          organization and communication. All data will be securely stored and deleted
          within 30 days after the tournament's conclusion.
          </div>
          <div  className="disclaimer-text">
          For your convenience, secure online payment options are available. 
          Follow the provided checkout link to pay by card, or choose to pay in person at our store by cash.
          </div>
          <div className="disclaimer-text">
          Ticket Purchase Policy: Tickets are non-refundable. If you cannot attend the registered tournament, 
          your ticket will be valid for the next event in the series. Should you miss all events, collect your boosters the following business day at our store. 
          </div>
 
      <button className="proceed-button" onClick={handleRegistration} >Register</button>
      {isLoading && <p className="loading-message">Checking availability...</p>} 

      {showPopup && <ConfirmationPopup result={result} errorMessage={errorMessage} onClose={() => setShowPopup(false)} />}

    </div>
  );
};


const ConfirmationPopup = ({ result, errorMessage, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>

        {errorMessage ? (
          <p className="error-message">{errorMessage}</p>
        ) : (
          <>
            <p className="modal-message">
              {result?.checkoutUrl
                ? "Your registration is confirmed. Please proceed to checkout. If you cannot pay via PayPal, you can pay at the store. Please note that your place is only confirmed once payment is received."
                : "Your registration is confirmed and no payment is required. Enjoy the event!"}
            </p>
            {result?.checkoutUrl && (
              <a href={result.checkoutUrl} target="_blank" rel="noopener noreferrer" className="checkout-btn">
                Proceed to Checkout
              </a>
            )}
          </>
        )}
      </div>
    </div>
  );
};

 export default EventsSection; 