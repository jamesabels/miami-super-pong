// Game State
PhaserBp.Game = function(game) {
  console.log("Game State Initiated");
};

PhaserBp.Game.prototype = {

    create: function() {
      // Render Background
      background = this.add.sprite(0, 0, 'bg');

      // SCORE SETTINGS
      playerScore = 0;
      printPlayerScore = "0";
      aiScore = 0;
      printAiScore = "0";

      // GAME SETTINGS
      playerText = this.add.text(25, 40, printPlayerScore, { font: "680px      Arial", fill: "#686868", align: "left" });
      aiText = this.add.text(410, 40, printAiScore, { font: "680px Arial", fill: "#686868", align: "right" });


      // SPRITES
      ball = this.add.sprite(28.0, 300.0, 'ball');
      paddleLeft = this.add.sprite(10, 215, 'paddle');
      paddleRight = this.add.sprite(772, 215, 'paddle');
      ballHitSFX = this.add.audio('ballhit');
      outOfBoundsSFX = this.add.audio('outOfBounds');
      resetSFX = this.add.audio('reset');
      scoreSFX = this.add.audio('score');


      // FILTERS
      sunsetFilter = this.add.sprite(0, 0, 'sunset');

      // ENABLE PHYICS
      this.physics.startSystem(Phaser.Physics.ARCADE);
      this.physics.enable(paddleLeft, Phaser.Physics.ARCADE);
      this.physics.enable(paddleRight, Phaser.Physics.ARCADE);
      this.physics.enable(ball, Phaser.Physics.ARCADE);

      // BALL SETTINGS
      ballGravity = 350;
      ballGravityLeft = -ballGravity;
      ballGravityRight = ballGravity;
      ball.body.gravity.x = ballGravity;
      ball.body.bounce.x = 1;
      ball.body.maxVelocity.x = 1200;
      ball.body.collideWorldBounds = false;

      // PLAYER SERVING STATE
      playerServing = 1;


      // PLAYER SETTINGS
      paddleLeft.body.immovable = true;
      paddleLeft.body.collideWorldBounds = true;

      // AI SETTINGS
      paddleRight.body.immovable = true;
      paddleRight.body.collideWorldBounds = true;

    },

    update: function() {

    // UNIVSERAL PADDLE SETTINGS
    paddleLeft.body.velocity.y = 0;
    paddleStart = 215;
    speed = 800;
    speedDown = speed;
    speedUp = -speed;


    // SETTING KEYS
    upKey = this.input.keyboard.addKey(38);
    downKey = this.input.keyboard.addKey(40);
    spaceKey = this.input.keyboard.addKey(32);

    // UPDATE COLLISION
    this.physics.arcade.collide(paddleLeft, ball);
    this.physics.arcade.collide(paddleRight, ball);

    // Paddle Controls

    // Move Up
    if (upKey.isDown) {
      paddleLeft.body.velocity.y = speedUp;
    }if (upKey.isDown && playerServing === 1 ) {
        ball.body.velocity.y = speedUp;
    }if(upKey.isUp && downKey.isUp) {
        ball.body.velocity.y = 0;
    }if (upKey.isDown && playerServing === 3 ) {
        ball.body.velocity.y = 0;
    }

    // Move Down
    if (downKey.isDown) {
      paddleLeft.body.velocity.y = speedDown;
    }if (downKey.isDown && playerServing === 1 ) {
        ball.body.velocity.y = speedDown;
    }if(downKey.isUp && upKey.isUp) {
        ball.body.velocity.y = 0;
    }if (downKey.isDown && playerServing === 3 ) {
        ball.body.velocity.y = 0;
    }
    // LOCK BALLS Y AXIS
    if (upKey.isDown && ball.body.position.y < 78) {
        ball.body.velocity.y = 0;
    }if (downKey.isDown && ball.body.position.y > 502) {
        ball.body.velocity.y = 0;
    }

    // SERVE
    if (spaceKey.isDown) {
      playerServing = 2;
    }

    // SERVING STATE
    if( playerServing === 2 ) {
      ball.body.gravity.x = ballGravity;
      ball.body.acceleration.x   = 1200;
    }if( playerServing === 1 ) {
        ball.body.velocity.x  = 0;
        ball.body.gravity.x = 0;
        ball.body.position.x = 28.0;
    }else if(playerServing === 3) {
        ball.body.acceleration.x = 0;
    }else {
        playerServing = 3;
    }

    // Player Hit
    if (ball.body.touching.left && paddleLeft.body.touching.right && playerServing === 3) {
      ball.body.velocity.x + 1000;
      ball.body.gravity.y  = Math.floor(Math.random() * -20000) + 2000;
      ballHitSFX.play();
    }

    // AI hit
    if (ball.body.touching.right && paddleRight.body.touching.left && playerServing === 3) {
      ball.body.velocity.x = -1200;
      ball.body.gravity.x = ballGravityRight;
      ball.body.gravity.y  = Math.floor(Math.random() * 20000) + 2000;
      ballHitSFX.play();
    }

    // AI
    if ( ball.position.y - paddleRight.position.y > 15 ) {
      paddleRight.body.velocity.y = speedDown / 1.5;
    }else if ( ball.position.y - paddleRight.position.y < -15 ) {
      paddleRight.body.velocity.y = speedUp / 1.5;
    }else {
      paddleRight.body.velocity.y = 0;
    }

    // CENTER AI
      if (playerServing === 1) {
          paddleRight.body.position.y = 215;
      }

    // Point AI
     if (ball.body.position.x < -1 ) {
         aiScore += 1;
         aiText.setText(aiScore);
         scoreSFX.play();
         resetGame();
    }if (ball.body.position.y > 601) {
        outOfBoundsSFX.play();
        resetGame();
    }
    if ( aiScore >= 8) {
        this.state.restart();
    }if (ball.body.position.y < -1) {
        outOfBoundsSFX.play();
        resetGame();
    }
    // POINT PLAYER
    if (ball.body.position.x > 801 ) {
         playerScore += 1;
         playerText.setText(playerScore);
         scoreSFX.play();
         resetGame();
    }if ( aiScore >= 8) {
        this.state.restart();
    }

      console.log(ball.body.position.x);

        function resetGame() {
            playerServing = 1;
            ball.body.position.x = 28.0;
            ball.body.position.y = 300.00;
            ball.body.gravity.y = 0;
            ball.body.velocity.y = 0;
            paddleLeft.body.velocity.y = 0;
            paddleLeft.position.y = 215;
            if(ball.body.position.x > 28.0) {
                ball.body.position.x = 28.0;
            }
        }
      }
};
