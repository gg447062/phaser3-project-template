import Phaser from 'phaser';

export default class StartScreen extends Phaser.Scene {
  constructor() {
    super('bootGame');
  }

  preload() {
    this.load.image('space', '../src/assets/space.png');
    this.load.image('logo', '../src/assets/logo.png');
    this.load.image('star', '../src/assets/star.png');
    this.load.image('asteroid1', '../src/assets/asteroid-1.png');
    // this.load.image('asteroid2', '../src/assets/asteroid-2.png');
    // this.load.image('asteroid3', '../src/assets/asteroid-3.png');
    // this.load.image('asteroid4', '../src/assets/asteroid-4.png');

    this.load.spritesheet('skull', '../src/assets/skull4.png', {
      frameWidth: 46,
      frameHeight: 56,
    });

    this.load.spritesheet('logo-skull', '../src/assets/logo-skull.png', {
      frameWidth: 176,
      frameHeight: 224,
    });
    this.load.spritesheet('explosion1', '../src/assets/explosion1.png', {
      frameWidth: 64,
      frameHeight: 64,
    });
    this.load.spritesheet('explosion2', '../src/assets/explosion2.png', {
      frameWidth: 64,
      frameHeight: 64,
    });
    this.load.spritesheet('explosion3', '../src/assets/explosion4.png', {
      frameWidth: 64,
      frameHeight: 64,
    });
    this.load.spritesheet('laser', '../src/assets/laser2.png', {
      frameWidth: 40,
      frameHeight: 4,
    });
    this.load.spritesheet('blast', '../src/assets/upgradedBullet.png', {
      frameWidth: 16,
      frameHeight: 16,
    });
    this.load.spritesheet('powerup1', '../src/assets/powerup1.png', {
      frameWidth: 64,
      frameHeight: 64,
    });
    this.load.spritesheet('powerup2', '../src/assets/powerup2.png', {
      frameWidth: 38,
      frameHeight: 38,
    });
    this.load.spritesheet('shield', '../src/assets/shield.png', {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet('shield-sprite', '../src/assets/shield-sprite.png', {
      frameWidth: 74,
      frameHeight: 74,
    });
    this.load.spritesheet('angel', '../src/assets/angel.png', {
      frameWidth: 56,
      frameHeight: 58,
    });
  }

  create() {
    this.anims.create({
      key: 'skull_anim',
      frames: [{ key: 'skull', frame: 2 }],
      frameRate: 20,
      repeat: -1,
    });

    this.anims.create({
      key: 'skull_fire_anim',
      frames: this.anims.generateFrameNumbers('skull', { start: 0, end: 1 }),
      frameRate: 16,
      repeat: 0,
    });

    this.anims.create({
      key: 'skull_laugh_anim',
      frames: this.anims.generateFrameNumbers('skull', { start: 2, end: 3 }),
      frameRate: 20,
      repeat: 3,
    });

    this.anims.create({
      key: 'skull_logo_anim',
      frames: this.anims.generateFrameNumbers('logo-skull', {
        start: 0,
        end: 24,
      }),
      frameRate: 6,
      repeat: -1,
    });

    this.anims.create({
      key: 'explode',
      frames: this.anims.generateFrameNumbers('explosion1'),
      frameRate: 20,
      repeat: 0,
      hideOnComplete: true,
    });

    this.anims.create({
      key: 'explode2',
      frames: this.anims.generateFrameNumbers('explosion2'),
      frameRate: 12,
      repeat: 0,
      hideOnComplete: true,
    });

    this.anims.create({
      key: 'explode3',
      frames: this.anims.generateFrameNumbers('explosion3'),
      frameRate: 20,
      repeat: 0,
      hideOnComplete: true,
    });

    this.anims.create({
      key: 'laser_anim',
      frames: this.anims.generateFrameNumbers('laser'),
      frameRate: 25,
      repeat: -1,
    });

    this.anims.create({
      key: 'blast_anim',
      frames: this.anims.generateFrameNumbers('blast'),
      frameRate: 15,
      repeat: -1,
    });

    this.anims.create({
      key: 'powerup1_anim',
      frames: this.anims.generateFrameNumbers('powerup1'),
      frameRate: 20,
      repeat: -1,
    });
    this.anims.create({
      key: 'powerup2_anim',
      frames: this.anims.generateFrameNumbers('powerup2'),
      frameRate: 20,
      repeat: -1,
    });
    this.anims.create({
      key: 'shield_anim',
      frames: this.anims.generateFrameNumbers('shield'),
      frameRate: 20,
      repeat: -1,
    });
    this.anims.create({
      key: 'shield_sprite_anim',
      frames: this.anims.generateFrameNumbers('shield-sprite'),
      frameRate: 20,
      repeat: -1,
    });

    this.anims.create({
      key: 'angel_anim',
      frames: this.anims.generateFrameNumbers('angel'),
      frameRate: 7,
      repeat: -1,
    });
    this.background = this.add.image(0, 0, 'logo');
    this.background.setOrigin(0, 0);
    this.skullLogo = this.add.sprite(400, 350, 'logo-skull');
    this.skullLogo.setScale(0.5);
    this.skullLogo.play('skull_logo_anim');
    const scene = this.scene;
    this.input.keyboard.on('keydown-SPACE', function () {
      scene.start('playGame');
    });
  }
}
