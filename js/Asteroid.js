const SIZES = ['small', 'medium', 'large'];

function getTexture(type) {
    const n = Math.floor(Math.random() * 3);
    if (n === 0) return `asteroid_${type}`;
    return `asteroid_${type}${n + 1}`;
}

function randomBetween(lower, upper) {
    return lower + (Math.random() * upper);
}

class Asteroid {
    constructor(x, y, xVel, yVel, rotation, size) {
        this.xVel = xVel;
        this.yVel = yVel;
        this.rotation = rotation;
        this.size = size;

        let sprite = this.sprite = new PIXI.Sprite(resources[getTexture(size)].texture);
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
            randomBetween(-0.05, 0.05),
            'large'
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

        this.checkCollisionWithShip();
    }

    collidingWith(sprite) {
        let distance = getDistance(this, sprite);
        if (distance < Math.max(this.sprite.width, this.sprite.height) / 2) {
            return true;
        }
    }

    checkCollisionWithShip() {
        let distance = getDistance(this, spaceship);
        if (distance < this.sprite.width / 2 && state.invulnerable <= 0) {
            state.lives--;
            if (state.lives <= 0) KeyEvents = {};
            state.invulnerable = 50;
            this.remove();
            shaking = 50;
            game.renderer.backgroundColor = 0xFF0000;
        }
    }

    remove() {
        this.sprite.parent.removeChild(this.sprite);
        const ind = asteroids.indexOf(this);
        asteroids.splice(ind, 1);
    }

    break() {
        this.remove();
        state.score++;
        window.shaking = (SIZES.indexOf(this.size) + 1) * 5;
        if (this.size !== 'small') {
            for (let i = 0; i < 3; i++) {
                asteroids.push(new Asteroid(
                    randomBetween(-20, 20) + this.sprite.x,
                    randomBetween(-20, 20) + this.sprite.y,
                    randomBetween(-3, 3),
                    randomBetween(-3, 3),
                    randomBetween(-0.05, 0.05),
                    SIZES[SIZES.indexOf(this.size) - 1],
                ));
            }
        }
    }
}