export default class Ball {
    static create(game, x, y) {
        const sprite = game.add.sprite(x, y, 'ball');
        game.physics.box2d.enable(sprite);
        sprite.body.setCircle(sprite.width / 2);
        sprite.body.gravityScale = 320;
        sprite.body.restitution = 0.85;
        return sprite;
    }
}
