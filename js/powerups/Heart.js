class Heart extends Powerup {
    constructor(x, y) {
        super('heart', x, y);
    }

    static getIcon() {
        return 'heart';
    }

    collected(ship) {
        super.collected(ship);
        state.lives++;
    }
}
