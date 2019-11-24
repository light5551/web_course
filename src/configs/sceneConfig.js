sceneConfig = {
    sceneWidth: 1000,
    sceneHeight: 600,
    offset: 20
};

keyboard = {
    RIGHT: 'ArrowRight',
    LEFT: 'ArrowLeft',
    UP: 'ArrowUp',
    DOWN: 'ArrowDown',
    SHIFT: 'Shift',
    ALT: 'Alt',
    TAB: 'Tab',
    ESCAPE: 'Escape'
};

COLORS = {
    RED: '#ff0000',
    BLUE: '#0000ff',
    BACKGROUND: '#000000'
};

GROUND = {
    img1: new Image()
};

GAME = {
    1: {
        fullTime: 40 * 1000
    },
    2: {
        fullTime: 50 * 1000
    }
};
GROUND.img1.src = '../src/static/images/B_IMAGE.jpg';
