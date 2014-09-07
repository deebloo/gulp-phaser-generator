/**
 * Global Variables accessible by all game states
 *
 */
// Initiate Game
var game = new Phaser.Game(800, 500, Phaser.AUTO, '');

// Add the Main game state
game.state.add('start', Level_1);

// Start Main game state
game.state.start('start');