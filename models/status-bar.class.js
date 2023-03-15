class StatusBar extends DrawableObject {

   x = 20;
   y = 0;
   height = 60;
   width = 200;
   percentage = 100;



   Images_Health = [
      'img/7_statusbars/1_statusbar/2_statusbar_health/orange/0.png',
      'img/7_statusbars/1_statusbar/2_statusbar_health/orange/20.png',
      'img/7_statusbars/1_statusbar/2_statusbar_health/orange/40.png',
      'img/7_statusbars/1_statusbar/2_statusbar_health/orange/60.png',
      'img/7_statusbars/1_statusbar/2_statusbar_health/orange/80.png',
      'img/7_statusbars/1_statusbar/2_statusbar_health/orange/100.png'
   ];
   



   constructor() {
      super();
      this.loadImages(this.Images_Health);
      this.setPercentage(100, this.Images_Health);
   }

   setPercentage(percentage, images) {
      this.percentage = percentage;
      let path = images[this.resolveImageIndex()]
      this.img = this.imageCache[path];
   }

   resolveImageIndex() {
      if (this.percentage == 100) {
         return 5;
      } else if (this.percentage > 80) {
         return 4;
      } else if (this.percentage > 60) {
         return 3;
      } else if (this.percentage > 40) {
         return 2;
      } else if (this.percentage > 20) {
         return 1;
      } else {
         return 0;
      }
   }

}