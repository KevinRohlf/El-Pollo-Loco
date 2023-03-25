class Level {
    enemies;
    clouds;
    backgroundObjects;
    coins = [];
    level_end_x = 2200;

    constructor(enemies, clouds, backgroundObjects, coins) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        //this.coins = coins ;
        this.renderCoinsArray(20 + Math.random() * 25)
    }

    renderCoinsArray(number) {
        for (let i = 1 ;i < number ; i++) {
            this.coins.push(new Coin(i * 100),)
        }

        console.log(number);
    }
}