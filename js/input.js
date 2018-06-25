var KeyEvents = {};

document.addEventListener('keydown', event => {
    KeyEvents[event.key] = true;
});

document.addEventListener('keyup', event => {
    KeyEvents[event.key] = false;
});