var TopDownGame = TopDownGame || {};

TopDownGame.Cutscene = function(){// 开始场景
    this.create = function() {    //loading screen will have a white background
        this.background1 = this.game.add.sprite(0,0,'intro1');
        this.background1.x = this.game.world.centerX;
        this.background1.y = this.game.world.centerY;
        this.background1.anchor.set(0.5,0.5);

        this.background2 = this.game.add.sprite(0,0,'intro2');
        this.background2.x = this.game.world.centerX;
        this.background2.y = this.game.world.centerY;
        this.background2.anchor.set(0.5,0.5);
        this.background2.visible = false;

        enterKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        keyDown = false;
        lastSlide = false;
        mouseDown = false;
        
        //Scaling options
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        
        //have the game centered horizontally
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
    }

    this.update = function(){
        if(enterKey.isDown){
            keyDown = true;
        }
        if(enterKey.isUp && keyDown){
            keyDown = false;
            if(!lastSlide){
                this.background1.visible = false;
                this.background2.visible = true;
                lastSlide = true;
            }
            else{
                this.game.state.start('Boot');
            }
        }
        
        if(this.game.input.activePointer.isDown){
            mouseDown = true;
        }
        if(this.game.input.activePointer.isUp && mouseDown){
            mouseDown = false;
            if(!lastSlide){
                this.background1.visible = false;
                this.background2.visible = true;
                lastSlide = true;
            }
            else{
                this.game.state.start('Boot');
            }
        }
    }

};

