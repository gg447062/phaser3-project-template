import Phaser from 'phaser';

export default class BossLevel extends Phaser.Scene {
  constructor() {
    super('boss-level');
  }
  create() {
    this.background = this.add.tileSprite(0, 0, 800, 600, 'space');
    this.background.setOrigin(0, 0);

    this.cursors = this.input.keyboard.createCursorKeys();
    this.spacebar = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );

    this.skull = this.createShip();
    this.skull.on('animationcomplete', () => {
      this.skull.play('skull_anim');
    });

    this.projectiles = this.add.group();

    this.enemyProjectiles = this.add.group();

    this.asteroids = this.add.group();

    this.powerups = this.add.group();

    this.enemies = this.add.group();

    this.shield = this.createShield();

    this.scoreLabel = this.createScoreLabel(16, 16, this.score);
  }

  update() {
    this.background.tilePositionX += 1.5;
    this.moveShip();
    if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
      this.shootWeapon();
    }
  }

  createShip() {
    const skull = this.physics.add.sprite(50, 300, 'skull');
    skull.play('skull_anim');
    skull.setCollideWorldBounds(true);
    return skull;
  }

  moveShip() {
    if (this.cursors.up.isDown) {
      this.skull.setVelocityY(-this.playerSpeed);
    } else if (this.cursors.down.isDown) {
      this.skull.setVelocityY(this.playerSpeed);
    } else if (this.cursors.right.isDown) {
      this.skull.setVelocityX(this.playerSpeed);
    } else if (this.cursors.left.isDown) {
      this.skull.setVelocityX(-this.playerSpeed);
    } else {
      this.skull.setVelocityY(0);
      this.skull.setVelocityX(0);
    }
  }

  shootWeapon() {
    if (this.skull.active) {
      if (this.weaponType === 'tri-blast') {
        this.skull.play('skull_fire_anim');
        let initAngle = -100;
        for (let i = 0; i < 3; i++) {
          const bullet = this.physics.add.sprite(
            this.skull.x + 35,
            this.skull.y - 10,
            this.weaponType
          );
          bullet.play(`blast_anim`);
          bullet.setVelocityX(400);
          bullet.setVelocityY(initAngle);
          this.projectiles.add(bullet);
          initAngle += 100;
        }
      } else {
        const bullet = this.physics.add.sprite(
          this.skull.x + 35,
          this.skull.y - 10,
          this.weaponType
        );
        this.skull.play('skull_fire_anim');
        bullet.play(`${this.weaponType}_anim`);
        bullet.setVelocityX(400);
        this.projectiles.add(bullet);
      }
    }
  }
}
