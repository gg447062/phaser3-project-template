import Phaser from 'phaser';

export default class StartScreen extends Phaser.Scene {
  constructor() {
    super('bootGame');
  }

  preload() {
    this.load.audio('dead', '../src/assets/audio/cuando_mueres.mp3');
    this.load.audio('intro', '../src/assets/audio/intro.mp3');
    this.load.audio('bossBattle', '../src/assets/Lucha_con_dios.mp3');
    this.load.audio('overworld', '../src/assets/audio/overworld.mp3');

    this.load.audio('laser', '../src/assets/audio/disparo1.mp3');
    this.load.audio('blast', '../src/assets/audio/bola_distor.mp3');
    this.load.audio('tri-blast', '../src/assets/audio/disparo3.mp3');
    this.load.audio('shield_grab', '../src/assets/audio/shield.mp3');
    this.load.audio('awebo', '../src/assets/audio/awebo.mp3');
    this.load.audio('powerup1', '../src/assets/audio/power_up_bola.mp3');
    this.load.audio('angel_die', '../src/assets/audio/angel_muere.mp3');
    this.load.audio('exp_kalaka', '../src/assets/audio/exp_kalaka.mp3');
    this.load.audio('dios_entra', '../src/assets/audio/dios_entra.mp3');
    this.load.audio(
      'dios_se_muere',
      '../src/assets/audio/diosito_se_muere.mp3'
    );
    this.load.audio('aleluya', '../src/assets/audio/aleluya_2.mp3');
    this.load.audio('asteroid', '../src/assets/audio/asteroide_real.mp3');
    this.load.image('space', '../src/assets/images/space.png');
    this.load.image('logo', '../src/assets/images/logo.png');
    this.load.image('star', '../src/assets/images/star.png');
    this.load.image('asteroid1', '../src/assets/images/asteroid-1.png');
    // this.load.image('asteroid2', '../src/assets/asteroid-2.png');
    // this.load.image('asteroid3', '../src/assets/asteroid-3.png');
    // this.load.image('asteroid4', '../src/assets/asteroid-4.png');

    this.load.spritesheet('skull', '../src/assets/images/skull4.png', {
      frameWidth: 46,
      frameHeight: 56,
    });

    this.load.spritesheet('logo-skull', '../src/assets/images/logo-skull.png', {
      frameWidth: 176,
      frameHeight: 224,
    });
    this.load.spritesheet('explosion1', '../src/assets/images/explosion1.png', {
      frameWidth: 64,
      frameHeight: 64,
    });
    this.load.spritesheet('explosion2', '../src/assets/images/explosion2.png', {
      frameWidth: 64,
      frameHeight: 64,
    });
    this.load.spritesheet('explosion3', '../src/assets/images/explosion4.png', {
      frameWidth: 64,
      frameHeight: 64,
    });
    this.load.spritesheet('laser', '../src/assets/images/laser2.png', {
      frameWidth: 40,
      frameHeight: 4,
    });
    this.load.spritesheet('blast', '../src/assets/images/upgradedBullet.png', {
      frameWidth: 16,
      frameHeight: 16,
    });
    this.load.spritesheet('powerup1', '../src/assets/images/powerup1.png', {
      frameWidth: 64,
      frameHeight: 64,
    });
    this.load.spritesheet('powerup2', '../src/assets/images/powerup2.png', {
      frameWidth: 38,
      frameHeight: 38,
    });
    this.load.spritesheet('shield', '../src/assets/images/shield.png', {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet(
      'shield-sprite',
      '../src/assets/images/shield-sprite.png',
      {
        frameWidth: 74,
        frameHeight: 74,
      }
    );
    this.load.spritesheet('angel', '../src/assets/images/angel.png', {
      frameWidth: 56,
      frameHeight: 58,
    });

    this.load.spritesheet('boss', '../src/assets/images/diosito.png', {
      frameWidth: 88,
      frameHeight: 140,
    });

    this.load.spritesheet(
      'boss_hit',
      '../src/assets/images/diosito_pegado.png',
      {
        frameWidth: 88,
        frameHeight: 140,
      }
    );

    this.load.spritesheet('rayo', '../src/assets/images/lightning.png', {
      frameWidth: 64,
      frameHeight: 17,
    });
  }

  create() {
    const music = this.sound.add('intro');
    const musicConfig = {
      mute: false,
      volume: 1,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: true,
      delay: 0,
    };
    music.play(musicConfig);

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
        end: 14,
      }),
      frameRate: 6,
      repeat: -1,
    });

    this.anims.create({
      key: 'skull_start_anim',
      frames: this.anims.generateFrameNumbers('logo-skull', {
        start: 21,
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
      key: 'explode4',
      frames: this.anims.generateFrameNumbers('explosion3'),
      frameRate: 20,
      repeat: 10,
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

    this.anims.create({
      key: 'boss_anim',
      frames: this.anims.generateFrameNumbers('boss'),
      frameRate: 12,
      repeat: -1,
    });

    this.anims.create({
      key: 'boss_hit_anim',
      frames: this.anims.generateFrameNumbers('boss_hit'),
      frameRate: 12,
      repeat: 0,
    });

    this.anims.create({
      key: 'rayo_anim',
      frames: this.anims.generateFrameNumbers('rayo'),
      frameRate: 12,
      repeat: -1,
    });

    this.background = this.add.image(0, 0, 'logo');
    this.background.setOrigin(0, 0);
    const skullLogo = this.add.sprite(400, 350, 'logo-skull');
    skullLogo.setScale(0.75);
    skullLogo.play('skull_start_anim');
    this.add.text(120, 480, 'press ENTER to play', {
      fontSize: '30px',
      fontFamily: "'Press Start 2P', 'cursive'",
    });
    const time = this.time;
    const scene = this.scene;
    this.input.keyboard.on('keydown-ENTER', function () {
      // skullLogo.play('skull_start_anim');
      time.addEvent({
        delay: 1000,
        callback: () => {
          music.stop();
          scene.start('playGame');
        },
        callbackScope: this,
        loop: false,
      });
    });
  }
}
