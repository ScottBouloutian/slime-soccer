export default class Slime {
    constructor(game, x, y) {
        const sprite = game.add.sprite(x, y, 'slime');
        game.physics.box2d.enable(sprite);
        sprite.body.clearFixtures();
        sprite.body.loadPolygon('physics', 'slime', sprite);
        sprite.body.fixedRotation = true;
        sprite.body.gravityScale = 320;
        sprite.body.linearDamping = 2.5;
        this.sprite = sprite;
    }

    moveUp() {
        this.sprite.body.moveUp(275);
    }

    moveLeft() {
        this.sprite.body.moveLeft(160);
    }

    moveRight() {
        this.sprite.body.moveRight(160);
    }

    get x() {
        return this.sprite.x;
    }

    get y() {
        return this.sprite.y;
    }

    get body() {
        return this.sprite.body;
    }
}
