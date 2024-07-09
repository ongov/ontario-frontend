const fs = require('fs').promises;
const path = require('path');
const FileRemoveError = require('../../errors/FileRemoveError');
const { withErrorHandling } = require('../../errors/errorHandler');
const logger = require('../../utils/logger');

/**
 * Removes a file or directory at the specified path.
 *
 * @param {string} path - The path to the file or directory to remove.
 * @returns {Promise<void>}
 */
async function remove(path) {
  await fs.rm(path, { recursive: true, force: true });
  logger.info(`Successfully removed: ${path}`);
}

/**
 * Removes a list of files or directories.
 *
 * @param {Array<{location: string}>} files - The list of files to remove.
 * @returns {Promise<void>}
 */
async function removeFiles(files) {
  await Promise.all(files.map(({ location }) => remove(location)));
  logger.info(`All specified files have been successfully removed: ${JSON.stringify(files)}`);
}

module.exports = {
  remove: withErrorHandling(remove, FileRemoveError),
  removeFiles: withErrorHandling(removeFiles, FileRemoveError),
};
