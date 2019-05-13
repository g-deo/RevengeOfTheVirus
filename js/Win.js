var TopDownGame = TopDownGame || {};

TopDownGame.Win = function(){// 开始场景
    this.create = function() {    //loading screen will have a white background

      this.game.currentBGM.pause();
      this.game.currentBGM = this.game.BGMs[7];
      this.game.currentBGM.play();  

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

      var text = this.game.add.text(this.game.world.centerX, this.game.world.centerY-100, 'Congratulations!', {
        font: '100px FC',
        
        fill: '#ffffff'
    })   
    text.anchor = {
        x: 0.5,
        y: 0.5
    }

    var winText = "You Win!"
    if (this.game.level < 6) winText = "Level Complete!"

    var text = this.game.add.text(this.game.world.centerX, this.game.world.centerY, winText,{
        font: '100px FC',
        
        fill: '#ffffff'
    })  
    text.anchor = {
        x: 0.5,
        y: 0.5
    }
      var GoBack = this.game.add.text(this.game.world.centerX, this.game.world.centerY+525, 'Main Menu', {
        font: '58px FC',
        align: 'center',
        fill: '#ffffff'
    })
    GoBack.anchor = {
        x: 0.5,
        y: 0.5
    }
      if(this.game.level < 6){
        var cont = this.game.add.text(this.game.world.centerX, this.game.world.centerY+450, 'Continue', {
          font: '58px FC',
          align: 'center',
          fill: '#ffffff'
        })
        cont.anchor = {
            x: 0.5,
            y: 0.5
        }
        cont.inputEnabled = true // 开启输入事件
        cont.events.onInputDown.add(function() {
          var next = 'GameLevel' + (this.game.level+1);
   
          this.game.state.start(next)
        }, this)
      }
      
    
      GoBack.inputEnabled = true // 开启输入事件
      GoBack.events.onInputDown.add(function() {
        this.game.state.start('Menu')
      }, this)
    }

};

