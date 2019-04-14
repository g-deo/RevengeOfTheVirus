var TopDownGame = TopDownGame || {};

TopDownGame.Controls = function(){// 开始场景
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
        var Title = this.game.add.text(this.game.world.centerX, this.game.world.centerY-500, 'Control Page', {
          font: '58px FC',
          align: 'center',
          fill: '#ffffff'
      })
      Title.anchor = {
          x: 0.5,
          y: 0.5
      }
      var Title = this.game.add.text(this.game.world.centerX, this.game.world.centerY-100, 'Virus Generate:\nOpen library to choose virus. \nThen click once to determine position and click twice to dertermine direction.\n\nSkill Use:\nClick on virus to use its skill.\n\nWinning Condition:\n\nKill all white blood cells\n\nLose Condition:\nAll virus got killed.', {
        font: '30px FC',
        align: 'left',
        fill: '#ffffff'
    })
    Title.anchor = {
        x: 0.5,
        y: 0.5
    }

      var text = this.game.add.text(this.game.world.centerX-330, this.game.world.centerY-400, '', {
        font: '25px FC',
        
        fill: '#ffffff'
    })
    var text = this.game.add.text(this.game.world.centerX-330, this.game.world.centerY+100, '',{
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

