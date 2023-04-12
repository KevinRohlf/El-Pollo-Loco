class StatusBarEndBoss extends StatusBar {
    y = 50;
    x = 500;

    Images_Health = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png'
    ];


    constructor() {
        super();
        this.loadImages(this.Images_Health);
        this.setPercentage(100, this.Images_Health);
    } 
}