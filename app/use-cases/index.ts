import { gamesDb, playersDb } from './../data-access/index';
import { makeAddGame, makeFindGame, makeListOfGames, makeAddPlayerToGame, makePlayCard, makeHokm } from "./games.js";

const addGame = makeAddGame(gamesDb);
const findGame = makeFindGame(gamesDb);
const listOfGames = makeListOfGames(gamesDb);
const addPlayerToGame = makeAddPlayerToGame(gamesDb);
const playCard = makePlayCard(gamesDb);
const hokm = makeHokm(gamesDb)

export { addGame, findGame, listOfGames, addPlayerToGame, playCard, hokm }