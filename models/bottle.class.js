class Bottle extends MovableObject {

    height = 60;
    width = 50;

    Image_Bottle = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];

    offset = {
        top: 10,
        left: 20,
        right: 20,
        bottom: 10
    }


    constructor(x) {
        super().loadImage(this.Image_Bottle[this.randomBottle()]);
        this.x = x + Math.random() * 50;
        this.y = 380;
    }

    /**
     * this function return random 0 or 1
     * @returns 0 or 1
     */
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