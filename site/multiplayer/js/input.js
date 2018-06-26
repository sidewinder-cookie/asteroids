var KeyEvents = {};

document.addEventListener('keydown', event => {
    if (state.lives <= 0) return;
    KeyEvents[event.key] = true;
});

document.addEventListener('keyup', event => {
    KeyEvents[event.key] = false;
});