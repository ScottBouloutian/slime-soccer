const express = require('express');
const http = require('http');
const websocket = require('socket.io');
const path = require('path');
const fs = require('fs');
const process = require('process');
const puppeteer = require('puppeteer');

const app = express();
const server = http.Server(app);
const io = websocket(server);

// Write a pid file
const pidPath = path.join(__dirname, '../app.pid');
fs.writeFileSync(pidPath, process.pid);

// Configure middleware
const staticPath = path.join(__dirname, '../client/dist');
app.use(express.static(staticPath));

// Initialize the physics simulation
(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setUserAgent('Puppeteer');
    page.goto('http://localhost:3000');

    // When exiting the application
    process.on('SIGINT', async () => {
        server.close();
        await browser.close();
        fs.unlinkSync(pidPath);
        process.exit();
    });
})();

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
