function checkFull(players_connected) {
    if (players_connected === 4) {
        return true;
    }
    return false;
}
export { checkFull };