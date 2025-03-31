import React, { useState, useEffect } from 'react';
import { makeRegistrationRequestCall } from '../api/api'; // Adjust the import based on your structure
import './BoardGames.css';
import noposter from "../assets/noposter.png";
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const BoardGamesSection = () => {
    const [games, setGames] = useState([]);
    const [visibleGames, setVisibleGames] = useState(10); // Initially 10 games for desktop (5x2) & 12 for mobile (2x6)
    const [allVisible, setAllVisible] = useState(false);
    const [loading, setLoading] = useState(true); // 🔹 Loading state
    const [searchQuery, setSearchQuery] = useState("");
    const [forSaleGames, setForSaleGames] = useState([]);
    const [forRentGames, setForRentGames] = useState([]);
    const [visibleForSale, setVisibleForSale] = useState(window.innerWidth > 768 ? 10 : 4);
    const [visibleForRent, setVisibleForRent] = useState(window.innerWidth > 768 ? 10 : 4);

    const navigate = useNavigate();
 
    const handleReserveGame = () => {
       navigate('/reservations'); // Navigate to the reservations page
   };

    useEffect(() => {
        fetchBoardGames();
    }, []);

    const fetchBoardGames = async () => {
        try {
            const response = await makeRegistrationRequestCall('games_script', 'getBoardGames');
             const allGames = response.games;

            const saleGames = allGames.filter(game => game.sellable === true);
            const rentGames = allGames.filter(game => !game.sellable);
            
            setGames(allGames);
            setForSaleGames(saleGames);
            setForRentGames(rentGames);
            console.log(response.games);
        } catch (error) {
            console.error("Error fetching board games:", error);
        } finally {
            setLoading(false); // 🔹 Hide loading popup once data is fetched
        }
    };

    const loadMoreForSale = () => setVisibleForSale(prev => prev + 10);
    const loadMoreForRent = () => setVisibleForRent(prev => prev + 10);


    const viewAll = () => {
        setVisibleForSale(forSaleGames.length);
        setVisibleForRent(forRentGames.length);
        setAllVisible(true);
    };

    const filteredGames = games.filter(game => 
        game.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const filteredForSale = forSaleGames.filter(game => 
        game.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const filteredForRent = forRentGames.filter(game => 
        game.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return (
        <div className="container">
            <h1 className='board-games-title' >Board Games</h1>
            <div className="flex">
                <button onClick={viewAll}>View All Board Games</button>
                <button onClick={handleReserveGame}>Reserve a Table</button>
            </div>
            <div className="boardsearch-bar-container">
            <input 
            type="text" 
            placeholder="Search for a game..." 
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-bar"
            />
            <FaSearch className="search-icon" />
            </div>
            {loading && (
                <div className="loading-screen">
                    <div className="loading-container">
                        <div className="spinner"></div>
                        <p>Loading Board Games...</p>
                    </div>
                </div>
            )}

              {!loading && (
            <>

            {/* For Sale Section */}
            <section className="for-sale-section">
                        <h2 className='boardgames-subtitle'>For Sale</h2>
                        <div className="grid">
                            {filteredForSale.slice(0, visibleForSale).map((game, index) => (
                                <div key={index} className="card">
                                    <img src={game.imageUrl === "No Image" ? noposter : game.imageUrl} alt="Game poster" />
                                    <h2>{game.name}</h2>
                                    <p>{game.description}</p>
                                    <p><strong>Price:</strong> ${game.price}</p>
                                    <p><strong>Players:</strong> {game.playerCount}</p>
                                    <p><strong>Expansion:</strong> {game.expansion}</p>
                                    <p><strong>Language:</strong> {game.language}</p>
                                    <p><strong>Time:</strong> {game.time}</p>
                                </div>
                            ))}
                        </div>
                        {visibleForSale < filteredForSale.length && (
                            <div className="text-center">
                                <button onClick={loadMoreForSale}>View More</button>
                            </div>
                        )}
                    </section>

                    {/* For Rent Section */}
                    <section className="for-rent-section">
                        <h2 className='boardgames-subtitle'>For Rent</h2>
                        <h3 className='forrent-subtitle'>Browse our wide collection of Board Games and reserve a table to play!</h3>
                        <div className="grid">
                        {filteredForRent.slice(0, visibleForRent).map((game, index) => (
                            <div key={index} className="card">
                                <img src={game.imageUrl === "No Image" ? noposter : game.imageUrl} alt="Game poster" />
                                <h2>{game.name}</h2>
                                <p>{game.description}</p>
                                <p><strong>Players:</strong> {game.playerCount}</p>
                                <p><strong>Expansion:</strong> {game.expansion}</p>
                                <p><strong>Language:</strong> {game.language}</p>
                                <p><strong>Time:</strong> {game.time}</p>
                            </div>
                        ))}
                    </div>
                    {visibleForRent < filteredForRent.length && (
                        <div className="text-center">
                            <button onClick={() => setVisibleForRent(filteredForRent.length)}>View More</button>
                        </div>
                    )}
                    </section>
            </>
            
              )
              }
         
        </div>
    );
};

export default BoardGamesSection;
