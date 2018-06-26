const powerups = window.powerups = [];

var nextPowerup = 60 * 30;

var numberOfPowerups = (innerWidth * innerHeight) / (209818 * 4);

function assetsLoaded2() {
    for (let i = 0; i < numberOfPowerups; i++) {
        spawnPowerup();
    }
}

function tickPowerupSpawn() {
    nextPowerup--;
    if (nextPowerup === 0) {
        spawnPowerup();
        nextPowerup = 60 * 30;
    }
}

function spawnPowerup() {
    const p = POWERUPS[Math.floor(Math.random() * POWERUPS.length)];
    powerups.push(new p(
        randomBetween(0, game.renderer.width),
        randomBetween(0, game.renderer.height)
    ));
}