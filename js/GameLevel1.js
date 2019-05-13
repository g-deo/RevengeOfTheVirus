var TopDownGame = TopDownGame || {};

//title screen
TopDownGame.GameLevel1 = function(){};

var counter = 0;
TopDownGame.GameLevel1.prototype = {
  
  create: function() {

    this.cheatMode = false;
    //Music
    this.game.currentBGM.pause();
    this.game.currentBGM = this.game.BGMs[0];
    this.game.currentBGM.play();
    this.bounceSound = this.game.add.audio('bounce');
    this.explosionSound = this.game.add.audio('explosion');
    this.freezeSound = this.game.add.audio('freeze');
    this.hitSound = this.game.add.audio('hit');
    this.cheatMode;

    //STATIC VARIABLES
    this.startingLibSize = 50;
    this.baseVirusSpeed = 200;
    this.libX = 900;
    this.libY = 140;
    this.libOffset = 200;
    this.game.bounds = 100;
    this.defenderShootCounter = 0;
    //this.game.stage.backgroundColor = '#000000';

    /* OLD IMPLEMENTATION OF BACKGROUND
    this.background = this.game.add.sprite(0,0,'gameTiles');
    this.background.x = this.game.world.centerX;
    this.background.y = this.game.world.centerY;
    this.background.anchor.set(0.5,0.5);
    */

    //Create spawnLine
    this.spawnLine = new Phaser.Line(0, 1000, 1200, 1000);
    
    //Initialize physics and targeting variables
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.viruses = new Array();
    this.mouseDown = false;
    this.targeting = false;
    
    //Create Tiled map and layers
    //the first parameter is the tileset name as specified in Tiled, the second is the key to the asset
    this.map = this.game.add.tilemap('gameMapEasy');
    this.map.addTilesetImage('gameTiles', 'gameTiles');
    this.map.addTilesetImage('redBloodCell', 'redBloodCell');
    //create layers
    this.backgroundlayer = this.map.createLayer('backgroundLayer');
    this.objectLayer = this.map.createLayer('objectLayer');
    this.blockedLayer = this.map.createLayer('blockedLayer');
    this.map.setCollisionBetween(5626,6000, true, 'blockedLayer');
    this.game.physics.enable(this.blockedLayer, Phaser.Physics.ARCADE)


    //Add targeting arrow
    this.targetArrow = this.game.add.sprite(100,420,'arrow');
    this.targetArrow.visible = false;
    this.targetArrow.anchor.setTo(0.0,0.5)
    
    // Load in the bullet for the defender
    this.bullets = {speed: 300};
    this.fireRate = 450;
    this.nextFire = 0; 
    this.bullets = this.game.add.group();
    this.bullets.enableBody = true;
    this.bullets.physicsBodyType = Phaser.Physics.ARCADE;

    //Initialized defender sprite
    this.defender = this.game.add.sprite(100, 120, 'defender');
    this.defender.frame = 8;
    this.defender.anchor.set(0.5, 0.5);
    this.game.physics.enable(this.defender, Phaser.Physics.ARCADE);
    this.defender.healthbar = this.game.add.sprite(this.defender.x - this.defender.width*.28,this.defender.y-this.defender.height*.90,'healthbar');
    this.defender.healthbar.frame = 0;
    this.defender.shootCounter = this.defenderShootCounter;
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

    //Setting the Health of the defender
    this.defender.health = 100;

    //GUI IMPLEMENTATION STARTS HERE

    //Pause button
    var text = "[Library]";
    var style = { font: "30px Arial", fill: "#ffffff", align: "center" };
    var t = this.game.add.text(10, 10, text, style);
    
    
    //levels button
    var back = "[Levels]";
    var backstyle = { font: "30px Arial", fill: "#ffffff", align: "center" };
    var backtext = this.game.add.text(1090, 10, back, backstyle); 
    backtext.inputEnabled = true // 开启输入事件
    backtext.events.onInputUp.add(function() {   
      this.game.state.start('Levels')
    }, this); 
  
    //Initialize current virus and number of virus points
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
      damage: 20
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

    //set default
    var defaultVirus = allInfo[0];
    this.currentvirus = defaultVirus;
    
    var limittext = "Viruses Left: "+this.left;
    var limitstyle = { font: "30px Arial", fill: "#ffffff", align: "left" };
    this.limit = this.game.add.text(600, 10, limittext, limitstyle); 
    this.limit.bringToTop();
    
    
    var currenttext = "Selected Virus: " + this.currentvirus.name;
    var currentstyle = { font: "30px Arial", fill: "#ffffff", align: "left" };
    var current = this.game.add.text(150, 10, currenttext, currentstyle); 
    current.bringToTop();


  //  this.wall=this.game.add.image(600,0,'wall');
    
    //this.game.physics.arcade.enable(this.wall, Phaser.Physics.ARCADE);


    var libtext2 = "[Lib open]";
    var libstyle2 = { font: "30px Arial", fill: "#ffffff", align: "center" };
    var lib2 = this.game.add.text(1050, 10, libtext2, libstyle2);
    lib2.bringToTop();

    
    var invincible = "[invincible OFF]";
    var libstyle2 = { font: "30px Arial", fill: "#ffffff", align: "center" };
    var invincibletext = this.game.add.text(850, 10, invincible, libstyle2);
    invincibletext.bringToTop();


    var invincible = "[invincible ON]";
    var libstyle2 = { font: "30px Arial", fill: "#ffffff", align: "center" };
    var invincibleON = this.game.add.text(850, 10, invincible, libstyle2);
    invincibleON.bringToTop();

    invincibletext.inputEnabled=true;
    invincibletext.events.onInputDown.add(function(){ 
      this.global.cheatMode = true;
      console.log(this.cheatMode);
      invincibletext.visible = false;
      invincibleON.visible = true;
      console.log("clicked");
      for(var i = 0; i < this.global.viruses.length; i++){ 
        this.global.viruses[i].invincible=true;
       
      }
    },{global:this});
    invincibleON.inputEnabled=true;
    invincibleON.events.onInputDown.add(function(){ 
      this.global.cheatMode = false;
      console.log(this.cheatMode);
      invincibletext.visible = true;
      invincibleON.visible = false;
      console.log("clicked");
      for(var i = 0; i < this.global.viruses.length; i++){ 
        this.global.viruses[i].invincible=false;

      }
    },{global:this});
    var libclosetext = "[Lib close]";
    var libclosestyle = { font: "30px Arial", fill: "#ffffff", align: "center" };
    var libclose = this.game.add.text(1050, 10, libclosetext, libclosestyle);
    libclose.bringToTop();
    
    for(var i = 0; i < allInfo.length; i++){
      allInfo[i].text.visible = false;
      allInfo[i].image.visible = false;
      lib.visible = false;
      lib2.visible = false;
      invincibletext.visible = true;
      invincibleON.visible = false;
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
      libclose.visible = false;
    }
    this.showing = false;

        
    lib2.inputEnabled = true;
    lib2.events.onInputDown.add(function(){ 
      //console.log(this.showing);
      this.showing = false;
      if(!this.showing) {
        toggleText();
        lib2.visible=false;
        this.showing = false;
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

    //GUI IMPLEMENTATION ENDS HERE   
  },

  createDisplay: function(virusA){
    var vAtext = virusA.name + "\nCost: "+virusA.cost + "\nSkill: " + virusA.skill;
    var vAstyle = { font: "30px Arial", fill: "#ffffff", align: "left" };
    var vA = this.game.add.text(this.libX, this.libY, vAtext, vAstyle);
    this.libY += this.libOffset;
    return vA;
  },

 
  update: function() {

    this.targetArrow.rotation = this.game.physics.arcade.angleToPointer(this.targetArrow);

    //DO COLLISIONS

    //this.game.physics.arcade.collide(this.viruses, this.blockedLayer);
    //this.game.physics.arcade.collide(this.viruses, this.wall);
    
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
      if(this.targeting && gameY < 1000){
        this.targetArrow.visible = false;
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
        console.log(this.cheatMode);
        if(this.cheatMode != true)
        {this.viruses[0].invincible = false;
        this.viruses[0].alpha = 1;}
        else{this.viruses[0].invincible = true;
        this.viruses[0].alpha = 1;}
      }
      
      else if(!this.targeting && gameY > 1000 && this.left > 0 &&  this.left-this.currentvirus.cost>=0){
        //console.log(this.currentvirus);

        var virus = this.game.add.sprite(gameX,gameY,this.currentvirus.spritesheet);
        var virusmove = virus.animations.add('move', [0,1,2,3], 10, true);
        virus.animations.play('move', 18, true);
        virus.scale.setTo(this.currentvirus.size);
        virus.health = this.currentvirus.health;
        virus.invincible = true;

        virus.alpha = 0.5;
        //this.game.physics.enable(virus,Phaser.Physics.ARCADE);
        this.limit.setText("Viruses Left: " + this.left);
        this.left = this.left-this.currentvirus.cost;
        //alert(this.left);

        this.game.physics.arcade.enable(virus);
        this.game.physics.arcade.collide(virus, this.blockedLayer);
        this.game.physics.arcade.collide(virus, this.wall);
        
        virus.body.immovable = false;
        virus.body.collideWorldBounds = true;
        virus.body.bounce.set(1,1);
        //virus.body.velocity.y= -50;
        this.mouseDown=true;
        this.renderingLine = true;
        this.viruses.unshift(virus);
        this.targeting = true;
      }

      this.limit.setText("Viruses Left: "+this.left);
      
    }
    



    if(this.targeting && this.game.input.activePointer.x < 1200 && this.viruses.length > 0){
      var current = this.viruses[0];
      this.targetingLine = new Phaser.Line(current.x + current.width/2,current.y+current.height/2,this.game.input.activePointer.x,this.game.input.activePointer.y);      
      this.targetArrow.x = current.x + 0.5*current.width;
      this.targetArrow.y = current.y + 0.5*current.height;
      this.targetArrow.visible=true;
    }

    //  This boolean controls if the player should collide with the world bounds or not
    
    if(this.game.input.activePointer.isUp && this.mouseDown == true){
      this.mouseDown = false;
      //this.targeting = true;
    }

    if(this.viruses.length >= 1){
      this.ai(this.viruses);
    
    }
  },


  //Updates the Defender AI
  ai: function(virusArray){
    var virus = virusArray[0];
    //Equating defender.x to virus.x + defender.width/3 because they aren't
    //lining up optherwise 
    if(this.defender.x < (virus.x + this.defender.width/3)){
      this.defender.x += this.defender.speed;
      this.defender.healthbar.x += this.defender.speed;
    }
    else if(this.defender.x > (virus.x + this.defender.width/3)){
      this.defender.x -= this.defender.speed;
      this.defender.healthbar.x -= this.defender.speed;
    }

    if (this.defender.x === Math.round(virus.x + this.defender.width/3)){
      //The defender shoots bullets when he reaches the virus's position
      //Also initiates defender shoot animation
      this.fire(virus);
    }
    //Idle State for defender sprite when not shooting
    else if(this.defender.shootCounter > 20){
      this.defender.animations.play('idle', 18, true);
      this.defender.shootCounter = 0;
    }
    else{
      this.defender.shootCounter++;
    }
    //Destroys the collided virus and reduces health of defender
    for(var i=0; i<this.viruses.length; i++){
    if(this.game.physics.arcade.overlap(this.defender, this.viruses[i])){
      this.defender.health -= 20;
      this.updateHealthBar(this.defender,this.defender.healthbar);
      this.viruses[i].destroy();
      this.viruses[i] = null;
      this.viruses.splice(i,1);
      this.defender.animations.play('idle', 18, true);
      }
    }
    if(this.viruses.length===0){
      this.defender.animations.play('idle', 18, true);
    }
    //Win condition
    if(this.defender.health <= 0){
      this.defender.animations.play('dead',12, true);
      //Waits for 10 seconds;
      this.game.time.events.loop(Phaser.Timer.SECOND, 2000, this);
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

        bullet.reset(this.defender.x, this.defender.y);

        this.game.physics.arcade.moveToObject(bullet, virus, 500);
      }
      //Destroys viruses.
      for(var i = 0; i<this.viruses.length; i++){
        if(this.viruses[i].invincible == false && this.game.physics.arcade.overlap(this.bullets, this.viruses[i])){
          this.viruses[i].health -= 1;
          this.hitSound.play();
          var bullet = this.bullets.getFirstAlive();
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
  render: function(){
  //  this.game.debug.geom(this.libLine);
  //this.game.debug.geom(this.spawnLine);
    //if(this.targeting) this.game.debug.geom(this.targetingLine);
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

