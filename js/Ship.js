const BULLET_OFFSET = 10;

class Ship {
    constructor(x, y) {
        this.sprite = new PIXI.Sprite(resources.ship_noshield.texture);
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
    }

    tick() {
        if (KeyEvents.w) {
            this.velocity.x = this.velocity.x + 0.5 * Math.cos(this.sprite.rotation);
            this.velocity.y = this.velocity.y + 0.5 * Math.sin(this.sprite.rotation);
            this.sprite.setTexture(resources.ship_noshield_thruster.texture);
        } else {
            this.sprite.setTexture(resources.ship_noshield.texture);
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
            this.bullets.push(new Bullet(
                x,
                y,
                this.sprite.rotation,
                this.bulletsContainer)
            );
            this.bulletCooldown = 7;
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
    }
}