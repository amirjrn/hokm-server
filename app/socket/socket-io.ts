const ioEvents = require('./io-events');

var init = function (app) {

    var server = require('http').Server(app);
    var io = require('socket.io')(server);
    // Define all Events
    ioEvents(io);
    // The server object will be then used to list to a port number
    return server;
}
module.exports = init;
export { }