const http = require('http')
const express = require('express')

const {Server: SocketServer} = require('socket.io') 

const app = express()
const server = http.createServer(app)
const io = new SocketServer({
    cors: '*'
})

io.attach(server)


//spinning up only one container per user 
io.on('connection', (socket) => {
    console.log('Socket is connected', socket.id)
})


//listens to any events in the frontend d
server.listen(9000, () => console.log("DOCKER SERVER IS RUNNING ON PORT 9000"))


console.log(typeof http, typeof express)
console.log(typeof express)























