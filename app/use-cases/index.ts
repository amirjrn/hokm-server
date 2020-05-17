import { gamesDb , playersDb } from './../data-access/index';
import { makeAddGame, makeFindGame, makeListOfGames, makeAddPlayerToGame, makePlayCard, makeHokm } from "./games.js";
import {makeAddPlayer , makeRemovePlayer , makeDisconnectPlayer , makeReconnectPlayer } from './palyers'
// games use cases 
const addGame = makeAddGame(gamesDb);
const findGame = makeFindGame(gamesDb);
const listOfGames = makeListOfGames(gamesDb);
const addPlayerToGame = makeAddPlayerToGame(gamesDb);
const sendHokm = makeHokm(gamesDb);
const playCard = makePlayCard(gamesDb);

// players use cases

const addPlayer = makeAddPlayer(playersDb)

export { addGame, findGame, listOfGames, addPlayerToGame, sendHokm, playCard }