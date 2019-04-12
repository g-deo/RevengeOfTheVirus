var TopDownGame = TopDownGame || {};

//title screen
TopDownGame.Game = function(){};

TopDownGame.Game.prototype = {
  create: function() {



    var bar = this.game.add.graphics();
    bar.beginFill(0x000000, 0.2);
    bar.drawRect(0, 100, 800, 100);


    this.map = this.game.add.tilemap('level1');
    this.viruses = new Array();
    this.mouseDown = false;

    //the first parameter is the tileset name as specified in Tiled, the second is the key to the asset
    //this.map.addTilesetImage('tiles', 'gameTiles');
    this.map.addTilesetImage('placeholderTiles', 'gameTiles');

    //create layer
    this.backgroundlayer = this.map.createLayer('backgroundLayer');
    this.objectLayer = this.map.createLayer('objectLayer');
  },

 
  update: function() {

    if(this.game.input.activePointer.isDown && this.mouseDown == false){
      var gameX = this.game.input.activePointer.positionDown.x + this.game.camera.x;
      var gameY = this.game.input.activePointer.positionDown.y + this.game.camera.y;
      this.viruses.unshift(this.game.add.sprite(gameX, gameY,'mantis'));
      this.game.physics.arcade.enable(this.viruses[0]);
      this.viruses[0].body.velocity.y= -50;
      this.mouseDown=true;
    }

    if(this.game.input.activePointer.isUp && this.mouseDown == true){
      this.mouseDown = false;
    }

    for(var i = 0; i < this.viruses.length; i++){
      if(this.viruses[i].y < -this.viruses[i].height){
        this.viruses[i].destroy();
        this.viruses.splice(i,1);
      }
    }

  }
}