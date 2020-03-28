function turn(hakemIndex, turn) {
    if (turn === undefined) {
        return hakemIndex;
    }
    if (hakemIndex + turn < 4) {
        return hakemIndex + turn
    }
    if (hakemIndex + turn > 3) {
        return (hakemIndex + turn - 4)
    }


}
module.exports = turn;