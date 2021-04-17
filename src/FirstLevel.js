import Phaser from 'phaser';
import ScoreLabel from './ScoreLabel';

export default class FirstLevel extends Phaser.Scene {
  constructor() {
    super('playGame');
  }

  init() {
    this.score = 0;
    this.shotsFired = 0;
    this.enemiesHit = 0;
    this.playerSpeed = 300;
    this.weaponType = 'laser';
    this.soundIndex = 0;
    this.shieldActive = false;
    this.shieldHits = 0;
    this.asteroidSpeed = 200;
    this.asteroidDelay = 3750;
    this.isDead = false;
    this.spawnNumber = 2;
    this.fireRate = 1000;
    this.nextLevel = false;
  }

  create() {
    this.music = this.sound.add('overworld');
    const musicConfig = {
      mute: false,
      volume: 1,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: true,
      delay: 0,
    };
    this.music.play(musicConfig);
    this.cameras.main.fadeIn(2000, 0, 0, 0);
    this.background = this.add.tileSprite(0, 0, 800, 600, 'space');
    this.background.setOrigin(0, 0);

    this.laser = this.sound.add('laser');
    this.blast = this.sound.add('blast');
    this.triBlast = this.sound.add('tri-blast');
    this.soundArray = [this.laser, this.blast, this.triBlast];

    this.shield_grab = this.sound.add('shield_grab');
    this.powerup1_grab = this.sound.add('powerup1');
    this.powerup3_grab = this.sound.add('awebo');
    this.die = this.sound.add('exp_kalaka');
    this.angelDie = this.sound.add('angel_die');
    this.aleluya = this.sound.add('aleluya');
    this.asteroidDestroy = this.sound.add('asteroid');

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

    this.physics.add.collider(
      this.skull,
      this.asteroids,
      this.destroyPlayer,
      null,
      this
    );

    this.physics.add.collider(
      this.skull,
      this.enemyProjectiles,
      this.destroyPlayer,
      null,
      this
    );

    this.physics.add.collider(
      this.shield,
      this.enemyProjectiles,
      this.hitShield,
      null,
      this
    );

    this.physics.add.collider(
      this.shield,
      this.asteroids,
      this.hitShield,
      null,
      this
    );

    this.physics.add.collider(
      this.shield,
      this.enemies,
      this.hitShield,
      null,
      this
    );

    this.physics.add.collider(
      this.projectiles,
      this.asteroids,
      this.destroyAsteroid,
      null,
      this
    );

    this.physics.add.collider(
      this.projectiles,
      this.enemies,
      this.destroyEnemy,
      null,
      this
    );

    this.physics.add.overlap(
      this.powerups,
      this.skull,
      this.addPowerup,
      null,
      this
    );

    this.time.addEvent({
      delay: this.asteroidDelay,
      callback: this.launchAsteroids,
      callbackScope: this,
      loop: true,
    });

    this.time.addEvent({
      delay: this.fireRate,
      callback: this.angelFire,
      callbackScope: this,
      loop: true,
    });
  }

  update() {
    if (this.isDead) {
      const accuracy = ((this.enemiesHit / this.shotsFired) * 100).toFixed(2);
      this.time.addEvent({
        delay: 1000,
        callback: () => {
          this.music.stop();
          this.scene.start('game-over', { accuracy });
        },
        callbackScope: this,
        loop: false,
      });
    } else if (this.score >= 150) {
      this.nextLevel = true;
      // this.cameras.main.fadeOut(2000, 0, 0, 0);
      // this.cameras.main.once(
      //   Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE,
      //   (cam, effect) => {
      //     this.scene.start('boss-level');
      //   }
      // );
      this.time.addEvent({
        delay: 1000,
        callback: () => {
          this.music.stop;
          this.aleluya.play();
          this.scene.start('boss-level', {
            score: this.score,
            shotsFired: this.shotsFired,
            enemiesHit: this.enemiesHit,
          });
        },
        callbackScope: this,
        loop: false,
      });
    }
    this.background.tilePositionX += 1.5;

    this.moveShip();
    if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
      this.shootWeapon();
    }
    if (this.shield.active) {
      this.manageShield();
    }
    this.destroyOffscreen(this.projectiles);
    this.destroyOffscreen(this.asteroids);
    this.destroyOffscreen(this.enemyProjectiles);
    this.manageAngel(this.enemies);
    this.enemyProjectiles.getChildren().forEach((child) => {
      child.rotation += 0.1;
    });
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
        this.soundArray[this.soundIndex].play();
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
          this.shotsFired++;
        }
      } else {
        const bullet = this.physics.add.sprite(
          this.skull.x + 35,
          this.skull.y - 10,
          this.weaponType
        );
        this.skull.play('skull_fire_anim');
        bullet.play(`${this.weaponType}_anim`);
        this.soundArray[this.soundIndex].play();
        bullet.setVelocityX(400);
        this.projectiles.add(bullet);
        this.shotsFired++;
      }
    }
  }

  launchAsteroids() {
    if (!this.nextLevel) {
      for (let i = 0; i < this.spawnNumber; i++) {
        const randomScale = Phaser.Math.Between(1.5, 2);
        const randomStep = Phaser.Math.Between(-250, 250);
        const randomSpeed = Phaser.Math.Between(-50, 50);
        const initY = 300;
        const asteroid = this.physics.add.sprite(
          800,
          initY + randomStep,
          'asteroid1'
        );

        asteroid.setScale(randomScale);
        asteroid.setVelocityX(-this.asteroidSpeed + randomSpeed);
        asteroid.body.immovable = true;
        this.asteroids.add(asteroid);
      }
    }
  }

  releasePowerup(powerupKey) {
    const randomY = Phaser.Math.Between(32, 568);
    const powerup = this.physics.add.sprite(800, randomY, powerupKey);
    powerup.name = powerupKey;
    powerup.setScale(0.75);
    powerup.play(`${powerupKey}_anim`);
    powerup.setVelocityX(-300);
    this.powerups.add(powerup);
  }

  destroyOffscreen(objects) {
    objects.getChildren().forEach((child) => {
      if (child.x > 810 || child.x < -10) {
        child.destroy();
      }
    });
  }

  destroyPlayer(skull, enemy) {
    if (!this.isDead) {
      this.die.play();
      const explosion = this.physics.add.sprite(skull.x, skull.y, 'explosion1');
      explosion.play('explode');
      explosion.setScale(2);

      enemy.destroy();

      skull.disableBody(true, true);

      this.isDead = true;
    }
  }

  destroyAsteroid(laser, asteroid) {
    const explosion = this.physics.add.sprite(
      asteroid.x - 20,
      asteroid.y,
      'explosion2'
    );
    this.asteroidDestroy.play();
    explosion.play('explode2');
    explosion.setScale(1.25);
    laser.destroy();
    asteroid.destroy();
    this.enemiesHit++;
    this.scoreLabel.add(5);
    this.score += 5;
    this.checkScore();
  }

  destroyEnemy(laser, enemy) {
    const explosion = this.physics.add.sprite(
      enemy.x - 10,
      enemy.y,
      'explosion3'
    );
    explosion.play('explode3');
    this.angelDie.play();
    laser.destroy();
    enemy.destroy();
    this.enemiesHit++;
    this.scoreLabel.add(10);
    this.score += 10;
    this.checkScore();
  }

  hitShield(shield, object) {
    object.destroy();
    const explosion = this.physics.add.sprite(
      object.x - 20,
      object.y,
      'explosion2'
    );
    explosion.play('explode2');
    if (this.shieldHits < 2) {
      this.shieldHits++;
    } else {
      this.shieldHits = 0;
      this.time.addEvent({
        delay: 500,
        callback: () => {
          shield.disableBody(true, true);
        },
        callbackScope: this,
        loop: false,
      });
      this.shieldActive = false;
    }
  }

  createScoreLabel(x, y, score) {
    const style = { fontFamily: "'Press Start 2P', 'cursive'" };
    const label = new ScoreLabel(this, x, y, score, style);

    this.add.existing(label);
    return label;
  }

  checkScore() {
    if (this.score && !(this.score % 25)) {
      this.spawnNumber++;
      this.asteroidSpeed += 50;
      this.maxDelay -= 500;
    }
    if (this.score === 50) {
      this.releasePowerup('powerup1');
    } else if (!(this.score % 100)) {
      this.releasePowerup('shield');
    } else if (this.score === 150) {
      this.releasePowerup('powerup2');
    } else if (this.score > 50 && !(this.score % 20)) {
      this.spawnAngel();
    }
  }

  addPowerup(powerup, skull) {
    powerup.destroy();
    if (powerup.name === 'powerup1') {
      this.powerup1_grab.play();
      this.weaponType = 'blast';
      this.soundIndex++;
    } else if (powerup.name === 'powerup2') {
      this.powerup3_grab.play();
      this.weaponType = 'tri-blast';
      this.soundIndex++;
    } else if (powerup.name === 'shield') {
      if (!this.shieldActive) {
        this.shieldActive = true;
        this.shield.enableBody(true, skull.x, skull.y, true, true);
        this.shield_grab.play();
      } else {
        this.shieldHits = 0;
      }
    }
    skull.play('skull_laugh_anim');
  }

  spawnAngel() {
    const angel = this.physics.add.sprite(800, 300, 'angel');
    angel.play('angel_anim');
    angel.setScale(1.25);
    angel.setVelocityX(-100);
    angel.setVelocityY(150);
    this.enemies.add(angel);
  }

  manageAngel(angels) {
    angels.getChildren().forEach((angel) => {
      if (angel.y > 550) {
        angel.setVelocityY(-150);
      } else if (angel.y < 50) {
        angel.setVelocityY(150);
      }
    });
  }

  angelFire() {
    if (!this.nextLevel) {
      this.enemies.getChildren().forEach((angel) => {
        const star = this.physics.add.sprite(angel.x, angel.y, 'star');
        star.setVelocityX(-400);
        this.enemyProjectiles.add(star);
      });
    }
  }

  createShield() {
    const shield = this.physics.add.sprite(
      this.skull.x + 3,
      this.skull.y,
      'shield-sprite'
    );
    shield.setScale(1.25);
    shield.play('shield_sprite_anim');
    shield.disableBody(true, true);
    return shield;
  }

  manageShield() {
    this.shield.x = this.skull.x + 3;
    this.shield.y = this.skull.y;
  }
}
