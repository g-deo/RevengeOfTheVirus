var TopDownGame = TopDownGame || {};

//loading the game assets
TopDownGame.Preload = function(){};

TopDownGame.Preload.prototype = {
  preload: function() {
    //load game assets
    this.load.tilemap('gameMap', 'assets/tilemaps/gameMap.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.tilemap('gameMapEasy', 'assets/tilemaps/gameMapEasy.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.tilemap('gameMapHard', 'assets/tilemaps/gameMapHard.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.image('gameTiles', 'assets/images/backgroundMap.png');
    this.load.image('redBloodCell', 'assets/images/redBloodCell.png');
    //this.load.image('gameTiles2', 'assets/images/backgroundMap_lib.png');
    this.load.spritesheet('defender', 'assets/images/defender.png',128,128,32);
    this.load.image('defenderBullet', 'assets/images/defenderBullet.png');
    this.load.image('preloadbar', '/assets/images/preloader-bar.png');
    this.load.image('arrow','/assets/images/arrow.png');
    
    this.load.image('library', '/assets/images/library.png');
    
    this.load.image('virusA', '/assets/images/virusA.png');
    this.load.image('virusB', '/assets/images/virusB.png');
    this.load.image('virusC', '/assets/images/virusC.png');
    this.load.image('virusD', '/assets/images/virusD.png');
    this.load.image('virusE', '/assets/images/virusE.png');
    
    this.load.spritesheet('virusA_sprite', '/assets/images/virusA_sprite.png',80,80,8);
    this.load.spritesheet('virusB_sprite', '/assets/images/virusB_sprite.png',80,80,8);
    this.load.spritesheet('virusC_sprite', '/assets/images/virusC_sprite.png',80,80,8);
    this.load.spritesheet('virusD_sprite', '/assets/images/virusD_sprite.png',80,80,8);
    this.load.spritesheet('virusE_sprite', '/assets/images/virusE_sprite.png',80,80,8);
    this.load.image('wall', '/assets/images/wall.png');

    this.load.image('intro1', 'assets/images/Intro 1.png');
    this.load.image('intro2', 'assets/images/Intro 2.png');

    //health bar percentages starting at 100%
    this.load.spritesheet('healthbar', '/assets/images/healthbar.png',80,80,10);
    //show loading screen

    //load music
    this.load.audio('bgm', 'assets/sounds/bgm.wav');
    this.load.audio('BGM2', 'assets/sounds/BGM2.wav');
    this.load.audio('BGM3', 'assets/sounds/BGM3.wav');
    this.load.audio('BGM4', 'assets/sounds/BGM4.wav');
    this.load.audio('BGM5', 'assets/sounds/BGM5.wav');
    this.load.audio('BGM6', 'assets/sounds/BGM6.wav');
    this.load.audio('bounce', 'assets/sounds/bounce.wav');
    this.load.audio('explosion', 'assets/sounds/explosion.wav');
    this.load.audio('freeze', 'assets/sounds/freeze.wav');
    this.load.audio('hit', 'assets/sounds/hit.wav');
    this.load.audio('menu', 'assets/sounds/mainMenu.wav');
    this.load.audio('win', 'assets/sounds/win.wav');
    this.load.audio('lose', 'assets/sounds/lose.wav');
    this.load.audio('damage', 'assets/sounds/damage.wav');
  },
  create: function() {
    this.state.start('Cutscene');
  }
};