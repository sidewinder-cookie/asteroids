class DoubleShot extends Powerup {
    constructor(x, y) {
        super('double_shot', x, y);
    }

    static getIcon() {
        return 'double_shot';
    }

    collected(ship) {
        if (ship.powerups.has('double_shot')) return;
        super.collected(ship);
        ship.powerups.set('double_shot', 60 * 10);
    }
}
