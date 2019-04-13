var TopDownGame = TopDownGame || {};

//title screen
TopDownGame.Game = function(){};

TopDownGame.Game.prototype = {
  create: function() {
    this.map = this.game.add.tilemap('gameMap');
    this.viruses = new Array();
    this.mouseDown = false;
    //Initialized defender sprite
    this.defender = this.game.add.sprite(100, 0,'defender');
    
    // Loaded in the bullet for the defender
    this.weapon = this.game.add.weapon(1,'defenderBullet');
    this.weapon.bulletAngleOffset = -90;
    this.weapon.bulletSpeed = 400;
    this.weapon.trackSprite(this.defender, 14, 0);

    //Created the shooting animation for defender
    this.defender.animations.add('shoot',[0,1,2,3,4,5,6,7], 12, true);
    //Creaded the idle animation for defender
    this.defender.animations.add('idle',[8,9,10,11,12,13,14,15], 12, true);

    //Created the dead animation for defender
    this.defender.animations.add('dead',[16,17,18,19,20,21,22,23], 12, true);

    //Setting the default animation to idle
    this.defender.animatinos.play('idle');

    //Setting speed for the defender (can be changed for changing difficulty)
    this.defender.speed = 1;
    //the first parameter is the tileset name as specified in Tiled, the second is the key to the asset
    this.map.addTilesetImage('gameTiles', 'gameTiles');

    //create layer
    this.backgroundlayer = this.map.createLayer('backgroundLayer');
    this.objectLayer = this.map.createLayer('objectLayer');
  },

 
  update: function() {
    //Creates an array of virus instances with virus[0] being the latest addition to the map
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
    getDefenderPos(this.viruses);
  },
  //Updates position of Defender AI 
  getDefenderPos: function(virusArray){
    var virus = virusArray[0];
    if(virus.x < this.defender.x){
      this.defender.animatinos.play('idle');
      while(virus.x < this.defender.x){
        this.defender.body.velocity.x -= this.defender.speed;
      }
      //Stopping the defender
      this.defender.body.velocity.x = 0;
    }
    else if( virus.x > this.defender.x){
      this.defender.animatinos.play('idle');
      while(virus.x > this.defender.x){
        this.defender.body.velocity.x += this.defender.speed;
      }
      //Stopping the defender
      this.defender.body.velocity.x = 0;      
    }
    else{
      this.defender.animatinos.play('shoot');
      this.defender.body.velocity.x = 0;
      //The defender shoots bullets when he reaches the virus's position
      this.weapon.fire;
    }
  }
}