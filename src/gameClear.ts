import Phaser = require('phaser');
export default class GameClear extends Phaser.Scene {
  constructor() {
    super({
      key: 'gameClear',
    });
  }

  create(): void {
    const text = this.add.text(400, 400, 'GAME CLEAR');
    text.setInteractive();
    text.on('pointerdown', () => {
      this.scene.start('title');
    });
  }
}
