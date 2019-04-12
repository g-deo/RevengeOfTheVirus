var TopDownGame = TopDownGame || {};

TopDownGame.Menu = function(){// 开始场景
    this.create = function() {    //loading screen will have a white background
      this.game.stage.backgroundColor = '#000000';
  
      //scaling options
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      
      //have the game centered horizontally
      this.scale.pageAlignHorizontally = true;
      this.scale.pageAlignVertically = true;
        // 循环背景
      //  var bg = game.add.tileSprite(0, 0, game.width, game.height, 'background')
      //  bg.autoScroll(0, 200)

        // START 文字
        var Title = this.game.add.text(this.game.world.centerX, this.game.world.centerY-500, 'Revenge Menu Page', {
          font: '58px FC',
          align: 'center',
          fill: '#ffffff'
      })
      Title.anchor = {
          x: 0.5,
          y: 0.5
      }
        var Levels = this.game.add.text(this.game.world.centerX, this.game.world.centerY, 'Levels', {
            font: '58px FC',
            align: 'center',
            fill: '#ffffff'
        })
        Levels.anchor = {
            x: 0.5,
            y: 0.5
        }

        Levels.inputEnabled = true // 开启输入事件

        Levels.events.onInputDown.add(function() {
          this.game.state.start('Levels')
        }, this)

        var Controls = this.game.add.text(this.game.world.centerX, this.game.world.centerY+100, 'Controls', {
          font: '58px FC',
          align: 'center',
          fill: '#ffffff'
      })
      Controls.anchor = {
          x: 0.5,
          y: 0.5
      }

      Controls.inputEnabled = true // 开启输入事件

      Controls.events.onInputDown.add(function() {
        this.game.state.start('Preload')
      }, this)

      var Help = this.game.add.text(this.game.world.centerX, this.game.world.centerY+200, 'Help', {
        font: '58px FC',
        align: 'center',
        fill: '#ffffff'
    })
    Help.anchor = {
        x: 0.5,
        y: 0.5
    }

    Help.inputEnabled = true // 开启输入事件
    Help.events.onInputDown.add(function() {
      this.game.state.start('Preload')
    }, this)
//tests 
    }

};

