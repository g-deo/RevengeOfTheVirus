var TopDownGame = TopDownGame || {};

TopDownGame.Help = function(){// 开始场景
    this.create = function() {    //loading screen will have a white background
      this.game.stage.backgroundColor = '#000000';
      this.background = this.game.add.sprite(0,0,'gameTiles');
      this.background.x = this.game.world.centerX;
      this.background.y = this.game.world.centerY;
      this.background.anchor.set(0.5,0.5);  
      //scaling options
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      
      //have the game centered horizontally
      this.scale.pageAlignHorizontally = true;
      this.scale.pageAlignVertically = true;
        // 循环背景
      //  var bg = game.add.tileSprite(0, 0, game.width, game.height, 'background')
      //  bg.autoScroll(0, 200)

        // START 文字
        var Title = this.game.add.text(this.game.world.centerX, this.game.world.centerY-500, 'Help Page', {
          font: '58px FC',
          align: 'center',
          fill: '#ffffff'
      })
      Title.anchor = {
          x: 0.5,
          y: 0.5
      }
      var text = this.game.add.text(this.game.world.centerX-330, this.game.world.centerY-400, 'BackGround: \nIt is year 2040. An unprecedented virus outbreak has \nplagued the nation, with its deadliest quality being its\nability to mimic the form of other viruses, and even \nbacteria, on the fly. As the central hivemind of these \nmutant viruses, the player commands them to shift form \nand move strategically in an attempt to overwhelm the \nimmune systems of the only remaining uninfected \nhumans.', {
        font: '25px FC',
        
        fill: '#ffffff'
    })
    var text = this.game.add.text(this.game.world.centerX-330, this.game.world.centerY+100, 'Developers: \n   William Chen\n   Gaorav Deo\n   Lijiqing Tang',{
        font: '25px FC',
        
        fill: '#ffffff'
    })
        var GoBack = this.game.add.text(this.game.world.centerX, this.game.world.centerY+500, 'Main Menu', {
          font: '58px FC',
          align: 'center',
          fill: '#ffffff'
      })
      GoBack.anchor = {
          x: 0.5,
          y: 0.5
      }
    
      GoBack.inputEnabled = true // 开启输入事件
      GoBack.events.onInputDown.add(function() {
        this.game.state.start('Menu')
      }, this)
    
    }

};

