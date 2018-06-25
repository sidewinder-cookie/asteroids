const Game = new PIXI.Application();

const ASSETS = {
    spaceship: 'http://gipsypixel.com/wp-content/uploads/2017/11/Desktop-For-Cute-Cat-Wallpapercom-Animals-Images-Hd-Pics-Smartphone.jpg',
};

function loadAssets() {
    const loader = PIXI.loader;

    for (const asset in ASSETS) {
        loader.add(asset, ASSETS[asset]);
    }

    loader.load((loader, resources) => {
        alert(resources);
    });
}

loadAssets();