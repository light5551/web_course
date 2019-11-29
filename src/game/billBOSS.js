class BillBOSS {
    constructor() {
        this.sx = 300;
        this.sy = 410;
        this.sWidth = 135;
        this.sHeight = 130;
        console.log(getCentreBossY());
        this.dx = BOSS.x;
        this.dy = BOSS.y;
        this.dWidth = BOSS.width;
        this.dHeight = BOSS.height;
        this.frameIndex = 0;
        this.maxIndex = 2;

        // states
        this.state = {
            hard : [
                {
                    sx: 0,
                    sy: 575,
                    sw: 140,
                    sh: 135
                },
                {
                    sx: 155 + 5,
                    sy: 570,
                    sw: 140,
                    sh: 130
                }
            ],
            normal: [
                {
                    sx: 300,
                    sy: 410,
                    sw: 135,
                    sh: 130,
                }
            ]
        };
        // helpers
        this.iHelper = 0;
        this.iHelperMax = 5;
    }

    updateBoss(){
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
    }

    drawRAW() {
        this.updateBoss();
        let stateLevel = GAME.COMPLETED > 60 ? HARD_STATE : NORMAL_STATE;
        if (stateLevel === NORMAL_STATE){
            this.maxIndex = 0;
            this.frameIndex = 0;
        }
        else {this.maxIndex = 1;};
        let bossImage = new Image();
        bossImage.src = IMAGES.FULL_BILL;
        let picture = this.state[stateLevel];
        bossImage.addEventListener("load", () => {
            context.drawImage(bossImage,
                picture[this.frameIndex].sx,
                picture[this.frameIndex].sy,
                picture[this.frameIndex].sw,
                picture[this.frameIndex].sh,
                BOSS.x,
                BOSS.y + BOSS.CURRENT_OFFSET,
                BOSS.width,
                BOSS.height);
        }, false);

        if (this.iHelper > this.iHelperMax) {
            this.iHelper = 0;
            this.frameIndex++;
            if (this.frameIndex > this.maxIndex)
                this.frameIndex = 0;
        } else this.iHelper++;
    }
}
