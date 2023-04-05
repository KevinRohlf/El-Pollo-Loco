class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
    statusBarCoin = new StatusBarCoin();
    statusBarBottle = new StatusBarBottle();
    throwableObjects = [];
    lastThrowTime;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
        this.lastThrowTime = new Date().getTime();
    }

    setWorld() {
        this.character.world = this;
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
            this.deleteThrowObject();
            this.chickenAttack()
            this.enemyDead()
        }, 1000 / 60);
    }

    lastThrow() {
        let timePassed = new Date().getTime() - this.lastThrowTime;
        timePassed = timePassed / 1000;
        return timePassed > 0.5;
    }

    checkThrowObjects() {
        if (this.keyboard.D == true) {
            if (this.character.otherDirection && this.lastThrow()) {
                let bottle = new ThrowableObject(this.character.x, this.character.y + 100, 'reverse');
                this.throwableObjects.push(bottle);
                this.lastThrowTime = new Date().getTime();
                this.character.setLastMoveTime();
            } else if (this.lastThrow()) {
                let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
                this.throwableObjects.push(bottle);
                this.lastThrowTime = new Date().getTime();
                this.character.setLastMoveTime();
            }

        }
    }

    chickenAttack() {
        this.level.enemies.forEach((enemy) => {
            if (enemy.x - this.character.x < 400 && enemy.energy > 0) {
                enemy.rushAttack();
            }
        })
    }

    deleteThrowObject() {
        for (let i = 0; i < this.throwableObjects.length; i++) {

            if (!this.throwableObjects[i].isAboveGround()) {
                this.throwableObjects.splice(i, 1)
            }
        }
    }

    enemyDead() {
        for (let i = 0; i < this.level.enemies.length; i++) {
            if (this.level.enemies[i].energy == 0 && !this.level.enemies[i].deleted) {
                this.level.enemies[i].deleted = true;
                this.deleteEnemy(i);
                console.log(i)
            }
        }

        //this.level.enemies.forEach(enemy , index => {
        //    if (enemy.energy <= 0 && !enemy.deleted){
        //        setTimeout(() => {
        //            this.level.enemies.splice(index, 1)
        //        }, 1000);
        //    };
        //});
    }

    deleteEnemy(i) {
        setTimeout(() => {
            this.level.enemies.splice(i, 1)
        }, 1000);
    }


    checkCollisions() {
        if (!this.character.isHurt()) {
            this.level.enemies.forEach((enemy) => {
                this.collisionWithChicken(enemy);
                this.collisionWithEndboss(enemy)
            });
        }


        this.level.coins.forEach((coin) => {
            if (this.character.isColliding(coin)) {
                this.level.coins.splice(coin, 1)
                this.character.coins += 10;
                console.log(this.character.coins)
                this.statusBarCoin.setPercentage(this.character.coins, this.statusBarCoin.Images_Coins)

            }
        })

        this.throwableObjects.forEach(bottle => {
            this.level.enemies.forEach(e => {
                if (e.isColliding(bottle) && bottle.energy > 0) {
                    e.hit(100);
                    bottle.hit(100);
                }
            });

        });
    }

    collisionWithChicken(enemy) {
        if (this.character.isColliding(enemy) && enemy.energy > 0 && !this.character.isAboveGround() && enemy instanceof Chicken) {
            this.character.hit(5);
            this.statusBar.setPercentage(this.character.energy, this.statusBar.Images_Health)
        }
        if (this.character.isColliding(enemy) && this.character.isAboveGround() && enemy instanceof Chicken && enemy.energy > 0) {
            enemy.energy -= 100;
            this.character.jump('low')
        }
    }

    collisionWithEndboss(enemy) {
        if (this.character.isColliding(enemy) && enemy.energy > 0 && enemy instanceof Endboss) {
            this.character.hit(5);
            this.statusBar.setPercentage(this.character.energy, this.statusBar.Images_Health)
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0)

        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.throwableObjects);
        this.ctx.translate(-this.camera_x, 0);
        //------fixed objects------
        this.addToMap(this.statusBar);
        this.addToMap(this.statusBarCoin);
        this.addToMap(this.statusBarBottle);
        // draw() wird immer wieder aufgerufen
        self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1
        this.ctx.restore();
    }
}