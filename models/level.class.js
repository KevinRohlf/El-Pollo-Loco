class Level {
    enemies;
    clouds;
    backgroundObjects;
    coins;
    bottles;
    statusBar;
    statusBarCoin;
    statusBarBottle;
    level_end_x = 2200;
    

    constructor(enemies, clouds, backgroundObjects, coins, bottles, statusBar, statusBarCoin, statusBarBottle) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.bottles = bottles;
        this.statusBar = statusBar;
        this.statusBarCoin = statusBarCoin;
        this.statusBarBottle = statusBarBottle;
    }
}