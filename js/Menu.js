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
        var progressText2 = this.game.add.text(this.game.world.centerX, this.game.world.centerY-300, 'Menu', {
          font: '58px FC',
          align: 'center',
          fill: '#ffffff'
      })
      progressText2.anchor = {
          x: 0.5,
          y: 0.5
      }
        var progressText2 = this.game.add.text(this.game.world.centerX, this.game.world.centerY, ' Tap to Start', {
            font: '58px FC',
            align: 'center',
            fill: '#ffffff'
        })
        progressText2.anchor = {
            x: 0.5,
            y: 0.5
        }

        progressText2.inputEnabled = true // 开启输入事件

        progressText2.events.onInputDown.add(function() {
          this.game.state.start('Preload')
        }, this)
    }

};

