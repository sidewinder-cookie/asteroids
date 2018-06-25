const SPEED = 7;

class Bullet {
    constructor(x, y, rotation, container) {
        let sprite = this.sprite = new PIXI.Graphics();
        sprite.lineStyle(0);
        sprite.beginFill(0x00FFFF * Math.random(), 1);
        sprite.drawCircle(0, 0, 4);
        sprite.endFill();
        sprite.x = x;
        sprite.y = y;
        sprite.rotation = rotation;

        this.container = container;

        this.life = 100;

        container.addChild(sprite);
    }

    remove() {
        this.container.removeChild(this.sprite);
        const ind = bullets.indexOf(this);
        bullets.splice(ind, 1);
    }

    tick() {
        this.sprite.x += SPEED * Math.cos(this.sprite.rotation);
        this.sprite.y += SPEED * Math.sin(this.sprite.rotation);
        this.sprite.alpha -= 0.01;
        this.life--;
        if (this.life === 0) return this.remove();

        for (const asteroid of asteroids) {
            if (asteroid.collidingWith(this)) {
                this.remove();
                asteroid.break();
                return;
            }
        }
    }
}