class DoubleShot extends Powerup {
    constructor(x, y) {
        super('double_shot', x, y);
    }

    static getIcon() {
        return 'double_shot';
    }

    collected(ship) {
        super.collected(ship);
        ship.powerups.set('double_shot', 300);
    }
}
