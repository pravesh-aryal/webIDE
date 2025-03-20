const http = require('http')
const express = require('express')

const {Server: SocketServer} = require('socket.io') 


const pty = require('node-pty')


const ptyProcess = pty.spawn('bash', [], {
    name: 'xterm-color',
    cols: 80,
    rows: 30,
    //start from this current directory
    cwd: process.env.INIT_CWD,
    env: process.env
  });

const app = express()
const server = http.createServer(app)
const io = new SocketServer({
    cors: '*'
})

io.attach(server)


//send the output data back to frontend
ptyProcess.onData(data => {
    io.emit('terminal:data', data)
})

//spinning up only one container per user 
io.on('connection', (socket) => {
    console.log('Socket is connected', socket.id)


    socket.on('terminal:write', (data)=>{
        ptyProcess.write(data)
    })
})


//listens to any events in the frontend d
server.listen(9000, () => console.log("DOCKER SERVER IS RUNNING ON PORT 9000"))


console.log(typeof http, typeof express)
console.log(typeof express)























