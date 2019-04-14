var TopDownGame = TopDownGame || {};

//title screen
TopDownGame.Game = function(){};

var counter = 0;
TopDownGame.Game.prototype = {
  
  create: function() {

    //
    this.game.bounds = 100;
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.stage.backgroundColor = '#000000';
    this.background = this.game.add.sprite(0,0,'gameTiles');
    this.background.x = this.game.world.centerX;
    this.background.y = this.game.world.centerY;
    this.background.anchor.set(0.5,0.5);

    //this.libLine = new Phaser.Line(750, 0, 750, 1200);
    this.spawnLine = new Phaser.Line(0, 1000, 1200, 1000);
    
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
    this.fireRate = 450;
    this.nextFire = 0;
    //Direction in y axis
    this.bullets.direction = 1;
    
    this.bullets = this.game.add.group();
    this.bullets.enableBody = true;
    this.bullets.physicsBodyType = Phaser.Physics.ARCADE;

    //Initialized defender sprite
 //   var result = this.findObjectsByType('defender', this.map, 'objectLayer');
    this.defender = this.game.add.sprite(100, 100, 'defender');
    this.defender.anchor.set(0.5, 0.5);
    this.defender.frame = 8;
    this.game.physics.enable(this.defender, Phaser.Physics.ARCADE);
    //Created the shooting animation for defender
    var shoot = this.defender.animations.add('shoot', [0,1,2,3,4,5,6,7], 10, true);

    //Creaded the idle animation for defender
    var idle = this.defender.animations.add('idle', [8,9,10,11,12,13,14,15], 10, true);

    //Created the dead animation for defender
    var dead = this.defender.animations.add('dead', [16,17,18,19,20,21,22,23], 10, true);

    //Setting the default animation to idle
    this.defender.frame = 8;

    //Setting speed for the defender (can be changed for changing difficulty)
    this.defender.speed = 1;
    
    var text = "[Pause]";
    var style = { font: "30px Arial", fill: "#ffffff", align: "center" };
    var t = this.game.add.text(10, 10, text, style);
    
    
  

    
   
 // var conttext = "continue";
 //   var contstyle = { font: "30px Arial", fill: "#ffffff", align: "center" };
 //   var cont = this.game.add.text(10, 200, conttext, contstyle);
 //   cont.inputEnabled = true // 开启输入事件
  //  cont.events.onInputDown.add(function() { 
  //    if (this.game.paused){
 //     this.game.paused = false;
  //    tx.destroy(); 
  //  }  }, this); 
 // this.game.input.onDown.add(function() { 
 //     if (this.game.paused) { 
 //      this.game.paused = false; 
  //     tx.destroy(); 
 //     }  
 // }, this); 


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
  vA.disble = true;
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


//  this.wall=this.game.add.image(600,0,'wall');
  
  //this.game.physics.arcade.enable(this.wall, Phaser.Physics.ARCADE);
  lib.visible=false;
  current.visible=false;
  limit.visible=false;
  vB.visible=false;
  vA.visible=false;
  virusA.visible=false;
  virusB.visible=false;

  var libtext2 = "[Lib open]";
  var libstyle2 = { font: "30px Arial", fill: "#ffffff", align: "center" };
  var lib2 = this.game.add.text(10, 100, libtext2, libstyle2);
  
    
  lib2.inputEnabled = true;
  lib2.events.onInputDown.add(function(){ 
      lib.visible=true;
      current.visible=true;
      limit.visible=true;
      vB.visible=true;
      vA.visible=true;
      virusA.visible=true;
      virusB.visible=true;
    }
);
  var libclosetext = "[Lib close]";
  var libclosestyle = { font: "30px Arial", fill: "#ffffff", align: "center" };
  var libclose = this.game.add.text(10, 50, libclosetext, libclosestyle);
  
    
  libclose.inputEnabled = true;
  libclose.events.onInputDown.add(function(){
    lib.visible=false;
    current.visible=false;
    limit.visible=false;
    vB.visible=false;
    vA.visible=false;
    virusA.visible=false;
    virusB.visible=false;
    
  }
  );
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

   t.inputEnabled = true // 开启输入事件
 t.events.onInputUp.add(function() { 
   this.game.paused = true; 
   var style = {fill : '#FFF'}; 
   tx = this.game.add.text(this.game.width * 0.5, this.game.height * 0.5, "Press Enter to continue", style); 
   tx.anchor.set(0.5, 0.5); 
}, this); 
var key1 =this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
key1.onDown.add(function(){
  this.game.paused = false; 
  tx.destroy();
}, this);
  t.fixedToCamera = true; 


  var virus;
  
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
      if(gameX < 1200-80 && gameY > 1000){
        if (currentvirus = "virusA"){
          var virus = this.game.add.sprite(gameX, gameY,'virusA');
          this.game.physics.enable(virus, Phaser.Physics.ARCADE);

        }else if (currentvirus = "virusB"){
          var virus = this.game.add.sprite(gameX, gameY,'virusB');
        }else {
          
        }
        this.bouncewall(virus);
        this.game.physics.arcade.collide(virus, this.wall);
        virus.body.immovable = false;
        virus.body.collideWorldBounds = true;
        virus.body.bounce.set(1,1);
        //virus.body.velocity.y= -50;
        this.mouseDown=true;
        this.renderingLine = true;
        this.viruses.unshift(virus);
      }
      
    }
    



    if(this.targeting && this.game.input.activePointer.x < 1200){
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
    if(this.viruses.length >= 1){
    this.getDefenderPos(this.viruses);
    
    this.hide(this.virusA);
    }
  },  bouncewall: function(virus){
    if (virus.x>=750){
      virus.body.velocity.x = 0;
      virus.body.velocity.y = 0;
    }

  },hide: function(obj){
  },


  //Updates position of Defender AI 
  getDefenderPos: function(virusArray){
    var virus = virusArray[0];
    //Equating defender.x to virus.x + defender.width/3 because they aren't
    //lining up optherwise 
    if(this.defender.x < (virus.x + this.defender.width/3)){
      this.defender.x += this.defender.speed;
    }
    else if(this.defender.x > (virus.x + this.defender.width/3)){
      this.defender.x -= this.defender.speed;
    }
    //this.defender.animations.stop(null,true);
    if (this.defender.x === Math.round(virus.x + this.defender.width/3)){
      //The defender shoots bullets when he reaches the virus's position
      this.fire(virus);
    }
  },
  fire: function(virus){
    this.defender.animations.play('shoot', 18, true);
    //Loading the bullets
    this.bullets.createMultiple(1, 'defenderBullet');
    this.bullets.setAll('checkWorldBounds', true);
    if (this.game.time.now > this.nextFire && this.bullets.countDead() > 0)
    {
        this.nextFire = this.game.time.now + this.fireRate;

        var bullet = this.bullets.getFirstDead();

        bullet.reset(this.defender.x - 8, this.defender.y - 8);

        this.game.physics.arcade.moveToObject(bullet, virus, 500);
    }
    //If hit by a bullet destroy the virus
    if(this.game.physics.arcade.overlap(this.bullets, virus)){
        virus.destroy();
        this.viruses[0] = null;
        this.viruses.splice(0,1);
      }
  },
  render: function(){
  //  this.game.debug.geom(this.libLine);
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

