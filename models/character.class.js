class Character extends MovableObject {
    height = 300;
    width = 130;
    y = 130;
    speed = 10;
    images_Walking = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];
    walking_sound = new Audio('../audio/running2.mp3');

    world;


    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.images_Walking);

        this.animate();
    }

    animate() {
        setInterval(() => {
            this.walking_sound.pause();
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.x += this.speed;
                this.otherDirection = false;
                this.walking_sound.play();
            }
            if (this.world.keyboard.LEFT && this.x > 0) {
                this.x -= this.speed;
                this.otherDirection = true;
                this.walking_sound.play();
            }
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);

        setInterval(() => {
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                //Walk animation
                let i = this.currentImage % this.images_Walking.length;
                let path = this.images_Walking[i];
                this.img = this.imageCache[path];
                this.currentImage++;
            }
        }, 50)




    }

    jump() {

    }
}