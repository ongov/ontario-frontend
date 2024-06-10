const fs = require('fs').promises;
const { withErrorHandling } = require('../../utils/errorHandler');
const logger = require('../../utils/logger');

/**
 * Removes files or directories at the specified path.
 *
 * @param {string} path - The path to the file or directory to remove.
 * @returns {Promise<void>}
 */
const remove = withErrorHandling(async (path) => {
  await fs.rm(path, { recursive: true, force: true });
  logger.info(`Successfully removed: ${path}`);
});

module.exports = { remove };
