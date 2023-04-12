class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    throwableObjects = [];
    lastThrowTime;
    Interval = [];
    gameOver = false;
    endFight = false;

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

    setStopableInterval(fn, time) {
        let id = setInterval(fn, time);
        this.Interval.push(id);
    }

    clearIntervals() {
        this.Interval.forEach(clearInterval);
    }

    run() {
        this.setStopableInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
            this.deleteThrowObject();
            this.chickenAttack();
            this.enemyDead();
            this.endbossFight();
            this.checkEnd();
        }, 1000 / 60);
    }

    lastThrow() {
        let timePassed = new Date().getTime() - this.lastThrowTime;
        timePassed = timePassed / 1000;
        return timePassed > 0.5;
    }

    checkThrowObjects() {
        if (this.keyboard.D == true && this.character.bottles > 0 && !this.gameOver) {
            if (this.character.otherDirection && this.lastThrow()) {
                this.throwBottle('left')
            } else if (this.lastThrow()) {
                this.throwBottle('right')
            }
        }
    }

    throwBottle(direction) {
        let bottle;
        if (direction == 'right'){
            bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
        } else if (direction == 'left'){
            bottle = new ThrowableObject(this.character.x, this.character.y + 100, 'reverse');
        };
                this.throwableObjects.push(bottle);
                this.lastThrowTime = new Date().getTime();
                this.character.setLastMoveTime();
                this.character.bottles -= 10;
                this.level.statusBarBottle.setPercentage(this.character.bottles, this.level.statusBarBottle.Images_Bottle)
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
                setTimeout(() => {
                    if (this.level.enemies[i].deleted) {
                        this.level.enemies.splice(i, 1)
                    }
                }, 1000);
            }
        }
    }

    endbossFight() {
        this.level.enemies.forEach(enemy => {
            if (enemy instanceof Endboss && this.character.x >= 1300 || enemy.activate) {
                if (enemy.energy > 0 && !enemy.isHurt()){
                    enemy.run(this.character)
                }
                this.endFight = true;
                enemy.activate = true;
            }
        });
    }

    checkEnd() {
        this.checkIfCharacterDead();
        this.checkIfEndbossDead();
    }

    checkIfEndbossDead() {
        this.level.enemies.forEach(enemy => {
            if (enemy instanceof Endboss && enemy.energy <= 0) {
                setTimeout(() => {
                    this.character.clearIntervals();
                    this.gameOver = true;
                    document.getElementById('restartBtn').classList.remove('d-none');
                    document.getElementById('gameOver').classList.remove('d-none');
                }, 1000);
            }
        })
    }

    checkIfCharacterDead() {
        if (this.character.energy <= 0) {
            setTimeout(() => {
                this.character.clearIntervals();
                this.level = level2;
                this.gameOver = true;
                document.getElementById('restartBtn').classList.remove('d-none');
                document.getElementById('lost').classList.remove('d-none');
            }, 500);
        }
    }


    checkCollisions() {
        if (!this.character.isHurt()) {
            this.level.enemies.forEach((enemy) => {
                this.collisionWithChicken(enemy);
                this.collisionWithEndboss(enemy)
            });
        };
        this.collisionWithCoin();
        this.collisionWithBottle();
        this.collisionWithThrowableObject();
    }

    collisionWithThrowableObject() {
        this.throwableObjects.forEach(bottle => {
            this.level.enemies.forEach(e => {
                if (e.isColliding(bottle) && bottle.energy > 0) {
                    e.hit(100);
                    bottle.hit(100);
                };
                if (e instanceof Endboss) {
                    this.level.statusBarEndboss.setPercentage(e.energy / 4.5, this.level.statusBarEndboss.Images_Health)
                }
            });
        });
    }

    collisionWithBottle() {
        this.level.bottles.forEach((bottle) => {
            if (this.character.isColliding(bottle)) {
                this.level.bottles.splice(bottle, 1)
                this.character.bottles += 10;
                console.log(this.character.bottles)
                this.level.statusBarBottle.setPercentage(this.character.bottles, this.level.statusBarBottle.Images_Bottle)
            }
        })
    }

    collisionWithCoin() {
        for (let i = 0; i < this.level.coins.length; i++) {
            let coin = this.level.coins[i];
            if (this.character.isColliding(coin)) {
                this.level.coins.splice(i, 1)
                this.character.coins += 10;
                this.level.statusBarCoin.setPercentage(this.character.coins, this.level.statusBarCoin.Images_Coins)
            }
        }
    }

    collisionWithChicken(enemy) {
        if (this.character.isColliding(enemy) && enemy.energy > 0 && !this.character.isAboveGround() && enemy instanceof Chicken) {
            this.character.hit(5);
            this.level.statusBar.setPercentage(this.character.energy, this.level.statusBar.Images_Health)
        }
        if (this.character.isColliding(enemy) && this.character.isAboveGround() && enemy instanceof Chicken && enemy.energy > 0) {
            enemy.energy -= 100;
            this.character.jump('low')
        }
    }

    collisionWithEndboss(enemy) {
        if (this.character.isColliding(enemy) && enemy.energy > 0 && enemy instanceof Endboss) {
            this.character.hit(20);
            this.level.statusBar.setPercentage(this.character.energy, this.level.statusBar.Images_Health)
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0)

        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        if (!this.gameOver) {
            this.addToMap(this.character);
            this.addObjectsToMap(this.level.enemies);
            this.addObjectsToMap(this.level.coins);
            this.addObjectsToMap(this.level.bottles);
            this.addObjectsToMap(this.throwableObjects);
        };
        this.ctx.translate(-this.camera_x, 0);
        //------fixed objects------
        if (!this.gameOver) {
            this.addToMap(this.level.statusBar);
            this.addToMap(this.level.statusBarCoin);
            this.addToMap(this.level.statusBarBottle);
            if(this.endFight){
                this.addToMap(this.level.statusBarEndboss);  
            }
            
        }

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