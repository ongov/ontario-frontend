const fs = require('fs').promises;
const { withErrorHandling } = require('../../utils/errorHandler');
const logger = require('../../utils/logger');

/**
 * Writes data to a specified file.
 * @param {string} path - The file path.
 * @param {string} data - The data to write.
 */
const write = withErrorHandling(async (path, data) => {
  await fs.writeFile(path, data, 'utf8');
  logger.info(`File written successfully: ${path}`);
});

module.exports = { write };
