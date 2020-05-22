import * as express from 'express'
import initServer from './app/socket-io'
import { config } from 'dotenv'
const app = express()
const ioServer = initServer(app)
config()
const port = process.env.PORT || 3000

//serve client with static files like index.html,img.png
app.use(express.static('build'))
//creates a server that listen to port 3000
ioServer.listen(port, function () {
  console.log(`server listening on port ${port}`)
})
