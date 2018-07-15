import io from 'socket.io-client';
import * as _ from 'lodash';
import backgroundUrl from './assets/images/background.png';
import slimeUrl from './assets/images/slime.png';
import ballUrl from './assets/images/ball.png';
import physicsData from './assets/physics.json';
import whiteUrl from './assets/images/white.png';
import smokeUrl from './assets/images/smoke-puff.png';
import Flame from './particles/Flame';
import Slime from './bodies/Slime';
import Ball from './bodies/Ball';

const { Phaser } = window;

const worldHeight = 400;
const worldWidth = 560;
const worldPadding = 20;
const slimeHeight = 28;
const ballSize = 19;
const headless = /Puppeteer/.test(window.navigator.userAgent);
const ioArguments = headless ? [] : ['http://localhost:3000'];
const socket = io(...ioArguments);
const renderingMode = Phaser[headless ? 'HEADLESS' : 'AUTO'];

let game = null;
let slime = null;
let cursors = null;

function getPhysicsInfo(body) {
    return {
        position: {
            x: body.x,
            y: body.y,
        },
        velocity: {
            x: body.velocity.x,
            y: body.velocity.y,
        },
        angularVelocity: body.angularVelocity,
    };
}

function mapPhysicsInfo(physics) {
    return {
        x: physics.position.x,
        y: physics.position.y,
        velocity: {
            x: physics.velocity.x,
            y: physics.velocity.y,
        },
        angularVelocity: physics.angularVelocity,
    };
}

function preload() {
    game.load
        .image('background', backgroundUrl.toString())
        .image('slime', slimeUrl.toString())
        .image('ball', ballUrl.toString())
        .image('white', whiteUrl.toString())
        .image('smoke', smokeUrl.toString())
        .physics('physics', null, physicsData);
}

function create() {
    const manager = game.plugins.add(Phaser.ParticleStorm);
    game.physics.startSystem(Phaser.Physics.BOX2D);
    game.physics.box2d.gravity.y = 1;
    cursors = game.input.keyboard.createCursorKeys();

    // Create particles
    Flame.create(manager);

    // Add the background to the world
    game.world.setBounds(
        -worldPadding,
        -worldPadding,
        worldWidth - (2 * worldPadding),
        worldHeight - (2 * worldPadding),
    );
    game.physics.box2d.setBoundsToWorld();
    game.add.image(-worldPadding, -worldPadding, 'background');

    // Add bodies to the world
    const ball = new Ball(game, (worldWidth - ballSize) / 2, (worldHeight - ballSize) / 2);
    slime = new Slime(game, worldPadding, worldHeight - worldPadding - slimeHeight);

    // Add fire to the world
    // const flame = new Flame(manager);
    // flame.start();

    if (headless) {
        // Handle direction from client
        socket.on('moveSlime', (direction) => {
            switch (direction) {
            case 'up':
                slime.moveUp();
                break;
            case 'left':
                slime.moveLeft();
                break;
            case 'right':
                slime.moveRight();
                break;
            default:
            }
        });

        // Regularly send physics updates to client
        setInterval(() => (
            socket.emit('physics', {
                slime: getPhysicsInfo(slime.body),
                ball: getPhysicsInfo(ball.body),
            })
        ), 1000 / 30);
    } else {
        // Handle physics updates
        socket.on('physics', (physics) => {
            _.assign(slime.body, mapPhysicsInfo(physics.slime));
            _.assign(ball.body, mapPhysicsInfo(physics.ball));
        });
    }
}

function update() {
    const distanceFromGround = worldHeight - slime.y - worldPadding - slimeHeight;

    // Jumping
    if (cursors.up.isDown && distanceFromGround < 8) {
        socket.emit('moveSlime', 'up');
    }

    // Moving left
    if (cursors.left.isDown) {
        socket.emit('moveSlime', 'left');
    }

    // Moving Right
    if (cursors.right.isDown) {
        socket.emit('moveSlime', 'right');
    }

    game.debug.box2dWorld();
}

game = new Phaser.Game(worldWidth, worldHeight, renderingMode, 'slime-soccer', {
    create,
    preload,
    update,
});
