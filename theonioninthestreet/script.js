var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 300 },
      debug: false,
    },
  },
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};
var game = new Phaser.Game(config);

function preload() {
  this.load.image("sky", "assets/sky.png");
  this.load.image("ground", "assets/platform.png");
  this.load.image("star", "assets/star.png");
  this.load.image("bomb", "assets/bomb.png");
  this.load.spritesheet("dude", "assets/dude.png", {
    frameWidth: 32,
    frameHeight: 48,
  });
}

/**
 *done 1. make ground
 *done 2. add the onion
 *done 3. add movement
 *done 4. make stars fall from the sky
 *done 5. Make the onion eat stars
 *done 6. Make a winning game if you get 6 stars
 *done 7. Add bombs and a game over
 */

var platforms;
var bombs;

function create() {
  this.add.image(400, 300, "sky");
  platforms = this.physics.add.staticGroup();

  platforms.create(400, 568, "ground").setScale(2).refreshBody();

  player = this.physics.add.sprite(100, 450, "dude");

  player.setBounce(0.2);
  player.setCollideWorldBounds(true);

  this.anims.create({
    key: "left",
    frames: this.anims.generateFrameNumbers("dude", { start: 0, end: 3 }),
    frameRate: 10,
    repeat: -1,
  });

  this.anims.create({
    key: "idle",
    frames: [{ key: "dude", frame: 4 }],
    frameRate: 20,
  });

  this.anims.create({
    key: "right",
    frames: this.anims.generateFrameNumbers("dude", { start: 5, end: 8 }),
    frameRate: 10,
    repeat: -1,
  });

  this.physics.add.collider(player, platforms);
  
  stars = this.physics.add.group();
  
  scoreText = this.add.text(16, 16, "Score: 0", {
    fontSize: "32px",
    fill: "#000",
  });

  this.time.addEvent({
    delay: 1000,
    callback: addStar,
    callbackScope: this,
    loop: true,
  });

  bombs = this.physics.add.group();
  
  // this.physics.add.collider(bombs, platforms);

  this.physics.add.collider(player, bombs, hitBomb, null, this);
}

function addStar() {
  var x = Phaser.Math.Between(0, 800);
  var star = stars.create(x, 0, "star");
  this.physics.add.overlap(player, star, collectStar, null, this);

  chance = Phaser.Math.Between(0, 100);
  prob = 20;
  if (chance <= prob) {
    addBomb();
  }
}

var score = 0;
function collectStar(player, star) {
  star.disableBody(true, true);

  score = score + 1;
  scoreText.setText("Score: " + score);

  if (score == 6) {
    this.physics.pause();
    scoreText = this.add.text(250, 267, "You win", {
      fontSize: "96px",
      fill: "#0f0",
    });
  }
}

function update() {
  cursors = this.input.keyboard.createCursorKeys();

  if (cursors.left.isDown) {
    player.setVelocityX(-160);

    player.anims.play("left", true);
  } else if (cursors.right.isDown) {
    player.setVelocityX(160);

    player.anims.play("right", true);
  } else {
    player.setVelocityX(0);

    player.anims.play("idle");
  }
}


function hitBomb(player, bomb) {
  this.physics.pause();

  player.setTint(0xff0000);

  player.anims.play("idle");

  gameOver = true;
}

function addBomb() {
  var x =
    player.x < 400
      ? Phaser.Math.Between(400, 800)
      : Phaser.Math.Between(0, 400);

  var bomb = bombs.create(x, 16, "bomb");
  bomb.setBounce(1);
  bomb.setVelocity(Phaser.Math.Between(-20, 20), 20);
}