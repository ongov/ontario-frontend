const fs = require('fs').promises;
const DirectoryCreationError = require('../../errors/DirectoryCreationError');
const { withErrorHandling } = require('../../errors/errorHandler');
const logger = require('../../utils/logger');

/**
 * Ensures that a directory exists at the specified path. If the directory
 * does not exist, it is created along with any necessary parent directories.
 *
 * @param {string} directoryPath - The path to the directory to check or create.
 * @returns {Promise<void>}
 */
async function ensureDirectoryExists(directoryPath) {
  await fs.mkdir(directoryPath, { recursive: true });
  logger.debug(`Directory ensured/created successfully: ${directoryPath}`);
}

module.exports = {
  ensureDirectoryExists: withErrorHandling(
    ensureDirectoryExists,
    DirectoryCreationError,
  ),
};
