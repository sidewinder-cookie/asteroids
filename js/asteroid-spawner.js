const asteroids = [];

function assetsLoaded() {
    for (let i = 0; i < 4; i++) {
        spawnAsteroid();
    }
}

function spawnAsteroid() {
    asteroids.push(Asteroid.make());
}

function moveAsteroids() {
    for (const asteroid of asteroids) {
        asteroid.tick();
    }
}