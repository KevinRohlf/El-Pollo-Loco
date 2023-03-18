class StatusBarCoin extends StatusBar {
    y = 50;

    Images_Coins = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png'
    ]


    constructor() {
        super();
        this.loadImages(this.Images_Coins);
        this.setPercentage(0, this.Images_Coins);
    } 
}