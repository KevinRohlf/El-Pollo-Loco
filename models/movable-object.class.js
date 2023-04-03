class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;
    Interval = [];

    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    }


    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    isAboveGround() {
        if (this instanceof ThrowableObject) { // Throwable Objects should always fall
            return this.y < 350;
        } else {
            return this.y < 130;
        }

    }

    setStopableInterval(fn, time) {
        let id = setInterval(fn, time);
        this.Interval.push(id);
    }

    clearIntervals() {
        this.Interval.forEach(clearInterval);
    }

    //isColliding(mo) {
    //    return (this.x + this.width) >= mo.x && this.x <= (mo.x + mo.width) &&
    //        (this.y + this.speedY + this.height) >= mo.y &&
    //        (this.y + this.speedY) <= (mo.y + mo.height);
    //}

    isColliding(mo) {

        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;

    }

    hit(value) {
        this.energy -= value;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit;
        timePassed = timePassed / 1000;
        return timePassed < 1;
    }

    isDead() {
        return this.energy == 0;
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

    jump(low) {
        if (low) {
            this.speedY = 15;
        } else {
            this.speedY = 30;
        }

    }
}