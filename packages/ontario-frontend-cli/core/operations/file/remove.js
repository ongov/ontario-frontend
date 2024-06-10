const fs = require('fs').promises;
const logger = require('../../utils/logger');

async function remove(path) {
  try {
    await fs.rm(path, { recursive: true, force: true });
    logger.info(`Successfully removed: ${path}`);
  } catch (error) {
    logger.error(`Error removing file or directory: ${error.message}`);
    throw error;
  }
}

/**
 * Removes files from a designated location.
 *
 * @param {Array<{location: string}>} files - The list of files to remove.
 * @throws Will throw an error if any remove operation fails.
 */
async function removeFiles(files) {
  for (const { location } of files) {
    await remove(location);
  }
}

module.exports = { remove, removeFiles };