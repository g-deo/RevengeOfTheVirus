TopDownGame.game = new Phaser.Game(1200, 1200, Phaser.AUTO, '');

TopDownGame.game.state.add('Boot', TopDownGame.Boot);

TopDownGame.game.state.add('Help', TopDownGame.Help);
TopDownGame.game.state.add('Controls', TopDownGame.Controls);
TopDownGame.game.state.add('ControlsHelp', TopDownGame.ControlsHelp);
TopDownGame.game.state.add('Menu', TopDownGame.Menu);
TopDownGame.game.state.add('Levels', TopDownGame.Levels);
TopDownGame.game.state.add('Preload', TopDownGame.Preload);
TopDownGame.game.state.add('GameLevel0', TopDownGame.GameLevel0);
TopDownGame.game.state.add('GameLevel1', TopDownGame.GameLevel1);
TopDownGame.game.state.add('GameLevel2', TopDownGame.GameLevel2);
TopDownGame.game.state.add('GameLevel3', TopDownGame.GameLevel3);
TopDownGame.game.state.add('GameLevel4', TopDownGame.GameLevel4);
TopDownGame.game.state.add('GameLevel5', TopDownGame.GameLevel5);
TopDownGame.game.state.add('GameLevel6', TopDownGame.GameLevel6);
//TopDownGame.game.state.add('GameLevel7', TopDownGame.GameLevel7);
//TopDownGame.game.state.add('GameLevel8', TopDownGame.GameLevel8);
TopDownGame.game.state.add('Win', TopDownGame.Win);
TopDownGame.game.state.add('Lost', TopDownGame.Lost);
TopDownGame.game.state.add('Cutscene', TopDownGame.Cutscene);
TopDownGame.game.state.add('PrePreload', TopDownGame.PrePreload);

TopDownGame.game.state.start('PrePreload');