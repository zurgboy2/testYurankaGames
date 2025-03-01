import { makeRequestCall } from "../api/api";
let allGames = [];

const BoardGamesSection =()=>{

    makeRequestCall('games_script','getBoardGames')
    .then((data)=>{
        //const boardGamesArray = JSON.parse(boardGamesData);
        //console.log(boardGamesArray);
        //console.log(boardGamesData);
        if (Array.isArray(data) && data.length > 0) {
            allGames = data;
            // displayBoardGames(data);
            console.log(data);
        }
        //console.log(data);


    })
    .catch((error)=>{
        console.error("Error loading boardgames", error);
        alert("Error loading board games");
    })

    sessionStorage.setItem()

}

export default BoardGamesSection;