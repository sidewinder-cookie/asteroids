class Shield extends Powerup {
    constructor(x, y) {
        super('shield', x, y);
    }

    static getIcon() {
        return 'shield';
    }

    collected(ship) {
        if (ship.powerups.has('shield')) return;
        super.collected(ship);
        ship.powerups.set('shield', Infinity);
    }
}
