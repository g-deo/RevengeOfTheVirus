var TopDownGame = TopDownGame || {};

//loading the game assets
TopDownGame.Preload = function(){};

TopDownGame.Preload.prototype = {
  preload: function() {
    //show loading screen
    this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'preloadbar');
    this.preloadBar.anchor.setTo(0.5);

    this.load.setPreloadSprite(this.preloadBar);

    //load game assets
    
    this.load.tilemap('level1', 'assets/tilemaps/levelx.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.image('gameTiles', 'assets/images/dungeonTiles.png');
    //this.load.image('player', 'assets/images/player.png');
    this.load.spritesheet('mantis', 'assets/images/praying_mantis.png', 128, 128, 4);
    
  },
  create: function() {
    this.state.start('Game');
  }
};