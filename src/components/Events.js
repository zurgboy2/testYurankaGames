import { makeRegistrationRequestCall, makeRequestCall } from "../api/api";
import React, {useState, useEffect,useRef} from "react";
import './Events.css';
import moment from 'moment';
import noposter from "../assets/noposter.png";
import { useLocation,useNavigate  } from "react-router-dom";
import EventsCalendar from './EventsCalendar';

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

const handleEventClick = (tournament) => {
  setSelectedTournament(tournament);
  if (detailsRef.current) {
    detailsRef.current.scrollIntoView({ behavior: 'smooth' });
  }
};

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

<EventsCalendar 
            // tournaments={TEST_EVENTS} 
            tournaments={tournaments} 
            onEventClick={handleEventClick}
          />
  
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

 const TEST_EVENTS = [
  // March 1
  {
    id: 1,
    name: "Yu-Gi-Oh! Weekly Tournament",
    date: "2025-03-01T10:30:00.000Z",
    time: "18:00",
    price: 5,
    isOneTime: false
  },
  {
    id: 2,
    name: "Magic: The Gathering Commander Night",
    date: "2025-03-01T10:30:00.000Z",
    time: "19:00",
    price: 10,
    isOneTime: false
  },
  {
    id: 3,
    name: "Pokemon TCG Championship Qualifier",
    date: "2025-03-01T10:30:00.000Z",
    time: "14:00",
    price: 25,
    isOneTime: true
  },
  
  // March 2
  {
    id: 4,
    name: "Board Game Night",
    date: "2025-03-02T10:30:00.000Z",
    time: "17:00",
    price: 3,
    isOneTime: false
  },
  {
    id: 5,
    name: "Dungeons & Dragons Session",
    date: "2025-03-02T10:30:00.000Z",
    time: "19:00",
    price: 8,
    isOneTime: false
  },
  {
    id: 6,
    name: "Magic Standard Tournament",
    date: "2025-03-02T10:30:00.000Z",
    time: "15:00",
    price: 12,
    isOneTime: true
  },

  // March 3
  {
    id: 7,
    name: "Pokemon League Challenge",
    date: "2025-03-03T10:30:00.000Z",
    time: "13:00",
    price: 10,
    isOneTime: false
  },
  {
    id: 8,
    name: "Yu-Gi-Oh! Championship Series",
    date: "2025-03-03T10:30:00.000Z",
    time: "11:00",
    price: 30,
    isOneTime: true
  },
  {
    id: 9,
    name: "Magic Modern Tournament",
    date: "2025-03-03T10:30:00.000Z",
    time: "18:00",
    price: 15,
    isOneTime: false
  },

  // March 4
  {
    id: 10,
    name: "Weekly Magic Modern",
    date: "2025-03-04T10:30:00.000Z",
    time: "18:00",
    price: 8,
    isOneTime: false
  },
  {
    id: 11,
    name: "Flesh and Blood Tournament",
    date: "2025-03-04T10:30:00.000Z",
    time: "19:30",
    price: 12,
    isOneTime: true
  },
  {
    id: 12,
    name: "Pokemon Trading League",
    date: "2025-03-04T10:30:00.000Z",
    time: "16:00",
    price: 5,
    isOneTime: false
  },

  // March 5
  {
    id: 13,
    name: "Yu-Gi-Oh! Beginner Night",
    date: "2025-03-05T10:30:00.000Z",
    time: "18:00",
    price: 5,
    isOneTime: false
  },
  {
    id: 14,
    name: "Magic Pro Qualifier",
    date: "2025-03-05T10:30:00.000Z",
    time: "16:00",
    price: 35,
    isOneTime: true
  },
  {
    id: 15,
    name: "Board Game Tournament",
    date: "2025-03-05T10:30:00.000Z",
    time: "19:00",
    price: 8,
    isOneTime: true
  },

  // March 6
  {
    id: 16,
    name: "Pokemon VGC Tournament",
    date: "2025-03-06T10:30:00.000Z",
    time: "17:00",
    price: 15,
    isOneTime: true
  },
  {
    id: 17,
    name: "Magic Commander League",
    date: "2025-03-06T10:30:00.000Z",
    time: "19:00",
    price: 10,
    isOneTime: false
  },

  // March 7
  {
    id: 18,
    name: "Yu-Gi-Oh! Friday Night",
    date: "2025-03-07T10:30:00.000Z",
    time: "18:00",
    price: 8,
    isOneTime: false
  },
  {
    id: 19,
    name: "Magic Friday Night Magic",
    date: "2025-03-07T10:30:00.000Z",
    time: "19:00",
    price: 10,
    isOneTime: false
  },
  {
    id: 20,
    name: "Pokemon League Cup",
    date: "2025-03-07T10:30:00.000Z",
    time: "16:00",
    price: 20,
    isOneTime: true
  },

  // Continue for March 8-31...
  // March 8
  {
    id: 21,
    name: "Weekend Magic Draft",
    date: "2025-03-08T10:30:00.000Z",
    time: "14:00",
    price: 15,
    isOneTime: false
  },
  {
    id: 22,
    name: "Yu-Gi-Oh! Structure Deck Tournament",
    date: "2025-03-08T10:30:00.000Z",
    time: "16:00",
    price: 25,
    isOneTime: true
  },

  // March 9
  {
    id: 23,
    name: "Pokemon Sunday Challenge",
    date: "2025-03-09T10:30:00.000Z",
    time: "13:00",
    price: 12,
    isOneTime: false
  },
  {
    id: 24,
    name: "Magic Pioneer Tournament",
    date: "2025-03-09T10:30:00.000Z",
    time: "15:00",
    price: 18,
    isOneTime: true
  },

  // March 10
  {
    id: 25,
    name: "Yu-Gi-Oh! Modern Format",
    date: "2025-03-10T10:30:00.000Z",
    time: "18:00",
    price: 10,
    isOneTime: false
  },
  {
    id: 26,
    name: "Magic Pauper Night",
    date: "2025-03-10T10:30:00.000Z",
    time: "19:00",
    price: 8,
    isOneTime: false
  },
  {
    id: 27,
    name: "Magic: The Gathering Standard Showdown",
    date: "2025-03-11T10:30:00.000Z",
    time: "18:00",
    price: 15,
    isOneTime: false
  },
  {
    id: 28,
    name: "Pokemon Trading Card League",
    date: "2025-03-11T10:30:00.000Z",
    time: "16:00",
    price: 5,
    isOneTime: false
  },
  {
    id: 29,
    name: "Yu-Gi-Oh! Master Duel Tournament",
    date: "2025-03-11T10:30:00.000Z",
    time: "19:00",
    price: 20,
    isOneTime: true
  },

  // March 12
  {
    id: 30,
    name: "Flesh and Blood Blitz",
    date: "2025-03-12T10:30:00.000Z",
    time: "18:00",
    price: 10,
    isOneTime: false
  },
  {
    id: 31,
    name: "D&D Adventure League",
    date: "2025-03-12T10:30:00.000Z",
    time: "19:00",
    price: 5,
    isOneTime: false
  },
  {
    id: 32,
    name: "Magic Modern Championship Qualifier",
    date: "2025-03-12T10:30:00.000Z",
    time: "17:00",
    price: 30,
    isOneTime: true
  },

  // March 13
  {
    id: 33,
    name: "Pokemon VGC Practice",
    date: "2025-03-13T10:30:00.000Z",
    time: "17:00",
    price: 8,
    isOneTime: false
  },
  {
    id: 34,
    name: "Yu-Gi-Oh! Speed Duel Tournament",
    date: "2025-03-13T10:30:00.000Z",
    time: "18:30",
    price: 12,
    isOneTime: true
  },

  // March 14
  {
    id: 35,
    name: "Friday Night Magic",
    date: "2025-03-14T10:30:00.000Z",
    time: "19:00",
    price: 15,
    isOneTime: false
  },
  {
    id: 36,
    name: "Pokemon League Challenge",
    date: "2025-03-14T10:30:00.000Z",
    time: "17:00",
    price: 10,
    isOneTime: false
  },
  {
    id: 37,
    name: "Yu-Gi-Oh! Regional Qualifier",
    date: "2025-03-14T10:30:00.000Z",
    time: "15:00",
    price: 25,
    isOneTime: true
  },

  // March 15
  {
    id: 38,
    name: "Magic Commander Tournament",
    date: "2025-03-15T10:30:00.000Z",
    time: "14:00",
    price: 20,
    isOneTime: true
  },
  {
    id: 39,
    name: "Board Game Championship",
    date: "2025-03-15T10:30:00.000Z",
    time: "16:00",
    price: 15,
    isOneTime: true
  },
  {
    id: 40,
    name: "Pokemon Trading Card Workshop",
    date: "2025-03-15T10:30:00.000Z",
    time: "12:00",
    price: 5,
    isOneTime: false
  },

  // March 16
  {
    id: 41,
    name: "Yu-Gi-Oh! Sunday Showdown",
    date: "2025-03-16T10:30:00.000Z",
    time: "13:00",
    price: 10,
    isOneTime: false
  },
  {
    id: 42,
    name: "Magic Pioneer Challenge",
    date: "2025-03-16T10:30:00.000Z",
    time: "15:00",
    price: 18,
    isOneTime: true
  },
  {
    id: 43,
    name: "Flesh and Blood Sealed Event",
    date: "2025-03-16T10:30:00.000Z",
    time: "17:00",
    price: 25,
    isOneTime: true
  },

  // March 17
  {
    id: 44,
    name: "St. Patrick's Day Special Tournament",
    date: "2025-03-17T10:30:00.000Z",
    time: "18:00",
    price: 17,
    isOneTime: true
  },
  {
    id: 45,
    name: "Pokemon League Cup",
    date: "2025-03-17T10:30:00.000Z",
    time: "16:00",
    price: 15,
    isOneTime: false
  },

  // March 18
  {
    id: 46,
    name: "Magic Modern Night",
    date: "2025-03-18T10:30:00.000Z",
    time: "19:00",
    price: 12,
    isOneTime: false
  },
  {
    id: 47,
    name: "Yu-Gi-Oh! Casual Play",
    date: "2025-03-18T10:30:00.000Z",
    time: "17:00",
    price: 5,
    isOneTime: false
  },
  {
    id: 48,
    name: "Board Game Social",
    date: "2025-03-18T10:30:00.000Z",
    time: "18:00",
    price: 3,
    isOneTime: false
  },

  // March 19
  {
    id: 49,
    name: "Pokemon VGC Tournament",
    date: "2025-03-19T10:30:00.000Z",
    time: "17:00",
    price: 20,
    isOneTime: true
  },
  {
    id: 50,
    name: "Magic Draft Night",
    date: "2025-03-19T10:30:00.000Z",
    time: "18:30",
    price: 15,
    isOneTime: false
  },
  

  // March 19
  {
    id: 49,
    name: "Pokemon VGC Tournament",
    date: "2025-03-19T10:30:00.000Z",
    time: "17:00",
    price: 20,
    isOneTime: true
  },
  {
    id: 50,
    name: "Magic Draft Night",
    date: "2025-03-19T10:30:00.000Z",
    time: "18:30",
    price: 15,
    isOneTime: false
  }
  ,

  // March 19
  {
    id: 49,
    name: "Pokemon VGC Tournament",
    date: "2025-03-19T10:30:00.000Z",
    time: "17:00",
    price: 20,
    isOneTime: true
  },
  {
    id: 50,
    name: "Magic Draft Night",
    date: "2025-03-19T10:30:00.000Z",
    time: "18:30",
    price: 15,
    isOneTime: false
  },

  // March 19
  {
    id: 49,
    name: "Pokemon VGC Tournament",
    date: "2025-03-19T10:30:00.000Z",
    time: "17:00",
    price: 20,
    isOneTime: true
  },
  {
    id: 50,
    name: "Magic Draft Night",
    date: "2025-03-19T10:30:00.000Z",
    time: "18:30",
    price: 15,
    isOneTime: false
  },

  // March 20
  {
    id: 51,
    name: "Yu-Gi-Oh! Championship Series",
    date: "2025-03-20T10:30:00.000Z",
    time: "16:00",
    price: 30,
    isOneTime: true
  },
  {
    id: 52,
    name: "D&D Campaign Night",
    date: "2025-03-20T10:30:00.000Z",
    time: "19:00",
    price: 8,
    isOneTime: false
  },
  {
    id: 53,
    name: "Flesh and Blood Casual Play",
    date: "2025-03-20T10:30:00.000Z",
    time: "17:30",
    price: 5,
    isOneTime: false
  },

  // March 21
  {
    id: 54,
    name: "Magic Standard Tournament",
    date: "2025-03-21T10:30:00.000Z",
    time: "18:00",
    price: 15,
    isOneTime: false
  },
  {
    id: 55,
    name: "Pokemon Trading League",
    date: "2025-03-21T10:30:00.000Z",
    time: "16:00",
    price: 5,
    isOneTime: false
  },

  // March 22
  {
    id: 56,
    name: "Yu-Gi-Oh! Weekend Championship",
    date: "2025-03-22T10:30:00.000Z",
    time: "14:00",
    price: 25,
    isOneTime: true
  },
  {
    id: 57,
    name: "Magic Commander Social",
    date: "2025-03-22T10:30:00.000Z",
    time: "16:00",
    price: 10,
    isOneTime: false
  },
  {
    id: 58,
    name: "Board Game Tournament",
    date: "2025-03-22T10:30:00.000Z",
    time: "18:00",
    price: 12,
    isOneTime: true
  },

  // March 23
  {
    id: 59,
    name: "Pokemon Sunday Series",
    date: "2025-03-23T10:30:00.000Z",
    time: "13:00",
    price: 15,
    isOneTime: false
  },
  {
    id: 60,
    name: "Magic Modern Masters",
    date: "2025-03-23T10:30:00.000Z",
    time: "15:00",
    price: 30,
    isOneTime: true
  },

  // March 24
  {
    id: 61,
    name: "Yu-Gi-Oh! Beginner Tournament",
    date: "2025-03-24T10:30:00.000Z",
    time: "17:00",
    price: 8,
    isOneTime: false
  },
  {
    id: 62,
    name: "Magic Pauper Championship",
    date: "2025-03-24T10:30:00.000Z",
    time: "19:00",
    price: 12,
    isOneTime: true
  },
  {
    id: 63,
    name: "D&D One-Shot Adventure",
    date: "2025-03-24T10:30:00.000Z",
    time: "18:00",
    price: 10,
    isOneTime: true
  },

  // March 25
  {
    id: 64,
    name: "Pokemon League Challenge",
    date: "2025-03-25T10:30:00.000Z",
    time: "16:00",
    price: 10,
    isOneTime: false
  },
  {
    id: 65,
    name: "Magic Legacy Tournament",
    date: "2025-03-25T10:30:00.000Z",
    time: "18:00",
    price: 35,
    isOneTime: true
  },

  // March 26
  {
    id: 66,
    name: "Yu-Gi-Oh! Draft Tournament",
    date: "2025-03-26T10:30:00.000Z",
    time: "17:00",
    price: 20,
    isOneTime: true
  },
  {
    id: 67,
    name: "Board Game Night",
    date: "2025-03-26T10:30:00.000Z",
    time: "19:00",
    price: 5,
    isOneTime: false
  },

  // March 27
  {
    id: 68,
    name: "Magic Pro Tour Qualifier",
    date: "2025-03-27T10:30:00.000Z",
    time: "15:00",
    price: 40,
    isOneTime: true
  },
  {
    id: 69,
    name: "Pokemon Trading Card Social",
    date: "2025-03-27T10:30:00.000Z",
    time: "17:00",
    price: 5,
    isOneTime: false
  },
  {
    id: 70,
    name: "Flesh and Blood Pro Quest",
    date: "2025-03-27T10:30:00.000Z",
    time: "18:30",
    price: 30,
    isOneTime: true
  },

  // March 28
  {
    id: 71,
    name: "Yu-Gi-Oh! Friday Tournament",
    date: "2025-03-28T10:30:00.000Z",
    time: "18:00",
    price: 10,
    isOneTime: false
  },
  {
    id: 72,
    name: "Magic Friday Night Standard",
    date: "2025-03-28T10:30:00.000Z",
    time: "19:00",
    price: 15,
    isOneTime: false
  },

  // March 29
  {
    id: 73,
    name: "Pokemon Regional Championship",
    date: "2025-03-29T10:30:00.000Z",
    time: "10:00",
    price: 35,
    isOneTime: true
  },
  {
    id: 74,
    name: "Magic Sealed League",
    date: "2025-03-29T10:30:00.000Z",
    time: "14:00",
    price: 25,
    isOneTime: true
  },
  {
    id: 75,
    name: "Board Game Marathon",
    date: "2025-03-29T10:30:00.000Z",
    time: "16:00",
    price: 15,
    isOneTime: true
  },

  // March 30
  {
    id: 76,
    name: "Yu-Gi-Oh! Championship",
    date: "2025-03-30T10:30:00.000Z",
    time: "13:00",
    price: 20,
    isOneTime: true
  },
  {
    id: 77,
    name: "Magic Commander Challenge",
    date: "2025-03-30T10:30:00.000Z",
    time: "15:00",
    price: 15,
    isOneTime: false
  },

  // March 31
  {
    id: 78,
    name: "Pokemon End of Month Tournament D&D Special Campaign Finale",
    date: "2025-03-31T10:30:00.000Z",
    time: "17:00",
    price: 12,
    isOneTime: true
  },
  {
    id: 79,
    name: "Magic Modern Monday D&D Special Campaign Finale",
    date: "2025-03-31T10:30:00.000Z",
    time: "19:00",
    price: 10,
    isOneTime: false
  },
  {
    id: 80,
    name: "D&D Special Campaign Finale D&D Special Campaign Finale",
    date: "2025-03-31T10:30:00.000Z",
    time: "18:00",
    price: 15,
    isOneTime: true
  }
  ,
  {
    id: 81,
    name: "D&D Special Campaign Finale D&D Special Campaign Finale",
    date: "2025-03-31T10:30:00.000Z",
    time: "18:00",
    price: 15,
    isOneTime: true
  }
  ,
  {
    id: 75,
    name: "Board Game Marathon",
    date: "2025-03-29T10:30:00.000Z",
    time: "16:00",
    price: 15,
    isOneTime: true
  },

  // March 30
  {
    id: 76,
    name: "Yu-Gi-Oh! Championship",
    date: "2025-03-30T10:30:00.000Z",
    time: "13:00",
    price: 20,
    isOneTime: true
  },
  {
    id: 77,
    name: "Magic Commander Challenge",
    date: "2025-03-30T10:30:00.000Z",
    time: "15:00",
    price: 15,
    isOneTime: false
  },

  // March 31
  {
    id: 78,
    name: "Pokemon End of Month Tournament D&D Special Campaign Finale",
    date: "2025-03-31T10:30:00.000Z",
    time: "17:00",
    price: 12,
    isOneTime: true
  },
  {
    id: 79,
    name: "Magic Modern Monday D&D Special Campaign Finale",
    date: "2025-03-31T10:30:00.000Z",
    time: "19:00",
    price: 10,
    isOneTime: false
  },
  {
    id: 80,
    name: "D&D Special Campaign Finale D&D Special Campaign Finale",
    date: "2025-03-31T10:30:00.000Z",
    time: "18:00",
    price: 15,
    isOneTime: true
  }
  ,
  {
    id: 81,
    name: "D&D Special Campaign Finale D&D Special Campaign Finale",
    date: "2025-03-31T10:30:00.000Z",
    time: "18:00",
    price: 15,
    isOneTime: true
  }

  // Continue this pattern for the rest of March...
];