export default async function findWithError(gameName: string, gamesDb) {
    const game = await gamesDb.findByName(gameName);
    if (game) {
        return game;
    }
    throw new Error("Game did not found");
}