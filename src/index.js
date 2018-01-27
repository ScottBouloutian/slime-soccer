import PIXI from 'expose-loader?PIXI!phaser-ce/build/custom/pixi.js';
import p2 from 'expose-loader?p2!phaser-ce/build/custom/p2.js';
import Phaser from 'expose-loader?Phaser!phaser-ce/build/custom/phaser-split.js';

const worldHeight = 400;
const worldWidth = 560;
const worldPadding = 20;

const game = new Phaser.Game(worldWidth, worldHeight, Phaser.AUTO, 'slime-soccer', {
    create: create,
    preload: preload,
    update: update,
});

function preload() {
    game.load.image('background', './assets/images/background.png');
    game.load.image('slime', './assets/images/slime.png');
}

function create() {
    game.physics.startSystem(Phaser.Physics.BOX2D);
    game.physics.box2d.gravity.y = 500;

    // Add the background to the world
    game.world.setBounds(-worldPadding, -worldPadding, worldWidth - 2 * worldPadding, worldHeight - 2 * worldPadding);
    game.physics.box2d.setBoundsToWorld();
    game.add.image(-worldPadding, -worldPadding, 'background');

    // Add the slime to the world
    const slime = game.add.sprite(100, 100, 'slime');
    game.physics.box2d.enable(slime);
}

function update() {
    game.debug.box2dWorld();
}
