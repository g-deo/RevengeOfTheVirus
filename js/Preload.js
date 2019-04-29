var TopDownGame = TopDownGame || {};

//loading the game assets
TopDownGame.Preload = function(){};

TopDownGame.Preload.prototype = {
  preload: function() {
    //load game assets
    this.load.tilemap('gameMap', 'assets/tilemaps/gameMap.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.image('gameTiles', 'assets/images/backgroundMap.png');
    this.load.image('redBloodCell', 'assets/images/redBloodCell.png');
    //this.load.image('gameTiles2', 'assets/images/backgroundMap_lib.png');
    this.load.spritesheet('defender', 'assets/images/defender.png',128,128,24);
    this.load.image('defenderBullet', 'assets/images/defenderBullet.png');
    this.load.image('preloadbar', '/assets/images/preloader-bar.png');
    
    this.load.image('library', '/assets/images/library.png');
    
    this.load.image('virusA', '/assets/images/virusA.png');
    this.load.image('virusB', '/assets/images/virusB.png');
    this.load.image('virusC', '/assets/images/virusC.png');
    this.load.image('virusD', '/assets/images/virusD.png');
    this.load.image('virusE', '/assets/images/virusE.png');
    
    this.load.spritesheet('virusA_sprite', '/assets/images/virusA_sprite.png',80,80,4);
    this.load.spritesheet('virusB_sprite', '/assets/images/virusB_sprite.png',80,80,4);
    this.load.spritesheet('virusC_sprite', '/assets/images/virusC_sprite.png',80,80,4);
    this.load.spritesheet('virusD_sprite', '/assets/images/virusD_sprite.png',80,80,4);
    this.load.spritesheet('virusE_sprite', '/assets/images/virusE_sprite.png',80,80,4);
    this.load.image('wall', '/assets/images/wall.png');

    //health bar percentages starting at 100%
    this.load.spritesheet('healthbar', '/assets/images/healthbar.png',80,80,10);
    //show loading screen

    //load music
    this.load.audio('bgm', 'assets/sounds/bgm.wav');
    this.load.audio('bounce', 'assets/sounds/bounce.wav');
    this.load.audio('explosion', 'assets/sounds/explosion.wav');
    this.load.audio('freeze', 'assets/sounds/freeze.wav');
    this.load.audio('hit', 'assets/sounds/hit.wav');

  },
  create: function() {
    this.state.start('Boot');
  }
};