const GeneralError = require('./GeneralError');

/**
 * Custom error handler for logging and rethrowing errors.
 * @param {Function} fn - The function to wrap.
 * @param {Error} [CustomError=GeneralError] - The custom error class to use.
 * @returns {Function} Wrapped function with error handling.
 */
const withErrorHandling = (fn, CustomError = GeneralError) => async (...args) => {
  try {
    return await fn(...args);
  } catch (error) {
    throw new CustomError(fn.name, args, error.message);
  }
};

/**
 * Wraps a synchronous function to handle errors consistently.
 * @param {Function} fn - The synchronous function to wrap.
 * @param {Error} [CustomError=GeneralError] - The custom error class to use.
 * @returns {Function} Wrapped function with consistent error handling.
 */
const withSyncErrorHandling = (fn, CustomError = GeneralError) => (...args) => {
  try {
    return fn(...args);
  } catch (error) {
    throw new CustomError(fn.name, args, error.message);
  }
};

module.exports = { withErrorHandling, withSyncErrorHandling };
