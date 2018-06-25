const game = new PIXI.Application({ backgroundColor: 0, width: innerWidth, height: innerHeight });

const velocity = {
    rotation: 0,
    x: 0,
    y: 0
};

const ASSETS = {
    spaceship: '/res/ship_noshield.png',
    spaceshipThrusting: '/res/ship_noshield_thruster.png',
    asteroidLarge: '/res/asteroid_large.png',
};

document.body.appendChild(game.view);

const sprites = {};

function loadAssets() {
    const loader = PIXI.loader;

    for (const asset in ASSETS) {
        loader.add(asset, ASSETS[asset]);
    }

    loader.load((loader, resources) => {
        window.resources = resources;
        let spaceship = new Ship(game.renderer.width / 2, game.renderer.height / 2);

        assetsLoaded();

        // Listen for frame updates
        game.ticker.add(() => {
            spaceship.tick();
            moveAsteroids();
        });
    });
}

loadAssets();

function moveSpaceship() {
    if (KeyEvents.w) {
        velocity.x = velocity.x + 0.5 * Math.cos(spaceship.rotation);
        velocity.y = velocity.y + 0.5 * Math.sin(spaceship.rotation);
        spaceship.setTexture(resources.spaceshipThrusting.texture);
    } else {
        spaceship.setTexture(resources.spaceship.texture);
    }
    if (KeyEvents.a) {
        velocity.rotation -= 0.03;
    }
    if (KeyEvents.d) {
        velocity.rotation += 0.03;
    }
    spaceship.x += velocity.x;
    spaceship.y += velocity.y;

    spaceship.rotation += velocity.rotation;

    velocity.x *= 0.99;
    velocity.y *= 0.99;
    velocity.rotation *= 0.6;

    if (spaceship.x < 0) spaceship.x = game.renderer.width;
    if (spaceship.x > game.renderer.width) spaceship.x = 0;
    if (spaceship.y < 0) spaceship.y = game.renderer.height;
    if (spaceship.y > game.renderer.height) spaceship.y = 0;
}
