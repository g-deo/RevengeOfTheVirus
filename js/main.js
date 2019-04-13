TopDownGame.game = new Phaser.Game(700, 1200, Phaser.AUTO, '');

TopDownGame.game.state.add('Boot', TopDownGame.Boot);

TopDownGame.game.state.add('Help', TopDownGame.Help);
TopDownGame.game.state.add('Controls', TopDownGame.Controls);
TopDownGame.game.state.add('Menu', TopDownGame.Menu);
TopDownGame.game.state.add('Levels', TopDownGame.Levels);
TopDownGame.game.state.add('Preload', TopDownGame.Preload);
TopDownGame.game.state.add('Game', TopDownGame.Game);
TopDownGame.game.state.add('Win', TopDownGame.Win);
TopDownGame.game.state.add('Lost', TopDownGame.Lost);

TopDownGame.game.state.start('Preload');