import Phaser from 'phaser';
import StartScreen from './StartScreen';
import FirstLevel from './FirstLevel';
import GameOver from './GameOver';
import BossLevel from './BossLevel';
import YouWon from './YouWon';

const config = {
  type: Phaser.CANVAS,
  parent: 'phaser-example',
  width: 800,
  height: 600,
  backgroundColor: 0x000000,
  scene: [StartScreen, FirstLevel, BossLevel, GameOver, YouWon],
  canvas: document.getElementById('game'),
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
    },
  },
  pixelArt: true,
};

const game = new Phaser.Game(config);
