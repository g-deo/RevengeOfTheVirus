var TopDownGame = TopDownGame || {};
 
TopDownGame.PrePreload = function(){};
 
//setting game configuration and loading the assets for the loading screen
TopDownGame.PrePreload.prototype = {
  preload: function() {
    //assets we'll use in the loading screen
    this.load.image('loading_bg','/assets/images/loadingbg.png');
    this.load.spritesheet('virusB_sprite', '/assets/images/virusB_sprite.png',80,80,8);
  },
  create: function() {
    //scaling options
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    
    //have the game centered horizontally
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true; 

    this.state.start('Preload');
  }
};