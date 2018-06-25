const game = new PIXI.Application({ backgroundColor: 0, width: 1366, height: 768 });

const velocity = {
    rotation: 0,
    x: 0,
    y: 0
};

const ASSETS = {
    spaceship: '/res/ship_noshield.png',
    spaceshipThrusting: '/res/ship_noshield_thruster.png'
};

document.body.appendChild(game.view);

const sprites = {};

function loadAssets() {
    const loader = PIXI.loader;

    for (const asset in ASSETS) {
        loader.add(asset, ASSETS[asset]);
    }

    loader.load((loader, resources) => {
        spaceship = sprites.spaceship = new PIXI.Sprite(resources.spaceship.texture);
        // Setup the position of the spaceship
    window.resources = resources;
    spaceship.x = game.renderer.width / 2;
    spaceship.y = game.renderer.height / 2;
    spaceship.scale.x = .07;
    spaceship.scale.y = .07;

    // Rotate around the center
    spaceship.anchor.x = 0.5;
    spaceship.anchor.y = 0.5;

    // Add the spaceship to the scene we are building
    game.stage.addChild(spaceship);

        // Listen for frame updates
        game.ticker.add(() => {
            moveSpaceship();
        });
    });
}

loadAssets();

function moveSpaceship() {
    if (KeyEvents.w) {
        velocity.x = velocity.x + 1 * Math.cos(spaceship.rotation);
        velocity.y = velocity.y + 1 * Math.sin(spaceship.rotation);
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

    velocity.x *= 0.95;
    velocity.y *= 0.95;
    velocity.rotation *= 0.6;

    if (spaceship.x < 0) spaceship.x = game.renderer.width;
    if (spaceship.x > game.renderer.width) spaceship.x = 0;
    if (spaceship.y < 0) spaceship.y = game.renderer.height;
    if (spaceship.y > game.renderer.height) spaceship.y = 0;
}
