class Coin {
    constructor() {
        this.sx = 1;
        this.sy = 0;
        this.sWidth = 44;
        this.sHeight = 100;
        this.dx = sceneConfig.sceneWidth;
        this.dy = getRandom(sceneConfig.sceneHeight - sceneConfig.offset);
        this.dWidth = 50;
        this.dHeight = 100;
        this.frameIndex = 1;
        this.maxIndex = 8;
        // helpers
        this.iHelper = 0;
        this.iHelperMax = 3;
    }

    draw() {
        let img = new Image();
        img.src = IMAGES.COIN;
        img.addEventListener("load", () => {
            context.drawImage(
                img,
                this.sx +  this.frameIndex * this.sWidth,
                this.sy,
                this.sWidth,
                this.sHeight,
                this.dx,
                this.dy,
                this.dWidth,
                this.dHeight
            )
        }, false);
        if (this.iHelper > this.iHelperMax){
            this.iHelper = 0;
            this.frameIndex++;
            if (this.frameIndex >= this.maxIndex)
                this.frameIndex = 1;
        }else this.iHelper++;
        this.dx-=3;
    }

    getCentreX(){
        return this.dx + this.dWidth/2;
    }

    getCentreY(){
        return this.dy + this.dHeight/2;
    }

    isOK(){
        return !(this.dx < 0 || this.dx > sceneConfig.sceneWidth || this.dy < 0 || this.dy > sceneConfig.sceneHeight);
    }
}
