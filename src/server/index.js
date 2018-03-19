const express = require('express');
const http = require('http');
const websocket = require('socket.io');
const phantomjs = require('phantomjs-prebuilt');
const path = require('path');
const fs = require('fs');
const process = require('process');

const app = express();
const server = http.Server(app);
const io = websocket(server);

// Write a pid file
const pidPath = path.join(__dirname, '../app.pid');
fs.writeFileSync(pidPath, process.pid);

// Configure middleware
const staticPath = path.join(__dirname, '../client/public');
app.use(express.static(staticPath));

// Initialize the physics simulation
const program = phantomjs.exec('physics.js');
program.stdout.pipe(process.stdout);
program.stderr.pipe(process.stderr);

// Handle socket events
io.on('connection', (socket) => {
    socket.on('moveSlime', (direction) => {
        io.emit('moveSlime', direction);
    });
    socket.on('physics', (physics) => {
        io.emit('physics', physics);
    });
});

// Start the server
server.listen(3000);

// Exit the application
process.on('SIGINT', () => {
    server.close();
    program.kill();
    fs.unlinkSync(pidPath);
    process.exit();
});
