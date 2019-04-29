var TopDownGame = TopDownGame || {};

//title screen
TopDownGame.GameLevel1 = function(){};

var counter = 0;
TopDownGame.GameLevel1.prototype = {
  
  create: function() {

    //STATIC VARIABLES
    this.startingLibSize = 50;
    this.baseVirusSpeed = 200;
    this.libX = 900;
    this.libY = 140;
    this.libOffset = 200;
    this.game.bounds = 100;

    this.initializeTiled();
    this.initializeTargeting();
    this.initializeDefenders();
    this.initializeVirusTypes(this.buildUI());

    this.virus = this.game.add.sprite(50,50,this.allInfo[0].spritesheet);
    this.game.physics.arcade.enable(this.virus);
    this.virus.body.velocity.y = 100;

  },

  buildUI: function(){
    //Pause button
    var text = "[Pause]";
    var style = { font: "30px Arial", fill: "#ffffff", align: "center" };
    var t = this.game.add.text(10, 10, text, style);
       
    //levels button
    var back = "[Levels]";
    var backstyle = { font: "30px Arial", fill: "#ffffff", align: "center" };
    var backtext = this.game.add.text(10, 50, back, backstyle); 
    backtext.inputEnabled = true // 开启输入事件
    backtext.events.onInputUp.add(function() {   
      this.game.state.start('Levels')
    }, this); 
  
    //Initialize current virus and number of virus points
    this.left = this.startingLibSize;

    //Library title
    var libtext = "Library Of Viruses";    
    var libstyle = { font: "50px Arial", fill: "#ffffff", align: "center" };
    var lib = this.game.add.text(800, 60, libtext, libstyle);

    //Virus point counter
    var limittext = "Viruses Left: "+this.left;
    var limitstyle = { font: "30px Arial", fill: "#ffffff", align: "left" };
    this.limit = this.game.add.text(600, 10, limittext, limitstyle); 
    this.limit.bringToTop();
    
    //Current virus display
    var currenttext = "Selected Virus: " + this.currentvirus.name;
    var currentstyle = { font: "30px Arial", fill: "#ffffff", align: "left" };
    var current = this.game.add.text(250, 10, currenttext, currentstyle); 
    current.bringToTop();

    //Lib open button
    var libtext2 = "[Lib open]";
    var libstyle2 = { font: "30px Arial", fill: "#ffffff", align: "center" };
    var lib2 = this.game.add.text(1050, 10, libtext2, libstyle2);
    lib2.bringToTop();

    //Invincible cheat button
    var invincible = "[invincible]";
    var libstyle2 = { font: "30px Arial", fill: "#ffffff", align: "center" };
    var invincibletext = this.game.add.text(850, 10, invincible, libstyle2);
    invincibletext.bringToTop();

    //Lib close button
    var libclosetext = "[Lib close]";
    var libclosestyle = { font: "30px Arial", fill: "#ffffff", align: "center" };
    var libclose = this.game.add.text(1050, 10, libclosetext, libclosestyle);
    libclose.bringToTop();

    //Hide virus library
    for(var i = 0; i < this.allInfo.length; i++){
      this.allInfo[i].image.visible = false;
      this.allInfo[i].text.visible = false;
      libclose.visible = false;
    }

    //Helper function to toggle libtext
    function toggleText(){
      lib.visible = !lib.visible;
      for(var i = 0; i < this.allInfo.length; i++){
        this.allInfo[i].text.visible = !this.allInfo[i].text.visible;
        this.allInfo[i].image.visible = !this.allInfo[i].image.visible;
      }
      libclose.visible = !libclose.visible;
    }

    this.showing = false;

    //Open library
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

    //Close library
    libclose.inputEnabled = true;
    libclose.events.onInputDown.add(function(){
      if(this.showing){
        toggleText();
        lib2.visible=true;
        this.showing = false;   
        //console.log("after:"+this.showing);
      }
    });
    
    //Pause button
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

    //Unpause
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

  initializeDefenders: function(){
    // Load in the bullet for the defender
    this.bullets = {speed: 300};
    this.fireRate = 450;
    this.nextFire = 0; 
    this.bullets = this.game.add.group();
    this.bullets.enableBody = true;
    this.bullets.physicsBodyType = Phaser.Physics.ARCADE;

    //Initialized defender sprite
    this.defender = this.game.add.sprite(100, 100, 'defender');
    this.defender.frame = 8;
    this.defender.anchor.set(0.5, 0.5);
    this.game.physics.enable(this.defender, Phaser.Physics.ARCADE);
    this.defender.healthbar = this.game.add.sprite(this.defender.x - this.defender.width*.28,this.defender.y-this.defender.height*.90,'healthbar');
    this.defender.healthbar.frame = 0;

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
  },

  initializeVirusTypes: function(callback){
    //ALL CREATED VIRUSES MUST FOLLOW THIS FORMAT
    this.allInfo = new Array();
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
    this.allInfo.push(virusA);

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
    this.allInfo.push(virusB);

    //initialize default virus
    var defaultVirus = this.allInfo[0];
    this.currentvirus = defaultVirus;
    callback();
  },

  createDisplay: function(virusA){
    var vAtext = virusA.name + "\nCost: "+virusA.cost + "\nSkill: " + virusA.skill;
    var vAstyle = { font: "30px Arial", fill: "#ffffff", align: "left" };
    var vA = this.game.add.text(this.libX, this.libY, vAtext, vAstyle);
    this.libY += this.libOffset;
    virusA.text = vA;
  },

  initializeTargeting: function(){
    this.spawnLine = new Phaser.Line(0, 1000, 1200, 1000);
    this.viruses = new Array();
    this.mouseDown = false;
    this.targeting = false;
  },

  initializeTiled: function(){
    //Create Tiled map and layers
    //the first parameter is the tileset name as specified in Tiled, the second is the key to the asset
    this.map = this.game.add.tilemap('gameMap');
    this.map.addTilesetImage('gameTiles', 'gameTiles');
    this.map.addTilesetImage('redBloodCell', 'redBloodCell');
    //create layers
    this.backgroundlayer = this.map.createLayer('backgroundLayer');
    this.objectLayer = this.map.createLayer('objectLayer');
    this.blockedLayer = this.map.createLayer('blockedLayer');
    this.map.setCollisionBetween(5626,6000,true, 'blockedLayer');
  },

  update: function(){
    this.game.physics.arcade.collide(this.virus, this.blockedLayer);
  },

  render: function(){

  }

}