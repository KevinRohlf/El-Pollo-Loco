class DrawableObject {
    x = 120;
    y = 280;
    img;
    height = 150;
    width = 100;
    imageCache = [];
    currentImage = 0;
    hitboxrender = false;

    /**
     * this function load the image
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * this function draw
     * @param {*} ctx  canvas context
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    }

    /**
     * this function load all images from the array in the cache
     * @param {array} arr 
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }
    
    /**
     * this function draw the hitbox frame
     * @param {*} ctx canvas context
     */
    drawFrame(ctx) {
        if(this.hitboxrender) {
           if (this instanceof Character || this instanceof Chicken || this instanceof Endboss || this instanceof Coin || this instanceof ThrowableObject || this instanceof Bottle) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'red';
            //ctx.rect(this.x + this.offset.left, this.y + this.offset.top, this.width - this.offset.right, this.height - this.offset.bottom);
            ctx.rect(this.x + this.offset.left, this.y + this.offset.top, this.width - this.offset.left - this.offset.right, this.height - this.offset.top - this.offset.bottom);
            ctx.stroke();
        } 
    }
        
    }
}