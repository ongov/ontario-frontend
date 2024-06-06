// Checks if the value is present and not just whitespace
const isPresent = (value) => value && value.trim() !== '';

// Checks if the value is entirely lowercase
const isLowercase = (value) => value === value.toLowerCase();

// Checks if the value is URL-safe (alphanumeric, hyphens, underscores)
const isUrlSafe = (value) => /^[a-z0-9_-]+$/.test(value);

// Checks if the value does not start with a dot or underscore
const doesNotStartWithDotOrUnderscore = (value) => !/^[._]/.test(value);

module.exports = {
  isPresent,
  isLowercase,
  isUrlSafe,
  doesNotStartWithDotOrUnderscore,
};
