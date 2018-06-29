const SPEED = 9;

class Bullet {
    constructor(x, y, rotation, container, isDummy = false) {
        let sprite = this.sprite = new PIXI.Graphics();
        sprite.lineStyle(0);
        sprite.beginFill(0xFF0000, 1);
        sprite.drawCircle(0, 0, 4);
        sprite.endFill();
        sprite.x = x;
        sprite.y = y;
        sprite.rotation = rotation;

        this.container = container;

        this.life = 100;

        container.addChild(sprite);
        
        if (!isDummy) ws.send(JSON.stringify({
            t: 'BULLET',
            x,
            y,
            rotation,
        }));
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
                asteroid.break(this.isDummy);
                return;
            }
        }
    }
}