const fs = require('fs');
const logger = require('../../utils/logger');

/**
 * Copies files and directories from the source path to the destination path.
 *
 * @param {string} source - The path to the source files or directory.
 * @param {string} destination - The path to the destination directory.
 * @throws Will throw an error if the copy operation fails.
 */
function copy(source, destination) {
  try {
    fs.cpSync(source, destination, { recursive: true });
    logger.info(`Copied from ${source} to ${destination}`);
  } catch (error) {
    logger.error(`Error copying from ${source} to ${destination}: ${error.message}`);
    throw error; // Rethrow the error to be handled by the calling function
  }
}

/**
 * Copies files from a list of source paths to their corresponding destination paths.
 *
 * @param {Array<{source: string, destination: string}>} files - The list of files to copy.
 * @throws Will throw an error if any copy operation fails.
 */
function copyFiles(files) {
  for (const { source, destination } of files) {
    copy(source, destination);
  }
}

module.exports = { copy, copyFiles };
