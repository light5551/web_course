function playGame(time=0) {

    logic();

    context.fillStyle = "#202020";
    context.fillRect(0, 0, sceneConfig.sceneWidth, sceneConfig.sceneHeight);
    context.fillStyle = "#ff0000";// hex for red
    context.beginPath();
    context.rect( player.x, player.y, player.width, player.height);
    context.fill();
    requestAnimationFrame(playGame);
}

var player = {
  x: 50,
  y: sceneConfig.sceneHeight - 60,
  width: 40,
  height: 40,
  dx: 0,
  dy: 0,
  jumping: false,
  g: 10 // gravitation
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
                console.log('SHIFT');
                if (key_state)
                    player.g = -player.g;
                break;
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
    else if (player.y < 0) {
        player.jumping = false;
        player.y = 0;
        player.dy = 0;
    }

    if (player.x < 0 || player.x > sceneConfig.sceneWidth){
        console.log('GAME OVER')
    }
}

window.addEventListener("keydown", controller.keyListener);
window.addEventListener("keyup", controller.keyListener);