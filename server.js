const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const port = 3000; // Port for Node.js server

// WebSocket communication
io.on('connection', (socket) => {
    console.log('A client connected');

    socket.on('buttonPress', (button) => {
        console.log('Button pressed:', button);
        pythonSocket.emit('command', button);

    });

    socket.on('disconnect', () => {
        console.log('A client disconnected');
    });
});

server.listen(port, () => {
    console.log(`Node.js server is running on port ${port}`);
});
