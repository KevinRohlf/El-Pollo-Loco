class SmallChicken extends Chicken {

    height = 60;
    width = 50;
    y = 370;



    images_Walking = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    image_Dead = 'img/3_enemies_chicken/chicken_small/2_dead/dead.png';

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.images_Walking);
        this.x = 200 + Math.random() * 1500; // zahl zwischen 200 und 700
        this.speed = 0.15 + Math.random() * 0.25;
        this.animate();
    }
}