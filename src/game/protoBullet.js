class protoBullet{
    constructor(x=getCentreBossX(), y=getCentreBossY(), auto=true, colour='#000000'){
        this.x = x;
        this.y = y;
        this.colour = colour;
        this.auto = auto;
        this.nextX = x + 1;
        this.nextY = y + 1;
        this.editWay();
        shootSound.currentTime = 0;
        shootSound.play();
        //
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
        let x0 = getCentrePlayerX(),
            y0 = getCentrePlayerY(),
            x1 = this.x,
            y1 = this.y;

        this.k = (y0 - y1)/(x0 - x1);
        this.b = y1 - this.k * x1;
    }

    isOK(){
        return !(this.x < 0 || this.x > sceneConfig.sceneWidth || this.y < 0 || this.y > sceneConfig.sceneHeight);
    }
}