let coinImage = new Image();
coinImage.src = IMAGES.COIN;

class protoBullet{
    constructor(x=getCentreBossX(), y=getCentreBossY(), auto=true, colour='#000000'){
        this.x = x;
        this.y = y;
        this.colour = colour;
        this.auto = auto;
        this.nextX = x + 1;
        this.nextY = y + 1;
        this.editWay();
    }

    draw() {
        this.checkAndChangeAuto();
        if (this.auto){
            this.editWay();
        }
        this.nextStep();
        this.drawBullet();
    };

    checkAndChangeAuto(){
        this.auto = false;
        switch (this.colour) {
            case COLORS.BLUE:
                if (player.color === COLORS.RED)
                    this.auto = true;
                break;
            case COLORS.RED:
                if (player.color === COLORS.BLUE)
                    this.auto = true;
                break;
        }
    }

    nextStep(){
        this.nextX -= BULLET.STEP;
        this.nextY = this.k * this.nextX + this.b;
    }

    drawBullet(){
        context.beginPath();
        context.moveTo(this.x, this.y);
        context.lineTo(this.nextX, this.nextY);
        this.x = this.nextX + BULLET.INCREASE_STEP;
        this.y = this.nextY;
        context.lineWidth = BULLET.WIDTH;
        context.strokeStyle = this.colour;
        context.stroke();
    }
    editWay(){
        if (this.x < player.x)
            return;
        let x0 = player.x,
            y0 = player.y,
            x1 = this.x,
            y1 = this.y;

        this.k = (y0 - y1)/(x0 - x1);
        this.b = y1 - this.k * x1;
    }

    isOK(){
        return !(this.x < 0 || this.x > sceneConfig.sceneWidth || this.y < 0 || this.y > sceneConfig.sceneHeight);
    }
}

function playGame(time=0) {
    DT(time);
    if (!settings.PAUSE){
        settings.GAME_TIME += settings.dt;
        logic();
        updateGame();
        bossMove();
        enemyController(time);
        shoot();
        updateProgress();
        context.fill();
        checkGameOver();
    }
    requestAnimationFrame(playGame);

}

function checkGameOver() {
    ENEMIES.forEach((value, index) => {
        if (distance({x: player.x, y: player.y}, {x: value.x, y: value.y}) < 100){
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

function gameOver() {
    console.log('GAME OVER!');
}

function coins(coins) {
    console.log(coinImage)
    console.log('coins')
    cns[0].render(context, 150, 100, coinImage)
    coins.forEach((value, index) => {
        value.render(context, 150 , 100, coinImage);
    })
}

function shoot() {
    ENEMIES.forEach((value => {
       value.draw();
    }))
}

function updateProgress(){
    let progress = document.getElementById('myProgress');
    let fullTime = GAME[localStorage.lvl].fullTime;
    let pr = Math.floor(settings.GAME_TIME / fullTime * 100);
    progress.style.width = pr.toString() + '%';
    GAME.COMPLETED = pr;
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
    //context.rect( player.x, gY(player.y), player.width, player.height);
    context.fillRect(player.x, gY(player.y), player.width, player.height);
    context.beginPath();

    //context.fill();
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
                if (key_state){
                    settings.PAUSE = !settings.PAUSE;
                }
        }
    }
};

let enemyTimer = 0;
function enemyController(time){
    let enemyBreak = GAME[localStorage.lvl].enemyBreak;
    if (time - enemyTimer > enemyBreak){
          //console.log(getType());
        ENEMIES.push(new protoBullet(getCentreBossX(), getCentreBossY(),
            true,
            getType()));
        enemyTimer = time;
    }
}

function getType() {
    let r = Math.random();
    console.log(r);
    if (GAME[localStorage.lvl].type.RED > r){
        console.log('RED!');
        return COLORS.RED;
    }else if (GAME[localStorage.lvl].type.BLUE < r){
        console.log('BLUE!');
        return COLORS.BLUE;
    }else {
        console.log('YELLOW!');
        return COLORS.YELLOW;
    }
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
