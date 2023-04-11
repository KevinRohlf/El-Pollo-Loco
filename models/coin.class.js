class Coin extends MovableObject {


    Image_Coin = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];

    offset = {
        top: 50,
        left: 30,
        right: 30,
        bottom: 50
    }


    constructor(x) {
        super().loadImage(this.Image_Coin[1]);
        this.loadImages(this.Image_Coin);
        this.x = x + Math.random() * 100;
        this.y = 100 + Math.random() * 200;
        this.animate();
    }

    animate() {
        this.setStopableInterval(() => {
            this.playAnimation(this.Image_Coin)
        }, 300);
    }

    randomXY() {
        
    }
}