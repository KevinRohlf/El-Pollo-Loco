class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;
    deleted = false;
    Interval = [];
    world;

    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    };

    /**
     * this function apply gravity
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    /**
     * this function checks if the moveable object is above ground
     * @returns true or false
     */
    isAboveGround() {
        if (this instanceof ThrowableObject || this instanceof Chicken) { // Throwable Objects should always fall
            return this.y < 350;
        } else {
            return this.y < 130;
        }

    }

    /**
     * this function create an interval to the array Interval
     * @param {*} fn function 
     * @param {*} time interval time
     */
    setStopableInterval(fn, time) {
        let id = setInterval(fn, time);
        this.Interval.push(id);
    }

    /**
     * this function clear all intavals in the array interval
     */
    clearIntervals() {
        this.Interval.forEach(clearInterval);
    }

    /**
     * this function checkt if colloding
     * @param {object} mo object is colliding
     * @returns 
     */
    isColliding(mo) {
        return this.x + this.width - this.offset.right >= mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom >= mo.y + mo.offset.top &&
            this.x + this.offset.left <= mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top <= mo.y + mo.height - mo.offset.bottom;
    }

    /**
     * this function makes the object damage
     * @param {int} value damage
     */
    hit(value) {
        this.energy -= value;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * this function checks if the hit cooldown 1s is over
     * @returns true or false
     */
    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit;
        timePassed = timePassed / 1000;
        return timePassed < 1;
    }

    /**
     * this function checks if the character erngy = 0
     * @returns true or false
     */
    isDead() {
        return this.energy == 0;
    }

    /**
     * this function play a animation from the image array
     * @param {array} images 
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * this function make the objekt move to right
     * @param {int} speed 
     */
    moveRight(speed) {
        if (speed) {
            this.speed = speed;
        }
        this.x += this.speed;
    }

    /**
     * this function make the objekt move to left
     * @param {int} speed 
     */
    moveLeft(speed) {
        if (speed) {
            this.speed = speed;
        }
        this.x -= this.speed;
    }

    /**
     * this function make the object jump
     * @param {string} low  low or hight jump
     */
    jump(low) {
        if (low) {
            this.speedY = 15;
        } else {
            this.speedY = 30;
        }

    }

    /**
     * this function is the rush attack from the chickens
     */
    rushAttack() {
        this.speed = 3;
        if (!this.isAboveGround()) {
          this.jump('low')  
        }
        
    }
}