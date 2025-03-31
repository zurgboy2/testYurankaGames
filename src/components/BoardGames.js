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
            setGames(response.games);
        } catch (error) {
            console.error("Error fetching board games:", error);
        } finally {
            setLoading(false); // 🔹 Hide loading popup once data is fetched
        }
    };

    const loadMore = () => {
        if (window.innerWidth > 768) {
            setVisibleGames(prev => prev + 10); // Load 2 more rows (5x2)
        } else {
            setVisibleGames(prev => prev + 12); // Load 6 more rows (2x6)
        }
    };

    const viewAll = () => {
        setVisibleGames(games.length);
        setAllVisible(true);
    };

    const filteredGames = games.filter(game => 
        game.name.toLowerCase().includes(searchQuery.toLowerCase())
    );


    return (
        <div className="container">
            <h1 className='board-games-title ' >Board Games</h1>
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
            <div className="grid">
            {filteredGames.slice(0, visibleGames).map((game, index) => (
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
                    {!allVisible && visibleGames < filteredGames.length && (
                        <div className="text-center">
                            <button onClick={loadMore}>View More</button>
                        </div>
                    )}
            </>
              )}
         
        </div>
    );
};

export default BoardGamesSection;
