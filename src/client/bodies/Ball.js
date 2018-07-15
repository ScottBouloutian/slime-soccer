export default class Ball {
    constructor(game, x, y) {
        const sprite = game.add.sprite(x, y, 'ball');
        game.physics.box2d.enable(sprite);
        sprite.body.setCircle(sprite.width / 2);
        sprite.body.gravityScale = 320;
        sprite.body.restitution = 0.85;
        this.sprite = sprite;
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
