const express = require('express')
const http = require('http')
const socketIO = require('socket.io');

const app = express();

const server = http.createServer(app);

const io = socketIO(server);

var messages = [];

io.on('connection', (socket) => {
    console.log(`New client connected with ID ${socket.id}`);

    socket.on('message', (data) => {
        console.log(`Received message from client with ID ${socket.id}: ${data}`);
        messages.push(data);
        io.emit('message', messages);
    });
    io.emit('message', messages);


});

const port = 3000;
server.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
});

