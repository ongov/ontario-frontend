const fs = require('fs').promises;
const logger = require('../../utils/logger');
const { withErrorHandling } = require('../../utils/errorHandler');

/**
 * Copies files and directories from the source path to the destination path.
 *
 * @param {string} source - The path to the source files or directory.
 * @param {string} destination - The path to the destination directory.
 * @returns {Promise<void>}
 */
const copy = withErrorHandling(async (source, destination) => {
  await fs.cp(source, destination, { recursive: true });
  logger.info(`Copied from ${source} to ${destination}`);
});

/**
 * Copies files from a list of source paths to their corresponding destination paths.
 *
 * @param {Array<{source: string, destination: string}>} files - The list of files to copy.
 * @returns {Promise<void>}
 */
const copyFiles = withErrorHandling(async (files) => {
  for (const { source, destination } of files) {
    await copy(source, destination);
  }
});

module.exports = { copy, copyFiles };
