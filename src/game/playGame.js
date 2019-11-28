let wasGameOver = false;
function playGame(time=0) {
    // MUSIC
    if (!sound){
        musicBackGround.play().then(() => {
            sound = true;
        }).catch(() => {
            console.log('TAP SMT');
        });
    }

    if (GAME.FINISHED){
        if (!GAME.WON)
        drawGameOver();
        if (!wasGameOver)
        gameOver();
        wasGameOver = true;
    }else {
        DT(time);
        if (!settings.PAUSE){
            settings.GAME_TIME += settings.dt;
            logic();
            updateGame();
            //bossMove();
            smartBossMove();
            enemyController(time);
            coinController(time);
            shoot();
            coins();
            updateProgress();
            context.fill();
            checkGameOver();
        }
    }
    requestAnimationFrame(playGame);
}


function drawGameOver() {
    let img = new Image();
    img.src = IMAGES.GAME_OVER;
    img.addEventListener("load", function() {
        context.drawImage(img, 0, 0, 1000, 1000,0,0, sceneConfig.sceneWidth, sceneConfig.sceneHeight);
    }, false);
}

function checkGameOver() {
    ENEMIES.forEach((value, index) => {
        if (distance({x: player.x, y: player.y}, {x: value.x, y: value.y}) < EQUAL_DISTANCE){
            gameOver();
        }
    })
}

function bossMove() {
    let img2 = new Image();
    if (GAME.COMPLETED > 60 && GAME.COMPLETED <= 99)
        img2.src = IMAGES.HORROR_BILL;
    else if (GAME.COMPLETED < 60)
        img2.src = IMAGES.BILL;
    else  if (GAME.COMPLETED > 99 && GAME.COMPLETED < 120)
        img2.src = IMAGES.LOSE_BILL;

    if (BOSS.INCREASE){
        BOSS.CURRENT_OFFSET += 1;
        if (BOSS.CURRENT_OFFSET >= BOSS.MAX_OFFSET){
            BOSS.INCREASE = false;
        }
    }
    else{
        BOSS.CURRENT_OFFSET -= 1;
        if (BOSS.CURRENT_OFFSET <= BOSS.MIN_OFFSET)
            BOSS.INCREASE = true;
    }
    img2.addEventListener("load", function() {
        context.drawImage(img2, BOSS.x, BOSS.y + BOSS.CURRENT_OFFSET, BOSS.width, BOSS.height);
    }, false);
}

let myBoss = undefined;
function smartBossMove() {
    if (!myBoss)
        myBoss = new BillBOSS();
    let settings = getSettings();
    let bossImage = new Image();
    bossImage.src = IMAGES.FULL_BILL;
    bossImage.addEventListener("load", function() {
        context.drawImage(bossImage, 300, 410, 135, 130 , BOSS.x, BOSS.y + BOSS.CURRENT_OFFSET, BOSS.width, BOSS.height);
    }, false);
}

function getSettings() {
    let stateLevel = GAME.COMPLETED > 60 ? HARD_STATE : NORMAL_STATE;
    let settings = BOSS_LEVELS[parseInt(localStorage.lvl)][stateLevel];
    return settings;
}

function gameOver() {
    musicBackGround.pause();
    shootSound.pause();
    if (!GAME.WON)
        gameOverSound.play();
    GAME.FINISHED = true;
    nextLocation()
}

function nextLocation() {
    switch (parseInt(localStorage.lvl)) {
        case 1:
            if (GAME.WON){
                localStorage.lvl = 2;
            }
            setTimeout(() => {
                window.location.reload();
            }, 1000);
            break;
        case 2:
            if (GAME.WON){
                writeRecord();
                localStorage.lvl = 1;
                window.location = 'menu.html';
            }else
                console.log('a')
               //window.location.reload();
            break;
    }
}

function writeRecord() {
    let nickname = localStorage.nickname;
    let score = parseInt(document.getElementById('score').innerText);
    console.log(score);
    let json;
    if (localStorage.records)
        json = JSON.parse(localStorage.records);
    else json = {};
    console.log(json);
    if (json[nickname]){
        if (json[nickname].score < score)
            json[nickname].score = score;
    }else {
        json[nickname] = {score: score};
    }
    localStorage.records = JSON.stringify(json);
}

function coins() {
    COINS.forEach((value, index, array) => {
        value.draw();
        if (distance({x: player.x, y: player.y}, {x: value.getCentreX(), y: value.getCentreY()}) < EQUAL_DISTANCE_FOR_MONEY){
            array.splice(index, 1);
            plusScore(5);
            coinSound.currentTime = 0;
            coinSound.play();
        }
    });
}

function plusScore(value=1) {
    let score = document.getElementById('score');
    score.innerText = (parseInt(score.innerText) + value).toString();
}

function shoot() {
    ENEMIES.forEach((value, index, array) => {
       value.draw();
       if (!value.isOK()){
           array.splice(index, 1);
       }
    })
}

function updateProgress(){
    let progress = document.getElementById('myProgress');
    let fullTime = GAME[localStorage.lvl].fullTime;
    let pr = Math.floor(settings.GAME_TIME / fullTime * 100);
    progress.style.width = pr.toString() + '%';
    GAME.COMPLETED = pr;
    if (pr > 100){
        GAME.WON = true;
        GAME.FINISHED = true;
    }
}

function updateGame() {

    let img = new Image();   // Создает новое изображение
    img.src = IMAGES.FON;
    img.addEventListener("load", function() {
        context.drawImage(img, 0, 0, sceneConfig.sceneWidth, sceneConfig.sceneHeight);
    }, false);

    // down road - blue
    context.fillStyle = COLORS.BLUE;// hex for red
    context.fillRect(0, sceneConfig.sceneHeight - sceneConfig.offset, sceneConfig.sceneWidth, sceneConfig.sceneHeight);
    context.beginPath();
    // up road - red
    context.fillStyle = COLORS.RED;// hex for red
    context.fillRect(0, 0, sceneConfig.sceneWidth, sceneConfig.offset);
    context.beginPath();

    context.fillStyle = player.color;// hex for red
    context.fillRect(player.x, gY(player.y), player.width, player.height);
    context.beginPath();
}

function gY(y) {
    return (y - sceneConfig.offset)
}

var controller = {
    left:false,
    right:false,
    up:false,
    keyListener:function(event) {
        let key_state = (event.type === "keydown");
        switch(event.key) {
            case keyboard.LEFT:// left key
                controller.left = key_state;
                break;
            case keyboard.UP:// up key
                jumpSound.currentTime = 0;
                jumpSound.play();
                controller.up = key_state;
                break;
            case keyboard.RIGHT:// right key
                controller.right = key_state;
                break;
            case keyboard.DOWN:// down key
                controller.right = key_state;
                break;
            case keyboard.SHIFT:
                if (key_state){
                    player.g = -player.g;
                    player.color = player.color === COLORS.RED? COLORS.BLUE : COLORS.RED;
                }
                break;
            case keyboard.ESCAPE:
                if (key_state)
                    settings.PAUSE = !settings.PAUSE;
                break;
            case keyboard.RESTART:
            case keyboard.RESTART.toUpperCase:
                if (key_state)
                    window.location.reload();
                break;
            case keyboard.MENU:
                if (key_state)
                    window.location = 'menu.html';

        }
    }
};

let enemyTimer = 0;
function enemyController(time){
    let settings = getSettings();
    let enemyBreak = settings.enemyBreak;//GAME[localStorage.lvl].enemyBreak;
    if (time - enemyTimer > enemyBreak){
          //console.log(getType());
        ENEMIES.push(new protoBullet(getCentreBossX(), getCentreBossY(),
            true,
            getType()));
        enemyTimer = time;
    }
}

let coinTimer = 0;
function coinController(time) {
    let coinBreak = GAME[localStorage.lvl].coinBreak;
    if (time - coinTimer > coinBreak){
        COINS.push(new Coin());
        coinTimer = time;
    }
}

function getType() {
    let r = Math.random();
    let settings = getSettings();
    if (settings.type.RED > r)
        return COLORS.RED;
    else if (settings.type.BLUE < r)
        return COLORS.BLUE;
    else
        return COLORS.YELLOW;
}

function logic(){
    if (controller.up && player.jumping === false) {
        player.dy +=  40 * (player.g > 0 ? -1: 1);
        player.jumping = true;
    }
    if(controller.left) {
        player.dx -= 0.5;
    }
    if (controller.right) {
        player.dx += 0.5;
    }

    player.dy += player.g / 4;
    player.x += player.dx;
    player.y += player.dy;
    player.dx *= 0.9;
    player.dy *= 0.9;

    if (player.y > sceneConfig.sceneHeight - player.height) {
        player.jumping = false;
        player.y = sceneConfig.sceneHeight - player.height;
        player.dy = 0;
    }
    else if (player.y < sceneConfig.offset + player.width/2) {
        player.jumping = false;
        player.y = sceneConfig.offset + player.width/2;
        player.dy = 0;
    }

    if (player.x < 0 )
        player.dx += 50;
    else if (player.x > sceneConfig.sceneWidth)
        player.dx -= 50;
}



window.addEventListener("keydown", controller.keyListener);
window.addEventListener("keyup", controller.keyListener);
