const BULLET_OFFSET = 10;

function getShipTexture(has_shield, is_firing) {
    return `ship_${has_shield ? 'shield' : 'noshield'}${is_firing ? '_thruster' : ''}`;
}

class Ship {
    constructor(x, y) {
        this.sprite = new PIXI.Sprite(resources[getShipTexture(false, false)].texture);
        this.sprite.x = x;
        this.sprite.y = y;
        this.sprite.scale.x = 0.07;
        this.sprite.scale.y = 0.07;
        this.sprite.anchor.x = 0.5;
        this.sprite.anchor.y = 0.5;
        game.stage.addChild(this.sprite);
        this.velocity = { x: 0, y: 0, rotation: 0 };

        this.bulletCooldown = 0;

        this.bulletsContainer = new PIXI.Container();
        game.stage.addChild(this.bulletsContainer);

        game.stage.tint = Math.random() * 0xFFFFFF;

        window.bullets = this.bullets = [];

        this.powerups = new Map();
    }

    stringifyPowerups() {
        const o = {};
        for (let key in this.powerups.keys()) {
            o[key] = this.powerups.get(key);
        }
        return JSON.stringify(o);
    }

    putPowerups(d) {
        for (let key in d) {
            this.powerups.set(key, d[key]);
        }
    }

    tick() {
        if (KeyEvents.w) {
            this.velocity.x = this.velocity.x + 0.5 * Math.cos(this.sprite.rotation);
            this.velocity.y = this.velocity.y + 0.5 * Math.sin(this.sprite.rotation);
            this.sprite.setTexture(resources[getShipTexture(this.powerups.has('shield'), true)].texture);
        } else {
            this.sprite.setTexture(resources[getShipTexture(this.powerups.has('shield'), false)].texture);
        }
        if (KeyEvents.a) {
            this.velocity.rotation -= 0.03;
        }
        if (KeyEvents.d) {
            this.velocity.rotation += 0.03;
        }
        if (this.bulletCooldown > 0) {
            this.bulletCooldown--;
        }
        if (KeyEvents[" "] && this.bulletCooldown === 0) {
            let x = this.sprite.x + BULLET_OFFSET * Math.cos(this.sprite.rotation);
            let y = this.sprite.y + BULLET_OFFSET * Math.sin(this.sprite.rotation);
            if (!this.powerups.has('double_shot')) {
                this.bullets.push(new Bullet(
                    x,
                    y,
                    this.sprite.rotation,
                    this.bulletsContainer)
                );
            } else {
                this.bullets.push(new Bullet(x, y, this.sprite.rotation - 0.04, this.bulletsContainer));
                this.bullets.push(new Bullet(x, y, this.sprite.rotation + 0.04, this.bulletsContainer));
            }
            this.bulletCooldown = 14;
        }
        this.sprite.x += this.velocity.x;
        this.sprite.y += this.velocity.y;
    
        this.sprite.rotation += this.velocity.rotation;
    
        this.velocity.x *= 0.99;
        this.velocity.y *= 0.99;
        this.velocity.rotation *= 0.6;

        if (this.sprite.x < 0) this.sprite.x = game.renderer.width;
        if (this.sprite.x > game.renderer.width) this.sprite.x = 0;
        if (this.sprite.y < 0) this.sprite.y = game.renderer.height;
        if (this.sprite.y > game.renderer.height) this.sprite.y = 0;

        for (const bullet of this.bullets) {
            bullet.tick();
        }

        for (const powerup of this.powerups.keys()) {
            this.powerups.set(powerup, this.powerups.get(powerup) - 1);
            if (this.powerups.get(powerup) <= 0) this.powerups.delete(powerup);
        }

        for (const powerup of powerups) {
            let radius = powerup.sprite.width / 2;
            if (getDistance(powerup, this) < radius) {
                powerup.collected(this);
            }
        }
    }
}