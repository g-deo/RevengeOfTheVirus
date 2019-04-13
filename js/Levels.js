var TopDownGame = TopDownGame || {};

TopDownGame.Levels = function(){// 开始场景
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
        var Title = this.game.add.text(this.game.world.centerX, this.game.world.centerY-500, 'Level Selecting Page', {
          font: '58px FC',
          align: 'center',
          fill: '#ffffff'
      })
      Title.anchor = {
          x: 0.5,
          y: 0.5
      }
        var Level1 = this.game.add.text(this.game.world.centerX, this.game.world.centerY-200, 'Level1', {
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
          this.game.state.start('Game');
        }, this)

        var Level2 = this.game.add.text(this.game.world.centerX, this.game.world.centerY-100, 'Level2', {
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
          this.game.state.start('Preload')
        }, this)
        var Level3 = this.game.add.text(this.game.world.centerX, this.game.world.centerY, 'Level3', {
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
          this.game.state.start('Preload')
        }, this)
        var Level4 = this.game.add.text(this.game.world.centerX, this.game.world.centerY+100, 'Level4', {
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
          this.game.state.start('Preload')
        }, this)
        var Level5 = this.game.add.text(this.game.world.centerX, this.game.world.centerY+200, 'Level5', {
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
          this.game.state.start('Preload')
        }, this)
        var Level6 = this.game.add.text(this.game.world.centerX, this.game.world.centerY+300, 'Level6', {
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
          this.game.state.start('Preload')
        }, this)

    }

};

