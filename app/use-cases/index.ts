import { gamesDb, playersDb } from './../data-access/index';
import { makeAddGame, makeFindGame, makeListOfGames, makeRebuildGame, makeAddPlayerToGame, makePlayCard, makeHokm } from "./games.js";

const addGame = makeAddGame(gamesDb);
const findGame = makeFindGame(gamesDb);
const listOfGames = makeListOfGames(gamesDb);
const rebuildGame = makeRebuildGame(gamesDb);
const addPlayerToGame = makeAddPlayerToGame(gamesDb);
const playCard = makePlayCard(gamesDb);
const hokm = makeHokm(gamesDb)

export { addGame, findGame, listOfGames, rebuildGame, addPlayerToGame, playCard, hokm }