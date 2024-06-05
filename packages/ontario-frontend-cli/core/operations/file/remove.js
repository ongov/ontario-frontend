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

module.exports = { remove };
