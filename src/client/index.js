import io from 'socket.io-client';
import * as _ from 'lodash';

const worldHeight = 400;
const worldWidth = 560;
const worldPadding = 20;
const slimeHeight = 28;
const ballSize = 19;
const socket = io();
const phantom = /PhantomJS/.test(window.navigator.userAgent);
const renderingMode = window.Phaser[phantom ? 'HEADLESS' : 'AUTO'];

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
    };
}

function preload() {
    game.load.image('background', './assets/images/background.png');
    game.load.image('slime', './assets/images/slime.png');
    game.load.image('ball', './assets/images/ball.png');
}

function create() {
    game.physics.startSystem(window.Phaser.Physics.BOX2D);
    game.physics.box2d.gravity.y = 1;
    cursors = game.input.keyboard.createCursorKeys();

    // Add the background to the world
    game.world.setBounds(
        -worldPadding,
        -worldPadding,
        worldWidth - (2 * worldPadding),
        worldHeight - (2 * worldPadding),
    );
    game.physics.box2d.setBoundsToWorld();
    game.add.image(-worldPadding, -worldPadding, 'background');

    // Add the slime to the world
    slime = game.add.sprite(worldPadding, worldHeight - worldPadding - slimeHeight, 'slime');
    game.physics.box2d.enable(slime);
    slime.body.fixedRotation = true;
    slime.body.gravityScale = 320;
    slime.body.linearDamping = 2.5;

    // Add the ball to the world
    const ball = game.add.sprite((worldWidth - ballSize) / 2, (worldHeight - ballSize) / 2, 'ball');
    game.physics.box2d.enable(ball);
    ball.body.setCircle(ball.width / 2);
    ball.body.gravityScale = 320;
    ball.body.restitution = 0.85;

    if (phantom) {
        // Handle direction from client
        socket.on('moveSlime', (direction) => {
            switch (direction) {
            case 'up':
                slime.body.moveUp(275);
                break;
            case 'left':
                slime.body.moveLeft(160);
                break;
            case 'right':
                slime.body.moveRight(160);
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

game = new window.Phaser.Game(worldWidth, worldHeight, renderingMode, 'slime-soccer', {
    create,
    preload,
    update,
});
