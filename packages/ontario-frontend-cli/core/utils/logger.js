const chalk = require('chalk');

/**
 * Logger class for logging messages with different levels of severity.
 * Provides methods for info, success, warning, error, and debug messages.
 * Uses chalk for colored output.
 */
class Logger {
  constructor() {
    this.debugMode = false;
  }

  /**
   * Sets the debug mode.
   * @param {boolean} debug - Enables or disables debug logging.
   */
  setDebug(debug) {
    this.debugMode = debug;
  }

  /**
   * Formats messages for logging.
   * Converts objects to JSON strings and joins all messages into a single string.
   * @param {...any} messages - The messages to format.
   * @returns {string} - The formatted message string.
   */
  formatMessages(...messages) {
    return messages
      .map((message) =>
        typeof message === 'object'
          ? JSON.stringify(message, null, 2)
          : message,
      )
      .join(' ');
  }

  /**
   * Logs an info message.
   * @param {...any} messages - The messages to log.
   */
  info(...messages) {
    console.log(chalk.blue(this.formatMessages(...messages)));
  }

  /**
   * Logs a success message.
   * @param {...any} messages - The messages to log.
   */
  success(...messages) {
    console.log(chalk.green(this.formatMessages(...messages)));
  }

  /**
   * Logs a warning message.
   * @param {...any} messages - The messages to log.
   */
  warning(...messages) {
    console.log(chalk.yellow(this.formatMessages(...messages)));
  }

  /**
   * Logs an error message.
   * @param {...any} messages - The messages to log.
   */
  error(...messages) {
    console.log(chalk.red(this.formatMessages(...messages)));
  }

  /**
   * Logs a debug message if debug mode is enabled.
   * @param {...any} messages - The messages to log.
   */
  debug(...messages) {
    if (this.debugMode) {
      console.log(chalk.gray(this.formatMessages(...messages)));
    }
  }
}

// Export a single instance of the logger
module.exports = new Logger();
