const asteroids = window.asteroids = [];

var nextAsteroid = 60 * 10;

var numberOfAsteroids = (innerWidth * innerHeight) / 209817;

function assetsLoaded() {
    for (let i = 0; i < numberOfAsteroids; i++) {
        spawnAsteroid();
    }
}

function spawnAsteroid() {
    asteroids.push(Asteroid.make());
}

function moveAsteroids() {
    nextAsteroid--;
    if (nextAsteroid === 0) {
        spawnAsteroid();
        nextAsteroid = 60 * 10;
    }
    for (const asteroid of asteroids) {
        asteroid.tick();
    }
}