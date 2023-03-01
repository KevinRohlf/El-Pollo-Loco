class Character extends MovableObject {
    height = 300;
    width = 130;
    y = 130;
    images_Walking = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];
    currentImage = 0;


    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.images_Walking);

        this.animate();
    }

    animate() {
        setInterval(() => {
            let i = this.currentImage % this.images_Walking.length;
            let path = this.images_Walking[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }, 100)
        
    }

    jump() {

    }
}