const game = new PIXI.Application({ backgroundColor: 0, width: innerWidth, height: innerHeight });

var username = prompt("Username: ");

document.getElementById("theme").volume = 0.5;

const POWERUPS = [
    DoubleShot,
    Shield,
    Heart
];

document.body.appendChild(game.view);

var shaking = 0;

var state = {
    lives: 3,
    score: 0,
    invulnerable: 0,
};

var powerupLayer;

function getDistance(s1, s2) {
    return Math.sqrt(
        Math.pow(s1.sprite.position.x - s2.sprite.position.x, 2) +
        Math.pow(s1.sprite.position.y - s2.sprite.position.y, 2)
    );
}

const _ASSETS = [
    'asteroid_large',
    'asteroid_large2',
    'asteroid_large3',
    'asteroid_medium',
    'asteroid_medium2',
    'asteroid_medium3',
    'asteroid_small',
    'asteroid_small2',
    'asteroid_small3',
    'background',
    'ship_noshield_thruster',
    'ship_noshield',
    'ship_shield_thruster',
    'ship_shield',
].concat(POWERUPS.map(x => `powerups/${x.getIcon()}`));

const ASSETS = {};

_ASSETS.map(f => ASSETS[f] = `/res/${f}.png`);

const sprites = {};

function loadAssets() {
    const loader = PIXI.loader;

    for (const asset in ASSETS) {
        loader.add(asset, ASSETS[asset]);
    }

    loader.load((loader, resources) => {
        window.resources = resources;
        window.spaceship = new Ship(game.renderer.width / 2, game.renderer.height / 2);

        powerupLayer = new PIXI.Container();
        game.stage.addChild(powerupLayer);

        assetsLoaded();
        assetsLoaded2();

        let scoreText = new PIXI.Text(`Score: 0\n\nLives: 3`, { fill: 0xFFFFFF, fontFamily: 'emulogic' });
        scoreText.position.set(15, 15);
        game.stage.addChild(scoreText);

        let gameOver = new PIXI.Text('Game Over', { fill: 0xFFFFFF, fontFamily: 'emulogic' });
        gameOver.anchor.x = 0.5;
        gameOver.anchor.y = 0.5;
        gameOver.position.set(game.renderer.width / 2, game.renderer.height / 2);

        // Listen for frame updates
        game.ticker.add(() => {
            spaceship.tick();
            tickPowerupSpawn();
            moveAsteroids();

            if (state.lives > 0) state.score += 1 / 60;
            else {
                const scores = JSON.parse(localStorage.getItem('scores') || '{}');
                if (!scores[username]) scores[username] = state.score;
                if (state.score > scores[username]) scores[username] = state.scores;
                localStorage.setItem('scores', JSON.stringify(scores));
            }

            scoreText.text = `Score: ${Math.ceil(state.score)}\n\nLives: ${state.lives > 0 ? '💖'.repeat(state.lives) : '😞'} `;

            if (shaking > 0) {
                let amount = shaking * 2;
                game.stage.x = (Math.random() * amount) - amount;
                game.stage.y = (Math.random() * amount) - amount;
                shaking--;
            } else {
                game.stage.x = 0;
                game.stage.y = 0;
            }

            if (state.invulnerable > 0) state.invulnerable--;

            if (game.renderer.backgroundColor !== 0) {
                game.renderer.backgroundColor -= 0x0F0000;
                game.renderer.backgroundColor = Math.max(game.renderer.backgroundColor,
                    state.lives > 0 ? 0 : 0x550000);
            }

            if (state.lives <= 0) {
                game.stage.addChild(gameOver);
            }
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
