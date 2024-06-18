const {
  isPresent,
  isLowercase,
  isUrlSafe,
  doesNotStartWithDotOrUnderscore,
} = require('./validationUtils');

/**
 * Validates a file name based on specific criteria.
 *
 * @param {string} value - The file name to validate.
 * @returns {string|boolean} - Returns true if valid, otherwise returns an error message.
 */
const validFileName = (value) => {
  if (!isPresent(value)) {
    return 'Please enter a value.';
  }
  if (!isLowercase(value)) {
    return 'Value must be lowercase.';
  }
  if (!isUrlSafe(value)) {
    return 'Value must be URL-safe (only letters, numbers, -, and _ allowed).';
  }
  if (!doesNotStartWithDotOrUnderscore(value)) {
    return 'Value cannot begin with a dot or an underscore.';
  }
  return true;
};

module.exports = { validFileName };
