const chalk = require('chalk');

/**
 * Colour definitions using hex codes from the Ontario Design System.
 * These colours are used to style console output with chalk.
 */
const colours = {
  question: chalk.hex('#FFFFFF'), // Ontario White
  success: chalk.hex('#DDEDC7'), // Ontario Light Green
  error: chalk.hex('#CD0000'), // Ontario Alert Red
  banner: chalk.hex('#C5EEFA'), // Ontario Light Sky
  info: chalk.hex('#F1E3F2'), // Ontario Light Purple
};

module.exports = colours;
