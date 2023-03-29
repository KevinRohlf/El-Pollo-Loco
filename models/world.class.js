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

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld() {
        this.character.world = this;
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
            this.deleteThrowObject();
        }, 200);
    }

    checkThrowObjects() {
        if (this.keyboard.D == true) {
            if (this.character.otherDirection) {
                let bottle = new ThrowableObject(this.character.x, this.character.y + 100, 'reverse');
                this.throwableObjects.push(bottle);                
            } else {
                let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
                this.throwableObjects.push(bottle);                
            }

        }
    }

    deleteThrowObject() {
        for (let i = 0; i < this.throwableObjects.length; i++) {

            if (!this.throwableObjects[i].isAboveGround() || this.throwableObjects[i].energy <= 0) {
                this.throwableObjects.splice(i, 1)
            }
        }
    }


    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && enemy.energy > 0) {
                this.character.hit(5);
                this.statusBar.setPercentage(this.character.energy, this.statusBar.Images_Health)
            }
        });

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
                if (e.isColliding(bottle)) {
                    e.hit(100);
                    bottle.hit(40);
                }
            });

        });
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