const chalk = require('chalk');

// Controls whether debug messages should be logged
let debugMode = false;

/**
 * Sets the debug mode.
 * @param {boolean} debug - Enables or disables debug logging.
 */
const setDebug = (debug) => {
  debugMode = debug;
};

/**
 * Formats messages for logging.
 * Converts objects to JSON strings and joins all messages into a single string.
 * @param {...any} messages - The messages to format.
 * @returns {string} - The formatted message string.
 */
const formatMessages = (...messages) => {
  return messages
    .map((message) =>
      typeof message === 'object' ? JSON.stringify(message, null, 2) : message,
    )
    .join(' ');
};

const logger = {
  info: (...messages) => console.log(chalk.blue(formatMessages(...messages))),
  success: (...messages) =>
    console.log(chalk.green(formatMessages(...messages))),
  warning: (...messages) =>
    console.log(chalk.yellow(formatMessages(...messages))),
  error: (...messages) => console.log(chalk.red(formatMessages(...messages))),
  debug: (...messages) => {
    if (debugMode) {
      console.log(chalk.gray(formatMessages(...messages)));
    }
  },
  setDebug,
};

module.exports = logger;
