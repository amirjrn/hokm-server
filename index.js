const express = require('express');
const app = express();
const ioServer = require('./app/socket/socket-io')(app);
const port = process.env.PORT || 3000;
//serve client with static files like index.html,img.png
app.use(express.static('public'));
// Games Object which holds name of all games already being played and data related to it.

//creates a server that listen to port 3000 
ioServer.listen(port, function () {
    console.log(`server listening on port ${port}`);
});



