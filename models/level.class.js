class Level {
    enemies;
    clouds;
    backgroundObjects;
    coins = [];
    bottles = [];
    level_end_x = 2200;

    constructor(enemies, clouds, backgroundObjects, coins, bottle) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        //this.coins = coins ;
        this.renderCoinsArray(20 + Math.random() * 25)
        this.renderBottlesArray(5 + Math.random() * 10)
    }

    renderCoinsArray(number) {
        for (let i = 1 ;i < number ; i++) {
            this.coins.push(new Coin(i * 100),)
        }

        console.log(number);
    }

    renderBottlesArray(number) {
        for (let i = 1 ;i < number ; i++) {
            this.bottles.push(new Bottle(),)
        }

        console.log(number);
    }
}