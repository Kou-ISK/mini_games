import * as Phaser from 'phaser';
var platforms;
var cursors: Phaser.Types.Input.Keyboard.CursorKeys | undefined;
var player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
var score: number = 0;
var scoreText: Phaser.GameObjects.Text;
var clearText: Phaser.GameObjects.Text;
var stars;
const CLEAR_SCORE = 12;

class MyScene extends Phaser.Scene {
  constructor() {
    super('myscene');
  }

  preload() {
    this.load.image('street', 'assets/street.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.image('star', 'assets/star.png');
    this.load.spritesheet('player', 'assets/dude.png', {
      frameWidth: 32,
      frameHeight: 48,
    });
  }

  create() {
    this.add.image(400, 300, 'street');
    scoreText = this.add.text(0, 30, `Score: ${score}`);
    // TODO addListenerの挙動を調べる
    clearText = this.add.text(350, 300, '');
    platforms = this.physics.add.staticGroup();
    platforms.create(400, 568, 'ground').setScale(2).refreshBody();
    platforms.create(600, 400, 'ground').setScale(0.5).refreshBody();
    platforms.create(50, 400, 'ground').setScale(0.5).refreshBody();
    platforms.create(50, 250, 'ground');
    platforms.create(750, 220, 'ground');
    cursors = this.input.keyboard?.createCursorKeys();
    // プレイヤーを初期配置する。
    player = this.physics.add.sprite(100, 450, 'player');
    player.setCollideWorldBounds(true); // 画面枠にぶつかっちゃう
    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: 'turn',
      frames: [{ key: 'player', frame: 4 }],
      frameRate: 20,
    });

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('player', { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1,
    });
    stars = this.physics.add.group({
      key: 'star',
      repeat: 11,
      setXY: { x: 12, y: 0, stepX: 70 },
    });

    stars.children.iterate((child: any) => {
      return child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });

    this.physics.add.collider(stars, platforms);
    this.physics.add.collider(player, platforms);
    this.physics.add.overlap(player, stars, collectStar, undefined, this);
  }
  update() {
    if (cursors) {
      if (cursors.left.isDown) {
        player.setVelocityX(-160);
        player.anims.play('left', true);
      } else if (cursors.right.isDown) {
        player.setVelocityX(160);
        player.anims.play('right', true);
      } else {
        player.setVelocityX(0);
        player.anims.play('turn');
      }

      if (cursors.up.isDown && player.body.touching.down) {
        player.setVelocityY(-330);
      }
    }
  }
}

const collectStar = (player: any, star: any) => {
  score += 1;
  star.disableBody(true, true);
  scoreText.setText(`Score: ${score}`);
  if (score >= CLEAR_SCORE) {
    clearText.setText('GAME CLEAR');
  }
};

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
  scene: MyScene,
};

new Phaser.Game(config);
