// Main Menu State
PhaserBp.MainMenu = function(game) {
  console.log("Main Menu Initiated");
};

PhaserBp.MainMenu.prototype = {

  create: function () {
    gameName = "Neon Miami Pong Challenge 2015";
    menuText = "Press Space To Continue";

    displayLogo = this.add.text(250, 200, gameName, { font: "20px Arial", fill: "#686868"});
    displayInstructions = this.add.text(300, 250, menuText, { font: "20px Arial", fill: "#686868"});
  },

  update: function () {

  if (this.input.keyboard.addKey(32).isDown === true) {
    this.state.start('Game');
  }

  }

};
