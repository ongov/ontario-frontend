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
   * Gets the current timestamp.
   * @returns {string} - The current timestamp in ISO format.
   */
  getTimestamp() {
    return new Date().toISOString();
  }

  /**
   * Logs a message with the specified chalk color.
   * @param {Function} color - The chalk color function.
   * @param {...any} messages - The messages to log.
   */
  log(color, ...messages) {
    const timestamp = this.getTimestamp();
    console.log(color(`[${timestamp}] ${this.formatMessages(...messages)}`));
  }

  /**
   * Logs an info message.
   * @param {...any} messages - The messages to log.
   */
  info(...messages) {
    this.log(chalk.blue, ...messages);
  }

  /**
   * Logs a success message.
   * @param {...any} messages - The messages to log.
   */
  success(...messages) {
    this.log(chalk.green, ...messages);
  }

  /**
   * Logs a warning message.
   * @param {...any} messages - The messages to log.
   */
  warning(...messages) {
    this.log(chalk.yellow, ...messages);
  }

  /**
   * Logs an error message.
   * @param {...any} messages - The messages to log.
   */
  error(...messages) {
    this.log(chalk.red, ...messages);
  }

  /**
   * Logs a debug message if debug mode is enabled.
   * @param {...any} messages - The messages to log.
   */
  debug(...messages) {
    if (this.debugMode) {
      this.log(chalk.gray, ...messages);
    }
  }
}

// Export a single instance of the logger
module.exports = new Logger();
