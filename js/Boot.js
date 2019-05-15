var TopDownGame = TopDownGame || {};

TopDownGame.Boot = function(){// 开始场景
  
    this.create = function() {    //loading screen will have a white background

      //Setting background to black color.
      this.game.stage.backgroundColor = '#000000';
      this.game.physics.startSystem(Phaser.Physics.ARCADE);
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
        /*var progressText = this.game.add.text(this.game.world.centerX, this.game.world.centerY-500, 'Revenge of The Virus', {
          font: '100px FC',
          align: 'center',
          fill: '#ffffff'
      })*/

      var logo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY-500, 'logo');
      logo.anchor.set(0.5,0.5);
      /*progressText.anchor = {
          x: 0.5,
          y: 0.5
      }*/
        var progressText = this.game.add.text(this.game.world.centerX, this.game.world.centerY, ' TAP TO START', {
            font: '58px FC',
            align: 'center',
            fill: '#ffffff'
        })
        progressText.anchor = {
            x: 0.5,
            y: 0.5
        }

        progressText.inputEnabled = true // 开启输入事件

        progressText.events.onInputDown.add(function() {
          this.game.state.start('Menu')
        }, this)
    }

};

