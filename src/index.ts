import * as Phaser from 'phaser';
import TitleScene from './title';
import StarCollecting from './starCollecting';
import GameClear from './gameClear';

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: 'game-app',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false,
    },
  },
  scene: [TitleScene, StarCollecting, GameClear],
};

new Phaser.Game(config);
