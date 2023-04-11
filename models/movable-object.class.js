class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;
    deleted = false;
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
        
        if (this instanceof ThrowableObject || this instanceof Chicken) { // Throwable Objects should always fall
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


    isColliding(mo) {
        return this.x + this.width - this.offset.right >= mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom >= mo.y + mo.offset.top &&
            this.x + this.offset.left <= mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top <= mo.y + mo.height - mo.offset.bottom;
    }

    //isColliding (obj) {
    //    return  (this.x + this.width) >= obj.x && this.x <= (obj.x + obj.width) && 
    //            (this.y + this.offset.bottom + this.height) >= obj.y &&
    //            (this.y + this.offset.bottom) <= (obj.y + obj.height)
    //}

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

    moveRight(speed) {
        if (speed) {
            this.speed = speed;
        }
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

    rushAttack() {
        this.speed = 3;
        if (!this.isAboveGround()) {
          this.jump('low')  
        }
        
    }
}