class Endboss extends MovableObject {

    width = 300;
    height = 400;
    y = 50;
    energy = 500;

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

    images_Intro = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ]
    images_IsHurt = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];
    images_IsDead = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];


    constructor() {
        super().loadImage(this.images_Walking[0]);
        this.loadImages(this.images_Walking);
        this.loadImages(this.images_IsHurt);
        this.loadImages(this.images_IsDead);
        this.x = 1700;
        this.animate();
    }

    animate() {

        setInterval(() => {
            if (this.energy <= 0) {
                this.playAnimation(this.images_IsDead);
                setTimeout(() => {
                    this.x = -20000;
                }, 1000);
            }else if (this.isHurt()){
                this.playAnimation(this.images_IsHurt);
            }else {
                this.playAnimation(this.images_Walking);
            }
            
        }, 200)
    }
}