const fs = require('fs').promises;
const logger = require('../../utils/logger');

/**
 * Ensures that a directory exists at the specified path. If the directory
 * does not exist, it is created along with any necessary parent directories.
 *
 * @param {string} directoryPath - The path to the directory to check or create.
 * @returns {Promise<void>}
 */
async function ensureDirectory(directoryPath) {
  try {
    // Attempt to create the directory, { recursive: true } allows creation of nested directories as needed
    await fs.mkdir(directoryPath, { recursive: true });
    logger.debug(`Directory ensured/created successfully: ${directoryPath}`);
  } catch (error) {
    if (error.code === 'EEXIST') {
      // Directory already exists
      logger.debug(`Directory ${directoryPath} already exists.`);
    } else {
      // Log other errors
      logger.error(`Error ensuring/creating directory ${directoryPath}: ${error.message}`);
    }
  }
}

module.exports = { ensureDirectory };
