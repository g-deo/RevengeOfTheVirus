var TopDownGame = TopDownGame || {};

//title screen
TopDownGame.Game = function(){};

TopDownGame.Game.prototype = {
  create: function() {
    
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.map = this.game.add.tilemap('gameMap');
    this.viruses = new Array();
    this.mouseDown = false;
    
    //the first parameter is the tileset name as specified in Tiled, the second is the key to the asset
    this.map.addTilesetImage('gameTiles', 'gameTiles');

    //create layer
    this.backgroundlayer = this.map.createLayer('backgroundLayer');
    this.objectLayer = this.map.createLayer('objectLayer');

    // Loaded in the bullet for the defender
    this.bullets = {speed: 300};
    this.fireRate = 100;
    this.nextFire = 0;
    //Direction in y axis
    this.bullets.direction = 1;
    
    this.bullets = this.game.add.group();
    this.bullets.enableBody = true;
    this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
    this.bullets.createMultiple(50, 'defenderBullet');
    this.bullets.setAll('checkWorldBounds', true);

    //Initialized defender sprite
    var result = this.findObjectsByType('defender', this.map, 'objectLayer');
    this.defender = this.game.add.sprite(result[0].x, result[0].y, 'defender');
    this.defender.anchor.set(0.5, 0.5);
    this.defender.frame = 8;
    this.game.physics.enable(this.defender, Phaser.Physics.ARCADE);
    //Created the shooting animation for defender
    var shoot = this.defender.animations.add('shoot', [0,1,2,3,4,5,6,7], 12, true);

    //Creaded the idle animation for defender
    var idle = this.defender.animations.add('idle',[8,9,10,11,12,13,14,15], 12, true);

    //Created the dead animation for defender
    var dead = this.defender.animations.add('dead',[16,17,18,19,20,21,22,23], 12, true);

    //Setting the default animation to idle
    this.defender.animations.play('idle',12,true);

    //Setting speed for the defender (can be changed for changing difficulty)
    this.defender.speed = 1;
    
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
    this.getDefenderPos(this.viruses);
  },
  
  //Updates position of Defender AI 
  getDefenderPos: function(virusArray){
    var virus = virusArray[0];
    if(virus.x < this.defender.x){
      this.defender.animations.play('idle',12,true);
      while(virus.x < this.defender.x){
        this.defender.body.velocity.x -= this.defender.speed;
      }
      //Stopping the defender
      this.defender.body.velocity.x = 0;
    }
    else if( virus.x > this.defender.x){
      this.defender.animations.play('idle', 12, true);
      while(virus.x > this.defender.x){
        this.defender.body.velocity.x += this.defender.speed;
      }
      //Stopping the defender
      this.defender.body.velocity.x = 0;      
    }
    else{
      this.defender.animations.play('shoot', 12, true);
      this.defender.body.velocity.x = 0;
      //The defender shoots bullets when he reaches the virus's position
      this.fire();
    }
  },
  fire: function(){
    if (this.game.time.now > nextFire && this.bullets.countDead() > 0)
    {
        nextFire = this.game.time.now + fireRate;

        var bullet = this.bullets.getFirstDead();

        bullet.reset(sprite.x - 8, sprite.y - 8);

        game.physics.arcade.moveToPointer(bullet, 300);
    }
  },

  //find objects in a Tiled layer that containt a property called "type" equal to a certain value
  findObjectsByType: function(type, map, layer) {
    var result = new Array();
    map.objects[layer].forEach(function(element){
      if(element.properties.type === type) {
        //Phaser uses top left, Tiled bottom left so we have to adjust
        //also keep in mind that the cup images are a bit smaller than the tile which is 16x16
        //so they might not be placed in the exact position as in Tiled
        element.y -= map.tileHeight;
        result.push(element);
      }      
    });
    return result;
    },
}