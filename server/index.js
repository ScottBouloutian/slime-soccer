const express = require('express');
const http = require('http');
const socket = require('socket.io');
const phantomjs = require('phantomjs-prebuilt');
const path = require('path');

const app = express();
const server = http.Server(app);
const io = socket(server);

// Configure middleware
const staticPath = path.join(__dirname, '../client/public');
app.use(express.static(staticPath));

// Initialize the physics simulation
const program = phantomjs.exec('physics.js');
program.stdout.pipe(process.stdout);
program.stderr.pipe(process.stderr);
program.on('exit', code => {
    console.log('done');
});

// Handle socket events
io.on('connection', socket => {
    console.log('user connected');
    socket.on('moveSlime', direction => {
        io.emit('moveSlime', direction);
    });
    socket.on('physics', physics => {
        io.emit('physics', physics);
    });
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

// Start the server
server.listen(3000, () => {
    console.log('listening on port 3000');
});
