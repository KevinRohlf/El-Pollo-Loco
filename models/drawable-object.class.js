class DrawableObject {
    x = 120;
    y = 280;
    img;
    height = 150;
    width = 100;
    imageCache = [];
    currentImage = 0;
    hitboxrender = false;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    }

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

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