const asteroids = window.asteroids = [];

var nextAsteroid = 60 * 5;

function assetsLoaded() {
    for (let i = 0; i < 4; i++) {
        spawnAsteroid();
    }
}

function spawnAsteroid() {
    asteroids.push(Asteroid.make());
}

function moveAsteroids() {
    if (nextAsteroid === 0) {
        spawnAsteroid();
    }
    for (const asteroid of asteroids) {
        asteroid.tick();
    }
}