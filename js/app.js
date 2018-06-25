const game = new PIXI.Application({ backgroundColor: 0, width: 1366, height: 768 });

const velocity = {
    rotation: 0,
    movement: 0,
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
    spaceship.scale.x = .015;
    spaceship.scale.y = .015;

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
        velocity.movement += 0.25;
        spaceship.setTexture(resources.spaceshipThrusting.texture);
    } else {
        spaceship.setTexture(resources.spaceship.texture);
    }
    if (KeyEvents.a) {
        velocity.rotation -= 0.005;
    }
    if (KeyEvents.d) {
        velocity.rotation += 0.005;
    }
    spaceship.x = spaceship.x + velocity.movement * Math.cos(spaceship.rotation);
    spaceship.y = spaceship.y + velocity.movement * Math.sin(spaceship.rotation);

    spaceship.rotation += velocity.rotation;

    velocity.movement *= 0.99;
    velocity.rotation *= 0.9;
}
