var TopDownGame = TopDownGame || {};

//title screen
TopDownGame.Game = function(){};

TopDownGame.Game.prototype = {
  
  create: function() {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.stage.backgroundColor = '#000000';
    this.background = this.game.add.sprite(0,0,'gameTiles');
    this.background.x = this.game.world.centerX;
    this.background.y = this.game.world.centerY;
    this.background.anchor.set(0.5,0.5);

    this.libLine = new Phaser.Line(750, 0, 750, 1200);
    this.spawnLine = new Phaser.Line(0, 1000, 750, 1000);
    
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
 //   this.map = this.game.add.tilemap('gameMap');
    this.viruses = new Array();

    this.mouseDown = false;
    this.targeting = false;
    
    //the first parameter is the tileset name as specified in Tiled, the second is the key to the asset
    //this.map.addTilesetImage('gameTiles', 'gameTiles');

    //create layer
  //  this.backgroundlayer = this.map.createLayer('backgroundLayer');
  //  this.objectLayer = this.map.createLayer('objectLayer');

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
 //   var result = this.findObjectsByType('defender', this.map, 'objectLayer');
    this.defender = this.game.add.sprite(100, 100, 'defender');
    this.defender.anchor.set(0.5, 0.5);
    this.defender.frame = 8;
    this.game.physics.enable(this.defender, Phaser.Physics.ARCADE);
    //Created the shooting animation for defender
    var shoot = this.defender.animations.add('shoot');

    //Creaded the idle animation for defender
    var idle = this.defender.animations.add('idle');

    //Created the dead animation for defender
    var dead = this.defender.animations.add('dead');

    //Setting the default animation to idle
    this.defender.animations.play('idle');

    //Setting speed for the defender (can be changed for changing difficulty)
    this.defender.speed = 1;
    
    var text = "[Pause]";
    var style = { font: "30px Arial", fill: "#ffffff", align: "center" };
    var t = this.game.add.text(10, 10, text, style);
    
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

  var currentvirus = "";
  var left = 10;
  this.virusesLeft = left;

  var libtext = "Library Of Virus";
  var libstyle = { font: "50px Arial", fill: "#ffffff", align: "center" };
  var lib = this.game.add.text(800, 10, libtext, libstyle);

  var virusA = this.game.add.image(800,100,'virusA');

  var virusA_name = "Virus A";

  var virusA_cost = 5;
  var virusA_skill = "None";
  var vAtext = virusA_name+"\nCost: "+virusA_cost+"\nSkill: "+virusA_skill;
  var vAstyle = { font: "30px Arial", fill: "#ffffff", align: "left" };
  var vA = this.game.add.text(900, 90, vAtext, vAstyle);

  var virusB = this.game.add.image(800,250,'virusB');
  var virusB_name = "Virus B";

  var virusB_cost = 5;
  var virusB_skill = "None";
  var vBtext = virusB_name+"\nCost: "+virusB_cost+"\nSkill: "+virusB_skill;
  var vBstyle = { font: "30px Arial", fill: "#ffffff", align: "left" };
  var vB = this.game.add.text(900, 240, vBtext, vBstyle); 

  
  
  var limittext = "Virus Left: "+left;
  var limitstyle = { font: "30px Arial", fill: "#ffffff", align: "left" };
  var limit = this.game.add.text(800, 1000, limittext, limitstyle); 
  
  
  var currenttext = "Selected Virus: "+currentvirus;
  var currentstyle = { font: "30px Arial", fill: "#ffffff", align: "left" };
  var current = this.game.add.text(800, 1050, currenttext, currentstyle); 
  virusA.inputEnabled = true;

  virusA.events.onInputDown.add(function(){

    currentvirus = virusA_name;
    current.text =  "Selected Virus: "+currentvirus;
  }
  );
  virusB.inputEnabled = true;

  virusB.events.onInputDown.add(function(){

    currentvirus = virusB_name;
    current.text =  "Selected Virus: "+currentvirus;
  }
  );



    
  
  },

 
  update: function() {
    
    //Creates an array of virus instances with virus[0] being the latest addition to the map
    if(this.game.input.activePointer.isDown && this.mouseDown == false){
      var gameX = this.game.input.activePointer.positionDown.x + this.game.camera.x;
      var gameY = this.game.input.activePointer.positionDown.y + this.game.camera.y;
      if(this.targeting){
        var difX = this.targetingLine.end.x - this.targetingLine.start.x;
        var difY = this.targetingLine.end.y - this.targetingLine.start.y;
        if(difX == 0) {
          if(difY < 0) this.viruses[0].body.velocity.y = -100;
          if(difY > 0) this.viruses[0].body.velocity.y = 100;
        }
        else if(difY == 0){
          if(difY < 0) this.viruses[0].body.velocity.y = -100;
          if(difY > 0) this.viruses[0].body.velocity.y = 100;
        }
        else{
          var pythag = Math.sqrt(Math.pow(difX,2) + Math.pow(difY,2));
          this.viruses[0].body.velocity.y = difY/pythag*100;
          this.viruses[0].body.velocity.x = difX/pythag*100;
        }
        this.targeting = false;
      }
      if(gameX < this.libLine.start.x-80 && gameY > this.spawnLine.start.y){
        if (currentvirus = "virusA"){
          var virus = this.game.add.sprite(gameX, gameY,'virusA');
        }else if (currentvirus = "virusB"){
          var virus = this.game.add.sprite(gameX, gameY,'virusB');
        }else {
          
        }
        this.game.physics.arcade.enable(virus, Phaser.Physics.ARCADE);
        
        virus.body.immovable = false;
        virus.body.collideWorldBounds = true;
        virus.body.bounce.set(1,1);
        //virus.body.velocity.y= -50;
        this.mouseDown=true;
        this.renderingLine = true;
        this.viruses.unshift(virus);
      }
      
    }
    
    if(this.targeting && this.game.input.activePointer.x < this.libLine.start.x){
      var current = this.viruses[0];
      this.targetingLine = new Phaser.Line(current.x + current.width/2,current.y+current.height/2,this.game.input.activePointer.x,this.game.input.activePointer.y);      
    }

    //  This boolean controls if the player should collide with the world bounds or not
    
    if(this.game.input.activePointer.isUp && this.mouseDown == true){
      this.mouseDown = false;
      this.targeting = true;
    }

    for(var i = 0; i < this.viruses.length; i++){
      if(this.viruses[i].y < -this.viruses[i].height){
        this.viruses[i].destroy();
        this.viruses.splice(i,1);
      }
    }
 //   this.getDefenderPos(this.viruses);
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
  render: function(){
    this.game.debug.geom(this.libLine);
    this.game.debug.geom(this.spawnLine);
    if(this.targeting) this.game.debug.geom(this.targetingLine);
  }

  // findObjectsByType: function(type, map, layer) {
 //   var result = new Array();
  //  map.objects[layer].forEach(function(element){
 //     if(element.properties.type === type) {
        //Phaser uses top left, Tiled bottom left so we have to adjust
        //also keep in mind that the cup images are a bit smaller than the tile which is 16x16
        //so they might not be placed in the exact position as in Tiled
 //       element.y -= map.tileHeight;
  //      result.push(element);
 //     }      
 //   });
 //   return result;
  //  },
  
  
  }

  //find objects in a Tiled layer that containt a property called "type" equal to a certain value

