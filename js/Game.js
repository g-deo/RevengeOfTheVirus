var TopDownGame = TopDownGame || {};

//title screen
TopDownGame.Game = function(){};

var counter = 0;
TopDownGame.Game.prototype = {
  
  create: function() {

    //STATIC VARIABLES
    this.startingLibSize = 2;
    this.baseVirusSpeed = 200;
    this.libX = 900;
    this.libY = 140;
    this.libOffset = 200;

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

    //Setting the HP of the defender
    this.defender.hp = 100;

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


  this.currentvirus = null;
  this.left = this.startingLibSize;
  allInfo = new Array();

  var libtext = "Library Of Viruses";
  
  var libstyle = { font: "50px Arial", fill: "#ffffff", align: "center" };
  var lib = this.game.add.text(800, 60, libtext, libstyle);

  //ALL CREATED VIRUSES MUST FOLLOW THIS FORMAT

  var virusA = {
    image: this.game.add.image(800,150,'virusA'),
    name: "Virus A",
    cost: 5,
    skill: "Fast, but frail",
    speed: this.baseVirusSpeed*1.5,
    health: 1,
    size: 0.7
  };
  virusA.text = this.createDisplay(virusA);
  virusA.image.inputEnabled = true;
  virusA.image.events.onInputDown.add(function(){
    this.global.currentvirus = virusA;
    current.text = "Selected Virus: " + this.global.currentvirus.name;
  }, {global:this})
  allInfo.push(virusA);

  ///////////////////////////////////////////////////////////////////////

  var virusB = {
    image: this.game.add.image(800,360,'virusB'),
    name: "Virus B",
    cost: 10,
    skill:"Tanky, but slow",
    speed: this.baseVirusSpeed*0.5,
    health: 10,
    size: 1.0
  }
  virusB.text = this.createDisplay(virusB);
  virusB.image.inputEnabled = true;
  virusB.image.events.onInputDown.add(function(){
    this.global.currentvirus = virusB;
    current.text = "Selected Virus: " + this.global.currentvirus.name;
  }, {global: this});
  allInfo.push(virusB);

  ////////////////////////////////////////////////////////////////////////

  //set default
  var defaultVirus = allInfo[0];
  this.currentvirus = defaultVirus;
  
  var limittext = "Viruses Left: "+this.left;
  var limitstyle = { font: "30px Arial", fill: "#ffffff", align: "left" };
  this.limit = this.game.add.text(600, 10, limittext, limitstyle); 
  
  
  var currenttext = "Selected Virus: " + this.currentvirus.name;
  var currentstyle = { font: "30px Arial", fill: "#ffffff", align: "left" };
  var current = this.game.add.text(250, 10, currenttext, currentstyle); 


//  this.wall=this.game.add.image(600,0,'wall');
  
  //this.game.physics.arcade.enable(this.wall, Phaser.Physics.ARCADE);


  var libtext2 = "[Lib open]";
  var libstyle2 = { font: "30px Arial", fill: "#ffffff", align: "center" };
  var lib2 = this.game.add.text(1050, 10, libtext2, libstyle2);
  

  var libclosetext = "[Lib close]";
  var libclosestyle = { font: "30px Arial", fill: "#ffffff", align: "center" };
  var libclose = this.game.add.text(1050, 10, libclosetext, libclosestyle);
  
  lib.visible = false;
  for(var i = 0; i < allInfo.length; i++){
    allInfo[i].text.visible = false;
    allInfo[i].image.visible = false;
  }

  for(var i = 0; i < allInfo.length; i++){
    allInfo[i].image.visible = false;
    allInfo[i].text.visible = false;
    libclose.visible = false;
  }

  function toggleText(){
    lib.visible = !lib.visible;
    for(var i = 0; i < allInfo.length; i++){
      allInfo[i].text.visible = !allInfo[i].text.visible;
      allInfo[i].image.visible = !allInfo[i].image.visible;
    }
    libclose.visible = !libclose.visible;
  }
  this.showing = false;

      
  lib2.inputEnabled = true;
  lib2.events.onInputDown.add(function(){ 
    if(!this.showing) {
      toggleText();
      lib2.visible=false;
      this.showing = true;
    }
  });

  libclose.inputEnabled = true;
  libclose.events.onInputDown.add(function(){
    if(this.showing){
      toggleText()
      lib2.visible=true;
      this.showing = false;   
    }
  });

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
  
  },

  createDisplay: function(virusA){
    var vAtext = virusA.name + "\nCost: "+virusA.cost + "\nSkill: " + virusA.skill;
    var vAstyle = { font: "30px Arial", fill: "#ffffff", align: "left" };
    var vA = this.game.add.text(this.libX, this.libY, vAtext, vAstyle);
    this.libY += this.libOffset;
    return vA;
  },

 
  update: function() {

    if(this.viruses.length == 0 && this.left == 0){
      this.game.state.start('Lost');
    }
    
    //Creates an array of virus instances with virus[0] being the latest addition to the map
    if(this.game.input.activePointer.isDown && this.mouseDown == false){
      var gameX = this.game.input.activePointer.positionDown.x + this.game.camera.x;
      var gameY = this.game.input.activePointer.positionDown.y + this.game.camera.y;
      if(this.targeting){
        var speed = this.currentvirus.speed;
        var difX = this.targetingLine.end.x - this.targetingLine.start.x;
        var difY = this.targetingLine.end.y - this.targetingLine.start.y;
        if(difX == 0) {
          if(difY < 0) this.viruses[0].body.velocity.y = -speed;
          if(difY > 0) this.viruses[0].body.velocity.y = speed;
        }
        else if(difY == 0){
          if(difY < 0) this.viruses[0].body.velocity.y = -speed;
          if(difY > 0) this.viruses[0].body.velocity.y = speed;
        }
        else{
          var pythag = Math.sqrt(Math.pow(difX,2) + Math.pow(difY,2));
          this.viruses[0].body.velocity.y = difY/pythag*speed;
          this.viruses[0].body.velocity.x = difX/pythag*speed;
        }
        this.targeting = false;
      }
      
      this.limit.setText("Viruses Left: "+this.left);
      if(gameX < 1200-80 && gameY > 1000 && this.left > 0){
        //console.log(this.currentvirus);
        var virus = this.game.add.sprite(gameX,gameY,this.currentvirus.image.key);
        virus.scale.setTo(this.currentvirus.size);
        this.game.physics.enable(virus,Phaser.Physics.ARCADE);
        this.limit.setText("Viruses Left: " + this.left);
        this.bouncewall(virus);
        this.left = this.left-1;
        //alert(this.left);
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
    



    if(this.targeting && this.game.input.activePointer.x < 1200 && this.viruses.length > 0){
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
      this.ai(this.viruses);
    
      this.hide(this.virusA);
    }
  },  bouncewall: function(virus){
    if (virus.x>=750){
      virus.body.velocity.x = 0;
      virus.body.velocity.y = 0;
    }

  },hide: function(obj){
  },


  //Updates the Defender AI
  ai: function(virusArray){
    var virus = virusArray[0];
    //Equating defender.x to virus.x + defender.width/3 because they aren't
    //lining up optherwise 
    if(this.defender.x < (virus.x + this.defender.width/3)){
      this.defender.x += this.defender.speed;
    }
    else if(this.defender.x > (virus.x + this.defender.width/3)){
      this.defender.x -= this.defender.speed;
    }

    if (this.defender.x === Math.round(virus.x + this.defender.width/3)){
      //The defender shoots bullets when he reaches the virus's position
      this.fire(virus);
    }
    //Destroys the collided virus and reduces hp of defender
    for(var i=0; i<this.viruses.length; i++){
    if(this.game.physics.arcade.overlap(this.defender, this.viruses[i])){
      this.defender.hp -= 50;
      this.viruses[i].destroy();
      this.viruses[i] = null;
      this.viruses.splice(i,1);
      }
    }
    //Win condition
    if(this.defender.hp <= 0){
      this.defender.animations.play('dead',12, true);
      //Waits for 10 seconds;
      for(var i=0; i<10; i++){}
      this.game.state.start('Win');
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

