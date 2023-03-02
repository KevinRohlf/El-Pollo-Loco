class Endboss extends MovableObject {

    width = 300;
    height = 400;
    y = 50;

    images_Walking = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    constructor() {
        super().loadImage(this.images_Walking[0]);
        this.loadImages(this.images_Walking);
        this.x = 700;
        this.animate()
    }

    animate() {

        setInterval(() => {
            this.playAnimation(this.images_Walking)
        }, 200)
    }
}