const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: { origin: "*" }
});

const PORT = process.env.PORT || 8080;


app.get('/', (req, res) => {
    res.send('<h1>Socket.IO with Express</h1>');
});

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('message', (message) => {
        console.log(message);
        io.emit('message', `${socket.id.substr(0, 2)} said ${message}`);
    });

    socket.on('disconnect', () => {
        console.log('a user disconnected');
    });
});

server.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
