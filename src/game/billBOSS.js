
class BillBOSS {
    constructor(){
        this.settings = getSettings();
        this.sx = 300;
        this.sy = 410;
        this.sWidth = 135;
        this.sHeight = 130;
        this.dx = BOSS.x;
        this.dy = BOSS.y + BOSS.CURRENT_OFFSET;
        this.dWidth = BOSS.width;
        this.dHeight = BOSS.height;
        this.frameIndex = 1;
        this.maxIndex = 8;
    }

    draw(){

    }

    drawRAW(){
        let bossImage = new Image();
        bossImage.src = IMAGES.FULL_BILL;
        bossImage.addEventListener("load", function() {
            context.drawImage(bossImage, 300, 410, 135, 130 , BOSS.x, BOSS.y + BOSS.CURRENT_OFFSET, BOSS.width, BOSS.height);
        }, false);
    }
}
