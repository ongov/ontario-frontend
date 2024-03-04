const fs = require('fs');

// Validate the file name
// The function checks if the input is present, lowercase, URL-safe, and does not begin with a dot or an underscore
const validFileName = (value) => {
  if (!value || value.trim() === '') {
    return 'Please enter a value';
  }
  if (value !== value.toLowerCase()) {
    return 'Value must be lowercase';
  }
  if (!/^[\w-]+$/.test(value)) {
    return 'Value must be URL-safe (only letters, numbers, - and _ allowed)';
  }
  if (/^[._]/.test(value)) {
    return 'Value cannot begin with a dot or an underscore';
  }
  return true;
};

// Validate the path
// The function checks if the path exists
const validPath = (value) => {
  if (fs.existsSync(value)) {
    return true;
  } else {
    return 'The provided path does not exist. Please enter a valid path.';
  }
};

module.exports = {
  validFileName,
  validPath
};
