class Powerup {
    constructor(icon, x, y) {
        this.icon = `${icon}`;

        this.sprite = new PIXI.Sprite(resources[`powerups/${this.icon}`].texture);
        this.sprite.x = x;
        this.sprite.y = y;
        this.sprite.anchor.x = 0.5;
        this.sprite.anchor.y = 0.5;
        this.sprite.scale.set(0.25, 0.25);

        powerupLayer.addChild(this.sprite);
    }

    remove() {
        this.sprite.parent.removeChild(this.sprite);
        const ind = powerups.indexOf(this);
        powerups.splice(ind, 1);
    }

    collected(ship) {
        this.remove();
    }
}