function randomBetween(lower, upper) {
    return lower + (Math.random() * upper);
}

class Asteroid {
    constructor(x, y, xVel, yVel, rotation) {
        this.xVel = xVel;
        this.yVel = yVel;
        this.rotation = rotation;

        let sprite = this.sprite = new PIXI.Sprite(resources.asteroidLarge.texture);
        sprite.scale.x = 0.2;
        sprite.scale.y = 0.2;
        sprite.anchor.x += 0.5;
        sprite.anchor.y += 0.5;
        sprite.x = x;
        sprite.y = y;
        game.stage.addChild(sprite);
    }

    static make() {
        return new Asteroid(
            randomBetween(0, game.renderer.width),
            randomBetween(0, game.renderer.height),
            randomBetween(-3, 3),
            randomBetween(-3, 3),
            randomBetween(-0.05, 0.05)
        );
    }

    tick() {
        this.sprite.x += this.xVel;
        this.sprite.y += this.yVel;
        this.sprite.rotation += this.rotation;
        if (this.sprite.x < -100) this.sprite.x = game.renderer.width;
        if (this.sprite.x > game.renderer.width + 100) this.sprite.x = 0;
        if (this.sprite.y < -100) this.sprite.y = game.renderer.height;
        if (this.sprite.y > game.renderer.height + 100) this.sprite.y = 0;
    }
}