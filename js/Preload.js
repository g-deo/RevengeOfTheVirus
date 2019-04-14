var TopDownGame = TopDownGame || {};

//loading the game assets
TopDownGame.Preload = function(){};

TopDownGame.Preload.prototype = {
  preload: function() {
    //load game assets
    this.load.tilemap('level1', 'assets/tilemaps/placeholder.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.tilemap('gameMap', 'assets/tilemaps/gameMap.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.image('gameTiles', 'assets/images/backgroundMap.png');
    this.load.image('gameTiles2', 'assets/images/backgroundMap_lib.png');
    this.load.spritesheet('mantis', 'assets/images/praying_mantis.png', 128, 128, 4);
    this.load.spritesheet('defender', 'assets/images/defender.png',128,128,24);
    this.load.image('defenderBullet', 'assets/images/defenderBullet.png');
    this.load.image('preloadbar', '/assets/images/preloader-bar.png');
    
    this.load.image('virusA', '/assets/images/virusA.png');
    
    this.load.image('virusB', '/assets/images/virusB.png');
    this.load.image('wall', '/assets/images/wall.png');
    //show loading screen

    

  },
  create: function() {
    this.state.start('Boot');
  }
};