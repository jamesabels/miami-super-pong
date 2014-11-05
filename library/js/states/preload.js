// Preload State
PhaserBp.Preload = function(game) {
  console.log("Load State Initiated");
};

PhaserBp.Preload.prototype = {

	preload: function () {
    this.load.image("bg", "library/assets/bg.png");
    this.load.image("sunset", "library/assets/filter.png");
    this.load.image("ball", "library/assets/BallGreyscale.png");
    this.load.image("paddle", "library/assets/PaddleGreyscale.png");
    this.load.audio("ballhit", "library/assets/BallHit.wav");
    this.load.audio("outOfBounds", "library/assets/OutOfBounds.wav");
    this.load.audio("reset", "library/assets/Reset.wav");
    this.load.audio("score", "library/assets/Score.wav");
    this.load.audio("music", "library/assets/music.ogg"); 
  },

	create: function () {

	},

	update: function () {
    this.state.start('Game');
	}
};
