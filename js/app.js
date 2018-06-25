const game = new PIXI.Application();

const ASSETS = {
    spaceship: 'http://gipsypixel.com/wp-content/uploads/2017/11/Desktop-For-Cute-Cat-Wallpapercom-Animals-Images-Hd-Pics-Smartphone.jpg',
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
         // each frame we spin the spaceship around a bit
        spaceship.rotation += 0.01;
    });
    });
}

loadAssets();