var TopDownGame = TopDownGame || {};

TopDownGame.Menu = function(){// 开始场景
    this.create = function() {    //loading screen will have a white background

      if(!this.hasOwnProperty('playing')){
        music = new Phaser.Sound(this.game,'bgm',1,true);
        music.play();
        this.playing = true;
      }

      this.game.stage.backgroundColor = '#000000';
      this.background = this.game.add.sprite(0,0,'gameTiles');
      this.background.x = this.game.world.centerX;
      this.background.y = this.game.world.centerY;
      this.background.anchor.set(0.5,0.5);
      
      //Scaling options
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      
      //have the game centered horizontally
      this.scale.pageAlignHorizontally = true;
      this.scale.pageAlignVertically = true;
        // 循环背景
      //  var bg = game.add.tileSprite(0, 0, game.width, game.height, 'background')
      //  bg.autoScroll(0, 200)

        // START 文字
        var Title = this.game.add.text(this.game.world.centerX, this.game.world.centerY-500, 'Main Menu', {
          font: '100px FC',
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
        this.game.state.start('Controls')
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
      this.game.state.start('Help')
    }, this)
   // 
   // var TestWin = this.game.add.text(this.game.world.centerX, this.game.world.centerY+300, 'Test win page', {
   //   font: '58px FC',
   //   align: 'center',
   //   fill: '#ffffff'
  //})
  //TestWin.anchor = {
  //    x: 0.5,
  //    y: 0.5
  //}
//
 // TestWin.inputEnabled = true // 开启输入事件
 // TestWin.events.onInputDown.add(function() {
 //   this.game.state.start('Win')
 // }, this)
//
//  var TestLost = this.game.add.text(this.game.world.centerX, this.game.world.centerY+400, 'Test lost page', {
 //   font: '58px FC',
    // align: 'center',
 //    fill: '#ffffff'
// })
// TestLost.anchor = {
//     x: 0.5,
  //   y: 0.5
// }

// TestLost.inputEnabled = true // 开启输入事件
//TestLost.events.onInputDown.add(function() {
//  this.game.state.start('Lost')
//}, this)
//tests 
    }

};

