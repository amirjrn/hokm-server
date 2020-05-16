import { gamesDb } from './../data-access/index';
import { makeAddGame, makeFindGame, makeListOfGames, makeAddPlayerToGame, makePlayCard, makeHokm } from "./games.js";

const addGame = makeAddGame(gamesDb);
const findGame = makeFindGame(gamesDb);
const listOfGames = makeListOfGames(gamesDb);
const addPlayerToGame = makeAddPlayerToGame(gamesDb);
const sendHokm = makeHokm(gamesDb);
const playCard = makePlayCard(gamesDb);


export { addGame, findGame, listOfGames, addPlayerToGame, sendHokm, playCard }