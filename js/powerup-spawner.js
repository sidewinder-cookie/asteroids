const powerups = window.powerups = [];

var nextPowerup = 60 * 10;

var numberOfPowerups = (innerWidth * innerHeight) / (209818 * 4);

function assetsLoaded2() {
    for (let i = 0; i < numberOfPowerups; i++) {
        spawnPowerup();
    }
}

function spawnPowerup() {
    const p = POWERUPS[Math.floor(Math.random() * POWERUPS.length)];
    powerups.push(new p(
        randomBetween(0, game.renderer.width),
        randomBetween(0, game.renderer.height)
    ));
}