var TopDownGame = TopDownGame || {};

//title screen
TopDownGame.GameLevel8 = function(){};

var counter = 0;
TopDownGame.GameLevel8.prototype = {
  
  create: function() {

    //STATIC VARIABLES
    this.startingLibSize = 50;
    this.baseVirusSpeed = 200;
    this.libX = 900;
    this.libY = 140;
    this.libOffset = 200;
    this.baseDefenderSpeed = 1;
    this.baseBulletSpeed = 450;
    this.baseDefenderAiming = 2;
    //
    this.game.bounds = 100;
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.stage.backgroundColor = '#000000';
    /* 
    this.background = this.game.add.sprite(0,0,'gameTiles');
    this.background.x = this.game.world.centerX;
    this.background.y = this.game.world.centerY;
    this.background.anchor.set(0.5,0.5);*/

    //this.libLine = new Phaser.Line(750, 0, 750, 1200);
    this.spawnLine = new Phaser.Line(0, 1000, 1200, 1000);
    
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.map = this.game.add.tilemap('gameMap');
    this.viruses = new Array();

    this.mouseDown = false;
    this.targeting = false;
    
    //the first parameter is the tileset name as specified in Tiled, the second is the key to the asset
    this.map.addTilesetImage('gameTiles', 'gameTiles');
    this.map.addTilesetImage('redBloodCell', 'redBloodCell');
    //create layer
    this.backgroundlayer = this.map.createLayer('backgroundLayer');
    this.objectLayer = this.map.createLayer('objectLayer');
    this.blockedLayer = this.map.createLayer('blockedLayer');

    //Created the collision between the blockedLayer
    this.map.setCollisionBetween(1, 5625, true, 'blockedLayer');
    
    //Create defender sprites using function
    this.defenders = this.createDefenders(3);

    //Create the bullets for the defenders
    this.bullets = this.createBullets(3);

    //Set defender and bullet difficulty
    this.defenderHard(this.defenders[0], this.bullets[0]);
    this.defenderHard(this.defenders[1], this.bullets[1]);
    this.defenderHard(this.defenders[2], this.bullets[2]);


    var text = "[Pause]";
    var style = { font: "30px Arial", fill: "#ffffff", align: "center" };
    var t = this.game.add.text(10, 10, text, style);
    
    

    var back = "[Levels]";
    var backstyle = { font: "30px Arial", fill: "#ffffff", align: "center" };
    var backtext = this.game.add.text(10, 50, back, backstyle);
  
    backtext.inputEnabled = true // 开启输入事件
    backtext.events.onInputUp.add(function() { 
    
  this.game.state.start('Levels')
    
    
    
    }, this); 
    
   
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
    spritesheet: 'virusA_sprite',
    image: this.game.add.image(800,150,'virusA'),
    name: "Virus A",
    cost: 5,
    skill: "Fast, but frail",
    speed: this.baseVirusSpeed*1.5,
    health: 1,
    size: 0.7,
    damage: 5
  };
  virusA.text = this.createDisplay(virusA);
  virusA.image.inputEnabled = true;
  virusA.image.bringToTop();
  virusA.image.events.onInputDown.add(function(){
    this.global.currentvirus = virusA;
    current.text = "Selected Virus: " + this.global.currentvirus.name;
  }, {global:this})
  allInfo.push(virusA);

  ///////////////////////////////////////////////////////////////////////

  var virusB = { 
    spritesheet:'virusB_sprite',
    image: this.game.add.image(800,360,'virusB'),
    name: "Virus B",
    cost: 10,
    skill:"Tanky, but slow",
    speed: this.baseVirusSpeed*0.5,
    health: 10,
    size: 1.0,
    damage: 20
  }
  virusB.text = this.createDisplay(virusB);
  virusB.image.inputEnabled = true;
  virusB.image.bringToTop();
  virusB.image.events.onInputDown.add(function(){
    this.global.currentvirus = virusB;
    current.text = "Selected Virus: " + this.global.currentvirus.name;
  }, {global: this});
  allInfo.push(virusB);

  ////////////////////////////////////////////////////////////////////////
  /*
  for(var i = 0; i < allInfo.length; i++){
    var virus = allInfo[i];
    virus.text = this.createDisplay(virus);
    virus.image.inputEnabled = true;
    virus.image.events.onInputDown.add(function(){
      this.global.currentvirus = virus;
      current.text = "Selected Virus: " + this.global.currentvirus.name;
    }, {global: this});
  }*/
  //an attempt to be more modular that does not work

  //set default
  var defaultVirus = allInfo[0];
  this.currentvirus = defaultVirus;
  
  var limittext = "Viruses Left: "+this.left;
  var limitstyle = { font: "30px Arial", fill: "#ffffff", align: "left" };
  this.limit = this.game.add.text(600, 10, limittext, limitstyle); 
  this.limit.bringToTop();
  
  
  var currenttext = "Selected Virus: " + this.currentvirus.name;
  var currentstyle = { font: "30px Arial", fill: "#ffffff", align: "left" };
  var current = this.game.add.text(250, 10, currenttext, currentstyle); 
  current.bringToTop();


//  this.wall=this.game.add.image(600,0,'wall');
  
  //this.game.physics.arcade.enable(this.wall, Phaser.Physics.ARCADE);


  var libtext2 = "[Lib open]";
  var libstyle2 = { font: "30px Arial", fill: "#ffffff", align: "center" };
  var lib2 = this.game.add.text(1050, 10, libtext2, libstyle2);
  lib2.bringToTop();

  
  var invincible = "[invincible]";
  var libstyle2 = { font: "30px Arial", fill: "#ffffff", align: "center" };
  var invincibletext = this.game.add.text(850, 10, invincible, libstyle2);
  invincibletext.bringToTop();

  var libclosetext = "[Lib close]";
  var libclosestyle = { font: "30px Arial", fill: "#ffffff", align: "center" };
  var libclose = this.game.add.text(1050, 10, libclosetext, libclosestyle);
  libclose.bringToTop();
  
  for(var i = 0; i < allInfo.length; i++){
    allInfo[i].text.visible = false;
    allInfo[i].image.visible = false;
    lib.visible = false;
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
    //console.log(this.showing);
    this.showing = false;
    if(!this.showing) {
      toggleText();
      lib2.visible=false;
      this.showing = true;
      //console.log("after:"+this.showing);
    }
  });

  libclose.inputEnabled = true;
  libclose.events.onInputDown.add(function(){
    console.log(this.showing);
    if(this.showing){
      toggleText();
      lib2.visible=true;
      this.showing = false;   
      console.log("after:"+this.showing);
    }
  });

  t.inputEnabled = true // 开启输入事件
  t.events.onInputUp.add(function() { 
  this.game.paused = true; 


 librarybackground = this.game.add.sprite(200, 100, 'library');


  var style = {fill : '#FFF'}; 
  tx = this.game.add.text(this.game.width * 0.5, this.game.height -200, "          Press Enter to continue\n\n*Use hot keys to change current virus.", style); 
  tx.anchor.set(0.5, 0.5); 

  libtext = this.game.add.text(this.game.width * 0.5, 150, "Library Of The Virus", style); 
  libtext.anchor.set(0.5, 0.5); 


  var vAtext = virusA.name+"    Hot Key: 1" + "\nCost: "+virusA.cost + "\nSkill: " + virusA.skill;
  var vAstyle = { font: "30px Arial", fill: "#ffffff", align: "left" };
   vA = this.game.add.text(330, 200, vAtext, vAstyle);

   imageA =  this.game.add.image(220,210,'virusA');

   
  var vBtext = virusA.name+"    Hot Key: 2"+ "\nCost: "+virusB.cost +"\nSkill: " + virusB.skill;
  var vBstyle = { font: "30px Arial", fill: "#ffffff", align: "left" };
   vB = this.game.add.text(330, 400, vBtext, vBstyle);

   imageB =  this.game.add.image(220,410,'virusB');




  }, this); 
  var keyenter =this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
  keyenter.onDown.add(function(){
    this.game.paused = false; 
    libtext.destroy();
    imageA.destroy();
    vA.destroy();
    imageB.destroy();
    vB.destroy();
    tx.destroy();
    librarybackground.destroy();
  }, this);
  t.fixedToCamera = true; 

  key1 = this.game.input.keyboard.addKey(Phaser.Keyboard.ONE);
  key1.onDown.add(function(){
    this.global.currentvirus = virusA;
    current.text = "Selected Virus: " + this.global.currentvirus.name;


  }, {global:this});

  key2 = this.game.input.keyboard.addKey(Phaser.Keyboard.TWO);
  key2.onDown.add(function(){
    this.global.currentvirus = virusB;
    current.text = "Selected Virus: " + this.global.currentvirus.name;


  }, {global:this});


  
  },

  createDisplay: function(virusA){
    var vAtext = virusA.name + "\nCost: "+virusA.cost + "\nSkill: " + virusA.skill;
    var vAstyle = { font: "30px Arial", fill: "#ffffff", align: "left" };
    var vA = this.game.add.text(this.libX, this.libY, vAtext, vAstyle);
    this.libY += this.libOffset;
    return vA;
  },

 
  update: function() {

    //DO COLLISIONS

    //this.game.physics.arcade.collide(this.viruses, this.blockedLayer);
    //this.game.physics.arcade.collide(this.viruses, this.wall);

    //Enabling Virus Physics and adding collision to blockedLayer
    for(var i = 0; i < this.viruses.length; i++){
      if(this.viruses[i] != undefined && this.viruses[i] != null){
        var virus = this.viruses[i];
        this.game.physics.arcade.enable(virus);
        this.game.physics.arcade.collide(virus, this.blockedLayer);
        this.game.physics.arcade.collide(virus, this.wall);
      }
    }

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
        this.viruses[0].invincible = false;
      }
      
      this.limit.setText("Viruses Left: "+this.left);
      if(gameX < 1200-80 && gameY > 1000 && this.left > 0 &&  this.left-this.currentvirus.cost>=0){
        //console.log(this.currentvirus);

        var virus = this.game.add.sprite(gameX,gameY,this.currentvirus.spritesheet);
        var virusmove = virus.animations.add('move', [0,1,2,3], 10, true);
        virus.animations.play('move', 18, true);
        virus.scale.setTo(this.currentvirus.size);
        virus.health = this.currentvirus.health;
        virus.invincible = true;
        //this.game.physics.enable(virus,Phaser.Physics.ARCADE);
        this.limit.setText("Viruses Left: " + this.left);
        this.bouncewall(virus);
        this.left = this.left-this.currentvirus.cost;
        //alert(this.left);

        this.game.physics.arcade.enable(virus);
        //this.game.physics.arcade.collide(virus, this.blockedLayer);
        //this.game.physics.arcade.collide(virus, this.wall);
        
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
    for(var i=0; i< this.defenders.length; i++){
      if(this.viruses.length >= 1){
        this.ai(this.viruses,this.defenders[i], this.bullets[i]);
        this.hide(this.virusA);
      }
    }
  },  bouncewall: function(virus){
    if (virus.x>=750 && virus.body != null){
      virus.body.velocity.x = 0;
      virus.body.velocity.y = 0;
    }

  },hide: function(obj){
  },


  //Updates the Defender AI
  ai: function(virusArray,defender,bullets){
    var virus = virusArray[0];
    if(defender.difficulty === "easy"){
      //Equating defender.x to virus.x + defender.width/3 because they aren't
      //lining up optherwise 
      if(defender.x < (virus.x + defender.width/3)){
        defender.x += defender.speed;
        defender.healthbar.x += defender.speed;
      }
      else if(defender.x > (virus.x + defender.width/3)){
        defender.x -= defender.speed;
        defender.healthbar.x -= defender.speed;
      }

      if (defender.x < Math.round(virus.x + defender.width/3) + this.baseDefenderAiming*1 && defender.x > Math.round(virus.x + defender.width/3) - this.baseDefenderAiming*1){
        //The defender shoots bullets when he reaches the virus's position
        this.fire(virus,defender,bullets);
      }
      //Destroys the collided virus and reduces health of defender
      for(var i=0; i<this.viruses.length; i++){
        if(this.game.physics.arcade.overlap(defender, this.viruses[i])){
          defender.health -= 10;
          this.updateHealthBar(defender,defender.healthbar);
          this.viruses[i].destroy();
          this.viruses[i] = null;
          this.viruses.splice(i,1);
        }
      }
      //Defender death condition
      if(defender.health <= 0){
        defender.animations.play('dead',12, true);
        //Waits for 10 seconds;
        this.game.time.events.loop(Phaser.Timer.SECOND, 2000, this);
        ind = this.defenders.indexOf(defender);
        defender.destroy();
        this.defenders[ind]=null;
        this.defenders.splice(ind,1);
        //Destroying Bullets
        ind2 = this.bullets.indexOf(bullet);
        bullets.destroy();
        this.bullets[ind2] = null;
        this.bullets.splice(ind2,1);
        }
      }
    else if(defender.difficulty === "medium"){
      //Equating defender.x to virus.x + defender.width/3 because they aren't
      //lining up optherwise 
      if(defender.x < (virus.x + defender.width/3)){
        defender.x += defender.speed;
        defender.healthbar.x += defender.speed;
      }
      else if(defender.x > (virus.x + defender.width/3)){
        defender.x -= defender.speed;
        defender.healthbar.x -= defender.speed;
      }

      if (defender.x < Math.round(virus.x + defender.width/3) + this.baseDefenderAiming*1.2 && defender.x > Math.round(virus.x + defender.width/3) - this.baseDefenderAiming*1.2){
        //The defender shoots bullets when he reaches the virus's position
        this.fire(virus,defender,bullets);
      }
      //Destroys the collided virus and reduces health of defender
      for(var i=0; i<this.viruses.length; i++){
        if(this.game.physics.arcade.overlap(defender, this.viruses[i])){
          defender.health -= 10;
          this.updateHealthBar(defender,defender.healthbar);
          this.viruses[i].destroy();
          this.viruses[i] = null;
          this.viruses.splice(i,1);
        }
      }
      //Defender death condition
      if(defender.health <= 0){
        defender.animations.play('dead',12, true);
        //Waits for 10 seconds;
        this.game.time.events.loop(Phaser.Timer.SECOND, 2000, this);
        ind = this.defenders.indexOf(defender);
        defender.destroy();
        this.defenders[ind]=null;
        this.defenders.splice(ind,1);
        //Destroying Bullets
        ind2 = this.bullets.indexOf(bullet);
        bullets.destroy();
        this.bullets[ind2] = null;
        this.bullets.splice(ind2,1);
        }
      }
      else if(defender.difficulty === "hard"){
      //Equating defender.x to virus.x + defender.width/3 because they aren't
      //lining up optherwise 
      if(defender.x < (virus.x + defender.width/3)){
        defender.x += defender.speed;
        defender.healthbar.x += defender.speed;
      }
      else if(defender.x > (virus.x + defender.width/3)){
        defender.x -= defender.speed;
        defender.healthbar.x -= defender.speed;
      }

      if (defender.x < Math.round(virus.x + defender.width/3) + this.baseDefenderAiming*1.7 && defender.x > Math.round(virus.x + defender.width/3) - this.baseDefenderAiming*1.7){
        //The defender shoots bullets when he reaches the virus's position
        this.fire(virus,defender,bullets);
      }
      //Destroys the collided virus and reduces health of defender
      for(var i=0; i<this.viruses.length; i++){
        if(this.game.physics.arcade.overlap(defender, this.viruses[i])){
          defender.health -= 10;
          this.updateHealthBar(defender,defender.healthbar);
          this.viruses[i].destroy();
          this.viruses[i] = null;
          this.viruses.splice(i,1);
        }
      }
      //Defender death condition
      if(defender.health <= 0){
        defender.animations.play('dead',12, true);
        //Waits for 10 seconds;
        this.game.time.events.loop(Phaser.Timer.SECOND, 2000, this);
        ind = this.defenders.indexOf(defender);
        defender.destroy();
        this.defenders[ind]=null;
        this.defenders.splice(ind,1);
        //Destroying Bullets
        ind2 = this.bullets.indexOf(bullet);
        bullets.destroy();
        this.bullets[ind2] = null;
        this.bullets.splice(ind2,1);
        }
      }
      if(this.defenders.length <=0){
        this.game.state.start('Win');
      }
  },
  fire: function(virus, defender, bullets){
    defender.animations.play('shoot', 18, true);
    //Loading the bullets
    //alert(Object.getOwnPropertyNames(bullets));
    bullets.createMultiple(1, 'defenderBullet');
    bullets.setAll('checkWorldBounds', true);
    if (this.game.time.now > this.nextFire && bullets.countDead() > 0)
    {
        this.nextFire = this.game.time.now + this.fireRate;

        var bullet = bullets.getFirstDead();

        bullet.reset(defender.x, defender.y);

        this.game.physics.arcade.moveToObject(bullet, virus, 500);
      }
      //Destroys viruses.
      for(var i = 0; i<this.viruses.length; i++){
        if(this.viruses[i].invincible == false && this.game.physics.arcade.overlap(bullets, this.viruses[i])){
          this.viruses[i].health -= 1;
          var bullet = bullets.getFirstAlive();
          bullet.kill();
        }
        if(this.viruses[i].health<=0){
          this.viruses[i].destroy()
          this.viruses[i] = null;
          this.viruses.splice(i,1);
        }
      }      
  },
  //Updates the health of the virus or defender
  updateHealthBar: function(sprite,healthbar){
    if(sprite.health>=100){healthbar.frame = 0;}
    else if(sprite.health>=90){healthbar.frame = 1;}
    else if(sprite.health>=80){healthbar.frame = 2;}
    else if(sprite.health>=70){healthbar.frame = 3;}
    else if(sprite.health>=60){healthbar.frame = 4;}
    else if(sprite.health>=50){healthbar.frame = 5;}
    else if(sprite.health>=40){healthbar.frame = 6;}
    else if(sprite.health>=30){healthbar.frame = 7;}
    else if(sprite.health>=20){healthbar.frame = 8;}
    else if(sprite.health>=10){healthbar.frame = 9;}
    else {healthbar.frame = 9;}
  },
  //Creates the specified number of defender sprites and outputs an array of size num
  createDefenders: function(num){
    var defArr = new Array();
    var defaultX = 90;
    var defaultY = 100
    for(var i =0; i< num; i++){
        //Initialized defender sprite
        var defender = this.game.add.sprite(defaultX+=130, defaultY, 'defender');
        defender.frame = 8;
        defender.anchor.set(0.5, 0.5);
        this.game.physics.enable(defender, Phaser.Physics.ARCADE);
        defender.healthbar = this.game.add.sprite(defender.x - defender.width*.28,defender.y-defender.height*.90,'healthbar');
        defender.healthbar.frame = 0;
        //Enables world bound collision
        defender.body.collideWorldBounds = true;
        defender.body.bounce.set(1,1);
        //Created the shooting animation for defender
        var shoot = defender.animations.add('shoot', [0,1,2,3,4,5,6,7], 10, true);
        
        //Creaded the idle animation for defender
        var idle = defender.animations.add('idle', [8,9,10,11,12,13,14,15], 10, true);
    
        //Created the dead animation for defender
        var dead = defender.animations.add('dead', [16,17,18,19,20,21,22,23], 10, true);
    
        //Setting the default animation to idle
        defender.frame = 8;
    
        //Setting speed for the defender (can be changed for changing difficulty)
        defender.speed = this.baseDefenderSpeed;
    
        //Setting the Health of the defender
        defender.health = 100;

        //Setting the difficulty of the defender
        defender.difficulty = "none";
        defArr.push(defender);
    }
    return defArr;
  },
  //Sets the defenders stats to easy
  defenderEasy: function(defender,bullet){
    defender.difficulty = "easy";
    defender.speed = this.baseDefenderSpeed*1
    
  },
  //Sets the defenders stats to medium.
  defenderMedium: function(defender,bullet){
    defender.difficulty = "medium";
    defender.speed = this.baseDefenderSpeed*1.5
    this.baseBulletSpeed
  },
  //Sets the defender's stats to hard.
  defenderHard: function(defender,bullet){
    defender.difficulty = "hard";
    defender.speed = this.baseDefenderSpeed*1.7
  },
  createBullets: function(num){
    var arr = new Array();
    for(var i=0; i<num; i++){    
      // Loaded in the bullet for the defender
      var bullets = {speed: 300};
      this.fireRate = this.baseBulletSpeed;
      this.nextFire = 0; 
      bullets = this.game.add.group();
      bullets.enableBody = true;
      bullets.physicsBodyType = Phaser.Physics.ARCADE;
      arr.push(bullets);
    }
    return arr;
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
