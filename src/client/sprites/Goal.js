export default class Goal {
    static create(game, x, y, inverse) {
        const sprite = game.add.sprite(x, y, 'goal');
        sprite.scale.x = inverse ? -1 : 1;
        sprite.anchor.x = 0;
        sprite.anchor.y = 1;
        return sprite;
    }
}
