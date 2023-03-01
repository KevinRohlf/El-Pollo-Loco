class Chicken extends MovableObject {
    y = 350;
    height = 80;
    width = 70;
    images_Walking = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];
    currentImage = 0;


    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.images_Walking);

        this.x = 200 + Math.random() * 500; // zahl zwischen 200 und 700
        this.speed = 0.15 + Math.random() * 0.25;
        this.animate();
    }

    animate() {      
        this.moveLeft();  
        setInterval(() => {
            let i = this.currentImage % this.images_Walking.length;
            let path = this.images_Walking[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }, 200)
    }
}