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
        switch(button) {
            case 'forward':
                // Code to move the robot forward
                break;
            case 'backward':
                // Code to move the robot backward
                break;
            case 'left':
                // Code to turn the robot left
                break;
            case 'right':
                // Code to turn the robot right
                break;
            // Add more cases for additional buttons as needed
            default:
                // Stop motors
        }    });

    socket.on('disconnect', () => {
        console.log('A client disconnected');
    });
});

server.listen(port, () => {
    console.log(`Node.js server is running on port ${port}`);
});
