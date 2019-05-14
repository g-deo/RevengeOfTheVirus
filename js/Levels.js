var TopDownGame = TopDownGame || {};

TopDownGame.Levels = function(){// 开始场景
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
        var Title = this.game.add.text(this.game.world.centerX, this.game.world.centerY-500, 'Level Selecting Page', {
          font: '100px FC',
          align: 'center',
          fill: '#ffffff'
      })
      Title.anchor = {
          x: 0.5,
          y: 0.5
      }

      var Level0 = this.game.add.text(this.game.world.centerX, this.game.world.centerY-400, 'Tutorial', {
        font: '58px FC',
        align: 'center',
        fill: '#ffffff'
      })
      Level0.anchor = {
          x: 0.5,
          y: 0.5
      }

      Level0.inputEnabled = true // 开启输入事件

      Level0.events.onInputDown.add(function() {
        this.game.state.start('GameLevel0');
      }, this)

        var Level1 = this.game.add.text(this.game.world.centerX, this.game.world.centerY-300, 'Level 1', {
            font: '58px FC',
            align: 'center',
            fill: '#ffffff'
        })
        Level1.anchor = {
            x: 0.5,
            y: 0.5
        }

        Level1.inputEnabled = true // 开启输入事件

        Level1.events.onInputDown.add(function() {
          this.game.state.start('GameLevel1');
        }, this)

        var Level2 = this.game.add.text(this.game.world.centerX, this.game.world.centerY-200, 'Level 2', {
            font: '58px FC',
            align: 'center',
            fill: '#ffffff'
        })
        Level2.anchor = {
            x: 0.5,
            y: 0.5
        }

        Level2.inputEnabled = true // 开启输入事件

        Level2.events.onInputDown.add(function() {
          this.game.state.start('GameLevel2')
        }, this)
        var Level3 = this.game.add.text(this.game.world.centerX, this.game.world.centerY-100, 'Level 3', {
            font: '58px FC',
            align: 'center',
            fill: '#ffffff'
        })
        Level3.anchor = {
            x: 0.5,
            y: 0.5
        }

        Level3.inputEnabled = true // 开启输入事件

        Level3.events.onInputDown.add(function() {
          this.game.state.start('GameLevel3')
        }, this)
        var Level4 = this.game.add.text(this.game.world.centerX, this.game.world.centerY, 'Level 4', {
            font: '58px FC',
            align: 'center',
            fill: '#ffffff'
        })
        Level4.anchor = {
            x: 0.5,
            y: 0.5
        }

        Level4.inputEnabled = true // 开启输入事件

        Level4.events.onInputDown.add(function() {
          this.game.state.start('GameLevel4')
        }, this)
        var Level5 = this.game.add.text(this.game.world.centerX, this.game.world.centerY+100, 'Level 5', {
            font: '58px FC',
            align: 'center',
            fill: '#ffffff'
        })
        Level5.anchor = {
            x: 0.5,
            y: 0.5
        }

        Level5.inputEnabled = true // 开启输入事件

        Level5.events.onInputDown.add(function() {
          this.game.state.start('GameLevel5')
        }, this)
        var Level6 = this.game.add.text(this.game.world.centerX, this.game.world.centerY+200, 'Level 6', {
            font: '58px FC',
            align: 'center',
            fill: '#ffffff'
        })
        Level6.anchor = {
            x: 0.5,
            y: 0.5
        }

        Level6.inputEnabled = true // 开启输入事件

        Level6.events.onInputDown.add(function() {
          this.game.state.start('GameLevel6')
        }, this)

        var GoBack = this.game.add.text(this.game.world.centerX, this.game.world.centerY+450, 'Main Menu', {
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
      var GoHelp = this.game.add.text(this.game.world.centerX, this.game.world.centerY+550, 'Help', {
        font: '58px FC',
        align: 'center',
        fill: '#ffffff'
    })
    GoHelp.anchor = {
        x: 0.5,
        y: 0.5
    }
    
    GoHelp.inputEnabled = true // 开启输入事件
    GoHelp.events.onInputDown.add(function() {
      this.game.state.start('Help')
    }, this)
  }
};

