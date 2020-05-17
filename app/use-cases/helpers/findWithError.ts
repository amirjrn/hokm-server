import IgameDb from '../../data-access/interfaces/IgameDb';
import IGame from '../../domain/game/interfaces/IGame'
export default async function findWithError(gameName: string, gamesDb: IgameDb): Promise<IGame> {
    const game = await gamesDb.findByName(gameName);
    if (game) {
        return game;
    }
    throw new Error("Game did not found");
}