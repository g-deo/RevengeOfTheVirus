var TopDownGame = TopDownGame || {};

TopDownGame.Win = function(){// 开始场景
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

      var text = this.game.add.text(this.game.world.centerX, this.game.world.centerY-100, 'Congratulations!', {
        font: '70px FC',
        
        fill: '#ffffff'
    })   
    text.anchor = {
        x: 0.5,
        y: 0.5
    }

    var text = this.game.add.text(this.game.world.centerX, this.game.world.centerY, 'You Win!',{
        font: '70px FC',
        
        fill: '#ffffff'
    })  
    text.anchor = {
        x: 0.5,
        y: 0.5
    }
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
