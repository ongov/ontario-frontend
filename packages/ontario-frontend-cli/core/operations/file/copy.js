const fs = require('fs').promises;
const { withErrorHandling } = require('../../errors/errorHandler');
const CopyOperationError = require('../../errors/CopyOperationError');
const logger = require('../../utils/logger');

/**
 * Copies files and directories from the source path to the destination path.
 *
 * @param {string} source - The path to the source files or directory.
 * @param {string} destination - The path to the destination directory.
 * @returns {Promise<void>}
 */
async function copy(source, destination) {
  await fs.cp(source, destination, { recursive: true });
  logger.debug(`Copied file from ${source} to ${destination}`);
  logger.info(`Successfully added: ${destination}`);
}

/**
 * Copies files from a list of source paths to their corresponding destination paths.
 *
 * @param {Array<{source: string, destination: string}>} files - The list of files to copy.
 * @returns {Promise<void>}
 */
async function copyFiles(files) {
  for (const { source, destination } of files) {
    await copy(source, destination);
  }
}

// Export the functions wrapped with error handling to ensure consistent error logging and handling across the application.
module.exports = {
  copy: withErrorHandling(copy, CopyOperationError),
  copyFiles,
};
