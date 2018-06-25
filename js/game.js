const game = new PIXI.Application();

const velocity = {
    rotation: 0,
    movement: 0,
};

const ASSETS = {
    spaceship: 'https://d2gg9evh47fn9z.cloudfront.net/800px_COLOURBOX25389179.jpg',
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
    spaceship.x = game.renderer.width / 2;
    spaceship.y = game.renderer.height / 2;

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
        velocity.movement += 0.5;
    }
    if (KeyEvents.s) {
        velocity.movement -= 0.5;
    }
    if (KeyEvents.a) {
        velocity.rotation -= 0.01;
    }
    if (KeyEvents.d) {
        velocity.rotation += 0.01;
    }
    spaceship.x = spaceship.x + velocity.movement * Math.cos(spaceship.rotation);
    spaceship.y = spaceship.y + velocity.movement * Math.sin(spaceship.rotation);

    spaceship.rotation += velocity.rotation;

    velocity.movement *= 0.9;
    velocity.rotation *= 0.9;
}