/**
 * Checks if the value is present and not just whitespace.
 * @param {string} value - The value to check.
 * @returns {boolean} - True if the value is present, false otherwise.
 */
const isPresent = (value) => value && value.trim() !== '';

/**
 * Checks if the value is entirely lowercase.
 * @param {string} value - The value to check.
 * @returns {boolean} - True if the value is lowercase, false otherwise.
 */
const isLowercase = (value) => value === value.toLowerCase();

/**
 * Checks if the value is URL-safe (alphanumeric, lowercase, hyphens, underscores).
 * @param {string} value - The value to check.
 * @returns {boolean} - True if the value is URL-safe, false otherwise.
 */
const isUrlSafe = (value) => /^[a-z0-9_-]+$/.test(value);

/**
 * Checks if the value does not start with a dot or underscore.
 * @param {string} value - The value to check.
 * @returns {boolean} - True if the value does not start with a dot or underscore, false otherwise.
 */
const doesNotStartWithDotOrUnderscore = (value) => !/^[._]/.test(value);

module.exports = {
  isPresent,
  isLowercase,
  isUrlSafe,
  doesNotStartWithDotOrUnderscore,
};
