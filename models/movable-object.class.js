class MovableObject {
    x = 120;
    y = 280;
    img;
    height = 150;
    width = 100;
    imageCache = [];
    currentImage = 0;
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;


    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    isAboveGround() {
        return this.y < 130
    }

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    }

    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof Endboss) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'red';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }

    /*isColliding(mo) {
        return this.x + this.width > mo.x &&
            this.y + this.height >mo.y &&
            this.x < mo.x &&
            this.y < mo.y + mo.height;
    }*/

    isColliding (mo) {
        return  (this.x + this.width) >= mo.x  && this.x  <= (mo.x + mo.width) &&
        (this.y + this.speedY + this.height) >= mo.y &&
        (this.y + this.speedY) <= (mo.y + mo.height);
    }

    hit() {
        this.energy -= 5;  
        if(this.energy < 0){
            this.energy = 0;
        };       
    }

    /*{
        return  (this.x + this.width) >= mo.x  && this.x  <= (mo.x + mo.width) &&
        (this.y + this.speedY + this.height) >= mo.y &&
        (this.y + this.speedY) <= (mo.y + mo.height);
    }*/

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });

    }



    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    moveRight() {

        this.x += this.speed;
    }

    moveLeft(speed) {
        if (speed) {
            this.speed = speed;
        }
        this.x -= this.speed;
    }

    jump() {
        this.speedY = 30;
    }
}