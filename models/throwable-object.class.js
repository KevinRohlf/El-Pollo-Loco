class ThrowableObject extends MovableObject {
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    }

    images_Hit = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];
    images_Spin = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    constructor(x, y, reverse) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.images_Hit);
        this.loadImages(this.images_Spin);
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 50;
        this.throw(reverse);
        this.animate();
    }

    animate() {
        setInterval(() => {
            if (this.isHurt()) {
                this.playAnimation(this.images_Hit);
            }
        }, 200);

        setInterval(() => {
            if (!this.isHurt()) {
               this.playAnimation(this.images_Spin); 
            }
        }, 100);
    }

    throw(reverse) {
        this.speedY = 30;
        this.applyGravity();
        if (reverse == 'reverse') {
            setInterval(() => {
                this.x -= 5
            }, 25);
        } else {
            setInterval(() => {
                this.x += 5
            }, 25);
        }
    }


}