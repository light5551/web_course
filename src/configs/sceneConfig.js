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
    ESCAPE: 'Escape',
    RESTART: 'r'
};

settings = {
    PAUSE: false,
    dt: 0,
    TIME: 0,
    GAME_TIME: 0
};

COLORS = {
    RED: '#ff0000',
    BLUE: '#0000ff',
    YELLOW: '#ffff00',
    BACKGROUND: '#000000'
};

player = {
    x: 50,
    y: sceneConfig.sceneHeight - 60,
    width: 40,
    height: 40,
    dx: 0,
    dy: 0,
    jumping: false,
    g: 10, // gravitation
    color: COLORS.RED
};

GROUND = {
    img1: new Image()
};

GAME = {
    1: {
        fullTime: 40 * 1000,
        enemyBreak: 2 * 1000,
        type: {
            RED: 0.25,
            BLUE: 0.75
        }
    },
    2: {
        fullTime: 50 * 1000
    },
    COMPLETED: 0,
    FINISHED: false
};
GROUND.img1.src = '../src/static/images/B_IMAGE.jpg';

IMAGES = {
  FON: '../src/static/images/b_fon.png',
  TREE_FON: '../src/static/images/tree_grav_falls.png',
  BILL: '../src/static/images/bill.png',
  HORROR_BILL: '../src/static/images/horror_bill.png',
  LOSE_BILL: '../src/static/images/l_bill.png',
  COIN: '../src/static/images/coin.png',
  GAME_OVER: '../src/static/images/game_over.jpg'
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
    WIDTH: 4,
    STEP: 20,
    INCREASE_STEP: 15
};

const ENEMIES = [];

function getCentreBossX() {
    return BOSS.x + BOSS.width/2;
}

function getCentreBossY() {
    return BOSS.y + BOSS.height/2 + BOSS.CURRENT_OFFSET;
}

function getCentrePlayerX() {
    return player.x + player.width/2;
}

function getCentrePlayerY() {
    return player.y
}

function distance(point1, point2) {
    let dx = point1.x - point2.x;
    let dy = point1.y - point2.y;
    return Math.sqrt(
        dx * dx + dy * dy
    );
}

function DT(time, unpause=false) {
    settings.dt = time - settings.TIME;
    settings.TIME = time;
}

//////////// MUSIC ////////////////
let musicBackGround = new Audio('../src/static/sounds/gf.mp3');
let sound = false;
let gameOverSound = new Audio('../src/static/sounds/game_over.mp3');
let jumpSound = new Audio('../src/static/sounds/jump.mp3');
let shootSound = new Audio('../src/static/sounds/shoot.mp3');
