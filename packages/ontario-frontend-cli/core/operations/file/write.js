const fs = require('fs').promises;
const FileWriteError = require('../../errors/FileWriteError');
const { withErrorHandling } = require('../../errors/errorHandler');
const logger = require('../../utils/logger');

/**
 * Writes data to a specified file.
 *
 * @param {string} path - The file path.
 * @param {string} data - The data to write.
 * @returns {Promise<void>}
 */
async function write(path, data) {
  await fs.writeFile(path, data, 'utf8');
  logger.debug(`File written successfully: ${path}`);
}

module.exports = {
  write: withErrorHandling(write, FileWriteError),
};
