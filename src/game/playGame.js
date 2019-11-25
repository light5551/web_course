let coinImage = new Image();
coinImage.src = IMAGES.COIN;

function playGame(time=0) {
    logic();
    updateGame();
    updateProgress(time);
    context.fill();
    requestAnimationFrame(playGame);
}

function coins(coins) {
    console.log(coinImage)
    console.log('coins')
    cns[0].render(context, 150, 100, coinImage)
    coins.forEach((value, index) => {
        value.render(context, 150 , 100, coinImage);
    })
}

function updateProgress(time){
    let progress = document.getElementById('myProgress');
    let fullTime = GAME[localStorage.lvl].fullTime;
    let pr = Math.floor(time / fullTime * 100);
    progress.style.width = pr.toString() + '%';
    GAME.COMPLETED = pr;
}
function updateGame() {

    let img = new Image();   // Создает новое изображение
    img.src = IMAGES.FON;
    img.addEventListener("load", function() {
        context.drawImage(img, 0, 0, sceneConfig.sceneWidth, sceneConfig.sceneHeight);
    }, false);

    let img2 = new Image();
    if (GAME.COMPLETED > 60 && GAME.COMPLETED <= 99)
        img2.src = IMAGES.HORROR_BILL;
    else if (GAME.COMPLETED < 60)
        img2.src = IMAGES.BILL;
    else  if (GAME.COMPLETED > 99 && GAME.COMPLETED < 120)
        img2.src = IMAGES.LOSE_BILL;

    img2.addEventListener("load", function() {
        context.drawImage(img2, sceneConfig.sceneWidth - 200, sceneConfig.sceneHeight/2 - 60, 200, 200);
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
    context.rect( player.x, gY(player.y), player.width, player.height);
    //context.fill();
}

function gY(y) {
    return (y - sceneConfig.offset)
}
var player = {
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
                    showModal();
                }
        }
    }
};

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

    if (player.x < 0 || player.x > sceneConfig.sceneWidth){
        console.log('GAME OVER')
    }
}

window.addEventListener("keydown", controller.keyListener);
window.addEventListener("keyup", controller.keyListener);
