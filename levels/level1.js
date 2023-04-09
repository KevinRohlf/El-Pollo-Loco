let level1;

function start() {
    let enemys = [
            new Chicken(),
            new SmallChicken(),
            new Chicken(),
            new SmallChicken(),
            new Chicken(),
            new SmallChicken(),
            new Endboss()
        ];
    let clouds = [
            new Cloud()
        ];
    let background = [
            new BackgroundObject('img/5_background/layers/air.png', -719),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -719),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -719),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -719),
            new BackgroundObject('img/5_background/layers/air.png', 0),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/air.png', 719),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719),
            new BackgroundObject('img/5_background/layers/air.png', 719*2),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719*2),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719*2),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719*2),
            new BackgroundObject('img/5_background/layers/air.png', 719*3),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719*3),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719*3),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719*3),
        ];
    let coins = [];
    let bottles = [];
    let statusBar = new StatusBar();
    let statusBarCoin = new StatusBarCoin();
    let statusBarBottle = new StatusBarBottle();

    for (let i = 1 ;i < 15 ; i++) {
        coins.push(new Coin(i * 100),)
    };
    for (let i = 1 ;i < 10 ; i++) {
        bottles.push(new Bottle(i * 100),)
    }

    level1 = new Level(enemys, clouds, background, coins, bottles, statusBar, statusBarCoin, statusBarBottle);

    document.getElementById('startscreen').style = 'display: none;';
    document.getElementById('startbtn').style = 'display: none;';
}

