import PIXI from 'expose-loader?PIXI!phaser-ce/build/custom/pixi.js';
import p2 from 'expose-loader?p2!phaser-ce/build/custom/p2.js';
import Phaser from 'expose-loader?Phaser!phaser-ce/build/custom/phaser-split.js';

const game = new Phaser.Game(560, 400, Phaser.AUTO, 'slime-soccer', {
    create: create,
    preload: preload,
    update: update,
});

function preload() {
    console.log('preload');
    game.load.image('background', './assets/images/background.png');
}

function create() {
    game.physics.startSystem(Phaser.Physics.BOX2D);
    game.add.image(game.world.centerX, game.world.centerY, 'background').anchor.set(0.5);
}

function update() {
}
