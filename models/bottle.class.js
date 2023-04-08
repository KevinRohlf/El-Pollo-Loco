class Bottle extends MovableObject {

    height = 60;
    width = 50;

    Image_Bottle = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];


    constructor() {
        super().loadImage(this.Image_Bottle[this.randomBottle()]);
        this.x = 100 + Math.random() * 1200;
        this.y = 380;
    }

    randomBottle() {
        let i  = Math.random();
        if (i < 0.5){
            i = 0;
        } else {
            i = 1;
        };
        return i;
    }
}