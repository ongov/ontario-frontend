const fs = require('fs');
const logger = require('../../utils/logger');

/**
 * Ensures that a directory exists at the specified path. If the directory
 * does not exist, it is created along with any necessary parent directories.
 *
 * @param {string} directoryPath - The path to the directory to check or create.
 */
function ensureDirectory(directoryPath) {
  // Check if the directory already exists
  if (!fs.existsSync(directoryPath)) {
    logger.info('Directory does not exist, create it.');
    // Directory does not exist, so create it
    fs.mkdirSync(directoryPath, { recursive: true });
    // Note: { recursive: true } allows creation of nested directories as needed
    logger.success(`Directory created successfully: ${directoryPath}`);
  } else {
    logger.info(`Directory ${directoryPath} already exists.`);
    // If the directory already exists, no action is taken
  }
}

module.exports = { ensureDirectory };
