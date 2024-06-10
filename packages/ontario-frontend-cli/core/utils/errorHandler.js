const logger = require('./logger');

/**
 * Wraps an async function to handle errors consistently.
 * @param {Function} fn - The async function to wrap.
 * @returns {Function} A wrapped function with consistent error handling.
 */
const withErrorHandling =
  (fn) =>
  async (...args) => {
    try {
      return await fn(...args);
    } catch (error) {
      logger.error(`Error in function ${fn.name}: ${error.message}`);
      throw error;
    }
  };

/**
 * Wraps a synchronous function to handle errors consistently.
 * @param {Function} fn - The synchronous function to wrap.
 * @returns {Function} A wrapped function with consistent error handling.
 */
const withSyncErrorHandling = (fn) => {
  return (...args) => {
    try {
      return fn(...args);
    } catch (error) {
      logger.error(`Error in function ${fn.name}: ${error.message}`);
      throw error;
    }
  };
};

module.exports = { withErrorHandling };
