var TopDownGame = TopDownGame || {};

//title screen
TopDownGame.Game = function(){};

TopDownGame.Game.prototype = {
  create: function() {





    this.map = this.game.add.tilemap('level1');
    this.viruses = new Array();
    this.mouseDown = false;

    //the first parameter is the tileset name as specified in Tiled, the second is the key to the asset
    //this.map.addTilesetImage('tiles', 'gameTiles');
    this.map.addTilesetImage('placeholderTiles', 'gameTiles');

    //create layer
    this.backgroundlayer = this.map.createLayer('backgroundLayer');
    this.objectLayer = this.map.createLayer('objectLayer');

    
    var text = "[Pause]";
    var style = { font: "30px Arial", fill: "#ffffff", align: "center" };
    var t = this.game.add.text(596, 0, text, style);
    
    t.inputEnabled = true // 开启输入事件
    t.events.onInputUp.add(function() { 
      this.game.paused = true; 
      var style = {fill : '#FFF'}; 
      tx = this.game.add.text(this.game.width * 0.5, this.game.height * 0.5, "Game Paused", style); 
      tx.anchor.set(0.5, 0.5); 
  }, this); 
  this.game.input.onDown.add(function() { 
      if (this.game.paused) { 
       this.game.paused = false; 
       tx.destroy(); 
      }  
  }, this); 
  t.fixedToCamera = true; 

  },

 
  update: function() {

    if(this.game.input.activePointer.isDown && this.mouseDown == false ){
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