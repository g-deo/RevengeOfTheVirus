var TopDownGame = TopDownGame || {};

//loading the game assets
TopDownGame.Preload = function(){};

TopDownGame.Preload.prototype = {
  preload: function() {
    //load game assets
    this.load.tilemap('level1', 'assets/tilemaps/placeholder.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.tilemap('gameMap', 'assets/tilemaps/gameMap.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.image('gameTiles', 'assets/images/backgroundMap.png');
    this.load.spritesheet('mantis', 'assets/images/praying_mantis.png', 128, 128, 4);
    this.load.spritesheet('defender', 'assets/images/defender.png',128,128,3);
    this.load.image('defenderBullet', 'assets/images/defenderBullet.png');
    this.load.image('preloadbar', '/assets/images/preloader-bar.png');
    //show loading screen
    this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'preloadbar');
    this.preloadBar.anchor.setTo(0.5);
    
    this.load.setPreloadSprite(this.preloadBar);
  },
  create: function() {
    this.state.start('Boot');
  }
};