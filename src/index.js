import PIXI from 'expose-loader?PIXI!phaser-ce/build/custom/pixi.js';
import p2 from 'expose-loader?p2!phaser-ce/build/custom/p2.js';
import Phaser from 'expose-loader?Phaser!phaser-ce/build/custom/phaser-split.js';

const worldHeight = 400;
const worldWidth = 560;
const worldPadding = 20;
const jumpHeight = 60;
const slimeHeight = 28;
const game = new Phaser.Game(worldWidth, worldHeight, Phaser.AUTO, 'slime-soccer', {
    create: create,
    preload: preload,
    update: update,
});

var slime = null;
var cursors = null;

function preload() {
    game.load.image('background', './assets/images/background.png');
    game.load.image('slime', './assets/images/slime.png');
}

function create() {
    game.physics.startSystem(Phaser.Physics.BOX2D);
    game.physics.box2d.gravity.y = 1;
    cursors = game.input.keyboard.createCursorKeys();

    // Add the background to the world
    game.world.setBounds(-worldPadding, -worldPadding, worldWidth - 2 * worldPadding, worldHeight - 2 * worldPadding);
    game.physics.box2d.setBoundsToWorld();
    game.add.image(-worldPadding, -worldPadding, 'background');

    // Add the slime to the world
    slime = game.add.sprite(worldPadding, worldHeight - worldPadding - slimeHeight, 'slime');
    game.physics.box2d.enable(slime);
    slime.body.fixedRotation = true;
    slime.body.linearDamping = 3;
}

function update() {
    const distanceFromGround = worldHeight - slime.y - worldPadding - slimeHeight;

    // Jumping
    if (distanceFromGround > jumpHeight) {
        slime.body.gravityScale = 42.2;
        slime.body.moveDown(12.79366667);
    }
    if (cursors.up.isDown && distanceFromGround < 8) {
        slime.body.gravityScale = 321.4166667;
        slime.body.moveUp(273.12);
    }

    // Moving left
    if (cursors.left.isDown && slime.body.velocity.x > -160) {
        slime.body.velocity.x = slime.body.velocity.x - 16;
    }

    // Movign Right
    if (cursors.right.isDown && slime.body.velocity.x < 160) {
        slime.body.velocity.x = slime.body.velocity.x + 16;
    }

    game.debug.box2dWorld();
}
