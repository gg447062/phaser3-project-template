import Phaser from 'phaser';

export default class YouWon extends Phaser.Scene {
  constructor() {
    super('you-won');
  }

  init(data) {
    this.accuracy = data.accuracy;
  }

  create() {
    this.add.text(220, 230, 'you won! :)', {
      fontSize: '30px',
      fontFamily: "'Press Start 2P', 'cursive'",
    });

    this.add.text(220, 270, `accuracy: ${this.accuracy}%`, {
      fontSize: '30px',
      fontFamily: "'Press Start 2P', 'cursive'",
    });

    const scene = this.scene;
    this.add.text(60, 320, 'press enter to play again!!', {
      fontSize: '30px',
      fontFamily: "'Press Start 2P', 'cursive'",
    });
    this.input.keyboard.on('keydown-ENTER', function () {
      scene.start('playGame');
    });
  }
}
