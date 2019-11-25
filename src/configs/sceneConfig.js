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
    },
    COMPLETED: 0
};
GROUND.img1.src = '../src/static/images/B_IMAGE.jpg';

IMAGES = {
  FON: '../src/static/images/b_fon.png',//'../src/static/images/B_IMAGE.jpg',
  BILL: '../src/static/images/bill.png',
  HORROR_BILL: '../src/static/images/horror_bill.png',
  LOSE_BILL: '../src/static/images/l_bill.png',
  COIN: '../src/static/images/coin.png'
};

BOSS = {
  x: sceneConfig.sceneWidth - 200,
  y: sceneConfig.sceneHeight/2 -60,
  width: 200,
  height: 200,
  MAX_OFFSET: 100,
  MIN_OFFSET: -100,
  CURRENT_OFFSET:0,
  INCREASE: true
};

BULLET = {
    width: 20,
    height: 5
};