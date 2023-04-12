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
      'img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
      'img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
      'img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png'
   ];
   



   constructor() {
      super();
      this.loadImages(this.Images_Health);
      this.setPercentage(100, this.Images_Health);
   }

   /**
    * this function load the right statusbar image
    * @param {int} percentage stat (energy, coins, bottles)
    * @param {*} images Image Array
    */
   setPercentage(percentage, images) {
      this.percentage = percentage;
      let path = images[this.resolveImageIndex(this.percentage)]
      this.img = this.imageCache[path];
   }

   /**
    * this Function returns the right statusbar Image number
    * @param {int} stat the stat (how much coins,energy or bottles)
    * @returns with image loading
    */
   resolveImageIndex(stat) {
      if (stat >= 100) {
         return 5;
      } else if (stat > 80) {
         return 4;
      } else if (stat > 60) {
         return 3;
      } else if (stat > 40) {
         return 2;
      } else if (stat > 20) {
         return 1;
      } else {
         return 0;
      }
   }

}