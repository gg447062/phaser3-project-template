import Phaser from 'phaser';

export default class GameOver extends Phaser.Scene {
  constructor() {
    super('game-over');
  }
  create() {
    this.add.text(300, 300, 'game over :(');
    const scene = this.scene;
    const restart = this.add.text(300, 400, 'click to restart!');
    restart
      .setInteractive({ useHandCursor: true })
      .on('pointerover', () => {
        restart.setStyle({ fill: '#ff0' });
      })
      .on('pointerout', () => {
        restart.setStyle({ fill: '#fff' });
      })
      .on('pointerdown', () => {
        scene.start('playGame');
      });
  }
}
